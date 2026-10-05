'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';

interface Step {
    step: string;
    title: string;
    description: string;
}

const STEPS: Step[] = [
    {
        step: '01',
        title: 'Nhập thông tin',
        description: 'Điền ngày sinh và họ tên để xác lập dữ liệu năng lượng cá nhân theo hệ thống chuẩn.'
    },
    {
        step: '02',
        title: 'Tạo bản đồ',
        description: 'Hệ thống tính toán tức thì toàn bộ chỉ số theo chuẩn trường phái Pythagoras cổ điển.'
    },
    {
        step: '03',
        title: 'Khám phá',
        description: 'Đọc phân tích chuyên sâu, thấu hiểu xu hướng và định hướng phát triển bản thân.'
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="border-t border-[#E7E4DD] py-18 sm:py-24 md:py-28" aria-label="Cách NUMERO hoạt động">
            <Container size="default">
                {/* Section Header */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#5146A5] font-semibold block mb-3">
                        QUY TRÌNH TINH GỌN
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1B22] tracking-tight leading-[1.15]">
                        Ba bước để bắt đầu
                    </h2>
                    <p className="text-base sm:text-lg text-[#706E78] mt-3 font-normal max-w-2xl">
                        Không cần tạo tài khoản phức tạp. Bạn nhận ngay bản đồ phân tích hoàn chỉnh trong vài giây.
                    </p>
                </div>

                {/* Desktop: Full-width Horizontal Timeline / Mobile: Vertical Timeline */}
                <div className="relative">
                    {/* Desktop Connecting Line across 3 steps */}
                    <div className="hidden md:block absolute top-7 left-10 right-10 h-[1px] bg-[#E7E4DD] -z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                        {STEPS.map((step, idx) => (
                            <div
                                key={step.step}
                                className="relative group bg-white/60 md:bg-white/40 hover:bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E4DD] transition-all duration-200 shadow-subtle hover:shadow-card hover:-translate-y-0.5"
                            >
                                {/* Mobile Connector Line */}
                                {idx < STEPS.length - 1 && (
                                    <div className="md:hidden absolute left-10 top-20 bottom-0 w-[1px] bg-[#E7E4DD] -z-0" />
                                )}

                                {/* Step Indicator */}
                                <div className="flex items-center justify-between md:flex-col md:items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#E7E4DD] group-hover:border-[#5146A5] text-[#5146A5] font-serif font-bold text-xl flex items-center justify-center shadow-xs transition-colors z-10">
                                        {step.step}
                                    </div>
                                    <span className="text-xs font-mono uppercase tracking-wider text-[#706E78] font-semibold md:mt-4">
                                        BƯỚC {step.step}
                                    </span>
                                </div>

                                {/* Step Content */}
                                <div className="space-y-2">
                                    <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-2xl text-[#1C1B22] group-hover:text-[#5146A5] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#706E78] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
