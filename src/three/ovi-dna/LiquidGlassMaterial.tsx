import { useMemo } from "react";

interface LiquidGlassMaterialProps {
  opacity?: number;
  color?: string;
  emissive?: string;
  roughness?: number;
  metalness?: number;
}

export function LiquidGlassMaterial({
  opacity = 0.78,
  color = "#94dfff",
  emissive = "#0a3556",
  roughness = 0.04,
  metalness = 0.06,
}: LiquidGlassMaterialProps) {
  const resolvedOpacity = useMemo(() => Math.max(0, Math.min(1, opacity)), [opacity]);

  return (
    <meshPhysicalMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.25}
      roughness={roughness}
      metalness={metalness}
      transmission={0.88}
      thickness={0.45}
      ior={1.33}
      reflectivity={1}
      transparent
      opacity={resolvedOpacity}
    />
  );
}
