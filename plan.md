# BẢN KẾ HOẠCH & TỔNG HỢP KIẾN TRÚC THIẾT KẾ THẦN SỐ HỌC (NUMERO)

Tài liệu này tổng hợp toàn bộ các phân hệ chính, quy tắc thiết kế (Design System), bố cục layout và danh sách chi tiết các file mã nguồn liên quan trong dự án **Thần Số Học (NUMERO)** theo phong cách **Modern Numerology: Calm, Premium, Editorial, Personal, Intelligent**.

---

## I. TỔNG QUAN HỆ THỐNG DESIGN TOKENS

Toàn bộ thông số thiết kế được tập trung hóa, không sử dụng giá trị ngẫu nhiên (ad-hoc) giữa các trang.

### 1. Bảng Màu Chuẩn Mực (Color Palette)
- **Background (`#F8F7F4`):** Nền giấy mộc ấm áp, dịu mắt, tạo cảm giác thư thái và tĩnh tại.
- **Surface (`#FFFFFF`):** Nền thẻ bài (cards), drawer và hộp thoại.
- **Surface Subtle (`#F1EFFA`):** Nền tím pastel mềm mại dùng cho trạng thái active và thẻ nổi bật.
- **Primary Text (`#1C1B22`):** Chữ đen than có độ tương phản cao, dễ đọc.
- **Secondary Text (`#706E78`):** Chữ phụ, văn bản hướng dẫn và mô tả.
- **Muted Text (`#96939C`):** Placeholder, metadata mờ, ghi chú nhỏ.
- **Primary Color (`#5146A5`):** Sắc tím tri thức Pythagoras chủ đạo.
- **Primary Hover (`#443A8C`):** Tím trầm khi tương tác.
- **Numerology Gold (`#C59B45`):** Sắc vàng kim cổ điển cho số chủ đạo và điểm nhấn linh thiêng.
- **Soft Gold (`#EFE2C2`):** Vàng cát nhạt dùng cho nền huy hiệu (badges) nổi bật.
- **Border (`#E7E4DD`):** Viền đá mỏng 1px tinh tế xuyên suốt ứng dụng.
- **Success (`#547A67`):** Xanh rêu tự nhiên cho các chỉ số hài hòa.
- **Error (`#B45A58`):** Đỏ đất dịu nhẹ cho các cảnh báo thử thách.

### 2. Typography Chuẩn Mực (Tối đa 2 Font Families)
- **Editorial / Display Font:** `Fraunces` (Serif) – sử dụng cho Logo NUMERO, tiêu đề trang lớn (32–36px), các con số số học (32–48px) và trích dẫn biên tập.
- **UI / Body Font:** `Inter` (Sans-serif) – sử dụng cho thanh điều hướng, nút bấm, nhãn trường, nội dung diễn giải, huy hiệu (12–15px).

