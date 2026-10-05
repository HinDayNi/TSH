'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/lib/context/ProfileContext';
import { 
    NUMEROLOGY_DETAILS,
    reduceNumber 
} from '@/lib/numerology/calculator';
import { Tabs } from '@/components/ui/Tabs';
import { Toast } from '@/components/ui/Toast';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ArrowLeft, Share2, Sparkles, Check, Heart, Briefcase, AlertCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ZEN_SPRING, ZEN_EASING } from '@/lib/constants/motion';

function AnalysisSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E4DD]">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-24 rounded-[10px]" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-[10px]" />
                <Skeleton className="h-10 w-28 rounded-[10px]" />
                <Skeleton className="h-10 w-28 rounded-[10px]" />
                <Skeleton className="h-10 w-28 rounded-[10px]" />
            </div>
            <div className="bg-white rounded-2xl border border-[#E7E4DD] p-8 flex items-center justify-between">
                <div className="space-y-3 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-4 w-full max-w-lg" />
                </div>
                <Skeleton className="w-20 h-20 rounded-2xl" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-24 rounded-[10px]" />
                <Skeleton className="h-10 w-24 rounded-[10px]" />
                <Skeleton className="h-10 w-24 rounded-[10px]" />
            </div>
            <div className="bg-white rounded-2xl border border-[#E7E4DD] p-8 h-72 space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

function AnalysisWorkspaceInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data } = useProfile();

    const typeParam = searchParams.get('type');
    const tabParam = searchParams.get('tab');
    const isCareerParam = typeParam === 'career';
    const selectedType = isCareerParam ? 'lifepath' : (typeParam || 'lifepath');
    const [activeTab, setActiveTab] = useState<string>(() => isCareerParam ? 'career' : (tabParam || 'overview'));
    const [toastOpen, setToastOpen] = useState<boolean>(false);

    // Sync activeTab when query param changes
    React.useEffect(() => {
        if (isCareerParam) {
            setActiveTab('career');
        } else if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [isCareerParam, tabParam]);

    if (!data) {
        return (
            <div className="py-16 px-4 max-w-xl mx-auto animate-fadeIn text-center">
                <EmptyState
                    icon={<Sparkles className="w-8 h-8 text-[#5146A5]" />}
                    title="Chưa có thông tin phân tích"
                    description="Vui lòng tạo hồ sơ họ tên và ngày sinh để xem diễn giải đa chiều về các con số của bạn."
                    actionLabel="Về trang tổng quan"
                    onAction={() => router.push('/dashboard')}
                />
            </div>
        );
    }

    const numberConfig: Record<string, { title: string; number: number; role: string }> = {
        lifepath: { title: 'Đường Đời', number: data.lp, role: 'Bài học tiến hóa & Xu hướng phát triển chính' },
        expression: { title: 'Sứ Mệnh', number: data.expression, role: 'Năng lực biểu đạt & Tài năng bẩm sinh' },
        soulUrge: { title: 'Linh Hồn', number: data.soulUrge, role: 'Khao khát sâu kín & Động lực nội tâm' },
        personality: { title: 'Nhân Cách', number: data.personality, role: 'Ấn tượng xã hội & Phong thái giao tiếp' }
    };

    const currentConfig = numberConfig[selectedType] || numberConfig.lifepath;
    const reducedVal = reduceNumber(currentConfig.number, false);
    const details = (NUMEROLOGY_DETAILS as any)[reducedVal] || {
        overview: 'Con số chứa đựng bài học và năng lượng độc đáo theo trường phái Pythagoras.',
        strengths: ['Tự lập và kiên định', 'Khả năng tư duy chiến lược', 'Sáng tạo và tinh thần trách nhiệm'],
        challenges: ['Dễ thiếu kiên nhẫn khi gặp cản trở', 'Cần học cách lắng nghe góc nhìn đa chiều'],
        career: ['Lãnh đạo & Quản trị', 'Chuyên gia nghiên cứu', 'Sáng tạo & Đổi mới'],
        relationship: 'Chân thành, sâu sắc và luôn tôn trọng không gian độc lập của đối phương.',
        advice: 'Tập trung phát huy điểm mạnh tự nhiên và nhận diện những phản ứng vô thức khi áp lực gia tăng.'
    };

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setToastOpen(true);
        }
    };

    const tabItems = [
        { id: 'overview', label: 'Tổng Quan', icon: <Sparkles className="w-3.5 h-3.5" /> },
        { id: 'strengths', label: 'Điểm Mạnh', icon: <Check className="w-3.5 h-3.5" /> },
        { id: 'challenges', label: 'Thử Thách', icon: <AlertCircle className="w-3.5 h-3.5" /> },
        { id: 'career', label: 'Sự Nghiệp', icon: <Briefcase className="w-3.5 h-3.5" /> },
        { id: 'relationships', label: 'Tình Cảm', icon: <Heart className="w-3.5 h-3.5" /> },
        { id: 'growth', label: 'Phát Triển', icon: <TrendingUp className="w-3.5 h-3.5" /> }
    ];

    return (
        <div className="space-y-6 animate-fadeIn pb-8">
            <Toast
                isOpen={toastOpen}
                onClose={() => setToastOpen(false)}
                message="Đã sao chép liên kết phân tích!"
            />

            {/* Top Workspace Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E4DD]">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#706E78] hover:text-[#1C1B22] transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại Bản đồ</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={handleShare}
                        leftIcon={<Share2 className="w-[18px] h-[18px] text-[#706E78]" />}
                    >
                        <span>Chia sẻ</span>
                    </Button>
                </div>
            </div>

            {/* Quick Switcher among 4 Core Numbers */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {Object.entries(numberConfig).map(([key, item]) => {
                    const isSelected = selectedType === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => router.push(`/analysis?type=${key}`)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer hover:-translate-y-0.5 ${
                                isSelected
                                    ? 'bg-[#5146A5] text-white shadow-subtle'
                                    : 'bg-white text-[#706E78] hover:text-[#1C1B22] border border-[#E7E4DD] hover:border-[#D3CEEE]'
                            }`}
                        >
                            {item.title} (Số {item.number})
                        </button>
                    );
                })}
            </div>

            {/* Focused Workspace Hero Header with Shared Layout Transition */}
            <motion.div 
                layoutId={`card-${selectedType}`}
                transition={ZEN_SPRING}
                className="bg-white rounded-2xl border border-[#E7E4DD] p-5 sm:p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-subtle"
            >
                <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#5146A5]">
                        {currentConfig.role}
                    </span>
                    <h1 className="text-2xl sm:text-[28px] lg:text-3xl font-serif font-bold text-[#1C1B22]">
                        {currentConfig.title} Số {currentConfig.number}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#706E78] max-w-xl leading-relaxed">
                        Khám phá sâu sắc tầng ý nghĩa, năng lượng chủ đạo và cách thức phát triển tối ưu con số này trong đời sống thực tế.
                    </p>
                </div>

                <motion.div 
                    layoutId={`number-badge-${selectedType}`}
                    transition={ZEN_SPRING}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F1EFFA] text-[#5146A5] border-2 border-[#5146A5]/20 flex items-center justify-center font-serif font-bold text-3xl sm:text-4xl shrink-0 self-center sm:self-auto shadow-subtle"
                >
                    {currentConfig.number}
                </motion.div>
            </motion.div>

            {/* 6 Tabs Navigation with Sliding Pill */}
            <Tabs items={tabItems} activeId={activeTab} onChange={setActiveTab} />

            {/* Focused Tab Content Box with Smooth Fade/Scale */}
            <div className="bg-white rounded-2xl border border-[#E7E4DD] p-5 sm:p-6 lg:p-7 shadow-subtle overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedType}-${activeTab}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: ZEN_EASING }}
                    >
                        {activeTab === 'overview' && (
                            <div className="space-y-4">
                                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1B22]">
                                    Tổng Quan Năng Lượng
                                </h3>
                                <p className="text-sm sm:text-base text-[#1C1B22] leading-relaxed">
                                    {details.overview || 'Con số đại diện cho năng lượng tiên phong, khả năng nhận thức sắc bén và định hướng kiên định.'}
                                </p>
                                <div className="bg-[#F8F7F4] border-l-2 border-[#C59B45] p-4 rounded-r-xl text-xs sm:text-sm italic text-[#1C1B22] leading-relaxed">
                                    "Khi bạn hiểu và hòa nhịp với rung động con số của mình, bạn không còn phải cố gắng gượng gạo mà phát triển một cách tự nhiên nhất."
                                </div>
                            </div>
                        )}

                        {activeTab === 'strengths' && (
                            <div className="space-y-4">
                                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1B22]">
                                    Thế Mạnh & Phẩm Chất Nổi Bật
                                </h3>
                                <p className="text-xs text-[#706E78]">Những nguồn lực nội tại bạn có thể tự tin phát huy:</p>
                                <ul className="space-y-2.5 pt-1">
                                    {(Array.isArray(details.strengths) ? details.strengths : [details.strengths]).map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1C1B22] leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5146A5] mt-2 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'challenges' && (
                            <div className="space-y-4">
                                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1B22]">
                                    Thử Thách & Vùng Cần Hoàn Thiện
                                </h3>
                                <p className="text-xs text-[#706E78]">Nhận diện để không bị chi phối bởi các phản xạ vô thức:</p>
                                <ul className="space-y-2.5 pt-1">
                                    {(Array.isArray(details.challenges) ? details.challenges : [details.challenges]).map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1C1B22] leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full border-2 border-[#C59B45] mt-2 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'career' && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1B22]">
                                        Định Hướng Sự Nghiệp & Phong Cách Làm Việc
                                    </h3>
                                    <p className="text-xs text-[#706E78]">
                                        Khám phá những môi trường và phương thức hành động giúp bạn phát huy tối đa năng lực tự nhiên.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* 1. Natural Strengths */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                                        <div className="text-xs font-bold text-[#1C1B22] flex items-center gap-1.5">
                                            <Check className="w-3.5 h-3.5 text-[#547A67]" />
                                            <span>Thế mạnh bẩm sinh</span>
                                        </div>
                                        <p className="text-xs text-[#706E78] leading-relaxed">
                                            Có xu hướng tư duy độc lập, khả năng tổ chức chiến lược và sự kiên định khi theo đuổi các mục tiêu dài hạn.
                                        </p>
                                    </div>

                                    {/* 2. Working Style */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                                        <div className="text-xs font-bold text-[#1C1B22] flex items-center gap-1.5">
                                            <Briefcase className="w-3.5 h-3.5 text-[#5146A5]" />
                                            <span>Phong cách làm việc</span>
                                        </div>
                                        <p className="text-xs text-[#706E78] leading-relaxed">
                                            Thường làm việc hiệu quả nhất khi được trao quyền tự chủ, có không gian sáng tạo và môi trường làm việc minh bạch.
                                        </p>
                                    </div>

                                    {/* 3. Potential Environments */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                                        <div className="text-xs font-bold text-[#1C1B22] flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-[#C59B45]" />
                                            <span>Môi trường có thể phù hợp</span>
                                        </div>
                                        <p className="text-xs text-[#706E78] leading-relaxed">
                                            Có thể cân nhắc các lĩnh vực nghiên cứu, quản trị chiến lược, đổi mới sáng tạo, tư vấn hoặc khởi nghiệp tự do.
                                        </p>
                                    </div>

                                    {/* 4. Development Suggestions */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-[#F1EFFA] border border-[#5146A5]/20 space-y-2">
                                        <div className="text-xs font-bold text-[#5146A5] flex items-center gap-1.5">
                                            <TrendingUp className="w-3.5 h-3.5 text-[#5146A5]" />
                                            <span>Gợi ý phát triển</span>
                                        </div>
                                        <p className="text-xs text-[#1C1B22] leading-relaxed">
                                            Nên tôi luyện kỹ năng lắng nghe phản hồi và phân bổ thời gian nghỉ ngơi hợp lý để duy trì ngọn lửa nhiệt huyết.
                                        </p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {(Array.isArray(details.career) ? details.career : ['Quản lý', 'Nghiên cứu', 'Chiến lược']).map((c: string, idx: number) => (
                                        <span key={idx} className="inline-flex items-center h-7 px-3 text-xs font-medium rounded-full bg-[#F8F7F4] border border-[#E7E4DD] text-[#5146A5]">
                                            #{c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'relationships' && (
                            <div className="space-y-4">
                                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1B22]">
                                    Phong Cách Gắn Kết & Mối Quan Hệ
                                </h3>
                                <p className="text-sm sm:text-base text-[#1C1B22] leading-relaxed">
                                    {details.relationship || 'Bạn coi trọng sự thấu hiểu chân thành và cần một người bạn đồng hành biết tôn trọng sự tự do của nhau.'}
                                </p>
                            </div>
                        )}

                        {activeTab === 'growth' && (
                            <div className="space-y-4">
                                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1B22]">
                                    Lời Khuyên Rèn Luyện & Phát Triển Bản Thân
                                </h3>
                                <p className="text-sm sm:text-base text-[#1C1B22] leading-relaxed">
                                    {details.advice || 'Hãy học cách cân bằng giữa khát vọng cá nhân và sự lắng nghe đồng cảm từ những người xung quanh.'}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function AnalysisPage() {
    return (
        <Suspense fallback={<AnalysisSkeleton />}>
            <AnalysisWorkspaceInner />
        </Suspense>
    );
}
