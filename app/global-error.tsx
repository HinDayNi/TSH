'use client';

import React, { useEffect } from 'react';
import { captureException } from '@/lib/monitoring/sentry';

export default function GlobalError({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        captureException(error, {
            tags: { source: 'global_root_error_boundary', digest: error.digest || 'unknown' }
        });
    }, [error]);

    return (
        <html lang="vi">
            <body className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 p-4 font-sans">
                <div className="max-w-md w-full bg-slate-800/80 rounded-3xl p-8 border border-slate-700 shadow-2xl text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl border border-rose-500/30">
                        <i className="fa-solid fa-server"></i>
                    </div>
                    <h2 className="text-xl font-bold text-white">Lỗi Hệ Thống Nghiêm Trọng</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Ứng dụng gặp sự cố cấp khung giao diện. Thông báo lỗi đã được gửi đến hệ thống giám sát Sentry.
                    </p>
                    <div className="pt-2">
                        <button
                            onClick={() => reset()}
                            className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition cursor-pointer"
                        >
                            Khởi động lại trang
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
