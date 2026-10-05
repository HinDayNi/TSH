import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/payment/signature';
import { updateOrderPaymentSuccess, getOrderByCode } from '@/lib/db/orders';
import { captureException } from '@/lib/monitoring/sentry';

/**
 * Route Handler: POST /api/webhook/payment
 * Xử lý Webhook từ cổng thanh toán VietQR / PayOS / SePay:
 * 1. Kiểm tra chữ ký bảo mật (HMAC SHA-256 Signature Verification).
 * 2. Cập nhật trạng thái đơn hàng trong DB (status = 'PAID', is_vip = true).
 * 3. Tạo token truy cập bản báo cáo VIP trọn đời cho user.
 * 4. Trả về HTTP 200 OK.
 */
export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        if (!rawBody || rawBody.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Empty webhook body' },
                { status: 400 }
            );
        }

        let payload: any;
        try {
            payload = JSON.parse(rawBody);
        } catch {
            return NextResponse.json(
                { success: false, error: 'Invalid JSON payload' },
                { status: 400 }
            );
        }

        const headerSignature =
            req.headers.get('x-signature') ||
            req.headers.get('webhook-signature') ||
            req.headers.get('x-payos-signature');

        // ------------------------------------------------------------------
        // 1. Kiểm tra Chữ ký bảo mật (Signature Verification)
        // ------------------------------------------------------------------
        const isSignatureValid = verifyWebhookSignature(payload, rawBody, headerSignature);

        if (!isSignatureValid) {
            console.warn('[Webhook Warning] Invalid signature detected for payment webhook.');
            return NextResponse.json(
                {
                    success: false,
                    error: 'Chữ ký webhook không hợp lệ (Signature verification failed). Yêu cầu bị từ chối.'
                },
                { status: 401 }
            );
        }

        // ------------------------------------------------------------------
        // 2. Trích xuất thông tin giao dịch
        // ------------------------------------------------------------------
        // Hỗ trợ cả cấu trúc PayOS ({ code: "00", data: { orderCode, amount... } })
        // và cấu trúc VietQR/SePay ({ orderCode, amount, transactionId... })
        const data = payload.data || payload;
        const statusCode = payload.code ?? data.code ?? '00';
        const isSuccess = statusCode === '00' || statusCode === 0 || payload.success === true;

        if (!isSuccess) {
            return NextResponse.json({
                success: true,
                message: `Webhook received but transaction was not successful (code: ${statusCode})`
            });
        }

        const rawOrderCode = data.orderCode ?? data.orderId ?? data.code;
        const orderCode = parseInt(String(rawOrderCode), 10);

        if (isNaN(orderCode)) {
            return NextResponse.json(
                { success: false, error: 'Mã đơn hàng orderCode không hợp lệ trong payload' },
                { status: 400 }
            );
        }

        const amount = typeof data.amount === 'number' ? data.amount : parseInt(data.amount, 10) || 199000;
        const transactionId = String(data.reference || data.transactionId || data.paymentLinkId || `TXN-${Date.now()}`);

        // ------------------------------------------------------------------
        // 3. Cập nhật trạng thái đơn hàng trong DB & Tạo Token VIP trọn đời
        // ------------------------------------------------------------------
        const { order, vipToken } = await updateOrderPaymentSuccess(orderCode, {
            transactionId,
            amount,
            paymentGateway: 'PAYOS'
        });

        console.log(`[Webhook Success] Đơn hàng #${orderCode} đã được kích hoạt VIP trọn đời thành công.`);

        // ------------------------------------------------------------------
        // 4. Trả về HTTP 200 OK kèm Token VIP
        // ------------------------------------------------------------------
        return NextResponse.json(
            {
                success: true,
                message: 'Kích hoạt tài khoản VIP trọn đời thành công!',
                data: {
                    orderCode: order.orderCode,
                    orderId: order.orderId,
                    status: order.status,
                    is_vip: order.is_vip,
                    amount: order.amount,
                    transactionId: order.transactionId,
                    paidAt: order.paidAt,
                    accessToken: vipToken,
                    vipReportUrl: `/report?vipToken=${vipToken}`
                }
            },
            { status: 200 }
        );
    } catch (error: any) {
        captureException(error, { tags: { route: 'payment_webhook' } });
        console.error('[Webhook Error]:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Lỗi máy chủ nội bộ khi xử lý webhook thanh toán',
                details: error.message
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/webhook/payment - Kiểm tra trạng thái endpoint Webhook
 */
export async function GET() {
    return NextResponse.json({
        service: 'TSH Payment Webhook Gateway',
        status: 'ONLINE',
        signature_method: 'HMAC-SHA256',
        timestamp: new Date().toISOString()
    });
}
