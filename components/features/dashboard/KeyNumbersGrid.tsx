'use client';

import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useNumberDetail } from '@/lib/context/NumberDetailContext';
import { Badge } from '@/components/ui/Badge';
import {
    getExpressionTitle,
    getSoulUrgeTitle,
    getPersonalityTitle,
    NUMEROLOGY_DETAILS,
    reduceNumber
} from '@/lib/numerology/calculator';

interface KeyNumbersGridProps {
    lp: number;
    expression: number;
    soulUrge: number;
    personality: number;
}

export function KeyNumbersGrid({
    lp,
    expression,
    soulUrge,
    personality
}: KeyNumbersGridProps) {
    const { openNumberDetail } = useNumberDetail();

    const lpVal = reduceNumber(lp, false);
    const lpSummary = (NUMEROLOGY_DETAILS as any)[lpVal]?.overview || 'Đại diện cho hướng đi chính và bài học lớn nhất cuộc đời.';

    const pillars = [
        {
            id: 'lifepath',
            title: 'Đường Đời',
            number: lp,
            isHero: true,
            badge: 'Chủ đạo',
            role: 'Hành trình & Bài học chính',
            summary: lpSummary,
            type: 'lifepath'
        },
        {
            id: 'expression',
            title: 'Sứ Mệnh',
            number: expression,
            isHero: false,
            badge: 'Biểu đạt',
            role: 'Tài năng & Cách hành động',
            summary: getExpressionTitle(expression) || 'Năng lực hành động và tài năng bẩm sinh.',
            type: 'expression'
        },
        {
            id: 'soulUrge',
            title: 'Linh Hồn',
            number: soulUrge,
            isHero: false,
            badge: 'Nội tâm',
            role: 'Khao khát & Bình yên sâu kín',
            summary: getSoulUrgeTitle(soulUrge) || 'Động lực sâu kín mang lại bình an.',
            type: 'soulUrge'
        },
        {
            id: 'personality',
            title: 'Nhân Cách',
            number: personality,
            isHero: false,
            badge: 'Giao tiếp',
            role: 'Phong thái & Hình ảnh xã hội',
            summary: getPersonalityTitle(personality) || 'Ấn tượng đầu tiên trong giao tiếp.',
            type: 'personality'
        }
    ];

    return (
        <div data-tour="key-numbers" className="space-y-3.5">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1C1B22]">
                        4 Chỉ Số Trụ Cột
                    </h2>
                    <p className="text-xs sm:text-sm text-[#706E78]">
                        Đường Đời là trọng tâm dẫn dắt, kết hợp cùng Sứ Mệnh, Linh Hồn và Nhân Cách
                    </p>
                </div>
            </div>

            {/* 4 Modular Compact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                {pillars.map((item) => (
                    <div
                        key={item.id}
                        data-tour={item.id === 'lifepath' ? 'lifepath' : undefined}
                        onClick={() =>
                            openNumberDetail({
                                number: item.number,
                                title: item.title,
                                role: item.role,
                                summary: item.summary,
                                type: item.type
                            })
                        }
                        className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 shadow-subtle ${item.isHero
                                ? 'bg-[#F1EFFA]/50 border border-[#5146A5]/30 hover:border-[#5146A5]/60 hover:bg-[#F1EFFA]/80'
                                : 'bg-white border border-[#E7E4DD] hover:border-[#D3CEEE] hover:shadow-card'
                            }`}
                    >
                        <div className="space-y-3">
                            {/* Top row: badge & number */}
                            <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${item.isHero ? 'text-[#5146A5]' : 'text-[#706E78]'
                                    }`}>
                                    {item.title}
                                </span>
                                <Badge variant={item.isHero ? 'primary' : 'neutral'} className="text-[10px] px-2 py-0.5">
                                    {item.badge}
                                </Badge>
                            </div>

                            {/* Large Number & Role */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif font-bold text-2xl shrink-0 transition-transform group-hover:scale-105 ${item.isHero
                                            ? 'bg-[#5146A5] text-white shadow-xs'
                                            : 'bg-[#F8F7F4] text-[#1C1B22] border border-[#E7E4DD] group-hover:bg-[#F1EFFA] group-hover:text-[#5146A5] group-hover:border-[#5146A5]/30'
                                        }`}
                                >
                                    {item.number}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-serif font-bold text-base text-[#1C1B22] truncate">
                                        {item.title} Số {item.number}
                                    </h3>
                                    <p className="text-[11px] text-[#706E78] truncate">
                                        {item.role}
                                    </p>
                                </div>
                            </div>

                            {/* Short Meaning */}
                            <p className="text-xs text-[#706E78] line-clamp-2 leading-relaxed">
                                {item.summary}
                            </p>
                        </div>

                        {/* Card Footer Action */}
                        <div className="pt-3 mt-3 border-t border-[#E7E4DD]/70 flex items-center justify-between text-xs font-semibold text-[#706E78] group-hover:text-[#5146A5] transition-colors">
                            <span>Chi tiết chỉ số</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KeyNumbersGrid;
