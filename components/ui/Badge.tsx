'use client';

import React, { ReactNode } from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'gold' | 'soft' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
    className?: string;
}

export function Badge({
    children,
    variant = 'default',
    className = '',
    ...props
}: BadgeProps) {
    const variants = {
        default: 'bg-[#F8F7F4] text-[#706E78] border-[#E7E4DD]',
        primary: 'bg-[#F1EFFA] text-[#5146A5] border-[#5146A5]/20 font-medium',
        gold: 'bg-[#EFE2C2]/50 text-[#C59B45] border-[#C59B45]/30 font-semibold',
        soft: 'bg-[#F1EFFA] text-[#706E78] border-[#E7E4DD]',
        secondary: 'bg-[#F1EFFA] text-[#706E78] border-[#E7E4DD]',
        success: 'bg-[#547A67]/10 text-[#547A67] border-[#547A67]/20 font-medium',
        warning: 'bg-[#C59B45]/10 text-[#C59B45] border-[#C59B45]/20 font-medium',
        error: 'bg-[#B45A58]/10 text-[#B45A58] border-[#B45A58]/20 font-medium',
        neutral: 'bg-[#F8F7F4] text-[#706E78] border-[#E7E4DD]'
    };

    return (
        <span
            className={`inline-flex items-center justify-center gap-1.5 h-7 px-3 text-xs font-medium rounded-full border ${variants[variant]} select-none shrink-0 ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;

