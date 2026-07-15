import { useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { LiquidGlassMaterial } from "./LiquidGlassMaterial";
import type { OviDnaBaseProps } from "./types";

interface PrecisionWaterDropProps extends OviDnaBaseProps {
  weight: number;
  startY?: number;
  endY?: number;
}

export function PrecisionWaterDrop({
  weight,
  intensity = 1,
  reducedMotion = false,
  startY = 3.4,
  endY = -1.2,
}: PrecisionWaterDropProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const speed = reducedMotion ? 0.08 : 0.3;
    const cycle = (clock.elapsedTime * speed) % 1;
    ref.current.position.y = startY + (endY - startY) * cycle;
    ref.current.scale.y = 1.08 - cycle * 0.16;

    const material = ref.current.material as THREE.MeshPhysicalMaterial;
    material.opacity = Math.max(0, weight * intensity * (1 - cycle * 0.5));
  });

  return (
    <mesh ref={ref} position={[0, startY, 0]}>
      <sphereGeometry args={[0.12, 32, 32]} />
      <LiquidGlassMaterial opacity={weight * intensity} color="#a6ecff" emissive="#0f4770" />
    </mesh>
  );
}
