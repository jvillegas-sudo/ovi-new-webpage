/**
 * MolecularNetwork
 *
 * Renders the full capability graph:
 *  - One NetworkNode per capability
 *  - LineSegments for all connections between nodes
 *
 * The network fades in between scroll progress 0.35 → 0.55.
 * Connection lines pulse using a custom ShaderMaterial.
 */

"use client";

import { useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { CAPABILITIES } from "@/scenes/technology/data/capabilities";
import { createNodeGeometry } from "@/scenes/technology/shaders/NodeMaterial";
import { NetworkNode } from "@/scenes/technology/components/NetworkNode";

type Props = {
  scrollRef: React.MutableRefObject<number>;
};

// ---- Connection line geometry -----------------------------------------------

function buildConnectionGeometry(): THREE.BufferGeometry {
  const verts: number[] = [];
  const processed = new Set<string>();

  CAPABILITIES.forEach((cap, i) => {
    cap.connections.forEach((j) => {
      const key = [Math.min(i, j), Math.max(i, j)].join("-");
      if (processed.has(key)) return;
      processed.add(key);

      const a = cap.position;
      const b = CAPABILITIES[j].position;
      verts.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    });
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(verts), 3),
  );
  return geo;
}

// ---- Pulsing line material ---------------------------------------------------

const LINE_VERTEX = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LINE_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPos;

  void main() {
    // Travelling light pulse along each edge
    float pulse = 0.4 + 0.3 * sin(vPos.x * 1.5 + vPos.y * 1.2 + uTime * 2.0);
    gl_FragColor = vec4(0.24, 0.82, 1.0, pulse * uOpacity);
  }
`;

function createLineMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0 },
    },
    vertexShader: LINE_VERTEX,
    fragmentShader: LINE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

// ---- Component --------------------------------------------------------------

export function MolecularNetwork({ scrollRef }: Props) {
  const connectionGeo = useMemo(() => buildConnectionGeometry(), []);
  const lineMaterial = useMemo(() => createLineMaterial(), []);
  const sharedNodeGeo = useMemo(() => createNodeGeometry(0.09), []);

  useFrame((_, delta) => {
    lineMaterial.uniforms.uTime.value += delta;

    const p = scrollRef.current;
    // Network fades in from scroll 0.35 → 0.55
    const targetOpacity = THREE.MathUtils.clamp((p - 0.35) / 0.2, 0, 1);
    lineMaterial.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      lineMaterial.uniforms.uOpacity.value,
      targetOpacity,
      delta * 2,
    );
  });

  return (
    <group>
      {/* Connections */}
      <lineSegments geometry={connectionGeo} material={lineMaterial} />

      {/* Nodes */}
      {CAPABILITIES.map((cap) => (
        <NetworkNode
          key={cap.id}
          capability={cap}
          scrollRef={scrollRef}
          sharedGeometry={sharedNodeGeo}
        />
      ))}
    </group>
  );
}
