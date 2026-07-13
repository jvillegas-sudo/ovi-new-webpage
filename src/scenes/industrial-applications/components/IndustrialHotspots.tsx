"use client";

import { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  INDUSTRY_ENVIRONMENTS,
  getEnvironmentIndex,
} from "@/scenes/industrial-applications/data/applications";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  hoverRef: React.MutableRefObject<number>;
};

export function IndustrialHotspots({ scrollRef, hoverRef }: Props) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const activeIndex = getEnvironmentIndex(scrollRef.current);

    INDUSTRY_ENVIRONMENTS.forEach((environment, index) => {
      const mesh = meshes.current[index];
      const ring = rings.current[index];
      if (!mesh || !ring) return;

      const emphasized = index === activeIndex || index === hoverRef.current;
      const targetScale = emphasized ? 1 : 0.55;
      const targetOpacity = emphasized ? 0.95 : 0.35;

      mesh.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 3.2,
      );
      ring.scale.lerp(
        new THREE.Vector3(targetScale * 1.8, targetScale * 1.8, 1),
        delta * 3,
      );

      const ringMaterial = ring.material as THREE.MeshBasicMaterial;
      ringMaterial.opacity = THREE.MathUtils.lerp(
        ringMaterial.opacity,
        targetOpacity,
        delta * 3,
      );

      const meshMaterial = mesh.material as THREE.MeshStandardMaterial;
      color.set(environment.palette.primary);
      meshMaterial.emissive.copy(color);
      meshMaterial.opacity = THREE.MathUtils.lerp(
        meshMaterial.opacity,
        emphasized ? 1 : 0.55,
        delta * 3,
      );
    });
  });

  return (
    <group>
      {INDUSTRY_ENVIRONMENTS.map((environment, index) => (
        <group key={environment.id} position={environment.hotspot}>
          <mesh
            ref={(element) => {
              meshes.current[index] = element;
            }}
            onPointerOver={() => {
              hoverRef.current = index;
            }}
            onPointerOut={() => {
              hoverRef.current = -1;
            }}
            onClick={() => {
              hoverRef.current = index;
            }}
          >
            <sphereGeometry args={[0.22, 18, 18]} />
            <meshStandardMaterial
              color={environment.palette.secondary}
              emissive={environment.palette.primary}
              emissiveIntensity={2.2}
              transparent
              opacity={0.6}
              metalness={0.2}
              roughness={0.25}
            />
          </mesh>

          <mesh
            ref={(element) => {
              rings.current[index] = element;
            }}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.38, 0.52, 48]} />
            <meshBasicMaterial
              color={environment.palette.primary}
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
