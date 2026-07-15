import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { OviDnaBaseProps } from "./types";

interface PremiumFoamLayerProps extends OviDnaBaseProps {
  weight: number;
}

export function PremiumFoamLayer({ weight, reducedMotion = false }: PremiumFoamLayerProps) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        x: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 6,
        radius: 0.025 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const motion = reducedMotion ? 0.25 : 1;
    refs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const bubble = bubbles[index];
      mesh.position.y = Math.sin(clock.elapsedTime * bubble.speed * motion + bubble.phase) * 0.015;
      (mesh.material as THREE.MeshStandardMaterial).opacity =
        weight * (0.3 + Math.sin(clock.elapsedTime * 0.6 + bubble.phase) * 0.1);
    });
  });

  return (
    <group position={[0, -1.31, 0]}>
      {bubbles.map((bubble, index) => (
        <mesh
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          position={[bubble.x, 0, bubble.z]}
        >
          <sphereGeometry args={[bubble.radius, 12, 12]} />
          <meshStandardMaterial
            color="#eff9ff"
            transparent
            opacity={0}
            metalness={0.04}
            roughness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}
