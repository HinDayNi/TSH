'use client';

import React, { useState } from 'react';
import { useProfile } from '@/lib/context/ProfileContext';
import { NumerologyMap } from '@/components/numerology/NumerologyMap';
import { TourGuide } from '@/components/shared/TourGuide';
import { Coachmark } from '@/components/shared/Coachmark';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Compass } from 'lucide-react';
import {
    CoreEnergyCard,
    KeyNumbersGrid,
    SuggestedExplorations
} from '@/components/features/dashboard';

export default function DashboardPage() {
    const { data, profile, hasCreatedMap, hasCompletedTour, resetTour, openHelpCenter, seenHints, markHintSeen } = useProfile();
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

    // 1. Empty State nếu chưa tạo bản đồ
    if (!hasCreatedMap || !data) {
        return (
            <div className="py-16 px-4 max-w-xl mx-auto animate-fadeIn text-center">
                <EmptyState
                    icon={<Compass className="w-8 h-8 text-[#5146A5]" />}
                    title="Bạn chưa tạo bản đồ số học"
                    description="Khám phá bản thân thông qua 4 con số trụ cột và kim tự tháp vận trình Pythagoras."
                    actionLabel="Tạo bản đồ của tôi"
                    onAction={() => setIsOnboardingOpen(true)}
                />

                <OnboardingModal
                    isOpen={isOnboardingOpen}
                    onClose={() => setIsOnboardingOpen(false)}
                />
            </div>
        );
    }

    // Only show coachmarks after the main tour is completed
    const showCoachmarks = hasCompletedTour;

    return (
        <div className="space-y-6 animate-fadeIn pb-6">
            {/* Contextual Spotlight Tour Guide */}
            <TourGuide />

            {/* 1. Primary Insight Area: Numerology Map (7 cols) + Core Energy (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* 7 Columns: Numerology Map Centerpiece */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E4DD] p-5 sm:p-6 flex flex-col justify-between shadow-subtle relative">
                    <div className="w-full flex items-center justify-between pb-3 border-b border-[#E7E4DD]">
                        <div>
                            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1B22]">
                                Bản Đồ Năng Lượng
                            </h3>
                            <p className="text-xs text-[#706E78]">
                                Các con số chính trong bản đồ cá nhân của bạn
                            </p>
                        </div>
                        <span className="inline-flex items-center h-6 px-2.5 text-[11px] font-semibold text-[#C59B45] bg-[#EFE2C2]/50 rounded-full border border-[#C59B45]/30">
                            Pythagoras Topology
                        </span>
                    </div>

                    <div className="py-2 relative flex flex-col items-center justify-center">
                        <NumerologyMap
                            data={data}
                            size={330}
                        />
                        {/* Contextual Hint: Tap on map node */}
                        {showCoachmarks && (
                            <Coachmark
                                persistKey="hasSeenMapHint"
                                title="Nhấn vào một con số để khám phá"
                                description="Chạm hoặc nhấn vào một con số trên bản đồ để xem ý nghĩa và phân tích chi tiết."
                                hasSeen={!!seenHints['hasSeenMapHint'] || !!seenHints['map-node-interaction']}
                                onDismiss={markHintSeen}
                                position="right"
                                variant="primary"
                                showDelay={1000}
                            />
                        )}
                    </div>
                </div>

                {/* 5 Columns: Core Energy Card */}
                <div className="lg:col-span-5">
                    <CoreEnergyCard
                        lp={data.lp}
                        expression={data.expression}
                        soulUrge={data.soulUrge}
                        personality={data.personality}
                        attitude={data.attitude?.attitude}
                        personalYear={data.personalYear}
                    />
                </div>
            </div>

            {/* 3. 4 Pillar Indicators (Key Numbers Grid) */}
            <div className="relative">
                <KeyNumbersGrid
                    lp={data.lp}
                    expression={data.expression}
                    soulUrge={data.soulUrge}
                    personality={data.personality}
                />
                {/* Contextual Hint */}
                {showCoachmarks && (
                    <Coachmark
                        persistKey="hasSeenKeyNumbersHint"
                        title="Xem chi tiết chỉ số"
                        description="Bạn có thể chọn bất kỳ chỉ số nào để xem chi tiết."
                        hasSeen={!!seenHints['hasSeenKeyNumbersHint'] || !!seenHints['key-numbers-drawer']}
                        onDismiss={markHintSeen}
                        position="top"
                        variant="gold"
                        showDelay={1800}
                    />
                )}
            </div>

            {/* 4. Suggested Exploration (Khám Phá Tiếp) */}
            <SuggestedExplorations />
        </div>
    );
}
