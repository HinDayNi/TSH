'use client';

import React, { useState, useEffect } from 'react';
import PyramidTimeline from '@/components/features/timeline/PyramidTimeline';
import PyramidChart from '@/components/features/timeline/PyramidChart';
import EnergyTracker from '@/components/features/timeline/EnergyTracker';
import { useProfile } from '@/lib/context/ProfileContext';
import { SpotlightGuide, GuideStep } from '@/components/shared/SpotlightGuide';
import { EmptyState } from '@/components/ui/EmptyState';
import { Mountain, Activity, Network, Compass } from 'lucide-react';

const TIMELINE_GUIDE_STEPS: GuideStep[] = [
    {
        targetSelector: '[data-tour="timeline-pyramid"]',
        title: 'Đỉnh cao',
        description: 'Đại diện cho 4 giai đoạn phát triển quan trọng nhất và cơ hội gặt hái thành tựu lớn trong cuộc đời bạn.',
        actionLabel: 'Tiếp tục',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="timeline-cycle"]',
        title: 'Chu kỳ 9 năm',
        description: 'Sự luân chuyển năng lượng tự nhiên theo chu kỳ 9 năm: từ gieo hạt, bứt phá đến thu hoạch và thanh lọc.',
        actionLabel: 'Tiếp tục',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="timeline-energy"]',
        title: 'Năng lượng hiện tại',
        description: 'Thước đo tần số rung động của Năm cá nhân và Tháng cá nhân để bạn chủ động định hướng kế hoạch.',
        actionLabel: 'Bắt đầu khám phá',
        preferredPosition: 'bottom'
    }
];

export default function TimelinePage() {
    const { profile, data, seenHints, markGuideSeen, activeGuide, closeGuide } = useProfile();
    const [viewMode, setViewMode] = useState<'timeline' | 'pyramid-graph' | 'energy'>('timeline');
    const [isGuideActive, setIsGuideActive] = useState<boolean>(false);

    useEffect(() => {
        if (!seenHints['hasSeenTimelineGuide'] && data) {
            const timer = setTimeout(() => {
                setIsGuideActive(true);
            }, 800);
            return () => clearTimeout(timer);
        } else if (activeGuide === 'timeline-guide') {
            setIsGuideActive(true);
        } else {
            setIsGuideActive(false);
        }
    }, [seenHints, data, activeGuide]);

    const handleGuideComplete = () => {
        markGuideSeen('hasSeenTimelineGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    const handleGuideDismiss = () => {
        markGuideSeen('hasSeenTimelineGuide');
        closeGuide();
        setIsGuideActive(false);
    };

    if (!data) {
        return (
            <div className="py-16 px-4 max-w-xl mx-auto animate-fadeIn text-center">
                <EmptyState
                    icon={<Compass className="w-8 h-8 text-[#5146A5]" />}
                    title="Chưa có dữ liệu dòng thời gian"
                    description="Vui lòng tạo hồ sơ để tính toán 4 đỉnh cao kim tự tháp, các chu kỳ biến đổi vận trình và thước đo năng lượng theo ngày."
                    actionLabel="Về trang tổng quan"
                    onAction={() => window.location.href = '/dashboard'}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {/* Timeline 3-Step Feature Guide */}
            <SpotlightGuide
                guideId="timeline-guide"
                steps={TIMELINE_GUIDE_STEPS}
                isActive={isGuideActive}
                onComplete={handleGuideComplete}
                onDismiss={handleGuideDismiss}
                accentColor="gold"
            />

            {/* Sub-navigation Switcher */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#E7E4DD]">
                <div className="flex items-center gap-1.5 p-1 bg-[#F8F7F4] rounded-xl border border-[#E7E4DD] flex-wrap">
                    <button
                        type="button"
                        data-tour="timeline-pyramid"
                        onClick={() => setViewMode('timeline')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            viewMode === 'timeline'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <Mountain className="w-4 h-4 text-[#5146A5]" />
                        <span>Dòng Thời Gian 4 Đỉnh Cao</span>
                    </button>
                    <button
                        type="button"
                        data-tour="timeline-energy"
                        onClick={() => setViewMode('energy')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            viewMode === 'energy'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <Activity className="w-4 h-4 text-[#C59B45]" />
                        <span>Thước Đo Năng Lượng</span>
                    </button>
                    <button
                        type="button"
                        data-tour="timeline-cycle"
                        onClick={() => setViewMode('pyramid-graph')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                            viewMode === 'pyramid-graph'
                                ? 'bg-white text-[#1C1B22] font-semibold shadow-subtle'
                                : 'text-[#706E78] hover:text-[#1C1B22]'
                        }`}
                    >
                        <Network className="w-4 h-4 text-[#547A67]" />
                        <span>Sơ Đồ Kim Tự Tháp</span>
                    </button>
                </div>
            </div>

            {viewMode === 'timeline' && (
                <PyramidTimeline
                    birthDate={profile?.dob || '1990-11-22'}
                    data={data}
                />
            )}

            {viewMode === 'energy' && (
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E4DD] shadow-subtle">
                    <EnergyTracker
                        defaultDob={profile?.dob || '1990-11-22'}
                        defaultName={profile?.fullName || 'Nguyễn Văn Huy'}
                    />
                </div>
            )}

            {viewMode === 'pyramid-graph' && (
                <div className="space-y-6">
                    <PyramidChart data={data} birthDate={profile?.dob || '1990-11-22'} />
                </div>
            )}
        </div>
    );
}
