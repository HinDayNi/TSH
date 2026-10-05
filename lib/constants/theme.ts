/**
 * NUMERO - Centralized Design Tokens & Design System Specification
 * Philosophy: Calm, Premium, Editorial, Personal, Intelligent, Modern Numerology
 */

export const THEME = {
    colors: {
        background: '#F8F7F4',        // Nền giấy mộc ấm, dịu mắt
        surface: '#FFFFFF',           // Nền thẻ card & drawer
        surfaceSubtle: '#F1EFFA',     // Nền tím pastel mềm mại
        textPrimary: '#1C1B22',       // Chữ đen trầm tương phản cao
        textSecondary: '#706E78',     // Chữ phụ, hướng dẫn
        muted: '#96939C',             // Chữ mờ, placeholder, metadata nhẹ
        primary: '#5146A5',           // Màu tím tri thức chủ đạo
        primaryHover: '#443A8C',      // Tím hover
        accentGold: '#C59B45',        // Vàng cổ điển làm điểm nhấn số học Pythagoras
        accentGoldSoft: '#EFE2C2',    // Vàng nhạt cho badges & highlight
        border: '#E7E4DD',            // Viền đá mỏng nhẹ 1px
        success: '#547A67',           // Xanh rêu tự nhiên
        error: '#B45A58'              // Đỏ đất dịu nhẹ
    },
    fonts: {
        display: "'Fraunces', 'DM Serif Display', Georgia, serif",
        sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    },
    typography: {
        display: { size: '44px', lineHeight: 1.15, weight: 600 },
        pageTitle: { size: '32px', lineHeight: 1.25, weight: 600 },
        sectionTitle: { size: '22px', lineHeight: 1.35, weight: 600 },
        cardTitle: { size: '18px', lineHeight: 1.4, weight: 600 },
        body: { size: '15px', lineHeight: 1.6, weight: 400 },
        metadata: { size: '13px', lineHeight: 1.4, weight: 500 },
        nav: { size: '14px', lineHeight: 1.4, weight: 500 },
        button: { size: '14px', lineHeight: 1.4, weight: 500 }
    },
    spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px'
    },
    radii: {
        sm: '6px',
        md: '10px',      // Standard for Buttons, Inputs, Nav items
        lg: '16px',      // Standard for Cards & Sections
        xl: '20px',
        full: '9999px'   // Standard for Badges & Avatars
    },
    shadows: {
        subtle: '0 1px 3px rgba(28, 27, 34, 0.04), 0 1px 2px rgba(28, 27, 34, 0.02)',
        card: '0 2px 8px rgba(28, 27, 34, 0.04)',
        hover: '0 4px 14px rgba(81, 70, 165, 0.08)',
        drawer: '-4px 0 24px rgba(28, 27, 34, 0.06)'
    },
    components: {
        button: {
            height: '40px',
            radius: '10px',
            fontSize: '14px',
            iconSize: '18px',
            gap: '8px',
            paddingX: '16px'
        },
        badge: {
            height: '28px',
            radius: '9999px',
            fontSize: '12px',
            paddingX: '12px'
        },
        card: {
            radius: '16px',
            border: '1px solid #E7E4DD',
            padding: '24px'
        },
        header: {
            height: '64px'
        },
        sidebar: {
            width: '240px'
        },
        workspace: {
            maxWidth: '1280px',
            paddingX: '48px'
        }
    },
    transitions: {
        zenEasing: [0.16, 1, 0.3, 1],
        zenSpring: { type: 'spring', stiffness: 400, damping: 30 }
    }
} as const;

export type ThemeColors = typeof THEME.colors;
