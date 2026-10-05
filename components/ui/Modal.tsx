'use client';

import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ZEN_SPRING, backdropVariants, modalVariants } from '@/lib/constants/motion';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: ReactNode;
    description?: string;
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    maxWidth = 'md'
}: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const maxWStyles = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-xl',
        xl: 'max-w-2xl'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop with Fade */}
                    <motion.div
                        variants={backdropVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={onClose}
                        className="fixed inset-0 bg-[#1C1B22]/35 backdrop-blur-xs"
                    />

                    {/* Modal Window with Zen Spring & Scale */}
                    <motion.div
                        variants={modalVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className={`relative z-10 w-full ${maxWStyles[maxWidth]} bg-white rounded-2xl border border-[#E7E4DD] shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col`}
                    >
                        {(title || description) && (
                            <div className="flex items-start justify-between px-6 py-4 border-b border-[#E7E4DD] bg-[#F8F7F4]">
                                <div className="space-y-0.5">
                                    {title && (
                                        <h3 className="font-serif text-lg font-bold text-[#1C1B22]">
                                            {title}
                                        </h3>
                                    )}
                                    {description && (
                                        <p className="text-xs text-[#706E78]">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-1 text-[#706E78] hover:text-[#1C1B22] hover:bg-[#F1EFFA] rounded-lg transition-colors cursor-pointer ml-4"
                                    aria-label="Đóng hộp thoại"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                        <div className="p-6 overflow-y-auto flex-1">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
