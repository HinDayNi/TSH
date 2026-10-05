import React, { Suspense } from 'react';
import fs from 'fs/promises';
import path from 'path';
import {
    calculateLifePath,
    calculateBirthChart,
    calculateNameNumbers,
    calculatePinnacles,
    calculatePersonalYear,
    BirthChartResult,
    LifePathResult,
    NameAnalysisResult,
    PinnaclesResult,
    PersonalYearResult
} from '@/lib/numerology/calculator';
import { convertLunarToSolar } from '@/lib/numerology/lunar';
import { verifyVipAccessToken } from '@/lib/auth/vipToken';
import { ReportActions, VipCtaButton } from '@/components/features/report/ReportActions';

// ----------------------------------------------------------------------
// 1. Data Loader từ Gói 1 (data/interpretations.json)
// ----------------------------------------------------------------------

interface DetailedAnalysis {
    mindset: string;
    strengths: string[];
    blind_spots: string[];
    career_paths: string[];
    relationship_style: string;
}

interface InterpretationItem {
    life_path_number: number | string;
    archetype: string;
    core_energy: string[];
    detailed_analysis: DetailedAnalysis;
}

async function getInterpretationData(lifePathNumber: number): Promise<InterpretationItem | null> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'interpretations.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const items: InterpretationItem[] = JSON.parse(fileContent);

        const found = items.find((item) => {
            if (item.life_path_number === lifePathNumber) return true;
            if (String(item.life_path_number) === String(lifePathNumber)) return true;
            if (lifePathNumber === 22 && String(item.life_path_number).includes('22')) return true;
            return false;
        });

        return found || items[0] || null;
    } catch (error) {
        console.error('Error reading interpretations.json:', error);
        return null;
    }
}

// ----------------------------------------------------------------------
// 2. Loading Skeletons
// ----------------------------------------------------------------------

function BlockSkeleton({ title }: { title: string }) {
    return (
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#E8E5DF] animate-pulse">
            <div className="h-6 bg-[#E8E5DF] rounded-md w-1/3 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-[#EFECE6] rounded w-full"></div>
                <div className="h-4 bg-[#EFECE6] rounded w-5/6"></div>
                <div className="h-4 bg-[#EFECE6] rounded w-4/6"></div>
            </div>
            <p className="text-xs text-[#7C7872] mt-4 italic font-serif">{title}</p>
        </div>
    );
}

// ----------------------------------------------------------------------
// 3. Khối 1: Con số Chủ đạo, Ma trận 3x3, Luận giải học thuật
// ----------------------------------------------------------------------

