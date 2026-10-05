'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ZEN_SPRING, ZEN_EASING } from '@/lib/constants/motion';

export interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    width?: string;
    showCloseButton?: boolean;
}

export function Drawer({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    width = 'w-full sm:w-[400px] lg:w-[420px]',
    showCloseButton = true
}: DrawerProps) {
    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when drawer is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden no-print">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#1C1B22]/30 backdrop-blur-2xs transition-opacity"
                        aria-hidden="true"
                    />

                    {/* Right-side Drawer Panel */}
                    <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 pointer-events-none">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={ZEN_SPRING}
                            className={`pointer-events-auto ${width} bg-white h-full shadow-drawer border-l border-[#E7E4DD] flex flex-col`}
                            role="dialog"
                            aria-modal="true"
                        >
                            {/* Drawer Header */}
                            {(title || showCloseButton) && (
                                <div className="px-6 py-5 border-b border-[#E7E4DD] flex items-center justify-between shrink-0 bg-[#F8F7F4]/50">
                                    <div className="min-w-0 pr-4">
                                        {title && (
                                            <div className="font-serif font-bold text-lg text-[#1C1B22] truncate">
                                                {title}
                                            </div>
                                        )}
                                        {subtitle && (
                                            <div className="text-xs text-[#706E78] truncate mt-0.5">
                                                {subtitle}
                                            </div>
                                        )}
                                    </div>

                                    {showCloseButton && (
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#706E78] hover:text-[#1C1B22] hover:bg-[#EFECE6] transition cursor-pointer shrink-0"
                                            aria-label="Đóng bảng chi tiết"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Drawer Body (Scrollable) */}
                            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default Drawer;
