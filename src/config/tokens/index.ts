/**
 * Design Tokens — Barrel Export
 *
 * Single import point for all design tokens.
 *
 * Usage:
 *   import { colors, spacing, typography } from '@config/tokens'
 */

export { colors } from "./colors";
export type { Colors } from "./colors";

export { spacing, layout } from "./spacing";
export type { Spacing, Layout } from "./spacing";

export { radius } from "./radius";
export type { Radius } from "./radius";

export { typography } from "./typography";
export type { Typography } from "./typography";

export { animation } from "./animation";
export type { Animation } from "./animation";

export { breakpoints, breakpointValues } from "./breakpoints";
export type { Breakpoints, BreakpointKey } from "./breakpoints";

export { zIndex } from "./zindex";
export type { ZIndex, ZIndexKey } from "./zindex";

export { shadows } from "./shadows";
export type { Shadows } from "./shadows";
