/**
 * LabSimulation
 *
 * GPU-driven particle system simulating fluid dynamics in the laboratory.
 * Approximately 1 800 particles follow a curl-noise-inspired vector field,
 * producing a swirling, organic motion that evokes chemical or biological
 * processes.
 *
 * The simulation is positioned centrally in the lab and activates once
 * scroll progress passes 0.30.
 *
 * Uniforms (ShaderMaterial):
 *   uTime       – elapsed seconds
 *   uActivation – 0→1, fades in the simulation
 */

"use client";

import { useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1_800;

// ---- shader ----------------------------------------------------------------

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uActivation;

  attribute vec3  aBasePos;
  attribute float aRandom;
  attribute float aSize;

  varying float vOpacity;
  varying vec3  vColor;

  void main() {
    // Curl-noise-inspired flow field (decomposed into three sinusoidal axes)
    float t  = uTime * 0.35;
    float r  = aRandom;

    // Primary orbit in xz plane
    float angle  = t * 0.6 + r * 6.2832;
    float radius = 0.6 + 0.9 * fract(r * 3.7);
    float orbitX = cos(angle) * radius;
    float orbitZ = sin(angle) * radius;

    // Secondary vertical wave
    float waveY = sin(t * 0.8 + r * 9.4248) * 0.5;

    // Micro-turbulence
    float turbX = sin(t * 2.1 + aBasePos.y * 3.0 + r * 12.566) * 0.18;
    float turbZ = cos(t * 1.9 + aBasePos.x * 3.0 + r * 6.2832) * 0.18;

    vec3 pos = vec3(
      aBasePos.x + orbitX + turbX,
      aBasePos.y + waveY,
      aBasePos.z + orbitZ + turbZ
    );

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (160.0 / -mvPos.z) * uActivation;
    gl_Position  = projectionMatrix * mvPos;

    // Opacity modulated by distance from centre and random seed
    float centDist = length(vec2(orbitX, orbitZ));
    vOpacity = (0.25 + aRandom * 0.5) * smoothstep(1.8, 0.2, centDist);

    // Colour: cyan core → bio-green periphery based on orbit radius
    float t2 = smoothstep(0.3, 1.5, radius);
    vColor = mix(vec3(0.24, 0.82, 1.0), vec3(0.35, 1.0, 0.63), t2);
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vOpacity;
  varying vec3  vColor;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = (1.0 - dist * 2.0) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ---- geometry factory ------------------------------------------------------

function buildSimulationGeometry(): THREE.BufferGeometry {
  const basePos  = new Float32Array(PARTICLE_COUNT * 3);
  const randoms  = new Float32Array(PARTICLE_COUNT);
  const sizes    = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Initialise within a small sphere so particles feel like they emerge
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(Math.random() * 2 - 1);
    const r     = Math.random() * 1.2;

    basePos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    basePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
    basePos[i * 3 + 2] = r * Math.cos(phi);

    randoms[i] = Math.random();
    sizes[i]   = 1.0 + Math.random() * 2.2;
  }

  const geo = new THREE.BufferGeometry();
  // Three.js requires a "position" attribute for culling checks
  geo.setAttribute("position", new THREE.BufferAttribute(basePos.slice(), 3));
  geo.setAttribute("aBasePos",  new THREE.BufferAttribute(basePos, 3));
  geo.setAttribute("aRandom",   new THREE.BufferAttribute(randoms, 1));
  geo.setAttribute("aSize",     new THREE.BufferAttribute(sizes, 1));
  return geo;
}

// ---- component -------------------------------------------------------------

type Props = {
  scrollRef: React.MutableRefObject<number>;
};

export function LabSimulation({ scrollRef }: Props) {
  const geometry = useMemo(() => buildSimulationGeometry(), []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime:       { value: 0 },
          uActivation: { value: 0 },
        },
        vertexShader:   VERTEX,
        fragmentShader: FRAGMENT,
        transparent:   true,
        depthWrite:    false,
        blending:      THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;

    const p = scrollRef.current;
    // Activates from scroll 0.30 → 0.45
    const target = THREE.MathUtils.clamp((p - 0.30) / 0.15, 0, 1);
    material.uniforms.uActivation.value = THREE.MathUtils.lerp(
      material.uniforms.uActivation.value,
      target,
      delta * 1.5,
    );
  });

  return (
    // Centred in the lab, slightly elevated
    <points
      geometry={geometry}
      material={material}
      position={[0, 0.5, -1.5]}
      frustumCulled={false}
    />
  );
}
