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
  const innerAuraRef = useRef<THREE.Mesh>(null);
  const outerAuraRef = useRef<THREE.Mesh>(null);
  const lightPoolRef = useRef<THREE.Mesh>(null);
  const logoRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const motion = reducedMotion ? 0.15 : 1;
    const t = clock.elapsedTime * motion;

    if (innerAuraRef.current) {
      innerAuraRef.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.03);
      const mat = innerAuraRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = weight * (0.14 + Math.sin(t * 1.2) * 0.06);
    }

    if (outerAuraRef.current) {
      outerAuraRef.current.scale.setScalar(1 + Math.sin(t * 0.55 + 1.1) * 0.04);
      const mat = outerAuraRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = weight * (0.05 + Math.sin(t * 0.8 + 1.1) * 0.025);
    }

    if (lightPoolRef.current) {
      const mat = lightPoolRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = weight * (0.08 + Math.sin(t * 0.55) * 0.025);
    }

    if (logoRef.current) {
      logoRef.current.position.y = 0.3 + Math.sin(t * 0.45) * 0.04;
      const mat = logoRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, Math.min(1, weight));
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      <mesh ref={outerAuraRef} position={[0, 0.15, -0.14]}>
        <circleGeometry args={[2.9, 72]} />
        <meshStandardMaterial
          color="#dff9ff"
          emissive="#5bcfff"
          emissiveIntensity={1.4}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerAuraRef} position={[0, 0.22, -0.08]}>
        <circleGeometry args={[1.95, 72]} />
        <meshStandardMaterial
          color="#f4ffff"
          emissive="#7be0ff"
          emissiveIntensity={1.8}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={lightPoolRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <circleGeometry args={[2.6, 48]} />
        <meshStandardMaterial
          color="#29b5e8"
          emissive="#29b5e8"
          emissiveIntensity={1.45}
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
