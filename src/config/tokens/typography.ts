export const typography = {
  family: {
    sans: "Inter, system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  size: {
    xs: "clamp(0.75rem, 0.72rem + 0.08vw, 0.8rem)",
    sm: "clamp(0.875rem, 0.83rem + 0.12vw, 0.95rem)",
    base: "clamp(1rem, 0.94rem + 0.16vw, 1.125rem)",
    lg: "clamp(1.125rem, 1.03rem + 0.24vw, 1.3rem)",
    xl: "clamp(1.5rem, 1.25rem + 0.6vw, 1.875rem)",
    "2xl": "clamp(2rem, 1.5rem + 1.2vw, 2.75rem)",
    "3xl": "clamp(2.5rem, 1.8rem + 1.8vw, 3.5rem)",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
