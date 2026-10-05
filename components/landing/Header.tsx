'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeaderProps {
    hasCreatedMap: boolean;
    onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasCreatedMap, onOpenOnboarding }) => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="border-b border-[#E7E4DD] bg-[#F8F7F4]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
            <Container as="div" className="h-18 sm:h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="group flex items-center gap-1.5 select-none">
                    <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#1C1B22] group-hover:text-[#5146A5] transition-colors">
                        NUMERO
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B45] inline-block mb-1" />
                </Link>

                {/* Navigation Links & Action */}
                <nav className="flex items-center gap-2 sm:gap-6" aria-label="Main Navigation">
                    <button
                        type="button"
                        onClick={() => scrollToSection('capabilities')}
                        className="text-xs sm:text-sm font-medium text-[#706E78] hover:text-[#1C1B22] px-2.5 py-1.5 rounded-[8px] transition cursor-pointer hidden md:inline-block"
                    >
                        Khả năng
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollToSection('how-it-works')}
                        className="text-xs sm:text-sm font-medium text-[#706E78] hover:text-[#1C1B22] px-2.5 py-1.5 rounded-[8px] transition cursor-pointer hidden sm:inline-block"
                    >
                        Cách hoạt động
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollToSection('philosophy')}
                        className="text-xs sm:text-sm font-medium text-[#706E78] hover:text-[#1C1B22] px-2.5 py-1.5 rounded-[8px] transition cursor-pointer hidden md:inline-block"
                    >
                        Thần số học là gì?
                    </button>

                    <div className="pl-1 sm:pl-2">
                        {hasCreatedMap ? (
                            <Link href="/dashboard">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="sm:h-10 sm:text-sm sm:px-4"
                                    rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                >
                                    Bản đồ của bạn
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={onOpenOnboarding}
                                className="sm:h-10 sm:text-sm sm:px-4"
                                rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                            >
                                Tạo bản đồ
                            </Button>
                        )}
                    </div>
                </nav>
            </Container>
        </header>
    );
};
