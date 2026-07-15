import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { BrushedSteelMaterial } from "./BrushedSteelMaterial";
import type { OviDnaBaseProps } from "./types";

interface CleanSurfaceRevealProps extends OviDnaBaseProps {
  weight: number;
}

export function CleanSurfaceReveal({ weight, reducedMotion = false }: CleanSurfaceRevealProps) {
  const contaminatedRef = useRef<THREE.Mesh>(null);
  const cleanRef = useRef<THREE.Mesh>(null);

  const noiseOpacity = useMemo(() => Math.max(0.08, 0.45 - weight * 0.4), [weight]);

  useFrame(({ clock }) => {
    const motion = reducedMotion ? 0.25 : 1;

    if (contaminatedRef.current) {
      (contaminatedRef.current.material as THREE.MeshStandardMaterial).opacity =
        noiseOpacity + Math.sin(clock.elapsedTime * 1.4 * motion) * 0.02;
    }

    if (cleanRef.current) {
      (cleanRef.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, weight * 0.9);
    }
  });

  return (
    <group position={[0, -1.05, -0.2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.5, 8.5]} />
        <BrushedSteelMaterial color="#243441" roughness={0.48} metalness={0.76} opacity={1} />
      </mesh>

      <mesh ref={contaminatedRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[8.3, 8.3]} />
        <meshStandardMaterial
          color="#2d3c46"
          roughness={0.92}
          metalness={0.18}
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh ref={cleanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <planeGeometry args={[8.1, 8.1]} />
        <meshStandardMaterial
          color="#5ecfff"
          emissive="#5ecfff"
          emissiveIntensity={0.65}
          roughness={0.18}
          metalness={0.82}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
