/**
 * Pure TypeScript Numerology Calculator Engine
 * Core calculations without any external libraries or UI dependencies.
 */

// ----------------------------------------------------------------------
// 1. Types & Interfaces
// ----------------------------------------------------------------------

export type LetterCategory = 'VOWEL' | 'CONSONANT';

export interface ClassifiedLetter {
    char: string;
    originalChar: string;
    category: LetterCategory;
    pythagoreanValue: number;
}

export interface ClassifiedWord {
    word: string;
    letters: ClassifiedLetter[];
}

export interface NameAnalysisResult {
    normalizedName: string;
    words: ClassifiedWord[];
    expressionNumber: number;
    soulUrgeNumber: number;
    personalityNumber: number;
}

export interface LifePathResult {
    birthDate: string; // YYYY-MM-DD
    reducedDay: number;
    reducedMonth: number;
    reducedYear: number;
    totalSum: number;
    lifePath: number;
    isMaster: boolean;
}

export interface ArrowInfo {
    id: string;
    name: string;
    digits: [number, number, number];
    meaning: string;
    type: 'FULL' | 'EMPTY';
}

export interface BirthChartResult {
    birthDate: string;
    digitCounts: Record<number, number>;
    matrix3x3: number[][]; // Row 1: [3,6,9], Row 2: [2,5,8], Row 3: [1,4,7]
    fullArrows: ArrowInfo[];
    emptyArrows: ArrowInfo[];
}

export interface PinnacleStage {
    pinnacleNumber: number;
    value: number;
    ageRange: string;
    theme: string;
    description: string;
}

export interface PinnaclesResult {
    firstPinnacleAge: number;
    pinnacles: PinnacleStage[];
}

export interface PersonalYearResult {
    year: number;
    personalYear: number;
    keyword: string;
    theme: string;
    forecast: string;
}

export interface KarmicDebtInfo {
    title: string;
    desc: string;
    lesson: string;
}

export interface NumerologyDetail {
    title: string;
    overview: string;
    strengths: string;
    weaknesses: string;
    lesson: string;
}

export interface NumberMeaning {
    vi: string;
    en: string;
}

export interface DensityInfo {
    label: string;
    desc: string;
    lesson: string;
}

export interface IsolatedOasisInfo {
    title: string;
    desc: string;
    lesson: string;
}

export interface ChallengeInfo {
    title: string;
    desc: string;
    lesson: string;
}

export interface MaturityInfo {
    title: string;
    desc: string;
}

export interface RationalThoughtInfo {
    title: string;
    desc: string;
}

export interface LifePathCompatItem {
    happy: number[];
    challenge: number[];
}

export interface ParentingGuidanceInfo {
    title: string;
    strengths: string;
    direction: string;
    advice: string;
}

export interface PinnacleMeaningInfo {
    title: string;
    desc: string;
    advice: string;
}

export interface VietnameseSyllable {
    syllable: string;
    gender: string;
    wuxing: string;
    meaning: string;
    score: number;
    sound: number;
    rarity: number;
    is_middle?: boolean;
}

export interface NameDictionaryItem {
    name: string;
    meaning: string;
    gender: string;
    wuxing: string;
    w_score: number;
    rarity: number;
    sound: number;
}

export interface KarmicDebtResult {
    value: number;
    karmicDebts: number[];
}

export interface RuleEngineLifePathResult {
    lifePath: number;
    lifePathMethod1: number;
    lifePathMethod2: number;
    rawSum: number;
    allDigitsSum: number;
    hasMaster: boolean;
    hasDebt: boolean;
    karmicDebts: number[];
}

export interface RuleEngineNameNumbersResult {
    expression: number;
    soulUrge: number;
    personality: number;
    expressionRaw: number;
    soulRaw: number;
    personalityRaw: number;
    hasDebt: boolean;
    karmicDebts: number[];
    exprKarmicDebts: number[];
    soulKarmicDebts: number[];
}

export interface DayOfBirthResult {
    birthday: number;
    rawDay: number;
    karmicDebts: number[];
}

export interface PersonalMetricsResult {
    personalYear: number;
    personalMonth: number;
    personalDay: number;
    targetYear: number;
    targetMonth: number;
    targetDay: number;
}

export interface ArrowGridItem {
    code: string;
    name: string;
    desc: string;
    isEmpty?: boolean;
}

export interface BirthGridResult {
    dobGrid: number[];
    nameGrid: number[];
    totalGrid: number[];
    activeArrows: ArrowGridItem[];
    emptyArrows: ArrowGridItem[];
}

export interface BodyMindSoulResult {
    body: number;
    soul: number;
    mind: number;
}

export interface NameDetailsResult {
    cornerstone: string;
    capstone: string;
    firstVowel: string;
    balance: number;
    hiddenPassion: number[];
    karmicLessons: number[];
}

export interface PinnacleCycleInfo {
    first: number;
    second: number;
    third: number;
}

export interface PinnacleStep {
    num: number;
    val: number;
    age: number | string;
}

export interface ChallengeStep {
    num: number;
    val: number;
}

export interface CyclesPinnaclesResult {
    cycles: PinnacleCycleInfo;
    pinnacles: PinnacleStep[];
    challenges: ChallengeStep[];
}

export interface FengShuiElementResult {
    element: string;
    detail: string;
    color: string;
}

export interface NguHanhCompatibilityResult {
    type: string;
    label: string;
    desc: string;
}

export interface CustomNameEvaluationResult {
    name: string;
    middle: VietnameseSyllable;
    first: VietnameseSyllable;
}

export interface NameBreakdown {
    numerologyMatch: number;
    missingCompensation: number;
    meaning: number;
    parentCompat: number;
    pronunciation: number;
    popularity: number;
    wishBonus: number;
    karmicPenalty: number;
}

export interface ScoredName {
    name: string;
    fullName: string;
    meaning: string;
    expression: number;
    soul: number;
    personality: number;
    filledNumbers: number[];
    filledCount: number;
    score: number;
    wuxing: string;
    hasMaster: boolean;
    hasDebt: boolean;
    breakdown: NameBreakdown;
    reasons: string[];
}

export interface IntelligenceScores {
    linguistic: number;
    logical: number;
    musical: number;
    bodily: number;
    spatial: number;
    interpersonal: number;
    intrapersonal: number;
    naturalist: number;
}

// ----------------------------------------------------------------------
// 2. Constants & Pythagorean Mapping
// ----------------------------------------------------------------------

export const PYTHAGOREAN_MAP: Record<string, number> = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
};

export const ACCENTS_MAP: Record<string, string> = {
    'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A', 'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A', 'Â': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
    'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E', 'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O', 'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O', 'Ơ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U', 'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
    'Đ': 'D', 'đ': 'D'
};

const STANDARD_VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// Master numbers that are not reduced in intermediate or final steps
export const MASTER_NUMBERS = [11, 22, 33];

export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];

export const ALL_ARROWS_CONFIG: Array<{
    id: string;
    name: string;
    emptyName: string;
    digits: [number, number, number];
    fullMeaning: string;
    emptyMeaning: string;
}> = [
    {
        id: 'PLANNING_123',
        name: 'Mũi tên Kế hoạch (1-2-3)',
        emptyName: 'Mũi tên Thiếu kế hoạch (1-2-3)',
        digits: [1, 2, 3],
        fullMeaning: 'Có khả năng hoạch định, tổ chức và sắp xếp công việc rõ ràng, trật tự.',
        emptyMeaning: 'Dễ làm việc theo cảm tính, gặp khó khăn trong việc lên kế hoạch dài hạn.'
    },
    {
        id: 'WILLPOWER_456',
        name: 'Mũi tên Ý chí (4-5-6)',
        emptyName: 'Mũi tên Uất giận / Thiếu ý chí (4-5-6)',
        digits: [4, 5, 6],
        fullMeaning: 'Sở hữu ý chí kiên định, sự bền bỉ và quyết tâm vượt qua trở ngại.',
        emptyMeaning: 'Dễ nản lòng trước nghịch cảnh hoặc tích tụ cảm xúc dồn nén.'
    },
    {
        id: 'ACTIVITY_789',
        name: 'Mũi tên Hoạt động (7-8-9)',
        emptyName: 'Mũi tên Thụ động (7-8-9)',
        digits: [7, 8, 9],
        fullMeaning: 'Năng động, thích hành động và trải nghiệm thực tiễn ngoài đời sống.',
        emptyMeaning: 'Xu hướng chậm trễ, thụ động hoặc thiếu động lực bắt tay vào hành động.'
    },
    {
        id: 'PRACTICAL_147',
        name: 'Mũi tên Thực tế (1-4-7)',
        emptyName: 'Mũi tên Hỗn loạn / Mơ mộng (1-4-7)',
        digits: [1, 4, 7],
        fullMeaning: 'Khéo léo, thực tế, tiếp thu bài học nhanh qua thực hành cụ thể.',
        emptyMeaning: 'Dễ mơ mộng xa rời thực tế hoặc khó quản lý cuộc sống thường nhật.'
    },
    {
        id: 'EMOTIONAL_258',
        name: 'Mũi tên Cân bằng cảm xúc (2-5-8)',
        emptyName: 'Mũi tên Nhạy cảm quá mức (2-5-8)',
        digits: [2, 5, 8],
        fullMeaning: 'Cảm xúc sâu sắc, biết cân bằng tâm lý và thấu hiểu lòng người.',
        emptyMeaning: 'Dễ bị tổn thương tinh thần, nhạy cảm quá mức trước thái độ của người khác.'
    },
    {
        id: 'INTELLECT_369',
        name: 'Mũi tên Sáng suốt / Trí tuệ (3-6-9)',
        emptyName: 'Mũi tên Trí nhớ ngắn hạn (3-6-9)',
        digits: [3, 6, 9],
        fullMeaning: 'Tư duy logic nhạy bén, khả năng ghi nhớ tốt và ham học hỏi.',
        emptyMeaning: 'Dễ đãng trí, cần rèn luyện sự tập trung và phương pháp ghi nhớ.'
    },
    {
        id: 'DETERMINATION_159',
        name: 'Mũi tên Quyết tâm (1-5-9)',
        emptyName: 'Mũi tên Trì hoãn (1-5-9)',
        digits: [1, 5, 9],
        fullMeaning: 'Kiên trì theo đuổi mục tiêu đến cùng, không dễ bỏ cuộc.',
        emptyMeaning: 'Dễ chần chừ, trì hoãn hoặc thiếu kiên định trước các quyết định quan trọng.'
    },
    {
        id: 'SPIRITUAL_357',
        name: 'Mũi tên Tâm linh / Trực giác (3-5-7)',
        emptyName: 'Mũi tên Hoài nghi (3-5-7)',
        digits: [3, 5, 7],
        fullMeaning: 'Trực giác tinh tế, có chiều sâu tâm linh và đức tin vào điều tốt đẹp.',
        emptyMeaning: 'Dễ hoài nghi mọi việc, chỉ tin vào những gì mắt thấy tai nghe.'
    }
];

// ----------------------------------------------------------------------
// 3. Static Databases & Dictionaries
// ----------------------------------------------------------------------

