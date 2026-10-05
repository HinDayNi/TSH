'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Edit3, Printer, Sparkles, ChevronRight, Compass, Menu, HelpCircle, ArrowRight } from 'lucide-react';
import { useProfile } from '@/lib/context/ProfileContext';
import { useSidebar } from '@/lib/context/SidebarContext';
import { getRouteMetadata } from '@/lib/constants/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function TopHeader({
    onEditProfile
}: {
    onEditProfile: () => void;
}) {
    const pathname = usePathname();
    const { profile, data, hasCreatedMap, openHelpCenter } = useProfile();
    const { openMobile } = useSidebar();
    const currentRoute = getRouteMetadata(pathname);

    const CurrentIcon = currentRoute?.icon || Compass;
    const reportUrl = `/report?name=${encodeURIComponent(profile.fullName || '')}&dob=${profile.dob || ''}`;

    return (
        <header className="sticky top-0 z-20 h-14 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E7E4DD] no-print">
            <div className="max-w-[1400px] h-full mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
                {/* Left: Hamburger (Mobile) + Breadcrumb -> Page context -> Current mode */}
                <div className="flex items-center gap-2.5 min-w-0">
                    {/* Mobile Drawer Trigger */}
                    <button
                        type="button"
                        onClick={openMobile}
                        className="md:hidden min-w-[44px] min-h-[44px] -ml-2.5 flex items-center justify-center rounded-lg text-[#706E78] hover:text-[#1C1B22] hover:bg-[#EFECE6] transition cursor-pointer"
                        aria-label="Mở menu điều hướng"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-[#706E78] hover:text-[#1C1B22] transition hidden sm:inline-block truncate"
                    >
                        Không gian làm việc
                    </Link>

                    <ChevronRight className="w-4 h-4 text-[#96939C] shrink-0 hidden sm:inline-block" />

                    {currentRoute ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1C1B22]">
                            <CurrentIcon className="w-4 h-4 text-[#5146A5] shrink-0" />
                            <span className="truncate">{currentRoute.title}</span>
                        </div>
                    ) : (
                        <span className="text-sm font-bold text-[#1C1B22]">NUMERO</span>
                    )}

                    {/* Personal Life Path Tag */}
                    {hasCreatedMap && data?.lp && (
                        <Badge variant="primary" className="hidden md:inline-flex ml-1">
                            <Sparkles className="w-3 h-3 text-[#C59B45]" />
                            <span>Đường đời {data.lp}</span>
                        </Badge>
                    )}
                </div>

                {/* Right: Unified Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                    {hasCreatedMap && (
                        <>
                            <div className="hidden xl:flex items-center gap-2 text-xs text-[#706E78] mr-1">
                                <span className="font-medium text-[#1C1B22]">{profile.fullName || 'Hồ sơ cá nhân'}</span>
                                <span>•</span>
                                <span>{profile.dob}</span>
                            </div>

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

                            <Button
                                variant="secondary"
                                size="md"
                                onClick={onEditProfile}
                                leftIcon={<Edit3 className="w-[18px] h-[18px] text-[#706E78]" />}
                                title="Đổi thông tin ngày sinh hoặc họ tên"
                            >
                                <span className="hidden sm:inline">Đổi thông tin</span>
                            </Button>
                        </>
                    )}

                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => window.print()}
                        leftIcon={<Printer className="w-[18px] h-[18px] text-[#706E78]" />}
                        title="In trang"
                    >
                        <span className="hidden sm:inline">In</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default TopHeader;
