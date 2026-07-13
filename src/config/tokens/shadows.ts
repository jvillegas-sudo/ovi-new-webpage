/**
 * Design Token: Shadows
 *
 * Cinematic shadow system for OVI's dark-first design.
 * Shadows in dark UIs behave differently — they create depth
 * through subtle glow rather than dark drop shadows.
 *
 * Usage:
 *   import { shadows } from '@config/tokens/shadows'
 */

export const shadows = {
  // ─── Standard Shadows ──────────────────────────────────────────────────────
  none: "none",
  xs: "0 1px 2px rgba(0, 0, 0, 0.4)",
  sm: "0 2px 4px rgba(0, 0, 0, 0.5)",
  md: "0 4px 12px rgba(0, 0, 0, 0.6)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.7)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.8)",
  "2xl": "0 24px 64px rgba(0, 0, 0, 0.9)",

  // ─── Brand Glow Shadows ────────────────────────────────────────────────────
  // Used for interactive elements, CTAs, and highlighted components
  glowPrimary: "0 0 20px rgba(0, 196, 255, 0.3), 0 0 60px rgba(0, 196, 255, 0.1)",
  glowPrimaryStrong: "0 0 40px rgba(0, 196, 255, 0.5), 0 0 80px rgba(0, 196, 255, 0.2)",
  glowAccent: "0 0 20px rgba(0, 255, 133, 0.3), 0 0 60px rgba(0, 255, 133, 0.1)",
  glowSecondary: "0 0 20px rgba(0, 71, 171, 0.4), 0 0 60px rgba(0, 71, 171, 0.15)",

  // ─── Glass Shadows ─────────────────────────────────────────────────────────
  // For glassmorphism cards and surfaces
  glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
  glassHover: "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",

  // ─── Inner Shadows ─────────────────────────────────────────────────────────
  innerSm: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
  innerMd: "inset 0 2px 6px rgba(0, 0, 0, 0.7)",
} as const;

export type Shadows = typeof shadows;
