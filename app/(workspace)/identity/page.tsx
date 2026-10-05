'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProfile } from '@/lib/context/ProfileContext';
import BirthChartMatrix from '@/components/features/identity/BirthChartMatrix';
import { SpotlightGuide, GuideStep } from '@/components/shared/SpotlightGuide';
import {
    Sparkles,
    ArrowRight,
    Compass,
    Shield,
    Flame,
    Brain,
    Heart,
    Activity,
    ChevronRight,
    Award
} from 'lucide-react';
import { getLifePathMetadata, NUMEROLOGY_DETAILS } from '@/lib/numerology/calculator';
import { EmptyState } from '@/components/ui/EmptyState';

const IDENTITY_GUIDE_STEPS: GuideStep[] = [
    {
        targetSelector: '[data-tour="identity-birth-matrix"]',
        title: 'Ma trận ngày sinh',
        description: 'Trực quan hóa sự phân bổ các con số từ ngày sinh trên lưới 3x3 Pythagoras để nhận diện các trục số đầy và mũi tên khuyết.',
        actionLabel: 'Tiếp tục',
        preferredPosition: 'top'
    },
    {
        targetSelector: '[data-tour="identity-bms"]',
        title: 'Thân – Tâm – Trí',
        description: 'Tỷ lệ năng lượng được phân bổ qua 3 trục nhận thức: Trí não logic, Tâm hồn cảm xúc và Thể chất thực thi.',
        actionLabel: 'Tiếp tục',
        preferredPosition: 'top'
    },
    {
        targetSelector: '[data-tour="identity-strengths"]',
        title: 'Điểm mạnh và bài học',
        description: 'Nguồn tài nguyên bẩm sinh sẵn có và các thử thách cuộc đời cần vượt qua để trưởng thành toàn diện.',
        actionLabel: 'Bắt đầu khám phá',
        preferredPosition: 'bottom'
    }
];

