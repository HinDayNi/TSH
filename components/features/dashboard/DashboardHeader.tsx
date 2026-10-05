'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardHeaderProps {
    firstName?: string;
    fullName?: string;
    dob?: string;
    onResetTour?: () => void;
    onOpenHelp?: () => void;
}

export function DashboardHeader({
    firstName,
    fullName,
    dob,
    onResetTour,
    onOpenHelp
}: DashboardHeaderProps) {
    const handleHelpClick = onOpenHelp || onResetTour;
    const reportUrl = `/report?name=${encodeURIComponent(fullName || '')}&dob=${dob || ''}`;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Left: Greeting & Personal Context */}
            <div className="min-w-0">
                <h1 className="text-2xl sm:text-[28px] lg:text-3xl font-serif font-bold text-[#1C1B22] tracking-tight leading-tight">
                    Chào {firstName || fullName || 'bạn'}
                </h1>
                <p className="text-xs sm:text-sm text-[#706E78] mt-0.5">
                    Bản đồ thần số học cá nhân
                </p>
            </div>

            {/* Right: Action Hierarchy (Secondary 'Hướng dẫn' + Primary 'Xem hồ sơ →') */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <Button
                    variant="secondary"
                    size="md"
                    onClick={handleHelpClick}
                    leftIcon={<HelpCircle className="w-4 h-4 text-[#706E78]" />}
                    title="Xem hướng dẫn sử dụng workspace"
                >
                    <span>Hướng dẫn</span>
                </Button>

                <Link href={reportUrl}>
                    <Button
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        title="Xem toàn bộ hồ sơ phân tích số học"
                    >
                        <span>Xem hồ sơ</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default DashboardHeader;
