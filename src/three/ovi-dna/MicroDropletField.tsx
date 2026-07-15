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
  const veilRef = useRef<THREE.Points>(null);

  const counts =
    quality === "low"
      ? { spray: 220, mist: 160, veil: 70 }
      : quality === "medium"
        ? { spray: 360, mist: 280, veil: 120 }
        : { spray: 560, mist: 420, veil: 180 };

  const { sprayPositions, mistPositions, veilPositions } = useMemo(() => {
    const sprayPositions = new Float32Array(counts.spray * 3);
    for (let i = 0; i < counts.spray; i++) {
      const i3 = i * 3;
      const radius = 1.4 + Math.random() * 4.1;
      const angle = Math.random() * Math.PI * 2;
      sprayPositions[i3] = Math.cos(angle) * radius;
      sprayPositions[i3 + 1] = -0.2 + (Math.random() - 0.5) * 2.4;
      sprayPositions[i3 + 2] = Math.sin(angle) * radius - Math.random() * 1.4;
    }

    const mistPositions = new Float32Array(counts.mist * 3);
    for (let i = 0; i < counts.mist; i++) {
      const i3 = i * 3;
      const radius = 0.8 + Math.random() * 5.6;
      const angle = Math.random() * Math.PI * 2;
      mistPositions[i3] = Math.cos(angle) * radius;
      mistPositions[i3 + 1] = -0.9 + Math.random() * 2.2;
      mistPositions[i3 + 2] = Math.sin(angle) * radius - 1.2;
    }

    const veilPositions = new Float32Array(counts.veil * 3);
    for (let i = 0; i < counts.veil; i++) {
      const i3 = i * 3;
      veilPositions[i3] = (Math.random() - 0.5) * 3.4;
      veilPositions[i3 + 1] = -1 + Math.random() * 3.8;
      veilPositions[i3 + 2] = -2.8 + (Math.random() - 0.5) * 1.6;
    }

    return { sprayPositions, mistPositions, veilPositions };
  }, [counts.mist, counts.spray, counts.veil]);

  useFrame(({ clock }, delta) => {
    const motionFactor = reducedMotion ? 0.2 : 1;

    if (sprayRef.current) {
      sprayRef.current.rotation.y += delta * 0.032 * motionFactor;
      sprayRef.current.position.y = Math.sin(clock.elapsedTime * 0.28 * motionFactor) * 0.18;
      (sprayRef.current.material as THREE.PointsMaterial).opacity = 0.04 + weight * 0.14;
    }

    if (mistRef.current) {
      mistRef.current.rotation.y -= delta * 0.015 * motionFactor;
      mistRef.current.position.y =
        -0.18 + Math.sin(clock.elapsedTime * 0.18 * motionFactor + 0.6) * 0.1;
      (mistRef.current.material as THREE.PointsMaterial).opacity = 0.04 + weight * 0.08;
    }

    if (veilRef.current) {
      veilRef.current.rotation.y += delta * 0.008 * motionFactor;
      veilRef.current.position.y = Math.sin(clock.elapsedTime * 0.14 * motionFactor) * 0.06;
      (veilRef.current.material as THREE.PointsMaterial).opacity = 0.02 + weight * 0.05;
    }
  });

  return (
    <>
      <points ref={sprayRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sprayPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#cdefff"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </points>
      <points ref={mistRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[mistPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.012} color="#eefcff" transparent opacity={0.1} depthWrite={false} />
      </points>
      <points ref={veilRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[veilPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#f5ffff" transparent opacity={0.04} depthWrite={false} />
      </points>
    </>
  );
}
