import {
    Compass,
    Map,
    User,
    CalendarClock,
    HeartHandshake,
    Sparkles,
    Briefcase,
    FileText,
    type LucideIcon
} from 'lucide-react';

export interface RouteItem {
    id: string;
    path: string;
    title: string;
    shortTitle: string;
    description: string;
    icon: LucideIcon;
    category: 'explore' | 'analysis' | 'tools' | 'output';
    badge?: string;
    requiresMap?: boolean;
}

export const WORKSPACE_ROUTES: RouteItem[] = [
    // 1. KHÁM PHÁ
    {
        id: 'overview',
        path: '/',
        title: 'Tổng Quan',
        shortTitle: 'Tổng quan',
        description: 'Khám phá triết lý số học và khởi tạo bản đồ cá nhân',
        icon: Compass,
        category: 'explore',
        requiresMap: false
    },
    {
        id: 'dashboard',
        path: '/dashboard',
        title: 'Bản Đồ Của Tôi',
        shortTitle: 'Bản đồ',
        description: 'Bản đồ trung tâm và 4 con số trụ cột Pythagoras',
        icon: Map,
        category: 'explore',
        requiresMap: true
    },

    // 2. PHÂN TÍCH
    {
        id: 'identity',
        path: '/identity',
        title: 'Hiểu Bản Thân',
        shortTitle: 'Bản thân',
        description: 'Biểu đồ 3x3 ngày sinh, trục Thân-Tâm-Trí và điểm mù nội tâm',
        icon: User,
        category: 'analysis',
        requiresMap: true
    },
    {
        id: 'compatibility',
        path: '/compare',
        title: 'Tình Cảm',
        shortTitle: 'Tình cảm',
        description: 'Tần số hòa hợp giữa hai người và bài học kết nối',
        icon: HeartHandshake,
        category: 'analysis',
        requiresMap: true
    },
    {
        id: 'career',
        path: '/analysis?type=career',
        title: 'Sự Nghiệp',
        shortTitle: 'Sự nghiệp',
        description: 'Phong cách làm việc, môi trường tối ưu và tiềm năng cống hiến',
        icon: Briefcase,
        category: 'analysis',
        requiresMap: true
    },
    {
        id: 'timeline',
        path: '/timeline',
        title: 'Dòng Thời Gian',
        shortTitle: 'Thời gian',
        description: '4 đỉnh cao cuộc đời, 3 chu kỳ và dự báo năm cá nhân',
        icon: CalendarClock,
        category: 'analysis',
        requiresMap: true
    },

    // 3. CÔNG CỤ
    {
        id: 'compare',
        path: '/compare',
        title: 'So Sánh',
        shortTitle: 'So sánh',
        description: 'Đối chiếu tần số biểu đồ giữa bạn và đối phương',
        icon: HeartHandshake,
        category: 'tools',
        requiresMap: true
    },
    {
        id: 'naming',
        path: '/naming',
        title: 'Tối Ưu Tên',
        shortTitle: 'Tối ưu tên',
        description: 'Cân bằng ma trận họ tên và hỗ trợ kích hoạt tiềm năng',
        icon: Sparkles,
        category: 'tools',
        requiresMap: true
    },

    // 4. BÁO CÁO & XUẤT BẢN
    {
        id: 'report',
        path: '/report',
        title: 'Hồ Sơ Toàn Diện',
        shortTitle: 'Báo cáo',
        description: 'Báo cáo chuyên sâu xuất bản định dạng in A4 / PDF',
        icon: FileText,
        category: 'output',
        requiresMap: true
    }
];

export const CATEGORY_LABELS: Record<string, string> = {
    explore: 'Khám phá',
    analysis: 'Phân tích',
    tools: 'Công cụ',
    output: 'Xuất bản'
};

export function getRouteMetadata(pathname: string): RouteItem | undefined {
    const cleanPath = pathname.split('?')[0];
    return WORKSPACE_ROUTES.find(r => r.path.split('?')[0] === cleanPath);
}

export function getNextRoute(pathname: string): RouteItem | null {
    const cleanPath = pathname.split('?')[0];
    const sequence = ['/dashboard', '/identity', '/analysis', '/timeline', '/compare', '/naming', '/report'];
    const idx = sequence.indexOf(cleanPath);
    if (idx >= 0 && idx < sequence.length - 1) {
        const nextPath = sequence[idx + 1];
        return WORKSPACE_ROUTES.find(r => r.path.split('?')[0] === nextPath) || null;
    }
    return null;
}

export function getPrevRoute(pathname: string): RouteItem | null {
    const cleanPath = pathname.split('?')[0];
    const sequence = ['/dashboard', '/identity', '/analysis', '/timeline', '/compare', '/naming', '/report'];
    const idx = sequence.indexOf(cleanPath);
    if (idx > 0) {
        const prevPath = sequence[idx - 1];
        return WORKSPACE_ROUTES.find(r => r.path.split('?')[0] === prevPath) || null;
    }
    return null;
}
