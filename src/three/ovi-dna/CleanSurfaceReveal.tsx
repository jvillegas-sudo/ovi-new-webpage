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
  const sheenRef = useRef<THREE.Mesh>(null);

  const noiseOpacity = useMemo(() => Math.max(0.06, 0.38 - weight * 0.3), [weight]);

  useFrame(({ clock }) => {
    const motion = reducedMotion ? 0.25 : 1;

    if (contaminatedRef.current) {
      (contaminatedRef.current.material as THREE.MeshStandardMaterial).opacity =
        noiseOpacity + Math.sin(clock.elapsedTime * 1.1 * motion) * 0.015;
    }

    if (cleanRef.current) {
      (cleanRef.current.material as THREE.MeshStandardMaterial).opacity = Math.max(
        0,
        weight * 0.82,
      );
    }

    if (sheenRef.current) {
      sheenRef.current.position.x =
        -1.6 + (Math.sin(clock.elapsedTime * 0.45 * motion) + 1) * 0.5 * 3.2;
      (sheenRef.current.material as THREE.MeshStandardMaterial).opacity =
        weight * (0.08 + Math.sin(clock.elapsedTime * 0.8 * motion) * 0.04);
    }
  });

  return (
    <group position={[0, -1.05, -0.2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.5, 8.5]} />
        <BrushedSteelMaterial color="#17262f" roughness={0.34} metalness={0.88} opacity={1} />
      </mesh>

      <mesh ref={contaminatedRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[8.3, 8.3]} />
        <meshStandardMaterial
          color="#32424c"
          roughness={0.84}
          metalness={0.22}
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh ref={cleanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <planeGeometry args={[8.1, 8.1]} />
        <meshStandardMaterial
          color="#b8f1ff"
          emissive="#66d8ff"
          emissiveIntensity={0.48}
          roughness={0.1}
          metalness={0.86}
          transparent
          opacity={0}
        />
      </mesh>

      <mesh ref={sheenRef} rotation={[-Math.PI / 2, 0, Math.PI / 6]} position={[0, 0.01, 0]}>
        <planeGeometry args={[1.4, 8.4]} />
        <meshStandardMaterial
          color="#d7f8ff"
          emissive="#8ce6ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
