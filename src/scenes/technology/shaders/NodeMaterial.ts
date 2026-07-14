/**
 * Node Shader Material
 *
 * Custom ShaderMaterial for capability network nodes.
 *
 * Uniforms:
 *   uTime       – elapsed seconds (breathing / pulse)
 *   uColor      – vec3 node brand colour
 *   uActivation – 0→1 fully activated state
 *   uHover      – 0→1 hover highlight
 */

import * as THREE from "three";

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uActivation;

  varying vec3  vNormal;
  varying float vFresnel;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    // Gentle breathing scale on the sphere
    float breath = 1.0 + sin(uTime * 1.6 + 0.5) * 0.04 * uActivation;
    vec3 pos = position * breath;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    // Fresnel computed in eye space (works in both vertex and fragment)
    vec3 viewDir = normalize(-mvPos.xyz);
    vFresnel     = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);

    gl_Position = projectionMatrix * mvPos;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3  uColor;
  uniform float uTime;
  uniform float uActivation;
  uniform float uHover;

  varying vec3  vNormal;
  varying float vFresnel;

  void main() {
    float core  = 0.20 + uActivation * 0.35 + uHover * 0.15;
    float rim   = vFresnel * (0.50 + uActivation * 0.50 + uHover * 0.25);

    // Pulsing emission when active
    float pulse = uActivation * max(sin(uTime * 3.2), 0.0) * 0.12;

    vec3  col   = uColor * (core + rim + pulse);
    float alpha = clamp(core + rim + 0.08, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

export function createNodeMaterial(color: string): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uActivation: { value: 0 },
      uHover: { value: 0 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
  });
}

/**
 * Reusable sphere geometry shared across all nodes.
 * Call once and share the reference.
 */
export function createNodeGeometry(radius = 0.09): THREE.SphereGeometry {
  return new THREE.SphereGeometry(radius, 20, 20);
}
