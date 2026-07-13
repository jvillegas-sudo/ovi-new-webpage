import { motionTokens } from "@/config/tokens/animation";

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.base / 1000,
      ease: motionTokens.easing.standard,
    },
  },
} as const;
