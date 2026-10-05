/**
 * Advanced Retention Features Engine (Gói 8)
 * 1. Relationship Matrix (Bản đồ tương hợp Cặp đôi / Đối tác)
 * 2. Daily / Monthly Energy Tracker (Theo dõi năng lượng Ngày & Tháng cá nhân)
 * 3. Name Optimization Engine (Gợi ý tên bù khuyết mũi tên trống)
 */

import {
    calculateLifePath,
    calculateNameNumbers,
    calculateBirthChart,
    reduceNumber,
    PYTHAGOREAN_MAP,
    normalizeVietnamese
} from './calculator';

// ----------------------------------------------------------------------
// 1. Relationship Matrix (Bản đồ Tương Hợp Cặp Đôi / Đối Tác)
// ----------------------------------------------------------------------

export interface CompatibilityAspect {
    label: string;
    num1: number;
    num2: number;
    score: number; // 0 - 100
    description: string;
}

export interface CoupleCompatibilityResult {
    person1: { name: string; dob: string; lifePath: number; soulUrge: number; expression: number };
    person2: { name: string; dob: string; lifePath: number; soulUrge: number; expression: number };
    overallScore: number;
    harmonyLevel: 'TUYỆT VỜI' | 'HÒA HỢP TỐT' | 'TRUNG TÍNH BỔ TRỢ' | 'THỬ THÁCH CẦN HỌC HỎI';
    aspects: {
        lifePathMatch: CompatibilityAspect;
        soulUrgeMatch: CompatibilityAspect;
        communicationMatch: CompatibilityAspect;
    };
    relationshipLesson: string;
    actionableAdvice: string[];
}

// Bảng quan hệ hòa hợp tự nhiên giữa các con số chủ đạo (Pythagoras)
const COMPATIBILITY_MATRIX: Record<number, { best: number[]; good: number[]; challenge: number[] }> = {
    1: { best: [1, 5, 7], good: [3, 9], challenge: [4, 6, 8] },
    2: { best: [2, 4, 8], good: [6, 9], challenge: [5, 7] },
    3: { best: [3, 6, 9], good: [1, 5], challenge: [4, 7, 8] },
    4: { best: [2, 4, 8], good: [6, 7], challenge: [1, 3, 5] },
    5: { best: [1, 5, 7], good: [3, 9], challenge: [2, 4, 6] },
    6: { best: [3, 6, 9], good: [2, 4, 8], challenge: [1, 5, 7] },
    7: { best: [1, 5, 7], good: [4, 9], challenge: [2, 3, 6, 8] },
    8: { best: [2, 4, 8], good: [6], challenge: [1, 3, 5, 7, 9] },
    9: { best: [3, 6, 9], good: [1, 2, 5], challenge: [4, 8] },
    11: { best: [2, 4, 8, 11], good: [6, 9], challenge: [5, 7] },
    22: { best: [4, 8, 22], good: [2, 6], challenge: [1, 3, 5] },
    33: { best: [6, 9, 33], good: [3, 2], challenge: [1, 7] }
};

function calculatePairScore(n1: number, n2: number): { score: number; description: string } {
    const r1 = reduceNumber(n1, false);
    const r2 = reduceNumber(n2, false);

    if (r1 === r2) {
        return {
            score: 95,
            description: 'Đồng điệu tư duy, thấu hiểu nhau nhanh chóng nhưng cần tôn trọng khoảng không gian độc lập.'
        };
    }

    const config = COMPATIBILITY_MATRIX[r1] || { best: [], good: [], challenge: [] };
    if (config.best.includes(r2)) {
        return {
            score: 90,
            description: 'Cặp đôi tương hỗ tự nhiên, dễ dàng nâng đỡ và khơi gợi thế mạnh tiềm ẩn của nhau.'
        };
    }
    if (config.good.includes(r2)) {
        return {
            score: 80,
            description: 'Mối quan hệ hài hòa, có thể đồng hành lâu dài khi biết chia sẻ góc nhìn cởi mở.'
        };
    }
    return {
        score: 65,
        description: 'Mối quan hệ mang tính bài học phát triển; sự khác biệt đòi hỏi đối thoại kiên nhẫn và bao dung.'
    };
}

