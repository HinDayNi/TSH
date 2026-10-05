import { describe, it, expect } from 'vitest';
import {
    normalizeVietnamese,
    stripAccents,
    classifyLetter,
    classifyWord,
    classifyWordLetters,
    calculateNameNumbers,
    calculateLifePath,
    calculateBirthChart,
    calculatePinnacles,
    calculatePersonalYear,
    reduceNumber,
    reduceWithKarmicCheck,
    RuleEngine,
    FengShui,
    getFengShuiElement,
    getNguHanhCompatibility,
    evaluateCustomName,
    scoreNameCombination,
    getIntelligenceScores,
    getParentingGuidance,
    getPinnacleMeaning,
    getChallengeInfo,
    getChallengeAdvice,
    getMaturityInfo,
    getRationalThoughtInfo,
    getLifePathMetadata,
    getExpressionTitle,
    getSoulUrgeTitle,
    getPersonalityTitle,
    getBirthdayTitle,
    getAttitudeTitle,
    getPersonalMonthDesc,
    getPersonalDayDesc,
    getPersonalYearDesc,
    VIETNAMESE_SYLLABLES,
    KARMIC_DEBT_NUMBERS,
    NUMEROLOGY_DETAILS
} from './calculator';

describe('Numerology Pure TypeScript Engine', () => {

    describe('1. Chuẩn hóa tiếng Việt (normalizeVietnamese & stripAccents)', () => {
        it('bỏ dấu thanh và chuyển về ký tự La-tinh in hoa', () => {
            expect(normalizeVietnamese('Nguyễn')).toBe('NGUYEN');
            expect(normalizeVietnamese('Nguyễn Văn Huy')).toBe('NGUYEN VAN HUY');
            expect(normalizeVietnamese('Trần Thị Thùy')).toBe('TRAN THI THUY');
            expect(normalizeVietnamese('Đặng Quốc Vũ')).toBe('DANG QUOC VU');
            expect(normalizeVietnamese('Lê Đỗ Quỳnh Hương')).toBe('LE DO QUYNH HUONG');
        });

        it('xử lý ký tự đặc biệt và khoảng trắng thừa', () => {
            expect(normalizeVietnamese('   Phạm    Ngọc   Ánh!  ')).toBe('PHAM NGOC ANH');
        });

        it('stripAccents tương thích chính xác', () => {
            expect(stripAccents('Nguyễn Văn Huy')).toBe('NGUYEN VAN HUY');
            expect(stripAccents('Đỗ Đức Trí')).toBe('DO DUC TRI');
            expect(stripAccents('')).toBe('');
        });
    });

    describe('2. Quy tắc xác định chữ "Y" (Nguyên âm vs Phụ âm)', () => {
        it('tính là NGUYÊN ÂM khi đứng một mình hoặc chỉ đi cùng phụ âm (VY, LY, Y)', () => {
            expect(classifyLetter('V', 0, 'VY')).toBe('CONSONANT');
            expect(classifyLetter('Y', 1, 'VY')).toBe('VOWEL');
            expect(classifyLetter('L', 0, 'LY')).toBe('CONSONANT');
            expect(classifyLetter('Y', 1, 'LY')).toBe('VOWEL');
            expect(classifyLetter('Y', 0, 'Y')).toBe('VOWEL');
            expect(classifyLetter('Y', 1, 'MY')).toBe('VOWEL');
            expect(classifyLetter('Y', 2, 'THY')).toBe('VOWEL');
        });

        it('tính là NGUYÊN ÂM khi thuộc vần "UY" (HUY, THUY, DUY)', () => {
            const huy = classifyWord('HUY');
            expect(huy.letters.find(l => l.char === 'H')?.category).toBe('CONSONANT');
            expect(huy.letters.find(l => l.char === 'U')?.category).toBe('VOWEL');
            expect(huy.letters.find(l => l.char === 'Y')?.category).toBe('VOWEL');

            const thuy = classifyWord('THUY');
            const thuyY = thuy.letters[3];
            expect(thuyY.char).toBe('Y');
            expect(thuyY.category).toBe('VOWEL');

            const duy = classifyWord('DUY');
            expect(duy.letters[2].char).toBe('Y');
            expect(duy.letters[2].category).toBe('VOWEL');
        });

        it('tính là PHỤ ÂM khi đứng đầu từ có nguyên âm sau nó (YEN, YEU)', () => {
            expect(classifyLetter('Y', 0, 'YEN')).toBe('CONSONANT');
            expect(classifyLetter('E', 1, 'YEN')).toBe('VOWEL');
            expect(classifyLetter('N', 2, 'YEN')).toBe('CONSONANT');
            expect(classifyLetter('Y', 0, 'YEU')).toBe('CONSONANT');
        });

        it('tính là PHỤ ÂM khi đứng sau A hoặc E (MAY, BEY)', () => {
            const may = classifyWord('MAY');
            expect(may.letters[0].category).toBe('CONSONANT');
            expect(may.letters[1].category).toBe('VOWEL');
            expect(may.letters[2].category).toBe('CONSONANT');

            const bey = classifyWord('BEY');
            expect(bey.letters[2].category).toBe('CONSONANT');
        });

        it('classifyWordLetters trả về đúng định dạng mảng ký tự', () => {
            const items = classifyWordLetters('HUY');
            expect(items).toEqual([
                { char: 'H', type: 'consonant' },
                { char: 'U', type: 'vowel' },
                { char: 'Y', type: 'vowel' }
            ]);
        });
    });

    describe('3. Rút gọn số (reduceNumber & reduceWithKarmicCheck)', () => {
        it('bảo toàn các số Master khi keepMaster = true', () => {
            expect(reduceNumber(11, true)).toBe(11);
            expect(reduceNumber(22, true)).toBe(22);
            expect(reduceNumber(33, true)).toBe(33);
        });

        it('rút gọn thông thường về 1 chữ số khi không phải Master', () => {
            expect(reduceNumber(15)).toBe(6);
            expect(reduceNumber(28)).toBe(1);
            expect(reduceNumber(34)).toBe(7);
        });

        it('rút gọn cả Master nếu keepMaster = false', () => {
            expect(reduceNumber(11, false)).toBe(2);
            expect(reduceNumber(22, false)).toBe(4);
            expect(reduceNumber(33, false)).toBe(6);
        });

        it('reduceWithKarmicCheck phát hiện chính xác số Nợ nghiệp', () => {
            const res13 = reduceWithKarmicCheck(13);
            expect(res13.value).toBe(4);
            expect(res13.karmicDebts).toContain(13);

            const res19 = reduceWithKarmicCheck(19);
            expect(res19.value).toBe(1);
            expect(res19.karmicDebts).toContain(19);

            const resNormal = reduceWithKarmicCheck(25);
            expect(resNormal.value).toBe(7);
            expect(resNormal.karmicDebts).toHaveLength(0);
        });
    });

    describe('4. Trường hợp thực tế: Nguyễn Văn Huy, sinh ngày 1990-11-22', () => {
        const name = 'Nguyễn Văn Huy';
        const dob = '1990-11-22';

        it('phân tích tên: chữ Y trong Huy là nguyên âm, tính đúng Soul Urge và Personality', () => {
            const nameResult = calculateNameNumbers(name);
            expect(nameResult.normalizedName).toBe('NGUYEN VAN HUY');

            const huyWord = nameResult.words.find(w => w.word === 'HUY');
            expect(huyWord).toBeDefined();
            const yLetter = huyWord?.letters.find(l => l.char === 'Y');
            expect(yLetter?.category).toBe('VOWEL');
            expect(yLetter?.pythagoreanValue).toBe(7);

            expect(nameResult.expressionNumber).toBeGreaterThan(0);
            expect(nameResult.soulUrgeNumber).toBeGreaterThan(0);
            expect(nameResult.personalityNumber).toBeGreaterThan(0);
        });

        it('tính Con số Chủ đạo theo Matthew Oliver Goodwin', () => {
            const lpResult = calculateLifePath(dob);
            expect(lpResult.reducedYear).toBe(1);
            expect(lpResult.reducedMonth).toBe(11);
            expect(lpResult.reducedDay).toBe(22);
            expect(lpResult.totalSum).toBe(34);
            expect(lpResult.lifePath).toBe(7);
            expect(lpResult.isMaster).toBe(false);
        });

        it('tạo Ma trận 3x3 và xác định Mũi tên cá tính đầy đủ và trống', () => {
            const chart = calculateBirthChart(dob);
            expect(chart.digitCounts[1]).toBe(3);
            expect(chart.digitCounts[2]).toBe(2);
            expect(chart.digitCounts[9]).toBe(2);

            expect(chart.matrix3x3[0]).toEqual([0, 0, 2]);
            expect(chart.matrix3x3[1]).toEqual([2, 0, 0]);
            expect(chart.matrix3x3[2]).toEqual([3, 0, 0]);

            const emptyArrowIds = chart.emptyArrows.map(a => a.id);
            expect(emptyArrowIds).toContain('WILLPOWER_456');
            expect(emptyArrowIds).toContain('SPIRITUAL_357');
            expect(chart.fullArrows.length).toBe(0);
        });
    });

    describe('5. Trường hợp thực tế: Trần Thị Thùy, sinh ngày 1985-05-29', () => {
        const name = 'Trần Thị Thùy';
        const dob = '1985-05-29';

        it('phân tích tên: chữ Y trong Thùy là nguyên âm thuộc vần UY', () => {
            const nameResult = calculateNameNumbers(name);
            expect(nameResult.normalizedName).toBe('TRAN THI THUY');

            const thuyWord = nameResult.words.find(w => w.word === 'THUY');
            expect(thuyWord).toBeDefined();
            const yLetter = thuyWord?.letters.find(l => l.char === 'Y');
            expect(yLetter?.category).toBe('VOWEL');
        });

        it('tính Con số Chủ đạo theo Matthew Oliver Goodwin (bảo toàn Master Day 29 -> 11)', () => {
            const lpResult = calculateLifePath(dob);
            expect(lpResult.reducedYear).toBe(5);
            expect(lpResult.reducedMonth).toBe(5);
            expect(lpResult.reducedDay).toBe(11);
            expect(lpResult.totalSum).toBe(21);
            expect(lpResult.lifePath).toBe(3);
            expect(lpResult.isMaster).toBe(false);
        });

        it('tạo Ma trận 3x3 và xác định Mũi tên đầy đủ', () => {
            const chart = calculateBirthChart(dob);
            expect(chart.digitCounts[1]).toBe(1);
            expect(chart.digitCounts[2]).toBe(1);
            expect(chart.digitCounts[5]).toBe(2);
            expect(chart.digitCounts[8]).toBe(1);
            expect(chart.digitCounts[9]).toBe(2);

            const fullArrowIds = chart.fullArrows.map(a => a.id);
            expect(fullArrowIds).toContain('DETERMINATION_159');
            expect(fullArrowIds).toContain('EMOTIONAL_258');
            expect(chart.emptyArrows.length).toBe(0);
        });
    });

    describe('6. Master Numbers & Kim tự tháp & Năm cá nhân', () => {
        it('nhận diện chính xác Life Path Master 11, 22, 33', () => {
            expect(calculateLifePath('1978-02-02').lifePath).toBe(11);
            expect(calculateLifePath('1989-09-04').lifePath).toBe(22);
            expect(calculateLifePath('2009-11-11').lifePath).toBe(33);
        });

        it('tính 4 đỉnh cao Kim tự tháp (calculatePinnacles)', () => {
            const res = calculatePinnacles('1990-11-22', 7);
            expect(res.firstPinnacleAge).toBe(29); // 36 - 7 = 29
            expect(res.pinnacles).toHaveLength(4);
            expect(res.pinnacles[0].value).toBeGreaterThan(0);
            expect(res.pinnacles[0].theme).toBeDefined();
        });

        it('tính Năm cá nhân (calculatePersonalYear)', () => {
            const pyRes = calculatePersonalYear('1990-11-22', 2026);
            expect(pyRes.year).toBe(2026);
            expect(pyRes.personalYear).toBeGreaterThanOrEqual(1);
            expect(pyRes.personalYear).toBeLessThanOrEqual(9);
            expect(pyRes.keyword).toBeDefined();
        });
    });

    describe('7. RuleEngine: Đầy đủ logic Số chủ đạo, Tên, Chỉ số ngày sinh', () => {
        const dob = '1990-11-22';
        const fullName = 'Nguyễn Văn Huy';

        it('RuleEngine.calculateLifePath tính chính xác và nhận diện nợ nghiệp', () => {
            const lpRes = RuleEngine.calculateLifePath(dob);
            expect(lpRes.lifePath).toBe(7);
            expect(lpRes.lifePathMethod1).toBe(7);
            expect(lpRes.lifePathMethod2).toBe(7);
            expect(lpRes.rawSum).toBe(7);

            // Kiểm tra trường hợp nợ nghiệp 19: 1990-09-09 -> Year=1, Month=9, Day=9 -> total=19
            const debtRes = RuleEngine.calculateLifePath('1990-09-09');
            expect(debtRes.hasDebt).toBe(true);
            expect(debtRes.karmicDebts).toContain(19);
            expect(debtRes.lifePath).toBe(1);
        });

        it('RuleEngine.calculateNameNumbers tính Sứ mệnh, Linh hồn, Nhân cách', () => {
            const nameRes = RuleEngine.calculateNameNumbers(fullName);
            expect(nameRes.expression).toBeGreaterThan(0);
            expect(nameRes.soulUrge).toBeGreaterThan(0);
            expect(nameRes.personality).toBeGreaterThan(0);
            expect(nameRes.expressionRaw).toBeGreaterThan(0);
        });

        it('RuleEngine.calculateAttitude tính chỉ số thái độ', () => {
            const attitude = RuleEngine.calculateAttitude(dob);
            // 11 + 22 -> (1+1) + (2+2) = 2 + 4 = 6
            expect(attitude).toBe(6);
        });

        it('RuleEngine.calculateRationalThought tính tư duy lý trí', () => {
            const rt = RuleEngine.calculateRationalThought(dob, 5);
            expect(rt).toBeGreaterThan(0);
        });

        it('RuleEngine.calculateDayOfBirth tính đúng ngày sinh và nợ nghiệp ngày', () => {
            const dobObj = RuleEngine.calculateDayOfBirth('1995-05-14');
            expect(dobObj.rawDay).toBe(14);
            expect(dobObj.karmicDebts).toContain(14);
            expect(dobObj.birthday).toBe(5);
        });

        it('RuleEngine.calculatePersonalMetrics tính năm, tháng, ngày cá nhân', () => {
            const customDate = new Date(2026, 8, 12); // Sept 12, 2026
            const metrics = RuleEngine.calculatePersonalMetrics('1990-11-22', customDate);
            expect(metrics.targetYear).toBe(2026);
            expect(metrics.personalYear).toBeGreaterThanOrEqual(1);
            expect(metrics.personalMonth).toBeGreaterThanOrEqual(1);
            expect(metrics.personalDay).toBeGreaterThanOrEqual(1);
        });

        it('RuleEngine.calculateBirthGrid & calculateBodyMindSoul', () => {
            const grid = RuleEngine.calculateBirthGrid(dob, fullName);
            expect(grid.dobGrid).toHaveLength(10);
            expect(grid.totalGrid).toHaveLength(10);
            expect(Array.isArray(grid.activeArrows)).toBe(true);
            expect(Array.isArray(grid.emptyArrows)).toBe(true);

            const bms = RuleEngine.calculateBodyMindSoul(dob, fullName);
            expect(bms.body).toBeGreaterThan(0);
            expect(bms.soul).toBeGreaterThan(0);
            expect(bms.mind).toBeGreaterThan(0);
            expect(Math.round(bms.body + bms.soul + bms.mind)).toBeCloseTo(100, 0);
        });

        it('RuleEngine.calculateNameDetails tính cornerstone, capstone, balance', () => {
            const details = RuleEngine.calculateNameDetails(fullName);
            expect(details.cornerstone).toBe('H');
            expect(details.capstone).toBe('Y');
            expect(details.firstVowel).toBe('U');
            expect(details.balance).toBeGreaterThan(0);
            expect(Array.isArray(details.hiddenPassion)).toBe(true);
            expect(Array.isArray(details.karmicLessons)).toBe(true);
        });

        it('RuleEngine.calculateCyclesPinnacles & calculateMaturityNumber', () => {
            const timeline = RuleEngine.calculateCyclesPinnacles(dob, 7);
            expect(timeline.cycles.first).toBeDefined();
            expect(timeline.pinnacles).toHaveLength(4);
            expect(timeline.challenges).toHaveLength(4);

            const maturity = RuleEngine.calculateMaturityNumber(7, 3);
            expect(maturity).toBe(1); // 7 + 3 = 10 -> 1
        });
    });

    describe('8. Phong Thủy & Ngũ Hành (FengShui, getFengShuiElement, getNguHanhCompatibility)', () => {
        it('FengShui.getElementByYear xác định đúng ngũ hành theo năm sinh', () => {
            expect(FengShui.getElementByYear(1984)).toBe('Kim');
            expect(FengShui.getElementByYear(1990)).toBe('Thổ');
            expect(FengShui.getElementByYear(2026)).toBe('Thủy');
        });

        it('FengShui.getElementOfName xác định ngũ hành theo tên', () => {
            expect(FengShui.getElementOfName('Huy')).toBe('Hỏa');
            expect(FengShui.getElementOfName('An')).toBe('Thủy');
            expect(FengShui.getElementOfName('Bình')).toBe('Kim');
        });

        it('FengShui.getRelationship quan hệ sinh, hợp, khắc', () => {
            expect(FengShui.getRelationship('Kim', 'Thủy')).toBe('sinh');
            expect(FengShui.getRelationship('Kim', 'Kim')).toBe('hợp');
            expect(FengShui.getRelationship('Kim', 'Hỏa')).toBe('khắc');
        });

        it('getFengShuiElement trả về chi tiết nạp âm và màu sắc', () => {
            const el = getFengShuiElement('1990-05-15');
            expect(el.element).toBe('Thổ');
            expect(el.detail).toBe('Lộ Bàng Thổ');
            expect(el.color).toBe('#b5838d');
        });

        it('getNguHanhCompatibility tính tương sinh tương khắc giữa bố mẹ và con', () => {
            const resSinh = getNguHanhCompatibility('Thủy', 'Kim');
            expect(resSinh.type).toBe('Sinh');

            const resKhac = getNguHanhCompatibility('Mộc', 'Kim');
            expect(resKhac.type).toBe('Khắc');

            const resHoa = getNguHanhCompatibility('Kim', 'Kim');
            expect(resHoa.type).toBe('Hòa');
        });
    });

    describe('9. Đánh giá tên & Chấm điểm (evaluateCustomName, scoreNameCombination)', () => {
        it('evaluateCustomName phân tích tên đệm và tên chính', () => {
            const evaluated = evaluateCustomName('Minh Triết');
            expect(evaluated.name).toBe('Minh Triết');
            expect(evaluated.first.syllable).toBe('Triết');
            expect(evaluated.middle.syllable).toBe('Minh');
        });

        it('scoreNameCombination chấm điểm bộ tên hài hòa', () => {
            const middle = VIETNAMESE_SYLLABLES.find(s => s.syllable === 'Minh') || VIETNAMESE_SYLLABLES[0];
            const first = VIETNAMESE_SYLLABLES.find(s => s.syllable === 'Triết') || VIETNAMESE_SYLLABLES[1];
            const childData = {
                lp: 7,
                dob: '2026-05-15',
                lastName: 'Nguyễn',
                parents: { fatherDob: '1990-01-01', motherDob: '1992-02-02' },
                gridData: { emptyArrows: [] }
            };

            const scored = scoreNameCombination(middle, first, 'Bình an & Nhân hậu', childData);
            expect(scored.score).toBeGreaterThanOrEqual(30);
            expect(scored.score).toBeLessThanOrEqual(100);
            expect(scored.fullName).toContain('Nguyễn');
            expect(Array.isArray(scored.reasons)).toBe(true);
            expect(scored.breakdown).toBeDefined();
        });
    });

    describe('10. Metadata & Helper Titles', () => {
        it('getLifePathMetadata trả về thông tin Số chủ đạo', () => {
            const lp1 = getLifePathMetadata(1);
            expect(lp1.title).toContain('Dẫn Đường');
            expect(lp1.desc).toBeDefined();
        });

        it('getExpressionTitle, getSoulUrgeTitle, getPersonalityTitle', () => {
            expect(getExpressionTitle(1)).toBeDefined();
            expect(getSoulUrgeTitle(1)).toBeDefined();
            expect(getPersonalityTitle(1)).toBeDefined();
            expect(getBirthdayTitle(1)).toBeDefined();
            expect(getAttitudeTitle(1)).toBeDefined();
        });

        it('getPersonalMonthDesc, getPersonalDayDesc, getPersonalYearDesc', () => {
            expect(getPersonalMonthDesc(1)).toContain('khởi đầu');
            expect(getPersonalDayDesc(1)).toBeDefined();
            expect(getPersonalYearDesc(1)).toContain('Gieo hạt');
        });

        it('getChallengeInfo & getChallengeAdvice', () => {
            const chal1 = getChallengeInfo(1);
            expect(chal1?.title).toBeDefined();
            const advice = getChallengeAdvice(1);
            expect(advice).toBeDefined();
        });

        it('getMaturityInfo & getRationalThoughtInfo', () => {
            expect(getMaturityInfo(8)?.title).toContain('Trưởng thành 8');
            expect(getRationalThoughtInfo(4)?.title).toContain('Tư duy lý trí 4');
        });

        it('getIntelligenceScores, getParentingGuidance, getPinnacleMeaning', () => {
            const data = {
                lp: 7,
                gridData: {
                    totalGrid: [0, 2, 1, 1, 0, 1, 0, 1, 0, 2]
                }
            };
            const intel = getIntelligenceScores(data);
            expect(intel.logical).toBeGreaterThanOrEqual(4);
            expect(intel.linguistic).toBeGreaterThanOrEqual(4);

            const guidance = getParentingGuidance(7);
            expect(guidance.title).toBeDefined();

            const pMeaning = getPinnacleMeaning(1);
            expect(pMeaning.title).toBeDefined();
        });

        it('KARMIC_DEBT_NUMBERS & NUMEROLOGY_DETAILS xuất khẩu đúng định dạng', () => {
            expect(KARMIC_DEBT_NUMBERS).toEqual([13, 14, 16, 19]);
            expect(NUMEROLOGY_DETAILS[1].title).toBeDefined();
        });
    });
});
