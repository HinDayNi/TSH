'use client';

import React, { use, useState, useEffect } from 'react';
import { useProfile } from '@/lib/context/ProfileContext';
import {
    calculateBirthChart,
    calculateNameNumbers,
    calculatePinnacles,
    calculatePersonalYear,
    BirthChartResult,
    NameAnalysisResult,
    PinnaclesResult,
    PersonalYearResult
} from '@/lib/numerology/calculator';
import {
    Quote,
    Printer,
    Sparkles,
    Calendar,
    User,
    ArrowLeft,
    Share2,
    Download,
    Check,
    Bookmark,
    Layers,
    Mountain,
    Compass,
    Activity
} from 'lucide-react';
import Link from 'next/link';

interface InterpretationItem {
    life_path_number: number | string;
    archetype: string;
    core_energy: string[];
    detailed_analysis: {
        mindset: string;
        strengths: string[];
        blind_spots: string[];
        career_paths: string[];
        relationship_style: string;
    };
}

const CHAPTERS = [
    { id: 'chapter-1', num: '01', title: 'Tổng Quan & Bản Sắc Cốt Lõi', icon: Compass },
    { id: 'chapter-2', num: '02', title: 'Bộ Ba Chỉ Số Năng Lượng Họ Tên', icon: Layers },
    { id: 'chapter-3', num: '03', title: 'Cấu Trúc Ma Trận Pythagoras 3x3', icon: Activity },
    { id: 'chapter-4', num: '04', title: 'Chu Kỳ Vận Trình 4 Đỉnh Cao & Năm Cá Nhân', icon: Mountain },
    { id: 'chapter-5', num: '05', title: 'Định Hướng Phát Triển & Môi Trường Tối Ưu', icon: Bookmark },
];

