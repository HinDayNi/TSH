'use client';

import React, { ReactNode } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: 'default' | 'subtle' | 'interactive' | 'highlighted';
    hoverLift?: boolean;
    className?: string;
}

export function Card({
    children,
    variant = 'default',
    hoverLift = false,
    className = '',
    ...props
}: CardProps) {
    const variantStyles = {
        default: "bg-white border border-[#E7E4DD] shadow-subtle",
        subtle: "bg-[#F8F7F4] border border-[#E7E4DD]",
        interactive: "bg-white border border-[#E7E4DD] shadow-subtle hover:border-[#D3CEEE] hover:shadow-card hover:-translate-y-0.5 cursor-pointer",
        highlighted: "bg-white border-2 border-[#C59B45] shadow-card"
    };

    const liftClass = hoverLift
        ? "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#D3CEEE] hover:shadow-card"
        : "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]";

    return (
        <div
            className={`rounded-2xl p-6 ${variantStyles[variant]} ${liftClass} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex items-center justify-between pb-4 border-b border-[#E7E4DD] ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardContent({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`pt-4 space-y-4 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({
    children,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`pt-4 mt-4 border-t border-[#E7E4DD] flex items-center justify-between ${className}`} {...props}>
            {children}
        </div>
    );
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;

