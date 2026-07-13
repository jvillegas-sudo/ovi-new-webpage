/**
 * Design Token: Spacing
 *
 * Based on a 4px base unit grid (industry standard).
 * All spacing values are multiples of 4px for perfect pixel alignment.
 * This ensures visual rhythm and consistency across all components.
 *
 * Usage:
 *   import { spacing } from '@config/tokens/spacing'
 */

export const spacing = {
  /** 0px */
  0: "0",
  /** 2px */
  px: "1px",
  /** 4px */
  0.5: "0.125rem",
  /** 8px */
  1: "0.25rem",
  /** 12px */
  1.5: "0.375rem",
  /** 16px */
  2: "0.5rem",
  /** 20px */
  2.5: "0.625rem",
  /** 24px */
  3: "0.75rem",
  /** 28px */
  3.5: "0.875rem",
  /** 32px */
  4: "1rem",
  /** 40px */
  5: "1.25rem",
  /** 48px */
  6: "1.5rem",
  /** 56px */
  7: "1.75rem",
  /** 64px */
  8: "2rem",
  /** 80px */
  10: "2.5rem",
  /** 96px */
  12: "3rem",
  /** 112px */
  14: "3.5rem",
  /** 128px */
  16: "4rem",
  /** 160px */
  20: "5rem",
  /** 192px */
  24: "6rem",
  /** 224px */
  28: "7rem",
  /** 256px */
  32: "8rem",
  /** 288px */
  36: "9rem",
  /** 320px */
  40: "10rem",
  /** 384px */
  48: "12rem",
  /** 448px */
  56: "14rem",
  /** 512px */
  64: "16rem",
  /** 576px */
  72: "18rem",
  /** 640px */
  80: "20rem",
  /** 768px */
  96: "24rem",
} as const;

/**
 * Semantic spacing for layout regions.
 * Provides intentional names for common layout constructs.
 */
export const layout = {
  /** Outer page gutter — horizontal padding on sections */
  pagePadding: {
    mobile: "1.5rem", // 24px
    tablet: "3rem", // 48px
    desktop: "5rem", // 80px
    wide: "8rem", // 128px
  },
  /** Max width for content columns */
  maxWidth: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
    "3xl": "1920px",
  },
  /** Section vertical padding */
  sectionPadding: {
    sm: "4rem", // 64px
    md: "6rem", // 96px
    lg: "8rem", // 128px
    xl: "12rem", // 192px
  },
} as const;

export type Spacing = typeof spacing;
export type Layout = typeof layout;
