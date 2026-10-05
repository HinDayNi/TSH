'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    Calendar,
    Clock,
    Sun,
    Moon,
    Sparkles,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    Compass,
    Loader2
} from 'lucide-react';
import {
    calculateLifePath,
    calculateBirthChart,
    calculateNameNumbers,
    getLifePathMetadata,
    LifePathResult,
    BirthChartResult,
    NameAnalysisResult
} from '@/lib/numerology/calculator';
import { convertLunarToSolar } from '@/lib/numerology/lunar';
import { AnalyticsEvents } from '@/lib/monitoring/analytics';

// ----------------------------------------------------------------------
// Types & Helper Utilities
// ----------------------------------------------------------------------

export interface NumerologyFormSubmitData {
    fullName: string;
    lastName: string;
    middleName: string;
    firstName: string;
    birthDate: string; // Dương lịch YYYY-MM-DD
    originalBirthDate: string; // Ngày người dùng nhập
    calendarType: 'SOLAR' | 'LUNAR';
    isLunar: boolean;
    birthTime?: string;
    solarBirthDate?: string;
    lifePathNumber: number;
    homeName?: string;
    gender?: string;
}

export interface NumerologyFormProps {
    onSubmit?: (data: NumerologyFormSubmitData) => void;
    onCalculate?: (childInputs: any, parentInputs?: any) => void;
    compact?: boolean;
    initialData?: {
        fullName?: string;
        birthDate?: string;
        calendarType?: 'SOLAR' | 'LUNAR';
        birthTime?: string;
    };
}

/**
 * Tự động chuẩn hóa họ tên:
 * - Xóa khoảng trắng thừa ở đầu/cuối và giữa các từ
 * - Viết hoa chữ cái đầu tiên của từng từ
 */
export function normalizeFullName(name: string): string {
    if (!name) return '';
    return name
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((word) =>
            word.length > 0
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                : ''
        )
        .join(' ');
}

/**
 * Tách họ tên thành [Họ, Tên đệm, Tên chính]
 */
export function splitVietnameseName(fullName: string): {
    lastName: string;
    middleName: string;
    firstName: string;
} {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return { lastName: '', middleName: '', firstName: '' };
    }
    if (parts.length === 1) {
        return { lastName: parts[0], middleName: '', firstName: parts[0] };
    }
    const lastName = parts[0];
    const firstName = parts[parts.length - 1];
    const middleName = parts.slice(1, -1).join(' ');
    return { lastName, middleName, firstName };
}

/**
 * Xác thực tính hợp lệ của ngày tháng năm:
 * - Kiểm tra đúng định dạng YYYY-MM-DD
 * - Kiểm tra ngày trong tháng (ví dụ 31/02, năm nhuận...)
 * - Không cho phép năm sinh trong tương lai hoặc trước 1900
 */
export function validateBirthDate(dateStr: string): {
    isValid: boolean;
    error?: string;
    year?: number;
    month?: number;
    day?: number;
} {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return { isValid: false, error: 'Vui lòng chọn ngày sinh hợp lệ' };
    }

    const [yStr, mStr, dStr] = dateStr.split('-');
    const year = parseInt(yStr, 10);
    const month = parseInt(mStr, 10);
    const day = parseInt(dStr, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return { isValid: false, error: 'Ngày tháng năm không đúng quy cách' };
    }

    if (year < 1900) {
        return { isValid: false, error: 'Năm sinh phải từ năm 1900 trở lại đây' };
    }

    if (month < 1 || month > 12) {
        return { isValid: false, error: 'Tháng sinh phải từ 1 đến 12' };
    }

    // Số ngày tối đa của tháng tương ứng
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return {
            isValid: false,
            error: `Tháng ${month}/${year} chỉ có tối đa ${daysInMonth} ngày`
        };
    }

    const inputDate = new Date(year, month - 1, day);
    const now = new Date();
    // Đặt giờ về 23:59:59 để cho phép sinh trong ngày hôm nay
    now.setHours(23, 59, 59, 999);

    if (inputDate > now) {
        return {
            isValid: false,
            error: 'Ngày sinh không thể ở tương lai'
        };
    }

    return { isValid: true, year, month, day };
}

// ----------------------------------------------------------------------
// Component NumerologyForm
// ----------------------------------------------------------------------

