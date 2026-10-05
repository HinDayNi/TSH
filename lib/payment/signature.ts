import crypto from 'crypto';

export const CHECKSUM_KEY =
    process.env.PAYOS_CHECKSUM_KEY ||
    process.env.WEBHOOK_SECRET ||
    'TSH_WEBHOOK_CHECKSUM_KEY_2026_VERY_SECURE';

/**
 * Thuật toán chuẩn PayOS để chuyển đổi object dữ liệu thành chuỗi ký:
 * Sắp xếp các key theo thứ tự bảng chữ cái A-Z và nối theo định dạng key=value&key2=value2...
 */
export function createPayosDataString(data: Record<string, any>): string {
    const sortedKeys = Object.keys(data).sort();
    return sortedKeys
        .map((key) => {
            let val = data[key];
            if (val === null || val === undefined) {
                val = '';
            } else if (typeof val === 'object') {
                val = JSON.stringify(val);
            }
            return `${key}=${val}`;
        })
        .join('&');
}

/**
 * Tính toán chữ ký HMAC-SHA256 chuẩn PayOS
 */
export function signPayosData(data: Record<string, any>, key: string = CHECKSUM_KEY): string {
    const dataStr = createPayosDataString(data);
    return crypto.createHmac('sha256', key).update(dataStr).digest('hex');
}

/**
 * Kiểm tra chữ ký bảo mật Webhook (Signature Verification):
 * Hỗ trợ cả chuẩn PayOS và chuẩn Generic Webhook Header (X-Signature)
 */
export function verifyWebhookSignature(
    payload: any,
    rawBodyStr?: string,
    headerSignature?: string | null,
    key: string = CHECKSUM_KEY
): boolean {
    try {
        // Trường hợp 1: PayOS Webhook Payload ({ data, signature })
        if (payload && payload.data && payload.signature) {
            const calculatedSignature = signPayosData(payload.data, key);
            const calculatedBuf = Buffer.from(calculatedSignature, 'hex');
            const providedBuf = Buffer.from(payload.signature, 'hex');

            if (calculatedBuf.length === providedBuf.length && crypto.timingSafeEqual(calculatedBuf, providedBuf)) {
                return true;
            }
        }

        // Trường hợp 2: Header X-Signature hoặc Webhook Signature truyền qua Header
        if (headerSignature && rawBodyStr) {
            const calculatedHmac = crypto.createHmac('sha256', key).update(rawBodyStr).digest('hex');
            const cleanProvided = headerSignature.replace(/^sha256=/, '');
            const calculatedBuf = Buffer.from(calculatedHmac, 'hex');
            const providedBuf = Buffer.from(cleanProvided, 'hex');

            if (calculatedBuf.length === providedBuf.length && crypto.timingSafeEqual(calculatedBuf, providedBuf)) {
                return true;
            }
        }

        // Trường hợp 3: payload có chứa trực tiếp signature và orderCode
        if (payload && payload.signature && !payload.data) {
            const { signature, ...rest } = payload;
            const calculated = signPayosData(rest, key);
            if (calculated.toLowerCase() === String(signature).toLowerCase()) {
                return true;
            }
        }

        return false;
    } catch (err) {
        console.error('Signature verification error:', err);
        return false;
    }
}