export function calculateCoupleCompatibility(
    p1: { name: string; dob: string },
    p2: { name: string; dob: string }
): CoupleCompatibilityResult {
    const lp1 = calculateLifePath(p1.dob);
    const lp2 = calculateLifePath(p2.dob);

    const name1 = calculateNameNumbers(p1.name);
    const name2 = calculateNameNumbers(p2.name);

    const lpMatch = calculatePairScore(lp1.lifePath, lp2.lifePath);
    const soulMatch = calculatePairScore(name1.soulUrgeNumber, name2.soulUrgeNumber);
    const commMatch = calculatePairScore(name1.expressionNumber, name2.expressionNumber);

    const overallScore = Math.round((lpMatch.score * 0.45) + (soulMatch.score * 0.3) + (commMatch.score * 0.25));

    let harmonyLevel: CoupleCompatibilityResult['harmonyLevel'];
    if (overallScore >= 88) harmonyLevel = 'TUYỆT VỜI';
    else if (overallScore >= 78) harmonyLevel = 'HÒA HỢP TỐT';
    else if (overallScore >= 68) harmonyLevel = 'TRUNG TÍNH BỔ TRỢ';
    else harmonyLevel = 'THỬ THÁCH CẦN HỌC HỎI';

    const relationshipLesson = `Hành trình giữa người số ${lp1.lifePath} và người số ${lp2.lifePath} là bài học về sự ${
        lp1.lifePath === lp2.lifePath ? 'thấu cảm sâu sắc và đồng điệu tâm hồn' : 'bù trừ khuyết điểm và tôn trọng cá tính riêng biệt'
    }. Cả hai đến với nhau để cùng hoàn thiện bản thân thay vì cố gắng thay đổi đối phương.`;

    const actionableAdvice = [
        `Dành thời gian lắng nghe chủ động khi thảo luận các quyết định chung.`,
        `Thấu hiểu ngôn ngữ tình cảm: Người số ${name1.soulUrgeNumber} tìm kiếm ${name1.soulUrgeNumber % 2 === 0 ? 'sự an toàn' : 'sự tự do'}, người số ${name2.soulUrgeNumber} tìm kiếm ${name2.soulUrgeNumber % 2 === 0 ? 'sự gắn kết' : 'sự thấu cảm'}.`,
        `Thiết lập ranh giới tôn trọng sở thích cá nhân để nuôi dưỡng cảm hứng đồng hành lâu dài.`
    ];

    return {
        person1: {
            name: name1.normalizedName,
            dob: p1.dob,
            lifePath: lp1.lifePath,
            soulUrge: name1.soulUrgeNumber,
            expression: name1.expressionNumber
        },
        person2: {
            name: name2.normalizedName,
            dob: p2.dob,
            lifePath: lp2.lifePath,
            soulUrge: name2.soulUrgeNumber,
            expression: name2.expressionNumber
        },
        overallScore,
        harmonyLevel,
        aspects: {
            lifePathMatch: {
                label: 'Hòa hợp Con số Chủ đạo (Định hướng)',
                num1: lp1.lifePath,
                num2: lp2.lifePath,
                score: lpMatch.score,
                description: lpMatch.description
            },
            soulUrgeMatch: {
                label: 'Hòa hợp Linh hồn (Cảm xúc sâu kín)',
                num1: name1.soulUrgeNumber,
                num2: name2.soulUrgeNumber,
                score: soulMatch.score,
                description: soulMatch.description
            },
            communicationMatch: {
                label: 'Hòa hợp Sứ mệnh & Giao tiếp (Hành vi)',
                num1: name1.expressionNumber,
                num2: name2.expressionNumber,
                score: commMatch.score,
                description: commMatch.description
            }
        },
        relationshipLesson,
        actionableAdvice
    };
}

