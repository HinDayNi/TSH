'use client';

import React, { useState, useMemo } from 'react';
import {
    calculateBirthChart,
    ALL_ARROWS_CONFIG,
    BirthChartResult,
    ArrowInfo
} from '@/lib/numerology/calculator';
import {
    Sparkles,
    Info,
    AlertCircle,
    CheckCircle2,
    X,
    Layers,
    Brain,
    Heart,
    Activity,
    ChevronRight
} from 'lucide-react';

export interface BirthChartMatrixProps {
    birthDate?: string;
    digitCounts?: Record<number, number>;
    data?: any;
    className?: string;
    interactive?: boolean;
}

interface NumberMeaningMeta {
    number: number;
    title: string;
    plane: 'MIND' | 'SOUL' | 'BODY';
    planeName: string;
    meaningPresent: {
        balanced: string;
        multiple: string;
    };
    meaningMissing: string;
    advice: string;
}

const NUMBER_METAS: Record<number, NumberMeaningMeta> = {
    3: {
        number: 3,
        title: 'Trí tuệ, Sáng tạo & Ngôn ngữ',
        plane: 'MIND',
        planeName: 'Trục Trí Não',
        meaningPresent: {
            balanced: 'Tư duy logic nhạy bén, trí nhớ tốt, hoạt ngôn và có óc hài hước.',
            multiple: 'Trí não quá năng động, dễ lan man, nói nhiều hoặc phán xét.'
        },
        meaningMissing: 'Dễ đãng trí, thiếu tính sáng tạo tự phát hoặc gặp khó khăn khi diễn đạt ý tưởng ra lời.',
        advice: 'Tập viết nhật ký, đọc sách tư duy và học các kỹ năng thuyết trình để kích hoạt năng lượng số 3.'
    },
    6: {
        number: 6,
        title: 'Tình yêu thương, Gia đình & Thẩm mỹ',
        plane: 'MIND',
        planeName: 'Trục Trí Não',
        meaningPresent: {
            balanced: 'Giàu lòng trắc ẩn, yêu gia đình, có khiếu thẩm mỹ và sáng tạo nghệ thuật.',
            multiple: 'Dễ lo lắng thái quá, bảo bọc con quá mức, dễ bị cảm xúc chi phối.'
        },
        meaningMissing: 'Cần học cách thể hiện tình cảm ấm áp bằng hành động cụ thể, tránh che giấu cảm xúc.',
        advice: 'Tham gia các hoạt động thiện nguyện, trang trí không gian sống và học cách chấp nhận sự chưa hoàn hảo.'
    },
    9: {
        number: 9,
        title: 'Lý tưởng, Trách nhiệm & Nhân văn',
        plane: 'MIND',
        planeName: 'Trục Trí Não',
        meaningPresent: {
            balanced: 'Có hoài bão lớn, tinh thần phụng sự cộng đồng và đề cao trách nhiệm đạo đức.',
            multiple: 'Dễ lý tưởng hóa cuộc sống, đặt kỳ vọng quá cao vào bản thân và người khác.'
        },
        meaningMissing: 'Cần nuôi dưỡng tinh thần cống hiến và học cách bao dung hơn với những điều khác biệt.',
        advice: 'Tham gia các dự án vì cộng đồng, đặt ra các mục tiêu thực tế theo từng chặng nhỏ.'
    },
    2: {
        number: 2,
        title: 'Trực giác, Nhạy cảm & Hòa hợp',
        plane: 'SOUL',
        planeName: 'Trục Tâm Hồn',
        meaningPresent: {
            balanced: 'Trực giác tinh tế, thấu hiểu cảm xúc người khác, có khả năng hòa giải tuyệt vời.',
            multiple: 'Quá nhạy cảm, dễ bị tổn thương bởi lời nói vô tình hoặc hay suy diễn.'
        },
        meaningMissing: 'Cần chú ý lắng nghe tiếng nói trực giác nội tâm, rèn luyện sự đồng cảm trong giao tiếp.',
        advice: 'Tập thiền định, hòa mình vào thiên nhiên tĩnh lặng để làm sắc bén trực giác tự nhiên.'
    },
    5: {
        number: 5,
        title: 'Tự do, Cảm xúc & Linh hoạt',
        plane: 'SOUL',
        planeName: 'Trục Tâm Hồn',
        meaningPresent: {
            balanced: 'Khả năng thích ứng cao, tự tin biểu đạt cảm xúc, thích khám phá thế giới.',
            multiple: 'Dễ bốc đồng, tâm trạng thất thường, khó chịu đựng sự gò bó khuôn mẫu.'
        },
        meaningMissing: 'Dễ kìm nén cảm xúc, sợ thay đổi và gặp trở ngại khi thể hiện mong muốn chân thật.',
        advice: 'Tập thể thao ngoài trời, học một nhạc cụ hoặc viết lách tự do để giải phóng năng lượng.'
    },
    8: {
        number: 8,
        title: 'Trí tuệ tâm linh, Độc lập & Ngăn nắp',
        plane: 'SOUL',
        planeName: 'Trục Tâm Hồn',
        meaningPresent: {
            balanced: 'Tư duy độc lập, có năng lực quản trị xuất sắc và cái nhìn bao quát sắc sảo.',
            multiple: 'Dễ lạnh lùng, khó bộc lộ cảm xúc dịu dàng hoặc có xu hướng kiểm soát.'
        },
        meaningMissing: 'Cần chú ý hơn đến tính ngăn nắp, rèn luyện năng lực quản lý thời gian và tài chính.',
        advice: 'Lập kế hoạch công việc chi tiết, học các bài học về trao quyền và tin tưởng người khác.'
    },
    1: {
        number: 1,
        title: 'Bản ngã, Ý chí & Thể hiện cá nhân',
        plane: 'BODY',
        planeName: 'Trục Thể Chất',
        meaningPresent: {
            balanced: 'Tự tin, kiên định, có chính kiến rõ ràng và khả năng tự lập cao.',
            multiple: 'Cái tôi lớn, bướng bỉnh, khó chấp nhận sự chỉ trích từ người khác.'
        },
        meaningMissing: 'Khó khăn khi nói lên chính kiến riêng, dễ phụ thuộc vào quyết định của đám đông.',
        advice: 'Học cách ra quyết định độc lập từ những việc nhỏ hàng ngày và tự tin bảo vệ quan điểm.'
    },
    4: {
        number: 4,
        title: 'Kỷ luật, Thực tế & Trật tự',
        plane: 'BODY',
        planeName: 'Trục Thể Chất',
        meaningPresent: {
            balanced: 'Cẩn trọng, nguyên tắc, làm việc có tổ chức và coi trọng sự thực tế.',
            multiple: 'Bảo thủ, cứng nhắc, khó thích nghi khi kế hoạch bị thay đổi đột ngột.'
        },
        meaningMissing: 'Dễ thiếu kiên nhẫn, làm việc tùy hứng và hay bỏ dở giữa chừng.',
        advice: 'Thiết lập thời gian biểu cố định mỗi ngày, rèn luyện tính kiên trì qua các bài tập thể thao.'
    },
    7: {
        number: 7,
        title: 'Trải nghiệm, Chiêm nghiệm & Bài học thực tế',
        plane: 'BODY',
        planeName: 'Trục Thể Chất',
        meaningPresent: {
            balanced: 'Khả năng tự học qua thực chứng, đúc kết triết lý sống sâu sắc từ thử thách.',
            multiple: 'Phải trải qua nhiều bài học mất mát về sức khỏe, tình cảm hoặc tiền bạc để trưởng thành.'
        },
        meaningMissing: 'Có thể sống an toàn, ít phải chịu tổn thất lớn nhưng cũng chậm đúc kết bài học đời sâu sắc.',
        advice: 'Chủ động tìm tòi nghiên cứu triết lý, đọc sách học từ sai lầm của người khác để giảm thiểu bài học đau thương.'
    }
};

