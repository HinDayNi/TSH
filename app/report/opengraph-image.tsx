import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Bản đồ Thần số học Pythagoras';

const ARCHETYPE_MAP: Record<string, string> = {
    '1': 'THE PIONEER - NGUOI TIEN PHONG',
    '2': 'THE PEACEMAKER - SU GIA HOA GIAI',
    '3': 'THE COMMUNICATOR - TRUYEN CAM HUNG',
    '4': 'THE BUILDER - NHA KIEN THIET',
    '5': 'THE EXPLORER - NHA KHAI PHA',
    '6': 'THE NURTURER - NGUOI NUOI DUONG',
    '7': 'THE SEEKER - KHAI MINH TRI THUC',
    '8': 'THE LEADER - NHA QUAN TRI',
    '9': 'THE HUMANITARIAN - NHA NHAN DAO',
    '10': 'THE INNOVATOR - NHA DOI MOI',
    '11': 'THE VISIONARY - BAC THAY TRUC GIAC',
    '22': 'MASTER BUILDER - KIEN TAO DI SAN',
    '22/4': 'MASTER BUILDER - KIEN TAO DI SAN',
    '33': 'MASTER HEALER - BAC THAY CHUA LANH'
};

export default async function Image(props: {
    params?: Promise<any>;
    searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
}) {
    let searchParams: Record<string, string | string[] | undefined> = {};
    if (props && props.searchParams) {
        if (props.searchParams instanceof Promise) {
            searchParams = await props.searchParams;
        } else {
            searchParams = props.searchParams;
        }
    }

    const rawName = typeof searchParams.name === 'string' ? searchParams.name : 'Nguyen Van Huy';
    const rawLp = typeof searchParams.lifePath === 'string'
        ? searchParams.lifePath
        : typeof searchParams.lp === 'string'
            ? searchParams.lp
            : '7';

    const displayName = rawName.toUpperCase();
    const lifePath = String(rawLp);
    const archetype = ARCHETYPE_MAP[lifePath] || 'NGUOI TIM KIEM CHAN LY';
    const isMaster = lifePath === '11' || lifePath === '22' || lifePath === '22/4' || lifePath === '33';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#070b14',
                    padding: '48px 64px',
                    fontFamily: 'sans-serif'
                }}
            >
                {/* Top Header */}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: '#3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}
                        >
                            *
                        </div>
                        <span
                            style={{
                                display: 'flex',
                                color: '#94a3b8',
                                fontSize: '16px',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontWeight: 700
                            }}
                        >
                            THAN SO HOC PYTHAGORAS
                        </span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(147, 197, 253, 0.3)',
                            padding: '6px 16px',
                            borderRadius: '9999px',
                            color: '#93c5fd',
                            fontSize: '13px',
                            fontWeight: 700
                        }}
                    >
                        BAO CAO NANG LUONG VIP
                    </div>
                </div>

                {/* Center Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {isMaster && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(245, 158, 11, 0.25)',
                                border: '1px solid #f59e0b',
                                color: '#fef08a',
                                fontSize: '14px',
                                fontWeight: 800,
                                padding: '4px 18px',
                                borderRadius: '9999px',
                                marginBottom: '10px'
                            }}
                        >
                            MASTER NUMBER
                        </div>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            fontSize: '16px',
                            color: '#60a5fa',
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            marginBottom: '4px'
                        }}
                    >
                        CON SO CHU DAO
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            fontSize: '140px',
                            fontWeight: 900,
                            lineHeight: 1,
                            color: '#60a5fa'
                        }}
                    >
                        {lifePath}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            fontSize: '26px',
                            fontWeight: 800,
                            color: '#f8fafc',
                            marginTop: '12px',
                            textAlign: 'center'
                        }}
                    >
                        {archetype}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '14px',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '8px 24px',
                            borderRadius: '16px'
                        }}
                    >
                        <span style={{ display: 'flex', color: '#94a3b8', fontSize: '16px' }}>Ho ten:</span>
                        <span style={{ display: 'flex', color: '#38bdf8', fontSize: '18px', fontWeight: 800 }}>
                            {displayName}
                        </span>
                    </div>
                </div>

                {/* Footer Bar */}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        paddingTop: '20px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            fontSize: '14px',
                            fontWeight: 600
                        }}
                    >
                        <span style={{ display: 'flex', color: '#cbd5e1' }}>#TamLyHocHanhVi</span>
                        <span style={{ display: 'flex', color: '#cbd5e1' }}>#MaTran3x3</span>
                        <span style={{ display: 'flex', color: '#cbd5e1' }}>#DinhHuongTuongLai</span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            color: '#60a5fa',
                            fontSize: '15px',
                            fontWeight: 700
                        }}
                    >
                        thansohoc.vn
                    </div>
                </div>
            </div>
        ),
        {
            ...size
        }
    );
}