export const NAMES_DICTIONARY: NameDictionaryItem[] = [
    { name: "Minh Anh", meaning: "Sự anh minh, thông minh sáng suốt vượt trội.", gender: "Unisex", wuxing: "Hỏa", w_score: 25, rarity: 3, sound: 9 },
    { name: "Khánh Vy", meaning: "Sự tràn đầy sức sống, vui tươi, đức hạnh phong phú.", gender: "Nữ", wuxing: "Mộc", w_score: 23, rarity: 4, sound: 10 },
    { name: "Bảo Nam", meaning: "Cực kỳ quý giá, viên ngọc quý của gia đình phương Nam.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 3, sound: 8 },
    { name: "Gia Bảo", meaning: "Báu vật linh thiêng và trân quý của toàn gia đình.", gender: "Nam", wuxing: "Kim", w_score: 25, rarity: 4, sound: 9 },
    { name: "Anh Thư", meaning: "Nữ anh hùng trí tuệ, thông minh, yêu chuộng sách vở.", gender: "Nữ", wuxing: "Hỏa", w_score: 24, rarity: 5, sound: 9 },
    { name: "Thùy Dương", meaning: "Cây thùy dương cao lớn tràn ngập ánh dương ấm áp.", gender: "Nữ", wuxing: "Thủy", w_score: 22, rarity: 5, sound: 8 },
    { name: "Tấn Phát", meaning: "Phát triển không ngừng, đạt nhiều tài lộc và may mắn.", gender: "Nam", wuxing: "Hỏa", w_score: 23, rarity: 4, sound: 9 },
    { name: "Thanh Vân", meaning: "Áng mây xanh thanh tú tự do trôi trên nền trời.", gender: "Nữ", wuxing: "Thủy", w_score: 22, rarity: 5, sound: 10 },
    { name: "Tuấn Kiệt", meaning: "Xuất chúng vượt trội về tài năng kiệt xuất và vẻ tuấn tú.", gender: "Nam", wuxing: "Mộc", w_score: 25, rarity: 3, sound: 9 },
    { name: "Thái Sơn", meaning: "Vững chãi, kiên định như ngọn núi Thái Sơn vĩ đại.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 4, sound: 8 },
    { name: "Hà An", meaning: "Dòng sông êm đềm, thanh bình và luôn yên ả cát tường.", gender: "Nữ", wuxing: "Thủy", w_score: 23, rarity: 6, sound: 9 },
    { name: "Như Quỳnh", meaning: "Đẹp dịu dàng thanh tao như đóa hoa quỳnh nở về đêm.", gender: "Nữ", wuxing: "Mộc", w_score: 22, rarity: 4, sound: 9 },
    { name: "Nhật Minh", meaning: "Ánh sáng mặt trời chiếu rọi nhân gian bao la, trí tuệ lớn.", gender: "Nam", wuxing: "Hỏa", w_score: 25, rarity: 3, sound: 9 },
    { name: "Thảo Chi", meaning: "Cành cỏ thơm thanh nhã, mang lại sự dễ chịu cho đời.", gender: "Nữ", wuxing: "Mộc", w_score: 22, rarity: 6, sound: 9 },
    { name: "Bình An", meaning: "Suốt cuộc đời thong thả, bình yên, không chút sóng gió.", gender: "Unisex", wuxing: "Kim", w_score: 25, rarity: 2, sound: 8 },
    { name: "Đức Duy", meaning: "Chỉ duy trì tâm đức cao quý làm gốc rễ cho cuộc sống.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 5, sound: 9 },
    { name: "Hữu Phước", meaning: "Người có nhiều phước lành, đức độ độ trì cuộc đời.", gender: "Nam", wuxing: "Thủy", w_score: 23, rarity: 5, sound: 8 },
    { name: "Cát Tường", meaning: "Sự may mắn lành cát, như ý cát tường viên mãn.", gender: "Unisex", wuxing: "Thổ", w_score: 25, rarity: 4, sound: 9 },
    { name: "Phúc Lâm", meaning: "Phước đức ngập tràn như rừng cây tươi tốt xum xuê.", gender: "Nam", wuxing: "Mộc", w_score: 24, rarity: 4, sound: 8 },
    { name: "Quốc Anh", meaning: "Tinh anh của quốc gia, tấm lòng vĩ đại hiếu nghĩa.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 3, sound: 9 },
    { name: "Tâm An", meaning: "Tâm hồn luôn thư thái, tĩnh lặng, an vui tự tại.", gender: "Nữ", wuxing: "Thủy", w_score: 25, rarity: 5, sound: 9 },
    { name: "Minh Triết", meaning: "Trí tuệ uyên bác, thông thái sâu rộng nhìn xa trông rộng.", gender: "Nam", wuxing: "Hỏa", w_score: 25, rarity: 6, sound: 9 },
    { name: "Hoàng Yến", meaning: "Chim yến vàng quý tộc, lanh lợi, hoạt bát và hát hay.", gender: "Nữ", wuxing: "Kim", w_score: 23, rarity: 5, sound: 9 },
    { name: "Phan Minh Khuê", meaning: "Ngôi sao Khuê lấp lánh thông tuệ trên bầu trời học thuật.", gender: "Nữ", wuxing: "Mộc", w_score: 25, rarity: 6, sound: 10 }
];

export const VIETNAMESE_SYLLABLES: VietnameseSyllable[] = [
    { syllable: "An", gender: "Unisex", wuxing: "Thủy", meaning: "Bình an, yên ổn, cuộc sống thái bình.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Anh", gender: "Unisex", wuxing: "Hỏa", meaning: "Tinh anh, thông minh, kiệt xuất.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Bách", gender: "Nam", wuxing: "Mộc", meaning: "Vững chãi, trường tồn như cây tùng bách.", score: 24, sound: 8, rarity: 5 },
    { syllable: "Bảo", gender: "Unisex", wuxing: "Hỏa", meaning: "Bảo vật quý giá, trân quý.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Bình", gender: "Unisex", wuxing: "Kim", meaning: "Thanh bình, ôn hòa, êm ả.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Cát", gender: "Unisex", wuxing: "Thổ", meaning: "Cát tường, may mắn, tốt lành.", score: 24, sound: 8, rarity: 5 },
    { syllable: "Chi", gender: "Nữ", wuxing: "Mộc", meaning: "Cành cỏ thơm thanh nhã, quý phái.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Châu", gender: "Unisex", wuxing: "Thổ", meaning: "Viên ngọc lấp lánh, quý giá.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Cường", gender: "Nam", wuxing: "Mộc", meaning: "Mạnh mẽ, kiên cường, lực lưỡng.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Duy", gender: "Nam", wuxing: "Thổ", meaning: "Duy trì đức độ, tư duy nhạy bén.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Dũng", gender: "Nam", wuxing: "Hỏa", meaning: "Dũng cảm, can đảm, chí khí.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Dương", gender: "Unisex", wuxing: "Thủy", meaning: "Ánh dương rực rỡ hoặc biển cả rộng lớn.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Đạt", gender: "Nam", wuxing: "Hỏa", meaning: "Thành đạt, hoàn thành chí hướng.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Đức", gender: "Nam", wuxing: "Thổ", meaning: "Đạo đức, đức độ, tâm lành.", score: 24, sound: 8, rarity: 3, is_middle: true },
    { syllable: "Gia", gender: "Unisex", wuxing: "Kim", meaning: "Gia đình ấm áp, hưng thịnh.", score: 24, sound: 9, rarity: 4, is_middle: true },
    { syllable: "Giang", gender: "Unisex", wuxing: "Thủy", meaning: "Dòng sông dài chảy êm đềm.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Hà", gender: "Nữ", wuxing: "Thủy", meaning: "Dòng sông êm đềm, thanh bình.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Hải", gender: "Unisex", wuxing: "Thủy", meaning: "Biển cả bao la, khoáng đạt.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Hạnh", gender: "Nữ", wuxing: "Thủy", meaning: "Đức hạnh, hạnh phúc tròn đầy.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hiếu", gender: "Nam", wuxing: "Thủy", meaning: "Hiếu thảo, nhân đức, kính trên nhường dưới.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hoàng", gender: "Unisex", wuxing: "Hỏa", meaning: "Huy hoàng, rực rỡ, quý phái.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Huy", gender: "Nam", wuxing: "Hỏa", meaning: "Ánh sáng rực rỡ, huy hoàng, tốt đẹp.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Hùng", gender: "Nam", wuxing: "Thủy", meaning: "Hùng dũng, mạnh mẽ, chí lớn.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hương", gender: "Nữ", wuxing: "Thủy", meaning: "Hương thơm dịu dàng thanh tao.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Hữu", gender: "Nam", wuxing: "Thủy", meaning: "Hữu ích, sở hữu tài đức.", score: 23, sound: 8, rarity: 3, is_middle: true },
    { syllable: "Khánh", gender: "Unisex", wuxing: "Kim", meaning: "Niềm vui, hạnh phúc, đức hạnh tràn đầy.", score: 24, sound: 10, rarity: 4 },
    { syllable: "Khoa", gender: "Nam", wuxing: "Thủy", meaning: "Khoa học, học vấn cao, đỗ đạt.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Khôi", gender: "Nam", wuxing: "Mộc", meaning: "Khôi ngô tuấn tú, thông minh nổi bật.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Khuê", gender: "Nữ", wuxing: "Mộc", meaning: "Ngôi sao Khuê sáng ngời trí tuệ.", score: 25, sound: 10, rarity: 5 },
    { syllable: "Kiệt", gender: "Nam", wuxing: "Mộc", meaning: "Kiệt xuất, xuất chúng hơn người.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Lâm", gender: "Unisex", wuxing: "Mộc", meaning: "Rừng cây tươi tốt, vững chãi.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Linh", gender: "Unisex", wuxing: "Hỏa", meaning: "Linh hoạt, thông minh, kỳ diệu.", score: 24, sound: 10, rarity: 3 },
    { syllable: "Long", gender: "Nam", wuxing: "Thủy", meaning: "Rồng thiêng bay cao, mạnh mẽ, uy quyền.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Lộc", gender: "Nam", wuxing: "Mộc", meaning: "Tài lộc, thịnh vượng, phước lành.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Mai", gender: "Nữ", wuxing: "Mộc", meaning: "Hoa mai nở rộ, tương lai tươi sáng.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Minh", gender: "Unisex", wuxing: "Thủy", meaning: "Anh minh, sáng suốt, trí tuệ lớn.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Nam", gender: "Nam", wuxing: "Hỏa", meaning: "Phương Nam vững chãi, mạnh mẽ.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Nghĩa", gender: "Nam", wuxing: "Kim", meaning: "Trọng nghĩa tình, đạo lý sâu sắc.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Ngọc", gender: "Unisex", wuxing: "Thổ", meaning: "Viên ngọc thanh cao, trân quý.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Nguyên", gender: "Unisex", wuxing: "Thủy", meaning: "Nguyên vẹn, rộng lớn bao la.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Nguyệt", gender: "Nữ", wuxing: "Kim", meaning: "Vầng trăng dịu dàng, thanh khiết.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Nhân", gender: "Unisex", wuxing: "Mộc", meaning: "Nhân hậu, hiền từ, đạo đức cao quý.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Nhật", gender: "Unisex", wuxing: "Hỏa", meaning: "Mặt trời chiếu sáng rực rỡ, ấm áp.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Nhi", gender: "Nữ", wuxing: "Thủy", meaning: "Nhỏ nhắn, hoạt bát, dễ thương.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Như", gender: "Nữ", wuxing: "Kim", meaning: "Như ý, dịu dàng, nết na.", score: 23, sound: 9, rarity: 3, is_middle: true },
    { syllable: "Phong", gender: "Nam", wuxing: "Thổ", meaning: "Ngọn gió phóng khoáng, tự do.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Phú", gender: "Nam", wuxing: "Thủy", meaning: "Phú quý, giàu sang, tài năng phú bẩm.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Phúc", gender: "Nam", wuxing: "Hỏa", meaning: "Phước lành tốt đẹp, cát tường.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Phương", gender: "Unisex", wuxing: "Thủy", meaning: "Hướng đi đúng đắn, hương thơm dịu nhẹ.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Quân", gender: "Nam", wuxing: "Thủy", meaning: "Chính trực, anh minh như bậc quân vương.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Quang", gender: "Nam", wuxing: "Hỏa", meaning: "Ánh sáng rực rỡ, tương lai sáng lạng.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Quốc", gender: "Nam", wuxing: "Thổ", meaning: "Quốc gia đại sự, chí khí lớn.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Quỳnh", gender: "Nữ", wuxing: "Mộc", meaning: "Đóa hoa quỳnh thanh tao, quý phái.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Sơn", gender: "Nam", wuxing: "Thổ", meaning: "Núi non vững chãi, kiên định vĩ đại.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Thảo", gender: "Nữ", wuxing: "Mộc", meaning: "Cỏ xanh tươi mát, hiếu thảo.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Thái", gender: "Nam", wuxing: "Hỏa", meaning: "Thái bình, an khang, thư thả.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Thanh", gender: "Unisex", wuxing: "Kim", meaning: "Trong sáng, thanh tao, thanh lịch.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Thành", gender: "Nam", wuxing: "Kim", meaning: "Thành công, chân thành, vững chãi.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Thiên", gender: "Unisex", wuxing: "Hỏa", meaning: "Trời rộng bao la, ý chí lớn lao.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Thịnh", gender: "Nam", wuxing: "Hỏa", meaning: "Hưng thịnh, phát đạt, sung túc.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Thị", gender: "Nữ", wuxing: "Thủy", meaning: "Truyền thống, dịu dàng, nết na.", score: 15, sound: 6, rarity: 1, is_middle: true },
    { syllable: "Thu", gender: "Nữ", wuxing: "Thủy", meaning: "Mùa thu êm đềm, dịu dàng, trong trẻo.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Thư", gender: "Nữ", wuxing: "Hỏa", meaning: "Thư thả, tâm hồn nho nhã, yêu văn học.", score: 24, sound: 9, rarity: 5 },
    { syllable: "Thương", gender: "Nữ", wuxing: "Kim", meaning: "Thương yêu, trắc ẩn, nhân ái.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Thủy", gender: "Nữ", wuxing: "Thủy", meaning: "Nước mát trong lành, uyển chuyển.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Tiến", gender: "Nam", wuxing: "Thủy", meaning: "Tiến bước vươn lên, chí hướng rộng mở.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Trang", gender: "Nữ", wuxing: "Kim", meaning: "Đoan trang, nghiêm túc, đài các.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Trọng", gender: "Nam", wuxing: "Thổ", meaning: "Trọng nghĩa, cốt cách quý tộc.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Trung", gender: "Nam", wuxing: "Thổ", meaning: "Trung thực, kiên định, đáng tin cậy.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Trúc", gender: "Nữ", wuxing: "Mộc", meaning: "Cây trúc thanh cao, kiên cường quân tử.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Tú", gender: "Unisex", wuxing: "Kim", meaning: "Thanh tú, lấp lánh như sao trời.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Tuấn", gender: "Nam", wuxing: "Mộc", meaning: "Tuấn tú, tài giỏi xuất chúng.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Tùng", gender: "Nam", wuxing: "Mộc", meaning: "Cây tùng vững vàng trước phong ba.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Tường", gender: "Unisex", wuxing: "Thổ", meaning: "Cát tường, thấu suốt mọi điều.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Uyên", gender: "Nữ", wuxing: "Thủy", meaning: "Uyên bác, duyên dáng, thông thái.", score: 25, sound: 9, rarity: 5 },
    { syllable: "Văn", gender: "Nam", wuxing: "Thủy", meaning: "Văn hóa, nho nhã, có học thức.", score: 18, sound: 7, rarity: 1, is_middle: true },
    { syllable: "Vân", gender: "Nữ", wuxing: "Thủy", meaning: "Mây trắng tự do trôi trên trời cao.", score: 22, sound: 10, rarity: 5 },
    { syllable: "Việt", gender: "Nam", wuxing: "Kim", meaning: "Ưu việt, thông minh bản lĩnh.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Vy", gender: "Nữ", wuxing: "Mộc", meaning: "Nhỏ nhắn đáng yêu, sinh khí tràn đầy.", score: 23, sound: 10, rarity: 4 },
    { syllable: "Xuân", gender: "Unisex", wuxing: "Kim", meaning: "Mùa xuân tươi mới, tràn ngập hy vọng.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Yên", gender: "Unisex", wuxing: "Thủy", meaning: "Tĩnh lặng, bình yên, nhẹ nhàng.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Yến", gender: "Nữ", wuxing: "Thủy", meaning: "Chim yến báo tin vui mùa xuân.", score: 23, sound: 9, rarity: 5 },

    // Expanded database
    { syllable: "Băng", gender: "Nữ", wuxing: "Thủy", meaning: "Trong trắng tinh khiết như băng tuyết.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Diệu", gender: "Nữ", wuxing: "Hỏa", meaning: "Tuyệt diệu, kỳ diệu, xuất chúng.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Hiền", gender: "Nữ", wuxing: "Thủy", meaning: "Hiền lành, đức hạnh, nhu mì.", score: 22, sound: 8, rarity: 3 },
    { syllable: "Hoa", gender: "Nữ", wuxing: "Mộc", meaning: "Hoa đẹp rực rỡ, phồn thịnh.", score: 22, sound: 9, rarity: 3 },
    { syllable: "Hồng", gender: "Nữ", wuxing: "Hỏa", meaning: "Hoa hồng đẹp tươi, rực rỡ, duyên dáng.", score: 22, sound: 8, rarity: 3 },
    { syllable: "Khuyên", gender: "Nữ", wuxing: "Kim", meaning: "Lời khuyên bổ ích, nhẫn nại, tâm lý.", score: 22, sound: 9, rarity: 5 },
    { syllable: "Lan", gender: "Nữ", wuxing: "Mộc", meaning: "Hoa lan thanh tao, quý phái, thơm ngát.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Loan", gender: "Nữ", wuxing: "Hỏa", meaning: "Phượng loan uy nghi, tài hoa, quý phái.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Nga", gender: "Nữ", wuxing: "Thủy", meaning: "Dáng vẻ uyển chuyển đẹp như chim nga.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Ngân", gender: "Nữ", wuxing: "Kim", meaning: "Tiếng ngân vang trong trẻo, bạc trắng.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Ngọt", gender: "Nữ", wuxing: "Thổ", meaning: "Ngọt ngào dịu dàng, chan chứa yêu thương.", score: 22, sound: 8, rarity: 5 },
    { syllable: "Nương", gender: "Nữ", wuxing: "Thủy", meaning: "Nương tựa vững chắc, hiền hòa.", score: 21, sound: 8, rarity: 5 },
    { syllable: "Oanh", gender: "Nữ", wuxing: "Hỏa", meaning: "Chim oanh hót hay, tài năng âm nhạc.", score: 22, sound: 9, rarity: 5 },
    { syllable: "Phấn", gender: "Nữ", wuxing: "Thổ", meaning: "Phấn khởi, hăng hái, nhiệt tình.", score: 22, sound: 8, rarity: 5 },
    { syllable: "Tâm", gender: "Nữ", wuxing: "Hỏa", meaning: "Tâm hồn thuần khiết, tình yêu thương.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Thắm", gender: "Nữ", wuxing: "Hỏa", meaning: "Thắm đỏ rực rỡ, tình cảm nồng nàn.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Thi", gender: "Nữ", wuxing: "Hỏa", meaning: "Thi thơ lãng mạn, tâm hồn nghệ sĩ.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Trâm", gender: "Nữ", wuxing: "Kim", meaning: "Chiếc trâm cài tóc quý phái, duyên dáng.", score: 23, sound: 8, rarity: 5 },
    { syllable: "Trinh", gender: "Nữ", wuxing: "Kim", meaning: "Trinh trắng, trong sáng, thuần khiết.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Uyển", gender: "Nữ", wuxing: "Thủy", meaning: "Uyển chuyển, mềm mại, khéo léo.", score: 24, sound: 9, rarity: 5 },

    // Nam
    { syllable: "Bảo Long", gender: "Nam", wuxing: "Thủy", meaning: "Rồng quý giá, tài năng phi thường.", score: 25, sound: 9, rarity: 5 },
    { syllable: "Chí", gender: "Nam", wuxing: "Hỏa", meaning: "Chí lớn, hoài bão, ý chí kiên định.", score: 23, sound: 8, rarity: 4, is_middle: true },
    { syllable: "Đăng", gender: "Nam", wuxing: "Hỏa", meaning: "Ánh đèn soi sáng, vươn lên cao.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hào", gender: "Nam", wuxing: "Hỏa", meaning: "Hào hiệp, hào kiệt, chí khí lớn.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Hưng", gender: "Nam", wuxing: "Hỏa", meaning: "Hưng thịnh, phát triển mạnh mẽ.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Khải", gender: "Nam", wuxing: "Kim", meaning: "Khải hoàn, chiến thắng vang danh.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Mạnh", gender: "Nam", wuxing: "Mộc", meaning: "Mạnh mẽ, cường tráng, vượt trội.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Quý", gender: "Nam", wuxing: "Kim", meaning: "Quý giá, trân trọng, hiếm có.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Tài", gender: "Nam", wuxing: "Thổ", meaning: "Tài năng vượt trội, tài lộc phong phú.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Thắng", gender: "Nam", wuxing: "Hỏa", meaning: "Chiến thắng, vượt khó, xứng đáng.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Trí", gender: "Nam", wuxing: "Hỏa", meaning: "Trí tuệ sắc bén, thông minh lanh lợi.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Trường", gender: "Nam", wuxing: "Thủy", meaning: "Trường thọ, lâu dài, sự nghiệp vững bền.", score: 23, sound: 8, rarity: 4 },

    // Unisex
    { syllable: "Ân", gender: "Unisex", wuxing: "Thủy", meaning: "Ân huệ, ơn nghĩa, tình sâu nghĩa nặng.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Bình Minh", gender: "Unisex", wuxing: "Hỏa", meaning: "Bình minh rạng rỡ, hy vọng mới.", score: 25, sound: 10, rarity: 5 },
    { syllable: "Đan", gender: "Unisex", wuxing: "Hỏa", meaning: "Màu son đỏ đẹp, tấm lòng son sắt.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Hòa", gender: "Unisex", wuxing: "Thổ", meaning: "Hòa bình, hòa thuận, hài hòa.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Huyền", gender: "Nữ", wuxing: "Thủy", meaning: "Huyền diệu, bí ẩn cuốn hút.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Mỹ", gender: "Nữ", wuxing: "Kim", meaning: "Xinh đẹp, mỹ miều, tốt đẹp.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Phi", gender: "Unisex", wuxing: "Hỏa", meaning: "Bay cao, vượt trội, phi thường.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Quân Anh", gender: "Unisex", wuxing: "Hỏa", meaning: "Anh hùng quân tử, tài ba lỗi lạc.", score: 25, sound: 9, rarity: 5 },
    { syllable: "Sáng", gender: "Unisex", wuxing: "Hỏa", meaning: "Sáng suốt, rực rỡ, khai sáng.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Tân", gender: "Unisex", wuxing: "Kim", meaning: "Mới mẻ, tươi tắn, đổi mới.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Vinh", gender: "Unisex", wuxing: "Hỏa", meaning: "Vinh quang, rực rỡ, thịnh vượng.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Vĩnh", gender: "Nam", wuxing: "Thủy", meaning: "Vĩnh cửu, trường tồn, bất diệt.", score: 23, sound: 8, rarity: 4 }
];

export const KARMIC_DEBT_INFO: Record<number, KarmicDebtInfo> = {
    13: {
        title: "Nợ nghiệp 13/4: Nghiệp Lười Biếng / Trốn Tránh",
        desc: "Nguyên nhân tiền kiếp: Đã từng lười nhác, đùn đẩy trách nhiệm, sống tâm gửi hoặc lợi dụng công sức lao động của người khác. Biểu hiện kiếp này: Gặp rất nhiều rào cản, việc gì cũng phải nỗ lực gấp đôi người khác mới thành. Bản thân dễ rơi vào trạng thái trì trệ, cả thèm chóng chán.",
        lesson: "Tuyệt đối không được đi đường tắt. Phải rèn luyện tính kỷ luật thép, làm việc tỉ mỉ, kiên trì, đối mặt trực diện với khó khăn."
    },
    14: {
        title: "Nợ nghiệp 14/5: Nghiệp Lạm Dụng Tự Do / Tổn Hại Niềm Tin",
        desc: "Nguyên nhân tiền kiếp: Lạm dụng sự tự do cá nhân để thỏa mãn đam mê ích kỷ, gây tổn thương hoặc tước đoạt sự tự do của người khác. Biểu hiện kiếp này: Cuộc sống thường xuyên gặp những biến cố bất ngờ làm đảo lộn kế hoạch. Dễ sa ngã vào các cơn nghiện (game, chất kích thích, mua sắm) hoặc các mối quan hệ độc hại.",
        lesson: "Học cách cam kết và tự kiểm soát hành vi. Rèn luyện lối sống lành mạnh, tìm kiếm sự tự do trong tâm trí thay vì buông thả thể xác."
    },
    16: {
        title: "Nợ nghiệp 16/7: Nghiệp Hủy Hoại / Ngạo Mạn Tình Ái",
        desc: "Nguyên nhân tiền kiếp: Sống vô cảm, chà đạp lên tình cảm của người khác, hoặc dùng quyền lực/sự ngạo mạn để phá hoại sự bình yên của người xung quanh. Biểu hiện kiếp này: Trải qua những cú sụp đổ mang tính 'tái sinh' (đổ vỡ hôn nhân đột ngột, phá sản, mất mát người thân). Cái tôi thường bị tổn thương sâu sắc.",
        lesson: "Học cách khiêm nhường, hạ cái tôi xuống. Quay vào bên trong để thức tỉnh tâm linh, thấu hiểu quy luật nhân quả và bao dung với tổn thương."
    },
    19: {
        title: "Nợ nghiệp 19/1: Nghiệp Lạm Dụng Quyền Lực / Ích Kỷ",
        desc: "Nguyên nhân tiền kiếp: Đứng ở vị trí cao nhưng độc đoán, thao túng, chỉ biết nghĩ đến lợi ích bản thân và phớt lờ tiếng nói của người yếu thế. Biểu hiện kiếp này: Thường rơi vào cảnh đơn độc, tự lực cánh sinh, khó tìm được sự trợ giúp từ quý nhân kể cả lúc ngặt nghèo nhất. Thường bị người khác hiểu lầm hoặc cô lập.",
        lesson: "Học cách tự lập một cách kiên cường nhưng không cô lập bản thân. Chủ động giúp đỡ người khác mà không mong cầu đền đáp, học cách lắng nghe và phụng sự."
    }
};

export const NUMEROLOGY_DETAILS: Record<number, NumerologyDetail> = {
    1: {
        title: "Số 1: Nhà Tiên Phong Độc Lập",
        overview: "Đại diện cho năng lượng gốc, sự khởi đầu, lòng định kiến, cái tôi và năng lực lãnh đạo độc lập.",
        strengths: "Kiên định, tự lực cánh sinh, quyết đoán, có khả năng dẫn dắt và mở đường.",
        weaknesses: "Độc đoán, ích kỷ, cứng đầu, đôi khi quá tự phụ và cô độc.",
        lesson: "Học cách lắng nghe ý kiến đóng góp của người khác, kiềm chế cái tôi cá nhân, chuyển đổi từ tư duy 'Tôi là nhất' sang tư duy phối hợp đội nhóm."
    },
    2: {
        title: "Số 2: Sứ Giả Hòa Bình & Kết Nối",
        overview: "Đại diện cho sự trực giác, nhạy cảm, lòng trắc ẩn, khả năng ngoại giao và kết nối đồng thuận.",
        strengths: "Lắng nghe tốt, hòa nhã, có khả năng hòa giải mâu thuẫn, trực giác cực kỳ nhạy bén.",
        weaknesses: "Dễ bị tổn thương, phụ thuộc cảm xúc vào người khác, hay do dự, thiếu quyết đoán.",
        lesson: "Học cách đặt ra giới hạn cá nhân để bảo vệ cảm xúc của mình; rèn luyện sự dũng cảm để tự đưa ra quyết định mà không cần người khác công nhận."
    },
    3: {
        title: "Số 3: Ngọn Đuốc Sáng Tạo & Ngôn Từ",
        overview: "Năng lượng của sự biểu đạt, nghệ thuật, giao tiếp, lan tỏa niềm vui và sự lạc quan.",
        strengths: "Hoạt ngôn, thông minh, tư duy sáng tạo đột phá, có khả năng truyền cảm hứng trước đám đông.",
        weaknesses: "Cực kỳ ngẫu hứng, dễ mất tập trung, đôi khi nông nổi hoặc dùng ngôn từ làm tổn thương người khác (khẩu nghiệp).",
        lesson: "Học cách kỷ luật hóa tư duy, quản trị năng lượng để không bị cả thèm chóng chán; học cách uốn lưỡi trước khi nói."
    },
    4: {
        title: "Số 4: Bậc Thầy Kỷ Luật & Thực Tế",
        overview: "Năng lượng của sự ổn định, nền tảng, quy trình, tính thực tế và quản trị hệ thống.",
        strengths: "Đáng tin cậy, tổ chức tốt, kiên nhẫn, tỉ mỉ, làm việc có kế hoạch rõ ràng.",
        weaknesses: "Bảo thủ, cứng nhắc, sợ thay đổi, dễ rơi vào trạng thái cuồng công việc và thiếu lãng mạn.",
        lesson: "Học cách mở rộng góc nhìn, chấp nhận sự linh hoạt; rèn luyện việc cân bằng giữa công việc và tận hưởng cuộc sống."
    },
    5: {
        title: "Số 5: Cơn Gió Tự Do & Trải Nghiệm",
        overview: "Đại diện cho sự đột phá, đổi mới, ưa thích phiêu lưu, linh hoạt và không thích trói buộc.",
        strengths: "Thích nghi nhanh, giàu năng lượng, dám nghĩ dám làm, có sức hút tự nhiên.",
        weaknesses: "Cả thèm chóng chán, vô kỷ luật, dễ sa ngã vào các thú vui ngắn hạn hoặc các thói quen độc hại.",
        lesson: "Học cách tìm thấy 'tự do trong sự tự kỷ luật'; rèn luyện sự kiên trì đi đến cùng với các mục tiêu dài hạn."
    },
    6: {
        title: "Số 6: Trái Tim Yêu Thương & Phụng Sự",
        overview: "Đại diện cho tình mẫu tử/phụ tử, gia đình, trách nhiệm nuôi dưỡng, chăm sóc và chữa lành.",
        strengths: "Giàu lòng vị tha, bao dung, có tính thẩm mỹ cao, luôn che chở cho người yếu thế.",
        weaknesses: "Hay lo lắng thái quá, kiểm soát người thân dưới danh nghĩa tình yêu, dễ bị bao biện hoặc ôm đồm việc người khác.",
        lesson: "Học cách yêu thương thông thái: để người khác tự chịu trách nhiệm với cuộc đời họ; học cách yêu thương chính mình trước khi phụng sự xã hội."
    },
    7: {
        title: "Số 7: Nhà Triết Học & Trí Tuệ Tâm Linh",
        overview: "Năng lượng của sự chiêm nghiệm, nghiên cứu sâu, trải nghiệm thực tế và thức tỉnh tâm linh.",
        strengths: "Khả năng tự học xuất sắc, tư duy phân tích sâu sắc, độc lập, có đức tin vững chắc sau biến cố.",
        weaknesses: "Hay hoài nghi, đa nghi, cô độc, khó đặt niềm tin vào người khác, có xu hướng tự lập rào cản.",
        lesson: "Học cách mở lòng chia sẻ tri thức thay vì giữ cho riêng mình; chấp nhận rằng cuộc đời có những mất mát là để đổi lấy bài học trí tuệ."
    },
    8: {
        title: "Số 8: Ông Chủ Quyền Lực & Vật Chất",
        overview: "Đại diện cho năng lượng điều hành, tài chính, kinh doanh, sự độc lập mạnh mẽ và quy luật nhân quả.",
        strengths: "Có đầu óc kinh doanh, thực tế, chịu áp lực giỏi, thu hút tiền bạc và quyền lực tự nhiên.",
        weaknesses: "Thực dụng, lạnh lùng, khó thể hiện cảm xúc, dễ bị cuốn vào lòng tham vật chất.",
        lesson: "Học cách cân bằng giữa thế giới vật chất và đời sống tinh thần; sử dụng quyền lực và tiền bạc để tạo ra giá trị nhân văn cho xã hội."
    },
    9: {
        title: "Số 9: Nhà Nhân Đạo & Lý Tưởng Đại Đồng",
        overview: "Con số của lòng bao dung, ước mơ lớn, lý tưởng xã hội, sự buông bỏ và đức tin nhân đạo.",
        strengths: "Vị tha, có tầm nhìn vĩ mô, luôn hướng về cộng đồng, sẵn sàng hy sinh lợi ích cá nhân.",
        weaknesses: "Mơ mộng hão huyền, thiếu thực tế, hay mang gánh nặng của quá khứ, khó từ chối người khác.",
        lesson: "Học cách thực tế hóa các lý tưởng của mình; học cách buông bỏ những tổn thương cũ để nhẹ lòng bước tiếp."
    }
};

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
    1: { vi: "Nhà tiên phong độc lập, bản lĩnh quyết đoán", en: "Independent Pioneer" },
    2: { vi: "Sứ giả hòa giải, kết nối đồng cảm lắng nghe", en: "Peace Ambassador" },
    3: { vi: "Ngọn đuốc sáng tạo, hoạt ngôn truyền cảm hứng", en: "Creative Communicator" },
    4: { vi: "Bậc thầy kỷ luật, xây dựng nền tảng vững vàng", en: "Practical Architect" },
    5: { vi: "Cơn gió phiêu lưu, thích ứng đổi mới tự do", en: "Freedom Explorer" },
    6: { vi: "Trái tim nhân ái, bảo bọc tổ ấm chăm sóc", en: "Nurturing Caregiver" },
    7: { vi: "Nhà chiêm nghiệm triết học, trí tuệ tự học sâu sắc", en: "Wise Philosopher" },
    8: { vi: "Nhà điều hành quyền lực, tài chính nhạy bén thực tế", en: "Executive Leader" },
    9: { vi: "Nhà nhân đạo vĩ đại, phụng sự lý tưởng lớn", en: "Humanitarian Visionary" },
    11: { vi: "Vua trực giác trực nhận, truyền cảm hứng tâm linh", en: "Spiritual Messenger" },
    22: { vi: "Vua kiến tạo di sản khổng lồ, tầm nhìn vĩ mô thực tế", en: "Master Builder" },
    33: { vi: "Vua chữa lành nhân từ, biểu tượng tình thương lớn", en: "Spiritual Teacher" }
};

export const DENSITY_LOGIC: Record<number, DensityInfo> = {
    0: {
        label: "Tần suất 0 lần (Số Thiếu)",
        desc: "Vùng năng lượng bị bỏ trống. Người này thiếu đi phản xạ tự nhiên của con số đó.",
        lesson: "Chủ động tạo môi trường thử thách để kích hoạt năng lượng thiếu này."
    },
    1: {
        label: "Tần suất 1 lần (Cân bằng)",
        desc: "Trạng thái lý tưởng. Năng lượng phát huy vừa đủ, lành mạnh và dễ kiểm soát.",
        lesson: "Duy trì và phát huy một cách tự nhiên."
    },
    2: {
        label: "Tần suất 2 lần (Nhấn mạnh)",
        desc: "Năng lượng được nhân đôi lực đẩy. Thể hiện năng khiếu rõ rệt.",
        lesson: "Bắt đầu cần sự tỉnh thức để không bị hành động quá đà hoặc lạm dụng."
    },
    3: {
        label: "Tần suất 3 lần trở lên (Quá tải / Đảo cực)",
        desc: "Năng lượng phóng đại quá mức (bùng nổ tiêu cực) hoặc bị khóa chặt lại khiến biểu hiện ngược lại hoàn toàn (ức chế ngược).",
        lesson: "Cần rèn luyện khả năng tự kiểm soát cảm xúc, hạ cái tôi, thiền định để cân bằng."
    }
};

export const ISOLATED_OASES: Record<number, IsolatedOasisInfo> = {
    1: {
        title: "Ốc đảo Số 1 (Trống ô số 2, 4, 5)",
        desc: "Người này cực kỳ khó diễn đạt thế giới nội tâm ra bên ngoài. Họ giữ mọi tâm sự bên trong dẫn đến việc người khác thấy họ khó hiểu, lạnh lùng.",
        lesson: "Học cách viết nhật ký, chia sẻ cảm xúc từ những điều nhỏ nhất, học các bộ môn nghệ thuật để giải phóng năng lượng ức chế."
    },
    3: {
        title: "Ốc đảo Số 3 (Trống ô số 2, 5, 6)",
        desc: "Trí tưởng tượng và tư duy rất nhạy bén nhưng bị 'treo lơ lửng'. Hay nghĩ ra ý tưởng hay nhưng không biết cách hiện thực hóa hoặc không có ai phối hợp để làm cùng.",
        lesson: "Rèn luyện kỹ năng lập kế hoạch thực tế, chủ động tìm kiếm đồng đội có tính kỷ luật (như người số 4 hoặc số 8) để kéo ý tưởng xuống đất."
    },
    7: {
        title: "Ốc đảo Số 7 (Trống ô số 4, 5, 8)",
        desc: "Vòng lặp bài học thương đau. Người này dễ vấp ngã cùng một kiểu lỗi (ví dụ: cho vay tiền mất góc, yêu nhầm người) nhưng rất chậm rút ra bài học kinh nghiệm, hay trách móc số phận.",
        lesson: "Phải tập thói quen viết 'Post-mortem' (đánh giá sau biến cố) cho cuộc đời mình. Nhìn nhận mọi thất bại dưới góc nhìn khoa học và nhân quả để chấm dứt vòng lặp."
    },
    9: {
        title: "Ốc đảo Số 9 (Trống ô số 5, 6, 8)",
        desc: "Ôm giữ hoài bão, ước mơ vĩ đại cho nhân loại hoặc gia đình nhưng không có công cụ thực tế để thực hiện. Dễ sinh tâm lý bất mãn, u sầu, nhìn đời bằng lăng kính tiêu cực.",
        lesson: "Chia nhỏ mục tiêu vĩ đại thành các hành động tử tế mỗi ngày (ví dụ: nhặt rác bảo vệ môi trường, giúp đỡ 1 người vô gia cư) thay vì chỉ nghĩ về những điều xa xôi."
    }
};

export const CHALLENGE_INFO: Record<number, ChallengeInfo> = {
    0: {
        title: "Thách thức của \"Sự Lựa Chọn\" hoặc \"Không có gì\"",
        desc: "Người này không gặp một rào cản cụ thể nào từ bên ngoài, nhưng lại phải đối mặt với thử thách lớn nhất: Tự do ý chí. Họ dễ bị mông lung, không biết mình muốn gì hoặc có xu hướng buông xuôi vì cuộc sống quá bình lặng.",
        lesson: "Phải tự đặt ra mục tiêu và kỷ luật cho bản thân mà không đợi hoàn cảnh ép buộc; học cách tự chịu trách nhiệm với mọi quyết định của cuộc đời."
    },
    1: {
        title: "Áp lực về sự \"Tự Chủ & Khẳng Định\"",
        desc: "Người này dễ bị rơi vào hai thái cực: Hoặc là quá nhút nhát, để người khác dắt mũi, thao túng; hoặc là quá độc đoán, hung hăng, ích kỷ để che giấu sự tự ti bên trong.",
        lesson: "Học cách đứng trên đôi chân của mình, dũng cảm nói lên quan điểm cá nhân nhưng không chà đạp lên cái tôi của người khác."
    },
    2: {
        title: "Thử thách về \"Cảm Xúc & Sự Nhạy Cảm\"",
        desc: "Dễ bị tổn thương bởi lời nói của người xung quanh, hay suy diễn (overthinking), sợ bị từ chối nên thường nhẫn nhịn quá mức hoặc né tránh xung đột một cách tiêu cực.",
        lesson: "Học cách quản trị cảm xúc, thiết lập ranh giới cá nhân rõ ràng; hiểu rằng hòa bình không đồng nghĩa với việc cam chịu."
    },
    3: {
        title: "Rào cản về \"Biểu Đạt & Ngôn Từ\"",
        desc: "Thách thức liên quan đến việc giao tiếp. Người này có thể rất sợ nói trước đám đông, giữ mọi thứ trong lòng; hoặc ngược lại, nói năng thiếu kiểm soát, hay chỉ trích, buôn chuyện gây tổn thương (khẩu nghiệp).",
        lesson: "Học cách sử dụng ngôn từ một cách xây dựng, chân thành; rèn luyện khả năng diễn đạt suy nghĩ một cách mạch lạc."
    },
    4: {
        title: "Thử thách về \"Kỷ Luật & Tính Thực Tế\"",
        desc: "Xu hướng lười biếng, trì trệ, vô tổ chức, làm việc không có kế hoạch dẫn đến việc bỏ dở giữa chừng. Một số trường hợp ngược lại thì quá bảo thủ, sợ rủi ro, không dám thay đổi.",
        lesson: "Rèn luyện tính kiên trì, tỉ mỉ, học cách lập kế hoạch chi tiết từ những việc nhỏ nhất và tuân thủ nó nghiêm túc."
    },
    5: {
        title: "Áp lực từ \"Sự Thay Đổi & Cám Dỗ\"",
        desc: "Thường xuyên cảm thấy bồn chồn, đứng núi này trông núi nọ, cả thèm chóng chán trong công việc và tình cảm. Dễ bị cuốn vào các thú vui ngắn hạn hoặc lối sống buông thả.",
        lesson: "Học cách cam kết dài hạn; hiểu rằng sự tự do đích thực chỉ có được khi bản thân kiểm soát được các ham muốn tức thời."
    },
    6: {
        title: "Gánh nặng về \"Trách Nhiệm & Áp Đặt\"",
        desc: "Dễ rơi vào cảnh ôm đồm việc của người khác, hy sinh quên mình rồi sinh lòng oán hận khi không được ghi nhận. Hoặc có xu hướng kiểm soát, áp đặt người thân dưới danh nghĩa \"muốn tốt cho họ\".",
        lesson: "Học cách yêu thương thông thái và buông bỏ kỳ vọng; để người xung quanh tự chịu trách nhiệm với bài học cuộc đời của họ."
    },
    7: {
        title: "Thử thách về \"Niềm Tin & Sự Thức Tỉnh\"",
        desc: "Hay hoài nghi quá mức, không tin tưởng vào bất kỳ ai, tự cô lập bản thân trong thế giới riêng. Họ thường phải trải qua một vài mất mát lớn (về tiền bạc hoặc tình cảm) thì mới chịu thay đổi góc nhìn về cuộc sống.",
        lesson: "Học cách mở lòng, phát triển trí tuệ sâu sắc thay vì chỉ nhìn bề nổi; chấp nhận những điều không thể giải thích bằng logic thuần túy."
    },
    8: {
        title: "Áp lực từ \"Vật Chất & Quyền Lực\"",
        desc: "Thử thách lớn về tài chính. Người này có thể liên tục gặp khó khăn về tiền bạc, hoặc ngược lại, quá thực dụng, tham lam, đánh đổi mọi thứ để lấy danh vọng và quyền lực.",
        lesson: "Học cách cân bằng giữa vật chất và tinh thần; hiểu sâu sắc về luật nhân quả trong kinh doanh và tiền bạc."
    }
};

export const MATURITY_INFO: Record<number, MaturityInfo> = {
    1: {
        title: "Trưởng thành 1: Cái Tôi Độc Lập & Lãnh Đạo Chín Muồi",
        desc: "Giai đoạn trung vận của bạn sẽ là lúc cái tôi độc lập và năng lực lãnh đạo đạt độ chín. Bạn có xu hướng tự đứng ra làm chủ, khẳng định vị thế và không còn muốn dựa dẫm vào ai."
    },
    2: {
        title: "Trưởng thành 2: Bình Yên & Kết Nối Hậu Vận",
        desc: "Càng về hậu vận, cuộc sống của bạn càng chậm lại, hướng về sự bình yên, kết nối. Bạn trở thành chỗ dựa tinh thần, nhà ngoại giao hoặc người hòa giải có uy tín cao trong cộng đồng."
    },
    3: {
        title: "Trưởng thành 3: Sáng Tạo & Truyền Cảm Hứng",
        desc: "Tuổi trung niên của bạn sẽ ngập tràn năng lượng sáng tạo, giao lưu và chia sẻ. Bạn có xu hướng viết lách, giảng dạy, diễn thuyết hoặc tham gia các hoạt động nghệ thuật để truyền cảm hứng."
    },
    4: {
        title: "Trưởng thành 4: Ổn Định & Kỷ Luật Cao",
        desc: "Sau 35 tuổi, bạn sẽ thu mình vào sự ổn định, thực tế và kỷ luật cao. Đây là giai đoạn bạn gặt hái tài sản vững chắc (đất đai, nhà cửa) và trở thành chuyên gia gạo cội trong lĩnh vực của mình."
    },
    5: {
        title: "Trưởng thành 5: Tự Do & Đổi Mới Trẻ Trung",
        desc: "Cuộc sống giai đoạn sau của bạn không hề nhàm chán mà đầy ắp những chuyến đi, sự đổi mới và tự do. Bạn có xu hướng thay đổi tư duy, thích nghi với các công nghệ hoặc lối sống mới một cách trẻ trung."
    },
    6: {
        title: "Trưởng thành 6: Tổ Ấm & Phụng Sự",
        desc: "Trọng tâm cuộc đời bạn lúc này dồn trọn vẹn vào tổ ấm, gia đình và sự phụng sự xã hội. Bạn tìm thấy niềm hạnh phúc lớn nhất khi được chăm sóc, nuôi dưỡng và che chở cho những người xung quanh."
    },
    7: {
        title: "Trưởng thành 7: Nhà Tư Tưởng & Thầy Tâm Linh",
        desc: "Đây là lúc bạn trở thành một nhà tư tưởng, triết gia hoặc người thầy tâm linh đúng nghĩa. Bạn dành nhiều thời gian để thiền định, tự học, đào sâu tri thức và không còn mặn mà với những cuộc tranh giành danh lợi."
    },
    8: {
        title: "Trưởng thành 8: Cơ Nghiệp & Uy Quyền Bùng Nổ",
        desc: "Giai đoạn bùng nổ mạnh mẽ nhất về mặt cơ nghiệp, tài chính và danh tiếng. Bạn có tư duy điều hành sắc bén, quản lý tài sản lớn và khẳng định được uy quyền thực tế của mình."
    },
    9: {
        title: "Trưởng thành 9: Lý Tưởng Đại Đồng",
        desc: "Tâm thức của bạn mở rộng hướng về lý tưởng đại đồng. Bạn không còn sống cho riêng mình mà cống hiến phần lớn thời gian, tiền bạc cho các dự án nhân đạo, từ thiện hoặc nâng cao giáo dục cộng đồng."
    },
    11: {
        title: "Trưởng thành 11: Vua Thức Tỉnh Muộn — Thay Đổi Nhận Thức Tâm Linh",
        desc: "Năng lượng Vua thức tỉnh muộn. Bạn bị thúc đẩy gánh vác trọng trách mang tầm vĩ mô: Thay đổi nhận thức tâm linh của số đông."
    },
    22: {
        title: "Trưởng thành 22: Vua Thức Tỉnh Muộn — Xây Dựng Di Sản Khổng Lồ",
        desc: "Năng lượng Vua thức tỉnh muộn. Bạn bị thúc đẩy gánh vác trọng trách mang tầm vĩ mô: Xây dựng các tổ chức/hệ thống di sản khổng lồ."
    },
    33: {
        title: "Trưởng thành 33: Vua Thức Tỉnh Muộn — Biểu Tượng Chữa Lành Xã Hội",
        desc: "Năng lượng Vua thức tỉnh muộn. Bạn bị thúc đẩy gánh vác trọng trách mang tầm vĩ mô: Trở thành biểu tượng truyền cảm hứng chữa lành cho xã hội."
    }
};

export const RATIONAL_THOUGHT_INFO: Record<number, RationalThoughtInfo> = {
    1: {
        title: "Tư duy lý trí 1: Quyết Đoán & Độc Lập",
        desc: "Giải quyết vấn đề bằng sự quyết đoán, tốc độ và độc lập. Khi gặp sự cố, họ lập tức tự mình tìm lối thoát riêng, không thích chờ đợi hay dựa dẫm vào ý kiến tập thể."
    },
    2: {
        title: "Tư duy lý trí 2: Trực Giác & Hòa Hợp",
        desc: "Phân tích vấn đề dựa trên góc nhìn trực giác và sự hòa hợp. Họ có xu hướng lắng nghe tất cả các bên, thương lượng, dĩ hòa vi quý và tìm giải pháp đôi bên cùng có lợi."
    },
    3: {
        title: "Tư duy lý trí 3: Sáng Tạo & Linh Hoạt Ngôn Từ",
        desc: "Tư duy bằng sự sáng tạo và linh hoạt của ngôn từ. Khi gặp ngõ cụt, họ thường nghĩ ra những giải pháp đột phá, độc lạ mà người khác không ngờ tới; giải quyết khủng hoảng bằng sự lạc quan."
    },
    4: {
        title: "Tư duy lý trí 4: Logic & Quy Trình",
        desc: "Bộ não phân tích cực kỳ logic, thực tế và có quy trình. Họ chỉ tin vào số liệu, bằng chứng thực tế và sẽ giải quyết vấn đề một cách an toàn, có trình tự rõ ràng, không mạo hiểm."
    },
    5: {
        title: "Tư duy lý trí 5: Ứng Biến Siêu Tốc",
        desc: "Ứng biến siêu tốc trong khủng hoảng. Bản chất linh hoạt giúp họ không bị hoảng loạn khi kế hoạch đổ vỡ; họ sẵn sàng lật ngược ván cờ và áp dụng ngay một phương án mới tinh chưa từng có tiền lệ."
    },
    6: {
        title: "Tư duy lý trí 6: An Toàn Con Người Trước Tiên",
        desc: "Khi suy nghĩ giải pháp, điều đầu tiên họ cân nhắc là sự an toàn và quyền lợi của con người (người thân, nhân viên, đồng đội). Họ giải quyết vấn đề bằng sự bao dung và tình cảm."
    },
    7: {
        title: "Tư duy lý trí 7: Đào Sâu Gốc Rễ",
        desc: "Đào sâu bản chất cho đến tận gốc rễ của vấn đề. Họ hoài nghi mọi thứ và sẽ không hành động cho đến khi tự mình nghiên cứu, tìm ra nguyên nhân cốt lõi tại sao sự việc lại xảy ra như vậy."
    },
    8: {
        title: "Tư duy lý trí 8: Định Hướng Kết Quả & Hiệu Suất",
        desc: "Tư duy định hướng kết quả và hiệu suất vật chất. Họ nhìn nhận khủng hoảng dưới góc độ thiệt hại tài chính và sẽ chọn giải pháp nào tối ưu hóa chi phí, mang lại giá trị thực tế cao nhất."
    },
    9: {
        title: "Tư duy lý trí 9: Vĩ Mô & Toàn Cảnh",
        desc: "Tư duy vĩ mô và nhìn toàn cảnh. Họ không giải quyết phần ngọn mà luôn hướng tới những giải pháp mang tính lâu dài, bền vững, có lợi cho số đông thay vì ích kỷ cá nhân."
    }
};

export const LIFE_PATH_COMPAT: Record<number, LifePathCompatItem> = {
    1: { happy: [1, 5, 7], challenge: [2, 4, 6] },
    2: { happy: [2, 4, 8], challenge: [1, 5, 7] },
    3: { happy: [3, 6, 9], challenge: [4, 7, 8] },
    4: { happy: [2, 4, 8], challenge: [1, 3, 5, 9] },
    5: { happy: [1, 5, 7], challenge: [2, 4, 6] },
    6: { happy: [3, 6, 9], challenge: [1, 5, 7] },
    7: { happy: [1, 5, 7], challenge: [2, 3, 6, 8] },
    8: { happy: [2, 4, 8], challenge: [3, 7, 9] },
    9: { happy: [3, 6, 9], challenge: [4, 8] },
    11: { happy: [2, 4, 8], challenge: [1, 5, 7] },
    22: { happy: [4, 2, 8], challenge: [1, 3, 9] },
    33: { happy: [3, 6, 9], challenge: [1, 5, 7] }
};

export const PARENTING_GUIDANCE: Record<number, ParentingGuidanceInfo> = {
    1: {
        title: "Rèn luyện sự tự lập & tự chịu trách nhiệm",
        strengths: "Có ý chí mạnh mẽ, độc lập, quyết đoán và có tố chất tiên phong, tự dẫn đường từ nhỏ.",
        direction: "Phương pháp Montessori khuyến khích tự học; rèn kỹ năng tự giải quyết vấn đề cá nhân; khuyến khích tham gia các hoạt động đội nhóm ở vai trò trưởng nhóm hoặc lớp trưởng.",
        advice: "Tôn trọng các lựa chọn và không gian riêng của con, tránh dùng hình phạt áp đặt cứng nhắc. Hãy dạy con bài học biết lắng nghe ý kiến xung quanh và tự chịu trách nhiệm cho các hành động của mình."
    },
    2: {
        title: "Nuôi dưỡng tâm hồn & kết nối trực giác",
        strengths: "Đồng cảm sâu sắc, nhạy bén trước cảm xúc của người khác, yêu thích hòa bình, hòa nhã và có năng khiếu ngoại giao từ bé.",
        direction: "Giáo dục qua các môn nghệ thuật (ca hát, vẽ tranh, nhạc cụ), các hoạt động đàm phán nhóm, giáo dục cảm xúc (EQ) và chia sẻ cộng đồng.",
        advice: "Dành cho con sự yêu thương ấm áp, kiên nhẫn giải thích thay vì la mắng lớn tiếng làm bé hoảng sợ. Hãy dạy con cách bộc lộ cảm xúc chân thật và biết tự bảo vệ ranh giới cá nhân, biết nói 'Không' khi cần thiết."
    },
    3: {
        title: "Phát triển tư duy sáng tạo & ngôn từ linh hoạt",
        strengths: "Hoạt ngôn, thông minh, giàu óc sáng tạo, năng khiếu biểu đạt nghệ thuật tốt và luôn mang nguồn năng lượng vui vẻ, lạc quan.",
        direction: "Khuyến khích con tham gia câu lạc bộ kịch nghệ, kể chuyện, học ngoại ngữ sớm, viết lách sáng tạo, vẽ tranh hoặc ca hát. Áp dụng phương pháp giáo dục Reggio Emilia.",
        advice: "Lắng nghe con chia sẻ ý kiến và những câu chuyện hóm hỉnh. Hãy dạy con rèn luyện tính kiên trì, tập trung hoàn thành các nhiệm vụ nhỏ hàng ngày, tránh việc cả thèm chóng chán và biết dùng ngôn từ ôn hòa."
    },
    4: {
        title: "Rèn luyện tính kỷ luật & thói quen khoa học",
        strengths: "Thực tế, kỷ luật, ngăn nắp, đáng tin cậy và có khả năng tổ chức sắp xếp công việc khoa học từ nhỏ.",
        direction: "Phù hợp với các môn học STEM, lập trình logic, lắp ráp mô hình kỹ thuật (Lego), trò chơi tư duy chiến thuật (cờ vua) và rèn luyện thể chất có quy tắc nghiêm ngặt.",
        advice: "Thiết lập một thời gian biểu rõ ràng, nhất quán cho con và cha mẹ luôn cần giữ lời hứa. Hãy khuyến khích con tư duy linh hoạt hơn, biết mở lòng trước những ý tưởng mới và học cách thích ứng với sự thay đổi."
    },
    5: {
        title: "Học thông qua trải nghiệm & tự do khám phá",
        strengths: "Tò mò, năng động, tiếp thu bài học cực nhanh qua các giác quan và thích nghi tốt trước những sự thay đổi.",
        direction: "Các môn học trải nghiệm thực tế, dã ngoại sinh thái, thể thao vận động mạnh (chạy bộ, bơi lội), du lịch khám phá và các bài tập thực nghiệm xã hội.",
        advice: "Tránh gò bó hay áp đặt không gian của con. Hãy làm bạn đồng hành khám phá cùng con. Đồng thời, dạy con học cách đặt ra giới hạn an toàn, rèn luyện tính kiên trì bám sát mục tiêu thay vì dễ dàng bỏ cuộc giữa chừng."
    },
    6: {
        title: "Giáo dục bằng tình thương & lòng trách nhiệm",
        strengths: "Giàu lòng nhân ái, có tính trách nhiệm cao với gia đình, biết quan tâm, chăm sóc mọi người xung quanh và có năng khiếu thẩm mỹ tốt.",
        direction: "Các hoạt động chăm sóc thú cưng, giúp mẹ dọn dẹp nhà cửa, vẽ tranh nghệ thuật thủ công, cắm hoa, và các hoạt động thiện nguyện chia sẻ tình thương.",
        advice: "Tạo dựng môi trường gia đình hòa thuận, tránh cãi vã trước mặt con. Dạy con học cách yêu thương bản thân mình trước tiên, không nên gánh vác trách nhiệm thay cho người khác hoặc lo lắng thái quá dẫn đến stress."
    },
    7: {
        title: "Kích thích tư duy nghiên cứu & chiều sâu tri thức",
        strengths: "Tự lập cao, có đầu óc phân tích sâu sắc, ham học hỏi và thích tự mình chiêm nghiệm tìm hiểu thế giới.",
        direction: "Đọc sách nghiên cứu khoa học, lịch sử, lập trình máy tính, giải các bài toán đố hóc búa, hoặc thực hành thiền định tĩnh tâm phù hợp với độ tuổi.",
        advice: "Tôn trọng khoảng không gian riêng tư và thời gian ở một mình của con. Cha mẹ nên kiên nhẫn trả lời thấu đáo các câu hỏi 'Tại sao' của trẻ. Dạy con cởi mở giao tiếp với thế giới xung quanh và chia sẻ kiến thức hữu ích."
    },
    8: {
        title: "Rèn luyện bản lĩnh & tư duy quản lý tài chính",
        strengths: "Mạnh mẽ, kiên cường, có năng lực tổ chức, đầu óc kinh doanh nhạy bén và khao khát tự lập sớm.",
        direction: "Dạy con cách quản lý tài chính cá nhân sớm (tiết kiệm, chi tiêu khoa học), tham gia các môn thể thao thi đấu nâng cao tính bền bỉ, và đóng vai trò trưởng nhóm điều phối.",
        advice: "Ứng xử với con dứt khoát, rõ ràng về mặt quy tắc nhưng cần đi kèm tình thương ấm áp. Rèn luyện cho con tính khiêm tốn, biết đồng cảm với người yếu thế hơn và dạy con hiểu rõ quy luật nhân quả trong hành vi xã hội."
    },
    9: {
        title: "Phát triển nhân cách & tinh thần nhân văn cao đẹp",
        strengths: "Giàu lòng trắc ẩn, yêu thương mọi người và loài vật, lý tưởng sống lớn và hướng ngoại vì cộng đồng.",
        direction: "Đọc sách văn học nhân văn, tham gia dự án bảo vệ môi trường, quyên góp sách vở cho bạn nghèo, hoặc biểu diễn nghệ thuật cộng đồng.",
        advice: "Cha mẹ cần làm gương sáng về sự chính trực, bao dung để con noi theo. Hãy khuyến khích những ước mơ tốt đẹp của con nhưng đồng thời dạy con kỹ năng thực tế để bảo vệ bản thân và đối mặt với thực tế đời sống một cách tích cực."
    },
    11: {
        title: "Phát triển trực giác & sứ mệnh truyền cảm hứng",
        strengths: "Trực giác cực kỳ nhạy bén, nhạy cảm tinh tế trước năng lượng của môi trường xung quanh và có sức hút bẩm sinh.",
        direction: "Các môn học kích thích tư duy trừu tượng, thiền định nhẹ nhàng, vẽ tranh biểu cảm cảm xúc hoặc viết nhật ký nội tâm.",
        advice: "Tạo môi trường sống tĩnh lặng, tràn đầy năng lượng tích cực lành mạnh cho con. Tránh gây áp lực tinh thần quá lớn. Hãy kiên nhẫn lắng nghe những cảm nhận đặc biệt của con và hướng con đưa các ý tưởng trực giác vào thực tế."
    },
    22: {
        title: "Tầm nhìn kiến tạo & hiện thực hóa ước mơ lớn",
        strengths: "Sở hữu tầm nhìn rộng lớn kết hợp óc thực tế cao, khả năng tổ chức các kế hoạch phức tạp rất xuất sắc.",
        direction: "Các môn khoa học ứng dụng, kiến trúc lắp ráp mô hình quy mô lớn, lập kế hoạch dự án thực nghiệm trường học hoặc tổ chức các câu lạc bộ học sinh.",
        advice: "Đồng hành rèn luyện cho con ý chí kiên trì bền bỉ vượt qua khó khăn. Hướng dẫn con cách chia nhỏ các mục tiêu lớn thành các bước thực thi nhỏ hàng ngày. Tránh tạo kỳ vọng quá nặng nề khiến con bị áp lực tâm lý từ bé."
    },
    33: {
        title: "Người thầy chữa lành nhân từ & phụng sự cộng đồng",
        strengths: "Trái tim nhân hậu bao dung vô điều kiện, có xu hướng bảo bọc, xoa dịu nỗi đau của bạn bè, động vật xung quanh.",
        direction: "Tham gia các đội ngũ y tế, chăm sóc bạn học học đường, phụ giúp giáo viên hỗ trợ các bạn cùng lớp, dạy học hoặc giảng dạy nghệ thuật nhân ái.",
        advice: "Nuôi dưỡng tâm hồn ấm áp của con bằng tình yêu vô điều kiện của cha mẹ. Hãy dạy con biết cách cân bằng cảm xúc cá nhân, biết nói lời từ chối để tránh cạn kiệt năng lượng bản thân khi cố gắng làm hài lòng người khác."
    }
};

export const PINNACLE_MEANINGS: Record<number, PinnacleMeaningInfo> = {
    1: {
        title: "Bản Lĩnh Độc Lập & Khởi Đầu Mới",
        desc: "Thời điểm của sự tự lực cánh sinh, bộc lộ cái tôi cá nhân, tố chất tiên phong dẫn dắt và mở đường.",
        advice: "Khuyến khích rèn luyện tính tự lập, đưa ra lựa chọn và chịu trách nhiệm cho hành động cá nhân."
    },
    2: {
        title: "Hợp Tác, Ngoại Giao & Trực Giác Phát Triển",
        desc: "Giai đoạn của sự kết nối, hợp tác ôn hòa, trực giác và trí tuệ cảm xúc phát triển rất mạnh mẽ.",
        advice: "Học cách lắng nghe, đối nhân xử thế ôn hòa, và bảo vệ ranh giới cảm xúc cá nhân."
    },
    3: {
        title: "Sáng Tạo, Ngôn Từ & Trải Nghiệm Học Hỏi",
        desc: "Thời kỳ bùng nổ về mặt tư duy sáng tạo, ngôn ngữ linh hoạt và các hoạt động biểu đạt nghệ thuật.",
        advice: "Tập trung kỷ luật để hoàn thành các mục tiêu, rèn luyện kỹ năng viết lách, giao lưu và biểu diễn."
    },
    4: {
        title: "Xây Dựng Nền Tảng & Tích Lũy Thực Tế",
        desc: "Chu kỳ đòi hỏi sự làm việc chăm chỉ, thói quen kỷ luật, thực tế và hệ thống hóa mọi công việc.",
        advice: "Thiết lập thời gian biểu khoa học, học quản lý tài chính sớm và các kiến thức chuyên môn sâu."
    },
    5: {
        title: "Bứt Phá, Tự Do & Trải Nghiệm Thế Giới",
        desc: "Giai đoạn dịch chuyển, thay đổi môi trường và tự do khám phá nhiều cơ hội mới mở rộng tầm nhìn.",
        advice: "Khuyến khích con tham gia dã ngoại, khám phá thực tế nhưng cần dạy con các giới hạn an toàn."
    },
    6: {
        title: "Trách Nhiệm, Tình Thương & Mái Ấm Gia Đình",
        desc: "Thời điểm năng lượng hướng về gia đình, chăm sóc người thân và thăng hoa trong sáng tác nghệ thuật.",
        advice: "Nuôi dưỡng lòng nhân ái qua việc giúp đỡ việc nhà, chăm sóc thú cưng và chia sẻ tình yêu thương."
    },
    7: {
        title: "Học Hỏi Chuyên Sâu, Chiêm Nghiệm & Rèn Luyện Ý Chí",
        desc: "Thời kỳ chậm lại để chiêm nghiệm thế giới nội tâm độc lập, học tập nghiên cứu tri thức sâu sắc.",
        advice: "Tôn trọng không gian riêng tư của con, hướng con đọc sách khoa học và tự học hỏi qua trải nghiệm."
    },
    8: {
        title: "Thành Tựu Vật Chất, Tài Chính & Quyền Lực Quản Trị",
        desc: "Chu kỳ gặt hái thành quả lớn về mặt tài chính, thăng tiến sự nghiệp và khẳng định năng lực quản lý.",
        advice: "Rèn luyện tư duy tài chính lành mạnh, định hình luật nhân quả trong hành vi và bồi đắp lòng bao dung."
    },
    9: {
        title: "Nhân Ái Cao Đẹp, Hoàn Thành & Phụng Sự Cộng Đồng",
        desc: "Giai đoạn khép lại chu kỳ cũ để chuẩn bị gieo hạt mới. Hướng tới các dự án thiện nguyện và nghệ thuật nhân văn.",
        advice: "Cha mẹ hãy làm gương sáng về sự bao dung chính trực, ủng hộ các ước mơ cao đẹp hướng tới cộng đồng của con."
    },
    11: {
        title: "Trực Giác Nhạy Bén & Truyền Cảm Hứng",
        desc: "Đỉnh cao mang năng lượng tinh thần cao. Cơ hội truyền cảm hứng và đánh thức trực giác nhạy bén tuyệt vời.",
        advice: "Giữ môi trường sống tích cực yên tĩnh cho trẻ, lắng nghe những cảm nhận đặc biệt của con."
    },
    22: {
        title: "Nhà Kiến Tạo Vĩ Đại & Hiện Thực Hóa Ước Mơ",
        desc: "Đỉnh cao của sự kiến tạo, kết hợp tầm nhìn lớn với năng lực hành động thực tế để tạo dựng công trình để đời.",
        advice: "Rèn luyện cho con tính kiên trì, tỉ mỉ từ việc nhỏ trước khi đảm nhận các trọng trách lớn."
    }
};

const PINNACLE_THEMES: Record<number, { theme: string; description: string }> = {
    1: {
        theme: "Tự chủ & Tiên phong",
        description: "Giai đoạn đòi hỏi sự độc lập, dũng cảm đứng trên đôi chân của mình và khai mở những hướng đi riêng biệt."
    },
    2: {
        theme: "Hợp tác & Hòa bình",
        description: "Thời kỳ đề cao sự nhẫn nại, phát triển kỹ năng làm việc nhóm, xây dựng các mối quan hệ hòa hợp và lắng nghe trực giác."
    },
    3: {
        theme: "Sáng tạo & Biểu đạt",
        description: "Giai đoạn rực rỡ của năng lượng sáng tạo, phát triển kỹ năng giao tiếp, nghệ thuật và mở rộng các mối quan hệ xã hội."
    },
    4: {
        theme: "Kỷ luật & Xây dựng nền tảng",
        description: "Thời điểm tập trung vào tính thực tế, làm việc chăm chỉ, củng cố sự nghiệp và xây dựng tài sản vững chắc lâu dài."
    },
    5: {
        theme: "Tự do & Bứt phá",
        description: "Giai đoạn của những bước ngoặt lớn, cơ hội du lịch, mở rộng tầm nhìn và thích nghi linh hoạt với các trải nghiệm mới."
    },
    6: {
        theme: "Trách nhiệm & Tình thương",
        description: "Đỉnh cao gắn liền với gia đình, phụng sự cộng đồng, nuôi dưỡng những người thân yêu và kiến tạo sự bình yên."
    },
    7: {
        theme: "Chiêm nghiệm & Phát triển trí tuệ",
        description: "Thời kỳ đào sâu tri thức chuyên môn, học hỏi chiều sâu tâm lý/triết học và hoàn thiện nội tâm độc lập."
    },
    8: {
        theme: "Thành tựu & Độc lập tài chính",
        description: "Đỉnh cao của sự gặt hái về mặt vật chất, quản trị hệ thống, khẳng định bản lĩnh lãnh đạo và uy tín xã hội."
    },
    9: {
        theme: "Nhân đạo & Hoàn thiện lý tưởng",
        description: "Thời kỳ cống hiến vì lợi ích cộng đồng, mở rộng lòng bao dung và chuyển giao những giá trị tốt đẹp cho thế hệ sau."
    },
    11: {
        theme: "Bậc thầy Trực giác & Khai sáng",
        description: "Đỉnh cao tâm linh và trực giác siêu việt, đóng vai trò người dẫn dắt và truyền cảm hứng nhận thức cho cộng đồng."
    },
    22: {
        theme: "Bậc thầy Kiến tạo Di sản",
        description: "Thời điểm hội tụ sức mạnh để xây dựng những công trình hoặc tổ chức quy mô lớn, tạo dấu ấn trường tồn."
    }
};

const PERSONAL_YEAR_DATA: Record<number, { keyword: string; theme: string; forecast: string }> = {
    1: {
        keyword: "Khởi đầu mới & Tiên phong",
        theme: "Năm gieo hạt giống và đặt nền móng",
        forecast: "Thời điểm tuyệt vời để khởi xướng các dự án mới, rèn luyện tính tự lập và tự tin bước ra khỏi vùng an toàn."
    },
    2: {
        keyword: "Cân bằng & Kết nối",
        theme: "Năm phát triển sự thấu cảm và kiên nhẫn",
        forecast: "Tốc độ chậm lại để củng cố các mối quan hệ, nâng cao năng lực ngoại giao và học cách lắng nghe trực giác."
    },
    3: {
        keyword: "Sáng tạo & Mở rộng",
        theme: "Năm của niềm vui và biểu đạt bản thân",
        forecast: "Năng lượng bùng nổ trong giao tiếp, học hỏi kỹ năng mới, mở rộng mạng lưới quan hệ và lan tỏa tinh thần lạc quan."
    },
    4: {
        keyword: "Kỷ luật & Củng cố",
        theme: "Năm thiết lập trật tự và quy củ",
        forecast: "Tập trung cao độ vào công việc chuyên môn, tối ưu tài chính, chăm sóc sức khỏe và tạo dựng sự ổn định vững bền."
    },
    5: {
        keyword: "Chuyển hóa & Tự do",
        theme: "Năm của những bước ngoặt và cơ hội bất ngờ",
        forecast: "Đón nhận những thay đổi tích cực, thử thách bản thân ở lĩnh vực mới, khám phá các chuyến đi và phá vỡ lối mòn."
    },
    6: {
        keyword: "Yêu thương & Trách nhiệm",
        theme: "Năm hướng về gia đình và mái ấm",
        forecast: "Dành nhiều thời gian chăm sóc người thân, cải tạo không gian sống và giải quyết các bài toán trách nhiệm tình cảm."
    },
    7: {
        keyword: "Chiêm nghiệm & Tĩnh lặng",
        theme: "Năm nâng cấp nhận thức và trí tuệ",
        forecast: "Khoảng lặng cần thiết để nhìn nhận lại hành trình đã qua, học tập chuyên sâu, thiền định và tìm về an yên nội tại."
    },
    8: {
        keyword: "Gặt hái & Độc lập tài chính",
        theme: "Năm thu hoạch thành quả và khẳng định vị thế",
        forecast: "Thời kỳ đỉnh cao về hiệu suất công việc, cơ hội gia tăng thu nhập, thăng tiến sự nghiệp và làm chủ nguồn lực."
    },
    9: {
        keyword: "Thanh lọc & Chuyển giao",
        theme: "Năm kết thúc chu kỳ 9 năm",
        forecast: "Buông bỏ những điều cũ không còn phù hợp, tha thứ và dọn dẹp tâm trí để sẵn sàng đón nhận chu kỳ phát triển mới."
    }
};

// ----------------------------------------------------------------------
// 4. Vietnamese Normalization & Accent Helpers
// ----------------------------------------------------------------------

/**
 * Chuẩn hóa tiếng Việt: Bỏ dấu thanh, chuyển về ký tự La-tinh hoa (A-Z).
 * Ví dụ: 'Nguyễn Văn Huy' -> 'NGUYEN VAN HUY'
 */
export function normalizeVietnamese(text: string): string {
    if (!text) return '';

    let result = text.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const specialReplacements: Record<string, string> = {
        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
        'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'Â': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
        'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
        'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
        'Ơ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
        'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
    };

    result = result.replace(/[^a-zA-Z\s]/g, (char) => {
        const upper = char.toUpperCase();
        return specialReplacements[upper] || '';
    });

    return result
        .toUpperCase()
        .replace(/[^A-Z\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Bỏ dấu tiếng Việt, tương thích với tên hàm `stripAccents` trong legacy numerology.
 */
export function stripAccents(str: string): string {
    if (!str) return "";
    let normalized = str.toUpperCase();

    normalized = normalized.replace(/Đ/g, 'D');

    for (const accent in ACCENTS_MAP) {
        const regex = new RegExp(accent, 'g');
        normalized = normalized.replace(regex, ACCENTS_MAP[accent]);
    }

    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalized.replace(/[^A-Z\s]/g, '').trim();
}

// ----------------------------------------------------------------------
// 5. Letter & Word Classification
// ----------------------------------------------------------------------

/**
 * Kiểm tra một ký tự có phải là nguyên âm tiêu chuẩn (A, E, I, O, U)
 */
export function isStandardVowel(char: string): boolean {
    return STANDARD_VOWELS.has(char.toUpperCase());
}

/**
 * Quy tắc xác định chữ 'Y':
 * - Nếu đứng một mình hoặc chỉ đi cùng phụ âm (như 'VY', 'LY', 'Y') hoặc thuộc vần 'UY' (như 'HUY') -> NGUYÊN ÂM (VOWEL).
 * - Nếu đứng đầu từ có nguyên âm sau nó (như 'YEN') hoặc đứng sau A, E (như 'MAY', 'BEY') -> PHỤ ÂM (CONSONANT).
 */
export function classifyY(word: string, index: number): LetterCategory {
    const cleanWord = word.toUpperCase();
    const len = cleanWord.length;

    if (index === 0 && len > 1 && isStandardVowel(cleanWord[1])) {
        return 'CONSONANT';
    }

    if (index > 0) {
        const prevChar = cleanWord[index - 1];
        if (prevChar === 'A' || prevChar === 'E') {
            return 'CONSONANT';
        }
    }

    if (index > 0 && cleanWord[index - 1] === 'U') {
        return 'VOWEL';
    }

    const hasOtherVowels = cleanWord.split('').some((c, i) => i !== index && isStandardVowel(c));
    if (!hasOtherVowels) {
        return 'VOWEL';
    }

    if (index > 0 && !isStandardVowel(cleanWord[index - 1])) {
        return 'VOWEL';
    }

    return 'CONSONANT';
}

/**
 * Phân loại một ký tự trong một từ cụ thể thành NGUYÊN ÂM hoặc PHỤ ÂM
 */
export function classifyLetter(char: string, index: number, word: string): LetterCategory {
    const upper = char.toUpperCase();
    if (isStandardVowel(upper)) {
        return 'VOWEL';
    }
    if (upper === 'Y') {
        return classifyY(word, index);
    }
    return 'CONSONANT';
}

/**
 * Phân tích toàn diện một từ thành danh sách các ký tự đã phân loại
 */
export function classifyWord(word: string): ClassifiedWord {
    const cleanWord = normalizeVietnamese(word);
    const letters: ClassifiedLetter[] = [];

    for (let i = 0; i < cleanWord.length; i++) {
        const char = cleanWord[i];
        if (char === ' ') continue;

        const category = classifyLetter(char, i, cleanWord);
        const pythagoreanValue = PYTHAGOREAN_MAP[char] || 0;

        letters.push({
            char,
            originalChar: char,
            category,
            pythagoreanValue
        });
    }

    return {
        word: cleanWord,
        letters
    };
}

/**
 * Phân loại chữ cái theo từ dùng trong RuleEngine cũ: { char: string, type: 'vowel' | 'consonant' }
 */
export function classifyWordLetters(word: string): Array<{ char: string; type: 'vowel' | 'consonant' }> {
    const result: Array<{ char: string; type: 'vowel' | 'consonant' }> = [];
    const wordLen = word.length;
    const baseVowels = ['A', 'E', 'I', 'O', 'U'];
    const hasOtherVowels = word.split('').some(c => baseVowels.includes(c));

    for (let i = 0; i < wordLen; i++) {
        const char = word[i];
        if (!PYTHAGOREAN_MAP[char]) continue;

        if (baseVowels.includes(char)) {
            result.push({ char, type: 'vowel' });
        } else if (char === 'Y') {
            let isYVowel = false;
            if (!hasOtherVowels) {
                isYVowel = true;
            } else {
                const prevChar = i > 0 ? word[i - 1] : '';
                const nextChar = i < wordLen - 1 ? word[i + 1] : '';
                const adjacentToU = (prevChar === 'U' || nextChar === 'U');
                const hasVowelsOtherThanU = word.split('').some(c => ['A', 'E', 'I', 'O'].includes(c));

                if (adjacentToU && !hasVowelsOtherThanU) {
                    isYVowel = true;
                }
            }

            if (isYVowel) {
                result.push({ char: 'Y', type: 'vowel' });
            } else {
                result.push({ char: 'Y', type: 'consonant' });
            }
        } else {
            result.push({ char, type: 'consonant' });
        }
    }
    return result;
}

// ----------------------------------------------------------------------
// 6. Number Reduction & Karmic Check
// ----------------------------------------------------------------------

/**
 * Rút gọn một số về 1 chữ số (1-9), giữ nguyên nếu gặp Master Numbers (11, 22, 33).
 */
export function reduceNumber(num: number, keepMaster: boolean = true): number {
    if (num <= 0) return 0;

    while (num > 9) {
        if (keepMaster && MASTER_NUMBERS.includes(num)) {
            return num;
        }
        num = num
            .toString()
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }

    return num;
}

/**
 * Rút gọn số có kiểm tra nợ nghiệp ở từng bước trung gian (13, 14, 16, 19).
 */
export function reduceWithKarmicCheck(rawSum: number, keepMaster: boolean = true): KarmicDebtResult {
    const debts: number[] = [];
    let current = rawSum;

    while (current > 9 && !([11, 22, 33].includes(current) && keepMaster)) {
        if (KARMIC_DEBT_NUMBERS.includes(current)) {
            debts.push(current);
        }
        current = current.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
    }

    if (KARMIC_DEBT_NUMBERS.includes(current)) {
        debts.push(current);
    }
    return { value: current, karmicDebts: [...new Set(debts)] };
}

// ----------------------------------------------------------------------
// 7. Life Path & Name Calculation
// ----------------------------------------------------------------------

/**
 * Tính Con số Chủ đạo (Life Path) theo phương pháp Matthew Oliver Goodwin (chuẩn report)
 */
export function calculateLifePath(birthDate: string): LifePathResult {
    const parts = birthDate.trim().split(/[-/]/);
    if (parts.length !== 3) {
        throw new Error(`Định dạng ngày sinh không hợp lệ: ${birthDate}. Vui lòng dùng YYYY-MM-DD.`);
    }

    let yearVal: number;
    let monthVal: number;
    let dayVal: number;

    if (parts[0].length === 4) {
        yearVal = parseInt(parts[0], 10);
        monthVal = parseInt(parts[1], 10);
        dayVal = parseInt(parts[2], 10);
    } else {
        dayVal = parseInt(parts[0], 10);
        monthVal = parseInt(parts[1], 10);
        yearVal = parseInt(parts[2], 10);
    }

    if (isNaN(yearVal) || isNaN(monthVal) || isNaN(dayVal)) {
        throw new Error(`Ngày tháng năm không hợp lệ: ${birthDate}`);
    }

    const reducedDay = reduceNumber(dayVal, true);
    const reducedMonth = reduceNumber(monthVal, true);
    const yearDigitsSum = yearVal
        .toString()
        .split('')
        .reduce((sum, d) => sum + parseInt(d, 10), 0);
    const reducedYear = reduceNumber(yearDigitsSum, true);

    const totalSum = reducedMonth + reducedDay + reducedYear;
    const lifePath = reduceNumber(totalSum, true);

    return {
        birthDate,
        reducedDay,
        reducedMonth,
        reducedYear,
        totalSum,
        lifePath,
        isMaster: MASTER_NUMBERS.includes(lifePath)
    };
}

/**
 * Phân tích tên đầy đủ: tính Chỉ số Sứ mệnh (Expression), Linh hồn (Soul Urge), Nhân cách (Personality)
 */
export function calculateNameNumbers(fullName: string): NameAnalysisResult {
    const normalized = normalizeVietnamese(fullName);
    const wordList = normalized.split(/\s+/).filter(w => w.length > 0);
    const classifiedWords = wordList.map(classifyWord);

    let expressionSum = 0;
    let soulSum = 0;
    let personalitySum = 0;

    for (const word of classifiedWords) {
        for (const letter of word.letters) {
            expressionSum += letter.pythagoreanValue;
            if (letter.category === 'VOWEL') {
                soulSum += letter.pythagoreanValue;
            } else {
                personalitySum += letter.pythagoreanValue;
            }
        }
    }

    return {
        normalizedName: normalized,
        words: classifiedWords,
        expressionNumber: reduceNumber(expressionSum, true),
        soulUrgeNumber: reduceNumber(soulSum, true),
        personalityNumber: reduceNumber(personalitySum, true)
    };
}

// ----------------------------------------------------------------------
// 8. 3x3 Birth Chart & Matrix
// ----------------------------------------------------------------------

export function extractBirthDateDigits(birthDate: string): number[] {
    const clean = birthDate.replace(/[^0-9]/g, '');
    const digits: number[] = [];

    for (const char of clean) {
        const num = parseInt(char, 10);
        if (num >= 1 && num <= 9) {
            digits.push(num);
        }
    }

    return digits;
}

export function calculateBirthChart(birthDate: string): BirthChartResult {
    const digits = extractBirthDateDigits(birthDate);

    const digitCounts: Record<number, number> = {
        1: 0, 2: 0, 3: 0,
        4: 0, 5: 0, 6: 0,
        7: 0, 8: 0, 9: 0
    };

    for (const d of digits) {
        digitCounts[d]++;
    }

    const matrix3x3: number[][] = [
        [digitCounts[3], digitCounts[6], digitCounts[9]],
        [digitCounts[2], digitCounts[5], digitCounts[8]],
        [digitCounts[1], digitCounts[4], digitCounts[7]]
    ];

    const fullArrows: ArrowInfo[] = [];
    const emptyArrows: ArrowInfo[] = [];

    for (const config of ALL_ARROWS_CONFIG) {
        const [d1, d2, d3] = config.digits;
        const c1 = digitCounts[d1];
        const c2 = digitCounts[d2];
        const c3 = digitCounts[d3];

        if (c1 > 0 && c2 > 0 && c3 > 0) {
            fullArrows.push({
                id: config.id,
                name: config.name,
                digits: config.digits,
                meaning: config.fullMeaning,
                type: 'FULL'
            });
        } else if (c1 === 0 && c2 === 0 && c3 === 0) {
            emptyArrows.push({
                id: config.id,
                name: config.emptyName,
                digits: config.digits,
                meaning: config.emptyMeaning,
                type: 'EMPTY'
            });
        }
    }

    return {
        birthDate,
        digitCounts,
        matrix3x3,
        fullArrows,
        emptyArrows
    };
}

// ----------------------------------------------------------------------
// 9. Pinnacles & Personal Year
// ----------------------------------------------------------------------

export function calculatePinnacles(birthDate: string, lifePath: number): PinnaclesResult {
    const parts = birthDate.trim().split(/[-/]/);
    let yearVal: number;
    let monthVal: number;
    let dayVal: number;

    if (parts[0].length === 4) {
        yearVal = parseInt(parts[0], 10);
        monthVal = parseInt(parts[1], 10);
        dayVal = parseInt(parts[2], 10);
    } else {
        dayVal = parseInt(parts[0], 10);
        monthVal = parseInt(parts[1], 10);
        yearVal = parseInt(parts[2], 10);
    }

    const redDay = reduceNumber(dayVal, false);
    const redMonth = reduceNumber(monthVal, false);
    const yearDigitsSum = yearVal.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const redYear = reduceNumber(yearDigitsSum, false);

    const p1 = reduceNumber(redMonth + redDay, true);
    const p2 = reduceNumber(redDay + redYear, true);
    const p3 = reduceNumber(p1 + p2, true);
    const p4 = reduceNumber(redMonth + redYear, true);

    const redLp = reduceNumber(lifePath, false);
    const age1 = 36 - redLp;
    const age2 = age1 + 9;
    const age3 = age2 + 9;

    const pinnacles: PinnacleStage[] = [
        {
            pinnacleNumber: 1,
            value: p1,
            ageRange: `0 - ${age1} tuổi`,
            theme: PINNACLE_THEMES[p1]?.theme || "Phát triển nền tảng",
            description: PINNACLE_THEMES[p1]?.description || "Giai đoạn định hình tính cách và khám phá tiềm năng."
        },
        {
            pinnacleNumber: 2,
            value: p2,
            ageRange: `${age1 + 1} - ${age2} tuổi`,
            theme: PINNACLE_THEMES[p2]?.theme || "Xây dựng sự nghiệp",
            description: PINNACLE_THEMES[p2]?.description || "Thời kỳ củng cố vị thế xã hội và xây dựng giá trị bản thân."
        },
        {
            pinnacleNumber: 3,
            value: p3,
            ageRange: `${age2 + 1} - ${age3} tuổi`,
            theme: PINNACLE_THEMES[p3]?.theme || "Trưởng thành & Tỏa sáng",
            description: PINNACLE_THEMES[p3]?.description || "Giai đoạn thăng hoa về năng lực chuyên môn và ảnh hưởng xã hội."
        },
        {
            pinnacleNumber: 4,
            value: p4,
            ageRange: `Từ ${age3 + 1} tuổi trở đi`,
            theme: PINNACLE_THEMES[p4]?.theme || "Trí tuệ & Di sản",
            description: PINNACLE_THEMES[p4]?.description || "Thời kỳ đúc kết kinh nghiệm sống và để lại giá trị cho đời."
        }
    ];

    return {
        firstPinnacleAge: age1,
        pinnacles
    };
}

export function calculatePersonalYear(birthDate: string, targetYear?: number): PersonalYearResult {
    const parts = birthDate.trim().split(/[-/]/);
    let monthVal: number;
    let dayVal: number;

    if (parts[0].length === 4) {
        monthVal = parseInt(parts[1], 10);
        dayVal = parseInt(parts[2], 10);
    } else {
        dayVal = parseInt(parts[0], 10);
        monthVal = parseInt(parts[1], 10);
    }

    const year = targetYear || new Date().getFullYear();
    const redDay = reduceNumber(dayVal, false);
    const redMonth = reduceNumber(monthVal, false);
    const yearDigitsSum = year.toString().split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const redTargetYear = reduceNumber(yearDigitsSum, false);

    const total = redDay + redMonth + redTargetYear;
    const py = reduceNumber(total, false);

    const data = PERSONAL_YEAR_DATA[py] || {
        keyword: "Vận trình năm mới",
        theme: "Năm phát triển cá nhân",
        forecast: "Giai đoạn học hỏi và phát huy tiềm năng nội tại."
    };

    return {
        year,
        personalYear: py,
        keyword: data.keyword,
        theme: data.theme,
        forecast: data.forecast
    };
}

// ----------------------------------------------------------------------
// 10. Core Rule Engine Calculations (Full Compatibility)
// ----------------------------------------------------------------------

export function calculateLifePathRuleEngine(dobStr: string): RuleEngineLifePathResult {
    const parts = dobStr.split('-');
    if (parts.length !== 3) {
        return {
            lifePath: 0,
            lifePathMethod1: 0,
            lifePathMethod2: 0,
            rawSum: 0,
            allDigitsSum: 0,
            hasMaster: false,
            hasDebt: false,
            karmicDebts: []
        };
    }

    const yearVal = parts[0].split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const monthVal = parts[1].split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const dayVal = parts[2].split('').reduce((s, d) => s + parseInt(d, 10), 0);

    const redYear = reduceNumber(yearVal, false);
    const redMonth = reduceNumber(monthVal, false);
    const redDay = reduceNumber(dayVal, false);

    const total = redYear + redMonth + redDay;

    const lpResult = reduceWithKarmicCheck(total, true);
    const lp1 = lpResult.value;
    const lpDebts = lpResult.karmicDebts;

    const cleanDob = dobStr.replace(/-/g, '');
    const allDigitsSum = cleanDob.split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const lp2 = reduceNumber(allDigitsSum, true);

    return {
        lifePath: lp1,
        lifePathMethod1: lp1,
        lifePathMethod2: lp2,
        rawSum: total,
        allDigitsSum: allDigitsSum,
        hasMaster: [11, 22, 33].includes(lp1) || [11, 22, 33].includes(lp2),
        hasDebt: lpDebts.length > 0,
        karmicDebts: lpDebts
    };
}

export function calculateNameNumbersRuleEngine(fullName: string): RuleEngineNameNumbersResult {
    const normalized = stripAccents(fullName);
    const words = normalized.split(/\s+/).filter(Boolean);

    let expressionSum = 0;
    let soulSum = 0;
    let personalitySum = 0;

    words.forEach(word => {
        const classified = classifyWordLetters(word);
        classified.forEach(item => {
            const val = PYTHAGOREAN_MAP[item.char] || 0;
            expressionSum += val;
            if (item.type === 'vowel') {
                soulSum += val;
            } else {
                personalitySum += val;
            }
        });
    });

    const exprResult = reduceWithKarmicCheck(expressionSum, true);
    const soulResult = reduceWithKarmicCheck(soulSum, true);
    const persResult = reduceWithKarmicCheck(personalitySum, true);

    const allDebts = [...new Set([
        ...exprResult.karmicDebts,
        ...soulResult.karmicDebts,
        ...persResult.karmicDebts
    ])];

    return {
        expression: exprResult.value,
        soulUrge: soulResult.value,
        personality: persResult.value,
        expressionRaw: expressionSum,
        soulRaw: soulSum,
        personalityRaw: personalitySum,
        hasDebt: allDebts.length > 0,
        karmicDebts: allDebts,
        exprKarmicDebts: exprResult.karmicDebts,
        soulKarmicDebts: soulResult.karmicDebts
    };
}

export function calculateAttitude(dobStr: string): number {
    const parts = dobStr.split('-');
    if (parts.length !== 3) return 0;
    const monthDigitsSum = parts[1].split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const dayDigitsSum = parts[2].split('').reduce((s, d) => s + parseInt(d, 10), 0);
    return reduceNumber(monthDigitsSum + dayDigitsSum, false);
}

export function calculateRationalThought(dobStr: string, expression?: number): number {
    const parts = dobStr.split('-');
    if (parts.length !== 3) return 0;
    const rawDay = parseInt(parts[2], 10);
    if (isNaN(rawDay)) return 0;
    return reduceNumber(rawDay + (expression || 0), false);
}

export function calculateDayOfBirth(dobStr: string): DayOfBirthResult {
    const parts = dobStr.split('-');
    if (parts.length !== 3) return { birthday: 0, rawDay: 0, karmicDebts: [] };
    const rawDay = parseInt(parts[2], 10);
    const dayKarmic = KARMIC_DEBT_NUMBERS.includes(rawDay) ? [rawDay] : [];
    const dayDigitsSum = parts[2].split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const reduced = reduceNumber(dayDigitsSum, true);

    return {
        birthday: reduced,
        rawDay: rawDay,
        karmicDebts: dayKarmic
    };
}

export function calculatePersonalMetrics(dobStr: string, customDate?: Date): PersonalMetricsResult {
    const parts = dobStr.split('-');
    const monthVal = parseInt(parts[1], 10) || 1;
    const dayVal = parseInt(parts[2], 10) || 1;

    const today = customDate || new Date();
    const targetYear = today.getFullYear();
    const targetMonth = today.getMonth() + 1;
    const targetDay = today.getDate();

    const targetYearSum = String(targetYear).split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const py = reduceNumber(monthVal + dayVal + targetYearSum, false);
    const pm = reduceNumber(py + targetMonth, false);
    const pd = reduceNumber(pm + targetDay, false);

    return {
        personalYear: py,
        personalMonth: pm,
        personalDay: pd,
        targetYear,
        targetMonth,
        targetDay
    };
}

export function calculateBirthGrid(dobStr: string, fullName: string): BirthGridResult {
    const cleanDob = dobStr.replace(/-/g, '');
    const dobDigits = cleanDob.split('').map(Number).filter(d => d !== 0);

    const normalized = stripAccents(fullName);
    const nameDigits = normalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);

    const dobGrid = Array(10).fill(0);
    const totalGrid = Array(10).fill(0);

    dobDigits.forEach(d => {
        dobGrid[d]++;
        totalGrid[d]++;
    });

    nameDigits.forEach(d => {
        totalGrid[d]++;
    });

    const activeArrows: ArrowGridItem[] = [];
    const emptyArrows: ArrowGridItem[] = [];

    const lines: Record<string, number[]> = {
        "1-2-3": [1, 2, 3],
        "4-5-6": [4, 5, 6],
        "7-8-9": [7, 8, 9],
        "1-4-7": [1, 4, 7],
        "2-5-8": [2, 5, 8],
        "3-6-9": [3, 6, 9],
        "1-5-9": [1, 5, 9],
        "3-5-7": [3, 5, 7]
    };

    const activeArrowInfo: Record<string, { name: string; desc: string }> = {
        "1-2-3": { name: "Mũi Tên Kế Hoạch", desc: "Tổ chức tốt, có trình tự, tư duy logic. Thách thức: Thường chỉ giỏi lập kế hoạch, dễ bị trì trệ ở khâu hành động thực tế." },
        "4-5-6": { name: "Mũi Tên Ý Chí", desc: "Kiên cường, gan dạ, có khả năng vượt qua nghịch cảnh rất cao. Thách thức: Đôi khi quá liều lĩnh hoặc tự tin thái quá vào bản thân." },
        "7-8-9": { name: "Mũi Tên Hoạt Động", desc: "Đã làm là làm đến cùng, không bao giờ bỏ cuộc. Thách thức: Dễ trở thành bảo thủ, cố chấp (cố đấm ăn xôi)." },
        "1-4-7": { name: "Mũi Tên Thể Chất", desc: "Thực tế, giỏi xoay sở, thích tự mình trải nghiệm qua hành động. Thách thức: Khá bướng bỉnh, khó tin lời người khác nếu chưa tự mình nếm trải." },
        "2-5-8": { name: "Mũi Tên Tinh Thần", desc: "Trực giác mạnh mẽ, cân bằng cảm xúc tốt, có sức hút tự nhiên. Thách thức: Dễ bị cảm xúc chi phối nếu không có mục tiêu thực tế." },
        "3-6-9": { name: "Mũi Tên Trí Tuệ", desc: "Tư duy nhạy bén, trí nhớ tốt, lý tưởng sống lớn. Thách thức: Dễ bị căng thẳng thần kinh, suy nghĩ quá nhiều (overthinking)." },
        "1-5-9": { name: "Mũi Tên Tâm Linh", desc: "Có đức tin tự nhiên sâu sắc, trực giác tâm linh mạnh mẽ." },
        "3-5-7": { name: "Mũi Tên Nhạy Bén", desc: "Tiếp thu bài học cuộc sống cực nhanh, có duyên với các bộ môn huyền học, tâm lý." }
    };

    const emptyArrowInfo: Record<string, { name: string; desc: string }> = {
        "3-6-9": { name: "Mũi Tên Trí Nhớ Ngắn Hạn", desc: "Khó tập trung dài hạn, dễ quên các chi tiết nhỏ. Giải pháp: Nhắc nhở người dùng ghi chép công việc ra giấy hoặc sử dụng ứng dụng quản lý." },
        "2-5-8": { name: "Mũi Tên Nhạy Cảm / Tổn Thương", desc: "Dễ cảm thấy bị cô lập, tủi thân, hay tự tạo vỏ bọc phòng thủ. Giải pháp: Học cách kiểm soát kỳ vọng vào người khác." },
        "1-4-7": { name: "Mũi Tên Thụ Động", desc: "Hay do dự, thiếu thực tế, biết cơ hội đến nhưng chậm bắt lấy. Giải pháp: Tập hành động ngay trong 5 giây đầu tiên." },
        "7-8-9": { name: "Mũi Tên Thất Vọng", desc: "Hay đặt kỳ vọng quá cao vào người khác để rồi tự chuốc lấy thất vọng. Giải pháp: Học cách chấp nhận sự không hoàn hảo." }
    };

    for (const key in lines) {
        const cells = lines[key];
        const hasAll = cells.every(c => dobGrid[c] > 0);
        const hasNone = cells.every(c => dobGrid[c] === 0);
        if (hasAll) {
            const info = activeArrowInfo[key];
            if (info) activeArrows.push({ code: key, name: info.name, desc: info.desc });
        } else if (hasNone) {
            const info = emptyArrowInfo[key];
            if (info) emptyArrows.push({ code: key, name: info.name, desc: info.desc, isEmpty: true });
        }
    }

    const nameGrid = Array(10).fill(0);
    nameDigits.forEach(d => { nameGrid[d]++; });

    return {
        dobGrid,
        nameGrid,
        totalGrid,
        activeArrows,
        emptyArrows
    };
}

export function calculateBodyMindSoul(dobStr: string, fullName: string): BodyMindSoulResult {
    const cleanDob = dobStr.replace(/-/g, '');
    const dobDigits = cleanDob.split('').map(Number).filter(d => d !== 0);

    const normalized = stripAccents(fullName);
    const nameDigits = normalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);

    const allDigits = dobDigits.concat(nameDigits);
    const total = allDigits.length;
    if (total === 0) return { body: 33.3, soul: 33.3, mind: 33.3 };

    const bodyCount = allDigits.filter(d => [1, 4, 7].includes(d)).length;
    const soulCount = allDigits.filter(d => [2, 5, 8].includes(d)).length;
    const mindCount = allDigits.filter(d => [3, 6, 9].includes(d)).length;

    return {
        body: Math.round((bodyCount / total) * 100 * 10) / 10,
        soul: Math.round((soulCount / total) * 100 * 10) / 10,
        mind: Math.round((mindCount / total) * 100 * 10) / 10
    };
}

export function calculateNameDetails(fullName: string): NameDetailsResult {
    const normalized = stripAccents(fullName);
    const words = normalized.split(/\s+/).filter(Boolean);
    if (words.length === 0 || words[0] === "") {
        return { cornerstone: '', capstone: '', firstVowel: '', balance: 0, hiddenPassion: [], karmicLessons: [] };
    }

    const firstName = words[words.length - 1];
    const cornerstone = firstName[0] || '';
    const capstone = firstName[firstName.length - 1] || '';

    const classifiedFirst = classifyWordLetters(firstName);
    let firstVowel = '';
    for (let i = 0; i < classifiedFirst.length; i++) {
        if (classifiedFirst[i].type === 'vowel') {
            firstVowel = classifiedFirst[i].char;
            break;
        }
    }

    let initialsSum = 0;
    words.forEach(w => {
        if (w[0] && PYTHAGOREAN_MAP[w[0]]) {
            initialsSum += PYTHAGOREAN_MAP[w[0]];
        }
    });
    const balance = reduceNumber(initialsSum, false);

    const counts = Array(10).fill(0);
    words.forEach(w => {
        w.split('').forEach(char => {
            if (PYTHAGOREAN_MAP[char]) {
                counts[PYTHAGOREAN_MAP[char]]++;
            }
        });
    });

    const maxFreq = Math.max(...counts.slice(1));
    const hiddenPassion: number[] = [];
    const karmicLessons: number[] = [];

    for (let i = 1; i <= 9; i++) {
        if (counts[i] === maxFreq && counts[i] > 0) {
            hiddenPassion.push(i);
        }
        if (counts[i] === 0) {
            karmicLessons.push(i);
        }
    }

    return {
        cornerstone,
        capstone,
        firstVowel,
        balance,
        hiddenPassion,
        karmicLessons
    };
}

export function calculateCyclesPinnacles(dobStr: string, lp: number): CyclesPinnaclesResult {
    const parts = dobStr.split('-');
    const monthVal = reduceNumber(parseInt(parts[1], 10) || 1, false);
    const dayVal = reduceNumber(parseInt(parts[2], 10) || 1, false);
    const yearSum = (parts[0] || '').split('').reduce((s, d) => s + parseInt(d, 10), 0);
    const yearVal = reduceNumber(yearSum, false);

    const p1 = reduceNumber(monthVal + dayVal, true);
    const p2 = reduceNumber(dayVal + yearVal, true);
    const p3 = reduceNumber(p1 + p2, true);
    const p4 = reduceNumber(monthVal + yearVal, true);

    const lpReduced = reduceNumber(lp, false);
    const age1 = 36 - lpReduced;
    const age2 = age1 + 9;
    const age3 = age2 + 9;

    const c1 = Math.abs(monthVal - dayVal);
    const c2 = Math.abs(dayVal - yearVal);
    const c3 = Math.abs(c1 - c2);
    const c4 = Math.abs(monthVal - yearVal);

    return {
        cycles: { first: monthVal, second: dayVal, third: yearVal },
        pinnacles: [
            { num: 1, val: p1, age: age1 },
            { num: 2, val: p2, age: age2 },
            { num: 3, val: p3, age: age3 },
            { num: 4, val: p4, age: `${age3}+` }
        ],
        challenges: [
            { num: 1, val: c1 },
            { num: 2, val: c2 },
            { num: 3, val: c3 },
            { num: 4, val: c4 }
        ]
    };
}

export function calculateMaturityNumber(lifePath: number, expression: number): number {
    return reduceNumber(lifePath + expression, true);
}

/**
 * Unified RuleEngine object exposing the calculation suite.
 */
export const RuleEngine = {
    calculateLifePath: calculateLifePathRuleEngine,
    calculateNameNumbers: calculateNameNumbersRuleEngine,
    calculateAttitude,
    calculateRationalThought,
    calculateDayOfBirth,
    calculatePersonalMetrics,
    calculateBirthGrid,
    calculateBodyMindSoul,
    calculateNameDetails,
    calculateCyclesPinnacles,
    calculateMaturityNumber
};

// ----------------------------------------------------------------------
// 11. Feng Shui & Wu Xing Helpers
// ----------------------------------------------------------------------

export const FengShui = {
    getElementByYear(year: number): string {
        const canWeights: Record<string, number> = {
            "Canh": 4, "Tân": 4, "Nhâm": 5, "Quý": 5,
            "Giáp": 1, "Ất": 1, "Bính": 2, "Đinh": 2,
            "Mậu": 3, "Kỷ": 3
        };
        const chiWeights: Record<string, number> = {
            "Tý": 0, "Sửu": 0, "Ngọ": 0, "Mùi": 0,
            "Dần": 1, "Mão": 1, "Thân": 1, "Dậu": 1,
            "Thìn": 2, "Tỵ": 2, "Tuất": 2, "Hợi": 2
        };
        const canNames = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
        const chiNames = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];

        const canName = canNames[year % 10];
        const chiName = chiNames[year % 12];

        let total = (canWeights[canName] || 0) + (chiWeights[chiName] || 0);
        if (total > 5) total -= 5;

        const elements: Record<number, string> = {
            1: "Kim",
            2: "Thủy",
            3: "Hỏa",
            4: "Thổ",
            5: "Mộc"
        };
        return elements[total] || "Thổ";
    },

    getElementOfName(nameStr: string): string {
        const words = stripAccents(nameStr).split(/\s+/).filter(Boolean);
        const lastWord = words[words.length - 1];
        if (!lastWord) return "Thổ";

        const match = VIETNAMESE_SYLLABLES.find(s => stripAccents(s.syllable) === lastWord);
        if (match) return match.wuxing;

        const nameElements: Record<string, string> = {
            "KHOI": "Mộc", "LAM": "Mộc", "VY": "Mộc", "QUYNH": "Mộc", "CHI": "Mộc", "TUNG": "Mộc", "NHAN": "Mộc", "BACH": "Mộc",
            "HAI": "Thủy", "GIANG": "Thủy", "AN": "Thủy", "VAN": "Thủy", "YEN": "Thủy", "HA": "Thủy", "THUY": "Thủy", "DUONG": "Thủy", "MINH": "Thủy",
            "ANH": "Hỏa", "THU": "Hỏa", "PHAT": "Hỏa", "KIET": "Hỏa", "HOANG": "Hỏa", "NAM": "Hỏa", "BAO": "Hỏa", "TRIET": "Hỏa",
            "SON": "Thổ", "DUY": "Thổ", "TUONG": "Thổ", "PHUOC": "Thổ", "PHONG": "Thổ", "CHAU": "Thổ",
            "KHANH": "Kim", "BINH": "Kim", "TRANG": "Kim", "TRAM": "Kim", "XUAN": "Kim", "KIM": "Kim", "NGAN": "Kim"
        };
        return nameElements[lastWord] || "Thổ";
    },

    getRelationship(el1: string, el2: string): 'sinh' | 'hợp' | 'khắc' {
        const relations: Record<string, string> = {
            "Kim": "Thủy",
            "Thủy": "Mộc",
            "Mộc": "Hỏa",
            "Hỏa": "Thổ",
            "Thổ": "Kim"
        };
        if (relations[el1] === el2) return "sinh";
        if (relations[el2] === el1) return "sinh";
        if (el1 === el2) return "hợp";
        return "khắc";
    }
};

export function getFengShuiElement(dobStr: string): FengShuiElementResult {
    if (!dobStr) return { element: "Không rõ", detail: "Chưa rõ", color: "#a1a1aa" };
    const parts = dobStr.split('-');
    const year = parseInt(parts[0], 10);
    if (isNaN(year)) return { element: "Không rõ", detail: "Chưa rõ", color: "#a1a1aa" };

    const yearElements: Record<number, FengShuiElementResult> = {
        1970: { element: "Kim", detail: "Thoa Xuyến Kim", color: "#e6c229" },
        1971: { element: "Kim", detail: "Thoa Xuyến Kim", color: "#e6c229" },
        1972: { element: "Mộc", detail: "Tang Đố Mộc", color: "#2ec4b6" },
        1973: { element: "Mộc", detail: "Tang Đố Mộc", color: "#2ec4b6" },
        1974: { element: "Thủy", detail: "Đại Khê Thủy", color: "#0077b6" },
        1975: { element: "Thủy", detail: "Đại Khê Thủy", color: "#0077b6" },
        1976: { element: "Thổ", detail: "Sa Trung Thổ", color: "#b5838d" },
        1977: { element: "Thổ", detail: "Sa Trung Thổ", color: "#b5838d" },
        1978: { element: "Hỏa", detail: "Thiên Thượng Hỏa", color: "#e63946" },
        1979: { element: "Hỏa", detail: "Thiên Thượng Hỏa", color: "#e63946" },
        1980: { element: "Mộc", detail: "Thạch Lựu Mộc", color: "#2ec4b6" },
        1981: { element: "Mộc", detail: "Thạch Lựu Mộc", color: "#2ec4b6" },
        1982: { element: "Thủy", detail: "Đại Hải Thủy", color: "#0077b6" },
        1983: { element: "Thủy", detail: "Đại Hải Thủy", color: "#0077b6" },
        1984: { element: "Kim", detail: "Hải Trung Kim", color: "#e6c229" },
        1985: { element: "Kim", detail: "Hải Trung Kim", color: "#e6c229" },
        1986: { element: "Hỏa", detail: "Lư Trung Hỏa", color: "#e63946" },
        1987: { element: "Hỏa", detail: "Lư Trung Hỏa", color: "#e63946" },
        1988: { element: "Mộc", detail: "Đại Lâm Mộc", color: "#2ec4b6" },
        1989: { element: "Mộc", detail: "Đại Lâm Mộc", color: "#2ec4b6" },
        1990: { element: "Thổ", detail: "Lộ Bàng Thổ", color: "#b5838d" },
        1991: { element: "Thổ", detail: "Lộ Bàng Thổ", color: "#b5838d" },
        1992: { element: "Kim", detail: "Kiếm Phong Kim", color: "#e6c229" },
        1993: { element: "Kim", detail: "Kiếm Phong Kim", color: "#e6c229" },
        1994: { element: "Hỏa", detail: "Sơn Đầu Hỏa", color: "#e63946" },
        1995: { element: "Hỏa", detail: "Sơn Đầu Hỏa", color: "#e63946" },
        1996: { element: "Thủy", detail: "Giản Hạ Thủy", color: "#0077b6" },
        1997: { element: "Thủy", detail: "Giản Hạ Thủy", color: "#0077b6" },
        1998: { element: "Thổ", detail: "Thành Đầu Thổ", color: "#b5838d" },
        1999: { element: "Thổ", detail: "Thành Đầu Thổ", color: "#b5838d" },
        2000: { element: "Kim", detail: "Bạch Lạp Kim", color: "#e6c229" },
        2001: { element: "Kim", detail: "Bạch Lạp Kim", color: "#e6c229" },
        2002: { element: "Mộc", detail: "Dương Liễu Mộc", color: "#2ec4b6" },
        2003: { element: "Mộc", detail: "Dương Liễu Mộc", color: "#2ec4b6" },
        2004: { element: "Thủy", detail: "Tuyền Trung Thủy", color: "#0077b6" },
        2005: { element: "Thủy", detail: "Tuyền Trung Thủy", color: "#0077b6" },
        2006: { element: "Thổ", detail: "Ốc Thượng Thổ", color: "#b5838d" },
        2007: { element: "Thổ", detail: "Ốc Thượng Thổ", color: "#b5838d" },
        2008: { element: "Hỏa", detail: "Tích Lịch Hỏa", color: "#e63946" },
        2009: { element: "Hỏa", detail: "Tích Lịch Hỏa", color: "#e63946" },
        2010: { element: "Mộc", detail: "Tùng Bách Mộc", color: "#2ec4b6" },
        2011: { element: "Mộc", detail: "Tùng Bách Mộc", color: "#2ec4b6" },
        2012: { element: "Thủy", detail: "Trường Lưu Thủy", color: "#0077b6" },
        2013: { element: "Thủy", detail: "Trường Lưu Thủy", color: "#0077b6" },
        2014: { element: "Kim", detail: "Sa Trung Kim", color: "#e6c229" },
        2015: { element: "Kim", detail: "Sa Trung Kim", color: "#e6c229" },
        2016: { element: "Hỏa", detail: "Sơn Hạ Hỏa", color: "#e63946" },
        2017: { element: "Hỏa", detail: "Sơn Hạ Hỏa", color: "#e63946" },
        2018: { element: "Mộc", detail: "Bình Địa Mộc", color: "#2ec4b6" },
        2019: { element: "Mộc", detail: "Bình Địa Mộc", color: "#2ec4b6" },
        2020: { element: "Thổ", detail: "Bích Thượng Thổ", color: "#b5838d" },
        2021: { element: "Thổ", detail: "Bích Thượng Thổ", color: "#b5838d" },
        2022: { element: "Kim", detail: "Kim Bạch Kim", color: "#e6c229" },
        2023: { element: "Kim", detail: "Kim Bạch Kim", color: "#e6c229" },
        2024: { element: "Hỏa", detail: "Phú Đăng Hỏa", color: "#e63946" },
        2025: { element: "Hỏa", detail: "Phú Đăng Hỏa", color: "#e63946" },
        2026: { element: "Thủy", detail: "Thiên Hà Thủy", color: "#0077b6" },
        2027: { element: "Thủy", detail: "Thiên Hà Thủy", color: "#0077b6" },
        2028: { element: "Thổ", detail: "Đại Trạch Thổ", color: "#b5838d" },
        2029: { element: "Thổ", detail: "Đại Trạch Thổ", color: "#b5838d" },
        2030: { element: "Kim", detail: "Thoa Xuyến Kim", color: "#e6c229" }
    };
    return yearElements[year] || { element: "Thổ", detail: "Lộ Bàng Thổ", color: "#b5838d" };
}

export function getNguHanhCompatibility(conEl: string, phuHuynhEl: string): NguHanhCompatibilityResult {
    const sinh: Record<string, string> = { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" };
    const khac: Record<string, string> = { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" };

    if (sinh[phuHuynhEl] === conEl) {
        return { type: "Sinh", label: "Tương Sinh (Bố/Mẹ trợ sinh Con - Rất tốt)", desc: "Mệnh ngũ hành của bố/mẹ nuôi dưỡng bản mệnh bé, tạo phúc lành và bệ đỡ tốt." };
    }
    if (sinh[conEl] === phuHuynhEl) {
        return { type: "Sinh", label: "Tương Sinh (Con trợ sinh Bố/Mẹ - Tốt)", desc: "Bé sinh ra mang lại may mắn, vượng phát và sự hanh thông tài lộc cho bố mẹ." };
    }
    if (khac[phuHuynhEl] === conEl) {
        return { type: "Khắc", label: "Tương Khắc (Bố/Mẹ khắc Con - Hơi áp lực)", desc: "Cha mẹ cần kiềm chế tính nóng giận, giáo dục ôn hòa và thấu hiểu góc nhìn riêng của bé." };
    }
    if (khac[conEl] === phuHuynhEl) {
        return { type: "Khắc", label: "Tương Khắc (Con khắc Bố/Mẹ - Cần kiên nhẫn)", desc: "Bé bướng bỉnh dễ cãi lại. Cha mẹ nên làm bạn cùng con thay vì áp chế thô bạo." };
    }
    return { type: "Hòa", label: "Bình Hòa (Hòa hợp tự nhiên)", desc: "Bản mệnh tương hòa tự nhiên, quan hệ gia đình hòa thuận ổn định." };
}

// ----------------------------------------------------------------------
// 12. Name Evaluation & Scoring Engine
// ----------------------------------------------------------------------

export function evaluateCustomName(nameText: string): CustomNameEvaluationResult {
    const words = nameText.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0 || words[0] === "") {
        return {
            name: nameText,
            middle: { syllable: "", gender: "Unisex", wuxing: "Thổ", meaning: "", score: 20, sound: 8, rarity: 4 },
            first: { syllable: "", gender: "Unisex", wuxing: "Thổ", meaning: "", score: 20, sound: 8, rarity: 4 }
        };
    }

    const firstNameVal = words[words.length - 1];
    const middleNameVal = words.slice(0, words.length - 1).join(" ");

    let firstSyl = VIETNAMESE_SYLLABLES.find(s => s.syllable.toLowerCase() === firstNameVal.toLowerCase());
    if (!firstSyl) {
        firstSyl = {
            syllable: firstNameVal,
            gender: "Unisex",
            wuxing: FengShui.getElementOfName(firstNameVal),
            meaning: "Tên có ý nghĩa cát tường.",
            score: 22,
            sound: 8,
            rarity: 4
        };
    }

    let middleSyl: VietnameseSyllable | null = null;
    if (middleNameVal) {
        const lastMiddleWord = words[words.length - 2] || "";
        middleSyl = VIETNAMESE_SYLLABLES.find(s => s.syllable.toLowerCase() === lastMiddleWord.toLowerCase()) || null;
    }
    if (!middleSyl) {
        middleSyl = {
            syllable: middleNameVal || "",
            gender: "Unisex",
            wuxing: "Thổ",
            meaning: "Đệm bổ trợ ý chí.",
            score: 20,
            sound: 8,
            rarity: 4
        };
    }

    return {
        name: nameText,
        middle: middleSyl,
        first: firstSyl
    };
}

function generateReasons(filledNumbers: number[] | number, nameNums: RuleEngineNameNumbersResult, hasDebt: boolean, parentBonus: number, wishBonus: number): string[] {
    const reasons: string[] = [];
    const count = Array.isArray(filledNumbers) ? filledNumbers.length : filledNumbers;
    if (count > 0) reasons.push(`Bù đắp được ${count} chỉ số bị khuyết trong biểu đồ ngày sinh.`);
    if (parentBonus > 5) reasons.push(`Tên cực kỳ hòa hợp với ngũ hành của Bố Mẹ, giúp gia đình êm ấm, vượng khí.`);
    else if (parentBonus > 0) reasons.push(`Ngũ hành tương sinh tương hợp tốt với Bố Mẹ.`);

    if (wishBonus > 0) reasons.push(`Tên gọi cộng hưởng mạnh mẽ với kỳ vọng của gia đình dành cho bé.`);
    if (hasDebt) reasons.push(`Lưu ý: Tên này vô tình tạo ra Nợ Nghiệp (Karmic Debt). Nên cân nhắc.`);
    if ([11, 22, 33].includes(nameNums.expression)) reasons.push(`Tên chứa con số Master (Bậc thầy), mang năng lượng trực giác lớn.`);

    if (reasons.length === 0) reasons.push(`Tên gọi hài hòa và êm tai.`);
    return reasons;
}

export function scoreNameCombination(middle: VietnameseSyllable, first: VietnameseSyllable, wish: string, childData: any): ScoredName {
    const lp = childData.lp;
    const childYear = parseInt((childData.dob || '').split('-')[0], 10) || 2026;
    const childElement = FengShui.getElementByYear(childYear);

    let fatherElement: string | null = null;
    let motherElement: string | null = null;
    if (childData.parents?.fatherDob) {
        const fYear = parseInt(childData.parents.fatherDob.split('-')[0], 10);
        if (!isNaN(fYear)) fatherElement = FengShui.getElementByYear(fYear);
    }
    if (childData.parents?.motherDob) {
        const mYear = parseInt(childData.parents.motherDob.split('-')[0], 10);
        if (!isNaN(mYear)) motherElement = FengShui.getElementByYear(mYear);
    }

    const nameText = `${middle.syllable} ${first.syllable}`.trim();
    const fullName = `${childData.lastName || ''} ${nameText}`.trim();

    const dobDigits = (childData.dob || '').replace(/-/g, '').split('').map(Number).filter(d => d !== 0);
    const lastNameNormalized = stripAccents(childData.lastName || '');
    const lastNameDigits = lastNameNormalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);
    const baseGrid = Array(10).fill(0);
    dobDigits.forEach(d => baseGrid[d]++);
    lastNameDigits.forEach(d => baseGrid[d]++);

    const missingNumbers: number[] = [];
    for (let num = 1; num <= 9; num++) {
        if (baseGrid[num] === 0) missingNumbers.push(num);
    }

    const emptyArrowCodes: string[] = (childData.gridData?.emptyArrows || []).map((a: any) => a.code);
    const lines: Record<string, number[]> = {
        "1-2-3": [1, 2, 3], "4-5-6": [4, 5, 6], "7-8-9": [7, 8, 9],
        "1-4-7": [1, 4, 7], "2-5-8": [2, 5, 8], "3-6-9": [3, 6, 9],
        "1-5-9": [1, 5, 9], "3-5-7": [3, 5, 7]
    };

    const nameNormalized = stripAccents(nameText);
    const nameDigits = nameNormalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);

    const nameNums = RuleEngine.calculateNameNumbers(fullName);
    const friendlyGroups = [[1, 5, 7], [2, 4, 8, 11, 22], [3, 6, 9, 33]];
    let numerologyMatch = 22;
    if (lp === nameNums.expression) {
        numerologyMatch = 35;
    } else {
        let friendly = false;
        for (const g of friendlyGroups) {
            if (g.includes(lp) && g.includes(nameNums.expression)) { friendly = true; break; }
        }
        numerologyMatch = friendly ? 30 : 22;
    }

    let filledCount = 0;
    const filledNumbers: number[] = [];
    missingNumbers.forEach(num => {
        if (nameDigits.includes(num)) { filledCount++; filledNumbers.push(num); }
    });
    const totalMissing = missingNumbers.length || 1;
    const missingCompensation = Math.round((filledCount / totalMissing) * 25);

    let arrowBonus = 0;
    emptyArrowCodes.forEach(code => {
        const cells = lines[code];
        if (cells) {
            cells.forEach(cell => { if (nameDigits.includes(cell)) arrowBonus += 2; });
        }
    });
    arrowBonus = Math.min(5, arrowBonus);

    const rawMeaning = Math.round((middle.score + first.score) / 2);
    const meaningScore = Math.round((rawMeaning / 25) * 20);

    let parentBonus = 0;
    if (fatherElement) {
        const rel = FengShui.getRelationship(fatherElement, first.wuxing);
        if (rel === 'sinh') parentBonus += 5;
        else if (rel === 'hợp') parentBonus += 3;
    }
    if (motherElement) {
        const rel = FengShui.getRelationship(motherElement, first.wuxing);
        if (rel === 'sinh') parentBonus += 5;
        else if (rel === 'hợp') parentBonus += 3;
    }
    const childRel = FengShui.getRelationship(childElement, first.wuxing);
    if (childRel === 'sinh') parentBonus += 2;
    parentBonus = Math.min(10, parentBonus);

    const rawSound = Math.round((middle.sound + first.sound) / 2);
    const pronunciationScore = Math.round((rawSound / 10) * 5);

    const avgRarity = Math.round((middle.rarity + first.rarity) / 2);
    const popularityScore = Math.min(5, Math.max(1, avgRarity - 1));

    let wishBonus = 0;
    if (wish === 'Bình an & Nhân hậu' && [2, 6, 9].includes(nameNums.expression)) wishBonus = 3;
    else if (wish === 'Thông minh & Tài lộc' && [3, 5, 8].includes(nameNums.expression)) wishBonus = 3;
    else if (wish === 'Lãnh đạo & Thành công' && [1, 8, 22].includes(nameNums.expression)) wishBonus = 3;
    else if (wish === 'Sức khỏe & Tự do' && [4, 5, 7].includes(nameNums.expression)) wishBonus = 3;

    const karmicPenalty = nameNums.hasDebt ? -15 : 0;

    const rawTotal = numerologyMatch + missingCompensation + arrowBonus +
        meaningScore + parentBonus + pronunciationScore + popularityScore +
        wishBonus + karmicPenalty;
    const totalScore = Math.max(30, Math.min(100, Math.round(rawTotal)));

    const combinedMeaning = `Ghép từ đệm "${middle.syllable}" (${middle.meaning.replace(/\.$/, '')}) và tên chính "${first.syllable}" (${first.meaning.toLowerCase()})`;

    return {
        name: nameText,
        fullName,
        meaning: combinedMeaning,
        expression: nameNums.expression,
        soul: nameNums.soulUrge,
        personality: nameNums.personality,
        filledNumbers,
        filledCount,
        score: totalScore,
        wuxing: first.wuxing,
        hasMaster: [11, 22, 33].includes(nameNums.expression),
        hasDebt: nameNums.hasDebt,
        breakdown: {
            numerologyMatch,
            missingCompensation: missingCompensation + arrowBonus,
            meaning: meaningScore,
            parentCompat: parentBonus,
            pronunciation: pronunciationScore,
            popularity: popularityScore,
            wishBonus,
            karmicPenalty
        },
        reasons: generateReasons(filledNumbers, nameNums, nameNums.hasDebt, parentBonus, wishBonus)
    };
}

export function getIntelligenceScores(data: any): IntelligenceScores {
    const grid = data.gridData?.totalGrid || [];
    const scores: Record<string, number> = {
        linguistic: 5 + (grid[3] || 0) + (grid[6] || 0),
        logical: 5 + (grid[1] || 0) + (grid[4] || 0) + (grid[7] || 0),
        musical: 6 + (grid[6] || 0) + (grid[2] || 0),
        bodily: 5 + (grid[5] || 0) + (grid[4] || 0),
        spatial: 6 + (grid[9] || 0) + (grid[3] || 0),
        interpersonal: 5 + (grid[2] || 0) + (grid[8] || 0),
        intrapersonal: 6 + (grid[7] || 0) + (data.lp === 11 || data.lp === 7 ? 2 : 0),
        naturalist: 5 + (grid[8] || 0) + (grid[5] || 0)
    };
    const finalScores: Record<string, number> = {};
    for (const key in scores) {
        finalScores[key] = Math.max(4, Math.min(10, scores[key]));
    }
    return finalScores as unknown as IntelligenceScores;
}

// ----------------------------------------------------------------------
// 13. Metadata & Interpretation Titles/Descriptions
// ----------------------------------------------------------------------

export function getModuleEntry<T>(map: Record<number, T>, num: number): T | null {
    if (map[num]) return map[num];
    if (num > 9 && ![11, 22, 33].includes(num)) {
        return map[reduceNumber(num, false)] || null;
    }
    return null;
}

export function getChallengeInfo(val: number): ChallengeInfo | null {
    return CHALLENGE_INFO[val] || null;
}

export function getMaturityInfo(val: number): MaturityInfo | null {
    return getModuleEntry(MATURITY_INFO, val);
}

export function getRationalThoughtInfo(val: number): RationalThoughtInfo | null {
    return getModuleEntry(RATIONAL_THOUGHT_INFO, val);
}

export function getLifePathMetadata(lp: number): { title: string; desc: string } {
    const list: Record<number, { title: string; desc: string }> = {
        1: { title: "Người Dẫn Đường Độc Lập", desc: "Con sở hữu ý chí tự lập cực kỳ mạnh mẽ từ nhỏ. Thích tự mình khám phá, dẫn đầu cuộc chơi và có xu hướng tự lập cao. Cần được tôn trọng quyết định riêng của mình." },
        2: { title: "Sứ Giả Hòa Bình Đồng Cảm", desc: "Con vô cùng nhạy bén trước cảm xúc người khác. Thích sự ôn hòa, yêu chuộng hòa bình và thích chia sẻ đồ chơi với bạn bè. Bé có trực giác tâm lý và khả năng ngoại giao xuất sắc." },
        3: { title: "Nhà Sáng Tạo Đầy Nhiệt Huyết", desc: "Con là đóa hoa rực rỡ, thích ca hát, vẽ tranh và biểu đạt suy nghĩ bằng lời nói linh hoạt. Bé có năng lực ngôn ngữ vượt trội và óc hài hước bẩm sinh." },
        4: { title: "Người Kiến Thiết Thực Tế", desc: "Con thích sự ngăn nắp, kỷ luật và an toàn. Con học hỏi qua những trải nghiệm thực tế trực quan. Bé rất đáng tin cậy, tỉ mỉ và có khả năng sắp xếp đồ chơi khoa học từ bé." },
        5: { title: "Nhà Thám Hiểm Tự Do", desc: "Con là người năng động, tò mò và ưa thích phiêu lưu mạo hiểm. Bé không thích sự gò bó, thích được chạy nhảy ngoài thiên nhiên và tiếp thu bài học cực nhanh qua trải nghiệm thực tế." },
        6: { title: "Người Chăm Sóc Nhân Ái", desc: "Con sở hữu tình yêu thương bao la và tinh thần trách nhiệm gia đình cao. Bé thích dọn dẹp, giúp đỡ mẹ chăm sóc thú cưng hoặc các em nhỏ. Nghệ thuật và hội họa là những người bạn thân thiết của bé." },
        7: { title: "Nhà Triết Học Tò Mò", desc: "Con thích tự đặt ra những câu hỏi 'Tại sao' đầy triết lý. Bé có đời sống nội tâm độc lập, thích chiêm nghiệm thế giới một mình và có khả năng nghiên cứu học thuật vượt trội từ sớm." },
        8: { title: "Nhà Lãnh Đạo Bản Lĩnh", desc: "Con sở hữu bản lĩnh kiên cường, tính độc lập mạnh mẽ và khao khát tự chủ tài chính hoặc tổ chức cuộc chơi. Cần rèn luyện tính kiên nhẫn và lòng vị tha cho bé từ sớm." },
        9: { title: "Nhà Nhân Ái Vĩ Đại", desc: "Con có lý tưởng nhân văn sâu rộng, giàu lòng trắc ẩn trước nỗi đau của động vật hay người nghèo. Bé có xu hướng gánh vác trách nhiệm xã hội lớn khi lớn lên." },
        11: { title: "Người Truyền Cảm Hứng Trực Giác", desc: "Con mang năng lượng kép của số 2 nâng cao, sở hữu trực giác nhạy bén, khả năng tâm linh sâu sắc và sức mạnh truyền cảm hứng kỳ diệu cho cộng đồng xung quanh." },
        22: { title: "Người Kiến Tạo Vĩ Đại", desc: "Con sở hữu năng lượng của người thiết lập những công trình đồ sộ. Bé có óc thực tế siêu việt của số 4 kết hợp tầm nhìn lớn của số 22, có tiềm năng kiến tạo tương lai rộng mở." },
        33: { title: "Người Thầy Chữa Lành Nhân Từ", desc: "Mang năng lượng tình thương cao nhất của số 6 nhân đôi. Con là điểm tựa tinh thần ấm áp cho mọi người xung quanh, thích xoa dịu vết thương của bạn bè, thú cưng bằng sự nhân từ bẩm sinh." }
    };
    return list[lp] || { title: "Năng lượng bí ẩn", desc: "Con sở hữu một tâm hồn đặc biệt giàu năng lực tự nhiên." };
}

export function getExpressionTitle(num: number): string {
    const list: Record<number, string> = {
        1: "Thể hiện bản thân tự chủ, độc lập",
        2: "Khả năng lắng nghe & hòa giải",
        3: "Tư duy sáng tạo & hoạt ngôn",
        4: "Xây dựng nền tảng vững vàng",
        5: "Khao khát thay đổi & phiêu lưu",
        6: "Trách nhiệm gia đình & tình thương",
        7: "Nghiên cứu khoa học & triết lý",
        8: "Khả năng quản lý & làm chủ",
        9: "Hoạt động cộng đồng & chia sẻ",
        11: "Định hướng tâm linh & trực giác",
        22: "Tầm nhìn kiến tạo tầm cỡ lớn",
        33: "Yêu thương vô điều kiện"
    };
    return list[num] || "Chỉ số sứ mệnh năng động";
}

export function getSoulUrgeTitle(num: number): string {
    const list: Record<number, string> = {
        1: "Khao khát độc lập, dẫn đầu",
        2: "Thèm muốn sự kết nối ấm áp",
        3: "Khao khát biểu đạt nghệ thuật",
        4: "Mong ước an toàn, rõ ràng",
        5: "Khao khát khám phá thế giới tự do",
        6: "Khao khát chăm sóc tổ ấm gia đình",
        7: "Mong mỏi tìm kiếm sự chân lý",
        8: "Khao khát tự chủ bản thân",
        9: "Khao khát cống hiến cho đời",
        11: "Khát khao chia sẻ tâm hồn trực giác",
        22: "Khao khát xây dựng giá trị bền vững",
        33: "Khao khát làm chỗ dựa tình thương lớn"
    };
    return list[num] || "Mong ước thầm kín đặc biệt";
}

export function getPersonalityTitle(num: number): string {
    const list: Record<number, string> = {
        1: "Vẻ ngoài tự tin, có phong thái lãnh đạo",
        2: "Dịu dàng, nhã nhặn, dễ thương cảm mến",
        3: "Hoạt ngôn, nhanh nhẹn, vui tươi dí dỏ",
        4: "Nghiêm túc, ngăn nắp, đáng tin cậy",
        5: "Năng động, cuốn hút, ưa thay đổi mới lạ",
        6: "Ấm áp, chăm chút, quan tâm mọi người",
        7: "Khép kín, bí ẩn, ham học hỏi độc lập",
        8: "Đĩnh đạc, bản lĩnh, mạnh mẽ cương trực",
        9: "Thân thiện, bao dung, luôn sẵn sàng giúp đỡ"
    };
    return list[num] || "Cá tính bên ngoài thân thiện";
}

export function getBirthdayTitle(num: number): string {
    const list: Record<number, string> = {
        1: "Năng lực quyết đoán tự lập sớm",
        2: "Nhạy cảm, trực giác tinh tế",
        3: "Khả năng truyền đạt lời nói xuất sắc",
        4: "Tính cẩn trọng tỉ mỉ cao",
        5: "Sức hút đổi mới sáng tạo",
        6: "Năng lực mỹ thuật phong phú",
        7: "Thích tự học qua sách vở",
        8: "Óc tổ chức thực tế nhạy bén",
        9: "Tấm lòng nhân ái rộng mở",
        11: "Trực giác siêu nhạy bén bẩm sinh",
        22: "Tư duy quy mô lớn từ nhỏ"
    };
    return list[num] || "Món quà bẩm sinh cát tường";
}

export function getAttitudeTitle(num: number): string {
    const list: Record<number, string> = {
        1: "Bản lĩnh đối diện thử thách tự lập",
        2: "Tiếp cận mềm mỏng, tránh tranh cãi",
        3: "Phản ứng vui vẻ, lan tỏa tiếng cười",
        4: "Cần thời gian xem xét phân tích kỹ",
        5: "Tò mò tìm kiếm giải pháp đột phá",
        6: "Lo lắng bảo bọc những người xung quanh",
        7: "Tự mình tìm tòi, thích yên tĩnh một mình",
        8: "Giữ phong thái tự tin vững vàng",
        9: "Bao dung, cởi mở tiếp nhận đổi mới"
    };
    return list[num] || "Thái độ phản ứng tự nhiên";
}

export function getPersonalMonthDesc(num: number): string {
    const list: Record<number, string> = {
        1: "Tháng của khởi đầu mới, dự án học tập mới.",
        2: "Tháng của lắng nghe, kết nối tình bạn chan hòa.",
        3: "Tháng của bộc lộ tài năng ngôn ngữ, vẽ tranh nghệ thuật.",
        4: "Tháng của củng cố thói quen ngăn nắp, kỷ luật.",
        5: "Tháng của dã ngoại khám phá, vận động ngoài trời.",
        6: "Tháng của gia đình gắn kết, bồi đắp lòng nhân từ.",
        7: "Tháng của đọc sách, suy ngẫm sâu nội tâm tự lập.",
        8: "Tháng của rèn luyện tính độc lập, tự làm việc cá nhân.",
        9: "Tháng của chia sẻ yêu thương, quyên góp giúp đỡ bạn bè."
    };
    return list[num] || "Thời kỳ tích lũy năng lượng.";
}

export function getPersonalDayDesc(num: number): string {
    const list: Record<number, string> = {
        1: "Ngày lý tưởng để tự giải quyết bài tập cá nhân.",
        2: "Ngày của chia sẻ tình cảm ấm áp ôn hòa.",
        3: "Ngày của ca hát vẽ tranh tươi vui nhộn nhịp.",
        4: "Ngày của dọn dẹp phòng ngủ ngăn nắp gọn gàng.",
        5: "Ngày của vui chơi chạy nhảy học hỏi tự do.",
        6: "Ngày giúp đỡ mẹ nấu cơm, chăm sóc gia đình.",
        7: "Ngày yên tĩnh đọc cuốn sách mới bổ ích.",
        8: "Ngày thể hiện bản lĩnh kiên định làm chủ.",
        9: "Ngày của sự bao dung chia sẻ cởi mở."
    };
    return list[num] || "Ngày bình an cát tường.";
}

export function getPersonalYearDesc(num: number): string {
    const list: Record<number, string> = {
        1: "Năm số 1 (Gieo hạt, Khởi đầu mới): Thời điểm vàng để mở ra dự án mới, thay đổi công việc, bứt phá giới hạn. Áp lực cao nhưng phần thưởng lớn.",
        2: "Năm số 2 (Nuôi dưỡng, Kết nối): Tốc độ chậm lại. Tập trung vào ngoại giao, xây dựng mối quan hệ, lắng nghe trực giác và chăm sóc sức khỏe tinh thần.",
        3: "Năm số 3 (Mở rộng, Học hỏi): Năm của sự sáng tạo, học thêm kỹ năng mới, giao lưu xã hội và thể hiện bản thân. Cẩn trọng khẩu nghiệp.",
        4: "Năm số 4 (Củng cố, Quản trị): Năm của sự chậm rãi, kỷ luật, dọn dẹp hệ thống, mua sắm bất động sản hoặc tích lũy tài sản. Tránh đầu tư mạo hiểm.",
        5: "Năm số 5 (Đột phá, Tự do): Năm của sự dịch chuyển (du lịch, đổi chỗ ở), nhiều cơ hội bất ngờ xuất hiện. Cần giữ chân trên mặt đất để không sa ngã.",
        6: "Năm số 6 (Trách nhiệm, Gia đình): Tâm điểm dồn vào mái ấm, người thân, cống hiến cho cộng đồng. Sáng tạo nghệ thuật thăng hoa.",
        7: "Năm số 7 (Trải nghiệm, Học sâu): Năm đáy chu kỳ (năm trũng). Thường gặp thử thách để quay vào bên trong thiền định, học tập, nghiên cứu. Hạn chế mở rộng kinh doanh lớn.",
        8: "Năm số 8 (Thu hoạch, Tài chính): Năm của sự bùng nổ về mặt vật chất, tiền bạc, cơ hội thăng tiến nếu các năm trước đã gieo hạt tốt. Sức mạnh nhân quả thực thi rõ nhất.",
        9: "Năm số 9 (Buông bỏ, Hoàn thành): Kết thúc chu kỳ cũ. Khép lại những mối quan hệ độc hại, tha thứ, dọn dẹp quá khứ để chuẩn bị cho một hạt giống mới ở năm số 1 tiếp theo."
    };
    return list[num] || "Giai đoạn tích lũy vận hành năng lượng mới.";
}

export function getChallengeAdvice(val: number): string {
    const info = getChallengeInfo(val);
    if (info) return info.lesson;
    return "Giữ vững tinh thần cởi mở học hỏi.";
}

export function getParentingGuidance(lp: number): ParentingGuidanceInfo {
    const reduced = lp > 9 && ![11, 22, 33].includes(lp) ? reduceNumber(lp, false) : lp;
    return PARENTING_GUIDANCE[reduced] || {
        title: "Đồng hành và hướng dẫn con bằng tình yêu thương",
        strengths: "Con sở hữu một thế giới nội tâm độc lập và các năng lực tiềm ẩn bẩm sinh.",
        direction: "Khuyến khích con học thông qua trải nghiệm trực quan sinh động và tự do sáng tạo.",
        advice: "Cha mẹ hãy luôn làm bạn đồng hành tin cậy, lắng nghe và chia sẻ chân thành cùng con trên mọi bước đường trưởng thành."
    };
}

export function getPinnacleMeaning(val: number): PinnacleMeaningInfo {
    const reduced = val > 9 && ![11, 22].includes(val) ? reduceNumber(val, false) : val;
    return PINNACLE_MEANINGS[reduced] || {
        title: "Giai đoạn tích lũy năng lượng mới",
        desc: "Cơ hội củng cố các kỹ năng bẩm sinh và chuẩn bị cho những bước ngoặt lớn.",
        advice: "Giữ tinh thần tích cực, cởi mở học hỏi và thích nghi linh hoạt."
    };
}
