'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer } from '@/components/ui/Drawer';
import { Sheet } from '@/components/ui/Sheet';
import { NUMEROLOGY_DETAILS, reduceNumber } from '@/lib/numerology/calculator';
import { useProfile } from '@/lib/context/ProfileContext';
import { Sparkles, Check, AlertCircle, Briefcase, TrendingUp, ArrowRight, ChevronDown, ChevronUp, X, Lightbulb } from 'lucide-react';

export interface NumberDetailData {
    number: number;
    title: string;
    role: string;
    summary?: string;
    type?: string; // 'lifepath' | 'expression' | 'soulUrge' | 'personality' | 'personalYear' ...
}

export interface NumberDetailPanelProps {
    data: NumberDetailData | null;
    isOpen: boolean;
    onClose: () => void;
}

export function NumberDetailPanel({
    data,
    isOpen,
    onClose
}: NumberDetailPanelProps) {
    const { seenHints, markGuideSeen } = useProfile();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!data) return null;

    const reducedVal = reduceNumber(data.number, false);
    const details = (NUMEROLOGY_DETAILS as any)[reducedVal] || {
        overview: 'Con số chứa đựng bài học và tần số rung động độc đáo theo trường phái Pythagoras chuẩn mực.',
        strengths: ['Tự lập và kiên định', 'Khả năng tư duy chiến lược', 'Sáng tạo và tinh thần trách nhiệm'],
        challenges: ['Dễ thiếu kiên nhẫn khi gặp cản trở', 'Cần học cách lắng nghe góc nhìn đa chiều'],
        career: ['Lãnh đạo & Quản trị', 'Chuyên gia nghiên cứu', 'Sáng tạo & Đổi mới'],
        relationship: 'Chân thành, sâu sắc và luôn tôn trọng không gian độc lập của đối phương.',
        advice: 'Tập trung phát huy điểm mạnh tự nhiên và nhận diện những phản ứng vô thức khi áp lực gia tăng.'
    };

    const targetUrl = data.type === 'lifepath'
        ? '/identity'
        : data.type
        ? `/analysis?type=${data.type}`
        : '/analysis';

    // Panel Inner Content (Reusable for both Desktop Drawer & Mobile Sheet)
    const renderContent = () => (
        <div className="space-y-6">
            {/* Contextual Hint for First-time Drawer View */}
            {!seenHints['hasSeenNumberDrawerHint'] && (
                <div className="p-3.5 rounded-xl bg-[#F1EFFA] border border-[#5146A5]/20 flex items-center justify-between gap-3 text-xs text-[#5146A5] animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-[#C59B45] shrink-0" />
                        <span className="font-medium">Bạn có thể xem phân tích sâu hơn tại đây.</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => markGuideSeen('hasSeenNumberDrawerHint')}
                        className="p-1 rounded-md text-[#5146A5] hover:bg-[#5146A5]/10 transition cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center shrink-0"
                        aria-label="Đóng gợi ý"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Breadcrumb Context */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#706E78]">
                <span>Bản đồ của bạn</span>
                <span>›</span>
                <span className="text-[#5146A5] font-medium">{data.title} Số {data.number}</span>
            </div>

            {/* LEVEL 1: Header Number + Title + 1-Line Summary */}
            <div className="flex items-start gap-4 pb-5 border-b border-[#E7E4DD]">
                <div className="w-16 h-16 rounded-2xl bg-[#F1EFFA] text-[#5146A5] border border-[#5146A5]/20 flex items-center justify-center font-serif font-bold text-3xl shrink-0 shadow-subtle">
                    {data.number}
                </div>
                <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5146A5] font-semibold block">
                        {data.role}
                    </span>
                    <h2 className="font-serif font-bold text-xl text-[#1C1B22] leading-tight">
                        {data.title} Số {data.number}
                    </h2>
                    <p className="text-xs text-[#706E78] leading-relaxed">
                        {data.summary || details.overview?.slice(0, 100) + '...'}
                    </p>
                </div>
            </div>

            {/* LEVEL 2: Short Explanation & Overview */}
            <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1B22]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B45]" />
                    <span>Tổng Quan Rung Động</span>
                </div>
                <p className="text-sm text-[#1C1B22] leading-[1.75]">
                    {details.overview}
                </p>
            </div>

            {/* LEVEL 3: Deep Insights (Strengths, Challenges, Career, Growth) */}
            <div className="space-y-5 pt-2">
                {/* Thế mạnh */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1C1B22]">
                        <Check className="w-3.5 h-3.5 text-[#547A67]" />
                        <span>Thế Mạnh Nổi Bật</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#706E78]">
                        {(Array.isArray(details.strengths) ? details.strengths : [details.strengths]).map((st: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#5146A5] mt-1.5 shrink-0" />
                                <span>{st}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Thử thách */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1C1B22]">
                        <AlertCircle className="w-3.5 h-3.5 text-[#C59B45]" />
                        <span>Thử Thách & Vùng Cần Hoàn Thiện</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#706E78]">
                        {(Array.isArray(details.challenges) ? details.challenges : [details.challenges]).map((ch: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#C59B45] mt-1.5 shrink-0" />
                                <span>{ch}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Định hướng sự nghiệp */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1C1B22]">
                        <Briefcase className="w-3.5 h-3.5 text-[#5146A5]" />
                        <span>Môi Trường Sự Nghiệp Tiềm Năng</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {(Array.isArray(details.career) ? details.career : ['Quản trị', 'Chiến lược']).map((c: string, idx: number) => (
                            <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-[#E7E4DD] text-[11px] font-medium text-[#5146A5]">
                                {c}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Lời khuyên phát triển */}
                <div className="p-4 rounded-xl bg-[#F1EFFA] border border-[#5146A5]/20 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#5146A5]">
                        <TrendingUp className="w-3.5 h-3.5 text-[#5146A5]" />
                        <span>Lời Khuyên Rèn Luyện Bản Thân</span>
                    </div>
                    <p className="text-xs text-[#1C1B22] leading-relaxed">
                        {details.advice}
                    </p>
                </div>
            </div>

            {/* Primary Action CTA */}
            <div className="pt-4 border-t border-[#E7E4DD]">
                <Link
                    href={targetUrl}
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5146A5] hover:bg-[#443A8C] text-white text-xs font-semibold transition shadow-subtle hover:-translate-y-0.5 cursor-pointer"
                >
                    <span>Khám phá đầy đủ khía cạnh này</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Drawer (>= 768px) */}
            <div className="hidden md:block">
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    title={`${data.title} Số ${data.number}`}
                    subtitle={data.role}
                >
                    {renderContent()}
                </Drawer>
            </div>

            {/* Mobile Bottom Sheet (< 768px) */}
            <div className="md:hidden">
                <Sheet
                    isOpen={isOpen}
                    onClose={onClose}
                    title={`${data.title} Số ${data.number}`}
                >
                    {renderContent()}
                </Sheet>
            </div>
        </>
    );
}

export default NumberDetailPanel;
