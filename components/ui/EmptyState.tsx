'use client';

import React, { ReactNode } from 'react';
import Button from './Button';

export interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    className = ''
}: EmptyStateProps) {
    return (
        <div className={`p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#E7E4DD] space-y-4 max-w-lg mx-auto shadow-subtle ${className}`}>
            {icon && (
                <div className="w-16 h-16 rounded-2xl bg-[#F1EFFA] text-[#5146A5] flex items-center justify-center mx-auto border border-[#5146A5]/20">
                    {icon}
                </div>
            )}
            <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-xl text-[#1C1B22]">
                    {title}
                </h3>
                <p className="text-sm text-[#706E78] leading-relaxed max-w-sm mx-auto">
                    {description}
                </p>
            </div>
            {actionLabel && onAction && (
                <div className="pt-2">
                    <Button variant="primary" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default EmptyState;
