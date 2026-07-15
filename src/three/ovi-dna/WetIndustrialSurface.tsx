import { useMemo } from "react";
import type { OviDnaBaseProps } from "./types";
import { BrushedSteelMaterial } from "./BrushedSteelMaterial";
import { LiquidGlassMaterial } from "./LiquidGlassMaterial";

interface WetIndustrialSurfaceProps extends OviDnaBaseProps {
  weight: number;
}

export function WetIndustrialSurface({ weight }: WetIndustrialSurfaceProps) {
  const panelPositions = useMemo(
    () =>
      [
        [-2.8, 0.2, -3.2],
        [0, 0.35, -3.1],
        [2.8, 0.25, -3.2],
      ] as const,
    [],
  );

  return (
    <group>
      {panelPositions.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <boxGeometry args={[2.4, 1.35, 0.14]} />
            <BrushedSteelMaterial opacity={Math.max(0.4, weight)} />
          </mesh>
          <mesh position={[0, 0.01, 0.08]}>
            <planeGeometry args={[2.3, 1.26]} />
            <LiquidGlassMaterial
              opacity={Math.max(0.15, weight * 0.45)}
              color="#8ee2ff"
              emissive="#124f72"
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -0.45, -2.9]}>
        <cylinderGeometry args={[0.12, 0.12, 7, 24]} />
        <BrushedSteelMaterial
          opacity={Math.max(0.35, weight * 0.85)}
          color="#15232e"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}
