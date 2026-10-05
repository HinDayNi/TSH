import { NextRequest, NextResponse } from 'next/server';
import { getOrderByCode } from '@/lib/db/orders';

export async function GET(request: NextRequest) {
    const rawOrderCode = request.nextUrl.searchParams.get('orderCode');
    const orderCode = Number(rawOrderCode);
    if (!rawOrderCode || !Number.isInteger(orderCode)) {
        return NextResponse.json({ success: false, error: 'orderCode không hợp lệ.' }, { status: 400 });
    }
    if (request.cookies.get('tsh_payment_order')?.value !== String(orderCode)) {
        return NextResponse.json({ success: false, error: 'Phiên thanh toán không hợp lệ.' }, { status: 403 });
    }

    const order = await getOrderByCode(orderCode);
    if (!order) {
        return NextResponse.json({ success: false, error: 'Không tìm thấy đơn hàng.' }, { status: 404 });
    }

    return NextResponse.json({
        success: true,
        data: {
            orderCode: order.orderCode,
            status: order.status,
            accessToken: order.vipToken
        }
    });
}