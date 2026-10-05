import { OrderStatus, PaymentGateway } from '@prisma/client';
import { createVipAccessToken } from '@/lib/auth/vipToken';
import { prisma } from '@/lib/db/prisma';

export interface Order {
    orderId: string;
    orderCode: number;
    amount: number;
    description: string;
    customerName?: string;
    customerEmail?: string;
    status: 'PENDING' | 'PAID' | 'CANCELLED';
    is_vip: boolean;
    vipToken?: string;
    vipTokenExpiresAt: null;
    paymentGateway: 'PAYOS' | 'VIETQR' | 'MOMO' | 'STRIPE';
    transactionId?: string;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
}

function toOrder(order: {
    orderId: string;
    orderCode: number;
    amount: number;
    description: string;
    customerName: string | null;
    customerEmail: string | null;
    status: OrderStatus;
    isVip: boolean;
    vipToken: string | null;
    paymentGateway: PaymentGateway;
    transactionId: string | null;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}): Order {
    return {
        orderId: order.orderId,
        orderCode: order.orderCode,
        amount: order.amount,
        description: order.description,
        customerName: order.customerName ?? undefined,
        customerEmail: order.customerEmail ?? undefined,
        status: order.status,
        is_vip: order.isVip,
        vipToken: order.vipToken ?? undefined,
        vipTokenExpiresAt: null,
        paymentGateway: order.paymentGateway,
        transactionId: order.transactionId ?? undefined,
        paidAt: order.paidAt?.toISOString(),
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString()
    };
}

export async function getOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'asc' } });
    return orders.map(toOrder);
}

export async function saveOrders(orders: Order[]): Promise<void> {
    await prisma.$transaction(async (transaction) => {
        for (const order of orders) {
            await transaction.order.upsert({
                where: { orderCode: order.orderCode },
                create: {
                    orderId: order.orderId,
                    orderCode: order.orderCode,
                    amount: order.amount,
                    description: order.description,
                    customerName: order.customerName,
                    customerEmail: order.customerEmail,
                    status: order.status,
                    isVip: order.is_vip,
                    vipToken: order.vipToken,
                    paymentGateway: order.paymentGateway,
                    transactionId: order.transactionId,
                    paidAt: order.paidAt ? new Date(order.paidAt) : null,
                    createdAt: new Date(order.createdAt),
                    updatedAt: new Date(order.updatedAt)
                },
                update: {
                    amount: order.amount,
                    description: order.description,
                    customerName: order.customerName,
                    customerEmail: order.customerEmail,
                    status: order.status,
                    isVip: order.is_vip,
                    vipToken: order.vipToken,
                    paymentGateway: order.paymentGateway,
                    transactionId: order.transactionId,
                    paidAt: order.paidAt ? new Date(order.paidAt) : null,
                    updatedAt: new Date(order.updatedAt)
                }
            });
        }
    });
}

export async function createOrder(data: {
    orderCode?: number;
    amount: number;
    description: string;
    customerName?: string;
    customerEmail?: string;
    paymentGateway?: 'PAYOS' | 'VIETQR' | 'MOMO' | 'STRIPE';
}): Promise<Order> {
    const orderCode = data.orderCode || Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const order = await prisma.order.create({
        data: {
            orderId: `ORD-${Date.now()}-${orderCode}`,
            orderCode,
            amount: data.amount,
            description: data.description,
            customerName: data.customerName || 'Khách hàng',
            customerEmail: data.customerEmail,
            paymentGateway: data.paymentGateway || 'PAYOS',
            createdAt: now,
            updatedAt: now
        }
    });
    return toOrder(order);
}

export async function getOrderByCode(orderCode: number): Promise<Order | null> {
    const order = await prisma.order.findUnique({ where: { orderCode } });
    return order ? toOrder(order) : null;
}

export async function updateOrderPaymentSuccess(
    orderCode: number,
    paymentDetails: {
        transactionId?: string;
        amount?: number;
        paymentGateway?: 'PAYOS' | 'VIETQR' | 'MOMO' | 'STRIPE';
    }
): Promise<{ order: Order; vipToken: string }> {
    const now = new Date();
    const existing = await prisma.order.findUnique({ where: { orderCode } });
    const orderId = existing?.orderId || `ORD-${Date.now()}-${orderCode}`;
    const vipToken = createVipAccessToken(orderId, orderCode);
    const order = await prisma.order.upsert({
        where: { orderCode },
        create: {
            orderId,
            orderCode,
            amount: paymentDetails.amount || 199000,
            description: `Kích hoạt VIP đơn #${orderCode}`,
            customerName: 'Khách hàng VietQR',
            paymentGateway: paymentDetails.paymentGateway || 'PAYOS',
            status: 'PAID',
            isVip: true,
            vipToken,
            transactionId: paymentDetails.transactionId,
            paidAt: now,
            createdAt: now,
            updatedAt: now
        },
        update: {
            status: 'PAID',
            isVip: true,
            vipToken,
            transactionId: paymentDetails.transactionId,
            paidAt: now,
            amount: paymentDetails.amount,
            paymentGateway: paymentDetails.paymentGateway,
            updatedAt: now
        }
    });
    return { order: toOrder(order), vipToken };
}