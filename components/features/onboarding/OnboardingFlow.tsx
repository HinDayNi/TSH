'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/lib/context/ProfileContext';
import { Button, Card, Badge, ProgressIndicator } from '@/components/ui';
import { ArrowLeft, ArrowRight, Sparkles, Check, Compass } from 'lucide-react';
import { convertLunarToSolar } from '@/lib/numerology/lunar';

const DISCOVERY_OPTIONS = [
    { id: 'personality', label: 'Tính cách & Bản ngã', icon: 'fa-fingerprint' },
    { id: 'strengths', label: 'Điểm mạnh & Tiềm năng', icon: 'fa-gem' },
    { id: 'career', label: 'Con đường sự nghiệp', icon: 'fa-compass' },
    { id: 'relationship', label: 'Tình cảm & Gắn kết', icon: 'fa-heart' },
    { id: 'growth', label: 'Định hướng phát triển', icon: 'fa-seedling' }
];

const LOADING_MESSAGES = [
    'Đang khởi tạo bản đồ số học của bạn...',
    'Đang tính toán các chỉ số cốt lõi (Đường đời, Sứ mệnh, Linh hồn)...',
    'Đang chuẩn bị cấu trúc luận giải cá nhân hóa...',
    'Bản đồ của bạn đã sẵn sàng!'
];

