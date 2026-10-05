'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RelationshipMatrix from '@/components/features/compatibility/RelationshipMatrix';
import CompareTab from '@/components/features/compatibility/CompareTab';
import CompatibilityTab from '@/components/features/compatibility/CompatibilityTab';
import { useProfile } from '@/lib/context/ProfileContext';
import { SpotlightGuide, GuideStep } from '@/components/shared/SpotlightGuide';
import { EmptyState } from '@/components/ui/EmptyState';
import { HeartHandshake, GitCompare, Users, Compass } from 'lucide-react';

const COMPARE_GUIDE_STEPS: GuideStep[] = [
    {
        targetSelector: '[data-tour="compare-workflow"]',
        title: 'Quy trình so sánh',
        description: 'Bạn sẽ lần lượt nhập hồ sơ A, hồ sơ B, chọn loại so sánh và xem kết quả phân tích.',
        actionLabel: 'Tiếp theo',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="compare-tabs"]',
        title: 'Chọn cách bạn muốn so sánh',
        description: 'Chọn chế độ phù hợp với mục đích của bạn trước khi bắt đầu phân tích.',
        actionLabel: 'Tiếp theo',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="compare-results"]',
        title: 'Khám phá kết quả phân tích',
        description: 'Sau khi hoàn tất thông tin, hệ thống sẽ hiển thị mức độ tương thích, điểm nổi bật và những khía cạnh cần lưu ý.',
        actionLabel: 'Bắt đầu so sánh',
        preferredPosition: 'top'
    }
];

function CompareContent() {
    const { profile, data, compareNamesList, updateCompareNameAtIndex, seenHints, markGuideSeen, activeGuide, closeGuide } = useProfile();
    const searchParams = useSearchParams();
    const initialTab = (searchParams.get('tab') as 'couple' | 'names' | 'family') || 'couple';
    const [subTab, setSubTab] = useState<'couple' | 'names' | 'family'>(initialTab);
    const [isGuideActive, setIsGuideActive] = useState<boolean>(false);

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam === 'couple' || tabParam === 'names' || tabParam === 'family') {
            setSubTab(tabParam);
        }
    }, [searchParams]);

    useEffect(() => {
        if (activeGuide === 'compare-guide') {
            setIsGuideActive(true);
        } else {
            setIsGuideActive(false);
        }
    }, [activeGuide]);

    const handleGuideComplete = () => {
        markGuideSeen('hasSeenCompareGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    const handleGuideDismiss = () => {
        markGuideSeen('hasSeenCompareGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    if (!data) {
        return (
            <div className="py-16 px-4 max-w-xl mx-auto animate-fadeIn text-center">
                <EmptyState
                    icon={<Compass className="w-8 h-8 text-[#5146A5]" />}
                    title="Chưa có thông tin đối chiếu"
                    description="Vui lòng tạo hồ sơ để đối chiếu mức độ tương thích giữa bạn và đối tác, người thân hoặc so sánh các tên dự kiến."
                    actionLabel="Về trang tổng quan"
                    onAction={() => window.location.href = '/dashboard'}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {/* Compare Feature Guide */}
            <SpotlightGuide
                guideId="compare-guide"
                steps={COMPARE_GUIDE_STEPS}
                isActive={isGuideActive}
                onComplete={handleGuideComplete}
                onDismiss={handleGuideDismiss}
                accentColor="gold"
            />

            {/* Guided Workflow Progress Indicator */}
            <div data-tour="compare-workflow" className="bg-[#F8F7F4] border border-[#E7E4DD] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5146A5]">
                        Quy Trình Đối Chiếu (Guided Workflow)
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#1C1B22]">
                        4 Bước So Sánh Tương Thích Năng Lượng
                    </h3>
                </div>

                {/* 4 Steps Flow */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DD] text-[#1C1B22] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#5146A5] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                        <span>Hồ sơ A</span>
                    </span>
                    <span className="text-[#96939C]">➔</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DD] text-[#1C1B22] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#C59B45] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                        <span>Hồ sơ B</span>
                    </span>
                    <span className="text-[#96939C]">➔</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DD] text-[#1C1B22] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#547A67] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                        <span>Loại so sánh</span>
                    </span>
                    <span className="text-[#96939C]">➔</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F1EFFA] border border-[#5146A5]/30 text-[#5146A5] font-semibold shadow-xs">
                        <span className="w-4 h-4 rounded-full bg-[#5146A5] text-white text-[10px] flex items-center justify-center font-bold">4</span>
                        <span>Kết quả</span>
                    </span>
                </div>
            </div>

            {/* View Sub-navigation Toggle: Segmented control */}
            <div data-tour="compare-tabs" className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#E7E4DD] relative">
                <div className="flex items-center gap-1.5 p-1 bg-[#F8F7F4] rounded-xl border border-[#E7E4DD] flex-wrap">
                    <button
                        type="button"
                        onClick={() => setSubTab('couple')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            subTab === 'couple'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <HeartHandshake className="w-4 h-4 text-[#5146A5]" />
                        <span>Tương Thích Người A ↔ B</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setSubTab('names')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            subTab === 'names'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <GitCompare className="w-4 h-4 text-[#C59B45]" />
                        <span>So Sánh Danh Sách Tên</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setSubTab('family')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            subTab === 'family'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <Users className="w-4 h-4 text-[#547A67]" />
                        <span>Tương Hợp Gia Đình</span>
                    </button>
                </div>
            </div>

            {/* Content Card Section */}
            <div data-tour="compare-content-card">
                {subTab === 'couple' && (
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E4DD] shadow-subtle relative">
                        <RelationshipMatrix
                            defaultP1Name={profile?.fullName || 'Nguyễn Văn Huy'}
                            defaultP1Dob={profile?.dob || '1990-11-22'}
                        />
                    </div>
                )}

                {subTab === 'names' && (
                    <CompareTab
                        data={data}
                        compareNamesList={compareNamesList}
                        onChangeCompareName={updateCompareNameAtIndex}
                    />
                )}

                {subTab === 'family' && (
                    <CompatibilityTab data={data} />
                )}
            </div>
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="py-16 text-center text-sm text-[#706E78]">Đang tải dữ liệu đối chiếu...</div>}>
            <CompareContent />
        </Suspense>
    );
}
