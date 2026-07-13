"use client";

import { PerformanceMonitor } from "@react-three/drei";

type ThreePerformanceProps = {
  onDecline?: () => void;
};

export const ThreePerformance = ({ onDecline }: ThreePerformanceProps) => {
  return <PerformanceMonitor onDecline={onDecline} />;
};