### 3. Quy Chuẩn Kích Thước & Lề (Spacing Scale)
- Thang đo đồng nhất: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`.
- Độ bo tròn chuẩn:
  - **10px (`rounded-[10px]`):** Chuẩn cho Button, Input, Nav Item, Tab indicator.
  - **16px (`rounded-2xl`):** Chuẩn cho Thẻ Card, Section Box, Modal.
  - **9999px (`rounded-full`):** Chuẩn cho Badge / Chip.

---

## II. CÁC PHÂN HỆ CHÍNH & DANH SÁCH FILE LIÊN QUAN

### 1. Phân Hệ Nền Tảng & Thiết Lập Hệ Thống (Tokens & Config)
Chịu trách nhiệm cung cấp toàn bộ giá trị cốt lõi, chuyển động mượt mà và cấu hình Tailwind.

| Tên File | Đường Dẫn | Vai Trò & Chức Năng Chính |
| :--- | :--- | :--- |
| `theme.ts` | `lib/constants/theme.ts` | Khai báo hằng số Design Tokens (màu sắc, typography, spacing, component specs). |
| `tailwind.config.ts` | `tailwind.config.ts` | Cấu hình theme Tailwind mở rộng, font family serif/sans, shadow nhẹ và timing function `zen`. |
| `globals.css` | `app/globals.css` | Khởi tạo biến CSS gốc, cấu hình font chữ, thanh cuộn mộc và animation keyframes. |
| `motion.ts` | `lib/constants/motion.ts` | Cấu hình đường cong chuyển động chuẩn (`ZEN_EASING`, `ZEN_SPRING`) cho Framer Motion. |

---

### 2. Phân Hệ Component Dùng Chung (Design System UI Primitives)
Các component nguyên tử tuân thủ nghiêm ngặt quy tắc kích thước, không để từng trang tự sinh style riêng.

| Tên File | Đường Dẫn | Vai Trò & Quy Chuẩn Thiết Kế |
| :--- | :--- | :--- |
| `Button.tsx` | `components/ui/Button.tsx` | **Button System chuẩn:** 4 variants (`primary`, `secondary`, `ghost`, `icon`). Chiều cao chuẩn **40px**, radius **10px**, font **14px/500**, icon **18px**, gap **8px**. |
| `Badge.tsx` | `components/ui/Badge.tsx` | **Badge / Chip System chuẩn:** 4 variants (`default`, `primary`, `gold`, `soft`). Chiều cao chuẩn **28px**, viền mỏng, bo tròn pill **9999px**, font **12px**. |
| `Card.tsx` | `components/ui/Card.tsx` | **Card Compound System:** `Card`, `CardHeader`, `CardContent`, `CardFooter`. Nền `#FFFFFF`, viền `#E7E4DD`, radius **16px**, loại bỏ nested card-itis. |
| `Tabs.tsx` | `components/ui/Tabs.tsx` | Hệ thống Tab chuyển trang mượt mà với Sliding Pill Indicator (Framer Motion `layoutId`), nền `#F8F7F4`. |
| `Modal.tsx` | `components/ui/Modal.tsx` | Hộp thoại tương tác trung tâm: Focus trap, đóng bằng phím `Escape`, viền `#E7E4DD`, nền tiêu đề `#F8F7F4`. |
| `Drawer.tsx` | `components/ui/Drawer.tsx` | Ngăn kéo trượt bên phải (Desktop: 400–420px): Xem chi tiết số học mà không chuyển trang. |
| `Sheet.tsx` | `components/ui/Sheet.tsx` | Ngăn kéo đáy (Bottom Sheet trên Mobile): Tương thích chạm vuốt, bo góc trên 24px. |
| `EmptyState.tsx` | `components/ui/EmptyState.tsx` | Khung hiển thị trạng thái chưa có dữ liệu hồ sơ với nút CTA dẫn dắt thân thiện. |
| `Toast.tsx` | `components/ui/Toast.tsx` | Thông báo trạng thái nổi (sao chép liên kết, lưu thông tin) tinh tế và không che nội dung. |
| `Skeleton.tsx` | `components/ui/Skeleton.tsx` | Khung chờ nạp dữ liệu với hiệu ứng chuyển màu mộc ấm (warm pulse). |
| `index.ts` | `components/ui/index.ts` | File tập hợp xuất (barrel export) toàn bộ UI primitives. |

---

### 3. Phân Hệ Khung Ứng Dụng (Application Shell & Navigation)
Tạo không gian làm việc chuyên nghiệp, loại bỏ hoàn toàn sự rời rạc giữa header, sidebar và content.

| Tên File | Đường Dẫn | Vai Trò & Quy Chuẩn Thiết Kế |
| :--- | :--- | :--- |
| `layout.tsx` | `app/(workspace)/layout.tsx` | **AppShell chính:** Khóa cứng Sidebar **240px**, thụt lề chuẩn `md:pl-[240px]`, container nội dung `max-w-[1280px]` căn giữa, đệm lề ngang `px-6 sm:px-10 lg:px-12`. |
| `SidebarNav.tsx` | `components/layout/SidebarNav.tsx` | **Sidebar điều hướng:** Rộng **240px**, logo `NUMERO ·` font serif; 3 nhóm (Khám phá, Phân tích, Công cụ); mục chọn cao **40px**, icon **18px**, active `#F1EFFA` / `#5146A5`. |
| `TopHeader.tsx` | `components/layout/TopHeader.tsx` | **Header đồng nhất:** Cao **64px**, đường viền đáy `#E7E4DD`. Cấu trúc: *Breadcrumb → Page Context → User Info & Action Buttons* (chuẩn 40px). |
| `MobileNav.tsx` | `components/layout/MobileNav.tsx` | Thanh điều hướng đáy màn hình cho Mobile với vùng cảm ứng tối thiểu **44px** và Drawer menu toàn diện. |
| `navigation.ts` | `lib/constants/navigation.ts` | Định nghĩa cây định tuyến, metadata icon, tiêu đề và phân loại khu vực làm việc. |