async function BlockOneFree({
    lp,
    chart,
    interp,
    name,
    rawDob,
    solarDob,
    isLunar
}: {
    lp: LifePathResult;
    chart: BirthChartResult;
    interp: InterpretationItem | null;
    name: string;
    rawDob: string;
    solarDob: string;
    isLunar: boolean;
}) {
    const gridLayout = [
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7]
    ];

    return (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5DF] shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-8">
            {/* Header Block 1: Claude Editorial Parchment */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#E8E5DF]">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#7C7872] bg-[#FAF8F4] px-2.5 py-1 rounded-md border border-[#E8E5DF]">
                            Khối 1 • Khảo Sát Nền Tảng
                        </span>
                        {lp.isMaster && (
                            <span className="text-[11px] font-semibold text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-0.5 rounded-md border border-[#E0E7FF]">
                                Master Number
                            </span>
                        )}
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1B22] mt-2 tracking-tight">
                        {name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#68687A] mt-1 flex flex-wrap items-center gap-2">
                        <span>Ngày sinh: <strong className="text-[#1C1B22] font-medium">{rawDob}</strong></span>
                        {isLunar && (
                            <span className="text-[#68687A] bg-[#FAF9F6] px-2 py-0.5 rounded text-xs font-medium border border-[#E7E5E4]">
                                Âm lịch ➔ Dương lịch: {solarDob}
                            </span>
                        )}
                    </p>
                </div>

                {/* Big Life Path Badge */}
                <div className="flex items-center gap-4 bg-[#1C1B22] text-white p-5 sm:p-6 rounded-2xl shrink-0 shadow-sm">
                    <div className="text-center">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-[#F4E7B2]">Con Số Chủ Đạo</div>
                        <div className="text-4xl sm:text-5xl font-serif font-bold mt-0.5 tracking-tight text-white">{lp.lifePath}</div>
                    </div>
                    {interp && (
                        <div className="border-l border-white/20 pl-4">
                            <div className="text-[11px] text-white/70 font-sans">Hình Mẫu Tâm Lý</div>
                            <div className="text-base sm:text-lg font-serif font-semibold text-white leading-tight mt-0.5">{interp.archetype}</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Core Energy Keywords */}
            {interp && (
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#68687A] mb-2.5">
                        Năng Lượng Cốt Lõi & Từ Khóa Nhận Thức:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {interp.core_energy.map((tag, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-lg bg-[#FAF9F6] text-[#1C1B22] text-xs font-medium border border-[#E7E5E4]"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Ma Trận Ngày Sinh 3x3 Pythagoras */}
            <div className="bg-[#FAF9F6] rounded-2xl p-5 sm:p-6 border border-[#E7E5E4] space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-serif font-bold text-[#1C1B22]">
                            Ma Trận Ngày Sinh 3x3 (Biểu Đồ Pythagoras)
                        </h3>
                        <p className="text-xs text-[#68687A] mt-0.5">Tần suất xuất hiện các con số trên 3 trục nhận thức</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Grid Matrix Visual */}
                    <div className="md:col-span-5 flex justify-center">
                        <div className="grid grid-cols-3 gap-2.5 aspect-square w-full max-w-[240px] p-3 bg-white rounded-2xl border border-[#E7E5E4]">
                            {gridLayout.map((row) =>
                                row.map((digit) => {
                                    const count = chart.digitCounts[digit] || 0;
                                    const isPresent = count > 0;

                                    return (
                                        <div
                                            key={digit}
                                            className={`relative flex flex-col items-center justify-center rounded-xl p-2 transition-all ${isPresent
                                                    ? 'bg-[#F5F3FF] border border-[#E0E7FF] text-[#4F46E5]'
                                                    : 'bg-transparent border border-dashed border-[#D6D3D1] text-[#A8A29E]'
                                                }`}
                                        >
                                            <span className={`text-[10px] absolute top-1 left-1.5 font-medium ${isPresent ? 'text-[#68687A]' : 'text-[#A8A29E]'}`}>
                                                {digit}
                                            </span>
                                            <span className={`text-base sm:text-lg font-serif font-bold tracking-tight ${isPresent ? 'text-[#4F46E5]' : 'text-[#D6D3D1]'}`}>
                                                {isPresent ? Array(count).fill(digit).join('') : '-'}
                                            </span>
                                            {isPresent && (
                                                <span className="text-[9px] font-sans text-[#68687A]">
                                                    ({count} số)
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Arrows Interpretation */}
                    <div className="md:col-span-7 space-y-3 text-xs">
                        <div>
                            <div className="text-[11px] font-bold text-[#1C1B22] uppercase tracking-wide mb-1.5">
                                Mũi tên cá tính sở hữu ({chart.fullArrows.length}):
                            </div>
                            {chart.fullArrows.length > 0 ? (
                                <div className="space-y-1.5">
                                    {chart.fullArrows.map((a) => (
                                        <div key={a.id} className="p-3 rounded-xl bg-white border border-[#E7E5E4] text-[#1C1B22] leading-relaxed">
                                            <strong className="text-[#4F46E5] font-semibold">{a.name}</strong>: {a.meaning}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-[#68687A] italic font-serif">Biểu đồ không có mũi tên đầy đủ nào.</p>
                            )}
                        </div>

                        <div>
                            <div className="text-[11px] font-bold text-[#68687A] uppercase tracking-wide mb-1.5">
                                Mũi tên trống cần bổ khuyết ({chart.emptyArrows.length}):
                            </div>
                            {chart.emptyArrows.length > 0 ? (
                                <div className="space-y-1.5">
                                    {chart.emptyArrows.map((a) => (
                                        <div key={a.id} className="p-3 rounded-xl bg-white border border-[#E7E5E4] text-[#68687A] leading-relaxed">
                                            <strong className="text-[#B7791F] font-semibold">{a.name}</strong>: {a.meaning}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-[#68687A] italic font-serif">Không có mũi tên trống, năng lượng phân bổ hài hòa.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Luận Giải Học Thuật Cao Cấp */}
            {interp && (
                <div className="space-y-6 pt-2">
                    <div className="border-b border-[#E7E5E4] pb-3">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1B22] tracking-tight">
                            Luận Giải Tâm Lý Học Hành Vi & Định Hướng Phát Triển
                        </h3>
                        <p className="text-xs text-[#68687A] mt-0.5">
                            Phân tích dựa trên trường phái tâm lý học tính cách và cấu trúc năng lượng Pythagoras
                        </p>
                    </div>

                    {/* Callout Box Mindset */}
                    <div className="bg-[#FAF9F6] border-l-4 border-[#D4A72C] p-5 rounded-r-2xl border-y border-r border-[#E7E5E4] space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#68687A]">
                            Tư duy nền tảng & Động lực nội tại (Mindset)
                        </div>
                        <p className="text-base sm:text-[17px] leading-relaxed italic text-[#1C1B22]">
                            "{interp.detailed_analysis.mindset}"
                        </p>
                    </div>

                    {/* Strengths & Blind Spots */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Strengths */}
                        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-3">
                            <h4 className="font-serif font-bold text-[#1C1B22] text-base tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#4F7C68]"></span>
                                Thế mạnh phẩm chất & Năng lực hành vi:
                            </h4>
                            <ul className="text-sm space-y-2 text-[#68687A] leading-relaxed pl-4 list-disc">
                                {interp.detailed_analysis.strengths.map((s, idx) => (
                                    <li key={idx}>{s}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Blind spots */}
                        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-3">
                            <h4 className="font-serif font-bold text-[#1C1B22] text-base tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#B7791F]"></span>
                                Điểm mù tâm lý & Vùng cần hoàn thiện:
                            </h4>
                            <ul className="text-sm space-y-2 text-[#68687A] leading-relaxed pl-4 list-disc">
                                {interp.detailed_analysis.blind_spots.map((b, idx) => (
                                    <li key={idx}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Career & Relationship */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-3">
                            <h4 className="font-serif font-bold text-[#1C1B22] text-base tracking-tight">
                                Môi trường nghề nghiệp tối ưu:
                            </h4>
                            <ul className="text-sm space-y-1.5 text-[#68687A] leading-relaxed pl-4 list-disc">
                                {interp.detailed_analysis.career_paths.map((cp, idx) => (
                                    <li key={idx}>{cp}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4] space-y-3">
                            <h4 className="font-serif font-bold text-[#1C1B22] text-base tracking-tight">
                                Phong cách gắn kết & Mối quan hệ:
                            </h4>
                            <p className="text-sm text-[#68687A] leading-relaxed">
                                {interp.detailed_analysis.relationship_style}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// ----------------------------------------------------------------------
// 4. Khối 2: Bộ ba chỉ số Sứ mệnh, Linh hồn, Nhân cách
// ----------------------------------------------------------------------

function BlockTwoFree({ nameAnalysis }: { nameAnalysis: NameAnalysisResult }) {
    const cards = [
        {
            title: "Chỉ Số Sứ Mệnh (Expression)",
            number: nameAnalysis.expressionNumber,
            badge: "Năng lực biểu đạt",
            color: "bg-[#4F46E5]",
            description:
                "Đại diện cho phương thức hành động, năng khiếu tự nhiên và mục đích cuộc đời mà bạn hướng tới khi trưởng thành."
        },
        {
            title: "Chỉ Số Linh Hồn (Soul Urge)",
            number: nameAnalysis.soulUrgeNumber,
            badge: "Khao khát thầm kín",
            color: "bg-[#D4A72C]",
            description:
                "Phản ánh động lực nội tâm, những giá trị cốt lõi mang lại cảm giác thỏa mãn và bình yên cho tâm hồn của bạn."
        },
        {
            title: "Chỉ Số Nhân Cách (Personality)",
            number: nameAnalysis.personalityNumber,
            badge: "Hình ảnh xã hội",
            color: "bg-[#1C1B22]",
            description:
                "Là ấn tượng đầu tiên và phong thái bên ngoài mà người khác cảm nhận được khi tiếp xúc và tương tác cùng bạn."
        }
    ];

    return (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E5E4] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E7E5E4]">
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] bg-[#F5F3FF] px-2.5 py-1 rounded-md border border-[#E0E7FF]">
                        Khối 2 • Khảo Sát Nền Tảng
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1B22] mt-2 tracking-tight">
                        Bộ Ba Chỉ Số Năng Lượng Họ Tên
                    </h2>
                </div>
                <div className="text-xs text-[#68687A]">
                    Tên khai sinh: <span className="font-serif font-semibold text-[#1C1B22]">{nameAnalysis.normalizedName}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-5 border border-[#E7E5E4] bg-[#FAF9F6] flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-[#68687A] uppercase tracking-wider">
                                    {card.badge}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center font-serif font-bold text-2xl shrink-0 shadow-xs`}>
                                    {card.number}
                                </div>
                                <h3 className="font-serif font-bold text-[#1C1B22] text-base leading-tight">
                                    {card.title}
                                </h3>
                            </div>

                            <p className="text-xs text-[#68687A] leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 5. Khối 3: 4 Đỉnh cao Kim tự tháp & Năm cá nhân hiện tại
// ----------------------------------------------------------------------

function BlockThreeVip({
    pinnacles,
    personalYear,
    isVip = false
}: {
    pinnacles: PinnaclesResult;
    personalYear: PersonalYearResult;
    isVip?: boolean;
}) {
    return (
        <section className={`relative bg-white rounded-2xl p-6 sm:p-8 border shadow-sm overflow-hidden transition-all duration-300 ${isVip ? 'border-[#4F46E5]' : 'border-[#E7E5E4]'
            }`}>
            {/* Header VIP */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#1C1B22] text-white">
                        Khối 3 • {isVip ? 'ĐÃ MỞ KHÓA BÁO CÁO TOÀN DIỆN' : 'Báo Cáo Chi Tiết Vận Trình'}
                    </span>
                    <span className="text-xs text-[#68687A] font-sans hidden sm:inline">
                        Dự báo chu kỳ vận hạn & Đỉnh cao cuộc đời
                    </span>
                </div>
            </div>

            {/* Container chứa nội dung */}
            <div className={`relative mt-6 transition-all duration-300 ${isVip
                    ? 'select-auto pointer-events-auto filter-none opacity-100'
                    : 'select-none pointer-events-none filter blur-[5px] opacity-50'
                }`}>
                {/* 4 Đỉnh cao Kim tự tháp */}
                <div className="mb-8">
                    <h3 className="text-xl font-serif font-bold text-[#1C1B22] mb-4">
                        Dự Báo 4 Đỉnh Cao Kim Tự Tháp Cuộc Đời
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {pinnacles.pinnacles.map((p) => (
                            <div key={p.pinnacleNumber} className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4]">
                                <div className="text-xs text-[#68687A]">
                                    Đỉnh cao số {p.pinnacleNumber} ({p.ageRange})
                                </div>
                                <div className="text-2xl font-serif font-bold text-[#4F46E5] my-1">
                                    Đỉnh Số {p.value}
                                </div>
                                <div className="text-xs font-semibold text-[#1C1B22] mb-1">{p.theme}</div>
                                <p className="text-xs text-[#68687A] leading-relaxed">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Năm cá nhân hiện tại */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E4]">
                    <h3 className="text-base font-serif font-bold text-[#1C1B22] mb-2">
                        Năm Cá Nhân Hiện Tại ({personalYear.year}): Số {personalYear.personalYear}
                    </h3>
                    <div className="text-sm font-semibold text-[#1C1B22] mb-1">
                        Chủ đề: {personalYear.keyword} — {personalYear.theme}
                    </div>
                    <p className="text-xs text-[#68687A] leading-relaxed">
                        {personalYear.forecast}
                    </p>
                </div>
            </div>

            {/* Lớp phủ Khóa & Call-To-Action */}
            {!isVip && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-[#1C1B22]/30 backdrop-blur-xs text-center">
                    <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5E4] text-center shadow-xl">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F5F3FF] text-[#4F46E5] flex items-center justify-center text-xl mb-3.5 border border-[#E0E7FF]">
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-[#1C1B22] tracking-tight">
                            Nội Dung Này Đã Được Khóa
                        </h3>
                        <p className="text-xs sm:text-sm text-[#68687A] mt-2 leading-relaxed">
                            Bạn đang xem bản khảo sát nền tảng. Hãy mở khóa trọn gói để xem dự báo chi tiết
                            <strong> 4 Đỉnh cao Kim tự tháp</strong> và <strong>Vận trình Năm cá nhân</strong>.
                        </p>

                        <div className="my-4 py-2 px-3 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] text-xs text-[#68687A] flex items-center justify-center gap-2">
                            <span>Quét VietQR • Tự động kích hoạt sau 3 giây • Trọn đời</span>
                        </div>

                        {/* Nút Call-To-Action Client Component */}
                        <div className="mt-2">
                            <VipCtaButton />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// ----------------------------------------------------------------------
// 6. Server Component chính: ReportPage
// ----------------------------------------------------------------------

export default async function ReportPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    const name = typeof params.name === 'string' && params.name.trim() !== ''
        ? params.name.trim()
        : 'Nguyễn Văn Huy';

    const rawDob = typeof params.dob === 'string' && params.dob.trim() !== ''
        ? params.dob.trim()
        : '1990-11-22';

    const isLunar = params.lunar === 'true';
    const solarDobParam = typeof params.solarDob === 'string' ? params.solarDob : null;
    const vipTokenParam = typeof params.vipToken === 'string' ? params.vipToken : '';

    // Kiểm tra tính hợp lệ của Token VIP
    const vipVerification = verifyVipAccessToken(vipTokenParam);
    const isVip = vipVerification.valid;

    // Chuyển đổi Ngày Âm sang Dương nếu có
    let effectiveSolarDate = rawDob;
    if (solarDobParam) {
        effectiveSolarDate = solarDobParam;
    } else if (isLunar) {
        try {
            const parts = rawDob.split('-');
            if (parts.length === 3) {
                const y = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10);
                const d = parseInt(parts[2], 10);
                const solar = convertLunarToSolar(d, m, y);
                effectiveSolarDate = solar.formatted;
            }
        } catch (e) {
            effectiveSolarDate = rawDob;
        }
    }

    // Tính toán số học
    let lp: LifePathResult;
    let chart: BirthChartResult;
    let nameAnalysis: NameAnalysisResult;
    let pinnacles: PinnaclesResult;
    let personalYear: PersonalYearResult;

    try {
        lp = calculateLifePath(effectiveSolarDate);
        chart = calculateBirthChart(effectiveSolarDate);
        nameAnalysis = calculateNameNumbers(name);
        pinnacles = calculatePinnacles(effectiveSolarDate, lp.lifePath);
        personalYear = calculatePersonalYear(effectiveSolarDate);
    } catch (err) {
        effectiveSolarDate = '1990-11-22';
        lp = calculateLifePath(effectiveSolarDate);
        chart = calculateBirthChart(effectiveSolarDate);
        nameAnalysis = calculateNameNumbers(name);
        pinnacles = calculatePinnacles(effectiveSolarDate, lp.lifePath);
        personalYear = calculatePersonalYear(effectiveSolarDate);
    }

    // Đọc dữ liệu diễn giải từ Gói 1
    const interp = await getInterpretationData(lp.lifePath);

    return (
        <main className="min-h-screen bg-[#F8F7F4] text-[#1C1B22] py-8 antialiased selection:bg-[#5146A5] selection:text-white">
            <div className="page-container space-y-8">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between bg-[#FAF8F4] p-4 rounded-xl border border-[#E8E5DF]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#2C2A29] text-[#FBF9F5] flex items-center justify-center font-serif text-sm">
                            <i className="fa-solid fa-scroll"></i>
                        </div>
                        <span className="text-base font-serif font-bold text-[#2C2A29] hidden sm:inline tracking-tight">
                            Báo Cáo Phân Tích Thần Số Học {isVip && '• (ĐÃ MỞ KHÓA TRỌN ĐỜI)'}
                        </span>
                    </div>

                    <ReportActions isVip={isVip} />
                </div>

                {/* Khối 1: Con số Chủ đạo, Ma trận ngày sinh, Luận giải học thuật */}
                <Suspense fallback={<BlockSkeleton title="Đang nạp dữ liệu Con số Chủ đạo & Ma trận 3x3..." />}>
                    <BlockOneFree
                        lp={lp}
                        chart={chart}
                        interp={interp}
                        name={name}
                        rawDob={rawDob}
                        solarDob={effectiveSolarDate}
                        isLunar={isLunar}
                    />
                </Suspense>

                {/* Khối 2: Bộ ba chỉ số họ tên */}
                <Suspense fallback={<BlockSkeleton title="Đang tính toán bộ ba chỉ số họ tên..." />}>
                    <BlockTwoFree nameAnalysis={nameAnalysis} />
                </Suspense>

                {/* Khối 3: 4 Đỉnh cao & Năm cá nhân */}
                <Suspense fallback={<BlockSkeleton title="Đang chuẩn bị dự báo 4 Đỉnh cao & Năm cá nhân..." />}>
                    <BlockThreeVip pinnacles={pinnacles} personalYear={personalYear} isVip={isVip} />
                </Suspense>

                {/* Chân trang & Miễn trừ trách nhiệm */}
                <footer className="pt-8 pb-4 text-center text-xs text-[#7C7872] space-y-2 border-t border-[#E8E5DF]">
                    <p className="max-w-2xl mx-auto leading-[1.8]">
                        <strong>Tuyên bố miễn trừ trách nhiệm:</strong> Mọi thông tin phân tích mang tính chất tham khảo, chiêm nghiệm và định hướng phát triển cá nhân; không thay thế cho các chẩn đoán y tế hoặc tư vấn pháp lý, tài chính.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-1 text-[#7C7872]">
                        <span>© 2026 Thần Số Học Pythagoras</span>
                        <span>•</span>
                        <a href="/terms" className="text-[#2C2A29] hover:underline">
                            Điều khoản dịch vụ & Miễn trừ trách nhiệm
                        </a>
                    </div>
                </footer>
            </div>
        </main>
    );
}
