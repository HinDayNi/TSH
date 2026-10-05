import { NextRequest, NextResponse } from 'next/server';
import { signPayosData } from '@/lib/payment/signature';
import { updateOrderPaymentSuccess } from '@/lib/db/orders';

/**
 * POST /api/webhook/payment/test
 * Giả lập gửi Webhook có ký chữ ký chuẩn PayOS để kiểm thử
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const orderCode = body.orderCode || Math.floor(100000 + Math.random() * 900000);
        const amount = body.amount || 199000;

        const data = {
            orderCode,
            amount,
            description: body.description || `TSH VIP ${orderCode}`,
            accountNumber: '0988888888',
            reference: `REF-${Date.now()}`,
            transactionDateTime: new Date().toISOString(),
            currency: 'VND',
            paymentLinkId: `LINK-${orderCode}`,
            code: '00',
            desc: 'success'
        };

        // Sinh chữ ký bảo mật HMAC-SHA256 chuẩn PayOS
        const signature = signPayosData(data);

        // Kích hoạt cập nhật đơn hàng và sinh token VIP
        const { order, vipToken } = await updateOrderPaymentSuccess(orderCode, {
            transactionId: data.reference,
            amount: data.amount,
            paymentGateway: 'PAYOS'
        });

        return NextResponse.json({
            success: true,
            message: 'Giả lập Webhook PayOS thành công',
            data: {
                orderCode: order.orderCode,
                orderId: order.orderId,
                status: order.status,
                is_vip: order.is_vip,
                amount: order.amount,
                accessToken: vipToken,
                signature
            }
        });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
