'use client';

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/lib/context/ProfileContext';
import { SpotlightGuide, GuideStep } from './SpotlightGuide';

/**
 * 3. FIRST-TIME DASHBOARD TOUR
 * Strictly 3 Steps according to NUMERO UX Principles:
 * 1. Numerology Map — "Bản đồ năng lượng của bạn"
 * 2. Number Interaction (Life Path node) — "Khám phá từng con số"
 * 3. 4 Key Numbers — "4 chỉ số trụ cột"
 * 
 * Never tours Sidebar, Header, or standard buttons.
 */
export const DASHBOARD_TOUR_STEPS: GuideStep[] = [
    {
        targetSelector: '[data-tour="numerology-map"]',
        title: 'Bản đồ năng lượng của bạn',
        description: 'Đây là nơi bạn có thể nhìn tổng quan các chỉ số chính trong bản đồ thần số học.',
        actionLabel: 'Tiếp tục',
        preferredPosition: 'bottom'
    },
    {
        targetSelector: '[data-tour="map-lifepath-node"]',
        mobileTargetSelector: '[data-tour="lifepath"]',
        title: 'Khám phá từng con số',
        description: 'Nhấn vào một con số để xem ý nghĩa và phân tích chi tiết mà không cần rời khỏi trang.',
        actionLabel: 'Tiếp tục',
        preferredPosition: 'top'
    },
    {
        targetSelector: '[data-tour="key-numbers"]',
        title: '4 chỉ số trụ cột',
        description: 'Đường Đời, Sứ Mệnh, Linh Hồn và Nhân Cách giúp bạn nhìn bản thân từ nhiều góc độ.',
        actionLabel: 'Bắt đầu khám phá',
        preferredPosition: 'top'
    }
];

export function TourGuide({
    steps = DASHBOARD_TOUR_STEPS
}: {
    steps?: GuideStep[];
}) {
    const {
        hasCompletedTour,
        completeTour,
        hasCreatedMap,
        activeGuide,
        closeGuide,
        markGuideSeen
    } = useProfile();
    const [isActive, setIsActive] = useState<boolean>(false);

    // Auto-trigger on initial profile creation if tour not completed
    useEffect(() => {
        if (!hasCompletedTour && hasCreatedMap) {
            const timer = setTimeout(() => {
                setIsActive(true);
            }, 600);
            return () => clearTimeout(timer);
        } else if (activeGuide === 'dashboard-intro' || activeGuide === 'key-numbers') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [hasCompletedTour, hasCreatedMap, activeGuide]);

    const handleComplete = () => {
        completeTour();
        markGuideSeen('hasSeenDashboardIntro');
        closeGuide();
        setIsActive(false);
    };

    const handleDismiss = () => {
        completeTour();
        markGuideSeen('hasSeenDashboardIntro');
        closeGuide();
        setIsActive(false);
    };

    return (
        <SpotlightGuide
            guideId="dashboard-tour"
            steps={steps}
            isActive={isActive}
            onComplete={handleComplete}
            onDismiss={handleDismiss}
            accentColor="primary"
        />
    );
}
