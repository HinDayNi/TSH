'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';

export const Philosophy: React.FC = () => {
    return (
        <section id="philosophy" className="border-t border-[#E7E4DD] py-18 sm:py-24 md:py-28" aria-label="Triết lý thần số học">
            <Container size="default">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
                    {/* Left Column: Eyebrow & Editorial Topic (4 cols) */}
                    <div className="md:col-span-4 space-y-3">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#5146A5] font-semibold block">
                            TRIẾT LÝ NỀN TẢNG
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1C1B22] tracking-tight leading-tight">
                            Thần số học Pythagoras là gì?
                        </h2>
                        <p className="text-xs font-mono text-[#706E78] pt-2">
                            Di sản toán học & triết học cổ đại Hy Lạp (TK VI TCN)
                        </p>
                    </div>

                    {/* Right Column: Narrative & Key Principle Statement (8 cols) */}
                    <div className="md:col-span-8 space-y-8">
                        <div className="space-y-4 text-base sm:text-lg text-[#706E78] leading-relaxed font-normal">
                            <p>
                                Được khởi xướng bởi nhà toán học và triết gia Hy Lạp Pythagoras từ thế kỷ thứ 6 trước Công nguyên, trường phái số học coi mỗi con số từ 1 đến 9 là một tần số rung động riêng biệt, phản ánh các quy luật tự nhiên và tâm thức con người.
                            </p>
                            <p>
                                Thay vì tiếp cận theo hướng bói toán tương lai hay định đoạt số mệnh tuyệt đối, NUMERO ứng dụng thần số học như một công cụ tự vấn (self-inquiry) và phân tích hành vi — giúp bạn quan sát rõ ràng hơn về động lực bên trong, năng khiếu tự nhiên và những bài học cần trau dồi.
                            </p>
                        </div>

                        {/* Featured Standout Statement */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E4DD] border-l-4 border-l-[#5146A5] shadow-subtle space-y-2">
                            <blockquote className="font-serif font-semibold text-lg sm:text-xl text-[#1C1B22] leading-snug">
                                “NUMERO không đưa ra câu trả lời thay bạn. Nó giúp bạn có thêm một góc nhìn để tự khám phá.”
                            </blockquote>
                            <span className="text-xs font-mono text-[#5146A5] font-medium block">
                                — Nguyên tắc nghiên cứu & thiết kế của NUMERO
                            </span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
