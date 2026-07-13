/**
 * Design Token: Typography
 *
 * Fluid, cinematic type scale using clamp() for perfect scaling
 * between viewport widths. No media query jumps — smooth interpolation.
 *
 * Font strategy:
 *   - Display: custom variable font for hero/impact moments
 *   - Body: Inter — highest legibility, great hinting
 *   - Mono: JetBrains Mono — technical credibility for code/data
 *
 * Usage:
 *   import { typography } from '@config/tokens/typography'
 */

export const typography = {
  // ─── Font Families ─────────────────────────────────────────────────────────
  fontFamily: {
    display: "var(--font-display), 'SF Pro Display', -apple-system, sans-serif",
    body: "var(--font-body), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "var(--font-mono), 'JetBrains Mono', 'Fira Code', monospace",
  },

  // ─── Fluid Type Scale ──────────────────────────────────────────────────────
  // clamp(min, preferred, max) — scales between 375px and 1440px viewports
  fontSize: {
    /** 12px */
    "2xs": "0.75rem",
    /** 13px */
    xs: "0.8125rem",
    /** 14px */
    sm: "0.875rem",
    /** 16px */
    base: "1rem",
    /** 18px */
    lg: "1.125rem",
    /** 20px */
    xl: "1.25rem",
    /** 24px */
    "2xl": "1.5rem",
    /** 28–32px fluid */
    "3xl": "clamp(1.75rem, 2vw + 1rem, 2rem)",
    /** 32–40px fluid */
    "4xl": "clamp(2rem, 3vw + 1rem, 2.5rem)",
    /** 40–56px fluid */
    "5xl": "clamp(2.5rem, 4vw + 1.5rem, 3.5rem)",
    /** 48–72px fluid */
    "6xl": "clamp(3rem, 5vw + 2rem, 4.5rem)",
    /** 60–96px fluid */
    "7xl": "clamp(3.75rem, 7vw + 2rem, 6rem)",
    /** 80–128px fluid — hero/display use only */
    "8xl": "clamp(5rem, 10vw + 2rem, 8rem)",
  },

  // ─── Font Weight ───────────────────────────────────────────────────────────
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // ─── Line Height ───────────────────────────────────────────────────────────
  lineHeight: {
    none: "1",
    tight: "1.1",
    snug: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // ─── Letter Spacing ────────────────────────────────────────────────────────
  letterSpacing: {
    tightest: "-0.05em",
    tighter: "-0.025em",
    tight: "-0.015em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
    ultra: "0.2em", // For all-caps labels
  },
} as const;

export type Typography = typeof typography;
