'use client';

import React, { useState, useMemo } from 'react';
import {
    calculateLifePath,
    calculateCyclesPinnacles,
    getPinnacleMeaning,
    getChallengeInfo,
    CyclesPinnaclesResult
} from '@/lib/numerology/calculator';
import {
    Mountain,
    Sparkles,
    Calendar,
    ChevronDown,
    ChevronUp,
    Award,
    ShieldAlert,
    CheckCircle2,
    Clock
} from 'lucide-react';

export interface PyramidTimelineProps {
    birthDate?: string;
    data?: any;
    className?: string;
}

export default function PyramidTimeline({
    birthDate = '1990-11-22',
    data,
    className = ''
}: PyramidTimelineProps) {
    const effectiveDob = data?.dob || birthDate;

    // Parse birth year
    const birthYear = useMemo(() => {
        const parts = effectiveDob.trim().split(/[-/]/);
        if (parts[0].length === 4) return parseInt(parts[0], 10) || 1990;
        return parseInt(parts[2], 10) || 1990;
    }, [effectiveDob]);

    const lifePathNumber = useMemo(() => {
        if (data?.lp) return data.lp;
        return calculateLifePath(effectiveDob).lifePath;
    }, [data, effectiveDob]);

    const currentYear = new Date().getFullYear();
    const currentAge = Math.max(0, currentYear - birthYear);

    const cyclesData: CyclesPinnaclesResult = useMemo(() => {
        return calculateCyclesPinnacles(effectiveDob, lifePathNumber);
    }, [effectiveDob, lifePathNumber]);

    // Format 4 stages
    const stages = useMemo(() => {
        const pin = cyclesData.pinnacles;
        const chal = cyclesData.challenges;

        const parseAge = (raw: string | number, fallback: number): number => {
            if (typeof raw === 'number') return raw;
            const parsed = parseInt(String(raw).replace(/\D/g, ''), 10);
            return isNaN(parsed) ? fallback : parsed;
        };

        const age1 = parseAge(pin[0]?.age, 29);
        const age2 = parseAge(pin[1]?.age, age1 + 9);
        const age3 = parseAge(pin[2]?.age, age2 + 9);
        const age4 = parseAge(pin[3]?.age, age3 + 9);

        return [
            {
                id: 1,
                title: 'Đỉnh Cao I: Khởi Tạo & Đặt Nền Tảng',
                number: pin[0]?.val || 1,
                ageRange: `Từ nhỏ đến ${age1} tuổi`,
                peakAge: age1,
                peakYear: birthYear + age1,
                challengeNumber: chal[0]?.val || 0,
                isCurrent: currentAge <= age1,
                summary: 'Giai đoạn tôi luyện cái tôi độc lập, học cách định hình bản thân và tìm kiếm con đường phát triển ban đầu.'
            },
            {
                id: 2,
                title: 'Đỉnh Cao II: Mở Rộng & Xây Dựng Vị Thế',
                number: pin[1]?.val || 1,
                ageRange: `${age1 + 1} đến ${age2} tuổi`,
                peakAge: age2,
                peakYear: birthYear + age2,
                challengeNumber: chal[1]?.val || 0,
                isCurrent: currentAge > age1 && currentAge <= age2,
                summary: 'Giai đoạn tăng tốc sự nghiệp, kết nối đối tác, xây dựng uy tín xã hội và tổ ấm gia đình.'
            },
            {
                id: 3,
                title: 'Đỉnh Cao III: Trưởng Thành & Thăng Hoa Năng Lực',
                number: pin[2]?.val || 1,
                ageRange: `${age2 + 1} đến ${age3} tuổi`,
                peakAge: age3,
                peakYear: birthYear + age3,
                challengeNumber: chal[2]?.val || 0,
                isCurrent: currentAge > age2 && currentAge <= age3,
                summary: 'Giai đoạn củng cố sức ảnh hưởng, hoàn thiện chiều sâu nội tâm và tạo ra những thành quả vững chắc.'
            },
            {
                id: 4,
                title: 'Đỉnh Cao IV: Trí Tuệ & Lan Tỏa Di Sản',
                number: pin[3]?.val || 1,
                ageRange: `Từ ${age3 + 1} tuổi trở đi`,
                peakAge: age4,
                peakYear: birthYear + age4,
                challengeNumber: chal[3]?.val || 0,
                isCurrent: currentAge > age3,
                summary: 'Giai đoạn thông tuệ, đúc kết giá trị cuộc đời, cống hiến cho cộng đồng và truyền cảm hứng cho thế hệ kế tiếp.'
            }
        ];
    }, [cyclesData, birthYear, currentAge]);

    // Active expanded stage
    const currentStage = stages.find(s => s.isCurrent) || stages[0];
    const [expandedId, setExpandedId] = useState<number>(currentStage.id);

    return (
        <div className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E5E4] shadow-sm space-y-6 ${className}`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E5E4]">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF] mb-1">
                        <Mountain className="w-3.5 h-3.5 text-[#D4A72C]" />
                        <span>Dòng Thời Gian Vận Mệnh (Vertical Timeline)</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#17172B] tracking-tight">
                        4 Đỉnh Cao Kim Tự Tháp Cuộc Đời
                    </h3>
                    <p className="text-sm text-[#68687A] mt-0.5">
                        Nhấp vào từng năm hoặc từng đỉnh cao để xem chi tiết cơ hội vàng và thử thách song hành.
                    </p>
                </div>

                <div className="text-xs text-[#68687A] bg-[#FAF9F6] px-3.5 py-2 rounded-xl border border-[#E7E5E4] self-start sm:self-auto font-medium">
                    Độ tuổi hiện tại: <strong className="text-[#17172B] font-bold text-sm">{currentAge} tuổi</strong> (Năm {currentYear})
                </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E7E5E4]">
                {stages.map((stage) => {
                    const isExpanded = expandedId === stage.id;
                    const meaning = getPinnacleMeaning(stage.number);
                    const challenge = getChallengeInfo(stage.challengeNumber);

                    return (
                        <div key={stage.id} className="relative">
                            {/* Marker Node */}
                            <button
                                type="button"
                                onClick={() => setExpandedId(isExpanded ? 0 : stage.id)}
                                className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-serif font-bold text-xs transition-all cursor-pointer ${stage.isCurrent
                                        ? 'bg-[#4F46E5] text-white ring-4 ring-[#EEF2FF] shadow-sm'
                                        : 'bg-[#FAF9F6] text-[#68687A] border border-[#E7E5E4] hover:border-[#4F46E5]'
                                    }`}
                            >
                                {stage.id}
                            </button>

                            {/* Card Item */}
                            <div
                                className={`rounded-2xl border transition-all ${stage.isCurrent
                                        ? 'bg-[#F5F3FF]/40 border-[#E0E7FF]'
                                        : 'bg-white border-[#E7E5E4] hover:border-[#D6D3D1]'
                                    }`}
                            >
                                {/* Clickable Summary Header */}
                                <button
                                    type="button"
                                    onClick={() => setExpandedId(isExpanded ? 0 : stage.id)}
                                    className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-serif font-bold text-base sm:text-lg text-[#17172B]">
                                                {stage.title}
                                            </span>
                                            {stage.isCurrent && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4F7C68] text-white">
                                                    Đang diễn ra
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-[#68687A] flex-wrap">
                                            <span className="flex items-center gap-1 font-medium text-[#17172B]">
                                                <Calendar className="w-3.5 h-3.5 text-[#4F46E5]" />
                                                Mốc năm {stage.peakYear} ({stage.peakAge} tuổi)
                                            </span>
                                            <span>•</span>
                                            <span>{stage.ageRange}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] flex flex-col items-center justify-center font-serif text-center">
                                            <span className="text-[9px] uppercase font-bold text-[#68687A] leading-none">Số</span>
                                            <span className="text-base font-black text-[#4F46E5] leading-tight">{stage.number}</span>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-[#68687A]" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-[#68687A]" />
                                        )}
                                    </div>
                                </button>

                                {/* Collapsible Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-[#E7E5E4]/80 space-y-4 text-xs">
                                        <p className="text-[#68687A] leading-relaxed text-sm">
                                            {stage.summary}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                            {/* Pinnacle Meaning */}
                                            <div className="p-4 rounded-xl bg-white border border-[#E7E5E4] space-y-2">
                                                <div className="font-bold text-[#17172B] flex items-center gap-2 text-xs uppercase tracking-wider">
                                                    <Award className="w-4 h-4 text-[#D4A72C]" />
                                                    <span>Năng lượng đỉnh cao số {stage.number}:</span>
                                                </div>
                                                <p className="text-[#17172B] leading-relaxed text-xs">
                                                    {meaning.desc}
                                                </p>
                                                {meaning.advice && (
                                                    <p className="text-[#68687A] italic bg-[#FAF9F6] p-2.5 rounded-lg border border-[#E7E5E4]">
                                                        "{meaning.advice}"
                                                    </p>
                                                )}
                                            </div>

                                            {/* Challenge info */}
                                            <div className="p-4 rounded-xl bg-white border border-[#E7E5E4] space-y-2">
                                                <div className="font-bold text-[#B7791F] flex items-center gap-2 text-xs uppercase tracking-wider">
                                                    <ShieldAlert className="w-4 h-4 text-[#B7791F]" />
                                                    <span>Thử thách song hành số {stage.challengeNumber}:</span>
                                                </div>
                                                <p className="text-[#17172B] leading-relaxed text-xs">
                                                    {challenge ? challenge.desc : 'Rèn luyện sự kiên nhẫn và khả năng tự cân bằng trước các biến động đời sống.'}
                                                </p>
                                                {challenge && challenge.lesson && (
                                                    <p className="text-[#68687A] italic bg-[#FAF9F6] p-2.5 rounded-lg border border-[#E7E5E4]">
                                                        "Bài học: {challenge.lesson}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
