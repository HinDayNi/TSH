import { describe, it, expect } from 'vitest';
import { signPayosData, verifyWebhookSignature, createPayosDataString } from './signature';
import { createVipAccessToken, verifyVipAccessToken } from '@/lib/auth/vipToken';

describe('Payment & Security Layer (Gói 6)', () => {
    describe('1. PayOS Data Sorting & Chữ ký HMAC-SHA256', () => {
        it('sắp xếp đúng thứ tự các key A-Z để tạo chuỗi dữ liệu ký', () => {
            const data = {
                orderCode: 123456,
                amount: 199000,
                desc: 'success',
                code: '00'
            };
            const str = createPayosDataString(data);
            expect(str).toBe('amount=199000&code=00&desc=success&orderCode=123456');
        });

        it('xác thực thành công chữ ký hợp lệ', () => {
            const data = { orderCode: 888999, amount: 199000, code: '00' };
            const signature = signPayosData(data);
            const payload = { data, signature };

            const isValid = verifyWebhookSignature(payload);
            expect(isValid).toBe(true);
        });

        it('từ chối chữ ký giả mạo hoặc sai lệch dữ liệu', () => {
            const data = { orderCode: 888999, amount: 199000, code: '00' };
            const payload = { data, signature: 'fake_tampered_signature_123456' };

            const isValid = verifyWebhookSignature(payload);
            expect(isValid).toBe(false);
        });
    });

    describe('2. VIP Lifetime Access Token (verifyVipAccessToken)', () => {
        it('tạo và xác thực token VIP trọn đời thành công', () => {
            const orderId = 'ORD-TEST-001';
            const orderCode = 123456;

            const token = createVipAccessToken(orderId, orderCode);
            expect(typeof token).toBe('string');
            expect(token.split('.').length).toBe(2);

            const verified = verifyVipAccessToken(token);
            expect(verified.valid).toBe(true);
            expect(verified.payload?.isVip).toBe(true);
            expect(verified.payload?.scope).toBe('VIP_LIFETIME');
            expect(verified.payload?.expiresAt).toBeNull(); // Trọn đời
        });

        it('từ chối token bị chỉnh sửa nội dung', () => {
            const token = createVipAccessToken('ORD-TEST-002', 654321);
            const parts = token.split('.');
            const tamperedPayload = Buffer.from(JSON.stringify({ isVip: true, scope: 'VIP_LIFETIME' })).toString('base64url');
            const tamperedToken = `${tamperedPayload}.${parts[1]}`;

            const verified = verifyVipAccessToken(tamperedToken);
            expect(verified.valid).toBe(false);
        });
    });
});
