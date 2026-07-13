"use client";

import { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { PRODUCTS, type IndustryId, getProductIndex } from "@/scenes/products/data/products";
import type { ProductsMousePos } from "@/scenes/products/hooks/useProductsMouseParallax";

const tmpPosition = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const industryTarget = new THREE.Vector3();

type Keyframe = {
  p: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
};

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<ProductsMousePos>;
  zoomLevel: number;
  selectedIndustryId: IndustryId | null;
};

function samplePath(progress: number, keyframes: Keyframe[]) {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);

  for (let index = 0; index < keyframes.length - 1; index += 1) {
    const current = keyframes[index];
    const next = keyframes[index + 1];
    if (clamped >= current.p && clamped <= next.p) {
      const mix = (clamped - current.p) / (next.p - current.p);
      return {
        position: current.position.clone().lerp(next.position, mix),
        target: current.target.clone().lerp(next.target, mix),
      };
    }
  }

  const last = keyframes[keyframes.length - 1];
  return {
    position: last.position.clone(),
    target: last.target.clone(),
  };
}

export function ProductsCameraRig({ scrollRef, mouseRef, zoomLevel, selectedIndustryId }: Props) {
  const currentPosition = useRef(new THREE.Vector3(0, 1.8, 18));
  const currentTarget = useRef(new THREE.Vector3(0, 0.4, 12));

  const keyframes = useMemo<Keyframe[]>(() => {
    const span = 1 / PRODUCTS.length;
    const frames = PRODUCTS.flatMap((product, index) => {
      const [x, y, z] = product.model.anchor;
      const start = span * index;
      const mid = start + span * 0.45;
      const end = start + span * 0.9;
      const side = index % 2 === 0 ? -1 : 1;

      return [
        {
          p: start,
          position: new THREE.Vector3(side * 2.4, 1.9, z + 8.5),
          target: new THREE.Vector3(x * 0.18, y + 0.2, z + 1.2),
        },
        {
          p: mid,
          position: new THREE.Vector3(x * 0.45 + side * 1.4, 1.1, z + 3.4),
          target: new THREE.Vector3(x * 0.35, y + 0.15, z),
        },
        {
          p: end,
          position: new THREE.Vector3(side * -1.1, 1.6, z - 2.2),
          target: new THREE.Vector3(x * 0.2, y + 0.1, z - 2.8),
        },
      ];
    });

    return [
      {
        p: 0,
        position: new THREE.Vector3(0, 2.2, 22),
        target: new THREE.Vector3(0, 0.3, 18),
      },
      ...frames,
      {
        p: 1,
        position: new THREE.Vector3(0, 3.4, -30),
        target: new THREE.Vector3(0, 1, -34),
      },
    ];
  }, []);

  useFrame(({ camera }, delta) => {
    const activeIndex = getProductIndex(scrollRef.current);
    const activeProduct = PRODUCTS[activeIndex] ?? PRODUCTS[0];
    const sampled = samplePath(scrollRef.current, keyframes);
    const zoomOffset = THREE.MathUtils.lerp(2.4, 0.4, zoomLevel);

    tmpPosition.copy(sampled.position);
    tmpTarget.copy(sampled.target);

    if (selectedIndustryId) {
      const relevant = PRODUCTS.filter((product) => product.industries.includes(selectedIndustryId));
      industryTarget.set(0, 0, 0);
      relevant.forEach((product) => {
        industryTarget.x += product.model.anchor[0];
        industryTarget.y += product.model.anchor[1];
        industryTarget.z += product.model.anchor[2];
      });
      industryTarget.multiplyScalar(1 / Math.max(1, relevant.length));
      tmpTarget.lerp(industryTarget, 0.72);
      tmpPosition.lerp(industryTarget.clone().add(new THREE.Vector3(0, 1.8, 8.8)), 0.72);
    } else {
      tmpPosition.z -= zoomOffset;
      tmpTarget.x = activeProduct.model.anchor[0] * 0.18;
      tmpTarget.y = activeProduct.model.anchor[1] + 0.08;
    }

    tmpPosition.x += mouseRef.current.x * 0.55;
    tmpPosition.y += mouseRef.current.y * 0.3;
    tmpTarget.x += mouseRef.current.x * 0.2;
    tmpTarget.y += mouseRef.current.y * 0.08;

    currentPosition.current.lerp(tmpPosition, delta * 1.8);
    currentTarget.current.lerp(tmpTarget, delta * 1.8);

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
