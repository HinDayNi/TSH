'use client';

import React, { useState } from 'react';
import { useProfile } from '@/lib/context/ProfileContext';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import {
    Header,
    Hero,
    NumerologyPreview,
    Capabilities,
    HowItWorks,
    Philosophy,
    FinalCTA,
    Footer
} from '@/components/landing';

export default function HomePage() {
    const { hasCreatedMap } = useProfile();
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8F7F4] text-[#1C1B22] flex flex-col justify-between selection:bg-[#5146A5] selection:text-white font-sans antialiased">
            {/* 1. Minimal Product Header Navigation */}
            <Header
                hasCreatedMap={hasCreatedMap}
                onOpenOnboarding={() => setIsOnboardingOpen(true)}
            />

            {/* 2. Main Editorial Content Flow */}
            <main className="flex-1 w-full overflow-hidden">
                {/* 2.1 Centered Editorial Hero */}
                <Hero
                    hasCreatedMap={hasCreatedMap}
                    onOpenOnboarding={() => setIsOnboardingOpen(true)}
                />

                {/* 2.2 Realistic Product Preview (Interactive Radial Map Hub) */}
                <NumerologyPreview />

                {/* 2.3 Editorial Capabilities (NUMERO Giúp Bạn Làm Gì?) */}
                <Capabilities />

                {/* 2.4 How NUMERO Works (Horizontal on Desktop, Vertical on Mobile) */}
                <HowItWorks />

                {/* 2.5 Editorial Philosophy (Thần Số Học Pythagoras Là Gì?) */}
                <Philosophy />

                {/* 2.6 Natural Culmination CTA */}
                <FinalCTA
                    hasCreatedMap={hasCreatedMap}
                    onOpenOnboarding={() => setIsOnboardingOpen(true)}
                />
            </main>

            {/* 3. Minimal Footer */}
            <Footer />

            {/* 4. Onboarding Modal System */}
            <OnboardingModal
                isOpen={isOnboardingOpen}
                onClose={() => setIsOnboardingOpen(false)}
            />
        </div>
    );
}
