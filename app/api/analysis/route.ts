import { openai } from '@ai-sdk/openai';
import { Redis } from '@upstash/redis';
import { streamText } from 'ai';
import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const analysisSchema = z.object({
    indicators: z.record(z.string(), z.unknown()),
    goal: z.enum(['career', 'relationship', 'growth'])
});

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30;

function cacheKey(input: z.infer<typeof analysisSchema>): string {
    const digest = createHash('sha256')
        .update(JSON.stringify(input))
        .digest('hex');
    return `analysis:v1:${digest}`;
}

function fallbackResponse(message: string, status = 503): NextResponse {
    return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
    const parsed = analysisSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
        return fallbackResponse('Dữ liệu chỉ số luận giải không hợp lệ.', 400);
    }

    const input = parsed.data;
    const key = cacheKey(input);
    const cached = redis ? await redis.get<string>(key) : null;
    if (cached) {
        return new Response(cached, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Analysis-Cache': 'HIT'
            }
        });
    }

    if (!process.env.OPENAI_API_KEY) {
        return fallbackResponse('AI chưa được cấu hình. Vui lòng thêm OPENAI_API_KEY trên server.');
    }

    const result = streamText({
        model: openai(process.env.OPENAI_MODEL || 'gpt-4o-mini'),
        system: `Bạn là chuyên gia luận giải thần số học Pythagoras, viết bằng tiếng Việt.
Hãy tổng hợp mối quan hệ bổ trợ và mâu thuẫn giữa Đường đời, Sứ mệnh, Linh hồn,
Nhân cách và Năm cá nhân; tuyệt đối không đọc rời rạc từng con số.
Không khẳng định định mệnh, không đưa lời khuyên y tế/pháp lý/tài chính chắc chắn.
Viết thực tế, cụ thể, có tiêu đề ngắn và 3-5 hành động có thể áp dụng.`,
        prompt: `Mục tiêu quan tâm: ${input.goal}
Các chỉ số của người dùng:
${JSON.stringify(input.indicators, null, 2)}

Hãy viết một luận giải độc bản, chỉ dựa trên dữ liệu trên và làm rõ:
1. Năng lượng chính đang hỗ trợ mục tiêu.
2. Mâu thuẫn hoặc điểm cần cân bằng.
3. Một kế hoạch hành động thực tế trong thời gian gần.
Không nhắc đến prompt, mô hình hay dữ liệu nội bộ.`,
        onFinish: async ({ text }) => {
            if (redis && text) {
                await redis.set(key, text, { ex: CACHE_TTL_SECONDS });
            }
        }
    });

    return result.toTextStreamResponse({
        headers: { 'X-Analysis-Cache': 'MISS' }
    });
}