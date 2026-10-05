'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'circular' | 'rectangular' | 'card';
    width?: string | number;
    height?: string | number;
    className?: string;
}

export function Skeleton({
    variant = 'rectangular',
    width,
    height,
    className = '',
    style,
    ...props
}: SkeletonProps) {
    const variantStyles = {
        text: 'h-4 w-full rounded-md',
        circular: 'rounded-full shrink-0',
        rectangular: 'rounded-xl w-full',
        card: 'rounded-2xl w-full h-40 border border-[#E7E5E4]'
    };

    const computedStyle: React.CSSProperties = {
        ...style,
        width: width !== undefined ? width : undefined,
        height: height !== undefined ? height : undefined
    };

    return (
        <div
            className={`skeleton-warm bg-[#FAF9F6] ${variantStyles[variant]} ${className}`}
            style={computedStyle}
            aria-hidden="true"
            {...props}
        />
    );
}

export function CardSkeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`p-6 rounded-2xl bg-white border border-[#E7E5E4] space-y-4 ${className}`}>
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="space-y-1.5 flex-1">
                    <Skeleton variant="text" width="40%" height={16} />
                    <Skeleton variant="text" width="60%" height={12} />
                </div>
            </div>
            <div className="space-y-2 pt-2">
                <Skeleton variant="text" width="100%" height={12} />
                <Skeleton variant="text" width="90%" height={12} />
                <Skeleton variant="text" width="75%" height={12} />
            </div>
        </div>
    );
}

export default Skeleton;
