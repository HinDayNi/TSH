import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { captureException } from '@/lib/monitoring/sentry';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

async function ensureSubscribersFile(): Promise<void> {
    try {
        await fs.access(SUBSCRIBERS_FILE);
    } catch {
        await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
}

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

        await ensureSubscribersFile();
        const content = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
        const subscribers: Array<{ email: string; name?: string; dob?: string; subscribedAt: string }> =
            JSON.parse(content || '[]');

        const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
        if (!existing) {
            subscribers.push({
                email: email.toLowerCase().trim(),
                name: name || 'Bạn đọc',
                dob,
                subscribedAt: new Date().toISOString()
            });
            await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
        }

        return NextResponse.json({
            success: true,
            message: 'Đăng ký nhận thông báo năng lượng ngày 1 hàng tháng thành công!'
        });
    } catch (err: any) {
        captureException(err, { tags: { route: 'newsletter_subscribe' } });
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