export default function IdentityPage() {
    const { profile, data, seenHints, markGuideSeen, activeGuide, closeGuide } = useProfile();
    const [isGuideActive, setIsGuideActive] = useState<boolean>(false);

    useEffect(() => {
        if (!seenHints['hasSeenIdentityGuide'] && data) {
            const timer = setTimeout(() => {
                setIsGuideActive(true);
            }, 800);
            return () => clearTimeout(timer);
        } else if (activeGuide === 'identity-guide') {
            setIsGuideActive(true);
        } else {
            setIsGuideActive(false);
        }
    }, [seenHints, data, activeGuide]);

    const handleGuideComplete = () => {
        markGuideSeen('hasSeenIdentityGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    const handleGuideDismiss = () => {
        markGuideSeen('hasSeenIdentityGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    if (!data) {
        return (
            <div className="py-16 px-4 max-w-xl mx-auto animate-fadeIn text-center">
                <EmptyState
                    icon={<Compass className="w-8 h-8 text-[#5146A5]" />}
                    title="Chưa có thông tin bản thể"
                    description="Vui lòng tạo hồ sơ họ tên và ngày sinh để giải mã ma trận ngày sinh, cấu trúc Thân - Tâm - Trí và các điểm mạnh cốt lõi."
                    actionLabel="Về trang tổng quan"
                    onAction={() => window.location.href = '/dashboard'}
                />
            </div>
        );
    }

    const lp = data.lp || 7;
    const lpMeta = getLifePathMetadata(lp);
    const details = (NUMEROLOGY_DETAILS as any)[lp] || {
        strengths: "Tư duy phân tích, trực giác nhạy bén, khả năng tự đúc kết sâu sắc.",
        weaknesses: "Dễ khép kín, cầu toàn quá mức, khó bộc lộ cảm xúc ra ngoài.",
        lesson: "Học cách tin tưởng người khác và cởi mở đón nhận sự trợ giúp."
    };

    const bms = data.bmsRatio || { mind: 35, soul: 35, body: 30 };

    return (
        <div className="space-y-8 pb-12">
            {/* Identity 3-Step Feature Guide */}
            <SpotlightGuide
                guideId="identity-guide"
                steps={IDENTITY_GUIDE_STEPS}
                isActive={isGuideActive}
                onComplete={handleGuideComplete}
                onDismiss={handleGuideDismiss}
                accentColor="primary"
            />

            {/* 1. Section: BẠN LÀ AI? (Identity Overview Hero) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E4DD] shadow-subtle relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F1EFFA] to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    {/* Header Label */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFFA] text-[#5146A5] text-xs font-semibold border border-[#5146A5]/20">
                            <Compass className="w-3.5 h-3.5 text-[#C59B45]" />
                            <span>Bản Sắc Cốt Lõi • Bạn Là Ai?</span>
                        </div>
                        <span className="text-xs text-[#706E78]">
                            Hồ sơ: <strong className="text-[#1C1B22] font-medium">{profile?.fullName || 'Chưa đặt tên'}</strong> ({profile?.dob || '---'})
                        </span>
                    </div>

                    {/* Main Headline & Archetype */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-8 space-y-3">
                            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1B22] tracking-tight leading-snug">
                                {lpMeta.title || `Bậc Thầy Năng Lượng Số ${lp}`}
                            </h1>
                            <p className="text-base sm:text-lg text-[#706E78] leading-relaxed">
                                {lpMeta.desc || "Bạn sở hữu một trường rung động độc đáo, định hình cách bạn suy nghĩ, cảm nhận và tương tác với thế giới xung quanh."}
                            </p>
                        </div>

                        {/* Life Path Highlight Badge */}
                        <div className="lg:col-span-4 flex items-center lg:justify-end">
                            <div className="bg-[#F8F7F4] border border-[#E7E4DD] rounded-2xl p-5 flex items-center gap-4 w-full sm:w-auto shadow-subtle">
                                <div className="w-16 h-16 rounded-2xl bg-[#5146A5] text-white flex flex-col items-center justify-center font-serif shrink-0 shadow-subtle">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#EFE2C2]">Số</span>
                                    <span className="text-3xl font-extrabold leading-none">{lp}</span>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#706E78] block">Đường Đời (Life Path)</span>
                                    <span className="font-serif font-bold text-[#1C1B22] text-base">Chỉ số dẫn dắt</span>
                                    <span className="text-xs text-[#547A67] block mt-0.5">● Trọng tâm vận mệnh</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4 Pillars Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E7E4DD]">
                        <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD]">
                            <span className="text-[10px] font-bold uppercase text-[#706E78] block">Đường Đời</span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className="font-serif text-2xl font-bold text-[#5146A5]">{data.lp}</span>
                                <span className="text-xs text-[#706E78] line-clamp-1">Sứ mệnh cốt lõi</span>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD]">
                            <span className="text-[10px] font-bold uppercase text-[#706E78] block">Sứ Mệnh</span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className="font-serif text-2xl font-bold text-[#1C1B22]">{data.expression || '?'}</span>
                                <span className="text-xs text-[#706E78] line-clamp-1">Năng lực biểu đạt</span>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD]">
                            <span className="text-[10px] font-bold uppercase text-[#706E78] block">Linh Hồn</span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className="font-serif text-2xl font-bold text-[#1C1B22]">{data.soulUrge || '?'}</span>
                                <span className="text-xs text-[#706E78] line-clamp-1">Khao khát nội tại</span>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD]">
                            <span className="text-[10px] font-bold uppercase text-[#706E78] block">Nhân Cách</span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                                <span className="font-serif text-2xl font-bold text-[#1C1B22]">{data.personality || '?'}</span>
                                <span className="text-xs text-[#706E78] line-clamp-1">Ấn tượng bên ngoài</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. STRENGTHS & CHALLENGES (Điểm mạnh & Thử thách) */}
            <section data-tour="identity-strengths" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thế mạnh tự nhiên */}
                <div className="bg-white rounded-2xl p-6 border border-[#E7E4DD] shadow-subtle space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F1EFFA] text-[#5146A5] flex items-center justify-center border border-[#5146A5]/20">
                            <Flame className="w-5 h-5 text-[#C59B45]" />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-bold text-[#1C1B22]">Điểm Mạnh Cốt Lõi</h3>
                            <p className="text-xs text-[#706E78]">Nguồn tài nguyên bẩm sinh sẵn có</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#1C1B22] leading-relaxed bg-[#F8F7F4] p-4 rounded-xl border border-[#E7E4DD]">
                        {details.strengths}
                    </p>
                    <div className="pt-2">
                        <span className="text-xs font-semibold text-[#547A67] flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#547A67]" />
                            Tận dụng tối đa trong công việc và phát triển
                        </span>
                    </div>
                </div>

                {/* Thử thách cần vượt qua */}
                <div className="bg-white rounded-2xl p-6 border border-[#E7E4DD] shadow-subtle space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] text-[#C59B45] flex items-center justify-center border border-[#E7E4DD]">
                            <Shield className="w-5 h-5 text-[#C59B45]" />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-bold text-[#1C1B22]">Thử Thách & Điểm Cần Rèn Luyện</h3>
                            <p className="text-xs text-[#706E78]">Vùng cơ hội để trưởng thành toàn diện</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#1C1B22] leading-relaxed bg-[#F8F7F4] p-4 rounded-xl border border-[#E7E4DD]">
                        {details.weaknesses}
                    </p>
                    <div className="pt-2">
                        <span className="text-xs font-semibold text-[#C59B45] flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#C59B45]" />
                            Bài học cuộc đời: {details.lesson}
                        </span>
                    </div>
                </div>
            </section>

            {/* 3. THÂN - TÂM - TRÍ (Trục Năng Lượng Toàn Diện) */}
            <section data-tour="identity-bms" className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E4DD] shadow-subtle space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7E4DD]">
                    <div>
                        <h3 className="font-serif text-xl font-bold text-[#1C1B22]">Tỷ Lệ Năng Lượng Thân - Tâm - Trí</h3>
                        <p className="text-xs text-[#706E78]">Sự phân bổ năng lượng sống qua 3 trục nhận thức</p>
                    </div>
                    <span className="text-xs font-medium text-[#5146A5] bg-[#F1EFFA] px-3 py-1 rounded-full border border-[#5146A5]/20 self-start sm:self-auto">
                        Tổng hòa 100%
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Trí */}
                    <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#1C1B22]">
                            <span className="flex items-center gap-1.5">
                                <Brain className="w-4 h-4 text-[#5146A5]" /> Trục Trí Não
                            </span>
                            <span className="text-[#5146A5] text-sm">{bms.mind}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#E7E4DD] overflow-hidden">
                            <div className="h-full bg-[#5146A5] rounded-full transition-all duration-700" style={{ width: `${bms.mind}%` }} />
                        </div>
                        <p className="text-[11px] text-[#706E78] leading-normal pt-1">
                            Tư duy logic, óc sáng tạo và phân tích chiến lược.
                        </p>
                    </div>

                    {/* Tâm */}
                    <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#1C1B22]">
                            <span className="flex items-center gap-1.5">
                                <Heart className="w-4 h-4 text-[#C59B45]" /> Trục Tâm Hồn
                            </span>
                            <span className="text-[#C59B45] text-sm">{bms.soul}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#E7E4DD] overflow-hidden">
                            <div className="h-full bg-[#C59B45] rounded-full transition-all duration-700" style={{ width: `${bms.soul}%` }} />
                        </div>
                        <p className="text-[11px] text-[#706E78] leading-normal pt-1">
                            Trực giác, sự nhạy cảm và khả năng kết nối cảm xúc.
                        </p>
                    </div>

                    {/* Thân */}
                    <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#1C1B22]">
                            <span className="flex items-center gap-1.5">
                                <Activity className="w-4 h-4 text-[#547A67]" /> Trục Thể Chất
                            </span>
                            <span className="text-[#547A67] text-sm">{bms.body}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#E7E4DD] overflow-hidden">
                            <div className="h-full bg-[#547A67] rounded-full transition-all duration-700" style={{ width: `${bms.body}%` }} />
                        </div>
                        <p className="text-[11px] text-[#706E78] leading-normal pt-1">
                            Tính thực tế, kỷ luật hành động và sức bền thể chất.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. MA TRẬN 3X3 PYTHAGORAS */}
            <section data-tour="identity-birth-matrix">
                <BirthChartMatrix data={data} />
            </section>

            {/* 5. CTA: XEM PHÂN TÍCH ĐẦY ĐỦ */}
            <section className="bg-gradient-to-r from-[#5146A5] to-[#443A8C] rounded-2xl p-7 text-white shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFE2C2] bg-white/10 px-3 py-0.5 rounded-full backdrop-blur-xs">
                        <Award className="w-3.5 h-3.5 text-[#EFE2C2]" />
                        <span>Bước tiếp theo trong bản đồ số học</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                        Khám Phá Kim Tự Tháp Vận Trình & 4 Đỉnh Cao
                    </h3>
                    <p className="text-sm text-[#F1EFFA] max-w-xl">
                        Xem chu kỳ vận số, giai đoạn chuyển biến quan trọng nhất và tần số rung động của Năm cá nhân hiện tại.
                    </p>
                </div>
                <Link
                    href="/timeline"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#5146A5] hover:bg-[#F8F7F4] text-sm font-semibold transition-all shrink-0 shadow-subtle group hover:-translate-y-0.5"
                >
                    <span>Khám Phá Vận Trình</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </section>
        </div>
    );
}
