import * as THREE from "three";

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;

  attribute float aSize;
  attribute float aRandom;
  attribute float aLane;

  varying float vOpacity;
  varying float vRandom;
  varying float vLane;

  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.45 + aRandom * 6.2831 + pos.z * 0.08) * (0.35 + aLane * 0.08);
    pos.y += cos(uTime * 0.35 + aRandom * 3.1415 + pos.z * 0.12) * 0.4;
    pos.z += sin(uTime * 0.2 + aRandom * 9.4247) * 0.6;
    pos.y += uScroll * 0.6;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vOpacity = 0.18 + aRandom * 0.42;
    vRandom = aRandom;
    vLane = aLane;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vOpacity;
  varying float vRandom;
  varying float vLane;

  float noise(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float pulse = 0.65 + 0.35 * sin(uTime * 1.2 + vRandom * 8.0);
    float grain = noise(gl_PointCoord + vec2(vRandom, vLane));
    float alpha = (1.0 - dist * 2.0) * vOpacity * pulse * (0.82 + grain * 0.18);
    vec3 color = mix(uColorA, uColorB, clamp(vLane * 0.5 + grain * 0.25, 0.0, 1.0));

    gl_FragColor = vec4(color, alpha);
  }
`;

export function createIndustrialParticleMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color("#3DD2FF") },
      uColorB: { value: new THREE.Color("#5AFFC0") },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

export function createIndustrialParticleGeometry(
  count: number,
): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count);
  const lanes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const lane = Math.floor(Math.random() * 4);
    const side = lane % 2 === 0 ? -1 : 1;
    const depth = 30 - Math.random() * 64;

    positions[i * 3] = side * (2.2 + Math.random() * 4.8);
    positions[i * 3 + 1] = -1 + Math.random() * 5.5;
    positions[i * 3 + 2] = depth;
    sizes[i] = 1.1 + Math.random() * 2.6;
    randoms[i] = Math.random();
    lanes[i] = lane;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  geometry.setAttribute("aLane", new THREE.BufferAttribute(lanes, 1));

  return geometry;
}