export function OnboardingFlow({
    onComplete
}: {
    onComplete?: () => void;
}) {
    const router = useRouter();
    const { completeOnboarding, profile } = useProfile();

    const [step, setStep] = useState<number>(1);
    const [fullName, setFullName] = useState<string>(profile.fullName || '');
    const [dob, setDob] = useState<string>(profile.dob || '1995-08-15');
    const [calendarType, setCalendarType] = useState<'SOLAR' | 'LUNAR'>(profile.calendarType || 'SOLAR');
    const [gender, setGender] = useState<'Nam' | 'Nữ' | string>(profile.gender || 'Nam');
    const [selectedFocus, setSelectedFocus] = useState<string[]>(['personality', 'career']);
    const [startingPoint, setStartingPoint] = useState<'lifepath' | 'map'>('lifepath');

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

        // Sequence through the 4 loading stages
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
                                    effectiveDob = convertLunarToSolar(d, m, y).formatted;
                                }
                            } catch (e) {
                                effectiveDob = dob;
                            }
                        }

                        completeOnboarding(
                            {
                                fullName: fullName.trim() || 'Người khám phá',
                                dob: effectiveDob,
                                calendarType,
                                gender
                            },
                            selectedFocus
                        );

                        if (onComplete) {
                            onComplete();
                        } else {
                            router.push('/dashboard');
                        }
                    }, 500);
                    return prev;
                }
                return prev + 1;
            });
        }, 700);
    };

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-[#E8E5DF] border-t-[#C86446] animate-spin" />
                    <Compass className="w-7 h-7 text-[#C86446]" />
                </div>

                <div className="space-y-2 max-w-sm">
                    <h3 className="font-serif font-bold text-xl text-[#2C2A29]">
                        {LOADING_MESSAGES[loadingStage]}
                    </h3>
                    <p className="text-xs text-[#7C7872]">
                        Giai đoạn {loadingStage + 1} / {LOADING_MESSAGES.length}
                    </p>
                </div>

                {/* Subtle calm progress bar */}
                <div className="w-48 h-1 bg-[#E8E5DF] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#C86446] transition-all duration-700 ease-out"
                        style={{ width: `${((loadingStage + 1) / LOADING_MESSAGES.length) * 100}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl mx-auto space-y-6 animate-fadeIn">
            {/* Header: Progress & Back */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DF]">
                <div className="flex items-center gap-3">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                            className="inline-flex items-center gap-1 text-xs text-[#7C7872] hover:text-[#2C2A29] transition cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Quay lại</span>
                        </button>
                    )}
                    <span className="text-xs font-mono text-[#7C7872] uppercase tracking-wider">
                        Khởi tạo bản đồ
                    </span>
                </div>

                <ProgressIndicator current={step} total={3} />
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2A29]">
                            Ngày sinh & Họ tên của bạn là gì?
                        </h2>
                        <p className="text-sm text-[#7C7872]">
                            Hệ thống sẽ dựa trên hai dữ liệu này để tính toán các con số rung động năng lượng theo trường phái Pythagoras.
                        </p>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div>
                            <label className="block text-xs font-medium text-[#2C2A29] mb-1.5">
                                Họ và tên khai sinh:
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ví dụ: Nguyễn Văn An"
                                className="w-full px-4 py-2.5 bg-white border border-[#E8E5DF] focus:border-[#C86446] rounded-md text-sm text-[#2C2A29] outline-none transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[#2C2A29] mb-1.5">
                                    Ngày sinh:
                                </label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-[#E8E5DF] focus:border-[#C86446] rounded-md text-sm text-[#2C2A29] outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#2C2A29] mb-1.5">
                                    Hệ lịch ngày sinh:
                                </label>
                                <div className="flex p-1 bg-[#FAF8F4] border border-[#E8E5DF] rounded-md">
                                    <button
                                        type="button"
                                        onClick={() => setCalendarType('SOLAR')}
                                        className={`flex-1 py-1.5 text-xs font-medium rounded transition cursor-pointer ${
                                            calendarType === 'SOLAR'
                                                ? 'bg-white text-[#2C2A29] shadow-xs'
                                                : 'text-[#7C7872] hover:text-[#2C2A29]'
                                        }`}
                                    >
                                        Dương lịch
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCalendarType('LUNAR')}
                                        className={`flex-1 py-1.5 text-xs font-medium rounded transition cursor-pointer ${
                                            calendarType === 'LUNAR'
                                                ? 'bg-white text-[#2C2A29] shadow-xs'
                                                : 'text-[#7C7872] hover:text-[#2C2A29]'
                                        }`}
                                    >
                                        Âm lịch
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                        <Button
                            variant="primary"
                            onClick={() => setStep(2)}
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Discovery Focus */}
            {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2A29]">
                            Bạn muốn ưu tiên khám phá điều gì?
                        </h2>
                        <p className="text-sm text-[#7C7872]">
                            Chọn các khía cạnh bạn quan tâm nhất để hệ thống làm nổi bật các luận giải tương ứng.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {DISCOVERY_OPTIONS.map((opt) => {
                            const isSelected = selectedFocus.includes(opt.id);
                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => toggleFocus(opt.id)}
                                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-white border-[#C86446] text-[#2C2A29]'
                                            : 'bg-[#FAF8F4] border-[#E8E5DF] text-[#7C7872] hover:bg-white hover:text-[#2C2A29]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className={`fa-solid ${opt.icon} ${isSelected ? 'text-[#C86446]' : 'text-[#7C7872]'}`}></i>
                                        <span className="text-sm font-medium">{opt.label}</span>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                        isSelected ? 'bg-[#C86446] border-[#C86446] text-white' : 'border-[#E8E5DF]'
                                    }`}>
                                        {isSelected && <Check className="w-3 h-3" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="text-xs text-[#7C7872] hover:text-[#2C2A29] transition cursor-pointer"
                        >
                            Bỏ qua bước này
                        </button>

                        <Button
                            variant="primary"
                            onClick={() => setStep(3)}
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Starting Point & Confirmation */}
            {step === 3 && (
                <div className="space-y-5 animate-fadeIn">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2A29]">
                            Bạn muốn bắt đầu từ đâu?
                        </h2>
                        <p className="text-sm text-[#7C7872]">
                            Lựa chọn góc nhìn khởi đầu để bản đồ sắp xếp thứ tự phân tích phù hợp với bạn.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setStartingPoint('lifepath')}
                            className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                                startingPoint === 'lifepath'
                                    ? 'bg-white border-[#C86446] text-[#2C2A29]'
                                    : 'bg-[#FAF8F4] border-[#E8E5DF] text-[#7C7872] hover:bg-white hover:text-[#2C2A29]'
                            }`}
                        >
                            <div className="w-8 h-8 rounded-lg bg-[#F3EFEA] text-[#C86446] flex items-center justify-center shrink-0 border border-[#E8E5DF] mt-0.5">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-semibold text-[#2C2A29]">
                                    Bắt đầu với Chỉ Số Đường Đời (Khuyên dùng)
                                </div>
                                <p className="text-xs text-[#7C7872] leading-relaxed">
                                    Tìm hiểu con số trụ cột phản ánh bản năng, bài học lớn nhất và hành trình phát triển cả cuộc đời.
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setStartingPoint('map')}
                            className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                                startingPoint === 'map'
                                    ? 'bg-white border-[#C86446] text-[#2C2A29]'
                                    : 'bg-[#FAF8F4] border-[#E8E5DF] text-[#7C7872] hover:bg-white hover:text-[#2C2A29]'
                            }`}
                        >
                            <div className="w-8 h-8 rounded-lg bg-[#F3EFEA] text-[#C86446] flex items-center justify-center shrink-0 border border-[#E8E5DF] mt-0.5">
                                <Compass className="w-4 h-4" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-semibold text-[#2C2A29]">
                                    Bản đồ tổng thể toàn diện
                                </div>
                                <p className="text-xs text-[#7C7872] leading-relaxed">
                                    Xem bức tranh toàn cảnh gồm 4 chỉ số trụ cột, ma trận ngày sinh và chu kỳ năm cá nhân.
                                </p>
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleCreateMap}
                            rightIcon={<Sparkles className="w-4 h-4" />}
                        >
                            Tạo bản đồ của tôi
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
