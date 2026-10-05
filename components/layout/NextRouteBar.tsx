'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { getNextRoute, getPrevRoute, getRouteMetadata } from '@/lib/constants/navigation';

export function NextRouteBar() {
    const pathname = usePathname();
    const nextRoute = getNextRoute(pathname);
    const prevRoute = getPrevRoute(pathname);

    if (!nextRoute && !prevRoute) return null;

    return (
        <nav aria-label="Điều hướng trang" className="mt-8 sm:mt-10 pt-6 border-t border-[#E7E4DD] no-print">
            <div className="flex items-center justify-between gap-4">
                {/* Previous Route */}
                {prevRoute ? (
                    <Link
                        href={prevRoute.path}
                        className="group inline-flex items-center gap-2.5 text-sm text-[#706E78] hover:text-[#5146A5] transition select-none"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#706E78] group-hover:text-[#5146A5] group-hover:-translate-x-0.5 transition-all shrink-0" />
                        <div>
                            <span className="text-[11px] text-[#96939C] block font-medium">Trang trước</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#1C1B22] group-hover:text-[#5146A5] transition-colors">
                                {prevRoute.title}
                            </span>
                        </div>
                    </Link>
                ) : (
                    <div />
                )}

                {/* Next Route */}
                {nextRoute && (
                    <Link
                        href={nextRoute.path}
                        className="group inline-flex items-center gap-2.5 text-sm text-[#706E78] hover:text-[#5146A5] transition select-none text-right ml-auto"
                    >
                        <div>
                            <span className="text-[11px] text-[#96939C] block font-medium">Bước tiếp theo</span>
                            <span className="text-xs sm:text-sm font-semibold text-[#1C1B22] group-hover:text-[#5146A5] transition-colors">
                                {nextRoute.title}
                            </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#5146A5] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NextRouteBar;
