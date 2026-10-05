import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ----------------------------------------------------------------------
// In-memory sliding window fallback khi chưa cấu hình Upstash Redis credentials
// ----------------------------------------------------------------------
class InMemoryRatelimit {
    private requests: Map<string, number[]> = new Map();
    private readonly limit: number;
    private readonly windowMs: number;

    constructor(limit: number, windowSeconds: number) {
        this.limit = limit;
        this.windowMs = windowSeconds * 1000;
    }

    async limitCheck(identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
        const now = Date.now();
        const timestamps = this.requests.get(identifier) || [];

        // Lọc các request trong cửa sổ thời gian
        const validTimestamps = timestamps.filter((t) => now - t < this.windowMs);

        if (validTimestamps.length >= this.limit) {
            const oldest = validTimestamps[0];
            const reset = oldest + this.windowMs;
            return {
                success: false,
                limit: this.limit,
                remaining: 0,
                reset
            };
        }

        validTimestamps.push(now);
        this.requests.set(identifier, validTimestamps);

        return {
            success: true,
            limit: this.limit,
            remaining: this.limit - validTimestamps.length,
            reset: now + this.windowMs
        };
    }
}

// ----------------------------------------------------------------------
// Khởi tạo Rate Limiter (Upstash Redis hoặc In-memory Fallback)
// ----------------------------------------------------------------------
const isUpstashConfigured = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

let upstashRatelimit: Ratelimit | null = null;
if (isUpstashConfigured) {
    const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!
    });

    upstashRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, '60 s'),
        analytics: true,
        prefix: 'tsh_ratelimit'
    });
}

const inMemoryFallback = new InMemoryRatelimit(30, 60); // 30 requests / 60 giây

/**
 * Kiểm tra giới hạn tần suất cho một IP hoặc identifier
 */
export async function checkRateLimit(identifier: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}> {
    if (upstashRatelimit) {
        try {
            const res = await upstashRatelimit.limit(identifier);
            return {
                success: res.success,
                limit: res.limit,
                remaining: res.remaining,
                reset: res.reset
            };
        } catch (err) {
            console.warn('[RateLimit Warning] Upstash connection error, falling back to in-memory:', err);
        }
    }

    return inMemoryFallback.limitCheck(identifier);
}