// ----------------------------------------------------------------------
// 2. Daily & Monthly Energy Tracker (Theo dõi năng lượng Ngày & Tháng)
// ----------------------------------------------------------------------

export interface EnergyDayInfo {
    dateStr: string; // YYYY-MM-DD
    day: number;
    personalDay: number;
    keyword: string;
    advice: string;
}

export interface MonthlyEnergyResult {
    year: number;
    month: number;
    personalYear: number;
    personalMonth: number;
    personalMonthTheme: string;
    personalMonthAdvice: string;
    currentDayEnergy: EnergyDayInfo;
    monthCalendar: EnergyDayInfo[];
}

const MONTH_THEMES: Record<number, { theme: string; advice: string }> = {
    1: { theme: 'Khởi đầu mới & Khai mở dự án', advice: 'Tập trung gieo hạt giống, mạnh dạn bắt đầu thói quen hoặc công việc mới.' },
    2: { theme: 'Cân bằng, kiên nhẫn & Hợp tác', advice: 'Lắng nghe trực giác, củng cố mối quan hệ và hạn chế các tranh cãi bốc đồng.' },
    3: { theme: 'Sáng tạo, giao tiếp & Tự biểu đạt', advice: 'Thời điểm tuyệt vời cho nghệ thuật, học tập, mở rộng mạng lưới giao lưu.' },
    4: { theme: 'Kỷ luật, sức khỏe & Xây dựng nền tảng', advice: 'Tập trung hoàn thành quy trình, sắp xếp tài chính và chăm sóc cơ thể.' },
    5: { theme: 'Linh hoạt, thay đổi & Nắm bắt cơ hội', advice: 'Đón nhận các trải nghiệm bất ngờ, đi du lịch hoặc học kỹ năng mới.' },
    6: { theme: 'Trách nhiệm, gia đình & Chăm sóc', advice: 'Dành tình cảm cho tổ ấm, hòa giải các hiểu lầm và làm đẹp không gian sống.' },
    7: { theme: 'Tĩnh lặng, chiêm nghiệm & Nâng cao trí tuệ', advice: 'Học hỏi chiều sâu, hạn chế đầu tư mạo hiểm, tìm về sự an định nội tâm.' },
    8: { theme: 'Hiệu quả, thành tựu tài chính & Làm chủ', advice: 'Thời điểm hành động quyết đoán, thúc đẩy kinh doanh và gặt hái thành quả.' },
    9: { theme: 'Hoàn tất chu kỳ, thanh lọc & Buông bỏ', advice: 'Dọn dẹp công việc dở dang, tha thứ và chuẩn bị cho một chương mới.' }
};

const DAY_KEYWORDS: Record<number, { keyword: string; advice: string }> = {
    1: { keyword: 'Chủ động khởi xướng', advice: 'Thích hợp cho bắt đầu dự án, độc lập giải quyết vấn đề.' },
    2: { keyword: 'Lắng nghe & Hòa giải', advice: 'Nên làm việc nhóm, đàm phán ôn hòa và chăm sóc cảm xúc.' },
    3: { keyword: 'Niềm vui & Sáng tạo', advice: 'Thích hợp viết lách, giao tiếp xã hội và chia sẻ ý tưởng.' },
    4: { keyword: 'Thực tế & Tổ chức', advice: 'Lập kế hoạch chi tiết, xử lý giấy tờ và quản lý tài chính.' },
    5: { keyword: 'Tự do & Khám phá', advice: 'Linh hoạt ứng biến, đón nhận cơ hội mới và thay đổi không khí.' },
    6: { keyword: 'Yêu thương & Gắn kết', advice: 'Dành trọn buổi tối cho gia đình hoặc giúp đỡ người thân.' },
    7: { keyword: 'Tĩnh tâm & Nghiên cứu', advice: 'Dành thời gian đọc sách, thiền định và quan sát bản thân.' },
    8: { keyword: 'Năng suất & Quyết đoán', advice: 'Xử lý các giao dịch tài chính quan trọng, khẳng định bản lĩnh.' },
    9: { keyword: 'Bao dung & Hoàn thành', advice: 'Đóng gói các đầu việc cũ, bỏ qua chuyện nhỏ nhặt.' }
};

