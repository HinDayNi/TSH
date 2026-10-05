/**
 * Thuật toán chuyển đổi Âm lịch sang Dương lịch Việt Nam (Múi giờ GMT+7)
 * Dựa trên thuật toán thiên văn học chuẩn của TS. Hồ Ngọc Đức.
 */

const TIMEZONE = 7.0;

function jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
        jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }
    return jd;
}

function jdToDate(jd: number): [number, number, number] {
    let a: number, b: number, c: number;
    if (jd > 2299160) {
        a = jd + 32044;
        b = Math.floor((4 * a + 3) / 146097);
        c = a - Math.floor((b * 146097) / 4);
    } else {
        b = 0;
        c = jd + 32082;
    }
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = b * 100 + d - 4800 + Math.floor(m / 10);
    return [day, month, year];
}

function getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
    C1 = C1 - 0.0004 * Math.sin(3 * dr * Mpr);
    C1 = C1 + 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
    C1 = C1 - 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    C1 = C1 - 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
    C1 = C1 + 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);

    const deltat = (T < -11) ? (0.965843 + 0.000378 * T) : (0.00005 * T * T);
    const JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn: number, timeZone: number): number {
    const T = (jdn - 2451545.0 + 0.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const C = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M)
        + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
        + 0.000290 * Math.sin(dr * 3 * M);
    let theta = L0 + C;
    theta = theta * dr;
    theta = theta - Math.PI * 2 * Math.floor(theta / (Math.PI * 2));
    return Math.floor((theta / Math.PI) * 6);
}

function getLunarMonth11(yy: number, timeZone: number): number {
    let off = jdFromDate(31, 12, yy) - 2415021;
    let k = Math.floor(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    let sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
    let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
}

/**
 * Chuyển đổi Ngày/Tháng/Năm Âm lịch sang Dương lịch
 * @param lunarDay Ngày Âm lịch (1-30)
 * @param lunarMonth Tháng Âm lịch (1-12)
 * @param lunarYear Năm Âm lịch (1900-2100)
 * @param isLeap Tháng nhuận (mặc định false)
 */
export function convertLunarToSolar(
    lunarDay: number,
    lunarMonth: number,
    lunarYear: number,
    isLeap: boolean = false
): { day: number; month: number; year: number; formatted: string } {
    let a11: number;
    let b11: number;

    if (lunarMonth < 11) {
        a11 = getLunarMonth11(lunarYear - 1, TIMEZONE);
        b11 = getLunarMonth11(lunarYear, TIMEZONE);
    } else {
        a11 = getLunarMonth11(lunarYear, TIMEZONE);
        b11 = getLunarMonth11(lunarYear + 1, TIMEZONE);
    }

    let k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) {
        off += 12;
    }

    if (b11 - a11 > 365) {
        let leapOff = getLeapMonthOffset(a11, TIMEZONE);
        let leapMod = leapOff - 2;
        if (leapMod < 0) {
            leapMod += 12;
        }
        if (isLeap && lunarMonth === leapMod) {
            off = leapOff;
        } else if (off >= leapOff) {
            off += 1;
        }
    }

    const monthStart = getNewMoonDay(k + off, TIMEZONE);
    const solarJd = monthStart + lunarDay - 1;
    const [day, month, year] = jdToDate(solarJd);

    const pad = (n: number) => n.toString().padStart(2, '0');
    return {
        day,
        month,
        year,
        formatted: `${year}-${pad(month)}-${pad(day)}`
    };
}
