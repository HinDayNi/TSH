import { describe, it, expect } from 'vitest';
import { checkRateLimit } from './ratelimit';

describe('Security & Rate Limiting Layer (Gói 9)', () => {
    it('cho phép các request trong ngưỡng cho phép (remaining giảm dần)', async () => {
        const testId = `test_ip_${Date.now()}`;

        const res1 = await checkRateLimit(testId);
        expect(res1.success).toBe(true);
        expect(res1.limit).toBe(30);
        expect(res1.remaining).toBe(29);

        const res2 = await checkRateLimit(testId);
        expect(res2.success).toBe(true);
        expect(res2.remaining).toBe(28);
    });

    it('từ chối khi vượt quá giới hạn tần suất (success = false)', async () => {
        const spamId = `spam_bot_${Date.now()}`;

        // Gửi 30 request để cạn kiệt hạn mức
        for (let i = 0; i < 30; i++) {
            await checkRateLimit(spamId);
        }

        // Request thứ 31 phải bị chặn
        const blocked = await checkRateLimit(spamId);
        expect(blocked.success).toBe(false);
        expect(blocked.remaining).toBe(0);
        expect(blocked.reset).toBeGreaterThan(Date.now());
    });
});
