"use client";

import { useEffect, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  INDUSTRY_ENVIRONMENTS,
  getEnvironmentIndex,
  getEnvironmentProgress,
} from "@/scenes/industrial-applications/data/applications";
import {
  createIndustrialParticleGeometry,
  createIndustrialParticleMaterial,
} from "@/scenes/industrial-applications/shaders/IndustrialParticleMaterial";

type Props = {
  count: number;
  scrollRef: React.MutableRefObject<number>;
};

export function IndustrialParticleField({ count, scrollRef }: Props) {
  const geometry = useMemo(() => createIndustrialParticleGeometry(count), [count]);
  const material = useMemo(() => createIndustrialParticleMaterial(), []);
  const scratchA = useMemo(() => new THREE.Color(), []);
  const scratchB = useMemo(() => new THREE.Color(), []);
  const nextPrimary = useMemo(() => new THREE.Color(), []);
  const nextSecondary = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    const progress = scrollRef.current;
    const environmentIndex = getEnvironmentIndex(progress);
    const localProgress = getEnvironmentProgress(progress, environmentIndex);
    const current = INDUSTRY_ENVIRONMENTS[environmentIndex];
    const next =
      INDUSTRY_ENVIRONMENTS[
        Math.min(INDUSTRY_ENVIRONMENTS.length - 1, environmentIndex + 1)
      ] ?? current;

    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uScroll.value = progress;

    scratchA.set(current.palette.primary).lerp(
      nextPrimary.set(next.palette.primary),
      localProgress,
    );
    scratchB.set(current.palette.secondary).lerp(
      nextSecondary.set(next.palette.secondary),
      localProgress,
    );

    (material.uniforms.uColorA.value as THREE.Color).copy(scratchA);
    (material.uniforms.uColorB.value as THREE.Color).copy(scratchB);
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
