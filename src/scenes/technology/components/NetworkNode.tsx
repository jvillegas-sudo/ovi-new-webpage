/**
 * NetworkNode
 *
 * Single capability node rendered as a glowing sphere.
 * Activation ramps up when scroll progress passes the node's activationAt value.
 * Hover highlight is driven by pointer enter/leave events.
 */

"use client";

import { useRef, useState, useMemo } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { Capability } from "@/scenes/technology/data/capabilities";
import {
  createNodeGeometry,
  createNodeMaterial,
} from "@/scenes/technology/shaders/NodeMaterial";

type Props = {
  capability: Capability;
  scrollRef: React.MutableRefObject<number>;
  sharedGeometry: THREE.SphereGeometry;
};

export function NetworkNode({ capability, scrollRef, sharedGeometry }: Props) {
  const material = useMemo(
    () => createNodeMaterial(capability.color),
    [capability.color],
  );

  // Halo sphere – larger, lower opacity
  const haloMaterial = useMemo(() => {
    const mat = createNodeMaterial(capability.color);
    mat.uniforms.uColor.value = new THREE.Color(capability.color);
    return mat;
  }, [capability.color]);

  const haloGeometry = useMemo(() => createNodeGeometry(0.22), []);

  const [hovered, setHovered] = useState(false);

  const targetActivation = useRef(0);
  const targetHover = useRef(0);

  useFrame((_, delta) => {
    const p = scrollRef.current;

    // Node activates when scroll passes its threshold
    targetActivation.current = p >= capability.activationAt ? 1 : 0;
    targetHover.current = hovered ? 1 : 0;

    // Smooth lerp
    material.uniforms.uTime.value += delta;
    material.uniforms.uActivation.value = THREE.MathUtils.lerp(
      material.uniforms.uActivation.value,
      targetActivation.current,
      delta * 2.5,
    );
    material.uniforms.uHover.value = THREE.MathUtils.lerp(
      material.uniforms.uHover.value,
      targetHover.current,
      delta * 8,
    );

    // Sync halo
    haloMaterial.uniforms.uTime.value = material.uniforms.uTime.value;
    haloMaterial.uniforms.uActivation.value =
      material.uniforms.uActivation.value * 0.35;
    haloMaterial.uniforms.uHover.value = material.uniforms.uHover.value * 0.4;
  });

  return (
    <group position={capability.position}>
      {/* Core node */}
      <mesh
        geometry={sharedGeometry}
        material={material}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      />
      {/* Halo */}
      <mesh geometry={haloGeometry} material={haloMaterial} />
    </group>
  );
}
