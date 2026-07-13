import * as THREE from "three";

const VERTEX = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.x += sin((position.z + uTime * 8.0) * 0.035) * 0.28;
    transformed.y += cos((position.z - uTime * 6.0) * 0.03) * 0.18;

    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform vec3 uPrimary;
  uniform vec3 uSecondary;

  varying vec3 vWorldPosition;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    float grain = noise(vUv * 10.0 + vec2(0.0, uTime * 0.08));
    float veins = noise(vUv * 22.0 - vec2(uTime * 0.04, 0.0));
    float glow = smoothstep(0.0, 1.0, 1.0 - abs(vUv.x - 0.5) * 1.7);
    float depth = smoothstep(-34.0, 8.0, -vWorldPosition.z);

    vec3 color = mix(uPrimary, uSecondary, clamp(grain * 0.75 + veins * 0.25, 0.0, 1.0));
    float alpha = (0.16 + grain * 0.18 + glow * 0.16) * mix(0.6, 1.25, uReveal) * depth;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function createAtmosphereMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uPrimary: { value: new THREE.Color("#3DD2FF") },
      uSecondary: { value: new THREE.Color("#5AFFC0") },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
}
