/**
 * ParticleField
 *
 * GPU-driven particle cloud. ~2 000 particles.
 *
 * Phases driven by scroll progress (via scrollRef):
 *   0.00–0.30  particles drift in random scatter (uOrganize → 0)
 *   0.30–0.55  particles organise into a sphere shell (uOrganize → 1)
 *   0.55–1.00  organised cloud persists; subtle drift remains
 */

"use client";

import { useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  createParticleGeometry,
  createParticleMaterial,
} from "@/scenes/technology/shaders/ParticleMaterial";

const PARTICLE_COUNT = 2_000;

type Props = {
  scrollRef: React.MutableRefObject<number>;
};

export function ParticleField({ scrollRef }: Props) {
  const geometry = useMemo(() => createParticleGeometry(PARTICLE_COUNT), []);
  const material = useMemo(() => createParticleMaterial(), []);

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;

    const p = scrollRef.current;
    // 0.30→0.55 maps to uOrganize 0→1
    const organize = THREE.MathUtils.clamp((p - 0.3) / 0.25, 0, 1);
    material.uniforms.uOrganize.value = THREE.MathUtils.lerp(
      material.uniforms.uOrganize.value,
      organize,
      delta * 2,
    );
  });

  return (
    <points geometry={geometry} material={material} frustumCulled={false} />
  );
}