export function calculateDailyMonthlyEnergy(dob: string, targetDate: Date = new Date()): MonthlyEnergyResult {
    const parts = dob.trim().split(/[-/]/);
    let birthMonth: number;
    let birthDay: number;

    if (parts[0].length === 4) {
        birthMonth = parseInt(parts[1], 10);
        birthDay = parseInt(parts[2], 10);
    } else {
        birthDay = parseInt(parts[0], 10);
        birthMonth = parseInt(parts[1], 10);
    }

    const redBirthDay = reduceNumber(birthDay, false);
    const redBirthMonth = reduceNumber(birthMonth, false);

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const currentDay = targetDate.getDate();

    // Personal Year = redDay + redMonth + redTargetYear
    const yearDigitsSum = year.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const redYear = reduceNumber(yearDigitsSum, false);
    const personalYear = reduceNumber(redBirthDay + redBirthMonth + redYear, false);

    // Personal Month = reduce(PersonalYear + month)
    const personalMonth = reduceNumber(personalYear + month, false);

    // Tính cho cả tháng
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthCalendar: EnergyDayInfo[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
        const personalDay = reduceNumber(personalMonth + d, false);
        const dayMeta = DAY_KEYWORDS[personalDay] || { keyword: 'Năng lượng cân bằng', advice: 'Tiếp tục hành trình.' };
        const pad = (n: number) => n.toString().padStart(2, '0');

        monthCalendar.push({
            dateStr: `${year}-${pad(month)}-${pad(d)}`,
            day: d,
            personalDay,
            keyword: dayMeta.keyword,
            advice: dayMeta.advice
        });
    }

    const currentDayEnergy = monthCalendar[currentDay - 1] || monthCalendar[0];
    const monthData = MONTH_THEMES[personalMonth] || {
        theme: 'Tháng nâng cấp bản thân',
        advice: 'Tập trung phát huy nội lực.'
    };

    return {
        year,
        month,
        personalYear,
        personalMonth,
        personalMonthTheme: monthData.theme,
        personalMonthAdvice: monthData.advice,
        currentDayEnergy,
        monthCalendar
    };
}

// ----------------------------------------------------------------------
// 3. Name Optimization Engine (Gợi Ý Tên Danh Xưng & Tên Thương Hiệu)
// ----------------------------------------------------------------------

export interface NameSuggestion {
    suggestedName: string;
    category: 'BABY' | 'BRAND';
    meaning: string;
    pythagoreanNumbersAdded: number[];
    filledArrows: string[];
    balanceScoreAfter: number; // 0 - 100
}

