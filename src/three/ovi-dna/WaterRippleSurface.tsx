import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { BrushedSteelMaterial } from "./BrushedSteelMaterial";
import { LiquidGlassMaterial } from "./LiquidGlassMaterial";
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
  const glowRef = useRef<THREE.Mesh>(null);
  const ringCount = quality === "low" ? 4 : quality === "medium" ? 6 : 8;

  const rings = useMemo(() => Array.from({ length: ringCount }, (_, i) => i), [ringCount]);

  useFrame(({ clock }) => {
    const speed = reducedMotion ? 0.16 : 0.42;
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (clock.elapsedTime * speed + i / ringCount) % 1;
      mesh.scale.setScalar(0.65 + phase * 6.1);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.opacity = weight * Math.max(0, 0.24 - phase * 0.24);
    });

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = weight * (0.08 + Math.sin(clock.elapsedTime * speed * 1.4) * 0.03);
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <planeGeometry args={[28, 28]} />
        <BrushedSteelMaterial opacity={0.88} color="#08151d" roughness={0.06} metalness={0.96} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.346, 0]}>
        <circleGeometry args={[3.8, 72]} />
        <LiquidGlassMaterial opacity={weight * 0.24} color="#9ee9ff" emissive="#124d73" />
      </mesh>

      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.344, 0]}>
        <circleGeometry args={[2.2, 72]} />
        <meshStandardMaterial
          color="#7fe4ff"
          emissive="#48cfff"
          emissiveIntensity={1.8}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <group position={[0, -1.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {rings.map((ring, i) => (
          <mesh
            key={ring}
            ref={(element) => {
              ringRefs.current[i] = element;
            }}
          >
            <ringGeometry args={[0.92, 1.0, 96]} />
            <meshStandardMaterial
              color="#91e8ff"
              emissive="#1d9fd1"
              emissiveIntensity={1.4}
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
