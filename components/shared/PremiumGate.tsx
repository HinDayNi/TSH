'use client';

import { LockKeyhole } from 'lucide-react';
import { VipCtaButton } from '@/components/features/report/ReportActions';

export function PremiumGate({ title, description, children }: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[#E7E4DD] bg-white">
            <div className="pointer-events-none select-none blur-[4px] opacity-55 p-5">
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-white/55 p-5 text-center backdrop-blur-[2px]">
                <div className="max-w-sm">
                    <LockKeyhole className="mx-auto mb-2 h-5 w-5 text-[#5146A5]" />
                    <h3 className="font-serif text-lg font-bold text-[#1C1B22]">{title}</h3>
                    <p className="mt-1 mb-3 text-xs leading-relaxed text-[#706E78]">{description}</p>
                    <VipCtaButton />
                </div>
            </div>
        </div>
    );
}