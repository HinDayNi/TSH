'use client';

import React, { useState, useMemo } from 'react';
import { optimizeNamesForMissingArrows, NameSuggestion } from '@/lib/numerology/retention';
import {
    Wand2,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Compass,
    Check,
    GitCompare,
    ShieldCheck
} from 'lucide-react';

interface NameOptimizerProps {
    defaultDob?: string;
    defaultCurrentName?: string;
    onApplyName?: (name: string) => void;
    onCompareName?: (name: string) => void;
}

export default function NameOptimizer({
    defaultDob = '2026-06-17',
    defaultCurrentName = 'Nguyễn Văn Huy',
    onApplyName,
    onCompareName
}: NameOptimizerProps) {
    const [dob, setDob] = useState(defaultDob);
    const [currentName, setCurrentName] = useState(defaultCurrentName);
    const [category, setCategory] = useState<'BABY' | 'BRAND'>('BABY');
    const [hasAnalyzed, setHasAnalyzed] = useState(true);

    const result = useMemo(() => {
        if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
        try {
            return optimizeNamesForMissingArrows(dob, category);
        } catch {
            return null;
        }
    }, [dob, category]);

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E5E4]">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF] mb-1">
                        <Wand2 className="w-3.5 h-3.5 text-[#D4A72C]" />
                        <span>Công Cụ Tối Ưu Hóa Danh Xưng (Name Optimizer)</span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#17172B] tracking-tight">
                        Đặt Tên & Bù Khuyết Ma Trận Ngày Sinh
                    </h2>
                    <p className="text-sm text-[#68687A] mt-0.5">
                        Quy trình: Tên hiện tại ➔ Phân tích ➔ Kết quả thiếu hụt ➔ Danh sách tên đề xuất chuẩn hóa.
                    </p>
                </div>

                {/* Category toggle */}
                <div className="flex rounded-xl bg-[#FAF9F6] p-1 border border-[#E7E5E4] self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setCategory('BABY')}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${category === 'BABY'
                                ? 'bg-white text-[#4F46E5] shadow-xs'
                                : 'text-[#68687A] hover:text-[#17172B]'
                            }`}
                    >
                        Đặt Tên Con
                    </button>
                    <button
                        type="button"
                        onClick={() => setCategory('BRAND')}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${category === 'BRAND'
                                ? 'bg-white text-[#4F46E5] shadow-xs'
                                : 'text-[#68687A] hover:text-[#17172B]'
                            }`}
                    >
                        Tên Thương Hiệu
                    </button>
                </div>
            </div>

            {/* BƯỚC 1 & 2: TOOL-LIKE INPUT & ANALYZE ACTION */}
            <div className="bg-[#FAF9F6] rounded-2xl p-5 sm:p-6 border border-[#E7E5E4] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                    <div className="sm:col-span-6">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#68687A] block mb-1.5">
                            1. Họ và tên hiện tại (hoặc họ của bé)
                        </label>
                        <input
                            type="text"
                            value={currentName}
                            onChange={(e) => setCurrentName(e.target.value)}
                            placeholder="Ví dụ: Nguyễn Minh..."
                            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                        />
                    </div>

                    <div className="sm:col-span-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#68687A] block mb-1.5">
                            2. Ngày sinh dương lịch
                        </label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="button"
                            onClick={() => setHasAnalyzed(true)}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 text-[#F4E7B2]" />
                            <span>Phân Tích</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* BƯỚC 3: RESULTS (Kết quả phân tích khoảng trống & gợi ý) */}
            {result && hasAnalyzed && (
                <div data-tour="naming-results" className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#68687A]">
                                3. Kết Quả Khảo Sát Khoảng Trống Ngày Sinh
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Missing Numbers */}
                            <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-[#17172B] flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-[#B7791F]" />
                                    <span>Các con số còn thiếu trong ngày sinh ({result.missingNumbers.length} số):</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingNumbers.map((num) => (
                                        <span
                                            key={num}
                                            className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#17172B] font-serif font-bold flex items-center justify-center text-sm"
                                        >
                                            {num}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-[11px] text-[#68687A] leading-relaxed">
                                    Những con số này đại diện cho kỹ năng cần bổ sung thông qua các chữ cái trong tên gọi.
                                </p>
                            </div>

                            {/* Empty Arrows */}
                            <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-[#17172B] flex items-center gap-2">
                                    <Compass className="w-4 h-4 text-[#4F46E5]" />
                                    <span>Mũi tên trống cần được cân bằng:</span>
                                </div>
                                {result.emptyArrows.length > 0 ? (
                                    <div className="space-y-1.5">
                                        {result.emptyArrows.map((arrow, i) => (
                                            <div key={i} className="text-xs text-[#17172B] bg-[#FAF9F6] px-3 py-1.5 rounded-lg border border-[#E7E5E4] flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F]" />
                                                <span>{arrow}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-[#4F7C68] font-medium bg-[#FAF9F6] p-3 rounded-lg border border-[#E7E5E4]">
                                        Biểu đồ ngày sinh không có mũi tên trống lớn, năng lượng phân bổ đều đặn.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BƯỚC 4: RECOMMENDED NAMES (Danh sách tên đề xuất) */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif text-lg font-bold text-[#17172B] flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#4F7C68]" />
                                4. Danh Sách Tên Đề Xuất Bù Khuyết Tối Ưu
                            </h3>
                            <span className="text-xs text-[#68687A]">
                                {result.suggestions.length} phương án khả thi
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5">
                            {result.suggestions.map((sug, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#4F46E5]/40 transition-all shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                                >
                                    {/* Left: Name and Meaning */}
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h4 className="font-serif text-xl font-bold text-[#17172B]">
                                                {sug.suggestedName}
                                            </h4>
                                            <span className="text-[10px] uppercase font-bold text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-full border border-[#E0E7FF]">
                                                {sug.category === 'BABY' ? 'Danh xưng hài hòa' : 'Thương hiệu'}
                                            </span>
                                        </div>

                                        <p className="text-xs sm:text-sm text-[#68687A] leading-relaxed max-w-2xl">
                                            {sug.meaning}
                                        </p>

                                        {/* Added numbers tag */}
                                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#68687A]">
                                            <span>Bổ sung số học:</span>
                                            <div className="flex gap-1">
                                                {sug.pythagoreanNumbersAdded.map((n) => (
                                                    <span
                                                        key={n}
                                                        className="w-5 h-5 rounded-md bg-[#F5F3FF] text-[#4F46E5] font-bold flex items-center justify-center text-[10px] border border-[#E0E7FF]"
                                                    >
                                                        {n}
                                                    </span>
                                                ))}
                                            </div>
                                            {sug.filledArrows.length > 0 && (
                                                <span className="text-[#4F7C68] font-medium ml-2">
                                                    ✓ Lấp đầy: {sug.filledArrows.join(', ')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Score & Actions */}
                                    <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto border-t md:border-t-0 border-[#E7E5E4] pt-3 md:pt-0 shrink-0">
                                        {/* Score */}
                                        <div className="px-4 py-2 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] text-center min-w-[90px]">
                                            <span className="text-[10px] font-bold text-[#68687A] uppercase block">
                                                Độ Cân Bằng
                                            </span>
                                            <span className="font-serif font-black text-lg text-[#4F46E5]">
                                                {sug.balanceScoreAfter}<span className="text-xs font-normal text-[#68687A]">/100</span>
                                            </span>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex items-center gap-2">
                                            {onCompareName && (
                                                <button
                                                    type="button"
                                                    onClick={() => onCompareName(sug.suggestedName)}
                                                    className="p-2.5 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#FAF9F6] text-[#68687A] hover:text-[#17172B] transition-colors cursor-pointer"
                                                    title="Thêm vào danh sách đối chiếu so sánh"
                                                >
                                                    <GitCompare className="w-4 h-4" />
                                                </button>
                                            )}

                                            {onApplyName && (
                                                <button
                                                    type="button"
                                                    onClick={() => onApplyName(sug.suggestedName)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                    <span>Áp Dụng Tên Này</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
