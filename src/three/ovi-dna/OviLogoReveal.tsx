import { useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { OviDnaBaseProps } from "./types";

interface OviLogoRevealProps extends OviDnaBaseProps {
  weight: number;
}

export function OviLogoReveal({ weight, reducedMotion = false }: OviLogoRevealProps) {
  const haloRef = useRef<THREE.Mesh>(null);
  const logoRef = useRef<THREE.Mesh>(null);
  const logoTexture = useTexture("/brand/ovi-logo.svg");

  useFrame(({ clock }) => {
    const motion = reducedMotion ? 0.15 : 1;
    if (haloRef.current) {
      haloRef.current.rotation.z += 0.003 * motion;
      const material = haloRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = weight * (0.12 + Math.sin(clock.elapsedTime * 1.2 * motion) * 0.06);
    }

    if (logoRef.current) {
      logoRef.current.position.y = 0.3 + Math.sin(clock.elapsedTime * 0.45 * motion) * 0.04;
      const material = logoRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, Math.min(1, weight));
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.016, 16, 160]} />
        <meshStandardMaterial
          color="#63d8ff"
          emissive="#2baee0"
          emissiveIntensity={1.5}
          transparent
          opacity={0}
        />
      </mesh>

      <mesh ref={logoRef} position={[0, 0.3, 0.02]}>
        <planeGeometry args={[3.2, 1.35]} />
        <meshBasicMaterial map={logoTexture} transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}
