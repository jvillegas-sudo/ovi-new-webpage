/**
 * Particle Shader Material
 *
 * GPU-driven ShaderMaterial for the background particle cloud.
 *
 * Uniforms:
 *   uTime      – elapsed seconds (drives drift / pulse)
 *   uOrganize  – 0→1 lerp from random scatter to organised shell
 *
 * Per-vertex attributes (must be set on BufferGeometry):
 *   aInitialPos  – vec3  random scatter position
 *   aTargetPos   – vec3  organised sphere-shell position
 *   aSize        – float point size scale
 *   aRandom      – float per-particle noise seed [0,1]
 */

import * as THREE from "three";

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uOrganize;

  attribute vec3  aInitialPos;
  attribute vec3  aTargetPos;
  attribute float aSize;
  attribute float aRandom;

  varying float vOpacity;
  varying float vRandom;

  void main() {
    // Interpolate from scatter to organised shell
    vec3 pos = mix(aInitialPos, aTargetPos, uOrganize);

    // Gentle drift while still unorganised
    float drift = 1.0 - uOrganize;
    pos.x += sin(uTime * 0.30 + aRandom * 6.283) * drift * 0.45;
    pos.y += cos(uTime * 0.22 + aRandom * 3.141) * drift * 0.45;
    pos.z += sin(uTime * 0.26 + aRandom * 9.424) * drift * 0.30;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (220.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;

    vOpacity = 0.18 + aRandom * 0.44;
    vRandom  = aRandom;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;

  varying float vOpacity;
  varying float vRandom;

  void main() {
    // Soft circular point
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = (1.0 - dist * 2.0) * vOpacity;
    // Subtle breathing pulse per particle
    alpha *= 0.65 + 0.35 * sin(uTime * 1.4 + vRandom * 6.283);

    // Cyan tinted
    gl_FragColor = vec4(0.24, 0.82, 1.0, alpha);
  }
`;

export function createParticleMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOrganize: { value: 0 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** Build a BufferGeometry for N particles. */
export function createParticleGeometry(count: number): THREE.BufferGeometry {
  const initial = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Random scatter in a cube
    initial[i * 3] = (Math.random() - 0.5) * 22;
    initial[i * 3 + 1] = (Math.random() - 0.5) * 22;
    initial[i * 3 + 2] = (Math.random() - 0.5) * 22;

    // Organised: hollow sphere shell, r ∈ [2.8, 4.5]
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 2.8 + Math.random() * 1.7;
    target[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    target[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    target[i * 3 + 2] = r * Math.cos(phi);

    sizes[i] = 1.2 + Math.random() * 2.8;
    randoms[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  // position = initial positions (Three.js needs a position attribute)
  geo.setAttribute("position", new THREE.BufferAttribute(initial.slice(), 3));
  geo.setAttribute("aInitialPos", new THREE.BufferAttribute(initial, 3));
  geo.setAttribute("aTargetPos", new THREE.BufferAttribute(target, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

  return geo;
}
