'use client';

import React, { useEffect } from 'react';
import { captureException } from '@/lib/monitoring/sentry';

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Gửi lỗi runtime tới Sentry / Monitoring log
        captureException(error, {
            tags: { source: 'app_error_boundary', digest: error.digest || 'unknown' },
            extra: { digest: error.digest }
        });
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl border border-rose-100">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Đã xảy ra lỗi không mong muốn</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                    Hệ thống giám sát đã tự động ghi nhận mã lỗi để đội ngũ kỹ thuật khắc phục. Quý khách vui lòng thử tải lại trang hoặc quay về trang chủ.
                </p>
                {error.digest && (
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200">
                        Error ID: {error.digest}
                    </div>
                )}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition cursor-pointer"
                    >
                        Thử lại
                    </button>
                    <a
                        href="/"
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    >
                        Về trang chủ
                    </a>
                </div>
            </div>
        </div>
    );
}
