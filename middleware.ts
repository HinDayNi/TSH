import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './lib/security/ratelimit';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Lấy định danh IP của client (hỗ trợ reverse proxy / cloudflare / vercel)
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1';

    // ------------------------------------------------------------------
    // 1. Áp dụng Rate Limiting cho API Routes và Endpoint Báo cáo (/report)
    // ------------------------------------------------------------------
    if (pathname.startsWith('/api/') || pathname.startsWith('/report')) {
        // Ngoại trừ Webhook thanh toán (cần tiếp nhận liên tục từ ngân hàng)
        const isPaymentWebhook = pathname.startsWith('/api/webhook/payment');

        if (!isPaymentWebhook) {
            const prefix = pathname.startsWith('/report') ? 'report_' : 'api_';
            const { success, limit, remaining, reset } = await checkRateLimit(`${prefix}${ip}`);

            if (!success) {
                if (pathname.startsWith('/api/')) {
                    return new NextResponse(
                        JSON.stringify({
                            success: false,
                            error: 'Too Many Requests',
                            message: 'Bạn đã gửi quá nhiều yêu cầu liên tiếp. Vui lòng đợi 1 phút trước khi thử lại.'
                        }),
                        {
                            status: 429,
                            headers: {
                                'Content-Type': 'application/json',
                                'X-RateLimit-Limit': limit.toString(),
                                'X-RateLimit-Remaining': remaining.toString(),
                                'X-RateLimit-Reset': reset.toString(),
                                'Retry-After': '60'
                            }
                        }
                    );
                } else {
                    return new NextResponse(
                        `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>429 - Quá Nhiều Yêu Cầu | Thần Số Học</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: white; border-radius: 24px; padding: 40px; max-width: 480px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        h1 { font-size: 22px; color: #e11d48; margin-bottom: 12px; font-weight: 800; }
        p { font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
        a { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px; transition: background 0.2s; }
        a:hover { background: #1d4ed8; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Giới Hạn Tần Suất Tra Cứu</h1>
        <p>Hệ thống phát hiện tần suất gửi yêu cầu quá nhanh từ thiết bị của bạn nhằm bảo vệ dữ liệu luận giải độc quyền. Vui lòng đợi khoảng 1 phút trước khi tiếp tục tra cứu.</p>
        <a href="/">Quay lại Trang Chủ</a>
    </div>
</body>
</html>`,
                        {
                            status: 429,
                            headers: {
                                'Content-Type': 'text/html; charset=utf-8',
                                'Retry-After': '60'
                            }
                        }
                    );
                }
            }
        }
    }

    // ------------------------------------------------------------------
    // 2. Thiết lập Security Headers chuẩn Production
    // ------------------------------------------------------------------
    const response = NextResponse.next();

    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
};