---

### 4. Phân Hệ Bảng Điều Khiển Tổng Quan (Dashboard 12-Column Grid)
Trung tâm của trải nghiệm số học cá nhân, trả lời câu hỏi: *Tôi là ai? Năng lượng của tôi vận hành ra sao? Tiếp theo tôi nên làm gì?*.

| Tên File | Đường Dẫn | Vai Trò & Quy Chuẩn Thiết Kế |
| :--- | :--- | :--- |
| `page.tsx` (Dashboard) | `app/(workspace)/dashboard/page.tsx` | **Lưới 12 cột (7 + 5):** Kết hợp Numerology Map (7 cột) và Core Insight (5 cột) với `items-stretch` đồng bộ top-alignment và chiều cao visual. |
| `DashboardHeader.tsx` | `components/features/dashboard/DashboardHeader.tsx` | **Hero chào đón:** Tiêu đề font serif `Chào [Tên]` (32–36px), subtitle ngày sinh, nút `[Hướng dẫn]` (Secondary 40px) và `[Xem hồ sơ]` (Primary 40px). |
| `NumerologyMap.tsx` | `components/numerology/NumerologyMap.tsx` | **Visual Centerpiece (7 cột):** Bản đồ Pythagoras hình học thiêng liêng, số Đường Đời có bán kính lớn (`r=22`), viền vàng Gold, hover halo đa tầng. |
| `CoreEnergyCard.tsx` | `components/features/dashboard/CoreEnergyCard.tsx` | **Core Insight Card (5 cột):** Đoạn insight 2 dòng, bảng 3 chỉ số cốt lõi tinh giản, nút CTA chính `[Khám phá chi tiết cấu trúc →]` mở drawer. |
| `KeyNumbersGrid.tsx` | `components/features/dashboard/KeyNumbersGrid.tsx` | **Bộ 4 chỉ số trụ cột:** Đường Đời chiếm **45% visual weight** với huy hiệu Gold; 3 chỉ số Sứ Mệnh, Linh Hồn, Nhân Cách chiếm **55%**, click mở ngay drawer. |
| `SuggestedExplorations.tsx` | `components/features/dashboard/SuggestedExplorations.tsx` | **Định hướng hành động:** 1 thẻ Đề xuất ưu tiên nổi bật (Sự nghiệp) + 3 thẻ phụ nhỏ gọn (Bản thân, Tình cảm, Vận trình). |

---

### 5. Phân Hệ Ngăn Kéo Chi Tiết (Contextual Detail Drawer)
Cho phép người dùng khám phá sâu bất kỳ con số nào mà không bị gián đoạn hay phải chuyển trang.

| Tên File | Đường Dẫn | Vai Trò & Quy Chuẩn Thiết Kế |
| :--- | :--- | :--- |
| `NumberDetailPanel.tsx` | `components/numerology/NumberDetailPanel.tsx` | **Bảng chi tiết đa tầng:** Tự động hiển thị Drawer (Desktop: 420px) hoặc Sheet (Mobile) gồm Tổng quan, Thế mạnh, Thử thách, Sự nghiệp và Lời khuyên. |
| `NumberDetailContext.tsx` | `lib/context/NumberDetailContext.tsx` | Quản lý trạng thái đóng/mở và dữ liệu con số đang chọn trên toàn workspace. |

---

### 6. Phân Hệ Các Trang Phân Tích Chuyên Sâu (Analysis Workspaces)
Duy trì sự đồng nhất 100% về Sidebar, Header, Button, Badge, Spacing và Typography với trang Dashboard.

