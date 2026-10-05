import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ArrowLeft, Info, ShieldAlert, Scale, ShieldCheck, Crown } from 'lucide-react';

export const metadata = {
    title: 'Điều Khoản Dịch Vụ & Miễn Trừ Trách Nhiệm | NUMERO',
    description: 'Chính sách pháp lý, điều khoản sử dụng và miễn trừ trách nhiệm của nền tảng Thần Số Học NUMERO.'
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#F8F7F4] text-[#1C1B22] py-10 antialiased selection:bg-[#5146A5] selection:text-white font-sans">
            <Container size="default" className="space-y-8">
                {/* Navigation Bar */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E7E4DD] shadow-subtle">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#5146A5] hover:text-[#443A8C] transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Về trang chủ</span>
                    </Link>
                    <span className="text-xs text-[#706E78] font-medium">Cập nhật lần cuối: Tháng 9/2026</span>
                </div>

                {/* Main Legal Content */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E7E4DD] shadow-card space-y-8">
                    {/* Header */}
                    <div className="border-b border-[#E7E4DD] pb-6">
                        <span className="text-xs uppercase font-bold text-[#5146A5] bg-[#F1EFFA] px-3 py-1 rounded-full border border-[#5146A5]/20">
                            Văn bản pháp lý & Quy định sử dụng
                        </span>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1C1B22] mt-3 tracking-tight">
                            Điều Khoản Dịch Vụ & Tuyên Bố Miễn Trừ Trách Nhiệm
                        </h1>
                        <p className="text-xs sm:text-sm text-[#706E78] mt-2 leading-relaxed">
                            Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng các công cụ tính toán và báo cáo phân tích trên hệ thống của chúng tôi.
                        </p>
                    </div>

                    {/* Section 1: Bản chất dịch vụ */}
                    <div className="space-y-3">
                        <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1B22] flex items-center gap-2">
                            <Info className="w-5 h-5 text-[#5146A5]" />
                            <span>1. Bản Chất Dịch Vụ & Mục Đích Sử Dụng</span>
                        </h2>
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F7F4] border border-[#E7E4DD] text-xs sm:text-sm text-[#1C1B22] leading-relaxed space-y-2">
                            <p>
                                Nền tảng NUMERO cung cấp các nội dung số học, mô hình phân tích hành vi và diễn giải tâm lý dựa trên hệ thống thần số học Pythagoras cổ điển và các lý thuyết tâm lý học phát triển cá nhân hiện đại.
                            </p>
                            <p className="font-semibold text-[#5146A5]">
                                Toàn bộ dữ liệu, luận giải, biểu đồ và chỉ số dự báo trên nền tảng mang tính chất THAM KHẢO, KHÁM PHÁ BẢN THÂN VÀ GIẢI TRÍ ĐỊNH HƯỚNG.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Miễn trừ y tế & tâm thần */}
                    <div className="space-y-3">
                        <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1B22] flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-[#B45A58]" />
                            <span>2. Tuyên Bố Miễn Trừ Trách Nhiệm Y Tế & Trị Liệu Tâm Thần</span>
                        </h2>
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#B45A58]/5 border border-[#B45A58]/20 text-xs sm:text-sm text-[#1C1B22] leading-relaxed space-y-2">
                            <p>
                                Các nội dung diễn giải tính cách, điểm mù tâm lý hoặc các chu kỳ cảm xúc <strong>TUYỆT ĐỐI KHÔNG THAY THẾ</strong> cho các chẩn đoán y khoa, phác đồ điều trị tâm thần, tham vấn tâm lý lâm sàng hoặc sự chăm sóc từ các bác sĩ chuyên khoa có chứng chỉ hành nghề.
                            </p>
                            <p>
                                Nếu bạn hoặc người thân đang gặp các vấn đề nghiêm trọng về rối loạn lo âu, trầm cảm hoặc khủng hoảng tâm lý, chúng tôi khuyến cáo bạn hãy tìm kiếm sự hỗ trợ ngay lập tức từ các cơ sở y tế chuyên môn.
                            </p>
                        </div>
                    </div>

                    {/* Section 3: Miễn trừ tài chính & pháp lý */}
                    <div className="space-y-3">
                        <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1B22] flex items-center gap-2">
                            <Scale className="w-5 h-5 text-[#C59B45]" />
                            <span>3. Tuyên Bố Miễn Trừ Tư Vấn Tài Chính & Pháp Lý</span>
                        </h2>
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#EFE2C2]/30 border border-[#C59B45]/20 text-xs sm:text-sm text-[#1C1B22] leading-relaxed space-y-2">
                            <p>
                                Dự báo về Đỉnh cao tài chính, Vận trình năm cá nhân hoặc các chỉ số kinh doanh không cấu thành bất kỳ lời khuyên đầu tư tài chính, chứng khoán, bất động sản hoặc tư vấn pháp lý thương mại nào.
                            </p>
                            <p>
                                Người dùng hoàn toàn chịu trách nhiệm độc lập đối với mọi quyết định tài chính, hợp đồng kinh tế hoặc bước đi sự nghiệp của mình.
                            </p>
                        </div>
                    </div>

                    {/* Section 4: Bảo mật thông tin */}
                    <div className="space-y-3">
                        <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1B22] flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-[#547A67]" />
                            <span>4. Cam Kết Bảo Vệ Quyền Riêng Tư & Dữ Liệu Cá Nhân</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-[#706E78] leading-relaxed pl-2">
                            Chúng tôi cam kết không bán, chia sẻ hoặc tiết lộ trái phép thông tin ngày sinh, họ tên hoặc lịch sử tra cứu của người dùng cho bên thứ ba vì mục đích quảng cáo rác. Dữ liệu thanh toán được mã hóa và xử lý trực tiếp qua cổng thanh toán bảo mật theo chuẩn PCI-DSS của ngân hàng đối tác.
                        </p>
                    </div>

                    {/* Section 5: Điều khoản dịch vụ trả phí (VIP) */}
                    <div className="space-y-3">
                        <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1B22] flex items-center gap-2">
                            <Crown className="w-5 h-5 text-[#C59B45]" />
                            <span>5. Dịch Vụ Mở Khóa VIP & Chính Sách Giao Dịch</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-[#706E78] leading-relaxed pl-2">
                            Khi hoàn tất thanh toán gói VIP, người dùng được cấp quyền truy cập trọn đời vào toàn bộ báo cáo phân tích nâng cao và tải file PDF. Do tính chất sản phẩm nội dung số được bàn giao tức thời sau khi thanh toán, chúng tôi chỉ hỗ trợ xử lý hoàn tiền trong các trường hợp lỗi kỹ thuật hệ thống không thể bàn giao báo cáo.
                        </p>
                    </div>

                    {/* Footer note */}
                    <div className="pt-6 border-t border-[#E7E4DD] text-center text-xs text-[#706E78]">
                        © {new Date().getFullYear()} NUMERO • Trường phái Thần Số Học Pythagoras chuẩn mực.
                    </div>
                </div>
            </Container>
        </main>
    );
}
