'use client';

import React from 'react';
import { 
    reduceNumber, 
    RuleEngine, 
    getFengShuiElement, 
    getNguHanhCompatibility 
} from '@/lib/numerology/calculator';
import TabPageShell from '@/components/shared/TabPageShell';

export interface CompatibilityTabProps {
    data: any;
}

export default function CompatibilityTab({ data }: CompatibilityTabProps) {
    if (!data) return null;

    const childLp = data.lp;
    const fatherName = data.parents?.fatherName;
    const fatherDob = data.parents?.fatherDob;
    const motherName = data.parents?.motherName;
    const motherDob = data.parents?.motherDob;

    const hasFather = !!fatherName && !!fatherDob;
    const hasMother = !!motherName && !!motherDob;

    const fNode = { x: 20, y: 35, name: "Bố", active: hasFather };
    const mNode = { x: 80, y: 35, name: "Mẹ", active: hasMother };
    const cNode = { x: 50, y: 70, name: data.firstName || "Con" };

    const friendlyGroups = [
        [1, 5, 7],
        [2, 4, 8, 11, 22],
        [3, 6, 9, 33]
    ];

    function areFriendly(n1: any, n2: any) {
        const reduced1 = reduceNumber(n1, false);
        const reduced2 = reduceNumber(n2, false);
        if (reduced1 === reduced2) return true;
        for (const g of friendlyGroups) {
            if (g.includes(reduced1) && g.includes(reduced2)) return true;
        }
        return false;
    }

    const childFS = getFengShuiElement(data.dob);

    let fatherCompat: any = null;
    let motherCompat: any = null;
    let totalScore = 0;
    let activeParents = 0;

    const harmonyBullets: string[] = [];
    const conflictBullets: string[] = [];

    if (hasFather) {
        activeParents++;
        const pLpObj = RuleEngine.calculateLifePath(fatherDob);
        const pNames = RuleEngine.calculateNameNumbers(fatherName);
        
        let score = 70;
        const friendly = areFriendly(childLp, pLpObj.lifePath);
        if (friendly) {
            score += 15;
            harmonyBullets.push(`Đường đời của con (${childLp}) và Bố (${pLpObj.lifePath}) cùng nhóm tương hợp. Bố và bé có chung nhiều quan điểm sống và phong cách định hướng.`);
        } else {
            score -= 10;
            conflictBullets.push(`Đường đời khác biệt giữa con (${childLp}) và Bố (${pLpObj.lifePath}). Bố nên lắng nghe cá tính riêng của con, kiên nhẫn hơn thay vì áp đặt phong cách của mình.`);
        }

        if (areFriendly(data.soulUrge, pNames.soulUrge)) {
            score += 15;
            harmonyBullets.push(`Linh hồn con (${data.soulUrge}) hòa nhịp sâu sắc với khát khao của Bố (${pNames.soulUrge}). Bố rất dễ hiểu tâm sự thầm kín của con.`);
        }
        score = Math.min(100, score);
        totalScore += score;

        const fatherFS = getFengShuiElement(fatherDob);
        const compat = getNguHanhCompatibility(childFS.element, fatherFS.element);
        fatherCompat = {
            name: fatherName,
            lp: pLpObj.lifePath,
            score,
            friendly,
            fs: fatherFS,
            compat
        };
    }

    if (hasMother) {
        activeParents++;
        const pLpObj = RuleEngine.calculateLifePath(motherDob);
        const pNames = RuleEngine.calculateNameNumbers(motherName);
        
        let score = 70;
        const friendly = areFriendly(childLp, pLpObj.lifePath);
        if (friendly) {
            score += 15;
            harmonyBullets.push(`Đường đời của con (${childLp}) và Mẹ (${pLpObj.lifePath}) cùng nhóm tương hợp. Mẹ và bé dễ chia sẻ suy nghĩ và thấu hiểu lẫn nhau.`);
        } else {
            score -= 10;
            conflictBullets.push(`Đường đời khác biệt giữa con (${childLp}) và Mẹ (${pLpObj.lifePath}). Mẹ cần kiên nhẫn, khuyến khích con bộc lộ năng khiếu tự nhiên thay vì lo lắng quá mức.`);
        }

        if (areFriendly(data.soulUrge, pNames.soulUrge)) {
            score += 15;
            harmonyBullets.push(`Linh hồn con (${data.soulUrge}) hòa nhịp sâu sắc với khát khao của Mẹ (${pNames.soulUrge}). Mẹ dễ đồng cảm và thấu hiểu nội tâm bé.`);
        }
        score = Math.min(100, score);
        totalScore += score;

        const motherFS = getFengShuiElement(motherDob);
        const compat = getNguHanhCompatibility(childFS.element, motherFS.element);
        motherCompat = {
            name: motherName,
            lp: pLpObj.lifePath,
            score,
            friendly,
            fs: motherFS,
            compat
        };
    }

    const averageScore = activeParents > 0 ? Math.round(totalScore / activeParents) : 0;

    let scoreLabel = "Trung bình";
    let scoreColor = "var(--primary-blue)";
    if (averageScore >= 85) {
        scoreLabel = "Tuyệt vời";
        scoreColor = "var(--pastel-green)";
    } else if (averageScore <= 65) {
        scoreLabel = "Cần kiên nhẫn";
        scoreColor = "var(--pastel-orange)";
    }

    return (
        <TabPageShell
            id="tab-compatibility"
            icon={<i className="fa-solid fa-people-roof text-pastel-blue"></i>}
            title="Liên Kết Gia Đình & Tương Hợp"
            subtitle="Khảo sát mức độ hòa hợp năng lượng giữa con cái và cha mẹ"
        >
            {!hasFather && !hasMother ? (
                <div className="compatibility-missing-section" style={{ display: 'block' }}>
                    <div className="glass-card text-center" style={{ padding: '40px 20px' }}>
                        <span style={{ fontSize: '3rem' }}>👨‍👩‍👧‍👦</span>
                        <h3 className="margin-top-md">Chưa Nhập Dữ Liệu Cha Mẹ</h3>
                        <p className="text-muted text-sm margin-top-sm" style={{ maxWidth: '500px', margin: '10px auto' }}>
                            Vui lòng kéo lên phần <strong>Dữ liệu cha mẹ</strong> ở Sidebar bên trái, nhập họ tên và ngày sinh của Bố và Mẹ để hệ thống tự động kết xuất mạng lưới liên kết tương thích gia đình!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="compatibility-available-section" style={{ display: 'block' }}>
                    <div className="grid-2col">
                        {/* Family compatibility scorecard & Network graph */}
                        <div className="glass-card">
                            <h3>Mạng Lưới Liên Kết Gia Đình</h3>
                            <p className="card-desc">Thể hiện trực quan khoảng cách tương hợp và sợi dây gắn kết giữa các thành viên.</p>

                            <div className="flex-col items-center">
                                <div className="family-score-row margin-top-md">
                                    <div className="family-score-circle" style={{ borderColor: scoreColor }}>
                                        <span className="family-score-num" style={{ color: scoreColor }}>{averageScore}</span>
                                        <span className="family-score-label">{scoreLabel}</span>
                                    </div>
                                    <div className="family-score-desc">
                                        <h4>Chỉ số Hòa Hợp Chung</h4>
                                        <p className="text-xs text-muted">
                                            Tính toán trên thang điểm 100 kết hợp số Đường Đời, khát khao Linh Hồn và tương trợ ngũ hành âm dương.
                                        </p>
                                    </div>
                                </div>

                                <div className="family-graph-wrapper margin-top-lg">
                                    <svg viewBox="0 0 100 100" id="familyNetworkGraph">
                                        {/* Father Link */}
                                        {fatherCompat && (
                                            <g>
                                                <line
                                                    x1={fNode.x}
                                                    y1={fNode.y}
                                                    x2={cNode.x}
                                                    y2={cNode.y}
                                                    className={`family-link ${fatherCompat.friendly ? 'family-link-harmony' : 'family-link-friction'}`}
                                                />
                                                <text x={(fNode.x + cNode.x) / 2} y={(fNode.y + cNode.y) / 2 - 4} className="family-link-value">
                                                    {`Hợp: ${fatherCompat.score}/100`}
                                                </text>
                                                {!fatherCompat.friendly && (
                                                    <g>
                                                        <circle cx={(fNode.x + cNode.x) / 2} cy={(fNode.y + cNode.y) / 2} r="2.5" className="family-warn-circle" />
                                                        <text x={(fNode.x + cNode.x) / 2} y={(fNode.y + cNode.y) / 2 + 0.8} className="family-warn-text">!</text>
                                                    </g>
                                                )}
                                            </g>
                                        )}

                                        {/* Mother Link */}
                                        {motherCompat && (
                                            <g>
                                                <line
                                                    x1={mNode.x}
                                                    y1={mNode.y}
                                                    x2={cNode.x}
                                                    y2={cNode.y}
                                                    className={`family-link ${motherCompat.friendly ? 'family-link-harmony' : 'family-link-friction'}`}
                                                />
                                                <text x={(mNode.x + cNode.x) / 2} y={(mNode.y + cNode.y) / 2 - 4} className="family-link-value">
                                                    {`Hợp: ${motherCompat.score}/100`}
                                                </text>
                                                {!motherCompat.friendly && (
                                                    <g>
                                                        <circle cx={(mNode.x + cNode.x) / 2} cy={(mNode.y + cNode.y) / 2} r="2.5" className="family-warn-circle" />
                                                        <text x={(mNode.x + cNode.x) / 2} y={(mNode.y + cNode.y) / 2 + 0.8} className="family-warn-text">!</text>
                                                    </g>
                                                )}
                                            </g>
                                        )}

                                        {/* Nodes */}
                                        {hasFather && (
                                            <g>
                                                <circle cx={fNode.x} cy={fNode.y} r="8" className="family-node-sub" />
                                                <text x={fNode.x} y={fNode.y + 1.5} className="family-node-lbl" style={{ fill: 'var(--text-main)' }}>{fNode.name}</text>
                                            </g>
                                        )}
                                        {hasMother && (
                                            <g>
                                                <circle cx={mNode.x} cy={mNode.y} r="8" className="family-node-sub" />
                                                <text x={mNode.x} y={mNode.y + 1.5} className="family-node-lbl" style={{ fill: 'var(--text-main)' }}>{mNode.name}</text>
                                            </g>
                                        )}
                                        <g>
                                            <circle cx={cNode.x} cy={cNode.y} r="11" className="family-node-main" />
                                            <text x={cNode.x} y={cNode.y + 1.5} className="family-node-lbl" style={{ fill: '#fff' }}>{cNode.name}</text>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bullets lists of advice */}
                        <div className="glass-card">
                            <h3>Luận Giải Chi Tiết Gia Đình</h3>
                            <p className="card-desc">Gợi ý cách thức thấu hiểu và gắn kết bền vững.</p>

                            <div className="compatibility-bullets-wrapper">
                                <h4 style={{ color: 'var(--pastel-green)', marginBottom: '8px' }}>
                                    <i className="fa-solid fa-circle-check"></i> Điểm Hòa Hợp (Harmony)
                                </h4>
                                <ul className="compat-bullets-list" id="compat-harmony-list">
                                    {harmonyBullets.length > 0 ? (
                                        harmonyBullets.map((b, i) => <li key={i}>{b}</li>)
                                    ) : (
                                        <li>Không có điểm tương hợp Đường đời / Linh hồn trực tiếp nổi bật.</li>
                                    )}
                                </ul>

                                <h4 style={{ color: 'var(--pastel-orange)', marginTop: '20px', marginBottom: '8px' }}>
                                    <i className="fa-solid fa-triangle-exclamation"></i> Điểm Cần Lưu Ý (Challenges)
                                </h4>
                                <ul className="compat-bullets-list compat-bullets-conflict" id="compat-conflict-list">
                                    {conflictBullets.length > 0 ? (
                                        conflictBullets.map((b, i) => <li key={i}>{b}</li>)
                                    ) : (
                                        <li>Tuyệt vời! Không có xung khắc lớn về mặt Đường đời cốt lõi.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    {/* Feng Shui Mệnh Niên cards row */}
                    <div className="glass-card">
                        <h3>Phong Thủy Ngũ Hành Bản Mệnh</h3>
                        <p className="card-desc">Phân tích ngũ hành Mệnh Niên hỗ trợ bé trong đời sống.</p>
                        
                        <div className="grids-row-container" style={{ gap: '15px' }} id="compatibility-cards-row">
                            {/* Con Card */}
                            <div className="glass-card text-center" style={{ borderTop: `4px solid ${childFS.color}`, flex: 1 }}>
                                <span style={{ fontSize: '1.8rem' }}>👶</span>
                                <h4 style={{ marginTop: '6px' }}>Con: {data.firstName || 'Bé'}</h4>
                                <p className="text-sm">Mệnh Niên: <strong style={{ color: childFS.color }}>{childFS.element} ({childFS.detail})</strong></p>
                            </div>

                            {/* Bố Card */}
                            {fatherCompat && (
                                <div className="glass-card text-center" style={{ borderTop: `4px solid ${fatherCompat.fs.color}`, flex: 1 }}>
                                    <span style={{ fontSize: '1.8rem' }}>👨</span>
                                    <h4 style={{ marginTop: '6px' }}>Bố: {fatherCompat.name}</h4>
                                    <p className="text-sm">Mệnh Niên: <strong style={{ color: fatherCompat.fs.color }}>{fatherCompat.fs.element} ({fatherCompat.fs.detail})</strong></p>
                                    <span className={`badge ${fatherCompat.compat.type === 'Sinh' ? 'bg-success' : fatherCompat.compat.type === 'Khắc' ? 'bg-danger' : 'bg-secondary'}`} style={{ fontSize: '0.75rem', marginTop: '8px', display: 'inline-block' }}>
                                        {fatherCompat.compat.label}
                                    </span>
                                </div>
                            )}

                            {/* Mẹ Card */}
                            {motherCompat && (
                                <div className="glass-card text-center" style={{ borderTop: `4px solid ${motherCompat.fs.color}`, flex: 1 }}>
                                    <span style={{ fontSize: '1.8rem' }}>👩</span>
                                    <h4 style={{ marginTop: '6px' }}>Mẹ: {motherCompat.name}</h4>
                                    <p className="text-sm">Mệnh Niên: <strong style={{ color: motherCompat.fs.color }}>{motherCompat.fs.element} ({motherCompat.fs.detail})</strong></p>
                                    <span className={`badge ${motherCompat.compat.type === 'Sinh' ? 'bg-success' : motherCompat.compat.type === 'Khắc' ? 'bg-danger' : 'bg-secondary'}`} style={{ fontSize: '0.75rem', marginTop: '8px', display: 'inline-block' }}>
                                        {motherCompat.compat.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="compatibility-narrative margin-top-md" id="compatibility-narrative-text">
                            {fatherCompat && <p dangerouslySetInnerHTML={{ __html: `<strong>Tương quan phong thủy với Bố:</strong> ${fatherCompat.compat.desc}` }} />}
                            {motherCompat && <p className="margin-top-xs" dangerouslySetInnerHTML={{ __html: `<strong>Tương quan phong thủy với Mẹ:</strong> ${motherCompat.compat.desc}` }} />}
                        </div>
                    </div>
                </div>
            )}
        </TabPageShell>
    );
}
