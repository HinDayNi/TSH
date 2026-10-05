'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnalyticsEvents } from '@/lib/monitoring/analytics';
import { Share2, Printer, Download, Check, Crown, ArrowLeft, X, Zap } from 'lucide-react';

export function ReportActions({ isVip }: { isVip?: boolean }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handlePrintPdf = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    return (
        <div className="flex items-center gap-2 sm:gap-2.5">
            <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706E78] hover:text-[#1C1B22] bg-white hover:bg-[#F8F7F4] border border-[#E7E4DD] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-subtle"
                title="Sao chép liên kết báo cáo"
            >
                {copied ? (
                    <>
                        <Check className="w-3.5 h-3.5 text-[#547A67]" />
                        <span>Đã chép link</span>
                    </>
                ) : (
                    <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Chia sẻ</span>
                    </>
                )}
            </button>

            <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706E78] hover:text-[#1C1B22] bg-white hover:bg-[#F8F7F4] border border-[#E7E4DD] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-subtle"
                title="In báo cáo hoặc lưu dạng PDF"
            >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">In ấn</span>
            </button>

            <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#5146A5] hover:bg-[#443A8C] px-4 py-2 rounded-xl transition-all cursor-pointer shadow-subtle"
            >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất PDF</span>
            </button>
        </div>
    );
}

export function VipUpgradeModal({
    isOpen,
    onClose,
    orderCode
}: {
    isOpen: boolean;
    onClose: () => void;
    orderCode?: number;
}) {
    const router = useRouter();
    const [simulating, setSimulating] = useState(false);
    const code = orderCode || 868999;
    const amount = 199000;
    const transferContent = `TSH VIP ${code}`;

    const qrUrl = `https://img.vietqr.io/image/MB-0988888888-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
        transferContent
    )}&accountName=CONG%20TY%20THAN%20SO%20HOC`;

    const handleSimulatePayment = async () => {
        setSimulating(true);
        try {
            const res = await fetch('/api/webhook/payment/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderCode: code,
                    amount: amount,
                    description: transferContent
                })
            });

            const json = await res.json();
            if (json.success && json.data?.accessToken) {
                try {
                    AnalyticsEvents.paymentSuccess(code, amount);
                } catch (e) {}

                const url = new URL(window.location.href);
                url.searchParams.set('vipToken', json.data.accessToken);
                onClose();
                router.push(url.pathname + url.search);
            } else {
                alert('Có lỗi khi kích hoạt VIP. Vui lòng thử lại.');
            }
        } catch (err: any) {
            alert('Lỗi kết nối Webhook: ' + err.message);
        } finally {
            setSimulating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1B22]/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-[#E7E4DD] text-center relative overflow-hidden max-h-[92vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-[#F8F7F4] hover:bg-[#F1EFFA] text-[#706E78] flex items-center justify-center transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F1EFFA] text-[#5146A5] flex items-center justify-center text-xl mb-3 border border-[#5146A5]/20">
                    <Crown className="w-6 h-6 text-[#C59B45]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1B22]">
                    Mở Khóa Báo Cáo Toàn Diện
                </h3>
                <p className="text-xs text-[#706E78] mt-1">
                    Quét mã VietQR hoặc chuyển khoản để kích hoạt tự động sau 3 giây
                </p>

                {/* QR Code & Banking Info */}
                <div className="my-4 p-4 rounded-xl bg-[#F8F7F4] border border-[#E7E4DD] text-left space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="p-2 bg-white rounded-xl border border-[#E7E4DD] shrink-0">
                            <img
                                src={qrUrl}
                                alt="Mã VietQR Thanh Toán"
                                className="w-36 h-36 object-contain rounded-lg"
                            />
                        </div>
                        <div className="text-xs space-y-2 w-full text-[#1C1B22]">
                            <div className="flex justify-between border-b border-[#E7E4DD] pb-1">
                                <span className="text-[#706E78]">Ngân hàng:</span>
                                <strong className="text-[#1C1B22]">MB Bank</strong>
                            </div>
                            <div className="flex justify-between border-b border-[#E7E4DD] pb-1">
                                <span className="text-[#706E78]">Số tài khoản:</span>
                                <strong className="text-[#1C1B22] font-mono text-sm">0988 888 888</strong>
                            </div>
                            <div className="flex justify-between border-b border-[#E7E4DD] pb-1">
                                <span className="text-[#706E78]">Số tiền:</span>
                                <strong className="text-[#5146A5] font-serif font-bold text-sm">199.000 đ</strong>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#706E78]">Nội dung CK:</span>
                                <strong className="text-[#1C1B22] font-mono font-medium bg-white px-2 py-0.5 rounded border border-[#E7E4DD]">
                                    {transferContent}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quyền lợi VIP */}
                <div className="mb-4 p-3.5 rounded-xl bg-[#F1EFFA] border border-[#5146A5]/20 text-left text-xs space-y-2 text-[#1C1B22]">
                    <div className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4 text-[#547A67]" />
                        <span>Mở khóa toàn diện 4 Đỉnh cao Kim tự tháp</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4 text-[#547A67]" />
                        <span>Dự báo vận hạn chu kỳ 9 Năm cá nhân</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4 text-[#547A67]" />
                        <span>Tải file báo cáo PDF chi tiết 25+ trang</span>
                    </div>
                </div>

                {/* Nút giả lập Webhook & Đóng */}
                <div className="space-y-2">
                    <button
                        type="button"
                        disabled={simulating}
                        onClick={handleSimulatePayment}
                        className="w-full py-3 px-5 rounded-xl font-semibold text-white bg-[#5146A5] hover:bg-[#443A8C] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
                    >
                        {simulating ? (
                            <span>Đang xử lý Webhook...</span>
                        ) : (
                            <>
                                <Zap className="w-4 h-4 text-[#EFE2C2]" />
                                <span>🧪 Thử nghiệm: Giả lập Thanh toán Thành công</span>
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2 text-xs text-[#706E78] hover:text-[#1C1B22] transition-colors cursor-pointer"
                    >
                        Đóng lại
                    </button>
                </div>
            </div>
        </div>
    );
}

export function VipCtaButton() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    try {
                        AnalyticsEvents.vipCtaClicked();
                    } catch (e) {}
                    setModalOpen(true);
                }}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5146A5] hover:bg-[#443A8C] text-white font-semibold text-sm transition-all shadow-subtle cursor-pointer"
            >
                <Crown className="w-4 h-4 text-[#EFE2C2]" />
                <span>Nâng cấp để mở khóa trọn đời</span>
            </button>
            <VipUpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

export default ReportActions;
