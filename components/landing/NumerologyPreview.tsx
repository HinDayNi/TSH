'use client';

import React, { useState } from 'react';
import { Compass, Sparkles, Heart, User, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface PreviewNode {
    id: string;
    number: number;
    title: string;
    subtitle: string;
    description: string;
    trait: string;
    icon: React.ReactNode;
    color: string;
    isPrimary?: boolean;
}

const PREVIEW_NODES: PreviewNode[] = [
    {
        id: 'lifepath',
        number: 7,
        title: 'Đường Đời',
        subtitle: 'Chỉ số chủ đạo',
        description: 'Đại diện cho bài học lớn nhất, năng lực trực giác sắc bén và xu hướng tìm kiếm tri thức chân lý.',
        trait: 'Trực giác • Tri thức • Chiêm nghiệm',
        icon: <Compass className="w-4 h-4" />,
        color: '#5146A5',
        isPrimary: true
    },
    {
        id: 'destiny',
        number: 3,
        title: 'Sứ Mệnh',
        subtitle: 'Mục đích hành động',
        description: 'Khả năng biểu đạt, truyền cảm hứng và tinh thần sáng tạo lạc quan trong mọi môi trường.',
        trait: 'Sáng tạo • Biểu đạt • Lan tỏa',
        icon: <Sparkles className="w-4 h-4 text-[#C59B45]" />,
        color: '#1C1B22'
    },
    {
        id: 'soul',
        number: 9,
        title: 'Linh Hồn',
        subtitle: 'Khao khát nội tâm',
        description: 'Tâm nguyện cống hiến vì cộng đồng, lòng nhân ái và sự hoàn thiện về mặt tâm thức.',
        trait: 'Nhân ái • Lý tưởng • Bao dung',
        icon: <Heart className="w-4 h-4 text-[#5146A5]" />,
        color: '#1C1B22'
    },
    {
        id: 'personality',
        number: 1,
        title: 'Nhân Cách',
        subtitle: 'Ấn tượng bên ngoài',
        description: 'Phong thái độc lập, bản lĩnh tiên phong và năng lượng quyết đoán trong mắt người khác.',
        trait: 'Độc lập • Tiên phong • Tự chủ',
        icon: <User className="w-4 h-4 text-[#706E78]" />,
        color: '#1C1B22'
    }
];

export const NumerologyPreview: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<PreviewNode>(PREVIEW_NODES[0]);

    return (
        <section className="pb-16 sm:pb-20 md:pb-24" aria-label="Bản đồ mẫu sản phẩm">
            <Container size="default">
                {/* Realistic Product Preview Stage */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E4DD] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                {/* Product Frame Header */}
                <div className="border-b border-[#E7E4DD] px-5 sm:px-8 py-3.5 sm:py-4 bg-[#F8F7F4]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#5146A5]" />
                        <span className="font-mono uppercase font-semibold text-[#1C1B22] tracking-wider text-[11px] sm:text-xs">
                            NUMERO MAP PREVIEW • PYTHAGORAS SYSTEM
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[#706E78] text-[11px] sm:text-xs font-medium">
                        <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5146A5]" />
                            Bản đồ chuẩn hóa
                        </span>
                        <span className="hidden sm:inline text-[#E7E4DD]">|</span>
                        <span className="hidden sm:inline">Chỉ số cốt lõi mẫu</span>
                    </div>
                </div>

                {/* Main Product Layout: Map Visual & Live Insight Panel */}
                <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left/Top: Interactive Pythagorean Radial Node Hub (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col items-center justify-center">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-full border border-[#E7E4DD] bg-[#F8F7F4]/40 p-4 sm:p-6 flex items-center justify-center select-none">
                            {/* Structured Concentric Reference Rings */}
                            <div className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-[#E7E4DD]" />
                            <div className="absolute inset-14 sm:inset-18 rounded-full border border-[#F1EFFA]" />

                            {/* Node 1: Life Path (TOP - Primary Focal Point) */}
                            <button
                                type="button"
                                onClick={() => setSelectedNode(PREVIEW_NODES[0])}
                                onMouseEnter={() => setSelectedNode(PREVIEW_NODES[0])}
                                className={`absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 group outline-none ${
                                    selectedNode.id === 'lifepath' ? 'scale-105' : 'opacity-90 hover:opacity-100'
                                }`}
                                aria-label="Chỉ số Đường Đời 7"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-serif font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md transition-all ${
                                    selectedNode.id === 'lifepath'
                                        ? 'bg-[#5146A5] text-white ring-4 ring-[#5146A5]/20 border border-white'
                                        : 'bg-[#5146A5] text-white'
                                }`}>
                                    7
                                </div>
                                <span className="text-[11px] sm:text-xs font-semibold text-[#1C1B22] mt-1.5 px-2 py-0.5 rounded-full bg-white border border-[#E7E4DD] shadow-xs">
                                    Đường Đời
                                </span>
                            </button>

                            {/* Node 2: Destiny / Sứ Mệnh (RIGHT) */}
                            <button
                                type="button"
                                onClick={() => setSelectedNode(PREVIEW_NODES[1])}
                                onMouseEnter={() => setSelectedNode(PREVIEW_NODES[1])}
                                className={`absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 group outline-none ${
                                    selectedNode.id === 'destiny' ? 'scale-105' : 'opacity-85 hover:opacity-100'
                                }`}
                                aria-label="Chỉ số Sứ Mệnh 3"
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-serif font-bold text-lg sm:text-xl flex items-center justify-center transition-all shadow-subtle ${
                                    selectedNode.id === 'destiny'
                                        ? 'bg-white border-2 border-[#5146A5] text-[#5146A5] ring-3 ring-[#5146A5]/15'
                                        : 'bg-white border border-[#E7E4DD] text-[#1C1B22]'
                                }`}>
                                    3
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-[#706E78] mt-1 px-1.5 py-0.5 rounded bg-white/90">
                                    Sứ Mệnh
                                </span>
                            </button>

                            {/* Node 3: Soul Urge / Linh Hồn (BOTTOM) */}
                            <button
                                type="button"
                                onClick={() => setSelectedNode(PREVIEW_NODES[2])}
                                onMouseEnter={() => setSelectedNode(PREVIEW_NODES[2])}
                                className={`absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 group outline-none ${
                                    selectedNode.id === 'soul' ? 'scale-105' : 'opacity-85 hover:opacity-100'
                                }`}
                                aria-label="Chỉ số Linh Hồn 9"
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-serif font-bold text-lg sm:text-xl flex items-center justify-center transition-all shadow-subtle ${
                                    selectedNode.id === 'soul'
                                        ? 'bg-white border-2 border-[#5146A5] text-[#5146A5] ring-3 ring-[#5146A5]/15'
                                        : 'bg-white border border-[#E7E4DD] text-[#1C1B22]'
                                }`}>
                                    9
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-[#706E78] mt-1 px-1.5 py-0.5 rounded bg-white/90">
                                    Linh Hồn
                                </span>
                            </button>

                            {/* Node 4: Personality / Nhân Cách (LEFT) */}
                            <button
                                type="button"
                                onClick={() => setSelectedNode(PREVIEW_NODES[3])}
                                onMouseEnter={() => setSelectedNode(PREVIEW_NODES[3])}
                                className={`absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 group outline-none ${
                                    selectedNode.id === 'personality' ? 'scale-105' : 'opacity-85 hover:opacity-100'
                                }`}
                                aria-label="Chỉ số Nhân Cách 1"
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-serif font-bold text-lg sm:text-xl flex items-center justify-center transition-all shadow-subtle ${
                                    selectedNode.id === 'personality'
                                        ? 'bg-white border-2 border-[#5146A5] text-[#5146A5] ring-3 ring-[#5146A5]/15'
                                        : 'bg-white border border-[#E7E4DD] text-[#1C1B22]'
                                }`}>
                                    1
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-[#706E78] mt-1 px-1.5 py-0.5 rounded bg-white/90">
                                    Nhân Cách
                                </span>
                            </button>

                            {/* Central Sacred Brand Nexus */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-[#5146A5]/20 flex flex-col items-center justify-center shadow-subtle z-10">
                                <span className="font-serif font-bold text-xs sm:text-sm tracking-wider text-[#5146A5]">
                                    NUMERO
                                </span>
                                <span className="text-[9px] font-mono text-[#706E78] uppercase mt-0.5">
                                    Map Hub
                                </span>
                            </div>
                        </div>

                        {/* Interactive Hint */}
                        <p className="text-xs text-[#706E78] mt-4 font-normal flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5146A5]" />
                            Di chuột hoặc bấm vào con số để xem diễn giải chi tiết
                        </p>
                    </div>

                    {/* Right: Live Product Insight Card Preview (5 cols) */}
                    <div className="lg:col-span-5 bg-[#F8F7F4] rounded-2xl p-6 sm:p-7 border border-[#E7E4DD] space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DD]">
                            <div className="flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-white border border-[#E7E4DD] text-[#5146A5]">
                                    {selectedNode.icon}
                                </span>
                                <div>
                                    <span className="text-[11px] font-mono uppercase text-[#706E78] font-semibold block">
                                        {selectedNode.subtitle}
                                    </span>
                                    <h3 className="font-serif font-bold text-lg text-[#1C1B22]">
                                        {selectedNode.title} {selectedNode.number}
                                    </h3>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E4DD] font-serif font-bold text-xl text-[#5146A5] flex items-center justify-center shadow-xs">
                                {selectedNode.number}
                            </div>
                        </div>

                        {/* Trait Tags */}
                        <div className="text-xs font-medium text-[#5146A5] bg-[#F1EFFA] px-3 py-1.5 rounded-lg border border-[#5146A5]/10 inline-block">
                            {selectedNode.trait}
                        </div>

                        {/* Explanation Content */}
                        <p className="text-xs sm:text-sm text-[#706E78] leading-relaxed">
                            {selectedNode.description}
                        </p>

                        {/* Sample Data Points */}
                        <div className="pt-2 border-t border-[#E7E4DD]/80 grid grid-cols-2 gap-3 text-[11px]">
                            <div className="bg-white p-2.5 rounded-lg border border-[#E7E4DD]">
                                <span className="text-[#706E78] block">Trường năng lượng</span>
                                <span className="font-semibold text-[#1C1B22]">Tần số cao (Vibration 7)</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-[#E7E4DD]">
                                <span className="text-[#706E78] block">Mức độ tương thích</span>
                                <span className="font-semibold text-[#1C1B22]">Hài hòa & Bền bỉ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
);
};
