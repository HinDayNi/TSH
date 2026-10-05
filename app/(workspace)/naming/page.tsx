'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NameOptimizer from '@/components/features/naming/NameOptimizer';
import NamingTab from '@/components/features/naming/NamingTab';
import { useProfile } from '@/lib/context/ProfileContext';
import { SpotlightGuide, GuideStep } from '@/components/shared/SpotlightGuide';
import { EmptyState } from '@/components/ui/EmptyState';
import { Toast } from '@/components/ui/Toast';
import { Wand2, Compass } from 'lucide-react';
import { PremiumGate } from '@/components/shared/PremiumGate';

const NAMING_GUIDE_STEPS: GuideStep[] = [
    {
        targetSelector: '[data-tour="naming-workflow"]',
        title: 'Quy trình tối ưu tên',
        description: 'Bạn sẽ bắt đầu bằng việc nhập hoặc chọn tên, sau đó phân tích các con số, xác định số còn thiếu và xem các gợi ý phù hợp.',
        actionLabel: 'Tiếp theo',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="naming-tabs"]',
        title: 'Chọn công cụ phù hợp',
        description: 'Chọn công cụ dựa trên mục tiêu bạn muốn khám phá hoặc tối ưu tên.',
        actionLabel: 'Tiếp theo',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="naming-results"]',
        title: 'Khám phá tên được gợi ý',
        description: 'Xem các con số còn thiếu và khám phá những tên được đề xuất dựa trên kết quả phân tích.',
        actionLabel: 'Bắt đầu tối ưu tên',
        preferredPosition: 'top'
    }
];

