'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

export interface GuideStep {
    targetSelector: string;
    mobileTargetSelector?: string;
    title: string;
    description: string;
    actionLabel?: string;
    preferredPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface SpotlightGuideProps {
    guideId: string;
    steps: GuideStep[];
    isActive: boolean;
    onComplete: () => void;
    onDismiss: () => void;
    accentColor?: 'primary' | 'gold';
}

export function SpotlightGuide({
    guideId,
    steps,
    isActive,
    onComplete,
    onDismiss,
    accentColor = 'primary'
}: SpotlightGuideProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [targetRect, setTargetRect] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
    } | null>(null);
    const [cardCoords, setCardCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // 1. Mount check for React Portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // 2. Store active element to restore focus when closed
    useEffect(() => {
        if (isActive) {
            previousActiveElement.current = document.activeElement as HTMLElement;
            setCurrentStepIndex(0);
            setIsReady(false);
        } else if (previousActiveElement.current) {
            previousActiveElement.current.focus?.();
            previousActiveElement.current = null;
            setIsReady(false);
        }
    }, [isActive]);

    // 3. Body scroll lock when tour is active
    useEffect(() => {
        if (!isActive) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isActive]);

    // 4. Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 5. Compute bounding rect and card coordinates cleanly
    const recalculateCoords = useCallback(() => {
        if (!isActive || !steps[currentStepIndex]) return;

        const step = steps[currentStepIndex];
        const selector = (isMobile && step.mobileTargetSelector)
            ? step.mobileTargetSelector
            : step.targetSelector;

        const element = document.querySelector(selector);

        if (!element) {
            setTargetRect(null);
            return;
        }

        // Check if element is in viewport; if not, scroll instantly so measurement is exact
        const initialRect = element.getBoundingClientRect();
        const isInViewport = (
            initialRect.top >= 40 &&
            initialRect.left >= 0 &&
            initialRect.bottom <= (window.innerHeight - 40) &&
            initialRect.right <= window.innerWidth
        );

        if (!isInViewport) {
            element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
        }

        const freshRect = element.getBoundingClientRect();
        setTargetRect({
            top: freshRect.top,
            left: freshRect.left,
            width: freshRect.width,
            height: freshRect.height
        });

        if (isMobile) {
            setIsReady(true);
            return;
        }

        const cardWidth = 360;
        const cardHeight = 220;
        const gap = 16;
        const pref = step.preferredPosition || 'bottom';

        let top = 0;
        let left = 0;

        const spaceTop = freshRect.top;
        const spaceBottom = window.innerHeight - freshRect.bottom;
        const spaceLeft = freshRect.left;
        const spaceRight = window.innerWidth - freshRect.right;

        let effectivePosition = pref;

        // Auto-flip if not enough space
        if (pref === 'bottom' && spaceBottom < cardHeight + gap && spaceTop > cardHeight + gap) {
            effectivePosition = 'top';
        } else if (pref === 'top' && spaceTop < cardHeight + gap && spaceBottom > cardHeight + gap) {
            effectivePosition = 'bottom';
        } else if (pref === 'right' && spaceRight < cardWidth + gap && spaceLeft > cardWidth + gap) {
            effectivePosition = 'left';
        } else if (pref === 'left' && spaceLeft < cardWidth + gap && spaceRight > cardWidth + gap) {
            effectivePosition = 'right';
        }

        switch (effectivePosition) {
            case 'bottom':
                top = freshRect.bottom + gap;
                left = freshRect.left + (freshRect.width / 2) - (cardWidth / 2);
                break;
            case 'top':
                top = freshRect.top - cardHeight - gap;
                left = freshRect.left + (freshRect.width / 2) - (cardWidth / 2);
                break;
            case 'left':
                top = freshRect.top + (freshRect.height / 2) - (cardHeight / 2);
                left = freshRect.left - cardWidth - gap;
                break;
            case 'right':
                top = freshRect.top + (freshRect.height / 2) - (cardHeight / 2);
                left = freshRect.right + gap;
                break;
        }

        // Viewport boundaries clamping
        left = Math.max(16, Math.min(left, window.innerWidth - cardWidth - 16));
        top = Math.max(16, Math.min(top, window.innerHeight - cardHeight - 16));

        setCardCoords({ top, left });
        setIsReady(true);
    }, [isActive, steps, currentStepIndex, isMobile]);

    // Step change effect: trigger clean measurement
    useEffect(() => {
        if (!isActive) return;

        // Try immediately
        recalculateCoords();

        // Retry in next tick in case DOM was rendering
        const timer1 = setTimeout(recalculateCoords, 40);
        const timer2 = setTimeout(recalculateCoords, 100);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [isActive, currentStepIndex, recalculateCoords]);

    // Passive resize handler with debounce
    useEffect(() => {
        if (!isActive) return;

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(recalculateCoords, 100);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [isActive, recalculateCoords]);

    // 6. Keyboard accessibility: Escape to dismiss, Arrow keys to navigate
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onDismiss();
            } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
                if (currentStepIndex < steps.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                } else {
                    onComplete();
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentStepIndex > 0) {
                    setCurrentStepIndex(prev => prev - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, currentStepIndex, steps.length, onDismiss, onComplete]);

    if (!mounted || !isActive || steps.length === 0) return null;

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const pad = 8;
    const spotX = targetRect ? Math.max(0, targetRect.left - pad) : 0;
    const spotY = targetRect ? Math.max(0, targetRect.top - pad) : 0;
    const spotW = targetRect ? targetRect.width + pad * 2 : 0;
    const spotH = targetRect ? targetRect.height + pad * 2 : 0;

    const actionText = currentStep.actionLabel || (isLastStep ? 'Hoàn tất' : 'Tiếp theo');

    const glowColor = accentColor === 'gold' ? 'rgba(197, 155, 69, 0.4)' : 'rgba(79, 70, 229, 0.4)';
    const borderColor = accentColor === 'gold' ? '#D4A72C' : '#4F46E5';

    return createPortal(
        <div
            className={`fixed inset-0 select-none pointer-events-auto transition-opacity duration-200 ${isReady ? 'opacity-100' : 'opacity-0'
                }`}
            style={{ zIndex: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Hướng dẫn: ${currentStep.title}`}
        >
            {/* BACKDROP CAPTURE TO PREVENT ACCIDENTAL BACKGROUND CLICKS */}
            <div
                className="fixed inset-0 bg-transparent"
                style={{ zIndex: 1000 }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            />

            {/* GPU ACCELERATED HARDWARE SPOTLIGHT OVERLAY — Zero SVG mask overhead, 60-120fps */}
            {targetRect && (
                <div
                    className="fixed pointer-events-none rounded-2xl"
                    style={{
                        zIndex: 1001,
                        top: `${spotY}px`,
                        left: `${spotX}px`,
                        width: `${spotW}px`,
                        height: `${spotH}px`,
                        boxShadow: `0 0 0 9999px rgba(15, 14, 23, 0.65), 0 0 24px ${glowColor}, inset 0 0 12px ${glowColor}`,
                        border: `2px solid ${borderColor}`,
                        transition: 'top 0.22s cubic-bezier(0.16, 1, 0.3, 1), left 0.22s cubic-bezier(0.16, 1, 0.3, 1), width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                        willChange: 'top, left, width, height'
                    }}
                />
            )}

            {/* DESKTOP TOOLTIP CARD — Layer 1100 */}
            {!isMobile && (
                <div
                    ref={cardRef}
                    className="fixed w-[360px] bg-white rounded-2xl border border-[#E7E5E4] shadow-2xl p-6"
                    style={{
                        zIndex: 1100,
                        top: `${cardCoords.top}px`,
                        left: `${cardCoords.left}px`,
                        transition: 'top 0.22s cubic-bezier(0.16, 1, 0.3, 1), left 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                        willChange: 'top, left'
                    }}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E7E5E4]">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F5F3FF] text-[#4F46E5] text-xs font-bold font-mono">
                                {currentStepIndex + 1}/{steps.length}
                            </span>
                            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#68687A]">
                                Hướng Dẫn
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="p-1.5 -mr-1.5 -mt-1 rounded-lg text-[#68687A] hover:text-[#17172B] hover:bg-[#FAF9F6] transition cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                            aria-label="Đóng hướng dẫn"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="py-4 space-y-2">
                        <h3 className="font-serif font-bold text-lg text-[#17172B] leading-tight">
                            {currentStep.title}
                        </h3>
                        <p className="text-xs text-[#68687A] leading-relaxed">
                            {currentStep.description}
                        </p>
                    </div>

                    {/* Step Indicators & Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#E7E5E4]">
                        <div className="flex items-center gap-1.5">
                            {steps.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStepIndex
                                            ? 'w-6 bg-[#4F46E5]'
                                            : idx < currentStepIndex
                                                ? 'w-1.5 bg-[#D4A72C]'
                                                : 'w-1.5 bg-[#E7E5E4]'
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {!isFirstStep && (
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="h-10 px-3 rounded-xl text-xs font-semibold text-[#68687A] hover:text-[#17172B] hover:bg-[#FAF9F6] transition cursor-pointer flex items-center gap-1.5 border border-[#E7E5E4]"
                                    aria-label="Quay lại bước trước"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                    <span>Lại</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleNext}
                                className="h-10 px-4 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                            >
                                <span>{actionText}</span>
                                {isLastStep ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MOBILE BOTTOM SHEET — Layer 1100 */}
            {isMobile && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl border-t border-[#E7E5E4] shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
                    style={{ zIndex: 1100 }}
                >
                    {/* Top Sheet Drag Notch */}
                    <div className="w-12 h-1.5 bg-[#E7E5E4] rounded-full mx-auto -mt-2 mb-2" />

                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F5F3FF] text-[#4F46E5] text-xs font-bold font-mono">
                                {currentStepIndex + 1}/{steps.length}
                            </span>
                            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#68687A]">
                                Hướng Dẫn
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="p-2 rounded-lg text-[#68687A] hover:text-[#17172B] hover:bg-[#FAF9F6] transition min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Đóng hướng dẫn"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 py-1">
                        <h3 className="font-serif font-bold text-lg text-[#17172B] leading-tight">
                            {currentStep.title}
                        </h3>
                        <p className="text-sm text-[#68687A] leading-relaxed">
                            {currentStep.description}
                        </p>
                    </div>

                    {/* Step Progress Indicators */}
                    <div className="flex items-center justify-center gap-1.5 py-1">
                        {steps.map((_, idx) => (
                            <span
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStepIndex
                                        ? 'w-8 bg-[#4F46E5]'
                                        : idx < currentStepIndex
                                            ? 'w-2 bg-[#D4A72C]'
                                            : 'w-2 bg-[#E7E5E4]'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Mobile Touch Action Buttons (>= 44px) */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        {!isFirstStep ? (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="min-h-[44px] px-4 rounded-xl text-sm font-semibold text-[#17172B] bg-[#FAF9F6] border border-[#E7E5E4] flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Quay lại</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="min-h-[44px] px-4 rounded-xl text-sm font-semibold text-[#68687A] bg-[#FAF9F6] border border-[#E7E5E4] flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Bỏ qua</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleNext}
                            className="min-h-[44px] px-4 rounded-xl text-sm font-semibold text-white bg-[#4F46E5] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                            <span>{actionText}</span>
                            {isLastStep ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}