export default function NumerologyForm({
    onSubmit: customOnSubmit,
    onCalculate,
    compact = false,
    initialData
}: NumerologyFormProps = {}) {
    const router = useRouter();

    // 1. Form States
    const [fullName, setFullName] = useState(initialData?.fullName || 'Nguyễn Văn Huy');
    const [birthDate, setBirthDate] = useState(initialData?.birthDate || '1990-11-22');
    const [calendarType, setCalendarType] = useState<'SOLAR' | 'LUNAR'>(
        initialData?.calendarType || 'SOLAR'
    );
    const [birthTime, setBirthTime] = useState(initialData?.birthTime || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Validation & Touch States
    const [touched, setTouched] = useState({
        fullName: false,
        birthDate: false
    });

    // Tự động chuẩn hóa họ tên khi rời khỏi ô nhập (onBlur)
    const handleNameBlur = () => {
        setTouched((prev) => ({ ...prev, fullName: true }));
        setFullName((prev) => normalizeFullName(prev));
    };

    // Kiểm tra lỗi họ tên
    const nameError = useMemo(() => {
        if (!touched.fullName && !fullName) return undefined;
        const trimmed = fullName.trim();
        if (trimmed.length === 0) return 'Vui lòng nhập họ và tên';
        if (trimmed.length < 2) return 'Họ và tên phải có ít nhất 2 ký tự';
        if (!/^[a-zA-ZàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđĐ\s]+$/.test(trimmed)) {
            return 'Họ tên chỉ được chứa chữ cái tiếng Việt hoặc La-tinh';
        }
        return undefined;
    }, [fullName, touched.fullName]);

    // Kiểm tra lỗi ngày sinh
    const dateValidation = useMemo(() => {
        return validateBirthDate(birthDate);
    }, [birthDate]);

    const dateError = useMemo(() => {
        if (!touched.birthDate && !birthDate) return undefined;
        return dateValidation.isValid ? undefined : dateValidation.error;
    }, [dateValidation, touched.birthDate, birthDate]);

    // 3. Quy đổi Âm Lịch sang Dương Lịch nếu người dùng chọn Âm lịch
    const solarConversion = useMemo(() => {
        if (calendarType !== 'LUNAR') return null;
        if (!dateValidation.isValid || !dateValidation.year || !dateValidation.month || !dateValidation.day) {
            return null;
        }

        try {
            const solar = convertLunarToSolar(
                dateValidation.day,
                dateValidation.month,
                dateValidation.year
            );
            return {
                solarFormatted: solar.formatted,
                displayLunar: `${dateValidation.day.toString().padStart(2, '0')}/${dateValidation.month.toString().padStart(2, '0')}/${dateValidation.year}`,
                displaySolar: `${solar.day.toString().padStart(2, '0')}/${solar.month.toString().padStart(2, '0')}/${solar.year}`
            };
        } catch (err) {
            return null;
        }
    }, [calendarType, dateValidation]);

    // Ngày dương lịch hiệu lực dùng để tính ma trận thần số
    const effectiveSolarDateStr = useMemo(() => {
        if (!dateValidation.isValid) return null;
        if (calendarType === 'LUNAR') {
            return solarConversion ? solarConversion.solarFormatted : null;
        }
        return birthDate;
    }, [calendarType, dateValidation, solarConversion, birthDate]);

    // 4. Tương tác thời gian thực: Tính nhẩm Số Chủ Đạo & Biểu đồ Pythagoras
    const realtimeStats = useMemo<{
        lifePath: LifePathResult | null;
        nameAnalysis: NameAnalysisResult | null;
        chart: BirthChartResult | null;
        metadata: { title: string; desc: string } | null;
    }>(() => {
        if (!effectiveSolarDateStr) {
            return { lifePath: null, nameAnalysis: null, chart: null, metadata: null };
        }

        try {
            const lifePath = calculateLifePath(effectiveSolarDateStr);
            const chart = calculateBirthChart(effectiveSolarDateStr);
            const nameAnalysis =
                fullName.trim().length >= 2 ? calculateNameNumbers(fullName.trim()) : null;
            const metadata = getLifePathMetadata(lifePath.lifePath);

            return { lifePath, nameAnalysis, chart, metadata };
        } catch (e) {
            return { lifePath: null, nameAnalysis: null, chart: null, metadata: null };
        }
    }, [effectiveSolarDateStr, fullName]);

    const isFormValid =
        !nameError &&
        dateValidation.isValid &&
        fullName.trim().length >= 2 &&
        !!effectiveSolarDateStr;

    // 5. Xử lý gửi Form (Submit)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ fullName: true, birthDate: true });

        const cleanName = normalizeFullName(fullName);
        setFullName(cleanName);

        if (!dateValidation.isValid || !effectiveSolarDateStr) {
            return;
        }

        setIsSubmitting(true);

        const { lastName, middleName, firstName } = splitVietnameseName(cleanName);
        const lifePathNum = realtimeStats.lifePath?.lifePath || 0;

        const payload: NumerologyFormSubmitData = {
            fullName: cleanName,
            lastName,
            middleName,
            firstName,
            birthDate: effectiveSolarDateStr,
            originalBirthDate: birthDate,
            calendarType,
            isLunar: calendarType === 'LUNAR',
            birthTime: birthTime || undefined,
            solarBirthDate: solarConversion?.solarFormatted,
            lifePathNumber: lifePathNum,
            gender: 'Nam'
        };

        // Ghi nhận telemetry tracking
        try {
            AnalyticsEvents.formSubmitted(
                cleanName,
                lifePathNum,
                calendarType === 'LUNAR'
            );
        } catch (err) {
            // Ignore analytics error
        }

        // Ưu tiên callback onSubmit từ props
        if (customOnSubmit) {
            customOnSubmit(payload);
            setIsSubmitting(false);
            return;
        }

        // Hỗ trợ callback onCalculate nếu component được dùng trong sidebar dashboard
        if (onCalculate) {
            onCalculate({
                lastName,
                middleName,
                firstName,
                dob: effectiveSolarDateStr,
                gender: 'Nam',
                homeName: ''
            });
            setIsSubmitting(false);
            return;
        }

        // Điều hướng mặc định sang trang /report
        const params = new URLSearchParams({
            name: cleanName,
            dob: effectiveSolarDateStr,
            lunar: calendarType === 'LUNAR' ? 'true' : 'false'
        });

        if (birthTime) {
            params.set('time', birthTime);
        }
        if (calendarType === 'LUNAR' && solarConversion) {
            params.set('lunarDob', solarConversion.displayLunar);
        }

        router.push(`/report?${params.toString()}`);
    };

    // Bố cục Pythagoras 3x3
    const gridLayout = [
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7]
    ];

    return (
        <div className={`w-full ${compact ? 'max-w-2xl' : 'max-w-5xl'} mx-auto`}>
            <div className="bg-[#FAF8F4] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-[#E8E5DF] overflow-hidden transition-all duration-200">
                {/* Header Card: Parchment Editorial */}
                <div className="bg-[#FAF8F4] border-b border-[#E8E5DF] px-6 py-5 sm:px-8 text-[#2C2A29]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3.5">
                            <div className="w-10 h-10 rounded-md bg-[#F0ECE1] border border-[#E8E5DF] flex items-center justify-center text-[#C86446]">
                                <Compass strokeWidth={1.5} className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C2A29]">
                                    Tra Cứu Bản Đồ Thần Số Học
                                </h2>
                                <p className="text-[#7C7872] text-xs sm:text-sm mt-0.5">
                                    Quy chuẩn năng lượng ngày sinh & họ tên theo trường phái Pythagoras
                                </p>
                            </div>
                        </div>

                        {!compact && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#EFECE6] text-[#7C7872] border border-[#E8E5DF]">
                                <Sparkles strokeWidth={1.5} className="w-3.5 h-3.5 text-[#C86446]" />
                                <span>Ấn bản 2.0</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Form & Live Preview Grid */}
                <div className={`grid grid-cols-1 ${compact ? '' : 'lg:grid-cols-12'} gap-8 p-6 sm:p-8 bg-white`}>
                    {/* Left / Main Column: Inputs */}
                    <div className={`${compact ? '' : 'lg:col-span-7'} space-y-5`}>
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {/* Input 1: Họ và Tên */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-xs sm:text-sm font-medium text-[#2C2A29] mb-1.5"
                                >
                                    Họ và tên khai sinh <span className="text-[#C86446]">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7872]">
                                        <User strokeWidth={1.5} className="w-4 h-4" />
                                    </div>
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        onBlur={handleNameBlur}
                                        placeholder="Ví dụ: Nguyễn Văn Huy"
                                        className={`w-full pl-10 pr-4 py-2 rounded-md border text-sm text-[#2C2A29] placeholder-[#7C7872]/60 bg-white focus:outline-none focus:border-[#C86446] focus:ring-1 focus:ring-[#C86446]/20 transition-all ${
                                            nameError
                                                ? 'border-[#C86446] bg-[#F8ECE8]/30'
                                                : 'border-[#E8E5DF]'
                                        }`}
                                    />
                                    {fullName.trim().length >= 2 && !nameError && (
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#C86446]">
                                            <CheckCircle2 strokeWidth={1.5} className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                {nameError ? (
                                    <p className="mt-1.5 text-xs text-[#C86446] flex items-center gap-1">
                                        <AlertCircle strokeWidth={1.5} className="w-3.5 h-3.5 shrink-0" />
                                        <span>{nameError}</span>
                                    </p>
                                ) : (
                                    <p className="mt-1 text-[11px] text-[#7C7872]">
                                        Tự động chuẩn hóa chữ cái đầu và loại bỏ khoảng trắng thừa
                                    </p>
                                )}
                            </div>

                            {/* Input 2: Lựa chọn Lịch (Segmented Control Parchment) */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#2C2A29] mb-1.5">
                                    Hệ thống lịch ngày sinh <span className="text-[#C86446]">*</span>
                                </label>
                                <div className="grid grid-cols-2 p-1 bg-[#EFECE6] rounded-md border border-[#E8E5DF]">
                                    <button
                                        type="button"
                                        onClick={() => setCalendarType('SOLAR')}
                                        className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs sm:text-sm font-medium transition-all ${
                                            calendarType === 'SOLAR'
                                                ? 'bg-white text-[#2C2A29] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                                                : 'text-[#7C7872] hover:text-[#2C2A29]'
                                        }`}
                                    >
                                        <Sun strokeWidth={1.5} className={`w-3.5 h-3.5 ${calendarType === 'SOLAR' ? 'text-[#C86446]' : 'text-[#7C7872]'}`} />
                                        <span>Dương Lịch (Mặc định)</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCalendarType('LUNAR')}
                                        className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded text-xs sm:text-sm font-medium transition-all ${
                                            calendarType === 'LUNAR'
                                                ? 'bg-white text-[#2C2A29] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                                                : 'text-[#7C7872] hover:text-[#2C2A29]'
                                        }`}
                                    >
                                        <Moon strokeWidth={1.5} className={`w-3.5 h-3.5 ${calendarType === 'LUNAR' ? 'text-[#C86446]' : 'text-[#7C7872]'}`} />
                                        <span>Âm Lịch Việt Nam</span>
                                    </button>
                                </div>
                            </div>

                            {/* Input 3: Ngày tháng năm sinh */}
                            <div>
                                <label
                                    htmlFor="birthDate"
                                    className="block text-xs sm:text-sm font-medium text-[#2C2A29] mb-1.5"
                                >
                                    {calendarType === 'LUNAR' ? 'Ngày sinh Âm lịch' : 'Ngày sinh Dương lịch'}{' '}
                                    <span className="text-[#C86446]">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7872]">
                                        <Calendar strokeWidth={1.5} className="w-4 h-4" />
                                    </div>
                                    <input
                                        id="birthDate"
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => {
                                            setBirthDate(e.target.value);
                                            setTouched((prev) => ({ ...prev, birthDate: true }));
                                        }}
                                        className={`w-full pl-10 pr-4 py-2 rounded-md border text-sm text-[#2C2A29] bg-white focus:outline-none focus:border-[#C86446] focus:ring-1 focus:ring-[#C86446]/20 transition-all ${
                                            dateError
                                                ? 'border-[#C86446] bg-[#F8ECE8]/30'
                                                : 'border-[#E8E5DF]'
                                        }`}
                                    />
                                    {dateValidation.isValid && !dateError && (
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#C86446]">
                                            <CheckCircle2 strokeWidth={1.5} className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                {dateError && (
                                    <p className="mt-1.5 text-xs text-[#C86446] flex items-center gap-1">
                                        <AlertCircle strokeWidth={1.5} className="w-3.5 h-3.5 shrink-0" />
                                        <span>{dateError}</span>
                                    </p>
                                )}

                                {/* Realtime lunar-to-solar banner */}
                                {calendarType === 'LUNAR' && solarConversion && (
                                    <div className="mt-2.5 p-3 rounded-md bg-[#FAF8F4] border-l-2 border-[#C86446] text-xs text-[#2C2A29] space-y-1">
                                        <div className="font-medium text-[#2C2A29]">
                                            Đã quy đổi sang Dương lịch tương ứng:
                                        </div>
                                        <div className="text-[#7C7872]">
                                            Ngày âm: <strong>{solarConversion.displayLunar}</strong> ➔ Ngày dương:{' '}
                                            <strong className="text-[#2C2A29] bg-white px-1.5 py-0.5 rounded border border-[#E8E5DF]">
                                                {solarConversion.displaySolar}
                                            </strong>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input 4: Giờ sinh (Tùy chọn) */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label
                                        htmlFor="birthTime"
                                        className="text-xs sm:text-sm font-medium text-[#2C2A29] flex items-center gap-1.5"
                                    >
                                        <span>Giờ sinh</span>
                                        <span className="text-[10px] text-[#7C7872] bg-[#EFECE6] px-1.5 py-0.2 rounded">
                                            Tùy chọn
                                        </span>
                                    </label>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7872]">
                                        <Clock strokeWidth={1.5} className="w-4 h-4" />
                                    </div>
                                    <input
                                        id="birthTime"
                                        type="time"
                                        value={birthTime}
                                        onChange={(e) => setBirthTime(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-md border border-[#E8E5DF] bg-white text-sm text-[#2C2A29] focus:outline-none focus:border-[#C86446] focus:ring-1 focus:ring-[#C86446]/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Primary CTA Button: Claude Terracotta #C86446 */}
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className={`w-full py-2.5 px-6 rounded-md font-medium text-sm sm:text-base text-white flex items-center justify-center space-x-2 transition-colors duration-150 ${
                                    !isFormValid || isSubmitting
                                        ? 'bg-[#E8E5DF] text-[#7C7872] cursor-not-allowed'
                                        : 'bg-[#C86446] hover:bg-[#B2553B] text-white cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 strokeWidth={1.5} className="w-4 h-4 animate-spin" />
                                        <span>Đang khảo cứu dữ liệu...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Khám Phá Bản Đồ Thần Số</span>
                                        <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Instant Feedback & Interactive Live Stats */}
                    <div className={`${compact ? '' : 'lg:col-span-5'} flex flex-col justify-between space-y-5 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E8E5DF] lg:pl-8`}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#7C7872]">
                                    Phản Hồi Trực Tiếp
                                </h3>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF8F4] text-[#7C7872] border border-[#E8E5DF]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86446]"></span>
                                    Thời gian thực
                                </span>
                            </div>

                            {/* Instant Feedback: Life Path Badge */}
                            {realtimeStats.lifePath ? (
                                <div className="rounded-md bg-[#FAF8F4] p-4 border border-[#E8E5DF] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="relative shrink-0">
                                            <div className="w-12 h-12 rounded-md bg-[#F0ECE1] text-[#C86446] flex items-center justify-center font-serif font-bold text-2xl border border-[#E8E5DF]">
                                                {realtimeStats.lifePath.lifePath}
                                            </div>
                                            {realtimeStats.lifePath.isMaster && (
                                                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold bg-[#C86446] text-white px-1 rounded">
                                                    M
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-0.5 min-w-0">
                                            <div className="flex items-center gap-1 text-[11px] font-medium uppercase text-[#7C7872] tracking-wide">
                                                <Sparkles strokeWidth={1.5} className="w-3 h-3 text-[#C86446]" />
                                                <span>Số Chủ Đạo</span>
                                            </div>
                                            <h4 className="font-serif text-base font-bold text-[#2C2A29] leading-tight truncate">
                                                Số {realtimeStats.lifePath.lifePath}: {realtimeStats.metadata?.title || 'Bản Thể'}
                                            </h4>
                                            <p className="text-xs text-[#7C7872] line-clamp-2 leading-relaxed">
                                                {realtimeStats.metadata?.desc || 'Đại diện cho sứ mệnh và hành trình tiến hóa cốt lõi của cuộc đời.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-5 rounded-md bg-[#FAF8F4] border border-dashed border-[#E8E5DF] text-center space-y-1.5">
                                    <div className="w-8 h-8 mx-auto rounded-md bg-[#EFECE6] flex items-center justify-center text-[#7C7872]">
                                        <Calendar strokeWidth={1.5} className="w-4 h-4" />
                                    </div>
                                    <div className="text-xs font-medium text-[#2C2A29]">
                                        Chưa có ngày sinh
                                    </div>
                                    <p className="text-[11px] text-[#7C7872] max-w-xs mx-auto">
                                        Nhập ngày sinh để hệ thống hiển thị ngay Con Số Chủ Đạo
                                    </p>
                                </div>
                            )}

                            {/* 3 Core Stats Cards */}
                            <div className="grid grid-cols-3 gap-2">
                                {/* Đường Đời */}
                                <div className="bg-[#FAF8F4] border border-[#E8E5DF] rounded-md p-2.5 text-center">
                                    <span className="block text-[10px] uppercase text-[#7C7872] tracking-wider font-medium">
                                        Đường Đời
                                    </span>
                                    <span className="font-serif text-lg font-bold text-[#2C2A29] my-0.5 block">
                                        {realtimeStats.lifePath ? realtimeStats.lifePath.lifePath : '—'}
                                    </span>
                                    <span className="text-[10px] text-[#7C7872]">
                                        Chủ Đạo
                                    </span>
                                </div>

                                {/* Sứ Mệnh */}
                                <div className="bg-[#FAF8F4] border border-[#E8E5DF] rounded-md p-2.5 text-center">
                                    <span className="block text-[10px] uppercase text-[#7C7872] tracking-wider font-medium">
                                        Sứ Mệnh
                                    </span>
                                    <span className="font-serif text-lg font-bold text-[#2C2A29] my-0.5 block">
                                        {realtimeStats.nameAnalysis ? realtimeStats.nameAnalysis.expressionNumber : '—'}
                                    </span>
                                    <span className="text-[10px] text-[#7C7872]">
                                        Biểu Đạt
                                    </span>
                                </div>

                                {/* Linh Hồn */}
                                <div className="bg-[#FAF8F4] border border-[#E8E5DF] rounded-md p-2.5 text-center">
                                    <span className="block text-[10px] uppercase text-[#7C7872] tracking-wider font-medium">
                                        Linh Hồn
                                    </span>
                                    <span className="font-serif text-lg font-bold text-[#2C2A29] my-0.5 block">
                                        {realtimeStats.nameAnalysis ? realtimeStats.nameAnalysis.soulUrgeNumber : '—'}
                                    </span>
                                    <span className="text-[10px] text-[#7C7872]">
                                        Khát Khao
                                    </span>
                                </div>
                            </div>

                            {/* 3x3 Pythagoras Matrix Grid */}
                            <div className="bg-[#FAF8F4] rounded-md p-3.5 border border-[#E8E5DF]">
                                <div className="flex items-center justify-between mb-2 text-xs text-[#7C7872]">
                                    <span className="font-medium text-[#2C2A29]">Ma trận Pythagoras</span>
                                    <span>
                                        {realtimeStats.chart
                                            ? `Tổng: ${Object.values(realtimeStats.chart.digitCounts).reduce((a, b) => a + b, 0)} số`
                                            : 'Chờ dữ liệu'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-1.5 max-w-[190px] mx-auto">
                                    {gridLayout.map((row) =>
                                        row.map((num) => {
                                            const count = realtimeStats.chart?.digitCounts[num] || 0;
                                            const hasNum = count > 0;
                                            return (
                                                <div
                                                    key={num}
                                                    className={`aspect-square rounded flex flex-col items-center justify-center transition-all ${
                                                        hasNum
                                                            ? 'bg-[#F0ECE1] border border-[#E8E5DF] text-[#C86446] font-serif font-bold'
                                                            : 'bg-white border border-dashed border-[#E8E5DF] text-[#D8D4CC]'
                                                    }`}
                                                >
                                                    <span className={`text-sm ${hasNum ? 'text-[#C86446]' : 'text-[#D8D4CC]'}`}>
                                                        {hasNum ? num.toString().repeat(count) : num}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer trust badge */}
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7C7872]">
                            <CheckCircle2 strokeWidth={1.5} className="w-3.5 h-3.5 text-[#C86446]" />
                            <span>Bảo mật dữ liệu • Quy chuẩn theo cổ thư Pythagoras</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
