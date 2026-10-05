'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeroProps {
    hasCreatedMap: boolean;
    onOpenOnboarding: () => void;
}

export const Hero: React.FC<HeroProps> = ({ hasCreatedMap, onOpenOnboarding }) => {
    const scrollToHowItWorks = () => {
        const el = document.getElementById('how-it-works');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="pt-8 sm:pt-14 md:pt-20 pb-10 sm:pb-14 md:pb-18" aria-label="Giới thiệu NUMERO">
            <Container size="default" className="text-center">
                {/* Minimal Brand Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1EFFA] border border-[#5146A5]/15 text-xs font-semibold text-[#5146A5] mb-6 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B45]" />
                    <span>Trường phái số học Pythagoras chuẩn mực</span>
                </div>

                {/* Focal Point Editorial Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-serif font-bold text-[#1C1B22] tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
                    Khám phá bản đồ <br className="hidden sm:inline" />
                    của bạn.
                </h1>

                {/* Calm Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-[#706E78] leading-relaxed max-w-3xl mx-auto font-normal mb-8 sm:mb-10">
                    Một cách trực quan để hiểu các chỉ số cốt lõi, xu hướng tính cách và hành trình phát triển cá nhân theo quy luật tự nhiên.
                </p>

                {/* Primary Action System */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
                    {hasCreatedMap ? (
                        <Link href="/dashboard" className="w-full sm:w-auto">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full sm:w-auto px-8 py-3.5 text-base shadow-md"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                Xem bản đồ của bạn
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={onOpenOnboarding}
                            className="w-full sm:w-auto px-8 py-3.5 text-base shadow-md"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Tạo bản đồ của tôi
                        </Button>
                    )}

                    <button
                        type="button"
                        onClick={scrollToHowItWorks}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-[#706E78] hover:text-[#1C1B22] hover:bg-white/80 transition border border-transparent hover:border-[#E7E4DD] cursor-pointer"
                    >
                        <span>Xem cách hoạt động</span>
                        <ArrowDown className="w-3.5 h-3.5 text-[#5146A5]" />
                    </button>
                </div>
            </Container>
        </section>
    );
};
