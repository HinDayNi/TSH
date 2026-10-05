import fs from 'fs/promises';
import path from 'path';
import { createVipAccessToken } from '@/lib/auth/vipToken';

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
    vipTokenExpiresAt: null; // null = trọn đời
    paymentGateway: 'PAYOS' | 'VIETQR' | 'MOMO' | 'STRIPE';
    transactionId?: string;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
}

const ORDERS_FILE_PATH = path.join(process.cwd(), 'data', 'orders.json');

// Đảm bảo file data/orders.json tồn tại
async function ensureOrdersFile(): Promise<void> {
    try {
        await fs.access(ORDERS_FILE_PATH);
    } catch {
        await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
}

/**
 * Đọc danh sách đơn hàng từ database
 */
export async function getOrders(): Promise<Order[]> {
    await ensureOrdersFile();
    try {
        const content = await fs.readFile(ORDERS_FILE_PATH, 'utf-8');
        return JSON.parse(content || '[]');
    } catch {
        return [];
    }
}

/**
 * Lưu danh sách đơn hàng vào database
 */
export async function saveOrders(orders: Order[]): Promise<void> {
    await ensureOrdersFile();
    await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2), 'utf-8');
}

/**
 * Tạo đơn hàng mới
 */
export async function createOrder(data: {
    orderCode?: number;
    amount: number;
    description: string;
    customerName?: string;
    customerEmail?: string;
    paymentGateway?: 'PAYOS' | 'VIETQR' | 'MOMO' | 'STRIPE';
}): Promise<Order> {
    const orders = await getOrders();
    const now = new Date().toISOString();

    const orderCode = data.orderCode || Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${Date.now()}-${orderCode}`;

    const newOrder: Order = {
        orderId,
        orderCode,
        amount: data.amount,
        description: data.description,
        customerName: data.customerName || 'Khách hàng',
        customerEmail: data.customerEmail,
        status: 'PENDING',
        is_vip: false,
        vipTokenExpiresAt: null,
        paymentGateway: data.paymentGateway || 'PAYOS',
        createdAt: now,
        updatedAt: now
    };

    orders.push(newOrder);
    await saveOrders(orders);
    return newOrder;
}

/**
 * Tìm đơn hàng theo mã orderCode
 */
export async function getOrderByCode(orderCode: number): Promise<Order | null> {
    const orders = await getOrders();
    return orders.find((o) => o.orderCode === orderCode) || null;
}

/**
 * Cập nhật trạng thái đơn hàng khi thanh toán thành công qua Webhook:
 * 1. Cập nhật status = 'PAID', is_vip = true
 * 2. Tạo VIP token trọn đời cho user
 */
export async function updateOrderPaymentSuccess(
    orderCode: number,
    paymentDetails: {
        transactionId?: string;
        amount?: number;
        paymentGateway?: 'PAYOS' | 'VIETQR' | 'MOMO' | 'STRIPE';
    }
): Promise<{ order: Order; vipToken: string }> {
    const orders = await getOrders();
    let orderIndex = orders.findIndex((o) => o.orderCode === orderCode);

    const now = new Date().toISOString();

    if (orderIndex === -1) {
        // Nếu chưa có đơn trong DB (ví dụ khách quét QR VietQR trực tiếp với nội dung CK)
        const autoOrderId = `ORD-${Date.now()}-${orderCode}`;
        const autoOrder: Order = {
            orderId: autoOrderId,
            orderCode,
            amount: paymentDetails.amount || 199000,
            description: `Kích hoạt VIP đơn #${orderCode}`,
            customerName: 'Khách hàng VietQR',
            status: 'PENDING',
            is_vip: false,
            vipTokenExpiresAt: null,
            paymentGateway: paymentDetails.paymentGateway || 'PAYOS',
            createdAt: now,
            updatedAt: now
        };
        orders.push(autoOrder);
        orderIndex = orders.length - 1;
    }

    const order = orders[orderIndex];

    // Tạo token truy cập bản báo cáo VIP trọn đời cho user
    const vipToken = createVipAccessToken(order.orderId, order.orderCode);

    order.status = 'PAID';
    order.is_vip = true;
    order.vipToken = vipToken;
    order.transactionId = paymentDetails.transactionId;
    order.paidAt = now;
    order.updatedAt = now;
    if (paymentDetails.amount) {
        order.amount = paymentDetails.amount;
    }

    orders[orderIndex] = order;
    await saveOrders(orders);

    return { order, vipToken };
}
