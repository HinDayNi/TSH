'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-[#E7E4DD] bg-white py-10" aria-label="Footer">
            <Container as="div" className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#706E78]">
                {/* Brand & Mission */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-sm text-[#1C1B22]">NUMERO</span>
                        <span className="w-1 h-1 rounded-full bg-[#C59B45]" />
                    </div>
                    <span className="hidden sm:inline text-[#E7E4DD]">|</span>
                    <span>Nền tảng thần số học Pythagoras chuẩn mực</span>
                </div>

                {/* Footer Links & Legal */}
                <div className="flex items-center gap-6">
                    <Link href="/terms" className="hover:text-[#1C1B22] transition underline-offset-4 hover:underline">
                        Điều khoản & Chính sách
                    </Link>
                    <span className="text-[#E7E4DD]">•</span>
                    <span>© {new Date().getFullYear()} NUMERO</span>
                </div>
            </Container>
        </footer>
    );
};
