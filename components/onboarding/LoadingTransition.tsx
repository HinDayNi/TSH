'use client';

import React from 'react';
import { Compass } from 'lucide-react';

export interface LoadingTransitionProps {
    stage?: number;
    messages?: string[];
    message?: string;
}

export function LoadingTransition({
    stage = 0,
    messages = ['Đang tính toán các chỉ số...'],
    message
}: LoadingTransitionProps) {
    const currentMsg = message || messages[stage] || messages[0];
    const percent = Math.min(100, Math.round(((stage + 1) / messages.length) * 100));

    return (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
            <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#E7E4DD] border-t-[#5146A5] animate-spin" />
                <Compass className="w-7 h-7 text-[#5146A5]" />
            </div>

            <div className="space-y-2 max-w-sm">
                <p className="font-serif font-bold text-lg text-[#1C1B22]">
                    {currentMsg}
                </p>
                <p className="text-xs text-[#706E78]">
                    Hệ thống đang đối soát dữ liệu ma trận rung động và thiết lập bản đồ...
                </p>
            </div>

            <div className="w-48 h-1.5 bg-[#E7E4DD] rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[#5146A5] rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${percent}%` }} 
                />
            </div>
        </div>
    );
}

export default LoadingTransition;
