'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/lib/context/ProfileContext';
import {
    Compass,
    Sparkles,
    UserCheck,
    Calendar,
    HeartHandshake,
    Wand2,
    X,
    ArrowRight,
    HelpCircle
} from 'lucide-react';

interface HelpTopic {
    id: string;
    title: string;
    description: string;
    route: string;
    guideKey: string;
    icon: React.ElementType;
    badge: string;
    color: string;
    bgColor: string;
}

const HELP_TOPICS: HelpTopic[] = [
    {
        id: 'dashboard-intro',
        title: '1. Bản đồ năng lượng',
        description: 'Khám phá tổng quan các chỉ số rung động chính trên bản đồ Pythagoras và cách tương tác.',
        route: '/dashboard',
        guideKey: 'dashboard-intro',
        icon: Compass,
        badge: 'Tổng quan',
        color: '#5146A5',
        bgColor: '#F1EFFA'
    },
    {
        id: 'key-numbers',
        title: '2. Các chỉ số trụ cột',
        description: 'Đường Đời, Sứ Mệnh, Linh Hồn và Nhân Cách — 4 góc nhìn cấu thành bản thể hoàn chỉnh.',
        route: '/dashboard',
        guideKey: 'key-numbers',
        icon: Sparkles,
        badge: 'Trụ cột',
        color: '#C59B45',
        bgColor: '#EFE2C2]/40'
    },
    {
        id: 'identity-guide',
        title: '3. Hiểu bản thân (Bản sắc)',
        description: 'Ma trận ngày sinh 3×3, tỷ lệ Thân – Tâm – Trí và bài học điểm mạnh cần rèn luyện.',
        route: '/identity',
        guideKey: 'identity-guide',
        icon: UserCheck,
        badge: 'Bản sắc',
        color: '#5146A5',
        bgColor: '#F1EFFA'
    },
    {
        id: 'timeline-guide',
        title: '4. Dòng thời gian & Vận trình',
        description: '4 đỉnh cao kim tự tháp, chu kỳ 9 năm biến đổi và thước đo năng lượng hiện tại.',
        route: '/timeline',
        guideKey: 'timeline-guide',
        icon: Calendar,
        badge: 'Vận trình',
        color: '#547A67',
        bgColor: '#EBF3EE'
    },
    {
        id: 'compare-guide',
        title: '5. So sánh & Tương thích',
        description: 'Quy trình đối chiếu năng lượng giữa 2 hồ sơ A ↔ B và danh sách so sánh tên.',
        route: '/compare',
        guideKey: 'compare-guide',
        icon: HeartHandshake,
        badge: 'Đối chiếu',
        color: '#C59B45',
        bgColor: '#EFE2C2]/40'
    },
    {
        id: 'naming-guide',
        title: '6. Tối ưu & Đặt tên bù khuyết',
        description: 'Phân tích các con số còn thiếu trong tên và gợi ý danh xưng cân bằng ngũ hành năng lượng.',
        route: '/naming',
        guideKey: 'naming-guide',
        icon: Wand2,
        badge: 'Đặt tên',
        color: '#5146A5',
        bgColor: '#F1EFFA'
    }
];

export function HelpCenterModal() {
    const router = useRouter();
    const { isHelpCenterOpen, closeHelpCenter, triggerGuide, resetGuide } = useProfile();

    // Escape key handling
    useEffect(() => {
        if (!isHelpCenterOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHelpCenter();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isHelpCenterOpen, closeHelpCenter]);

    // Body scroll lock
    useEffect(() => {
        if (isHelpCenterOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow || '';
            };
        }
    }, [isHelpCenterOpen]);

    if (!isHelpCenterOpen) return null;

    const handleSelectTopic = (topic: HelpTopic) => {
        closeHelpCenter();
        resetGuide(topic.guideKey);
        triggerGuide(topic.guideKey);
        router.push(topic.route);
    };

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
            style={{ zIndex: 1200 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-center-title"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-[#1C1B22]/60 backdrop-blur-sm transition-opacity animate-fadeIn"
                onClick={closeHelpCenter}
            />

            {/* Modal Box */}
            <div
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#E7E4DD] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn z-10"
            >
                {/* Header */}
                <div className="p-6 sm:p-7 border-b border-[#E7E4DD] flex items-start justify-between gap-4 bg-[#F8F7F4]/50">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFFA] text-[#5146A5] text-xs font-semibold border border-[#5146A5]/20">
                            <HelpCircle className="w-3.5 h-3.5 text-[#C59B45]" />
                            <span>Trung Tâm Hỗ Trợ & Hướng Dẫn</span>
                        </div>
                        <h2 id="help-center-title" className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1B22] tracking-tight">
                            Hướng dẫn NUMERO
                        </h2>
                        <p className="text-xs sm:text-sm text-[#706E78]">
                            Bạn muốn tìm hiểu hoặc xem lại hướng dẫn tương tác cho khu vực nào?
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={closeHelpCenter}
                        className="p-2 rounded-xl text-[#706E78] hover:text-[#1C1B22] hover:bg-[#E7E4DD]/60 transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
                        aria-label="Đóng bảng hướng dẫn"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Topics Grid */}
                <div className="p-6 sm:p-7 overflow-y-auto space-y-3 divide-y divide-[#E7E4DD]/60">
                    {HELP_TOPICS.map((topic) => {
                        const Icon = topic.icon;
                        return (
                            <button
                                key={topic.id}
                                type="button"
                                onClick={() => handleSelectTopic(topic)}
                                className="w-full text-left pt-3 first:pt-0 group flex items-start justify-between gap-4 p-3.5 rounded-xl hover:bg-[#F8F7F4] border border-transparent hover:border-[#E7E4DD] transition cursor-pointer"
                            >
                                <div className="flex items-start gap-3.5 min-w-0">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[#E7E4DD] group-hover:scale-105 transition-transform"
                                        style={{ backgroundColor: topic.bgColor.startsWith('#') ? topic.bgColor : '#F1EFFA', color: topic.color }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-serif font-bold text-base text-[#1C1B22] group-hover:text-[#5146A5] transition-colors truncate">
                                                {topic.title}
                                            </h4>
                                            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#706E78] bg-[#F8F7F4] px-2 py-0.5 rounded-md border border-[#E7E4DD]">
                                                {topic.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#706E78] leading-relaxed line-clamp-2">
                                            {topic.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-xs font-semibold text-[#5146A5] shrink-0 pt-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                    <span>Xem guide</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="p-4 sm:p-5 border-t border-[#E7E4DD] bg-[#F8F7F4]/80 flex items-center justify-between text-xs text-[#706E78]">
                    <span>Các chỉ số được tính toán tự động theo hệ thống Pythagoras.</span>
                    <button
                        type="button"
                        onClick={closeHelpCenter}
                        className="h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1C1B22] bg-white border border-[#E7E4DD] hover:bg-[#F8F7F4] transition cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
