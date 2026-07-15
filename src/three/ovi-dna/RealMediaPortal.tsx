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

export function RealMediaPortal({ items, weight }: RealMediaPortalProps) {
  const slots = useMemo(() => items.slice(0, 4), [items]);

  return (
    <group position={[0, 0.2, -1.8]}>
      {slots.map((item, index) => {
        const x = (index - (slots.length - 1) / 2) * 2.2;
        const isOfficial = item.status === "official";

        return (
          <group key={item.id} position={[x, 0, 0]}>
            <mesh>
              <planeGeometry args={[1.8, 1.2]} />
              <meshStandardMaterial
                color={isOfficial ? "#9de6ff" : "#354450"}
                emissive={isOfficial ? "#1f7cad" : "#1f2b32"}
                emissiveIntensity={isOfficial ? 1.1 : 0.45}
                transparent
                opacity={Math.max(0, Math.min(1, weight * 0.95))}
              />
            </mesh>

            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[1.72, 1.08]} />
              <meshStandardMaterial
                color={isOfficial ? "#0e2230" : "#18212a"}
                emissive={isOfficial ? "#204f6a" : "#202d37"}
                emissiveIntensity={0.8}
                transparent
                opacity={Math.max(0, Math.min(1, weight * 0.82))}
              />
            </mesh>

            <Html transform position={[0, 0, 0.03]}>
              <div className="w-40 rounded-md border border-[rgba(157,230,255,0.35)] bg-[rgba(2,12,19,0.72)] px-2 py-1 text-center text-[10px] tracking-[0.08em] text-white uppercase">
                <div className="font-semibold">{item.title}</div>
                <div className="mt-1 text-[9px] text-[rgba(157,230,255,0.86)]">
                  {item.kind} · {isOfficial ? "contenido oficial" : "pendiente oficial"}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export type { RealMediaItem };
