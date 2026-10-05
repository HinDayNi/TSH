import crypto from 'crypto';

const SECRET_KEY = process.env.VIP_TOKEN_SECRET || process.env.PAYOS_CHECKSUM_KEY || 'TSH_VIP_SECRET_KEY_2026_VERY_SECURE';

export interface VipTokenPayload {
    orderId: string;
    orderCode: number;
    scope: 'VIP_LIFETIME';
    isVip: boolean;
    createdAt: number;
    expiresAt: null; // Trọn đời
}

/**
 * Tạo token truy cập bản báo cáo VIP trọn đời cho user
 * Định dạng: base64url(payload).signature (HMAC-SHA256)
 */
export function createVipAccessToken(orderId: string, orderCode: number): string {
    const payload: VipTokenPayload = {
        orderId,
        orderCode,
        scope: 'VIP_LIFETIME',
        isVip: true,
        createdAt: Date.now(),
        expiresAt: null
    };

    const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(payloadStr)
        .digest('base64url');

    return `${payloadStr}.${signature}`;
}

/**
 * Kiểm tra và giải mã token VIP trọn đời
 */
export function verifyVipAccessToken(token: string): { valid: boolean; payload?: VipTokenPayload } {
    if (!token || typeof token !== 'string') {
        return { valid: false };
    }

    const parts = token.split('.');
    if (parts.length !== 2) {
        return { valid: false };
    }

    const [payloadStr, providedSignature] = parts;

    try {
        const expectedSignature = crypto
            .createHmac('sha256', SECRET_KEY)
            .update(payloadStr)
            .digest('base64url');

        // Timing-safe comparison to prevent timing attacks
        const providedBuf = Buffer.from(providedSignature);
        const expectedBuf = Buffer.from(expectedSignature);

        if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
            return { valid: false };
        }

        const payload: VipTokenPayload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
        if (payload.scope !== 'VIP_LIFETIME' || !payload.isVip) {
            return { valid: false };
        }

        return { valid: true, payload };
    } catch (e) {
        return { valid: false };
    }
}
