'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/lib/context/ProfileContext';
import { Modal } from '@/components/ui/Modal';
import { LoadingTransition } from './LoadingTransition';
import { ArrowLeft, ArrowRight, Sparkles, Check, Compass, Calendar, User, Target } from 'lucide-react';
import { convertLunarToSolar } from '@/lib/numerology/lunar';

const DISCOVERY_OPTIONS = [
    { id: 'personality', label: 'Bản thân & Tâm lý', desc: 'Nhận diện nội tâm và bài học phát triển' },
    { id: 'career', label: 'Sự nghiệp & Phong cách', desc: 'Môi trường làm việc và điểm mạnh bẩm sinh' },
    { id: 'relationship', label: 'Tình cảm & Kết nối', desc: 'Gắn kết các mối quan hệ hòa hợp' },
    { id: 'timeline', label: 'Dòng thời gian & Đỉnh cao', desc: 'Dự báo năng lượng từng giai đoạn cuộc đời' }
];

const LOADING_MESSAGES = [
    'Đang tạo bản đồ của bạn...',
    'Đang tính toán các chỉ số cốt lõi...',
    'Bản đồ của bạn đã sẵn sàng.'
];

export function OnboardingModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const router = useRouter();
    const { completeOnboarding, profile } = useProfile();

    // 4 Steps: 1 (Ngày sinh) -> 2 (Họ tên) -> 3 (Mục tiêu) -> 4 (Tạo bản đồ)
    const [step, setStep] = useState<number>(1);
    const [dob, setDob] = useState<string>(profile.dob || '1995-08-15');
    const [calendarType, setCalendarType] = useState<'SOLAR' | 'LUNAR'>(profile.calendarType || 'SOLAR');
    const [fullName, setFullName] = useState<string>(profile.fullName || '');
    const [selectedFocus, setSelectedFocus] = useState<string[]>(['personality', 'career']);

    // Loading transition state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingStage, setLoadingStage] = useState<number>(0);

    const toggleFocus = (id: string) => {
        setSelectedFocus((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleCreateMap = () => {
        if (!dob) {
            alert('Vui lòng chọn ngày sinh để tính toán bản đồ.');
            return;
        }

        setIsLoading(true);
        setLoadingStage(0);

        const interval = setInterval(() => {
            setLoadingStage((prev) => {
                if (prev >= LOADING_MESSAGES.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        let effectiveDob = dob;
                        if (calendarType === 'LUNAR') {
                            try {
                                const parts = dob.split('-');
                                if (parts.length === 3) {
                                    const y = parseInt(parts[0], 10);
                                    const m = parseInt(parts[1], 10);
                                    const d = parseInt(parts[2], 10);
                                    const solar = convertLunarToSolar(d, m, y);
                                    effectiveDob = solar.formatted || `${solar.year}-${String(solar.month).padStart(2, '0')}-${String(solar.day).padStart(2, '0')}`;
                                }
                            } catch (e) {
                                console.error('Lunar conversion failed, fallback to raw dob', e);
                            }
                        }

                        // Save profile and trigger calculation
                        completeOnboarding(
                            {
                                fullName: fullName.trim() || 'Người khám phá',
                                dob: effectiveDob,
                                calendarType
                            },
                            selectedFocus
                        );

                        setIsLoading(false);
                        onClose();
                        router.push('/dashboard');
                    }, 400);
                    return prev;
                }
                return prev + 1;
            });
        }, 700);
    };

    const stepTitles = [
        'Ngày sinh của bạn',
        'Họ và tên khai sinh',
        'Mục tiêu khám phá',
        'Xác nhận tạo bản đồ'
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                <div className="flex items-center justify-between w-full">
                    <span className="font-serif font-bold text-lg text-[#1C1B22]">
                        {stepTitles[step - 1]}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#5146A5] bg-[#F1EFFA] px-2.5 py-0.5 rounded-full">
                        0{step} / 04
                    </span>
                </div>
            }
            maxWidth="md"
        >
            {isLoading ? (
                <div className="py-10">
                    <LoadingTransition message={LOADING_MESSAGES[loadingStage]} />
                </div>
            ) : (
                <div className="space-y-6 pt-2">
                    {/* STEP 1: NGÀY SINH */}
                    {step === 1 && (
                        <div className="space-y-5 animate-fadeIn">
                            <div className="space-y-1">
                                <p className="text-xs text-[#706E78]">
                                    Ngày sinh định hình con số Đường Đời và bài học tiến hóa lớn nhất trong cuộc đời bạn.
                                </p>
                            </div>

                            {/* Solar vs Lunar Switch */}
                            <div className="flex rounded-xl bg-[#F8F7F4] p-1 border border-[#E7E4DD] max-w-xs">
                                <button
                                    type="button"
                                    onClick={() => setCalendarType('SOLAR')}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                                        calendarType === 'SOLAR'
                                            ? 'bg-white text-[#5146A5] font-semibold shadow-subtle'
                                            : 'text-[#706E78] hover:text-[#1C1B22]'
                                    }`}
                                >
                                    Dương lịch
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCalendarType('LUNAR')}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                                        calendarType === 'LUNAR'
                                            ? 'bg-white text-[#5146A5] font-semibold shadow-subtle'
                                            : 'text-[#706E78] hover:text-[#1C1B22]'
                                    }`}
                                >
                                    Âm lịch
                                </button>
                            </div>

                            {/* Date Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#1C1B22] flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-[#5146A5]" />
                                    <span>Chọn ngày, tháng, năm sinh</span>
                                </label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#E7E4DD] bg-white text-[#1C1B22] text-sm focus:outline-hidden focus:border-[#5146A5] focus:ring-2 focus:ring-[#5146A5]/10 transition"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2: TÊN KHAI SINH */}
                    {step === 2 && (
                        <div className="space-y-5 animate-fadeIn">
                            <div className="space-y-1">
                                <p className="text-xs text-[#706E78]">
                                    Họ tên khai sinh quy đổi thành tần số rung động của Sứ Mệnh, Linh Hồn và Nhân Cách.
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#1C1B22] flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-[#5146A5]" />
                                    <span>Họ và tên đầy đủ trên giấy khai sinh</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: Nguyễn Văn An"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#E7E4DD] bg-white text-[#1C1B22] text-sm focus:outline-hidden focus:border-[#5146A5] focus:ring-2 focus:ring-[#5146A5]/10 transition"
                                    autoFocus
                                />
                                <p className="text-[11px] text-[#706E78] italic pt-1">
                                    * Nếu để trống, hệ thống sẽ sử dụng danh xưng mặc định "Người khám phá".
                                </p>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: MỤC TIÊU KHÁM PHÁ */}
                    {step === 3 && (
                        <div className="space-y-5 animate-fadeIn">
                            <div className="space-y-1">
                                <p className="text-xs text-[#706E78]">
                                    Chọn các khía cạnh bạn quan tâm nhất để hệ thống ưu tiên hiển thị gợi ý phù hợp:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {DISCOVERY_OPTIONS.map((opt) => {
                                    const isSelected = selectedFocus.includes(opt.id);
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => toggleFocus(opt.id)}
                                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                                isSelected
                                                    ? 'bg-[#F1EFFA] border-[#5146A5] text-[#1C1B22] shadow-subtle'
                                                    : 'bg-white border-[#E7E4DD] text-[#706E78] hover:border-[#D3CEEE]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#1C1B22]">
                                                    {opt.label}
                                                </span>
                                                {isSelected && <Check className="w-3.5 h-3.5 text-[#5146A5]" />}
                                            </div>
                                            <p className="text-[11px] text-[#706E78] mt-1 leading-relaxed">
                                                {opt.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* STEP 4: XÁC NHẬN TẠO BẢN ĐỒ */}
                    {step === 4 && (
                        <div className="space-y-5 animate-fadeIn">
                            <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] space-y-2">
                                <div className="text-xs font-semibold text-[#1C1B22] flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-[#C59B45]" />
                                    <span>Tóm tắt thông tin khởi tạo</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                                    <div>
                                        <span className="text-[#706E78] block text-[11px]">Họ và tên:</span>
                                        <strong className="text-[#1C1B22]">{fullName || 'Người khám phá'}</strong>
                                    </div>
                                    <div>
                                        <span className="text-[#706E78] block text-[11px]">Ngày sinh:</span>
                                        <strong className="text-[#1C1B22]">{dob} ({calendarType === 'LUNAR' ? 'Âm lịch' : 'Dương lịch'})</strong>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-[#706E78] leading-relaxed">
                                Khi nhấp "Tạo bản đồ", hệ thống Pythagoras Core sẽ tự động phân tích và giải mã đầy đủ 4 con số trụ cột cùng kim tự tháp vận trình.
                            </p>
                        </div>
                    )}

                    {/* Navigation Controls (Quay lại, Bỏ qua, Tiếp tục / Tạo bản đồ) */}
                    <div className="pt-4 border-t border-[#E7E4DD] flex items-center justify-between">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#706E78] hover:text-[#1C1B22] transition cursor-pointer"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Quay lại</span>
                            </button>
                        ) : (
                            <div />
                        )}

                        <div className="flex items-center gap-2">
                            {step === 3 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    className="px-3 py-2 text-xs font-medium text-[#706E78] hover:text-[#1C1B22] transition cursor-pointer"
                                >
                                    Bỏ qua
                                </button>
                            )}

                            {step < 4 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(step + 1)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5146A5] hover:bg-[#443A8C] text-white text-xs font-semibold transition shadow-subtle hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <span>Tiếp tục</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleCreateMap}
                                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#5146A5] hover:bg-[#443A8C] text-white text-xs font-semibold transition shadow-subtle hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-[#EFE2C2]" />
                                    <span>Tạo bản đồ của tôi</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default OnboardingModal;
