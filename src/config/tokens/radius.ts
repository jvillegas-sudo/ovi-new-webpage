/**
 * Design Token: Border Radius
 *
 * Subtle, modern radii that avoid both sharp corporate corners
 * and overly bubbly consumer app feel. OVI sits in the premium industrial space.
 *
 * Usage:
 *   import { radius } from '@config/tokens/radius'
 */

export const radius = {
  none: "0",
  xs: "0.125rem", // 2px
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  "3xl": "2rem", // 32px
  full: "9999px",
} as const;

export type Radius = typeof radius;
