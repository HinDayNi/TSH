'use client';

import React, { useState, useEffect } from 'react';
import { evaluateCustomName, scoreNameCombination } from '@/lib/numerology/calculator';
import TabPageShell from '@/components/shared/TabPageShell';

export interface CompareTabProps {
    data: any;
    compareNamesList: string[];
    onChangeCompareName: (index: number, val: string) => void;
}

export default function CompareTab({ data, compareNamesList, onChangeCompareName }: CompareTabProps) {
    const [wish, setWish] = useState('Bình an & Nhân hậu');
    const [results, setResults] = useState<any[]>([]);
    const [hasCalculated, setHasCalculated] = useState(false);

    // Run comparison when compareNamesList or wish changes, if we have at least 2 non-empty names
    const handleCompare = () => {
        if (!data) {
            alert("Vui lòng thực hiện tính toán thông tin bé trước!");
            return;
        }

        const activeNames = compareNamesList.filter(name => name && name.trim() !== "");
        if (activeNames.length < 2) {
            alert("Vui lòng nhập tối thiểu 2 tên để bắt đầu đối chiếu!");
            return;
        }

        const compResults = activeNames.map(name => {
            const parsed = evaluateCustomName(name);
            const scored = scoreNameCombination(parsed.middle, parsed.first, wish, data);

            return {
                name: name,
                score: scored.score,
                expression: scored.expression,
                soul: scored.soul,
                personality: scored.personality,
                filled: scored.filledCount,
                meaning: scored.breakdown ? scored.breakdown.meaning : 0,
                lpAlign: scored.breakdown ? scored.breakdown.numerologyMatch : 0,
                sound: scored.breakdown ? scored.breakdown.pronunciation : 0,
                rarity: scored.breakdown ? scored.breakdown.popularity : 0,
                wuxing: scored.wuxing,
                meaningText: scored.meaning
            };
        });

        setResults(compResults);
        setHasCalculated(true);
    };

    // Auto-run if at least 2 names are present
    useEffect(() => {
        const activeNames = compareNamesList.filter(name => name && name.trim() !== "");
        if (activeNames.length >= 2) {
            handleCompare();
        } else {
            setHasCalculated(false);
            setResults([]);
        }
    }, [compareNamesList, wish]);

    if (!data) return null;

    const sortedResults = [...results].sort((a, b) => b.score - a.score);
    const winner = sortedResults[0];

    // SVG parameters
    const svgWidth = 220;
    const svgHeight = 100;
    const barWidth = 25;
    const gap = 12;

    return (
        <TabPageShell
            id="tab-compare"
            icon={<i className="fa-solid fa-code-compare text-pastel-blue"></i>}
            title="So Sánh & Đối Chiếu Tên"
            subtitle="Nhập tối đa 5 tên để đối chiếu điểm số học và ngũ hành"
        >
            <div className="glass-card">
                <h3>Nhập Danh Sách Tên Muốn So Sánh Cho Họ <span className="dynamic-highlight">{data.lastName}</span></h3>
                <p className="card-desc">Bấm So sánh ở tab gợi ý tên để thêm nhanh vào đây, hoặc gõ trực tiếp tên đệm + tên chính.</p>

                <div className="naming-config-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                    {compareNamesList.map((name, idx) => (
                        <div key={idx} className="form-group">
                            <label htmlFor={`compareName${idx + 1}`}>Tên {idx + 1}</label>
                            <input 
                                type="text" 
                                id={`compareName${idx + 1}`} 
                                placeholder={`Ví dụ: ${idx === 0 ? 'Minh Anh' : idx === 1 ? 'Khánh Vy' : idx === 2 ? 'Gia Bảo' : idx === 3 ? 'Bình An' : 'Ngọc Linh'}`}
                                value={name}
                                onChange={(e) => onChangeCompareName(idx, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="form-row margin-top-md" style={{ alignItems: 'flex-end', gap: '15px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label htmlFor="compareWish">Chọn ước nguyện đối chiếu</label>
                        <select 
                            id="compareWish"
                            value={wish}
                            onChange={(e) => setWish(e.target.value)}
                        >
                            <option value="Bình an & Nhân hậu">Bình an & Nhân hậu</option>
                            <option value="Thông minh & Tài lộc">Thông minh & Tài lộc</option>
                            <option value="Lãnh đạo & Thành công">Lãnh đạo & Thành công</option>
                            <option value="Sức khỏe & Tự do">Sức khỏe & Tự do</option>
                        </select>
                    </div>
                    <button className="btn-primary" onClick={handleCompare} style={{ height: '42px', padding: '0 24px' }}>
                        <span>Đối Chiếu Ngay</span> <i className="fa-solid fa-calculator"></i>
                    </button>
                </div>
            </div>

            {hasCalculated && results.length >= 2 && (
                <div className="comparison-charts-section" id="comparisonChartsSection" style={{ display: 'block', marginTop: '20px' }}>
                    <div className="grid-2col">
                        {/* Winner Scorecard */}
                        <div className="glass-card flex-col items-center">
                            <h3>Lựa Chọn Đề Xuất Tối Ưu</h3>
                            <p className="card-desc">Cái tên tương hợp cao nhất theo RuleEngine AI</p>

                            <div className="family-score-row margin-top-md" style={{ width: '100%' }}>
                                <div className="family-score-circle" style={{ borderColor: 'var(--pastel-green)', background: 'rgba(16,185,129,0.05)' }}>
                                    <span className="family-score-num" style={{ color: 'var(--pastel-green)', fontSize: '1.8rem' }} id="compWinnerScore">
                                        {winner ? `${winner.score}/100` : ''}
                                    </span>
                                    <span className="family-score-label" id="compWinnerName">
                                        {winner ? winner.name : ''}
                                    </span>
                                </div>
                                <div className="family-score-desc" style={{ flex: 1 }}>
                                    <p className="text-sm" id="compare-winner-text">
                                        Kết luận đối chiếu: Cái tên <strong>{`"${data.lastName} ${winner.name}"`}</strong> (Mệnh {winner.wuxing}) là lựa chọn tối ưu nhất với <strong>{winner.score} điểm</strong>, giúp bù đắp <strong>{winner.filled}</strong> chỉ số khuyết trong biểu đồ và tương thích sâu với bố mẹ.
                                        <br />
                                        <span className="text-xs text-muted" style={{ display: 'block', marginTop: '5px' }}>
                                            {winner.meaningText}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bar Chart SVG */}
                        <div className="glass-card">
                            <h3>Biểu Đồ Đối Chiếu Điểm Số</h3>
                            <p className="card-desc">Tương quan trực quan tổng điểm của các tên đang so sánh</p>
                            <div className="bar-chart-container" id="compareBarChartContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '150px' }}>
                                    {results.map((res, idx) => {
                                        const x = gap + idx * (barWidth + gap);
                                        const h = (res.score / 100) * 65;
                                        const y = 80 - h;
                                        const isWinner = res.name === winner.name;

                                        return (
                                            <g key={res.name}>
                                                <rect
                                                    x={x}
                                                    y={y}
                                                    width={barWidth}
                                                    height={h}
                                                    fill={isWinner ? "var(--pastel-green)" : "var(--pastel-blue)"}
                                                    rx="3"
                                                />
                                                <text x={x + barWidth / 2} y={y - 2} className="bar-val">
                                                    {res.score}
                                                </text>
                                                <text x={x + barWidth / 2} y="92" className="bar-label">
                                                    {res.name.substring(0, 7)}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    {/* Comparison Matrix Table */}
                    <div className="glass-card">
                        <h3>Ma Trận Chấm Điểm Đối Chiếu Chi Tiết</h3>
                        <p className="card-desc">Bảng bóc tách điểm số chi tiết từng tiêu chí định danh</p>

                        <div className="table-responsive">
                            <table className="compare-matrix-table">
                                <thead>
                                    <tr>
                                        <th>Tên đề xuất</th>
                                        <th>Tổng điểm</th>
                                        <th>Sứ mệnh</th>
                                        <th>Linh hồn</th>
                                        <th>Nhân cách</th>
                                        <th>Ngũ hành</th>
                                        <th>Bù số thiếu</th>
                                        <th>Âm thanh</th>
                                    </tr>
                                </thead>
                                <tbody id="compare-matrix-body">
                                    {results.map(res => (
                                        <tr key={res.name} className={res.name === winner.name ? 'row-winner' : ''}>
                                            <td>
                                                <strong>{data.lastName} {res.name}</strong> 
                                                {res.name === winner.name && <span className="badge badge-element bg-success" style={{ marginLeft: '5px', fontSize: '9px', padding: '2px 4px' }}>Tốt nhất</span>}
                                            </td>
                                            <td><strong className="text-pastel-purple" style={{ fontSize: '1.05rem' }}>{res.score}/100</strong></td>
                                            <td><span>{res.expression}</span></td>
                                            <td><span>{res.soul}</span></td>
                                            <td><span>{res.personality}</span></td>
                                            <td><span className="badge badge-element">{res.wuxing}</span></td>
                                            <td><span className="text-pastel-blue">+{res.filled} số</span></td>
                                            <td><span>{res.sound}/5</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </TabPageShell>
    );
}
