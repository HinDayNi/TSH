import { NextRequest, NextResponse } from 'next/server';
import { captureException } from '@/lib/monitoring/sentry';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, name, dob } = body;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Địa chỉ email không hợp lệ' },
                { status: 400 }
            );
        }

        await prisma.subscriber.upsert({
            where: { email: email.toLowerCase().trim() },
            update: {},
            create: { email: email.toLowerCase().trim(), name: name || 'Bạn đọc', dob }
        });

        return NextResponse.json({
            success: true,
            message: 'Đăng ký nhận thông báo năng lượng ngày 1 hàng tháng thành công!'
        });
    } catch (err: any) {
        captureException(err, { tags: { route: 'newsletter_subscribe' } });
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
