import { useMemo } from "react";
import type { OviDnaBaseProps } from "./types";
import { BrushedSteelMaterial } from "./BrushedSteelMaterial";
import { LiquidGlassMaterial } from "./LiquidGlassMaterial";

interface WetIndustrialSurfaceProps extends OviDnaBaseProps {
  weight: number;
}

/**
 * WetIndustrialSurface — WO-017 Art Direction Lock
 *
 * Replaces artificial box panels with horizontal wet floor zones.
 * The atmosphere is the protagonist: water films on industrial metal surfaces
 * suggest the cleaning intervention without showing explicit wall panels.
 */
export function WetIndustrialSurface({ weight }: WetIndustrialSurfaceProps) {
  // Wet floor zones at ground level — horizontal plates, not vertical walls
  const wetZones = useMemo(
    () =>
      [
        { pos: [-2.8, -1.29, -3.2] as const, w: 2.4, d: 2.8 },
        { pos: [0, -1.29, -3.0] as const, w: 3.0, d: 3.2 },
        { pos: [2.8, -1.29, -3.2] as const, w: 2.4, d: 2.8 },
      ],
    [],
  );

  return (
    <group>
      {wetZones.map((zone, index) => (
        <group key={index} position={zone.pos}>
          {/* Wet industrial metal floor — highly reflective, no vertical panels */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[zone.w, zone.d]} />
            <BrushedSteelMaterial
              opacity={Math.max(0.28, weight * 0.58)}
              color="#0a1820"
              roughness={0.05}
              metalness={0.97}
            />
          </mesh>
          {/* Water film overlay — liquid glass sheen on the surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
            <planeGeometry args={[zone.w * 0.82, zone.d * 0.82]} />
            <LiquidGlassMaterial
              opacity={Math.max(0.06, weight * 0.24)}
              color="#7ee8ff"
              emissive="#0f527a"
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
