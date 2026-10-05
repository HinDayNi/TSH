import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createOrder } from '@/lib/db/orders';
import { signPayosData } from '@/lib/payment/signature';

const createLinkSchema = z.object({
    amount: z.number().int().min(1000).max(10_000_000).default(199000),
    description: z.string().trim().min(1).max(255).default('TSH VIP')
});

function newOrderCode(): number {
    return Number(`${Date.now()}`.slice(-6));
}

export async function POST(request: NextRequest) {
    const parsed = createLinkSchema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
        return NextResponse.json({ success: false, error: 'Gói thanh toán không hợp lệ.' }, { status: 400 });
    }

    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
    if (!clientId || !apiKey || !checksumKey) {
        return NextResponse.json(
            { success: false, error: 'PayOS chưa được cấu hình trên server.' },
            { status: 503 }
        );
    }

    const orderCode = newOrderCode();
    const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const description = parsed.data.description.slice(0, 25);
    const cancelUrl = `${origin}/report?payment=cancelled`;
    const returnUrl = `${origin}/report?payment=success&orderCode=${orderCode}`;
    const order = await createOrder({
        orderCode,
        amount: parsed.data.amount,
        description,
        paymentGateway: 'PAYOS'
    });

    const signatureData = { amount: parsed.data.amount, cancelUrl, description, orderCode, returnUrl };
    const response = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-client-id': clientId,
            'x-api-key': apiKey
        },
        body: JSON.stringify({
            ...signatureData,
            signature: signPayosData(signatureData, checksumKey),
            items: [{ name: description, quantity: 1, price: parsed.data.amount }]
        })
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.data) {
        return NextResponse.json(
            { success: false, error: payload?.desc || 'Không thể tạo link thanh toán PayOS.', orderCode: order.orderCode },
            { status: 502 }
        );
    }

    const result = NextResponse.json({
        success: true,
        data: {
            orderCode: order.orderCode,
            checkoutUrl: payload.data.checkoutUrl,
            qrCode: payload.data.qrCode,
            accountNumber: payload.data.accountNumber,
            accountName: payload.data.accountName
        }
    });
    result.cookies.set('tsh_payment_order', String(order.orderCode), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 30,
        path: '/api/payment'
    });
    return result;
}