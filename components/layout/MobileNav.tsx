'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, User, Menu } from 'lucide-react';
import { useProfile } from '@/lib/context/ProfileContext';
import { useSidebar } from '@/lib/context/SidebarContext';

export function MobileNav() {
    const pathname = usePathname();
    const { hasCreatedMap } = useProfile();
    const { openMobile } = useSidebar();

    return (
        <nav
            className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-[#E7E4DD] z-40 px-2 py-1.5 flex items-center justify-around no-print"
            aria-label="Mobile Bottom Navigation"
        >
            <Link
                href="/"
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
                    pathname === '/' ? 'text-[#5146A5] font-bold' : 'text-[#706E78]'
                }`}
            >
                <Compass strokeWidth={pathname === '/' ? 2 : 1.5} className="w-4 h-4" />
                <span>Khám phá</span>
            </Link>

            {hasCreatedMap && (
                <>
                    <Link
                        href="/dashboard"
                        className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
                            pathname === '/dashboard' ? 'text-[#5146A5] font-bold' : 'text-[#706E78]'
                        }`}
                    >
                        <Map strokeWidth={pathname === '/dashboard' ? 2 : 1.5} className="w-4 h-4" />
                        <span>Bản đồ</span>
                    </Link>

                    <Link
                        href="/identity"
                        className={`flex flex-col items-center justify-center min-h-[44px] py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
                            pathname === '/identity' ? 'text-[#5146A5] font-bold' : 'text-[#706E78]'
                        }`}
                    >
                        <User strokeWidth={pathname === '/identity' ? 2 : 1.5} className="w-4 h-4" />
                        <span>Bản thân</span>
                    </Link>
                </>
            )}

            {/* All Routes Menu Toggle -> Opens Mobile Drawer */}
            <button
                type="button"
                onClick={openMobile}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 px-3 rounded-lg text-[10px] font-medium text-[#706E78] hover:text-[#5146A5] transition-colors cursor-pointer"
                aria-label="Mở danh mục menu"
            >
                <Menu strokeWidth={1.5} className="w-4 h-4" />
                <span>Danh mục</span>
            </button>
        </nav>
    );
}

export default MobileNav;
