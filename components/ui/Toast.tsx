'use client';

import React, { useEffect } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
}

export function Toast({
    message,
    type = 'success',
    isOpen,
    onClose,
    duration = 3000
}: ToastProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const icons = {
        success: <Check className="w-4 h-4 text-[#547A67]" />,
        error: <AlertCircle className="w-4 h-4 text-[#B45A58]" />,
        info: <Info className="w-4 h-4 text-[#5146A5]" />
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-white border border-[#E7E4DD] rounded-xl shadow-card animate-fadeIn text-sm text-[#1C1B22]">
            {icons[type]}
            <span className="font-medium">{message}</span>
            <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#706E78] hover:text-[#1C1B22] rounded transition cursor-pointer ml-2"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

export default Toast;
