'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface CapabilityItem {
    number: string;
    title: string;
    description: string;
    details: string;
}

const CAPABILITIES: CapabilityItem[] = [
    {
        number: '01',
        title: 'Hiểu bản thân',
        description: 'Nhìn các chỉ số cốt lõi và những xu hướng nổi bật.',
        details: 'Phân tích hệ thống 4 chỉ số trụ cột (Đường Đời, Sứ Mệnh, Linh Hồn, Nhân Cách) giúp bạn nhận diện động lực nội tại, phản ứng vô thức và tiềm năng thiên bẩm.'
    },
    {
        number: '02',
        title: 'Định hướng',
        description: 'Khám phá các khía cạnh liên quan đến công việc và phát triển cá nhân.',
        details: 'Gợi mở môi trường làm việc phù hợp, cách tương tác với cộng sự và các phương pháp rèn luyện để chuyển hóa điểm mù thành thế mạnh vượt trội.'
    },
    {
        number: '03',
        title: 'Khám phá hành trình',
        description: 'Theo dõi các chu kỳ và giai đoạn quan trọng.',
        details: 'Xác định năm cá nhân hiện tại cùng 4 đỉnh cao cuộc đời để có sự chuẩn bị chủ động, điềm tĩnh trước những bước ngoặt và giai đoạn chuyển giao năng lượng.'
    }
];

export const Capabilities: React.FC = () => {
    return (
        <section id="capabilities" className="border-t border-[#E7E4DD] py-18 sm:py-24 md:py-28" aria-label="Khả năng của NUMERO">
            <Container size="default">
                {/* Section Header */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#5146A5] font-semibold block mb-3">
                        NUMERO GIÚP BẠN LÀM GÌ?
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1B22] tracking-tight leading-[1.15]">
                        Không chỉ xem con số. <br />
                        Hãy hiểu câu chuyện phía sau.
                    </h2>
                </div>

                {/* Editorial List — Wide 15% / 35% / 50% Grid */}
                <div className="divide-y divide-[#E7E4DD]">
                    {CAPABILITIES.map((item) => (
                        <div
                            key={item.number}
                            className="py-8 sm:py-12 group transition-colors duration-200 hover:bg-white/60 px-4 sm:px-6 rounded-2xl -mx-4 sm:-mx-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 lg:gap-12 items-start">
                                {/* Number Tag (approx 15% / 2 cols) */}
                                <div className="md:col-span-2">
                                    <span className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#5146A5]/80 group-hover:text-[#5146A5] transition-colors">
                                        {item.number}
                                    </span>
                                </div>

                                {/* Title & Core Summary (approx 35% / 4 cols) */}
                                <div className="md:col-span-4 space-y-2">
                                    <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-[26px] text-[#1C1B22] group-hover:text-[#5146A5] transition-colors flex items-center gap-2">
                                        <span>{item.title}</span>
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#5146A5]" />
                                    </h3>
                                    <p className="text-sm sm:text-base font-medium text-[#1C1B22]/80 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Deeper Editorial Context (approx 50% / 6 cols) */}
                                <div className="md:col-span-6">
                                    <p className="text-sm sm:text-base text-[#706E78] leading-relaxed font-normal">
                                        {item.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