// 3x3 Pythagoras Layout:
// Top: 3, 6, 9 (Trí não)
// Middle: 2, 5, 8 (Tâm hồn)
// Bottom: 1, 4, 7 (Thể chất)
const GRID_ROWS = [
    { rowId: 'top', name: 'Trí Não', icon: Brain, numbers: [3, 6, 9] },
    { rowId: 'mid', name: 'Tâm Hồn', icon: Heart, numbers: [2, 5, 8] },
    { rowId: 'bot', name: 'Thể Chất', icon: Activity, numbers: [1, 4, 7] }
];

export default function BirthChartMatrix({
    birthDate = '2026-06-17',
    digitCounts: propCounts,
    data,
    className = '',
    interactive = true
}: BirthChartMatrixProps) {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [selectedArrow, setSelectedArrow] = useState<ArrowInfo | null>(null);

    // Compute chart data
    const chartData: BirthChartResult = useMemo(() => {
        const effectiveDob = data?.dob || birthDate;
        return calculateBirthChart(effectiveDob);
    }, [birthDate, data]);

    const counts = useMemo<Record<number, number>>(() => {
        if (propCounts) return propCounts;
        if (data?.gridData?.dobGrid) {
            const map: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
            for (let i = 1; i <= 9; i++) {
                map[i] = data.gridData.dobGrid[i] || 0;
            }
            return map;
        }
        return chartData.digitCounts;
    }, [propCounts, data, chartData]);

    const selectedMeta = selectedNumber ? NUMBER_METAS[selectedNumber] : null;
    const selectedCount = selectedNumber ? counts[selectedNumber] || 0 : 0;

    return (
        <div className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E5E4] shadow-sm space-y-6 ${className}`}>
            {/* Header: Indigo & Slate Editorial Style */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E5E4]">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#68687A] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF] text-[#4F46E5]">
                            <Layers strokeWidth={1.5} className="w-3.5 h-3.5 text-[#4F46E5]" />
                            Biểu Đồ Pythagoras 3x3
                        </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17172B] tracking-tight mt-2">
                        Ma Trận Ngày Sinh Tự Nhiên
                    </h3>
                    <p className="text-sm text-[#68687A] mt-0.5">
                        Cấu trúc năng lượng bẩm sinh, các trục thế mạnh và khoảng trống nhận thức cần bồi đắp.
                    </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#68687A] self-start sm:self-auto font-medium">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#4F46E5]"></span>
                        Có số ({Object.values(counts).filter(c => c > 0).length})
                    </span>
                    <span className="text-[#E7E5E4]">•</span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-[#D6D3D1] bg-[#FAF9F6]"></span>
                        Ô trống ({Object.values(counts).filter(c => c === 0).length})
                    </span>
                </div>
            </div>

            {/* Grid Matrix & Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 3x3 Grid Matrix */}
                <div className="lg:col-span-7 space-y-2.5">
                    {GRID_ROWS.map((row) => {
                        const RowIcon = row.icon;
                        return (
                            <div key={row.rowId} className="flex items-center gap-2.5">
                                {/* Row Header Badge */}
                                <div className="hidden sm:flex flex-col items-center justify-center w-20 py-3 px-1 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] text-[#17172B] text-[11px] font-medium text-center shrink-0">
                                    <RowIcon strokeWidth={1.5} className="w-3.5 h-3.5 mb-1 text-[#68687A]" />
                                    <span>{row.name}</span>
                                </div>

                                {/* 3 Cells per Row */}
                                <div className="flex-1 grid grid-cols-3 gap-2.5 sm:gap-3">
                                    {row.numbers.map((num) => {
                                        const count = counts[num] || 0;
                                        const isPresent = count > 0;
                                        const isSelected = selectedNumber === num;

                                        return (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => {
                                                    if (!interactive) return;
                                                    setSelectedNumber(selectedNumber === num ? null : num);
                                                    setSelectedArrow(null);
                                                }}
                                                className={`relative h-24 sm:h-28 rounded-xl flex flex-col items-center justify-center p-2.5 transition-all duration-150 cursor-pointer text-center group ${isPresent
                                                        ? 'bg-[#F5F3FF] border border-[#E0E7FF] hover:bg-[#EEF2FF]'
                                                        : 'bg-[#FAF9F6] border border-dashed border-[#E7E5E4] text-[#A8A29E]'
                                                    } ${isSelected
                                                        ? 'ring-2 ring-[#4F46E5] border-transparent shadow-sm'
                                                        : ''
                                                    }`}
                                            >
                                                {/* Corner Slot Marker */}
                                                <span className={`absolute top-2 left-2.5 text-[10px] font-medium ${isPresent ? 'text-[#68687A]' : 'text-[#A8A29E]'
                                                    }`}>
                                                    #{num}
                                                </span>

                                                {/* Number repetition display */}
                                                <div className="flex items-center justify-center">
                                                    {isPresent ? (
                                                        <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#4F46E5]">
                                                            {Array(count).fill(num).join('')}
                                                        </span>
                                                    ) : (
                                                        <span className="font-serif text-2xl sm:text-3xl font-normal text-[#D6D3D1] select-none">
                                                            {num}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Bottom Status Tag */}
                                                <div className="mt-1">
                                                    {isPresent ? (
                                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white text-[#4F46E5] border border-[#E0E7FF]">
                                                            {count === 1 && 'Cân bằng'}
                                                            {count === 2 && 'Mạnh (2x)'}
                                                            {count >= 3 && `Nhiều (${count}x)`}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] font-normal text-[#A8A29E]">
                                                            Trống
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Side Inspection Panel */}
                <div className="lg:col-span-5 bg-[#FAF9F6] rounded-xl p-5 border border-[#E7E5E4] flex flex-col justify-between min-h-[300px]">
                    {selectedMeta ? (
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E7E5E4]">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-md bg-[#4F46E5] text-white font-serif font-bold text-xs flex items-center justify-center">
                                            {selectedMeta.number}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#68687A]">
                                            {selectedMeta.planeName}
                                        </span>
                                    </div>
                                    <h4 className="font-serif text-base font-bold text-[#17172B] mt-1">
                                        {selectedMeta.title}
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedNumber(null)}
                                    className="p-1 text-[#68687A] hover:text-[#17172B] rounded-md hover:bg-white transition-colors"
                                >
                                    <X strokeWidth={1.5} className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Status in Chart */}
                            <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E4] text-xs space-y-1.5">
                                <div className="font-semibold text-[#17172B] flex items-center gap-1.5">
                                    {selectedCount > 0 ? (
                                        <>
                                            <CheckCircle2 strokeWidth={1.5} className="w-4 h-4 text-[#4F7C68]" />
                                            <span>Xuất hiện: {selectedCount} lần trong ngày sinh</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle strokeWidth={1.5} className="w-4 h-4 text-[#B7791F]" />
                                            <span>Vắng mặt (Ô trống cần rèn luyện bù khuyết)</span>
                                        </>
                                    )}
                                </div>
                                <p className="text-[#17172B] leading-relaxed text-[13px]">
                                    {selectedCount === 1 && selectedMeta.meaningPresent.balanced}
                                    {selectedCount > 1 && selectedMeta.meaningPresent.multiple}
                                    {selectedCount === 0 && selectedMeta.meaningMissing}
                                </p>
                            </div>

                            {/* Callout Advice */}
                            <div className="p-3.5 rounded-xl bg-white border-l-4 border-[#D4A72C] border-y border-r border-[#E7E5E4] text-xs space-y-1">
                                <div className="font-semibold text-[#17172B] flex items-center gap-1.5">
                                    <Sparkles strokeWidth={1.5} className="w-3.5 h-3.5 text-[#D4A72C]" />
                                    <span>Định hướng phát triển:</span>
                                </div>
                                <p className="text-[#68687A] italic leading-relaxed text-[13px]">
                                    "{selectedMeta.advice}"
                                </p>
                            </div>
                        </div>
                    ) : selectedArrow ? (
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E7E5E4]">
                                <div>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white text-[#4F46E5] border border-[#E0E7FF]">
                                        {selectedArrow.type === 'FULL' ? 'Mũi tên sức mạnh' : 'Mũi tên thách thức'}
                                    </span>
                                    <h4 className="font-serif text-base font-bold text-[#17172B] mt-1.5">
                                        {selectedArrow.name}
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedArrow(null)}
                                    className="p-1 text-[#68687A] hover:text-[#17172B] rounded-md hover:bg-white transition-colors"
                                >
                                    <X strokeWidth={1.5} className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E4] text-xs space-y-1.5">
                                <div className="font-semibold text-[#17172B]">
                                    Bộ ba con số: ({selectedArrow.digits.join(' - ')})
                                </div>
                                <p className="text-[#68687A] leading-relaxed text-[13px]">
                                    {selectedArrow.meaning}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 text-[#68687A] my-auto">
                            <Info strokeWidth={1.5} className="w-6 h-6 text-[#4F46E5]/60 mb-2" />
                            <p className="text-xs font-semibold text-[#17172B]">
                                Chọn bất kỳ ô số hoặc ô trống
                            </p>
                            <p className="text-[12px] text-[#68687A] mt-1 max-w-xs leading-relaxed">
                                Đọc chi tiết luận giải năng lượng bẩm sinh, số lần lặp lại và định hướng bồi đắp tự nhiên.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Personality Arrows Summary Section */}
            <div className="pt-4 border-t border-[#E7E5E4] space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#17172B] flex items-center gap-1.5">
                        <Sparkles strokeWidth={1.5} className="w-3.5 h-3.5 text-[#D4A72C]" />
                        Các Mũi Tên Cá Tính Trong Biểu Đồ
                    </h4>
                    <span className="text-xs text-[#68687A]">
                        {chartData.fullArrows.length} Mũi tên đầy đủ • {chartData.emptyArrows.length} Mũi tên trống
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Full Arrows */}
                    <div className="space-y-1.5">
                        <div className="text-[11px] font-semibold text-[#17172B] uppercase flex items-center gap-1">
                            <CheckCircle2 strokeWidth={1.5} className="w-3.5 h-3.5 text-[#4F7C68]" />
                            Mũi tên sức mạnh sở hữu:
                        </div>
                        {chartData.fullArrows.length > 0 ? (
                            <div className="space-y-1.5">
                                {chartData.fullArrows.map((arrow) => (
                                    <button
                                        key={arrow.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedArrow(arrow);
                                            setSelectedNumber(null);
                                        }}
                                        className="w-full text-left p-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F3FF] border border-[#E7E5E4] hover:border-[#E0E7FF] transition-all flex items-center justify-between gap-2 text-xs cursor-pointer group"
                                    >
                                        <div>
                                            <span className="font-serif font-bold text-[#17172B] block text-sm group-hover:text-[#4F46E5] transition-colors">
                                                {arrow.name}
                                            </span>
                                            <span className="text-[11px] text-[#68687A] line-clamp-1 mt-0.5">
                                                {arrow.meaning}
                                            </span>
                                        </div>
                                        <ChevronRight strokeWidth={1.5} className="w-4 h-4 text-[#68687A] group-hover:translate-x-0.5 transition-transform shrink-0" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-[#68687A] italic p-3 bg-[#FAF9F6] rounded-xl border border-[#E7E5E4]">
                                Biểu đồ không tạo thành mũi tên sức mạnh 3 số liên tiếp.
                            </p>
                        )}
                    </div>

                    {/* Empty Arrows */}
                    <div className="space-y-1.5">
                        <div className="text-[11px] font-semibold text-[#17172B] uppercase flex items-center gap-1">
                            <AlertCircle strokeWidth={1.5} className="w-3.5 h-3.5 text-[#B7791F]" />
                            Mũi tên trống cần rèn luyện:
                        </div>
                        {chartData.emptyArrows.length > 0 ? (
                            <div className="space-y-1.5">
                                {chartData.emptyArrows.map((arrow) => (
                                    <button
                                        key={arrow.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedArrow(arrow);
                                            setSelectedNumber(null);
                                        }}
                                        className="w-full text-left p-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F5F3FF] border border-[#E7E5E4] hover:border-[#E0E7FF] transition-all flex items-center justify-between gap-2 text-xs cursor-pointer group"
                                    >
                                        <div>
                                            <span className="font-serif font-bold text-[#17172B] block text-sm group-hover:text-[#4F46E5] transition-colors">
                                                {arrow.name}
                                            </span>
                                            <span className="text-[11px] text-[#68687A] line-clamp-1 mt-0.5">
                                                {arrow.meaning}
                                            </span>
                                        </div>
                                        <ChevronRight strokeWidth={1.5} className="w-4 h-4 text-[#68687A] group-hover:translate-x-0.5 transition-transform shrink-0" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-[#68687A] italic p-3 bg-[#FAF9F6] rounded-xl border border-[#E7E5E4]">
                                Không có mũi tên trống nào, các trục phân bổ năng lượng hài hòa.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
