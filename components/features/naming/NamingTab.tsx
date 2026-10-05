'use client';

import React, { useState, useEffect } from 'react';
import { 
    VIETNAMESE_SYLLABLES, 
    scoreNameCombination, 
    NUMEROLOGY_DETAILS, 
    NUMBER_MEANINGS, 
    stripAccents, 
    RuleEngine, 
    reduceNumber 
} from '@/lib/numerology/calculator';
import TabPageShell from '@/components/shared/TabPageShell';

export interface NamingTabProps {
    data: any;
    onCompare: (name: string) => void;
    onApply: (name: string) => void;
}

export default function NamingTab({ data, onCompare, onApply }: NamingTabProps) {
    const [wish, setWish] = useState('Bình an & Nhân hậu');
    const [totalCount, setTotalCount] = useState(12);
    const [genderFilter, setGenderFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (!data) return;

        setLoading(true);
        const timer = setTimeout(() => {
            const childGender = data.gender;
            const effectiveGender = genderFilter !== 'all' ? genderFilter : childGender;

            // Filter syllables
            const filteredSyllables = VIETNAMESE_SYLLABLES.filter((s: any) => {
                if (effectiveGender === "Nam") return s.gender === "Nam" || s.gender === "Unisex";
                else if (effectiveGender === "Nữ") return s.gender === "Nữ" || s.gender === "Unisex";
                return true;
            });

            // Generate Middle + First combination
            const candidates = [];
            const seen = new Set();
            for (let i = 0; i < filteredSyllables.length; i++) {
                const middle = filteredSyllables[i];
                for (let j = 0; j < filteredSyllables.length; j++) {
                    const first = filteredSyllables[j];
                    if (middle.syllable === first.syllable) continue;
                    if (first.is_middle) continue;
                    const key = `${middle.syllable}|${first.syllable}`;
                    if (seen.has(key)) continue;
                    seen.add(key);
                    candidates.push({ middle, first });
                }
            }

            // Score them
            const scored = candidates.map(cand => scoreNameCombination(cand.middle, cand.first, wish, data));
            scored.sort((a, b) => b.score - a.score);

            setResults(scored);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [data, wish, totalCount, genderFilter]);

    if (!data) return null;

    const homeNamesMap: Record<number, string[]> = {
        1: ["Leo", "Tép", "Tôm", "Gạo"],
        2: ["Chit", "Miu", "Đậu", "Mun"],
        3: ["Bé Ngoan", "Nini", "Tẹt", "Sữa"],
        4: ["Mon", "Mimi", "Kiki", "Bơ"],
        5: ["Bin", "Ben", "Bon", "Nene"],
        6: ["Xu Xu", "Thỏ", "Gấu", "Kem"],
        7: ["Sam", "Sóc", "Cá", "Dứa"],
        8: ["Bim", "Nem", "Rio", "Ken"],
        9: ["Bo", "Sunny", "Jerry", "Mickey"]
    };

    const karmicLessons = data.nameDetails?.karmicLessons || [];
    let homeSuggestions: string[] = [];
    if (karmicLessons.length === 0) {
        homeSuggestions = ["Bin", "Bo", "Ben", "Mon", "Miu"];
    } else {
        karmicLessons.slice(0, 3).forEach((num: number) => {
            const list = homeNamesMap[num] || [];
            homeSuggestions = homeSuggestions.concat(list);
        });
    }
    homeSuggestions = [...new Set(homeSuggestions)].slice(0, 8);

    const homeName = data.homeName;
    let homeExp = 0;
    let homeExpRaw = 0;
    let expInfo: any = null;
    let numMeaning: any = null;
    let isMaster = false;

    if (homeName) {
        const homeNameNums = RuleEngine.calculateNameNumbers(homeName);
        homeExp = homeNameNums.expression;
        homeExpRaw = homeNameNums.expressionRaw;
        expInfo = (NUMEROLOGY_DETAILS as any)[homeExp] || (NUMEROLOGY_DETAILS as any)[reduceNumber(homeExp, false)];
        numMeaning = (NUMBER_MEANINGS as any)[homeExp] || (NUMBER_MEANINGS as any)[reduceNumber(homeExp, false)];
        isMaster = [11, 22, 33].includes(homeExp);
    }

    return (
        <TabPageShell
            id="tab-naming"
            icon={<i className="fa-solid fa-wand-magic-sparkles text-pastel-blue"></i>}
            title={<>AI Gợi Ý Tên Cho Họ <span className="dynamic-highlight">{data.lastName}</span></>}
            subtitle="Tìm tên khai sinh và tên ở nhà tối ưu để bù đắp các góc khuyết sinh học"
            insights={
                <div className="score-guide-strip">
                    <div className="score-guide-item"><span className="guide-dot guide-dot-gold"></span> 90-100: Ưu tiên cao nhất</div>
                    <div className="score-guide-item"><span className="guide-dot guide-dot-blue"></span> 70-89: Tốt, có thể chọn</div>
                    <div className="score-guide-item"><span className="guide-dot guide-dot-sky"></span> 50-69: Cần cân nhắc</div>
                    <div className="score-guide-item"><span className="guide-dot guide-dot-gray"></span> Dưới 50: Không khuyến nghị</div>
                </div>
            }
        >
            <div className="glass-card">
                <h3>Cấu Hình Mong Muốn Đặt Tên</h3>
                <div className="naming-config-grid">
                    <div className="form-group">
                        <label htmlFor="namingWish">Thiên hướng ước nguyện cho bé</label>
                        <select 
                            id="namingWish"
                            value={wish}
                            onChange={(e) => setWish(e.target.value)}
                        >
                            <option value="Bình an & Nhân hậu">Bình an & Nhân hậu</option>
                            <option value="Thông minh & Tài lộc">Thông minh & Tài lộc</option>
                            <option value="Lãnh đạo & Thành công">Lãnh đạo & Thành công</option>
                            <option value="Sức khỏe & Tự do">Sức khỏe & Tự do</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="namingTotal">Số lượng tên đề xuất</label>
                        <select 
                            id="namingTotal"
                            value={totalCount}
                            onChange={(e) => setTotalCount(parseInt(e.target.value, 10))}
                        >
                            <option value="6">Top 6 tên tối ưu nhất</option>
                            <option value="12">Top 12 tên tối ưu nhất</option>
                            <option value="24">Top 24 tên tối ưu nhất</option>
                            <option value="50">Top 50 tên tối ưu nhất</option>
                        </select>
                    </div>
                </div>

                <div className="section-divider"></div>

                <div className="naming-filters-wrapper">
                    <span>Bộ lọc giới tính:</span>
                    <div className="naming-filter-buttons">
                        <button 
                            className={`naming-filter-btn ${genderFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setGenderFilter('all')}
                        >
                            Theo giới tính bé ({data.gender})
                        </button>
                        <button 
                            className={`naming-filter-btn ${genderFilter === 'Nam' ? 'active' : ''}`}
                            onClick={() => setGenderFilter('Nam')}
                        >
                            Tên Con Trai
                        </button>
                        <button 
                            className={`naming-filter-btn ${genderFilter === 'Nữ' ? 'active' : ''}`}
                            onClick={() => setGenderFilter('Nữ')}
                        >
                            Tên Con Gái
                        </button>
                    </div>
                </div>
            </div>

            <div className="section-divider"></div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '48px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ color: 'var(--primary)', fontSize: '2rem' }}></i>
                    <br /><br />
                    AI đang tính toán các tổ hợp tên tối ưu để lấp đầy số khuyết của bé...
                </div>
            ) : (
                <div className="ai-cards-grid" id="aiNameCardsContainer">
                    {results.slice(0, totalCount).map((r, idx) => {
                        const scoreColor = r.score >= 88 ? 'var(--pastel-green)' :
                                           r.score >= 72 ? 'var(--pastel-yellow)' :
                                           r.score >= 55 ? 'var(--pastel-orange)' : 'var(--pastel-pink)';
                        const scoreLabel = r.score >= 88 ? '🏆 Xuất sắc' :
                                           r.score >= 72 ? '⭐ Tốt' :
                                           r.score >= 55 ? '✓ Khá' : 'Cơ bản';

                        const bd = r.breakdown || {};
                        const breakdownRows = [
                            { label: 'Số học tương hợp', val: bd.numerologyMatch || 0, max: 35 },
                            { label: 'Bù số thiếu', val: bd.missingCompensation || 0, max: 30 },
                            { label: 'Ý nghĩa', val: bd.meaning || 0, max: 20 },
                            { label: 'Ngũ hành gia đình', val: bd.parentCompat || 0, max: 10 },
                            { label: 'Âm thanh', val: bd.pronunciation || 0, max: 5 },
                        ];

                        return (
                            <div key={idx} className="naming-card-v2">
                                <div className="nc2-rank">#{idx + 1}</div>
                                <div className="nc2-header">
                                    <div className="nc2-name">{data.lastName} {r.name}</div>
                                    <div className="nc2-badges">
                                        <span className="badge badge-element">{r.wuxing}</span>
                                        {r.hasMaster && <span className="badge badge-master">Master</span>}
                                        {r.hasDebt && <span className="badge badge-debt">Karmic</span>}
                                    </div>
                                </div>

                                <div className="nc2-score-row">
                                    <div className="nc2-score-circle" style={{ borderColor: scoreColor }}>
                                        <span className="nc2-score-num" style={{ color: scoreColor }}>{r.score}</span>
                                        <span className="nc2-score-label">{scoreLabel}</span>
                                    </div>
                                    <div className="nc2-numbers">
                                        <div className="nc2-num-item"><span className="nc2-num-val">{r.expression}</span><span className="nc2-num-lbl">Sứ mệnh</span></div>
                                        <div className="nc2-num-item"><span className="nc2-num-val">{r.soul}</span><span className="nc2-num-lbl">Linh hồn</span></div>
                                        <div className="nc2-num-item"><span className="nc2-num-val">{r.filledNumbers.length}</span><span className="nc2-num-lbl">Bù số</span></div>
                                    </div>
                                </div>

                                <div className="nc2-meaning">{r.meaning}</div>

                                <div className="nc2-breakdown">
                                    <div className="nc2-breakdown-title">Chi tiết điểm (100 điểm)</div>
                                    {breakdownRows.map(row => {
                                        const pct = Math.round((row.val / row.max) * 100);
                                        const barColor = pct >= 80 ? 'var(--pastel-green)' : pct >= 50 ? 'var(--pastel-blue)' : 'var(--pastel-orange)';
                                        return (
                                            <div key={row.label} className="breakdown-row">
                                                <span className="breakdown-label">{row.label}</span>
                                                <div className="breakdown-track">
                                                    <div className="breakdown-fill" style={{ width: `${pct}%`, background: barColor }}></div>
                                                </div>
                                                <span className="breakdown-pts">{row.val}/{row.max}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="nc2-reasons">
                                    {(r.reasons || []).slice(0, 3).map((rr: string, i: number) => {
                                        const isWarning = rr.includes('⚠');
                                        return (
                                            <span key={i} className={`reason-tag ${isWarning ? 'reason-warn' : 'reason-good'}`}>
                                                {rr}
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className="nc2-filled-nums">
                                    {r.filledNumbers.length > 0 ? (
                                        r.filledNumbers.map((n: number) => <span key={n} className="filled-num-badge">Bổ sung số {n}</span>)
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Không bổ sung số mới</span>
                                    )}
                                </div>

                                <div className="nc2-actions" style={{ display: 'flex', gap: '8px', marginTop: '12px', width: '100%' }}>
                                    <button 
                                        className="btn-secondary nc2-btn" 
                                        style={{ flex: 1 }}
                                        onClick={() => onCompare(r.name)}
                                    >
                                        <i className="fa-solid fa-code-compare"></i> So sánh
                                    </button>
                                    <button 
                                        className="btn-primary nc2-btn" 
                                        style={{ flex: 1, background: 'var(--primary)', border: 'none' }}
                                        onClick={() => onApply(r.name)}
                                    >
                                        <i className="fa-solid fa-check"></i> Áp dụng
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', padding: '8px 0' }}>
                        Hiển thị {Math.min(totalCount, results.length)} tên tốt nhất trong {results.length} tổ hợp được phân tích
                    </div>
                </div>
            )}

            <div className="section-divider"></div>

            {/* Suggested Home Names */}
            <div className="glass-card">
                <h3>Gợi Ý Tên Ở Nhà Bổ Khuyết</h3>
                <p className="card-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Gợi ý các biệt danh xinh xắn giúp bù đắp năng lượng thiếu hụt trong ngày sinh gốc của bé.
                </p>
                <div className="home-names-grid" id="home-names-suggestions">
                    {homeSuggestions.map(name => {
                        const nameVal = RuleEngine.calculateNameNumbers(name).expression;
                        return (
                            <div key={name} className="home-name-item">
                                {name}
                                <span className="home-name-num" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'normal', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    Sứ Mệnh: {nameVal}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Home Name Energy Analysis */}
            {homeName && (
                <div className="glass-card" id="home-name-energy-section" style={{ borderLeft: '4px solid var(--pastel-purple)' }}>
                    <h3>⚡ Năng Lượng Tên Ở Nhà &amp; Tương Tác Gia Đình</h3>
                    <p className="card-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        Tên được gọi hằng ngày trong gia đình tạo ra một <strong>luồng năng lượng thứ cấp</strong> ảnh hưởng đến tính cách của bé khi ở nhà.
                    </p>
                    <div id="home-name-energy-content">
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', alignItems: 'start', marginBottom: '16px' }}>
                            <div style={{ textAlign: 'center', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', padding: '16px 20px', minWidth: '80px' }}>
                                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--pastel-purple)', lineHeight: 1 }}>{homeExp}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Năng lượng</div>
                                {isMaster && <div style={{ fontSize: '0.65rem', color: '#f59e0b', marginTop: '3px' }}>★ Master {homeExp}</div>}
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                        Tên ở nhà: <em style={{ color: 'var(--pastel-purple)' }}>"{homeName}"</em>
                                    </span>
                                    {isMaster && (
                                        <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', marginLeft: '6px' }}>
                                            ✨ Master
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted" style={{ lineHeight: 1.5, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Quy đổi: <strong>{stripAccents(homeName)}</strong> → Tổng giá trị: <strong>{homeExpRaw}</strong> → Rút gọn: <strong>{homeExp}</strong>
                                </p>
                                {numMeaning && (
                                    <p className="text-xs" style={{ marginTop: '6px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        {numMeaning.vi}
                                    </p>
                                )}
                            </div>
                        </div>

                        {expInfo && (
                            <div style={{ background: 'rgba(139,92,246,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                                <p className="text-xs text-muted" style={{ lineHeight: 1.6, fontSize: '0.75rem', color: 'var(--text-muted)' }}><strong>🔮 Biểu hiện khi ở nhà:</strong> {expInfo.overview}</p>
                                {expInfo.strengths && <p className="text-xs" style={{ marginTop: '6px', color: '#34d399', fontSize: '0.75rem' }}><strong>✅ Điểm mạnh:</strong> {expInfo.strengths}</p>}
                                {expInfo.weaknesses && <p className="text-xs" style={{ marginTop: '4px', color: '#f87171', fontSize: '0.75rem' }}><strong>⚠️ Cần chú ý:</strong> {expInfo.weaknesses}</p>}
                            </div>
                        )}

                        <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '8px', padding: '10px' }}>
                            <p className="text-xs" style={{ lineHeight: 1.6, fontStyle: 'italic', fontSize: '0.75rem' }}>
                                <strong>💡 Gợi ý cho cha mẹ:</strong> Khi bé nghe tên <em>"{homeName}"</em> được gọi liên tục, bé sẽ tiếp nhận năng lượng của số <strong>{homeExp}</strong>.
                                {data.firstName ? ` So sánh với tên khai sinh (Sứ Mệnh số ` : ''}
                                {data.firstName ? <strong>{data.expression}</strong> : ''}
                                {data.firstName ? `), tên ở nhà ${homeExp === data.expression ? 'củng cố thêm' : 'bổ sung'} một luồng năng lượng ${homeExp === data.expression ? 'cùng tần số' : 'phụ'} trong môi trường gia đình.` : ''}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </TabPageShell>
    );
}
