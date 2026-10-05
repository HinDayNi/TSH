/**
 * Motion & Interaction System Constants
 * Thống nhất chuẩn chuyển động toàn bộ dự án
 */

// Transition easing chuẩn Zen: [0.16, 1, 0.3, 1]
export const ZEN_EASING = [0.16, 1, 0.3, 1] as const;

// Spring transition chuẩn cho các tabs, modals và interactive cards
export const ZEN_SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
} as const;

// Smooth fast spring
export const SNAPPY_SPRING = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
} as const;

// Page & view variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: ZEN_EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: ZEN_EASING,
    },
  },
};

// Modal animation variants
export const modalVariants = {
  closed: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: {
      duration: 0.2,
      ease: ZEN_EASING,
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: ZEN_SPRING,
  },
};

export const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.2 } },
};
