import { useMemo } from "react";

interface BrushedSteelMaterialProps {
  opacity?: number;
  color?: string;
  roughness?: number;
  metalness?: number;
}

export function BrushedSteelMaterial({
  opacity = 1,
  color = "#1a2a36",
  roughness = 0.24,
  metalness = 0.96,
}: BrushedSteelMaterialProps) {
  const resolvedOpacity = useMemo(() => Math.max(0, Math.min(1, opacity)), [opacity]);

  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      transparent={resolvedOpacity < 1}
      opacity={resolvedOpacity}
    />
  );
}
