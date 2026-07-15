import { useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { OviDnaBaseProps } from "./types";

interface InspectionLightSweepProps extends OviDnaBaseProps {
  weight: number;
  width?: number;
  depth?: number;
}

export function InspectionLightSweep({
  weight,
  reducedMotion = false,
  width = 10,
  depth = 6,
}: InspectionLightSweepProps) {
  const planeRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const speed = reducedMotion ? 0.2 : 0.5;
    const sweep = -0.9 + (Math.sin(clock.elapsedTime * speed) + 1) * 0.5 * 1.8;

    if (planeRef.current) {
      planeRef.current.position.y = sweep;
      (planeRef.current.material as THREE.MeshStandardMaterial).opacity = weight * 0.06;
    }

    if (edgeRef.current) {
      edgeRef.current.position.y = sweep;
      (edgeRef.current.material as THREE.MeshStandardMaterial).opacity = weight * 0.38;
    }
  });

  return (
    <group position={[0, 0, -2.2]}>
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color="#5ad6ff"
          emissive="#5ad6ff"
          emissiveIntensity={1.4}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={edgeRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.96, 0.03]} />
        <meshStandardMaterial
          color="#80e8ff"
          emissive="#80e8ff"
          emissiveIntensity={2.4}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
