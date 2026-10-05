'use client';

import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useNumberDetail } from '@/lib/context/NumberDetailContext';
import {
    getExpressionTitle,
    getSoulUrgeTitle,
    getPersonalityTitle,
    NUMEROLOGY_DETAILS,
    reduceNumber
} from '@/lib/numerology/calculator';

interface CoreEnergyCardProps {
    lp: number | string;
    expression?: number;
    soulUrge?: number;
    personality?: number;
    attitude?: string | number;
    personalYear?: number | string;
}

export function CoreEnergyCard({
    lp,
    expression,
    soulUrge,
    personality,
    attitude,
    personalYear
}: CoreEnergyCardProps) {
    const { openNumberDetail } = useNumberDetail();

    const lpNum = Number(lp) || 1;
    const reducedVal = reduceNumber(lpNum, false);
    const lpOverview = (NUMEROLOGY_DETAILS as any)[reducedVal]?.overview || 'Đại diện cho hướng đi chính và bài học lớn nhất cuộc đời.';

    const coreItems = [
        {
            label: 'Đường Đời',
            number: lpNum,
            isPrimary: true,
            role: 'Hành trình & Bài học lớn nhất',
            meaning: lpOverview,
            type: 'lifepath'
        },
        ...(expression !== undefined
            ? [
                {
                    label: 'Sứ Mệnh',
                    number: expression,
                    isPrimary: false,
                    role: 'Phương thức biểu đạt',
                    meaning: getExpressionTitle(expression) || 'Năng lực và tài năng bẩm sinh.',
                    type: 'expression'
                }
            ]
            : []),
        ...(soulUrge !== undefined
            ? [
                {
                    label: 'Linh Hồn',
                    number: soulUrge,
                    isPrimary: false,
                    role: 'Khao khát nội tâm',
                    meaning: getSoulUrgeTitle(soulUrge) || 'Động lực thầm kín mang lại bình yên.',
                    type: 'soulUrge'
                }
            ]
            : []),
        ...(personality !== undefined
            ? [
                {
                    label: 'Nhân Cách',
                    number: personality,
                    isPrimary: false,
                    role: 'Ấn tượng giao tiếp',
                    meaning: getPersonalityTitle(personality) || 'Phong thái biểu hiện ra bên ngoài.',
                    type: 'personality'
                }
            ]
            : [])
    ];

    const handleOpenDetail = (item: (typeof coreItems)[0]) => {
        openNumberDetail({
            number: item.number,
            title: item.label,
            role: item.role,
            summary: item.meaning,
            type: item.type
        });
    };

    return (
        <div className="h-full bg-white rounded-2xl border border-[#E7E4DD] p-5 sm:p-6 flex flex-col justify-between shadow-subtle">
            <div className="space-y-3.5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DD]">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5146A5]" />
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1B22]">
                            Cấu Trúc Năng Lượng Cốt Lõi
                        </h3>
                    </div>
                    {personalYear && (
                        <Badge variant="gold">
                            Năm cá nhân {personalYear}
                        </Badge>
                    )}
                </div>

                {/* Primary Short Insight */}
                <p className="text-xs sm:text-sm text-[#706E78] leading-relaxed">
                    Sự kết hợp giữa <span className="text-[#1C1B22] font-semibold">Ngày sinh</span> và <span className="text-[#1C1B22] font-semibold">Họ tên</span> định hình 4 chỉ số trụ cột dẫn dắt tiềm năng và hành vi của bạn.
                </p>

                {/* Structured Core Indicators List */}
                <div className="space-y-2 pt-1">
                    {coreItems.map((item) => (
                        <div
                            key={item.label}
                            onClick={() => handleOpenDetail(item)}
                            className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all duration-150 cursor-pointer group ${item.isPrimary
                                    ? 'bg-[#F1EFFA]/70 border-[#5146A5]/25 hover:border-[#5146A5]/50'
                                    : 'bg-[#F8F7F4]/80 border-[#E7E4DD] hover:bg-[#F8F7F4] hover:border-[#D3CEEE]'
                                }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className={`w-8 h-8 rounded-lg font-serif font-bold text-sm flex items-center justify-center shrink-0 border ${item.isPrimary
                                            ? 'bg-[#5146A5] text-white border-[#5146A5]'
                                            : 'bg-white text-[#1C1B22] border-[#E7E4DD] group-hover:border-[#5146A5]/30 group-hover:text-[#5146A5]'
                                        }`}
                                >
                                    {item.number}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-xs font-bold truncate ${item.isPrimary ? 'text-[#5146A5]' : 'text-[#1C1B22]'}`}>
                                            {item.label}
                                        </span>
                                        <span className="text-[10px] text-[#96939C] truncate hidden xs:inline">
                                            • {item.role}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[#706E78] truncate max-w-[200px] sm:max-w-[260px]">
                                        {item.meaning}
                                    </p>
                                </div>
                            </div>

                            <ChevronRight className="w-4 h-4 text-[#96939C] group-hover:text-[#5146A5] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 mt-4 border-t border-[#E7E4DD]">
                <Button
                    variant="secondary"
                    size="md"
                    className="w-full justify-between"
                    onClick={() => handleOpenDetail(coreItems[0])}
                    rightIcon={<ArrowRight className="w-4 h-4 text-[#5146A5]" />}
                >
                    <span className="text-xs font-semibold">Xem chi tiết bài học Đường Đời</span>
                </Button>
            </div>
        </div>
    );
}

export default CoreEnergyCard;
