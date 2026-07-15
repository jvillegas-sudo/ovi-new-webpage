import { useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { OviDnaBaseProps } from "./types";

interface OviLogoRevealProps extends OviDnaBaseProps {
  weight: number;
}

/**
 * OviLogoReveal — WO-017 Art Direction Lock
 *
 * Enhanced logo reveal: dual-ring atmospheric halo + logo over a soft light pool.
 * The outer ring breathes at a different phase creating a living, layered glow.
 */
export function OviLogoReveal({ weight, reducedMotion = false }: OviLogoRevealProps) {
  const innerHaloRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const lightPoolRef = useRef<THREE.Mesh>(null);
  const logoRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const motion = reducedMotion ? 0.15 : 1;
    const t = clock.elapsedTime * motion;

    if (innerHaloRef.current) {
      innerHaloRef.current.rotation.z += 0.003 * motion;
      const mat = innerHaloRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = weight * (0.14 + Math.sin(t * 1.2) * 0.06);
    }

    if (outerHaloRef.current) {
      outerHaloRef.current.rotation.z -= 0.0018 * motion;
      const mat = outerHaloRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = weight * (0.06 + Math.sin(t * 0.8 + 1.1) * 0.03);
    }

    if (lightPoolRef.current) {
      const mat = lightPoolRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = weight * (0.09 + Math.sin(t * 0.55) * 0.03);
    }

    if (logoRef.current) {
      logoRef.current.position.y = 0.3 + Math.sin(t * 0.45) * 0.04;
      const mat = logoRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, Math.min(1, weight));
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      {/* Inner halo ring — tighter, brighter */}
      <mesh ref={innerHaloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.014, 16, 160]} />
        <meshStandardMaterial
          color="#63d8ff"
          emissive="#2baee0"
          emissiveIntensity={2.0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Outer halo ring — wider, softer, counter-rotating */}
      <mesh ref={outerHaloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.008, 12, 180]} />
        <meshStandardMaterial
          color="#a8e8ff"
          emissive="#1a8ab5"
          emissiveIntensity={1.4}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Soft light pool on the floor — diffuse illumination beneath the logo */}
      <mesh ref={lightPoolRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial
          color="#29b5e8"
          emissive="#29b5e8"
          emissiveIntensity={1.6}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={logoRef} position={[0, 0.3, 0.02]}>
        <planeGeometry args={[3.2, 1.35]} />
        <LogoMaterial />
      </mesh>
    </group>
  );
}

function LogoMaterial() {
  const logoTexture = useTexture("/brand/ovi-logo.svg");
  return <meshBasicMaterial map={logoTexture} transparent opacity={0} toneMapped={false} />;
}
