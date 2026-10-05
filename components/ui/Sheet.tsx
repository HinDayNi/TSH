'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ZEN_SPRING } from '@/lib/constants/motion';

export interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    maxHeight?: string;
}

export function Sheet({
    isOpen,
    onClose,
    title,
    children,
    maxHeight = 'max-h-[85vh]'
}: SheetProps) {
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
                <div className="fixed inset-0 z-50 overflow-hidden md:hidden no-print">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#1C1B22]/40 backdrop-blur-2xs"
                        aria-hidden="true"
                    />

                    {/* Bottom Sheet Container */}
                    <div className="fixed inset-x-0 bottom-0 flex flex-col justify-end pointer-events-none">
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={ZEN_SPRING}
                            className={`pointer-events-auto w-full bg-white rounded-t-3xl border-t border-[#E7E4DD] shadow-2xl flex flex-col ${maxHeight}`}
                            role="dialog"
                            aria-modal="true"
                        >
                            {/* Drag Indicator Bar */}
                            <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab">
                                <div className="w-10 h-1 rounded-full bg-[#E7E4DD]" />
                            </div>

                            {/* Sheet Header */}
                            <div className="px-6 py-3 border-b border-[#E7E4DD] flex items-center justify-between shrink-0">
                                <div className="font-serif font-bold text-base text-[#1C1B22] truncate">
                                    {title}
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#706E78] hover:bg-[#F8F7F4] transition cursor-pointer"
                                    aria-label="Đóng"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Sheet Body (Scrollable) */}
                            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default Sheet;
