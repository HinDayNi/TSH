'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Lightbulb } from 'lucide-react';

export interface CoachmarkProps {
    /** Unique key for persistent dismissal (e.g. "numerology-map-hint") */
    persistKey: string;
    /** Title for the hint tooltip */
    title: string;
    /** Description text */
    description: string;
    /** Whether this coachmark has been seen (from context) */
    hasSeen: boolean;
    /** Callback to mark as seen */
    onDismiss: (key: string) => void;
    /** Position relative to indicator dot */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** Delay before showing in ms */
    showDelay?: number;
    /** Accent color variant */
    variant?: 'primary' | 'gold';
    /** Children element to wrap — the indicator appears relative to this */
    children?: React.ReactNode;
}

/**
 * Coachmark — A contextual hint component following Progressive Disclosure.
 * 
 * Renders a pulsing dot indicator that, on click, expands into a brief
 * tooltip explaining a specific feature or interaction.
 * 
 * Design system: Uses #5146A5 (primary) or #C59B45 (gold) accent,
 * Inter font, 16px radius, consistent with NUMERO tokens.
 */
export function Coachmark({
    persistKey,
    title,
    description,
    hasSeen,
    onDismiss,
    position = 'bottom',
    showDelay = 800,
    variant = 'primary',
    children
}: CoachmarkProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [tooltipCoords, setTooltipCoords] = useState<{ top: number; left: number } | null>(null);
    const [mounted, setMounted] = useState(false);
    const dotRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Show with delay after mount
    useEffect(() => {
        if (hasSeen) return;
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, showDelay);
        return () => clearTimeout(timer);
    }, [hasSeen, showDelay]);

    // Calculate tooltip position
    const updateTooltipPosition = useCallback(() => {
        if (!dotRef.current || !isExpanded) return;

        const dotRect = dotRef.current.getBoundingClientRect();
        const tooltipWidth = 300;
        const tooltipHeight = 140;
        const gap = 12;

        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = dotRect.top - tooltipHeight - gap;
                left = dotRect.left + dotRect.width / 2 - tooltipWidth / 2;
                break;
            case 'bottom':
                top = dotRect.bottom + gap;
                left = dotRect.left + dotRect.width / 2 - tooltipWidth / 2;
                break;
            case 'left':
                top = dotRect.top + dotRect.height / 2 - tooltipHeight / 2;
                left = dotRect.left - tooltipWidth - gap;
                break;
            case 'right':
                top = dotRect.top + dotRect.height / 2 - tooltipHeight / 2;
                left = dotRect.right + gap;
                break;
        }

        // Clamp to viewport
        left = Math.max(12, Math.min(left, window.innerWidth - tooltipWidth - 12));
        top = Math.max(12, Math.min(top, window.innerHeight - tooltipHeight - 12));

        setTooltipCoords({ top, left });
    }, [isExpanded, position]);

    useEffect(() => {
        updateTooltipPosition();
        window.addEventListener('resize', updateTooltipPosition);
        window.addEventListener('scroll', updateTooltipPosition, true);
        return () => {
            window.removeEventListener('resize', updateTooltipPosition);
            window.removeEventListener('scroll', updateTooltipPosition, true);
        };
    }, [updateTooltipPosition]);

    // Close on outside click
    useEffect(() => {
        if (!isExpanded) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (
                tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
                dotRef.current && !dotRef.current.contains(e.target as Node)
            ) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    // Close on Escape
    useEffect(() => {
        if (!isExpanded) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsExpanded(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isExpanded]);

    const handleDismiss = () => {
        setIsExpanded(false);
        setIsVisible(false);
        onDismiss(persistKey);
    };

    const handleDotClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    if (hasSeen || !isVisible) return <>{children}</>;

    const accentColor = variant === 'gold' ? '#C59B45' : '#5146A5';
    const accentBg = variant === 'gold' ? '#EFE2C2' : '#F1EFFA';

    return (
        <>
            {children}
            {/* Pulsing Dot Indicator */}
            <button
                ref={dotRef}
                type="button"
                onClick={handleDotClick}
                className="absolute z-10 cursor-pointer group"
                style={{
                    top: position === 'bottom' ? '-4px' : position === 'top' ? 'auto' : '50%',
                    bottom: position === 'top' ? '-4px' : undefined,
                    right: position === 'left' ? '-4px' : position === 'right' ? 'auto' : '-4px',
                    left: position === 'right' ? '-4px' : undefined,
                    transform: (position === 'left' || position === 'right') ? 'translateY(-50%)' : undefined,
                }}
                aria-label={`Mẹo: ${title}`}
                aria-expanded={isExpanded}
            >
                {/* Pulse ring */}
                <span
                    className="absolute inset-0 rounded-full animate-ping opacity-40"
                    style={{ backgroundColor: accentColor }}
                />
                {/* Static dot */}
                <span
                    className="relative block w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: accentColor }}
                />
            </button>

            {/* Expanded Tooltip (Portal) */}
            {mounted && isExpanded && tooltipCoords && createPortal(
                <div
                    ref={tooltipRef}
                    className="fixed pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-200"
                    style={{
                        zIndex: 900,
                        top: `${tooltipCoords.top}px`,
                        left: `${tooltipCoords.left}px`,
                        width: '300px',
                    }}
                >
                    <div
                        className="bg-white rounded-2xl border p-5 space-y-3 shadow-[0_8px_24px_rgba(28,27,34,0.12),0_2px_6px_rgba(28,27,34,0.04)]"
                        style={{ borderColor: '#E7E4DD' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: accentBg }}
                                >
                                    <Lightbulb className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                </div>
                                <span
                                    className="text-[11px] font-mono font-semibold uppercase tracking-widest"
                                    style={{ color: accentColor }}
                                >
                                    Mẹo
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleDismiss}
                                className="w-6 h-6 flex items-center justify-center rounded-md text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F8F7F4] transition cursor-pointer"
                                aria-label="Đã hiểu"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                            <h5 className="font-serif font-bold text-sm text-[#1C1B22] leading-snug">
                                {title}
                            </h5>
                            <p className="text-xs text-[#706E78] leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Dismiss Button */}
                        <button
                            type="button"
                            onClick={handleDismiss}
                            className="w-full h-8 rounded-[10px] text-xs font-medium transition cursor-pointer"
                            style={{
                                backgroundColor: accentBg,
                                color: accentColor,
                            }}
                        >
                            Đã hiểu
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

export default Coachmark;
