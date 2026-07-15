import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { OviDnaBaseProps } from "./types";

interface TechnicalSteamVolumeProps extends OviDnaBaseProps {
  weight: number;
}

export function TechnicalSteamVolume({
  weight,
  quality = "medium",
  reducedMotion = false,
}: TechnicalSteamVolumeProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = quality === "low" ? 120 : quality === "medium" ? 220 : 360;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 5;
      positions[i3 + 1] = -1 + Math.random() * 2.8;
      positions[i3 + 2] = -2.4 + (Math.random() - 0.5) * 3.6;

      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = 0.005 + Math.random() * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, velocities };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const motion = reducedMotion ? 0.25 : 1;
    const dt = Math.min(delta * 60, 3) * motion;

    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3] * dt;
      positions[i3 + 1] += velocities[i3 + 1] * dt;
      positions[i3 + 2] += velocities[i3 + 2] * dt;

      if (positions[i3 + 1] > 2.5) {
        positions[i3] = (Math.random() - 0.5) * 5;
        positions[i3 + 1] = -1;
        positions[i3 + 2] = -2.4 + (Math.random() - 0.5) * 3.6;
      }
    }

    attr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.22;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#d4efff" transparent opacity={0} depthWrite={false} />
    </points>
  );
}