export default function WorkspaceReportDetailPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const { profile, data } = useProfile();
    const [interp, setInterp] = useState<InterpretationItem | null>(null);
    const [activeChapter, setActiveChapter] = useState('chapter-1');
    const [copied, setCopied] = useState(false);

    const effectiveName = profile?.fullName || 'Hồ Sơ Nghiên Cứu';
    const effectiveDob = profile?.dob || '1990-11-22';
    const effectiveLp = data?.lp || 7;

    useEffect(() => {
        fetch('/data/interpretations.json')
            .then((res) => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then((items: InterpretationItem[]) => {
                const found = items.find(
                    (item) =>
                        item.life_path_number === effectiveLp ||
                        String(item.life_path_number) === String(effectiveLp)
                );
                setInterp(found || items[0] || null);
            })
            .catch(() => {
                setInterp({
                    life_path_number: effectiveLp,
                    archetype: 'Nhà Khai Phá Tri Thức & Chiêm Nghiệm',
                    core_energy: ['Trực giác sâu sắc', 'Tư duy độc lập', 'Đúc kết quy luật'],
                    detailed_analysis: {
                        mindset:
                            'Luôn tìm kiếm bản chất cốt lõi đằng sau mọi hiện tượng. Động lực thôi thúc lớn nhất là sự thông tuệ, tự do nhận thức và không ngừng hoàn thiện chiều sâu nội tâm.',
                        strengths: [
                            'Tư duy phân tích và đúc kết quy luật có hệ thống',
                            'Khả năng tự học, tự nghiên cứu độc lập xuất sắc',
                            'Trực giác nhạy bén trước các thay đổi tinh tế của môi trường'
                        ],
                        blind_spots: [
                            'Dễ thu mình vào thế giới riêng, tạo khoảng cách với tập thể',
                            'Xu hướng nghi ngờ hoặc đòi hỏi tính hoàn hảo khắt khe',
                            'Đôi khi khó diễn đạt cảm xúc sâu kín ra ngoài bằng lời nói'
                        ],
                        career_paths: [
                            'Nghiên cứu khoa học, chiến lược gia, phát triển sản phẩm',
                            'Giảng viên, tác giả, nhà tư vấn phát triển cá nhân',
                            'Công nghệ dữ liệu, kiến trúc hệ thống'
                        ],
                        relationship_style:
                            'Coi trọng chiều sâu tư tưởng và sự đồng điệu tâm hồn hơn là những giao tế hình thức bên ngoài.'
                    }
                });
            });
    }, [effectiveLp]);

    const chart: BirthChartResult = calculateBirthChart(effectiveDob);
    const nameAnalysis: NameAnalysisResult = calculateNameNumbers(effectiveName);
    const pinnacles: PinnaclesResult = calculatePinnacles(effectiveDob, effectiveLp);
    const personalYear: PersonalYearResult = calculatePersonalYear(effectiveDob);

    const scrollToChapter = (chapterId: string) => {
        setActiveChapter(chapterId);
        const element = document.getElementById(chapterId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const gridLayout = [
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7]
    ];

    return (
        <div className="w-full space-y-8 pb-20 antialiased font-sans text-[#1C1B22]">
            {/* Top Auxiliary Toolbar (Download, Share, Print) - Không tranh chấp không gian đọc */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#E7E5E4] no-print">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#68687A] hover:text-[#1C1B22] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại Bản đồ</span>
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#68687A] hover:text-[#1C1B22] bg-white hover:bg-[#FAF9F6] border border-[#E7E5E4] transition-all cursor-pointer shadow-xs"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#4F7C68]" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Đã chép link' : 'Chia sẻ'}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#1C1B22] bg-white hover:bg-[#FAF9F6] border border-[#E7E5E4] transition-all cursor-pointer shadow-xs"
                    >
                        <Printer className="w-3.5 h-3.5 text-[#68687A]" />
                        <span>In ấn</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all cursor-pointer shadow-xs"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Xuất PDF</span>
                    </button>
                </div>
            </div>

            {/* Sticky Chapter Navigation: 01 Tổng quan -> 05 Phát triển */}
            <nav className="sticky top-16 z-20 bg-white/90 backdrop-blur-md py-2.5 px-2 border-y border-[#E7E5E4] overflow-x-auto no-print">
                <div className="flex items-center gap-2 min-w-max">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#68687A] mr-1">Mục lục:</span>
                    {CHAPTERS.map((chap) => {
                        const Icon = chap.icon;
                        const isActive = activeChapter === chap.id;
                        return (
                            <button
                                key={chap.id}
                                type="button"
                                onClick={() => scrollToChapter(chap.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                                        ? 'bg-[#4F46E5] text-white shadow-xs'
                                        : 'bg-[#FAF9F6] text-[#68687A] hover:text-[#1C1B22] hover:bg-[#F5F3FF]'
                                    }`}
                            >
                                <span className="font-mono text-[11px] opacity-80">{chap.num}</span>
                                <span>{chap.title.split('&')[0]}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Academic Cover Header */}
            <header className="space-y-6 pt-2">
                <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF]">
                        Chuyên Khảo Thần Số Học Pythagoras
                    </span>
                    <span className="text-xs text-[#68687A]">
                        Mã lưu trữ: #{resolvedParams.id || '2026'}
                    </span>
                </div>

                <div className="space-y-3">
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1B22] leading-tight">
                        Bản Đồ Năng Lượng & Tâm Lý Hành Vi
                    </h1>
                    <p className="text-base sm:text-lg text-[#68687A] leading-relaxed max-w-3xl">
                        Nghiên cứu cấu trúc tần số rung động của họ tên và ngày sinh theo trường phái Pythagoras cổ điển và tâm lý học hành vi hiện đại.
                    </p>
                </div>

                {/* Profile Meta Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[#E7E5E4] text-xs">
                    <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-[#68687A]" />
                        <div>
                            <span className="text-[#68687A] block">Chủ thể khảo sát</span>
                            <span className="font-bold text-[#1C1B22] text-sm">{effectiveName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#68687A]" />
                        <div>
                            <span className="text-[#68687A] block">Ngày sinh quy chuẩn</span>
                            <span className="font-bold text-[#1C1B22] text-sm">{effectiveDob}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#F5F3FF] text-[#4F46E5] font-serif font-bold text-xs flex items-center justify-center border border-[#E0E7FF]">
                            {effectiveLp}
                        </div>
                        <div>
                            <span className="text-[#68687A] block">Con số chủ đạo</span>
                            <span className="font-serif font-bold text-[#4F46E5] text-sm">Đường đời số {effectiveLp}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* CHƯƠNG I: TỔNG QUAN & BẢN SẮC CỐT LÕI */}
            <section id="chapter-1" className="scroll-mt-32 space-y-6 pt-4">
                <div className="border-b border-[#E7E5E4] pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5]">
                        Chương 01
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B22] tracking-tight">
                        Tổng Quan & Bản Sắc Cốt Lõi
                    </h2>
                </div>

                {interp && (
                    <div className="space-y-6">
                        {/* Callout Box Mindset */}
                        <div className="bg-[#FAF9F6] border-l-4 border-[#D4A72C] p-6 rounded-r-2xl border-y border-r border-[#E7E5E4] space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                                <Quote className="w-4 h-4" />
                                <span>Luận Điểm Cốt Lõi (Mindset)</span>
                            </div>
                            <p className="font-serif text-base sm:text-lg italic text-[#1C1B22] leading-relaxed">
                                "{interp.detailed_analysis.mindset}"
                            </p>
                        </div>

                        {/* Văn bản giải nghĩa */}
                        <div className="space-y-4 text-base leading-relaxed text-[#1C1B22]">
                            <p>
                                Khi khảo sát dưới hệ tọa độ Pythagoras, con số <strong>{effectiveLp}</strong> phản ánh phong thái của một <em>{interp.archetype}</em>. Đây là mẫu người xem trải nghiệm và sự suy ngẫm là phương thức chủ yếu để đúc rút chân lý sống. Họ không dễ dàng tin theo những định kiến có sẵn mà luôn đòi hỏi sự chiêm nghiệm thực chứng.
                            </p>
                            <p>
                                Đặc tính này kiến tạo nên một trường năng lượng trầm tĩnh và có sức tự chủ cao. Thay vì phản ứng tức thì trước áp lực ngoại cảnh, người mang số chủ đạo này thường lui về quan sát, cân nhắc mọi khía cạnh và hành động khi trực giác đã hoàn toàn thông suốt.
                            </p>
                        </div>

                        {/* Thế mạnh & Vùng cần hoàn thiện */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                            <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                                <h3 className="font-serif text-base font-bold text-[#1C1B22] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#4F7C68]" />
                                    Thế Mạnh Phẩm Chất & Năng Lực
                                </h3>
                                <ul className="space-y-2 text-xs sm:text-sm text-[#68687A] leading-relaxed pl-4 list-disc">
                                    {interp.detailed_analysis.strengths.map((s, idx) => (
                                        <li key={idx}>{s}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                                <h3 className="font-serif text-base font-bold text-[#1C1B22] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#B7791F]" />
                                    Điểm Mù Tâm Lý & Vùng Cần Rèn Luyện
                                </h3>
                                <ul className="space-y-2 text-xs sm:text-sm text-[#68687A] leading-relaxed pl-4 list-disc">
                                    {interp.detailed_analysis.blind_spots.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* CHƯƠNG II: BỘ BA CHỈ SỐ NĂNG LƯỢNG HỌ TÊN */}
            <section id="chapter-2" className="scroll-mt-32 space-y-6 pt-6">
                <div className="border-b border-[#E7E5E4] pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5]">
                        Chương 02
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B22] tracking-tight">
                        Bộ Ba Chỉ Số Năng Lượng Họ Tên
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Sứ Mệnh */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68687A] block">Năng lực biểu đạt</span>
                            <div className="flex items-center gap-3 my-2">
                                <div className="w-12 h-12 rounded-xl bg-[#4F46E5] text-white font-serif font-bold text-2xl flex items-center justify-center">
                                    {nameAnalysis.expressionNumber}
                                </div>
                                <h4 className="font-serif font-bold text-base text-[#1C1B22]">Chỉ Số Sứ Mệnh</h4>
                            </div>
                            <p className="text-xs text-[#68687A] leading-relaxed">
                                Đại diện cho phương thức hành động, năng khiếu bẩm sinh và mục đích cuộc đời mà bạn hướng tới khi trưởng thành.
                            </p>
                        </div>
                    </div>

                    {/* Linh Hồn */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68687A] block">Khao khát thầm kín</span>
                            <div className="flex items-center gap-3 my-2">
                                <div className="w-12 h-12 rounded-xl bg-[#D4A72C] text-white font-serif font-bold text-2xl flex items-center justify-center">
                                    {nameAnalysis.soulUrgeNumber}
                                </div>
                                <h4 className="font-serif font-bold text-base text-[#1C1B22]">Chỉ Số Linh Hồn</h4>
                            </div>
                            <p className="text-xs text-[#68687A] leading-relaxed">
                                Phản ánh động lực nội tâm sâu sắc, những giá trị cốt lõi mang lại cảm giác bình an và thỏa mãn cho tâm hồn.
                            </p>
                        </div>
                    </div>

                    {/* Nhân Cách */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68687A] block">Hình ảnh xã hội</span>
                            <div className="flex items-center gap-3 my-2">
                                <div className="w-12 h-12 rounded-xl bg-[#1C1B22] text-white font-serif font-bold text-2xl flex items-center justify-center">
                                    {nameAnalysis.personalityNumber}
                                </div>
                                <h4 className="font-serif font-bold text-base text-[#1C1B22]">Chỉ Số Nhân Cách</h4>
                            </div>
                            <p className="text-xs text-[#68687A] leading-relaxed">
                                Là ấn tượng ban đầu và phong thái bên ngoài mà người xung quanh cảm nhận khi tiếp xúc với bạn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHƯƠNG III: CẤU TRÚC MA TRẬN PYTHAGORAS 3X3 */}
            <section id="chapter-3" className="scroll-mt-32 space-y-6 pt-6">
                <div className="border-b border-[#E7E5E4] pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5]">
                        Chương 03
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B22] tracking-tight">
                        Cấu Trúc Ma Trận Pythagoras 3x3
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-7 rounded-2xl border border-[#E7E5E4] shadow-xs">
                    {/* Visual 3x3 Grid */}
                    <div className="sm:col-span-5 flex justify-center">
                        <div className="grid grid-cols-3 gap-2.5 aspect-square w-full max-w-[220px] p-3 bg-[#FAF9F6] rounded-2xl border border-[#E7E5E4]">
                            {gridLayout.map((row) =>
                                row.map((digit) => {
                                    const count = chart.digitCounts[digit] || 0;
                                    const isPresent = count > 0;

                                    return (
                                        <div
                                            key={digit}
                                            className={`relative flex flex-col items-center justify-center rounded-xl transition-all ${isPresent
                                                    ? 'bg-[#F5F3FF] border border-[#E0E7FF] text-[#4F46E5]'
                                                    : 'bg-white border border-dashed border-[#E7E5E4] text-[#A8A29E]'
                                                }`}
                                        >
                                            <span className={`text-[10px] absolute top-1 left-1.5 ${isPresent ? 'text-[#68687A]' : 'text-[#A8A29E]'}`}>
                                                #{digit}
                                            </span>
                                            <span className={`font-serif text-base sm:text-lg font-bold ${isPresent ? 'text-[#4F46E5]' : 'text-[#D6D3D1]'}`}>
                                                {isPresent ? Array(count).fill(digit).join('') : '-'}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-7 space-y-4 text-xs sm:text-sm text-[#68687A] leading-relaxed">
                        <p>
                            Ma trận ngày sinh là tấm bản đồ ghi nhận mật độ các tần số năng lượng tự nhiên. Trục Trí Não (3-6-9), Trục Tâm Hồn (2-5-8) và Trục Thể Chất (1-4-7) cùng phối hợp để định hình phản xạ tự nhiên của bạn.
                        </p>
                        <div className="space-y-1.5 pt-1">
                            <div className="font-semibold text-[#1C1B22]">Mũi tên sở hữu: {chart.fullArrows.length > 0 ? chart.fullArrows.map(a => a.name).join(', ') : 'Không có mũi tên 3 số liên tiếp'}</div>
                            <div className="text-[#68687A]">Mũi tên trống: {chart.emptyArrows.length > 0 ? chart.emptyArrows.map(a => a.name).join(', ') : 'Không có mũi tên trống'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHƯƠNG IV: CHU KỲ VẬN TRÌNH 4 ĐỈNH CAO & NĂM CÁ NHÂN */}
            <section id="chapter-4" className="scroll-mt-32 space-y-6 pt-6">
                <div className="border-b border-[#E7E5E4] pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5]">
                        Chương 04
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B22] tracking-tight">
                        Chu Kỳ Vận Trình 4 Đỉnh Cao & Năm Cá Nhân
                    </h2>
                </div>

                <div className="space-y-4">
                    {/* 4 Đỉnh cao */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {pinnacles.pinnacles.map((p) => (
                            <div key={p.pinnacleNumber} className="p-4 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase text-[#68687A] block">
                                    Đỉnh cao {p.pinnacleNumber} ({p.ageRange})
                                </span>
                                <div className="font-serif font-black text-2xl text-[#4F46E5]">
                                    Số {p.value}
                                </div>
                                <div className="text-xs font-semibold text-[#1C1B22]">{p.theme}</div>
                                <p className="text-xs text-[#68687A] leading-relaxed">{p.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Năm cá nhân */}
                    <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                            Năm Cá Nhân Hiện Tại ({personalYear.year}): Số {personalYear.personalYear}
                        </span>
                        <div className="font-serif text-lg font-bold text-[#1C1B22]">
                            Chủ đề: {personalYear.keyword} — {personalYear.theme}
                        </div>
                        <p className="text-xs sm:text-sm text-[#68687A] leading-relaxed">
                            {personalYear.forecast}
                        </p>
                    </div>
                </div>
            </section>

            {/* CHƯƠNG V: ĐỊNH HƯỚNG PHÁT TRIỂN & MÔI TRƯỜNG TỐI ƯU */}
            <section id="chapter-5" className="scroll-mt-32 space-y-6 pt-6">
                <div className="border-b border-[#E7E5E4] pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5]">
                        Chương 05
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B22] tracking-tight">
                        Định Hướng Phát Triển & Môi Trường Tối Ưu
                    </h2>
                </div>

                {interp && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                            <h4 className="font-serif font-bold text-[#1C1B22] text-base">
                                Môi Trường Nghề Nghiệp Đón Đầu Tiềm Năng
                            </h4>
                            <ul className="text-xs sm:text-sm space-y-2 text-[#68687A] leading-relaxed pl-4 list-disc">
                                {interp.detailed_analysis.career_paths.map((cp, idx) => (
                                    <li key={idx}>{cp}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3">
                            <h4 className="font-serif font-bold text-[#1C1B22] text-base">
                                Phong Cách Gắn Kết Mối Quan Hệ
                            </h4>
                            <p className="text-xs sm:text-sm text-[#68687A] leading-relaxed">
                                {interp.detailed_analysis.relationship_style}
                            </p>
                        </div>
                    </div>
                )}

                {/* Kết luận */}
                <div className="bg-[#FAF9F6] border-l-4 border-[#4F46E5] p-6 rounded-r-2xl border-y border-r border-[#E7E5E4]">
                    <p className="font-serif text-base italic text-[#1C1B22] leading-relaxed">
                        "Mục đích của số học không phải để dự đoán tương lai, mà để giúp bạn thấu hiểu chính mình một cách sáng suốt và tĩnh tại nhất."
                    </p>
                </div>
            </section>
        </div>
    );
}
