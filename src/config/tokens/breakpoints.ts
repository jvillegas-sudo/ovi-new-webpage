/**
 * Design Token: Breakpoints
 *
 * Mobile-first breakpoint system.
 * Aligned with Tailwind's default scale for consistency.
 *
 * Usage:
 *   import { breakpoints } from '@config/tokens/breakpoints'
 */

export const breakpoints = {
  /** 320px — small mobile */
  xs: "320px",
  /** 375px — modern mobile */
  sm: "375px",
  /** 640px — large mobile / small tablet */
  md: "640px",
  /** 768px — tablet */
  lg: "768px",
  /** 1024px — laptop */
  xl: "1024px",
  /** 1280px — desktop */
  "2xl": "1280px",
  /** 1440px — large desktop */
  "3xl": "1440px",
  /** 1920px — wide screen */
  "4xl": "1920px",
} as const;

/** Numeric px values for use in JavaScript (e.g., matchMedia, Three.js) */
export const breakpointValues = {
  xs: 320,
  sm: 375,
  md: 640,
  lg: 768,
  xl: 1024,
  "2xl": 1280,
  "3xl": 1440,
  "4xl": 1920,
} as const;

export type Breakpoints = typeof breakpoints;
export type BreakpointKey = keyof typeof breakpoints;