const VIETNAMESE_SUGGESTION_BANK = [
    // Tên con có các số bổ trợ:
    { name: 'Khánh An', cat: 'BABY', meaning: 'Bình an, hoan hỷ, mang số 2, 1, 5, 8 bổ trợ trục cảm xúc và thực tế.' },
    { name: 'Minh Triết', cat: 'BABY', meaning: 'Trí tuệ sáng suốt, mang số 4, 9, 2, 5 củng cố trục ý chí 4-5-6.' },
    { name: 'Gia Bảo', cat: 'BABY', meaning: 'Báu vật gia đình, bổ trợ các số 7, 1, 2, 6 cho trục thể chất và yêu thương.' },
    { name: 'Nhật Quang', cat: 'BABY', meaning: 'Ánh dương rực rỡ, bổ sung số 5, 1, 8, 3 tạo nên sự tự tin và quyết tâm.' },
    { name: 'Thanh Vân', cat: 'BABY', meaning: 'Thanh tao, tự do, bổ sung các số 2, 8, 1, 4 hoàn thiện biểu đồ cân bằng.' },
    { name: 'Tuấn Kiệt', cat: 'BABY', meaning: 'Xuất chúng, kiệt xuất, mang số 2, 3, 5, 2 bổ sung trục trí tuệ 3-6-9.' },
    { name: 'Hải Đăng', cat: 'BABY', meaning: 'Ngọn hải đăng dẫn lối, bổ trợ số 8, 1, 9, 4, 7 lấp đầy trục thực tế 1-4-7.' },

    // Tên thương hiệu:
    { name: 'VinaTech Global', cat: 'BRAND', meaning: 'Thương hiệu công nghệ vững vàng, bổ trợ các số 4, 5, 7, 3 củng cố hệ thống.' },
    { name: 'An Gia Phát', cat: 'BRAND', meaning: 'An cư lạc nghiệp, phát triển tài lộc, bổ sung số 1, 7, 8, 1 củng cố trục tài chính 8.' },
    { name: 'Nova Smart', cat: 'BRAND', meaning: 'Đổi mới thông minh, bổ trợ số 5, 6, 4, 1 kích hoạt năng lượng bứt phá.' },
    { name: 'Zenith Labs', cat: 'BRAND', meaning: 'Đỉnh cao sáng tạo, bổ sung các số 8, 5, 9, 3 kích hoạt trục trí tuệ.' },
    { name: 'Eco Life Nature', cat: 'BRAND', meaning: 'Môi trường sinh thái bền vững, bổ sung số 5, 3, 6 mang năng lượng chữa lành.' }
];

export function optimizeNamesForMissingArrows(
    dob: string,
    category: 'BABY' | 'BRAND' = 'BABY'
): {
    dobChart: ReturnType<typeof calculateBirthChart>;
    missingNumbers: number[];
    emptyArrows: string[];
    suggestions: NameSuggestion[];
} {
    const dobChart = calculateBirthChart(dob);

    // Tìm các số vắng mặt (count = 0)
    const missingNumbers: number[] = [];
    for (let i = 1; i <= 9; i++) {
        if (dobChart.digitCounts[i] === 0) {
            missingNumbers.push(i);
        }
    }

    const emptyArrowNames = dobChart.emptyArrows.map((a) => a.name);

    // Tính toán các gợi ý bù khuyết
    const filteredBank = VIETNAMESE_SUGGESTION_BANK.filter((item) => item.cat === category);

    const suggestions: NameSuggestion[] = filteredBank.map((item) => {
        const norm = normalizeVietnamese(item.name);
        const nameNumbersAdded: number[] = [];

        for (const char of norm) {
            const val = PYTHAGOREAN_MAP[char];
            if (val && !nameNumbersAdded.includes(val)) {
                nameNumbersAdded.push(val);
            }
        }

        // Kiểm tra xem tên này có bù được các số còn thiếu không
        const filledMissing = missingNumbers.filter((num) => nameNumbersAdded.includes(num));

        // Kiểm tra mũi tên nào được lấp đầy
        const filledArrows: string[] = [];
        for (const emptyArrow of dobChart.emptyArrows) {
            const digits = emptyArrow.digits;
            const canFill = digits.every((d) => dobChart.digitCounts[d] > 0 || nameNumbersAdded.includes(d));
            if (canFill) {
                filledArrows.push(emptyArrow.name);
            }
        }

        // Tính điểm cân bằng sau khi kết hợp
        const balanceScoreAfter = Math.min(
            98,
            Math.round(60 + filledMissing.length * 10 + filledArrows.length * 8)
        );

        return {
            suggestedName: item.name,
            category: item.cat as 'BABY' | 'BRAND',
            meaning: item.meaning,
            pythagoreanNumbersAdded: nameNumbersAdded.sort((a, b) => a - b),
            filledArrows,
            balanceScoreAfter
        };
    });

    // Sắp xếp theo điểm cân bằng cao nhất
    suggestions.sort((a, b) => b.balanceScoreAfter - a.balanceScoreAfter);

    return {
        dobChart,
        missingNumbers,
        emptyArrows: emptyArrowNames,
        suggestions: suggestions.slice(0, 5)
    };
}
