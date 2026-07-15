import { Html } from "@react-three/drei";
import { useMemo } from "react";
import type { OviDnaBaseProps } from "./types";

interface RealMediaItem {
  id: string;
  title: string;
  kind: "foto" | "video";
  status: "official" | "pending";
}

interface RealMediaPortalProps extends OviDnaBaseProps {
  items: readonly RealMediaItem[];
  weight: number;
}

/**
 * RealMediaPortal — WO-017 Art Direction Lock
 *
 * Replaces artificial rectangular panel wall with a spatial arc of sector markers.
 * Sector names float in atmospheric space — no backing panel geometry.
 * Small circular spotlights on the floor anchor each sector without rigid panels.
 */
export function RealMediaPortal({ items, weight }: RealMediaPortalProps) {
  const slots = useMemo(() => items.slice(0, 7), [items]);

  // Arrange sectors in a gentle spatial arc — organic, not a grid
  const positions = useMemo(() => {
    const arcRadius = 3.8;
    const arcSpan = Math.PI * 0.72;
    const arcOffset = -(arcSpan / 2);
    return slots.map((_, index) => {
      const t = slots.length > 1 ? index / (slots.length - 1) : 0.5;
      const angle = arcOffset + t * arcSpan;
      return {
        x: Math.sin(angle) * arcRadius,
        y: -0.1 + Math.sin(t * Math.PI) * 0.7,
        z: -(Math.cos(angle) * arcRadius * 0.38 + 1.2),
      };
    });
  }, [slots]);

  const opacity = Math.max(0, Math.min(1, weight));

  return (
    <group position={[0, 0.4, 0]}>
      {slots.map((item, index) => {
        const pos = positions[index];
        const floorY = -(pos.y + 1.75);

        return (
          <group key={item.id} position={[pos.x, pos.y, pos.z]}>
            {/* Circular floor spotlight — anchors the sector in space, not a panel */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, 0]}>
              <circleGeometry args={[0.16, 32]} />
              <meshStandardMaterial
                color="#4ac6ff"
                emissive="#4ac6ff"
                emissiveIntensity={2.2}
                transparent
                opacity={opacity * 0.42}
                depthWrite={false}
              />
            </mesh>

            {/* Floating sector label — no backing panel geometry */}
            <Html transform position={[0, 0, 0.01]}>
              <div
                style={{ opacity }}
                className="w-28 rounded-lg border border-[rgba(157,230,255,0.28)] bg-[rgba(2,10,16,0.70)] px-2 py-1.5 text-center text-[9px] tracking-[0.10em] text-white uppercase backdrop-blur-sm"
              >
                <div className="font-semibold text-[rgba(157,230,255,0.95)]">{item.title}</div>
                <div className="mt-0.5 text-[8px] text-[rgba(157,230,255,0.6)]">{item.kind}</div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export type { RealMediaItem };
