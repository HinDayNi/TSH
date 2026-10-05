import { describe, it, expect } from 'vitest';
import {
    calculateCoupleCompatibility,
    calculateDailyMonthlyEnergy,
    optimizeNamesForMissingArrows
} from './retention';

describe('Advanced Retention Features (Gói 8)', () => {
    describe('1. Relationship Matrix (Bản đồ tương hợp Cặp đôi / Đối tác)', () => {
        it('tính toán chính xác chỉ số tương thích giữa 2 người', () => {
            const result = calculateCoupleCompatibility(
                { name: 'Nguyễn Văn Huy', dob: '1990-11-22' },
                { name: 'Trần Thị Thùy', dob: '1985-05-29' }
            );

            expect(result.person1.name).toBe('NGUYEN VAN HUY');
            expect(result.person1.lifePath).toBe(7);
            expect(result.person2.name).toBe('TRAN THI THUY');
            expect(result.person2.lifePath).toBe(3);

            // Điểm số tương hợp hợp lệ (0-100)
            expect(result.overallScore).toBeGreaterThanOrEqual(50);
            expect(result.overallScore).toBeLessThanOrEqual(100);
            expect(result.harmonyLevel).toBeDefined();

            // 3 trục tương hợp
            expect(result.aspects.lifePathMatch.score).toBeGreaterThan(0);
            expect(result.aspects.soulUrgeMatch.score).toBeGreaterThan(0);
            expect(result.aspects.communicationMatch.score).toBeGreaterThan(0);

            // Có bài học quan hệ và lời khuyên hành vi
            expect(result.relationshipLesson.length).toBeGreaterThan(10);
            expect(result.actionableAdvice.length).toBe(3);
        });
    });

    describe('2. Daily & Monthly Energy Tracker (Theo dõi năng lượng Ngày & Tháng)', () => {
        it('tính toán chính xác Ngày, Tháng và Năm cá nhân', () => {
            const testDate = new Date(2026, 8, 12); // Tháng 9 năm 2026
            const result = calculateDailyMonthlyEnergy('1990-11-22', testDate);

            expect(result.year).toBe(2026);
            expect(result.month).toBe(9);

            // Kiểm tra Năm và Tháng cá nhân hợp lệ (1-9)
            expect(result.personalYear).toBeGreaterThanOrEqual(1);
            expect(result.personalYear).toBeLessThanOrEqual(9);
            expect(result.personalMonth).toBeGreaterThanOrEqual(1);
            expect(result.personalMonth).toBeLessThanOrEqual(9);

            // Lịch 30 ngày tháng 9
            expect(result.monthCalendar.length).toBe(30);

            // Năng lượng ngày hôm nay
            expect(result.currentDayEnergy.day).toBe(12);
            expect(result.currentDayEnergy.personalDay).toBeGreaterThanOrEqual(1);
            expect(result.currentDayEnergy.personalDay).toBeLessThanOrEqual(9);
            expect(result.currentDayEnergy.keyword).toBeDefined();
            expect(result.currentDayEnergy.advice).toBeDefined();
        });
    });

    describe('3. Name Optimization Engine (Gợi ý tên bù khuyết)', () => {
        it('xác định đúng các số còn thiếu và gợi ý tên bù khuyết mũi tên trống', () => {
            // Ngày sinh 1990-11-22 có các số 1, 2, 9 -> thiếu 3, 4, 5, 6, 7, 8
            const result = optimizeNamesForMissingArrows('1990-11-22', 'BABY');

            expect(result.missingNumbers).toContain(3);
            expect(result.missingNumbers).toContain(4);
            expect(result.missingNumbers).toContain(5);

            // Mũi tên trống được phát hiện (ví dụ 4-5-6 hoặc 3-5-7)
            expect(result.emptyArrows.length).toBeGreaterThan(0);

            // Có danh sách gợi ý tên
            expect(result.suggestions.length).toBeGreaterThan(0);
            const top = result.suggestions[0];
            expect(top.suggestedName).toBeDefined();
            expect(top.balanceScoreAfter).toBeGreaterThan(60);
        });
    });
});
