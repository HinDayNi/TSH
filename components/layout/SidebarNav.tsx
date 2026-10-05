'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Compass,
    Map,
    User,
    HeartHandshake,
    Briefcase,
    CalendarClock,
    Sparkles,
    HelpCircle,
    Settings,
    Edit3,
    PanelLeftClose,
    PanelLeftOpen,
    PanelLeft,
    X
} from 'lucide-react';
import { useProfile } from '@/lib/context/ProfileContext';
import { useSidebar } from '@/lib/context/SidebarContext';
import { Tooltip } from '@/components/ui/Tooltip';

export function SidebarNav({
    onEditProfile
}: {
    onEditProfile: () => void;
}) {
    const pathname = usePathname();
    const { profile, data, hasCreatedMap, openHelpCenter } = useProfile();
    const { isCollapsed, toggleCollapse, isMobileOpen, closeMobile } = useSidebar();

    const handleStartTour = () => {
        closeMobile();
        openHelpCenter();
    };

    const handleEditProfile = () => {
        closeMobile();
        onEditProfile();
    };

    // Navigation groups
    const exploreItems = [
        { label: 'Tổng quan', href: '/', icon: Compass, exact: true },
        { label: 'Bản đồ của tôi', href: '/dashboard', icon: Map, requiresMap: true }
    ];

    const analysisItems = [
        { label: 'Hiểu bản thân', href: '/identity', icon: User, requiresMap: true },
        { label: 'Sự nghiệp', href: '/analysis?type=career', icon: Briefcase, requiresMap: true },
        { label: 'Tình cảm', href: '/compare?tab=couple', icon: HeartHandshake, requiresMap: true },
        { label: 'Dòng thời gian', href: '/timeline', icon: CalendarClock, requiresMap: true }
    ];

    const toolItems = [
        { label: 'So sánh', href: '/compare?tab=names', icon: HeartHandshake, requiresMap: true },
        { label: 'Tối ưu tên', href: '/naming', icon: Sparkles, requiresMap: true }
    ];

    const renderDesktopNavLink = (item: { label: string; href: string; icon: any; requiresMap?: boolean; exact?: boolean }) => {
        if (item.requiresMap && !hasCreatedMap) return null;

        const Icon = item.icon;
        const isActive = item.exact 
            ? pathname === item.href 
            : pathname === item.href.split('?')[0];

        if (isCollapsed) {
            return (
                <div key={item.label + item.href} className="flex justify-center">
                    <Tooltip content={item.label} position="right">
                        <Link
                            href={item.href}
                            data-tour={item.href === '/dashboard' ? 'sidebar-map' : undefined}
                            aria-label={item.label}
                            className={`w-10 h-10 flex items-center justify-center rounded-[10px] text-sm font-medium transition-all duration-200 group select-none ${
                                isActive
                                    ? 'bg-[#F1EFFA] text-[#5146A5] font-semibold ring-1 ring-[#5146A5]/20 shadow-xs'
                                    : 'text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4]'
                            }`}
                        >
                            <Icon
                                strokeWidth={isActive ? 2 : 1.75}
                                className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                                    isActive ? 'text-[#5146A5]' : 'text-[#706E78] group-hover:text-[#1C1B22]'
                                }`}
                            />
                        </Link>
                    </Tooltip>
                </div>
            );
        }

        return (
            <Link
                key={item.label + item.href}
                href={item.href}
                data-tour={item.href === '/dashboard' ? 'sidebar-map' : undefined}
                className={`h-10 flex items-center gap-2.5 px-3 rounded-[10px] text-sm font-medium transition-all duration-200 group select-none ${
                    isActive
                        ? 'bg-[#F1EFFA] text-[#5146A5] font-semibold'
                        : 'text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4]'
                }`}
            >
                <Icon
                    strokeWidth={isActive ? 2 : 1.75}
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                        isActive ? 'text-[#5146A5]' : 'text-[#706E78] group-hover:text-[#1C1B22]'
                    }`}
                />
                <span className="truncate">{item.label}</span>
            </Link>
        );
    };

    const renderMobileNavLink = (item: { label: string; href: string; icon: any; requiresMap?: boolean; exact?: boolean }) => {
        if (item.requiresMap && !hasCreatedMap) return null;

        const Icon = item.icon;
        const isActive = item.exact 
            ? pathname === item.href 
            : pathname === item.href.split('?')[0];

        return (
            <Link
                key={'mobile-' + item.label + item.href}
                href={item.href}
                onClick={closeMobile}
                className={`min-h-[44px] flex items-center gap-3 px-3.5 rounded-[12px] text-sm font-medium transition-all duration-200 select-none ${
                    isActive
                        ? 'bg-[#F1EFFA] text-[#5146A5] font-semibold'
                        : 'text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4]'
                }`}
            >
                <Icon
                    strokeWidth={isActive ? 2 : 1.75}
                    className={`w-[19px] h-[19px] shrink-0 transition-colors ${
                        isActive ? 'text-[#5146A5]' : 'text-[#706E78]'
                    }`}
                />
                <span className="truncate">{item.label}</span>
            </Link>
        );
    };

    return (
        <>
            {/* ========================================================================= */}
            {/* DESKTOP SIDEBAR                                                           */}
            {/* ========================================================================= */}
            <aside
                className={`hidden md:flex flex-col fixed inset-y-0 left-0 h-screen bg-white border-r border-[#E7E4DD] z-30 select-none transition-[width] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCollapsed ? 'w-[72px]' : 'w-[240px]'
                }`}
            >
                {/* 1. Header with Logo & Toggle Button */}
                <div
                    className={`h-16 flex items-center border-b border-[#E7E4DD] shrink-0 transition-all duration-200 ${
                        isCollapsed ? 'px-3 justify-between' : 'px-4 justify-between'
                    }`}
                >
                    {isCollapsed ? (
                        <>
                            <Tooltip content="Trang chủ NUMERO" position="right">
                                <Link
                                    href="/"
                                    className="font-serif text-xl font-bold tracking-wider text-[#1C1B22] hover:text-[#5146A5] transition-colors flex items-center pl-1"
                                    aria-label="NUMERO Home"
                                >
                                    N<span className="w-1.5 h-1.5 rounded-full bg-[#C59B45] inline-block mb-1 ml-0.5" />
                                </Link>
                            </Tooltip>
                            <Tooltip content="Mở rộng sidebar" position="right">
                                <button
                                    type="button"
                                    onClick={toggleCollapse}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4] border border-transparent hover:border-[#E7E4DD] transition cursor-pointer"
                                    title="Mở rộng sidebar"
                                    aria-label="Mở rộng sidebar"
                                >
                                    <PanelLeftOpen strokeWidth={1.75} className="w-[18px] h-[18px]" />
                                </button>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Link href="/" className="flex items-center gap-1.5 group pl-1">
                                <span className="font-serif text-2xl font-bold tracking-wider text-[#1C1B22] group-hover:text-[#5146A5] transition-colors">
                                    NUMERO
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B45] inline-block mb-1" />
                            </Link>
                            <button
                                type="button"
                                onClick={toggleCollapse}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4] border border-transparent hover:border-[#E7E4DD] transition cursor-pointer"
                                title="Thu gọn sidebar"
                                aria-label="Thu gọn sidebar"
                            >
                                <PanelLeftClose strokeWidth={1.75} className="w-[18px] h-[18px]" />
                            </button>
                        </>
                    )}
                </div>

                {/* 2. Navigation Content */}
                <nav
                    data-tour="main-nav"
                    className={`flex-1 py-5 overflow-y-auto overflow-x-hidden ${
                        isCollapsed ? 'px-2 space-y-4' : 'px-3 space-y-6'
                    }`}
                    aria-label="Main Navigation"
                >
                    {/* KHÁM PHÁ */}
                    <div className="space-y-1">
                        {!isCollapsed ? (
                            <div className="px-3 pb-1.5 text-[11px] font-mono uppercase tracking-widest text-[#96939C] font-semibold">
                                Khám phá
                            </div>
                        ) : null}
                        {exploreItems.map(renderDesktopNavLink)}
                    </div>

                    {/* PHÂN TÍCH */}
                    {hasCreatedMap && (
                        <div className="space-y-1">
                            {isCollapsed ? (
                                <div className="my-2 mx-auto w-6 border-t border-[#E7E4DD]" />
                            ) : (
                                <div className="px-3 pb-1.5 text-[11px] font-mono uppercase tracking-widest text-[#96939C] font-semibold">
                                    Phân tích
                                </div>
                            )}
                            {analysisItems.map(renderDesktopNavLink)}
                        </div>
                    )}

                    {/* CÔNG CỤ */}
                    {hasCreatedMap && (
                        <div className="space-y-1">
                            {isCollapsed ? (
                                <div className="my-2 mx-auto w-6 border-t border-[#E7E4DD]" />
                            ) : (
                                <div className="px-3 pb-1.5 text-[11px] font-mono uppercase tracking-widest text-[#96939C] font-semibold">
                                    Công cụ
                                </div>
                            )}
                            {toolItems.map(renderDesktopNavLink)}
                        </div>
                    )}
                </nav>

                {/* 3. Bottom Utility & Profile */}
                <div
                    className={`border-t border-[#E7E4DD] bg-[#F8F7F4]/60 transition-all duration-200 ${
                        isCollapsed ? 'p-2 space-y-2' : 'p-3 space-y-2'
                    }`}
                >
                    <div className="space-y-1">
                        {/* Hướng dẫn */}
                        {isCollapsed ? (
                            <div className="flex justify-center">
                                <Tooltip content="Hướng dẫn sử dụng (Tour)" position="right">
                                    <button
                                        type="button"
                                        onClick={handleStartTour}
                                        aria-label="Hướng dẫn sử dụng"
                                        className="w-10 h-10 flex items-center justify-center rounded-[10px] text-[#706E78] hover:text-[#1C1B22] hover:bg-white transition cursor-pointer"
                                    >
                                        <HelpCircle strokeWidth={1.75} className="w-[18px] h-[18px] text-[#C59B45]" />
                                    </button>
                                </Tooltip>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleStartTour}
                                className="w-full h-10 flex items-center gap-2.5 px-3 rounded-[10px] text-sm text-[#706E78] hover:text-[#1C1B22] hover:bg-white transition cursor-pointer"
                            >
                                <HelpCircle strokeWidth={1.75} className="w-[18px] h-[18px] text-[#C59B45]" />
                                <span>Hướng dẫn</span>
                            </button>
                        )}

                        {/* Cài đặt hồ sơ */}
                        {hasCreatedMap && (
                            isCollapsed ? (
                                <div className="flex justify-center">
                                    <Tooltip content="Cài đặt hồ sơ" position="right">
                                        <button
                                            type="button"
                                            onClick={handleEditProfile}
                                            aria-label="Cài đặt hồ sơ"
                                            className="w-10 h-10 flex items-center justify-center rounded-[10px] text-[#706E78] hover:text-[#1C1B22] hover:bg-white transition cursor-pointer"
                                        >
                                            <Settings strokeWidth={1.75} className="w-[18px] h-[18px] text-[#706E78]" />
                                        </button>
                                    </Tooltip>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleEditProfile}
                                    className="w-full h-10 flex items-center gap-2.5 px-3 rounded-[10px] text-sm text-[#706E78] hover:text-[#1C1B22] hover:bg-white transition cursor-pointer"
                                >
                                    <Settings strokeWidth={1.75} className="w-[18px] h-[18px] text-[#706E78]" />
                                    <span>Cài đặt hồ sơ</span>
                                </button>
                            )
                        )}
                    </div>

                    {/* Profile Card */}
                    {hasCreatedMap && (
                        isCollapsed ? (
                            <div className="flex justify-center pt-1">
                                <Tooltip
                                    content={`${profile.fullName || 'Người khám phá'} • Đường đời ${data?.lp || '—'}`}
                                    position="right"
                                >
                                    <button
                                        type="button"
                                        onClick={handleEditProfile}
                                        aria-label="Chỉnh sửa thông tin cá nhân"
                                        className="w-10 h-10 rounded-lg bg-white text-[#5146A5] font-serif font-bold text-xs flex items-center justify-center border border-[#5146A5]/25 shadow-xs hover:border-[#5146A5] hover:scale-105 transition cursor-pointer"
                                    >
                                        {data?.lp || '—'}
                                    </button>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-white p-2.5 rounded-[12px] border border-[#E7E4DD] shadow-subtle">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-[#F1EFFA] text-[#5146A5] font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#5146A5]/20">
                                        {data?.lp || '—'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-[#1C1B22] truncate">
                                            {profile.fullName || 'Người khám phá'}
                                        </p>
                                        <p className="text-[11px] text-[#706E78] truncate">
                                            {profile.dob || 'Chưa có ngày sinh'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleEditProfile}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4] transition cursor-pointer shrink-0"
                                    title="Sửa ngày sinh / họ tên"
                                    aria-label="Sửa ngày sinh / họ tên"
                                >
                                    <Edit3 strokeWidth={1.5} className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    )}
                </div>
            </aside>

            {/* ========================================================================= */}
            {/* MOBILE DRAWER (SLIDE FROM LEFT)                                            */}
            {/* ========================================================================= */}
            {isMobileOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <div
                        className="md:hidden fixed inset-0 z-50 bg-[#1C1B22]/50 backdrop-blur-xs animate-fadeIn no-print"
                        onClick={closeMobile}
                        aria-hidden="true"
                    />

                    {/* Drawer Container */}
                    <aside
                        className="md:hidden fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white border-r border-[#E7E4DD] flex flex-col shadow-2xl animate-slideInLeft select-none no-print"
                        aria-label="Mobile Navigation Drawer"
                    >
                        {/* Drawer Header */}
                        <div className="h-16 flex items-center justify-between px-5 border-b border-[#E7E4DD] shrink-0">
                            <Link
                                href="/"
                                onClick={closeMobile}
                                className="flex items-center gap-1.5 group"
                            >
                                <span className="font-serif text-2xl font-bold tracking-wider text-[#1C1B22]">
                                    NUMERO
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B45] inline-block mb-1" />
                            </Link>

                            <button
                                type="button"
                                onClick={closeMobile}
                                className="w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4] transition cursor-pointer"
                                aria-label="Đóng menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation Groups */}
                        <nav className="flex-1 px-4 py-5 space-y-6 overflow-y-auto" aria-label="Mobile Navigation">
                            {/* KHÁM PHÁ */}
                            <div className="space-y-1.5">
                                <div className="px-3 pb-1 text-[11px] font-mono uppercase tracking-widest text-[#96939C] font-semibold">
                                    Khám phá
                                </div>
                                {exploreItems.map(renderMobileNavLink)}
                            </div>

                            {/* PHÂN TÍCH */}
                            {hasCreatedMap && (
                                <div className="space-y-1.5">
                                    <div className="px-3 pb-1 text-[11px] font-mono uppercase tracking-widest text-[#96939C] font-semibold">
                                        Phân tích
                                    </div>
                                    {analysisItems.map(renderMobileNavLink)}
                                </div>
                            )}

                            {/* CÔNG CỤ */}
                            {hasCreatedMap && (
                                <div className="space-y-1.5">
                                    <div className="px-3 pb-1 text-[11px] font-mono uppercase tracking-widest text-[#96939C] font-semibold">
                                        Công cụ
                                    </div>
                                    {toolItems.map(renderMobileNavLink)}
                                </div>
                            )}
                        </nav>

                        {/* Bottom Utility & Profile */}
                        <div className="p-4 border-t border-[#E7E4DD] space-y-3 bg-[#F8F7F4]/60 shrink-0">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    onClick={handleStartTour}
                                    className="w-full min-h-[44px] flex items-center gap-3 px-3.5 rounded-[12px] text-sm text-[#706E78] hover:text-[#1C1B22] hover:bg-white transition cursor-pointer"
                                >
                                    <HelpCircle strokeWidth={1.75} className="w-[19px] h-[19px] text-[#C59B45]" />
                                    <span>Hướng dẫn sử dụng</span>
                                </button>

                                {hasCreatedMap && (
                                    <button
                                        type="button"
                                        onClick={handleEditProfile}
                                        className="w-full min-h-[44px] flex items-center gap-3 px-3.5 rounded-[12px] text-sm text-[#706E78] hover:text-[#1C1B22] hover:bg-white transition cursor-pointer"
                                    >
                                        <Settings strokeWidth={1.75} className="w-[19px] h-[19px] text-[#706E78]" />
                                        <span>Cài đặt hồ sơ</span>
                                    </button>
                                )}
                            </div>

                            {/* Profile Card */}
                            {hasCreatedMap && (
                                <div className="flex items-center justify-between bg-white p-3 rounded-[12px] border border-[#E7E4DD] shadow-subtle">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-8 h-8 rounded-lg bg-[#F1EFFA] text-[#5146A5] font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#5146A5]/20">
                                            {data?.lp || '—'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-[#1C1B22] truncate">
                                                {profile.fullName || 'Người khám phá'}
                                            </p>
                                            <p className="text-[11px] text-[#706E78] truncate">
                                                {profile.dob || 'Chưa có ngày sinh'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleEditProfile}
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4] transition cursor-pointer shrink-0"
                                        aria-label="Sửa thông tin"
                                    >
                                        <Edit3 strokeWidth={1.5} className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}

export default SidebarNav;
