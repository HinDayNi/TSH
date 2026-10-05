'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/lib/context/ProfileContext';
import { SidebarProvider, useSidebar } from '@/lib/context/SidebarContext';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { TopHeader } from '@/components/layout/TopHeader';
import { MobileNav } from '@/components/layout/MobileNav';
import { NextRouteBar } from '@/components/layout/NextRouteBar';
import { HelpCenterModal } from '@/components/shared/HelpCenterModal';
import { Modal } from '@/components/ui/Modal';
import NumerologyForm, { NumerologyFormSubmitData } from '@/components/forms/NumerologyForm';
import { ZEN_EASING } from '@/lib/constants/motion';

function WorkspaceLayoutInner({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { profile, updateProfile } = useProfile();
    const { isCollapsed } = useSidebar();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleFormSubmit = (formData: NumerologyFormSubmitData) => {
        updateProfile({
            fullName: formData.fullName,
            lastName: formData.lastName,
            middleName: formData.middleName,
            firstName: formData.firstName,
            dob: formData.birthDate,
            calendarType: formData.calendarType,
            birthTime: formData.birthTime
        });
        setIsEditModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F7F4] text-[#1C1B22] flex flex-col md:flex-row antialiased selection:bg-[#5146A5] selection:text-white font-sans">
            {/* Desktop Fixed Sidebar & Mobile Drawer */}
            <SidebarNav onEditProfile={() => setIsEditModalOpen(true)} />

            {/* Main Workspace Body: dynamically adjusts padding-left according to isCollapsed */}
            <div
                className={`flex-1 flex flex-col min-w-0 pb-20 md:pb-8 transition-[padding-left] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCollapsed ? 'md:pl-[72px]' : 'md:pl-[240px]'
                }`}
            >
                {/* Sticky Header with Dynamic Breadcrumb */}
                <TopHeader onEditProfile={() => setIsEditModalOpen(true)} />

                {/* Content Outlet: max-width 1400px, responsive padding 20/32/48px, compact top spacing */}
                <main className="flex-1 max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-5 sm:pt-6 pb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: ZEN_EASING }}
                            className="w-full"
                        >
                            {children}
                            {pathname !== '/report' && <NextRouteBar />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileNav />

            {/* Global Help Center Modal */}
            <HelpCenterModal />

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Cập nhật thông tin ngày sinh"
                description="Hệ thống sẽ tự động tính toán lại toàn bộ bản đồ số học của bạn"
                maxWidth="lg"
            >
                <NumerologyForm
                    compact={true}
                    initialData={{
                        fullName: profile.fullName,
                        birthDate: profile.dob,
                        calendarType: profile.calendarType,
                        birthTime: profile.birthTime
                    }}
                    onSubmit={handleFormSubmit}
                />
            </Modal>
        </div>
    );
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <WorkspaceLayoutInner>{children}</WorkspaceLayoutInner>
        </SidebarProvider>
    );
}
