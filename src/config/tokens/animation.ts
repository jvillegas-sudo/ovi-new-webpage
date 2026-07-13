export const motionTokens = {
  duration: {
    instant: 120,
    fast: 240,
    base: 420,
    slow: 680,
  },
  easing: {
    standard: [0.2, 0.8, 0.2, 1],
    emphasized: [0.16, 1, 0.3, 1],
    exit: [0.4, 0, 1, 1],
  },
} as const;
