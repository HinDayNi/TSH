'use client';

import React, { useState } from 'react';
import { ChildProfileData, useProfile } from '@/lib/context/ProfileContext';
import { useNumberDetail } from '@/lib/context/NumberDetailContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface NumerologyMapProps {
    data: ChildProfileData;
    interactive?: boolean;
    onSelectNumber?: (type: string, val: number) => void;
    className?: string;
    size?: number;
}

export function NumerologyMap({
    data,
    interactive = true,
    onSelectNumber,
    className = '',
    size = 360
}: NumerologyMapProps) {
    const { openNumberDetail } = useNumberDetail();
    const { markGuideSeen } = useProfile();
    const [selectedPillar, setSelectedPillar] = useState<string>('lifepath');
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // 4 Key Pillars with exact angles and meanings
    const pillars = [
        {
            type: 'lifepath',
            label: 'Đường Đời',
            value: data.lp,
            angle: -90,
            color: '#5146A5',
            accent: '#C59B45',
            role: 'Hành trình & Bài học lớn nhất',
            desc: 'Định hướng sứ mệnh tiến hóa và năng lượng chủ đạo trong cả cuộc đời.'
        },
        {
            type: 'expression',
            label: 'Sứ Mệnh',
            value: data.expression,
            angle: 0,
            color: '#443A8C',
            accent: '#E7E4DD',
            role: 'Phương thức biểu đạt',
            desc: 'Cách bạn hành động và vận dụng tài năng bẩm sinh để đạt mục tiêu.'
        },
        {
            type: 'soulUrge',
            label: 'Linh Hồn',
            value: data.soulUrge,
            angle: 90,
            color: '#706E78',
            accent: '#E7E4DD',
            role: 'Khao khát nội tâm',
            desc: 'Động lực thầm kín mang lại sự thỏa mãn và bình yên sâu sắc.'
        },
        {
            type: 'personality',
            label: 'Nhân Cách',
            value: data.personality,
            angle: 180,
            color: '#1C1B22',
            accent: '#E7E4DD',
            role: 'Ấn tượng giao tiếp',
            desc: 'Phong thái bên ngoài và cách xã hội cảm nhận khi tiếp xúc với bạn.'
        }
    ];

    const center = size / 2;
    const radius = size * 0.36;
    const innerRadius = size * 0.20;

    const getCoords = (angleDeg: number, r: number) => {
        const rad = (angleDeg * Math.PI) / 180;
        return {
            x: center + r * Math.cos(rad),
            y: center + r * Math.sin(rad)
        };
    };

    // 9 Natural Sacred Harmonic Points (Numbers 1 to 9)
    const harmonicPoints = Array.from({ length: 9 }, (_, i) => {
        const num = i + 1;
        const angle = -90 + (i * 360) / 9;
        const coords = getCoords(angle, radius);
        const isUserNumber = pillars.some((p) => p.value === num);
        return { num, angle, coords, isUserNumber };
    });

    const activeKey = hoveredNode || selectedPillar;
    const activePillarData = pillars.find((p) => p.type === activeKey) || pillars[0];

    const handleNodeClick = (pillar: typeof pillars[0]) => {
        setSelectedPillar(pillar.type);
        // Đánh dấu đã tương tác với map để không hiển thị lại hint
        markGuideSeen('hasSeenMapHint');
        markGuideSeen('map-node-interaction');
        // Mở ngay Contextual Detail Panel bên phải để user không phải chuyển trang
        openNumberDetail({
            number: pillar.value,
            title: pillar.label,
            role: pillar.role,
            summary: pillar.desc,
            type: pillar.type
        });
        if (onSelectNumber) {
            onSelectNumber(pillar.type, pillar.value);
        }
    };

    return (
        <div
            data-tour="numerology-map"
            className={`flex flex-col items-center select-none ${className}`}
        >
            <div className="relative">
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className="overflow-visible"
                >
                    {/* Concentric Subtle Orbits */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#E7E4DD"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="transition-opacity duration-300"
                        style={{ opacity: hoveredNode ? 0.35 : 0.7 }}
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={innerRadius}
                        fill="none"
                        stroke="#E7E4DD"
                        strokeWidth="1"
                        className="transition-opacity duration-300"
                        style={{ opacity: hoveredNode ? 0.25 : 0.6 }}
                    />

                    {/* Connecting Ray Lines from Center to Each Pillar */}
                    {pillars.map((p) => {
                        const c = getCoords(p.angle, innerRadius + 24);
                        const isRelated = hoveredNode === p.type || selectedPillar === p.type;
                        return (
                            <line
                                key={`ray-${p.type}`}
                                x1={center}
                                y1={center}
                                x2={c.x}
                                y2={c.y}
                                stroke={isRelated ? '#5146A5' : '#E7E4DD'}
                                strokeWidth={isRelated ? 2 : 1}
                                strokeDasharray={isRelated ? undefined : '3 3'}
                                style={{
                                    opacity: hoveredNode ? (isRelated ? 1 : 0.15) : 0.5,
                                    transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            />
                        );
                    })}

                    {/* Sacred Geometry Connecting Polygon between User's 4 Core Numbers */}
                    <polygon
                        points={pillars
                            .map((p) => {
                                const c = getCoords(p.angle, innerRadius + 24);
                                return `${c.x},${c.y}`;
                            })
                            .join(' ')}
                        fill={hoveredNode ? 'rgba(81, 70, 165, 0.05)' : 'rgba(81, 70, 165, 0.02)'}
                        stroke="#5146A5"
                        strokeWidth={hoveredNode ? 1.5 : 1}
                        style={{
                            opacity: hoveredNode ? 0.65 : 0.3,
                            transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    />

                    {/* Central Harmonic Hub */}
                    <circle
                        cx={center}
                        cy={center}
                        r={22}
                        fill="#FFFFFF"
                        stroke="#E7E4DD"
                        strokeWidth="1.5"
                        className="shadow-subtle"
                    />
                    <text
                        x={center}
                        y={center + 4}
                        textAnchor="middle"
                        className="font-serif font-bold text-[10px] tracking-wider fill-[#1C1B22]"
                    >
                        NUMERO
                    </text>

                    {/* Outer Harmonic Orbital Points (1 to 9) */}
                    {harmonicPoints.map((pt) => {
                        const isAssociatedWithHover = activePillarData.value === pt.num;
                        return (
                            <g
                                key={pt.num}
                                className="transition-all duration-200"
                                style={{
                                    transformOrigin: `${pt.coords.x}px ${pt.coords.y}px`,
                                    transform: isAssociatedWithHover ? 'scale(1.15)' : 'scale(1)',
                                    opacity: hoveredNode ? (isAssociatedWithHover ? 1 : 0.3) : 0.8
                                }}
                            >
                                <circle
                                    cx={pt.coords.x}
                                    cy={pt.coords.y}
                                    r={13}
                                    fill={pt.isUserNumber ? (isAssociatedWithHover ? '#F1EFFA' : '#F8F7F4') : '#FFFFFF'}
                                    stroke={pt.isUserNumber ? (isAssociatedWithHover ? '#5146A5' : '#9E97D4') : '#E7E4DD'}
                                    strokeWidth={isAssociatedWithHover ? '2' : pt.isUserNumber ? '1.5' : '1'}
                                />
                                <text
                                    x={pt.coords.x}
                                    y={pt.coords.y + 4}
                                    textAnchor="middle"
                                    className={`font-serif text-xs font-semibold ${
                                        pt.isUserNumber ? 'fill-[#5146A5]' : 'fill-[#706E78]'
                                    }`}
                                >
                                    {pt.num}
                                </text>
                            </g>
                        );
                    })}

                    {/* 4 Core Pillars Nodes */}
                    {pillars.map((pillar) => {
                        const coords = getCoords(pillar.angle, innerRadius + 24);
                        const isHovered = hoveredNode === pillar.type;
                        const isSelected = selectedPillar === pillar.type;
                        const isActive = isHovered || isSelected;

                        return (
                            <g
                                key={pillar.type}
                                data-tour={pillar.type === 'lifepath' ? 'map-lifepath-node' : undefined}
                                className={interactive ? 'cursor-pointer' : ''}
                                style={{
                                    transformOrigin: `${coords.x}px ${coords.y}px`,
                                    transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                                onMouseEnter={() => setHoveredNode(pillar.type)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => handleNodeClick(pillar)}
                            >
                                {/* Soft Radiating Halo Effect */}
                                {isActive && (
                                    <>
                                        <circle
                                            cx={coords.x}
                                            cy={coords.y}
                                            r={28}
                                            fill={pillar.type === 'lifepath' ? 'rgba(197, 155, 69, 0.12)' : 'rgba(81, 70, 165, 0.08)'}
                                            style={{
                                                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                                            }}
                                        />
                                        <circle
                                            cx={coords.x}
                                            cy={coords.y}
                                            r={23}
                                            fill={pillar.type === 'lifepath' ? 'rgba(197, 155, 69, 0.22)' : 'rgba(81, 70, 165, 0.15)'}
                                            style={{
                                                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                                            }}
                                        />
                                    </>
                                )}

                                {/* Main Node Circle with Level-based sizing */}
                                <circle
                                    cx={coords.x}
                                    cy={coords.y}
                                    r={pillar.type === 'lifepath' ? 22 : 18}
                                    fill={pillar.type === 'lifepath' ? '#5146A5' : '#FFFFFF'}
                                    stroke={pillar.type === 'lifepath' ? '#C59B45' : isActive ? '#5146A5' : '#E7E4DD'}
                                    strokeWidth={pillar.type === 'lifepath' ? '2.5' : isActive ? '2' : '1.5'}
                                    style={{
                                        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                />

                                {/* Number Value */}
                                <text
                                    x={coords.x}
                                    y={coords.y + (pillar.type === 'lifepath' ? 5 : 4)}
                                    textAnchor="middle"
                                    className={`font-serif font-bold ${
                                        pillar.type === 'lifepath' ? 'text-base fill-white' : 'text-sm fill-[#1C1B22]'
                                    } select-none`}
                                >
                                    {pillar.value}
                                </text>

                                {/* Label Badge below/above the node */}
                                <text
                                    x={coords.x}
                                    y={coords.y + (pillar.angle === -90 ? -28 : 32)}
                                    textAnchor="middle"
                                    className={`text-[11px] font-sans font-medium tracking-tight select-none ${
                                        isActive ? 'fill-[#5146A5] font-semibold' : 'fill-[#706E78]'
                                    }`}
                                >
                                    {pillar.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Quick Micro-Insight Panel directly under the map */}
            <div className="w-full max-w-sm mt-3 p-3.5 rounded-xl bg-white border border-[#E7E4DD] shadow-subtle transition-all duration-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#5146A5]" />
                        <span className="text-xs font-semibold text-[#1C1B22]">
                            {activePillarData.label}: Số {activePillarData.value}
                        </span>
                        {activePillarData.type === 'lifepath' && (
                            <span className="text-[10px] font-bold text-[#C59B45] bg-[#EFE2C2]/40 px-1.5 py-0.5 rounded-full border border-[#C59B45]/20">
                                Chủ đạo
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleNodeClick(activePillarData)}
                        className="text-[11px] font-semibold text-[#5146A5] hover:text-[#443A8C] transition flex items-center gap-1 cursor-pointer"
                    >
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                <p className="text-[11px] text-[#706E78] mt-1 line-clamp-2 leading-relaxed">
                    {activePillarData.desc}
                </p>
            </div>
        </div>
    );
}

export default NumerologyMap;
