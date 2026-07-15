import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { BrushedSteelMaterial } from "./BrushedSteelMaterial";
import type { OviDnaBaseProps } from "./types";

interface WaterRippleSurfaceProps extends OviDnaBaseProps {
  weight: number;
}

export function WaterRippleSurface({
  weight,
  reducedMotion = false,
  quality = "high",
}: WaterRippleSurfaceProps) {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ringCount = quality === "low" ? 4 : quality === "medium" ? 6 : 8;

  const rings = useMemo(() => Array.from({ length: ringCount }, (_, i) => i), [ringCount]);

  useFrame(({ clock }) => {
    const speed = reducedMotion ? 0.16 : 0.42;
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (clock.elapsedTime * speed + i / ringCount) % 1;
      mesh.scale.setScalar(0.4 + phase * 7.5);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.opacity = weight * Math.max(0, 0.34 - phase * 0.34);
    });
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <planeGeometry args={[26, 26]} />
        <BrushedSteelMaterial opacity={0.82} color="#0c1c28" roughness={0.08} metalness={0.94} />
      </mesh>

      <group position={[0, -1.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {rings.map((ring, i) => (
          <mesh
            key={ring}
            ref={(element) => {
              ringRefs.current[i] = element;
            }}
          >
            <ringGeometry args={[0.96, 1.04, 96]} />
            <meshStandardMaterial
              color="#65d9ff"
              emissive="#0f5a88"
              emissiveIntensity={1.2}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
