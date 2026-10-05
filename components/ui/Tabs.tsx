'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ZEN_SPRING } from '@/lib/constants/motion';

export interface TabItem {
    id: string;
    label: string;
    icon?: ReactNode;
    badge?: string | number;
}

export function Tabs({
    items,
    activeId,
    onChange,
    layoutId = 'sliding-pill-indicator',
    className = ''
}: {
    items: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    layoutId?: string;
    className?: string;
}) {
    return (
        <div className={`relative flex items-center gap-1.5 p-1 bg-[#F8F7F4] border border-[#E7E4DD] rounded-xl overflow-x-auto ${className}`}>
            {items.map((tab) => {
                const isActive = tab.id === activeId;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={`relative z-10 inline-flex items-center gap-2 h-9 px-3.5 rounded-[10px] text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer select-none ${
                            isActive
                                ? 'text-[#5146A5] font-semibold'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={layoutId}
                                className="absolute inset-0 bg-white rounded-[10px] border border-[#E7E4DD] shadow-subtle -z-10"
                                transition={ZEN_SPRING}
                            />
                        )}
                        {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                        <span>{tab.label}</span>
                        {tab.badge !== undefined && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${
                                isActive ? 'bg-[#F1EFFA] text-[#5146A5] font-semibold' : 'bg-[#E7E4DD] text-[#706E78]'
                            }`}>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default Tabs;
