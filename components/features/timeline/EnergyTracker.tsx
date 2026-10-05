'use client';

import React, { useState, useMemo } from 'react';
import { calculateDailyMonthlyEnergy, MonthlyEnergyResult, EnergyDayInfo } from '@/lib/numerology/retention';
import {
    Activity,
    Brain,
    Heart,
    Flame,
    Calendar,
    Sparkles,
    CheckCircle2,
    Send
} from 'lucide-react';

interface EnergyTrackerProps {
    defaultDob?: string;
    defaultName?: string;
}

export default function EnergyTracker({
    defaultDob = '1990-11-22',
    defaultName = 'Nguyễn Văn Huy'
}: EnergyTrackerProps) {
    const [dob, setDob] = useState(defaultDob);
    const [name, setName] = useState(defaultName);
    const [selectedDate, setSelectedDate] = useState<EnergyDayInfo | null>(null);

    // Email subscription state
    const [email, setEmail] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeMsg, setSubscribeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const energyData: MonthlyEnergyResult | null = useMemo(() => {
        if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
        try {
            return calculateDailyMonthlyEnergy(dob);
        } catch {
            return null;
        }
    }, [dob]);

    const activeDay = selectedDate || energyData?.currentDayEnergy;

    // 3 chỉ số Thước đo Năng lượng (Tinh thần / Cảm xúc / Hành động)
    // Tự động tính toán điểm số trực quan thanh lịch dựa trên chu kỳ ngày/tháng
    const energyScores = useMemo(() => {
        const dayVal = activeDay?.personalDay || 7;
        const monthVal = energyData?.personalMonth || 5;

        // Tính toán các tỉ lệ cân bằng (chuẩn mực 65-90)
        const mental = Math.min(95, Math.max(60, 68 + ((dayVal * 7 + monthVal * 3) % 27)));
        const emotional = Math.min(95, Math.max(55, 62 + ((dayVal * 11 + monthVal * 5) % 31)));
        const action = Math.min(95, Math.max(58, 65 + ((dayVal * 13 + monthVal * 7) % 29)));
        const overall = Math.round((mental + emotional + action) / 3);

        return {
            overall,
            mental,
            emotional,
            action
        };
    }, [activeDay, energyData]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setSubscribing(true);
        setSubscribeMsg(null);

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, dob })
            });

            const json = await res.json();
            if (json.success) {
                setSubscribeMsg({ type: 'success', text: 'Đăng ký thành công! Bạn sẽ nhận Digest Email định kỳ vào ngày 1 hàng tháng.' });
                setEmail('');
            } else {
                setSubscribeMsg({ type: 'error', text: json.error || 'Có lỗi xảy ra khi đăng ký' });
            }
        } catch (err: any) {
            setSubscribeMsg({ type: 'error', text: 'Lỗi kết nối: ' + err.message });
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E5E4]">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF] mb-1">
                        <Activity className="w-3.5 h-3.5 text-[#D4A72C]" />
                        <span>Thước Đo Năng Lượng & Nhịp Sinh Học</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#17172B] tracking-tight">
                        Lịch Năng Lượng Cá Nhân Theo Ngày & Tháng
                    </h3>
                    <p className="text-sm text-[#68687A] mt-0.5">
                        Đồng bộ nhịp sóng cá nhân để chọn thời điểm phù hợp cho quyết định quan trọng.
                    </p>
                </div>
            </div>

            {/* Inputs: Tên & Ngày sinh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4]">
                <div>
                    <label className="text-xs font-medium text-[#68687A] block mb-1">Họ và tên</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-[#68687A] block mb-1">Ngày sinh (Dương lịch)</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-[#E7E5E4] text-[#17172B] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                    />
                </div>
            </div>

            {energyData && (
                <div className="space-y-6">
                    {/* THƯỚC ĐO TRỰC QUAN NĂNG LƯỢNG (78/100) */}
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E5E4] shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
                            <div>
                                <h4 className="font-serif text-lg font-bold text-[#17172B]">
                                    Thước Đo Năng Lượng: Ngày {activeDay?.dateStr || 'Hôm nay'}
                                </h4>
                                <p className="text-xs text-[#68687A] mt-0.5">
                                    Tổng hòa năng lượng ngày cá nhân #{activeDay?.personalDay} & tháng cá nhân #{energyData.personalMonth}
                                </p>
                            </div>

                            {/* Overall Score Dial */}
                            <div className="flex items-center gap-3 bg-[#FAF9F6] px-4 py-2.5 rounded-2xl border border-[#E7E5E4] self-start sm:self-auto">
                                <div className="text-right">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#68687A] block">Chỉ số sinh lực</span>
                                    <span className="font-serif font-black text-2xl text-[#4F46E5] leading-none">
                                        {energyScores.overall}
                                        <span className="text-xs font-normal text-[#68687A]">/100</span>
                                    </span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#F5F3FF] border border-[#E0E7FF] flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#D4A72C]" />
                                </div>
                            </div>
                        </div>

                        {/* 3 Chỉ số: Tinh thần / Cảm xúc / Hành động */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Tinh thần (Mental) */}
                            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-[#17172B]">
                                    <span className="flex items-center gap-1.5">
                                        <Brain className="w-4 h-4 text-[#4F46E5]" />
                                        Tinh Thần (Trí Tuệ)
                                    </span>
                                    <span className="font-bold text-[#4F46E5]">{energyScores.mental}/100</span>
                                </div>
                                <div className="h-2 rounded-full bg-[#E7E5E4] overflow-hidden">
                                    <div
                                        className="h-full bg-[#4F46E5] rounded-full transition-all duration-700"
                                        style={{ width: `${energyScores.mental}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-[#68687A] leading-normal pt-1">
                                    Độ sáng suốt khi giải quyết vấn đề logic và ra quyết định.
                                </p>
                            </div>

                            {/* Cảm xúc (Emotional) */}
                            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-[#17172B]">
                                    <span className="flex items-center gap-1.5">
                                        <Heart className="w-4 h-4 text-[#D4A72C]" />
                                        Cảm Xúc (Tâm Hồn)
                                    </span>
                                    <span className="font-bold text-[#D4A72C]">{energyScores.emotional}/100</span>
                                </div>
                                <div className="h-2 rounded-full bg-[#E7E5E4] overflow-hidden">
                                    <div
                                        className="h-full bg-[#D4A72C] rounded-full transition-all duration-700"
                                        style={{ width: `${energyScores.emotional}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-[#68687A] leading-normal pt-1">
                                    Mức độ đồng cảm, kiên nhẫn và khả năng kết nối nội tâm.
                                </p>
                            </div>

                            {/* Hành động (Action) */}
                            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-[#17172B]">
                                    <span className="flex items-center gap-1.5">
                                        <Flame className="w-4 h-4 text-[#4F7C68]" />
                                        Hành Động (Thực Thi)
                                    </span>
                                    <span className="font-bold text-[#4F7C68]">{energyScores.action}/100</span>
                                </div>
                                <div className="h-2 rounded-full bg-[#E7E5E4] overflow-hidden">
                                    <div
                                        className="h-full bg-[#4F7C68] rounded-full transition-all duration-700"
                                        style={{ width: `${energyScores.action}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-[#68687A] leading-normal pt-1">
                                    Sự quyết đoán, năng lượng hành động và tính kỷ luật.
                                </p>
                            </div>
                        </div>

                        {/* Chi tiết ngày đang chọn */}
                        {activeDay && (
                            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-1.5 text-xs">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <span className="font-bold text-[#17172B]">
                                        Chủ đề: {activeDay.keyword}
                                    </span>
                                    <span className="text-[#4F46E5] font-medium">
                                        Ngày cá nhân số {activeDay.personalDay}
                                    </span>
                                </div>
                                <p className="text-[#68687A] leading-relaxed text-sm">
                                    {activeDay.advice}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* LỊCH 30 NGÀY NĂNG LƯỢNG */}
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E5E4] shadow-sm space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#68687A] flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#4F46E5]" />
                                Bấm vào từng ngày để xem năng lượng chi tiết:
                            </h4>
                            <span className="text-xs text-[#68687A]">
                                Tháng {energyData.month}/{energyData.year} • Năm cá nhân {energyData.personalYear}
                            </span>
                        </div>

                        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                            {energyData.monthCalendar.map((d) => {
                                const isSelected = activeDay?.day === d.day;
                                const isToday = d.day === new Date().getDate();

                                return (
                                    <button
                                        key={d.day}
                                        type="button"
                                        onClick={() => setSelectedDate(d)}
                                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                                                ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-xs'
                                                : isToday
                                                    ? 'bg-[#F5F3FF] border-[#E0E7FF] text-[#17172B]'
                                                    : 'bg-white border-[#E7E5E4] text-[#17172B] hover:border-[#4F46E5]/40 hover:bg-[#FAF9F6]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className={`font-bold ${isSelected ? 'text-white' : 'text-[#17172B]'}`}>
                                                {d.day}
                                            </span>
                                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF9F6] text-[#4F46E5] border border-[#E7E5E4]'
                                                }`}>
                                                #{d.personalDay}
                                            </span>
                                        </div>
                                        <div className={`text-[10px] truncate ${isSelected ? 'text-indigo-100' : 'text-[#68687A]'}`}>
                                            {d.keyword}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Newsletter Digest */}
                    <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] flex flex-col md:flex-row items-center justify-between gap-5">
                        <div className="space-y-1 text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                                Bản Tin Năng Lượng Định Kỳ
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#17172B]">
                                Nhận Báo Cáo Năng Lượng Vào Ngày 1 Hàng Tháng
                            </h4>
                            <p className="text-xs text-[#68687A] max-w-md">
                                Dự báo vận trình tháng mới và các lưu ý ra quyết định hoàn toàn tự động.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="px-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E7E5E4] text-[#17172B] placeholder:text-[#68687A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] w-full sm:w-64"
                            />
                            <button
                                type="submit"
                                disabled={subscribing}
                                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>{subscribing ? 'Đang gửi...' : 'Đăng Ký'}</span>
                            </button>
                        </form>
                    </div>

                    {subscribeMsg && (
                        <p className={`text-xs text-center font-medium ${subscribeMsg.type === 'success' ? 'text-[#4F7C68]' : 'text-[#B94A48]'
                            }`}>
                            {subscribeMsg.text}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