| Tên File | Đường Dẫn | Vai Trò & Nội Dung Phân Tích |
| :--- | :--- | :--- |
| `page.tsx` (Identity) | `app/(workspace)/identity/page.tsx` | **Hiểu bản thân:** Ma trận 3x3 ngày sinh Pythagoras, phân bổ tỷ lệ Thân - Tâm - Trí, điểm mạnh & bài học rèn luyện. |
| `page.tsx` (Analysis) | `app/(workspace)/analysis/page.tsx` | **Phân tích đa chiều:** Chuyển đổi nhanh 4 chỉ số với 6 tab (Tổng quan, Thế mạnh, Thử thách, Sự nghiệp, Tình cảm, Phát triển). |
| `page.tsx` (Timeline) | `app/(workspace)/timeline/page.tsx` | **Dòng thời gian:** Biểu đồ 4 đỉnh cao kim tự tháp cuộc đời, chu kỳ 9 năm và thước đo năng lượng ngày. |
| `page.tsx` (Compare) | `app/(workspace)/compare/page.tsx` | **So sánh & Tương hợp:** Ma trận hòa hợp tình cảm lứa đôi A ↔ B, so sánh danh sách tên và tương thích gia đình. |
| `page.tsx` (Naming) | `app/(workspace)/naming/page.tsx` | **Tối ưu tên:** Công cụ phân tích số thiếu và gợi ý danh xưng bù khuyết cân bằng năng lượng họ tên. |
| `page.tsx` (Report Print) | `app/report/page.tsx` | **Bản hồ sơ in:** Định dạng in ấn tài liệu thanh lịch, hỗ trợ xuất PDF và in ấn khổ A4 sạch sẽ. |

---

### 7. Phân Hệ Quản Lý Trạng Thái & Dữ Liệu Hồ Sơ (Context & Calculation)
Lõi logic và dữ liệu thần số học được bảo toàn trọn vẹn 100%, không bị ảnh hưởng bởi quá trình refactor giao diện.

| Tên File | Đường Dẫn | Vai Trò |
| :--- | :--- | :--- |
| `ProfileContext.tsx` | `lib/context/ProfileContext.tsx` | Quản lý thông tin họ tên, ngày sinh, tính toán bản đồ và lưu trữ hồ sơ người dùng. |
| `calculator.ts` | `lib/numerology/calculator.ts` | Bộ thuật toán chuẩn Pythagoras (Đường Đời, Sứ Mệnh, Linh Hồn, Nhân Cách, Năm cá nhân, 4 đỉnh cao). |
| `retention.ts` | `lib/numerology/retention.ts` | Tính toán chỉ số gắn kết, năng lượng theo ngày và nhắc nhở chu kỳ. |

---

## III. BẢNG TIÊU CHÍ NGHIỆM THU (QA CHECKLIST ĐÃ ĐẠT)

- [x] **Typography:** Tối đa 2 font family (`Fraunces` cho Editorial/Serif, `Inter` cho UI/Sans).
- [x] **Button System:** 100% nút bấm cùng cấp có cùng chiều cao 40px, radius 10px, font 14px, icon 18px.
- [x] **Badge System:** 100% huy hiệu có cùng chiều cao 28px, bo góc pill 9999px, font 12px.
- [x] **Card System:** Loại bỏ card-itis lồng nhau; toàn bộ dùng viền `#E7E4DD` và radius 16px.
- [x] **Layout Alignment:** Khóa Sidebar 240px, lề trái `md:pl-[240px]`, container `max-w-[1280px]` căn giữa.
- [x] **Lưới Dashboard 7/5:** Numerology Map (7 cột) và Core Insight (5 cột) cùng top-alignment và visual height cân xứng.
- [x] **Hierarchy Trực Quan:** Đường Đời là tiêu điểm (45% visual weight), bản đồ là visual centerpiece.
- [x] **Detail Drawer:** Mở xem chi tiết bên phải (Desktop 420px, Mobile Bottom Sheet) giữ nguyên ngữ cảnh workspace.
- [x] **Mobile UX:** Vùng bấm chạm tối thiểu 44px, thanh điều hướng chân trang mượt mà.
- [x] **Độ Toàn Vẹn Hệ Thống:** `58/58 unit tests pass`, `14/14 static pages compile thành công` trên Next.js 16 (Turbopack).
