/**
 * CameraRig
 *
 * Drives the R3F camera along a cinematic scroll path.
 * Mouse/touch parallax adds a subtle lateral offset.
 *
 * Camera path keyframes (scroll progress → position):
 *   0.00  [0, 0, 12]  – entering the portal (dark, far back)
 *   0.15  [0, 0.5, 7] – clearing the portal, first particles appear
 *   0.35  [0.4, 0.2, 5] – particles organising
 *   0.55  [1, 0.5, 4] – network forming, camera drifts right
 *   0.75  [-0.8, 0.3, 3.5] – travelling through the network
 *   0.90  [0, -0.3, 4.5] – pulling back, liquid transition begins
 *   1.00  [0, -0.5, 5.5] – end of technology chapter
 */

"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { MousePos } from "@/scenes/technology/hooks/useMouseParallax";

// Ordered scroll-progress → camera-position keyframes
const KEYFRAMES: { p: number; pos: THREE.Vector3; target: THREE.Vector3 }[] = [
  { p: 0.0, pos: new THREE.Vector3(0, 0, 12), target: new THREE.Vector3(0, 0, 0) },
  { p: 0.15, pos: new THREE.Vector3(0, 0.5, 7), target: new THREE.Vector3(0, 0, 0) },
  { p: 0.35, pos: new THREE.Vector3(0.4, 0.2, 5), target: new THREE.Vector3(0, 0, 0) },
  { p: 0.55, pos: new THREE.Vector3(1.0, 0.5, 4), target: new THREE.Vector3(0, 0, 0) },
  { p: 0.75, pos: new THREE.Vector3(-0.8, 0.3, 3.5), target: new THREE.Vector3(0, 0, 0) },
  { p: 0.90, pos: new THREE.Vector3(0, -0.3, 4.5), target: new THREE.Vector3(0, 0, 0) },
  { p: 1.0, pos: new THREE.Vector3(0, -0.5, 5.5), target: new THREE.Vector3(0, 0, 0) },
];

/**
 * Linear interpolation across KEYFRAMES for a given scroll progress value.
 */
function sampleKeyframePath(progress: number): {
  pos: THREE.Vector3;
  target: THREE.Vector3;
} {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const kA = KEYFRAMES[i];
    const kB = KEYFRAMES[i + 1];

    if (clamped >= kA.p && clamped <= kB.p) {
      const t = (clamped - kA.p) / (kB.p - kA.p);
      return {
        pos: kA.pos.clone().lerp(kB.pos, t),
        target: kA.target.clone().lerp(kB.target, t),
      };
    }
  }

  const last = KEYFRAMES[KEYFRAMES.length - 1];
  return { pos: last.pos.clone(), target: last.target.clone() };
}

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<MousePos>;
};

export function CameraRig({ scrollRef, mouseRef }: Props) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 12));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }, delta) => {
    const { pos, target } = sampleKeyframePath(scrollRef.current);

    // Add subtle mouse parallax
    const mx = mouseRef.current.x * 0.3;
    const my = mouseRef.current.y * 0.2;
    pos.x += mx;
    pos.y += my;

    // Smooth lerp towards target position
    targetPos.current.lerp(pos, delta * 2.5);
    targetLook.current.lerp(target, delta * 2.5);

    camera.position.copy(targetPos.current);
    camera.lookAt(targetLook.current);
  });

  return null;
}
