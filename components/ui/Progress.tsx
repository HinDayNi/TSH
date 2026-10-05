'use client';

import React from 'react';

export function Progress({
    current,
    total,
    showBar = false,
    className = ''
}: {
    current: number;
    total: number;
    showBar?: boolean;
    className?: string;
}) {
    const formatNum = (n: number) => String(n).padStart(2, '0');
    const percent = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className={`space-y-1.5 ${className}`}>
            <div className="flex items-center gap-2 font-mono text-xs text-[#68687A]">
                <span className="font-semibold text-[#17172B]">{formatNum(current)}</span>
                <span>/</span>
                <span>{formatNum(total)}</span>
            </div>
            {showBar && (
                <div className="w-full h-1 bg-[#E7E5E4] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#4F46E5] transition-all duration-300 ease-out"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            )}
        </div>
    );
}

export const ProgressIndicator = Progress;
export default Progress;
