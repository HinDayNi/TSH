'use client';

import React, { ReactNode, forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'gold' | 'destructive' | 'terracotta';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    disabled,
    ...props
}, ref) => {
    // Base styles: rounded-xl, font 14-15px/500, transition 200ms cubic-bezier(0.16, 1, 0.3, 1)
    const baseStyles = "inline-flex items-center justify-center font-medium select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#5146A5]/40 shrink-0";

    const variantStyles = {
        primary: "bg-[#5146A5] hover:bg-[#443A8C] text-white border border-[#5146A5] shadow-subtle",
        secondary: "bg-white hover:bg-[#F8F7F4] text-[#1C1B22] border border-[#E7E4DD] hover:border-[#D3CEEE] shadow-subtle",
        ghost: "bg-transparent hover:bg-[#F1EFFA] text-[#706E78] hover:text-[#5146A5] border border-transparent",
        icon: "rounded-xl bg-white hover:bg-[#F8F7F4] text-[#706E78] hover:text-[#1C1B22] border border-[#E7E4DD] shadow-subtle",
        gold: "bg-[#C59B45] hover:bg-[#B28A3B] text-white border border-[#C59B45] shadow-subtle font-semibold",
        terracotta: "bg-[#5146A5] hover:bg-[#443A8C] text-white border border-[#5146A5] shadow-subtle",
        destructive: "bg-[#B45A58]/10 text-[#B45A58] hover:bg-[#B45A58]/20 border border-[#B45A58]/30 shadow-subtle"
    };

    // Standardized Scale: sm (38px), md (44px), lg (48px)
    const sizeStyles = {
        sm: variant === 'icon' ? "w-9 h-9 p-0 text-xs" : "h-[38px] text-xs px-3.5 gap-1.5",
        md: variant === 'icon' ? "w-11 h-11 p-0 text-sm" : "h-11 text-sm px-5 gap-2",
        lg: variant === 'icon' ? "w-12 h-12 p-0 text-base" : "h-12 text-[15px] px-6 gap-2.5"
    };

    return (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
            ) : leftIcon ? (
                <span className="shrink-0 flex items-center justify-center [&>svg]:w-[18px] [&>svg]:h-[18px]">{leftIcon}</span>
            ) : null}
            {children && <span>{children}</span>}
            {!isLoading && rightIcon && (
                <span className="shrink-0 flex items-center justify-center [&>svg]:w-[18px] [&>svg]:h-[18px]">{rightIcon}</span>
            )}
        </button>
    );
});
Button.displayName = 'Button';

export default Button;
