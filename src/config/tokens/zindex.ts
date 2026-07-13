/**
 * Design Token: Z-Index
 *
 * Explicit z-index scale to prevent stacking context chaos.
 * Named values make intent clear and prevent arbitrary magic numbers.
 *
 * Layering philosophy (bottom → top):
 *   background → content → sticky → dropdown → modal → toast → cursor
 *
 * Usage:
 *   import { zIndex } from '@config/tokens/zindex'
 */

export const zIndex = {
  /** Behind everything — Three.js canvas, background effects */
  deep: -1,
  /** Default page content */
  base: 0,
  /** Raised content elements — cards with hover lift */
  raised: 10,
  /** Dropdown menus, tooltips */
  dropdown: 100,
  /** Sticky headers, sticky navigation */
  sticky: 200,
  /** Fixed navigation bar */
  navbar: 300,
  /** Overlays (modal backdrop) */
  overlay: 400,
  /** Modal dialogs, drawers */
  modal: 500,
  /** Popover, combobox, date picker */
  popover: 600,
  /** Toast notifications */
  toast: 700,
  /** Custom cursor — always on top */
  cursor: 9999,
} as const;

export type ZIndex = typeof zIndex;
export type ZIndexKey = keyof typeof zIndex;
