'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, User, Briefcase, CalendarClock, HeartHandshake } from 'lucide-react';

export function SuggestedExplorations() {
    const explorationItems = [
        {
            title: 'Hiểu bản thân',
            description: 'Ma trận ngày sinh 3x3 và phân bổ năng lượng Thân - Tâm - Trí',
            href: '/identity',
            icon: User,
            iconColor: 'text-[#5146A5]',
            iconBg: 'bg-[#F1EFFA]'
        },
        {
            title: 'Sự nghiệp',
            description: 'Khám phá môi trường làm việc và xu hướng nghề nghiệp tối ưu',
            href: '/analysis?type=career',
            icon: Briefcase,
            iconColor: 'text-[#5146A5]',
            iconBg: 'bg-[#F1EFFA]'
        },
        {
            title: 'Tình cảm',
            description: 'Xem tương hợp tần số năng lượng và bài học gắn kết cặp đôi',
            href: '/compare?tab=couple',
            icon: HeartHandshake,
            iconColor: 'text-[#547A67]',
            iconBg: 'bg-[#547A67]/10'
        },
        {
            title: 'Dòng thời gian',
            description: 'Xem chu kỳ 9 năm và 4 đỉnh cao kim tự tháp vận trình',
            href: '/timeline',
            icon: CalendarClock,
            iconColor: 'text-[#C59B45]',
            iconBg: 'bg-[#EFE2C2]/40'
        }
    ];

    return (
        <div data-tour="suggested-explorations" className="space-y-3.5 pt-1">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1C1B22]">
                        Khám Phá Tiếp
                    </h2>
                    <p className="text-xs sm:text-sm text-[#706E78]">
                        Định hướng bước đi tiếp theo dựa trên cấu trúc năng lượng độc bản của bạn
                    </p>
                </div>
            </div>

            {/* 4 Focused Exploration Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {explorationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E4DD] hover:border-[#D3CEEE] hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 shadow-subtle group flex flex-col justify-between space-y-4"
                        >
                            <div className="space-y-3">
                                <div className={`w-10 h-10 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-serif font-bold text-base text-[#1C1B22] group-hover:text-[#5146A5] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-[#706E78] leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center text-xs font-semibold text-[#706E78] group-hover:text-[#5146A5] transition-colors">
                                <span>Khám phá ngay</span>
                                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default SuggestedExplorations;
