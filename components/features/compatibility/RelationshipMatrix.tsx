'use client';

import React, { useState, useMemo } from 'react';
import { calculateCoupleCompatibility, CoupleCompatibilityResult } from '@/lib/numerology/retention';
import {
    Users,
    HeartHandshake,
    Sparkles,
    AlertCircle,
    ArrowRightLeft,
    CheckCircle2,
    Lightbulb,
    Compass
} from 'lucide-react';

interface RelationshipMatrixProps {
    defaultP1Name?: string;
    defaultP1Dob?: string;
}

export default function RelationshipMatrix({
    defaultP1Name = 'Nguyễn Văn Huy',
    defaultP1Dob = '1990-11-22'
}: RelationshipMatrixProps) {
    const [p1Name, setP1Name] = useState(defaultP1Name);
    const [p1Dob, setP1Dob] = useState(defaultP1Dob);

    const [p2Name, setP2Name] = useState('Trần Thị Thùy');
    const [p2Dob, setP2Dob] = useState('1985-05-29');

    const result: CoupleCompatibilityResult | null = useMemo(() => {
        if (!p1Name || !p1Dob || !p2Name || !p2Dob) return null;
        try {
            return calculateCoupleCompatibility(
                { name: p1Name, dob: p1Dob },
                { name: p2Name, dob: p2Dob }
            );
        } catch {
            return null;
        }
    }, [p1Name, p1Dob, p2Name, p2Dob]);

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E5E4]">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF] mb-2">
                        <HeartHandshake className="w-3.5 h-3.5 text-[#D4A72C]" />
                        <span>Đối Chiếu Năng Lượng & Tương Thích</span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#17172B] tracking-tight">
                        Chỉ Số Hòa Hợp: Người A ↔ Người B
                    </h2>
                    <p className="text-sm text-[#68687A] mt-0.5">
                        Khảo sát mức độ đồng điệu về Tư duy Giao tiếp, Cảm xúc Nội tâm và Mục tiêu Đường đời.
                    </p>
                </div>
            </div>

            {/* Input Cards: Person A & Person B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Person A */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white text-[10px] flex items-center justify-center font-bold">A</span>
                            Người thứ nhất (Chủ thể)
                        </span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-medium text-[#68687A] block mb-1">Họ và tên</label>
                            <input
                                type="text"
                                value={p1Name}
                                onChange={(e) => setP1Name(e.target.value)}
                                placeholder="Nhập họ và tên..."
                                className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-[#68687A] block mb-1">Ngày sinh (Dương lịch)</label>
                            <input
                                type="date"
                                value={p1Dob}
                                onChange={(e) => setP1Dob(e.target.value)}
                                className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Person B */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4A72C] flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#D4A72C] text-white text-[10px] flex items-center justify-center font-bold">B</span>
                            Người thứ hai (Đối tác / Người thương)
                        </span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-medium text-[#68687A] block mb-1">Họ và tên</label>
                            <input
                                type="text"
                                value={p2Name}
                                onChange={(e) => setP2Name(e.target.value)}
                                placeholder="Nhập họ và tên..."
                                className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-[#68687A] block mb-1">Ngày sinh (Dương lịch)</label>
                            <input
                                type="date"
                                value={p2Dob}
                                onChange={(e) => setP2Dob(e.target.value)}
                                className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div data-tour="compare-results" className="space-y-6 pt-2">
                    {/* Overall Compatibility Score Banner */}
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E5E4] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center sm:text-left">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#F5F3FF] text-[#4F46E5] border border-[#E0E7FF]">
                                Điểm Tương Thích Tổng Thể
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17172B]">
                                Mức Độ Hòa Hợp: {result.harmonyLevel}
                            </h3>
                            <p className="text-sm text-[#68687A] max-w-xl leading-relaxed">
                                {result.relationshipLesson}
                            </p>
                        </div>

                        {/* Visual Gauge */}
                        <div className="flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] shrink-0 p-4">
                            <span className="font-serif text-3xl font-black text-[#4F46E5]">
                                {result.overallScore}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#68687A] mt-0.5">
                                / 100 Điểm
                            </span>
                            <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full mt-2.5 overflow-hidden">
                                <div
                                    className="bg-[#4F46E5] h-full rounded-full transition-all duration-700"
                                    style={{ width: `${result.overallScore}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3 Khía Cạnh Cốt Lõi (Giao tiếp, Cảm xúc, Mục tiêu) */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#68687A] mb-3">
                            3 Khía Cạnh Tương Tác Cốt Lõi
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(result.aspects).map(([key, item]) => (
                                <div key={key} className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between text-xs font-semibold text-[#68687A]">
                                            <span className="text-[#17172B]">{item.label}</span>
                                            <span className="font-bold text-[#4F46E5]">{item.score}%</span>
                                        </div>

                                        {/* Number comparison bridge */}
                                        <div className="flex items-center justify-center gap-3 my-3 py-3 bg-[#FAF9F6] rounded-xl border border-[#E7E5E4]">
                                            <div className="w-9 h-9 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center font-serif font-bold text-sm">
                                                {item.num1}
                                            </div>
                                            <ArrowRightLeft className="w-3.5 h-3.5 text-[#68687A]" />
                                            <div className="w-9 h-9 rounded-lg bg-[#D4A72C] text-white flex items-center justify-center font-serif font-bold text-sm">
                                                {item.num2}
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-[#E7E5E4] rounded-full h-1.5 overflow-hidden mb-3">
                                            <div
                                                className="bg-[#4F46E5] h-1.5 rounded-full transition-all duration-500"
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>

                                        <p className="text-xs text-[#68687A] leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Điểm kết nối & Điểm cần lưu ý */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Điểm kết nối tự nhiên */}
                        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-[#4F7C68]">
                                <CheckCircle2 className="w-4 h-4 text-[#4F7C68]" />
                                <span>Điểm Kết Nối & Tương Đồng Tự Nhiên</span>
                            </div>
                            <p className="text-xs text-[#17172B] leading-relaxed">
                                {result.overallScore >= 75
                                    ? "Hai bạn sở hữu tần số năng lượng bổ trợ mạnh mẽ, dễ dàng thấu hiểu động cơ của nhau mà không cần quá nhiều lời giải thích."
                                    : "Cả hai có những khoảng giao thoa thú vị, đặc biệt là khi cùng hợp tác trong những mục tiêu có định hướng rõ ràng từ trước."}
                            </p>
                        </div>

                        {/* Điểm cần lưu ý / Dung hòa */}
                        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-[#B7791F]">
                                <AlertCircle className="w-4 h-4 text-[#B7791F]" />
                                <span>Điểm Cần Lưu Ý & Dung Hòa Góc Nhìn</span>
                            </div>
                            <p className="text-xs text-[#17172B] leading-relaxed">
                                {result.relationshipLesson || "Học cách tôn trọng sự khác biệt trong nhịp độ xử lý vấn đề và không áp đặt kỳ vọng cá nhân lên đối phương."}
                            </p>
                        </div>
                    </div>

                    {/* Actionable Advice */}
                    <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-2.5">
                        <h4 className="font-bold text-[#17172B] text-xs uppercase tracking-wider flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-[#D4A72C]" />
                            Khuyến Nghị Ứng Xử Để Gắn Kết Lâu Dài
                        </h4>
                        <ul className="text-xs text-[#68687A] pl-5 list-disc space-y-1.5 leading-relaxed">
                            {result.actionableAdvice.map((advice, i) => (
                                <li key={i}>{advice}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
