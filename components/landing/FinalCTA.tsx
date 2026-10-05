'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface FinalCTAProps {
    hasCreatedMap: boolean;
    onOpenOnboarding: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ hasCreatedMap, onOpenOnboarding }) => {
    return (
        <section className="pb-20 sm:pb-28 md:pb-32" aria-label="Kêu gọi hành động">
            <Container size="default">
                <div className="bg-white rounded-3xl border border-[#E7E4DD] p-8 sm:p-14 lg:p-20 text-center space-y-8 shadow-subtle relative overflow-hidden">
                    {/* Subtle Brand Accent Ring */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F1EFFA]/60 pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#F1EFFA]/60 pointer-events-none" />

                    <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#5146A5] font-semibold">
                            BẮT ĐẦU NGAY
                        </span>
                        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1C1B22] tracking-tight leading-tight">
                            Sẵn sàng khám phá bản đồ của bạn?
                        </h2>
                        <p className="text-base sm:text-lg text-[#706E78] leading-relaxed font-normal">
                            Chỉ mất một phút để nhập ngày sinh và nhận bản đồ phân tích Pythagoras toàn diện, tĩnh tại và chuẩn xác.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
                        {hasCreatedMap ? (
                            <Link href="/dashboard" className="w-full sm:w-auto">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full sm:w-auto px-9 py-3.5 text-base shadow-md"
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
                                className="w-full sm:w-auto px-9 py-3.5 text-base shadow-md"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                Tạo bản đồ của tôi
                            </Button>
                        )}
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#706E78] font-medium relative z-10">
                        <span>• Không cần đăng ký</span>
                        <span>• Tính toán chuẩn xác</span>
                        <span>• Bảo mật thông tin</span>
                    </div>
                </div>
            </Container>
        </section>
    );
};
