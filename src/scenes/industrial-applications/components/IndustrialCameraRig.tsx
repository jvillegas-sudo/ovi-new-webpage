"use client";

import { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { INDUSTRY_ENVIRONMENTS } from "@/scenes/industrial-applications/data/applications";
import type { IndustrialMousePos } from "@/scenes/industrial-applications/hooks/useIndustrialMouseParallax";

type Keyframe = {
  p: number;
  pos: THREE.Vector3;
  target: THREE.Vector3;
};

function samplePath(progress: number, keyframes: Keyframe[]) {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);

  for (let i = 0; i < keyframes.length - 1; i++) {
    const current = keyframes[i];
    const next = keyframes[i + 1];
    if (clamped >= current.p && clamped <= next.p) {
      const t = (clamped - current.p) / (next.p - current.p);
      return {
        pos: current.pos.clone().lerp(next.pos, t),
        target: current.target.clone().lerp(next.target, t),
      };
    }
  }

  const last = keyframes[keyframes.length - 1];
  return { pos: last.pos.clone(), target: last.target.clone() };
}

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<IndustrialMousePos>;
};

export function IndustrialCameraRig({ scrollRef, mouseRef }: Props) {
  const currentPos = useRef(new THREE.Vector3(0, 3.4, 31));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 22));

  const keyframes = useMemo<Keyframe[]>(() => {
    const sceneFrames = INDUSTRY_ENVIRONMENTS.flatMap((environment, index) => {
      const span = 1 / INDUSTRY_ENVIRONMENTS.length;
      const start = span * index;
      const mid = start + span * 0.48;
      const end = start + span * 0.9;
      const side = index % 2 === 0 ? -1 : 1;
      const [, anchorY, anchorZ] = environment.anchor;

      return [
        {
          p: start,
          pos: new THREE.Vector3(0, 2.9 - index * 0.03, anchorZ + 9.5),
          target: new THREE.Vector3(0, anchorY + 0.15, anchorZ + 2),
        },
        {
          p: mid,
          pos: new THREE.Vector3(side * 1.85, 1.55, anchorZ + 3.2),
          target: new THREE.Vector3(side * 0.95, anchorY + 0.1, anchorZ - 0.6),
        },
        {
          p: end,
          pos: new THREE.Vector3(0, 2.15, anchorZ - 1.8),
          target: new THREE.Vector3(0, anchorY + 0.2, anchorZ - 3.6),
        },
      ];
    });

    return [
      {
        p: 0,
        pos: new THREE.Vector3(0, 3.4, 31),
        target: new THREE.Vector3(0, 0.2, 24),
      },
      ...sceneFrames,
      {
        p: 1,
        pos: new THREE.Vector3(0, 3.8, -31),
        target: new THREE.Vector3(0, 1.2, -35),
      },
    ];
  }, []);

  useFrame(({ camera }, delta) => {
    const { pos, target } = samplePath(scrollRef.current, keyframes);

    pos.x += mouseRef.current.x * 0.32;
    pos.y += mouseRef.current.y * 0.18;
    target.x += mouseRef.current.x * 0.18;
    target.y += mouseRef.current.y * 0.08;

    const lerpSpeed = 1.85;
    currentPos.current.lerp(pos, delta * lerpSpeed);
    currentTarget.current.lerp(target, delta * lerpSpeed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
