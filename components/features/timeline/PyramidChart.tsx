'use client';

import React, { useState, useMemo } from 'react';
import {
    calculateLifePath,
    calculatePinnacles,
    calculateCyclesPinnacles,
    getPinnacleMeaning,
    getChallengeInfo,
    reduceNumber,
    CyclesPinnaclesResult
} from '@/lib/numerology/calculator';
import {
    Mountain,
    Sparkles,
    Calendar,
    Clock,
    Award,
    ShieldAlert,
    Compass,
    ChevronRight,
    Info,
    CheckCircle
} from 'lucide-react';

export interface PyramidChartProps {
    birthDate?: string; // YYYY-MM-DD
    lifePath?: number;
    data?: any;
    currentAge?: number;
    className?: string;
}

interface PeakNodeData {
    key: 'p1' | 'p2' | 'p3' | 'p4';
    index: number;
    title: string;
    number: number;
    age: number;
    year: number;
    challengeNumber: number;
    theme: string;
    x: number;
    y: number;
    isCurrent: boolean;
}

export default function PyramidChart({
    birthDate = '2026-06-17',
    lifePath: propLifePath,
    data,
    currentAge: propCurrentAge,
    className = ''
}: PyramidChartProps) {
    const effectiveDob = data?.dob || birthDate;

    // Parse birth components
    const { birthYear, birthMonth, birthDay } = useMemo(() => {
        const parts = effectiveDob.trim().split(/[-/]/);
        if (parts[0].length === 4) {
            return {
                birthYear: parseInt(parts[0], 10) || 2026,
                birthMonth: parseInt(parts[1], 10) || 1,
                birthDay: parseInt(parts[2], 10) || 1
            };
        }
        return {
            birthDay: parseInt(parts[0], 10) || 1,
            birthMonth: parseInt(parts[1], 10) || 1,
            birthYear: parseInt(parts[2], 10) || 2026
        };
    }, [effectiveDob]);

    // Calculate life path
    const lifePathNumber = useMemo(() => {
        if (propLifePath) return propLifePath;
        if (data?.lp) return data.lp;
        const res = calculateLifePath(effectiveDob);
        return res.lifePath;
    }, [propLifePath, data, effectiveDob]);

    // Calculate current age
    const activeAge = useMemo(() => {
        if (typeof propCurrentAge === 'number') return propCurrentAge;
        const now = new Date();
        const thisYear = now.getFullYear();
        const calculated = thisYear - birthYear;
        return calculated > 0 ? calculated : 0;
    }, [propCurrentAge, birthYear]);

    // Calculate Pinnacles & Challenges
    const cyclesData: CyclesPinnaclesResult = useMemo(() => {
        return calculateCyclesPinnacles(effectiveDob, lifePathNumber);
    }, [effectiveDob, lifePathNumber]);

    const pinnaclesResult = useMemo(() => {
        return calculatePinnacles(effectiveDob, lifePathNumber);
    }, [effectiveDob, lifePathNumber]);

    // 4 Peaks Coordinate & Metadata setup
    const peakNodes = useMemo<PeakNodeData[]>(() => {
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

        // Peak 1: (300, 370)
        // Peak 2: (600, 370)
        // Peak 3: (450, 230)
        // Peak 4: (450, 90)
        return [
            {
                key: 'p1',
                index: 1,
                title: 'Đỉnh cao số 1: Xây nền tảng',
                number: pin[0]?.val || 1,
                age: age1,
                year: birthYear + age1,
                challengeNumber: chal[0]?.val || 0,
                theme: pinnaclesResult.pinnacles[0]?.theme || 'Giai đoạn phát triển năng lực cá nhân',
                x: 300,
                y: 370,
                isCurrent: activeAge <= age1
            },
            {
                key: 'p2',
                index: 2,
                title: 'Đỉnh cao số 2: Tăng tốc sự nghiệp',
                number: pin[1]?.val || 1,
                age: age2,
                year: birthYear + age2,
                challengeNumber: chal[1]?.val || 0,
                theme: pinnaclesResult.pinnacles[1]?.theme || 'Củng cố vị thế và giá trị xã hội',
                x: 600,
                y: 370,
                isCurrent: activeAge > age1 && activeAge <= age2
            },
            {
                key: 'p3',
                index: 3,
                title: 'Đỉnh cao số 3: Trưởng thành & Tỏa sáng',
                number: pin[2]?.val || 1,
                age: age3,
                year: birthYear + age3,
                challengeNumber: chal[2]?.val || 0,
                theme: pinnaclesResult.pinnacles[2]?.theme || 'Thăng hoa năng lực và sức ảnh hưởng',
                x: 450,
                y: 230,
                isCurrent: activeAge > age2 && activeAge <= age3
            },
            {
                key: 'p4',
                index: 4,
                title: 'Đỉnh cao số 4: Trí tuệ & Di sản',
                number: pin[3]?.val || 1,
                age: age4,
                year: birthYear + age4,
                challengeNumber: chal[3]?.val || 0,
                theme: pinnaclesResult.pinnacles[3]?.theme || 'Đúc kết giá trị và cống hiến cho đời',
                x: 450,
                y: 90,
                isCurrent: activeAge > age3
            }
        ];
    }, [cyclesData, birthYear, pinnaclesResult, activeAge]);

    // Current active peak by age
    const currentPeakNode = peakNodes.find(p => p.isCurrent) || peakNodes[0];

    // Selected peak for inspector card
    const [selectedKey, setSelectedKey] = useState<'p1' | 'p2' | 'p3' | 'p4'>(currentPeakNode.key);

    const selectedPeak = peakNodes.find(p => p.key === selectedKey) || currentPeakNode;
    const selectedMeaning = getPinnacleMeaning(selectedPeak.number);
    const selectedChallenge = getChallengeInfo(selectedPeak.challengeNumber);

    // Base coordinates
    const baseMonth = { x: 150, y: 530, val: cyclesData.cycles.first, label: `Tháng ${birthMonth}` };
    const baseDay = { x: 450, y: 530, val: cyclesData.cycles.second, label: `Ngày ${birthDay}` };
    const baseYear = { x: 750, y: 530, val: cyclesData.cycles.third, label: `Năm ${birthYear}` };

    return (
        <div className={`bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-slate-200/90 shadow-sm space-y-6 ${className}`}>
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                            <Mountain className="w-3.5 h-3.5 text-purple-600" />
                            Kim Tự Tháp 4 Đỉnh Cao
                        </span>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                            Tuổi hiện tại: {activeAge} tuổi
                        </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1.5">
                        Biểu Đồ Vận Trình Cuộc Đời
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Hệ thống 4 chu kỳ 9 năm theo Pythagoras, dự báo bài học đỉnh cao và thử thách cần vượt qua.
                    </p>
                </div>

                {/* Current Stage Indicator Banner */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 self-start sm:self-auto">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
                    <div className="text-xs">
                        <span className="font-bold text-amber-900 block">
                            Đang trong: Đỉnh {currentPeakNode.index} (Số {currentPeakNode.number})
                        </span>
                        <span className="text-[11px] text-amber-700">
                            Mốc đỉnh: {currentPeakNode.age} tuổi • Năm {currentPeakNode.year}
                        </span>
                    </div>
                </div>
            </div>

            {/* SVG Pyramid Visualization */}
            <div className="relative bg-gradient-to-b from-slate-50/70 via-white to-blue-50/30 rounded-3xl p-3 sm:p-6 border border-slate-100 overflow-hidden">
                <svg
                    viewBox="0 0 900 620"
                    className="w-full h-auto max-h-[500px] select-none"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.03))' }}
                >
                    <defs>
                        {/* Gradients */}
                        <linearGradient id="pyrLineGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                        </linearGradient>

                        <linearGradient id="activeHalo" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="peakBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#4f46e5" />
                        </linearGradient>

                        <linearGradient id="peakGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>

                        <linearGradient id="peakPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                    </defs>

                    {/* Pyramid Structural Lines */}
                    {/* Base Horizontal Line */}
                    <line
                        x1={baseMonth.x} y1={baseMonth.y}
                        x2={baseYear.x} y2={baseYear.y}
                        stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4"
                    />

                    {/* Outer Pyramid 4 Boundaries: Month -> Peak4 and Year -> Peak4 */}
                    <line
                        x1={baseMonth.x} y1={baseMonth.y}
                        x2={peakNodes[3].x} y2={peakNodes[3].y}
                        stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="5 3"
                    />
                    <line
                        x1={baseYear.x} y1={baseYear.y}
                        x2={peakNodes[3].x} y2={peakNodes[3].y}
                        stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="5 3"
                    />

                    {/* Peak 1 lines: Month -> P1 and Day -> P1 */}
                    <line
                        x1={baseMonth.x} y1={baseMonth.y}
                        x2={peakNodes[0].x} y2={peakNodes[0].y}
                        stroke="#3b82f6" strokeWidth="3.5"
                    />
                    <line
                        x1={baseDay.x} y1={baseDay.y}
                        x2={peakNodes[0].x} y2={peakNodes[0].y}
                        stroke="#3b82f6" strokeWidth="3.5"
                    />

                    {/* Peak 2 lines: Day -> P2 and Year -> P2 */}
                    <line
                        x1={baseDay.x} y1={baseDay.y}
                        x2={peakNodes[1].x} y2={peakNodes[1].y}
                        stroke="#3b82f6" strokeWidth="3.5"
                    />
                    <line
                        x1={baseYear.x} y1={baseYear.y}
                        x2={peakNodes[1].x} y2={peakNodes[1].y}
                        stroke="#3b82f6" strokeWidth="3.5"
                    />

                    {/* Peak 3 lines: P1 -> P3 and P2 -> P3 */}
                    <line
                        x1={peakNodes[0].x} y1={peakNodes[0].y}
                        x2={peakNodes[2].x} y2={peakNodes[2].y}
                        stroke="#8b5cf6" strokeWidth="3.5"
                    />
                    <line
                        x1={peakNodes[1].x} y1={peakNodes[1].y}
                        x2={peakNodes[2].x} y2={peakNodes[2].y}
                        stroke="#8b5cf6" strokeWidth="3.5"
                    />

                    {/* Peak 4 central ridge line: P3 -> P4 */}
                    <line
                        x1={peakNodes[2].x} y1={peakNodes[2].y}
                        x2={peakNodes[3].x} y2={peakNodes[3].y}
                        stroke="#f59e0b" strokeWidth="4"
                    />

                    {/* 3 BASE NODES (Chân tháp) */}
                    {[baseMonth, baseDay, baseYear].map((base, idx) => (
                        <g key={idx} transform={`translate(${base.x}, ${base.y})`}>
                            <circle r="26" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.5" />
                            <text
                                textAnchor="middle" dy="6"
                                fontSize="16" fontWeight="bold" fill="#1e293b"
                            >
                                {base.val}
                            </text>
                            <text
                                textAnchor="middle" dy="48"
                                fontSize="12" fontWeight="600" fill="#64748b"
                            >
                                {base.label}
                            </text>
                        </g>
                    ))}

                    {/* 4 PEAK NODES */}
                    {peakNodes.map((peak) => {
                        const isSelected = selectedKey === peak.key;
                        const isCurrent = peak.isCurrent;

                        return (
                            <g
                                key={peak.key}
                                transform={`translate(${peak.x}, ${peak.y})`}
                                onClick={() => setSelectedKey(peak.key)}
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Glowing halo for CURRENT age stage */}
                                {isCurrent && (
                                    <circle
                                        r="46"
                                        fill="none"
                                        stroke="#f59e0b"
                                        strokeWidth="3"
                                        strokeDasharray="5 3"
                                        className="animate-spin"
                                        style={{ animationDuration: '10s' }}
                                    />
                                )}

                                {/* Outer glow ring on selection */}
                                {isSelected && (
                                    <circle
                                        r="38"
                                        fill="none"
                                        stroke="#6366f1"
                                        strokeWidth="3"
                                    />
                                )}

                                {/* Main Peak Node Circle */}
                                <circle
                                    r="30"
                                    fill={
                                        isCurrent
                                            ? 'url(#peakGold)'
                                            : peak.index === 4
                                                ? 'url(#peakPurple)'
                                                : 'url(#peakBlue)'
                                    }
                                    stroke="#ffffff"
                                    strokeWidth="3"
                                />

                                {/* Peak Lesson Number */}
                                <text
                                    textAnchor="middle"
                                    dy="7"
                                    fontSize="20"
                                    fontWeight="900"
                                    fill="#ffffff"
                                >
                                    {peak.number}
                                </text>

                                {/* Tag Box above peak */}
                                <g transform="translate(0, -42)">
                                    <rect
                                        x="-70" y="-14" width="140" height="26" rx="8"
                                        fill={isCurrent ? '#fef3c7' : '#f8fafc'}
                                        stroke={isCurrent ? '#f59e0b' : '#cbd5e1'}
                                        strokeWidth="1.5"
                                    />
                                    <text
                                        textAnchor="middle" dy="3"
                                        fontSize="11" fontWeight="bold"
                                        fill={isCurrent ? '#92400e' : '#334155'}
                                    >
                                        Đỉnh {peak.index} • {peak.age}t ({peak.year})
                                    </text>
                                </g>

                                {/* Challenge Badge below peak */}
                                <g transform="translate(0, 44)">
                                    <rect
                                        x="-45" y="-10" width="90" height="20" rx="6"
                                        fill="#fff1f2" stroke="#fecdd3" strokeWidth="1"
                                    />
                                    <text
                                        textAnchor="middle" dy="4"
                                        fontSize="10" fontWeight="bold" fill="#9f1239"
                                    >
                                        Thử thách: {peak.challengeNumber}
                                    </text>
                                </g>

                                {/* Current Phase Indicator Pin */}
                                {isCurrent && (
                                    <g transform="translate(42, -20)">
                                        <rect
                                            x="0" y="-10" width="86" height="20" rx="6"
                                            fill="#bbf7d0" stroke="#86efac" strokeWidth="1"
                                        />
                                        <text
                                            x="43" y="4" textAnchor="middle"
                                            fontSize="9" fontWeight="extrabold" fill="#14532d"
                                        >
                                            ★ ĐANG DIỄN RA
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Selected Peak Detail Card */}
            <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                                {selectedPeak.number}
                            </span>
                            <h4 className="text-base font-extrabold text-slate-900">
                                {selectedPeak.title}
                            </h4>
                            {selectedPeak.isCurrent && (
                                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                                    Độ tuổi hiện tại của bạn
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                            <span>Mốc tuổi: <strong>{selectedPeak.age} tuổi</strong></span>
                            <span>•</span>
                            <span>Năm đạt đỉnh: <strong>{selectedPeak.year}</strong></span>
                            <span>•</span>
                            <span>Chủ đề: <strong className="text-blue-700">{selectedPeak.theme}</strong></span>
                        </p>
                    </div>

                    {/* Peak selector pill buttons */}
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                        {peakNodes.map((p) => (
                            <button
                                key={p.key}
                                type="button"
                                onClick={() => setSelectedKey(p.key)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedKey === p.key
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                Đỉnh {p.index}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Lesson & Meaning */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                        <div className="font-bold text-blue-900 flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span>Bài học & Cơ hội năng lượng số {selectedPeak.number}:</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                            {selectedMeaning.desc}
                        </p>
                        {selectedMeaning.advice && (
                            <div className="mt-2 p-2.5 rounded-lg bg-blue-50/80 border border-blue-100 text-[11px] text-blue-900">
                                <strong>Lời khuyên phát triển:</strong> {selectedMeaning.advice}
                            </div>
                        )}
                    </div>

                    {/* Challenge & Growth Advice */}
                    <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-2">
                        <div className="font-bold text-rose-950 flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <span>Thử thách cần vượt qua (Số {selectedPeak.challengeNumber}):</span>
                        </div>
                        <p className="text-rose-950/80 leading-relaxed">
                            {selectedChallenge ? selectedChallenge.desc : 'Giai đoạn tôi luyện bản lĩnh và khả năng kiểm soát cảm xúc.'}
                        </p>
                        {selectedChallenge && selectedChallenge.lesson && (
                            <div className="mt-2 p-2.5 rounded-lg bg-white/80 border border-rose-200 text-[11px] text-rose-900">
                                <strong>Bài học rèn luyện:</strong> {selectedChallenge.lesson}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
