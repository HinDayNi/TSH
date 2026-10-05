import { Document, Font, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import React from 'react';
import { z } from 'zod';
import { verifyVipAccessToken } from '@/lib/auth/vipToken';

export const runtime = 'nodejs';

Font.register({
    family: 'NotoSans',
    src: path.join(process.cwd(), 'node_modules/@fontsource/noto-sans/files/noto-sans-vietnamese-400-normal.woff')
});

Font.register({
    family: 'NotoSans',
    src: path.join(process.cwd(), 'node_modules/@fontsource/noto-sans/files/noto-sans-vietnamese-700-normal.woff'),
    fontWeight: 700
});

const exportSchema = z.object({
    vipToken: z.string().min(20),
    name: z.string().min(1).max(120),
    dob: z.string().min(4).max(30),
    lifePath: z.number(),
    expression: z.number(),
    soulUrge: z.number(),
    personality: z.number(),
    personalYear: z.number(),
    matrix: z.array(z.array(z.number())).length(3),
    overview: z.string().max(3000),
    strengths: z.array(z.string()).max(10),
    pinnacles: z.array(z.object({ value: z.number(), ageRange: z.string() })).max(4)
});

const styles = StyleSheet.create({
    page: { padding: 42, fontFamily: 'NotoSans', fontSize: 10, color: '#1C1B22' },
    header: { borderBottom: '1 solid #D9D4C9', paddingBottom: 16, marginBottom: 20 },
    eyebrow: { fontSize: 8, color: '#5146A5', textTransform: 'uppercase', letterSpacing: 1 },
    title: { fontSize: 24, fontWeight: 700, marginTop: 6 },
    muted: { color: '#706E78', fontSize: 9 },
    section: { marginTop: 18 },
    sectionTitle: { fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#5146A5' },
    paragraph: { lineHeight: 1.6 },
    columns: { flexDirection: 'row', gap: 18 },
    card: { flex: 1, padding: 12, backgroundColor: '#F8F7F4', borderRadius: 6 },
    number: { fontSize: 20, fontWeight: 700, color: '#5146A5' },
    matrix: { width: 210, height: 210, flexDirection: 'row', flexWrap: 'wrap', border: '1 solid #D9D4C9' },
    cell: { width: '33.3333%', height: '33.3333%', border: '0.5 solid #D9D4C9', alignItems: 'center', justifyContent: 'center' },
    cellLabel: { fontSize: 7, color: '#706E78' },
    cellValue: { fontSize: 14, fontWeight: 700, color: '#5146A5', marginTop: 4 },
    bullet: { marginBottom: 5, lineHeight: 1.5 },
    footer: { position: 'absolute', bottom: 24, left: 42, right: 42, borderTop: '1 solid #E7E4DD', paddingTop: 7, fontSize: 8, color: '#706E78' }
});

function ReportPdf({ report }: { report: z.infer<typeof exportSchema> }) {
    return (
        <Document title={`Báo cáo thần số học - ${report.name}`} author="TSH">
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.eyebrow}>TSH • Báo cáo cá nhân VIP</Text>
                    <Text style={styles.title}>{report.name}</Text>
                    <Text style={styles.muted}>Ngày sinh: {report.dob}</Text>
                </View>

                <View style={styles.columns}>
                    <View style={styles.card}>
                        <Text style={styles.muted}>Đường đời</Text>
                        <Text style={styles.number}>{report.lifePath}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.muted}>Năm cá nhân</Text>
                        <Text style={styles.number}>{report.personalYear}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.muted}>Sứ mệnh</Text>
                        <Text style={styles.number}>{report.expression}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ma trận ngày sinh 3x3</Text>
                    <View style={styles.matrix}>
                        {report.matrix.flatMap((row, rowIndex) => row.map((value, columnIndex) => {
                            const digit = [[3, 6, 9], [2, 5, 8], [1, 4, 7]][rowIndex][columnIndex];
                            return (
                                <View style={styles.cell} key={`${rowIndex}-${columnIndex}`}>
                                    <Text style={styles.cellLabel}>{digit}</Text>
                                    <Text style={styles.cellValue}>{value || '-'}</Text>
                                </View>
                            );
                        }))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bộ chỉ số cốt lõi</Text>
                    <View style={styles.columns}>
                        <View style={styles.card}><Text style={styles.muted}>Linh hồn</Text><Text style={styles.number}>{report.soulUrge}</Text></View>
                        <View style={styles.card}><Text style={styles.muted}>Nhân cách</Text><Text style={styles.number}>{report.personality}</Text></View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tổng quan luận giải</Text>
                    <Text style={styles.paragraph}>{report.overview}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thế mạnh nổi bật</Text>
                    {report.strengths.map((strength) => <Text style={styles.bullet} key={strength}>• {strength}</Text>)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bốn đỉnh cao</Text>
                    <View style={styles.columns}>
                        {report.pinnacles.map((pinnacle, index) => (
                            <View style={styles.card} key={`${pinnacle.value}-${index}`}>
                                <Text style={styles.muted}>Đỉnh {index + 1}</Text>
                                <Text style={styles.number}>{pinnacle.value}</Text>
                                <Text style={styles.muted}>{pinnacle.ageRange}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <Text style={styles.footer}>Nội dung mang tính tham khảo và định hướng phát triển cá nhân.</Text>
            </Page>
        </Document>
    );
}

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);
    const parsed = exportSchema.safeParse(body);
    if (!parsed.success || !verifyVipAccessToken(parsed.data?.vipToken || '').valid) {
        return NextResponse.json({ success: false, error: 'Báo cáo PDF yêu cầu quyền VIP hợp lệ.' }, { status: 403 });
    }

    const buffer = await renderToBuffer(<ReportPdf report={parsed.data} />);
    return new Response(new Uint8Array(buffer), {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="tsh-report-${encodeURIComponent(parsed.data.name)}.pdf"`,
            'Cache-Control': 'private, no-store'
        }
    });
}