export default function NamingPage() {
    const router = useRouter();
    const { profile, data, addCompareName, applyName, seenHints, markGuideSeen, activeGuide, closeGuide } = useProfile();
    const [mode, setMode] = useState<'optimizer' | 'recommendations'>('optimizer');
    const [isGuideActive, setIsGuideActive] = useState<boolean>(false);
    const [toastState, setToastState] = useState<{ isOpen: boolean; message: string; type: 'success' | 'info' }>({
        isOpen: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        if (activeGuide === 'naming-guide') {
            setIsGuideActive(true);
        } else {
            setIsGuideActive(false);
        }
    }, [activeGuide]);

    const handleGuideComplete = () => {
        markGuideSeen('hasSeenNamingGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    const handleGuideDismiss = () => {
        markGuideSeen('hasSeenNamingGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    const showToast = (message: string, type: 'success' | 'info' = 'success') => {
        setToastState({ isOpen: true, message, type });
    };

    const handleCompare = (name: string) => {
        addCompareName(name);
        showToast(`Đã thêm tên "${name}" vào danh sách đối chiếu so sánh!`);
        setTimeout(() => {
            router.push('/compare?tab=names');
        }, 1200);
    };

    const handleApply = (name: string) => {
        applyName(name);
        showToast(`Đã áp dụng tên "${name}" làm tên chính cho hồ sơ!`);
    };

    if (!data) {
        return (
            <div className="py-16 px-4 max-w-xl mx-auto animate-fadeIn text-center">
                <EmptyState
                    icon={<Compass className="w-8 h-8 text-[#5146A5]" />}
                    title="Chưa có thông tin đặt tên"
                    description="Vui lòng nhập thông tin ngày sinh để thuật toán phân tích các con số thiếu và gợi ý danh xưng cân bằng năng lượng."
                    actionLabel="Về trang tổng quan"
                    onAction={() => window.location.href = '/dashboard'}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {/* Naming Feature Guide */}
            <SpotlightGuide
                guideId="naming-guide"
                steps={NAMING_GUIDE_STEPS}
                isActive={isGuideActive}
                onComplete={handleGuideComplete}
                onDismiss={handleGuideDismiss}
                accentColor="primary"
            />

            {/* Short Introduction on First Visit (Dismissible) */}
            {!seenHints['hasSeenNamingGuide'] && (
                <div className="bg-[#F1EFFA] border border-[#5146A5]/20 rounded-2xl p-5 sm:p-6 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
                    <div className="space-y-1 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white text-[#5146A5] text-[11px] font-semibold border border-[#5146A5]/20">
                            <Wand2 className="w-3.5 h-3.5 text-[#C59B45]" />
                            <span>Hướng Dẫn Quy Trình Đặt Tên</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-[#1C1B22]">
                            Tối ưu tên hoạt động như thế nào?
                        </h3>
                        <p className="text-xs sm:text-sm text-[#706E78] leading-relaxed">
                            Công cụ phân tích các chỉ số trong tên hiện tại và gợi ý những lựa chọn để bạn tham khảo nhằm cân bằng các con số còn thiếu trong bản đồ Pythagoras.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => markGuideSeen('hasSeenNamingGuide')}
                        className="h-10 px-4 rounded-[10px] bg-[#5146A5] hover:bg-[#443A8C] text-white text-xs font-semibold shrink-0 cursor-pointer shadow-subtle transition"
                    >
                        Đã hiểu
                    </button>
                </div>
            )}

            {/* Guided Workflow Steps */}
            <div data-tour="naming-workflow" className="bg-[#F8F7F4] border border-[#E7E4DD] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5146A5]">
                        Quy Trình Tối Ưu Danh Xưng
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#1C1B22]">
                        4 Bước Bù Khuyết Năng Lượng Tên
                    </h3>
                </div>

                {/* 4 Steps Flow */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DD] text-[#1C1B22] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#5146A5] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                        <span>Nhập/chọn tên</span>
                    </span>
                    <span className="text-[#96939C]">➔</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DD] text-[#1C1B22] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#C59B45] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                        <span>Phân tích</span>
                    </span>
                    <span className="text-[#96939C]">➔</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DD] text-[#1C1B22] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#547A67] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                        <span>Xem số thiếu</span>
                    </span>
                    <span className="text-[#96939C]">➔</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F1EFFA] border border-[#5146A5]/30 text-[#5146A5] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#5146A5] text-white text-[10px] flex items-center justify-center font-bold">4</span>
                        <span>Xem gợi ý</span>
                    </span>
                </div>
            </div>

            {/* Top Sub-navigation Switcher */}
            <div data-tour="naming-tabs" className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#E7E4DD]">
                <div className="flex items-center gap-1.5 p-1 bg-[#F8F7F4] rounded-xl border border-[#E7E4DD] flex-wrap">
                    <button
                        type="button"
                        onClick={() => setMode('optimizer')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            mode === 'optimizer'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <Wand2 className="w-4 h-4 text-[#5146A5]" />
                        <span>Công Cụ Đặt Tên Bù Khuyết</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('recommendations')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            mode === 'recommendations'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <Compass className="w-4 h-4 text-[#C59B45]" />
                        <span>Kho Danh Xưng Đa Dạng</span>
                    </button>
                </div>
            </div>

            <div data-tour="naming-content-card">
                {mode === 'optimizer' ? (
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E4DD] shadow-subtle">
                        <NameOptimizer
                            defaultDob={profile?.dob || '2026-06-17'}
                            defaultCurrentName={profile?.fullName || ''}
                            onApplyName={handleApply}
                            onCompareName={handleCompare}
                        />
                    </div>
                ) : (
                    <NamingTab
                        data={data}
                        onCompare={handleCompare}
                        onApply={handleApply}
                    />
                )}
            </div>

            <PremiumGate
                title="Gợi ý tối ưu tên nâng cao"
                description="Mở khóa đối chiếu sâu giữa tên, nợ nghiệp, ngũ hành và mục tiêu phát triển cá nhân."
            >
                <h3 className="font-serif text-xl font-bold">Bộ lọc tên theo mục tiêu dài hạn</h3>
                <p className="mt-3 text-sm">Cân bằng âm tiết, chỉ số thiếu và mức tương thích gia đình.</p>
            </PremiumGate>

            {/* In-app Toast Feedback */}
            <Toast
                isOpen={toastState.isOpen}
                message={toastState.message}
                type={toastState.type}
                onClose={() => setToastState((prev) => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}
