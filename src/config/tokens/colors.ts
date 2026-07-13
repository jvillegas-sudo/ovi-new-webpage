/**
 * Design Token: Colors
 *
 * OVI brand palette built on a dark-first philosophy.
 * Primary identity: deep navy/black with electric cyan accents.
 * This mirrors the brand of industrial biotechnology — precise, clean, futuristic.
 *
 * Usage:
 *   import { colors } from '@config/tokens/colors'
 */

export const colors = {
  // ─── Brand ─────────────────────────────────────────────────────────────────
  brand: {
    primary: "#00C4FF", // Electric cyan — OVI's signature color
    secondary: "#0047AB", // Cobalt blue — trust and technology
    accent: "#00FF85", // Bio-green — nature meets science
    danger: "#FF3B3B",
    warning: "#FFA500",
    success: "#00C851",
  },

  // ─── Neutral ───────────────────────────────────────────────────────────────
  neutral: {
    0: "#FFFFFF",
    50: "#F8F9FA",
    100: "#F1F3F5",
    200: "#E9ECEF",
    300: "#DEE2E6",
    400: "#CED4DA",
    500: "#ADB5BD",
    600: "#6C757D",
    700: "#495057",
    800: "#343A40",
    900: "#212529",
    950: "#0D0D0D",
    1000: "#000000",
  },

  // ─── Background ────────────────────────────────────────────────────────────
  background: {
    base: "#050508", // Near-black base — cinematic depth
    surface: "#0A0A0F", // Slightly lighter surface layer
    elevated: "#0F0F18", // Cards, modals — elevated surface
    overlay: "rgba(5, 5, 8, 0.85)", // Overlay for modals/drawers
  },

  // ─── Text ──────────────────────────────────────────────────────────────────
  text: {
    primary: "#F0F0F0", // High-contrast readable white
    secondary: "#A0A0B0", // Muted secondary text
    tertiary: "#60607A", // Disabled, placeholders
    inverse: "#050508", // On-light backgrounds
    link: "#00C4FF",
    linkHover: "#40D4FF",
  },

  // ─── Border ────────────────────────────────────────────────────────────────
  border: {
    subtle: "rgba(255, 255, 255, 0.06)",
    default: "rgba(255, 255, 255, 0.12)",
    strong: "rgba(255, 255, 255, 0.24)",
    brand: "rgba(0, 196, 255, 0.35)",
  },

  // ─── Glass ─────────────────────────────────────────────────────────────────
  glass: {
    background: "rgba(255, 255, 255, 0.04)",
    backgroundHover: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.10)",
    backdrop: "blur(12px)",
  },

  // ─── Gradient ──────────────────────────────────────────────────────────────
  gradient: {
    brand: "linear-gradient(135deg, #00C4FF 0%, #0047AB 100%)",
    bioGreen: "linear-gradient(135deg, #00FF85 0%, #00C4FF 100%)",
    dark: "linear-gradient(180deg, #050508 0%, #0A0A0F 100%)",
    radialGlow: "radial-gradient(ellipse at center, rgba(0,196,255,0.15) 0%, transparent 70%)",
  },
} as const;

export type Colors = typeof colors;
