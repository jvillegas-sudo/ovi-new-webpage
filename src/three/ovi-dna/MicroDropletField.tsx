import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { OviDnaBaseProps } from "./types";

interface MicroDropletFieldProps extends OviDnaBaseProps {
  weight?: number;
}

export function MicroDropletField({
  weight = 1,
  reducedMotion = false,
  quality = "high",
}: MicroDropletFieldProps) {
  const sprayRef = useRef<THREE.Points>(null);
  const mistRef = useRef<THREE.Points>(null);

  const counts =
    quality === "low"
      ? { spray: 240, mist: 180 }
      : quality === "medium"
        ? { spray: 420, mist: 320 }
        : { spray: 700, mist: 520 };

  const { sprayPositions, mistPositions } = useMemo(() => {
    const sprayPositions = new Float32Array(counts.spray * 3);
    for (let i = 0; i < counts.spray; i++) {
      const i3 = i * 3;
      const radius = 2 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      sprayPositions[i3] = Math.cos(angle) * radius;
      sprayPositions[i3 + 1] = (Math.random() - 0.5) * 2.8;
      sprayPositions[i3 + 2] = Math.sin(angle) * radius;
    }

    const mistPositions = new Float32Array(counts.mist * 3);
    for (let i = 0; i < counts.mist; i++) {
      const i3 = i * 3;
      const radius = 1.2 + Math.random() * 6.2;
      const angle = Math.random() * Math.PI * 2;
      mistPositions[i3] = Math.cos(angle) * radius;
      mistPositions[i3 + 1] = -0.7 + Math.random() * 1.4;
      mistPositions[i3 + 2] = Math.sin(angle) * radius;
    }

    return { sprayPositions, mistPositions };
  }, [counts.mist, counts.spray]);

  useFrame(({ clock }, delta) => {
    const motionFactor = reducedMotion ? 0.2 : 1;

    if (sprayRef.current) {
      sprayRef.current.rotation.y += delta * 0.04 * motionFactor;
      sprayRef.current.position.y = Math.sin(clock.elapsedTime * 0.35 * motionFactor) * 0.22;
      (sprayRef.current.material as THREE.PointsMaterial).opacity = 0.08 + weight * 0.18;
    }

    if (mistRef.current) {
      mistRef.current.rotation.y -= delta * 0.02 * motionFactor;
      mistRef.current.position.y =
        -0.3 + Math.sin(clock.elapsedTime * 0.28 * motionFactor + 0.6) * 0.1;
      (mistRef.current.material as THREE.PointsMaterial).opacity = 0.05 + weight * 0.1;
    }
  });

  return (
    <>
      <points ref={sprayRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sprayPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#b9e8ff" transparent opacity={0.18} depthWrite={false} />
      </points>
      <points ref={mistRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[mistPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#e3f8ff" transparent opacity={0.1} depthWrite={false} />
      </points>
    </>
  );
}
