/**
 * Floor Material
 *
 * Dark, semi-reflective laboratory floor.
 * A subtle cyan-tinted grid overlay and radial glow pulse with time.
 *
 * Uniforms:
 *   uTime   – elapsed seconds
 *   uReveal – 0→1 floor materialisation progress
 */

import * as THREE from "three";

const VERTEX = /* glsl */ `
  varying vec2  vUv;
  varying vec3  vWorldPos;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;

  varying vec2  vUv;
  varying vec3  vWorldPos;

  void main() {
    // ---- Grid lines ----
    float gx = smoothstep(0.03, 0.0, abs(fract(vUv.x * 10.0) - 0.5) - 0.47);
    float gy = smoothstep(0.03, 0.0, abs(fract(vUv.y * 10.0) - 0.5) - 0.47);
    float grid = max(gx, gy) * 0.18;

    // ---- Radial glow from origin ----
    float dist = length(vWorldPos.xz);
    float glow = exp(-dist * 0.12) * 0.10;

    // ---- Ripple rings emanating from center ----
    float ring = sin(dist * 3.0 - uTime * 1.2) * 0.5 + 0.5;
    ring *= exp(-dist * 0.25) * 0.08;

    // ---- Materialisation fade (reveal front-to-back) ----
    // vUv.y goes 0 (back) to 1 (front in NDC, but geometry is flat)
    // We use world z to drive the reveal wave
    float revealEdge = uReveal * 28.0 - 14.0; // maps 0..1 to z=-14..14
    float revealMask = smoothstep(-1.5, 1.5, vWorldPos.z - revealEdge + 14.0);
    revealMask = clamp(revealMask * uReveal * 3.0, 0.0, 1.0);

    float brightness = (grid + glow + ring) * revealMask;

    // Dark floor base colour + cyan tint on lit parts
    vec3 col = vec3(0.012, 0.022, 0.04)
             + vec3(0.0, 0.44, 0.85) * brightness;

    float alpha = (0.80 + brightness * 0.2) * revealMask;
    gl_FragColor = vec4(col, alpha);
  }
`;

export function createFloorMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uReveal: { value: 0 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
  });
}
