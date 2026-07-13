"use client";

import { useMemo, useRef } from "react";

import { Line } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import {
  PRODUCT_CONNECTIONS,
  PRODUCTS,
  type InspectionMode,
  type ProductDefinition,
  type ProductSilhouette,
  getProductById,
  getProductIndex,
  getProductProgress,
} from "@/scenes/products/data/products";
import type { RotationState, ProductViewState } from "@/scenes/products/ProductsCanvas";

const tmpVector = new THREE.Vector3();
const curvePoints = Array.from({ length: 18 }, () => new THREE.Vector3());

type Props = {
  scrollRef: React.MutableRefObject<number>;
  hoverRef: React.MutableRefObject<string | null>;
  rotationRef: React.MutableRefObject<RotationState>;
  selectedHotspotId: string | null;
  particleCount: number;
  viewState: ProductViewState;
  onSelectHotspot: (hotspotId: string | null) => void;
};

type ShapeProps = {
  product: ProductDefinition;
  active: boolean;
  exploded: boolean;
  inspectionMode: InspectionMode;
};

function ProductShell({ product, active, exploded, inspectionMode }: ShapeProps) {
  const spread = exploded ? 0.55 : 0;
  const materialProps = {
    color: product.model.primary,
    emissive: product.model.glow,
    emissiveIntensity: active ? 0.9 : 0.35,
    metalness: inspectionMode === "technical" ? 0.75 : 0.35,
    roughness: inspectionMode === "materials" ? 0.15 : 0.28,
    transparent: true,
    opacity: inspectionMode === "materials" && active ? 0.68 : 0.92,
  };

  const accentMaterialProps = {
    color: product.model.secondary,
    emissive: product.model.secondary,
    emissiveIntensity: active ? 0.7 : 0.2,
    metalness: 0.2,
    roughness: 0.12,
    transparent: true,
    opacity: 0.96,
  };

  switch (product.model.silhouette as ProductSilhouette) {
    case "bottle":
      return (
        <>
          <mesh position={[0, -0.05 - spread * 0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.65, 0.88, 2.4, 40]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 1.2 + spread, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.32, 0.46, 24]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[0, 0.8 + spread * 0.7, 0]} castShadow>
            <coneGeometry args={[0.34, 0.42, 28]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.35} />
          </mesh>
        </>
      );
    case "canister":
      return (
        <>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.7, 2.2, 1.2]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 1.25 + spread, -0.08]} castShadow>
            <torusGeometry args={[0.34, 0.09, 18, 30, Math.PI]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[0.45, 0.94 + spread * 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.36, 18]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.3} />
          </mesh>
        </>
      );
    case "capsule":
      return (
        <>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.62, 1.95, 12, 24]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <torusGeometry args={[0.88 + spread * 0.25, 0.09, 18, 40]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[0, 0, 0.32 + spread * 0.2]} castShadow>
            <sphereGeometry args={[0.18, 20, 20]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.55} />
          </mesh>
        </>
      );
    case "shield":
      return (
        <>
          <mesh position={[0, 0, 0]} castShadow>
            <octahedronGeometry args={[1.32, 1]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 0, 0.24 + spread * 0.2]} castShadow>
            <ringGeometry args={[0.45, 1.05, 48]} />
            <meshStandardMaterial color={product.model.secondary} emissive={product.model.secondary} emissiveIntensity={0.6} transparent opacity={0.88} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.1 + spread * 0.25, -0.2]} castShadow>
            <sphereGeometry args={[0.26, 20, 20]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.45} />
          </mesh>
        </>
      );
    case "sprayer":
      return (
        <>
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.72, 0.86, 2.1, 32]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0.25 + spread * 0.6, 1.0 + spread * 0.45, 0]} castShadow>
            <boxGeometry args={[0.92, 0.35, 0.38]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[0.95 + spread, 1.18 + spread * 0.5, 0]} castShadow>
            <boxGeometry args={[0.5, 0.12, 0.12]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.4} />
          </mesh>
        </>
      );
    case "tool":
      return (
        <>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.2, 2.2, 0.62]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 0.25, 0.42 + spread * 0.15]} castShadow>
            <boxGeometry args={[0.66, 0.84, 0.18]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.78 + spread * 0.8, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 1.45, 18]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
        </>
      );
    case "module":
      return (
        <>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.86, 1.4, 1.12]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[-1.05 - spread, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.68, 18]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[1.05 + spread, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.68, 18]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[0, 0.64 + spread * 0.65, 0]} castShadow>
            <boxGeometry args={[1.25, 0.1, 0.3]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.35} />
          </mesh>
        </>
      );
    case "tank":
      return (
        <>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.84, 0.84, 2.25, 34]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 0.85 + spread * 0.6, 0]} castShadow>
            <torusGeometry args={[0.74, 0.08, 16, 36]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
          <mesh position={[1.02 + spread, -0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.8, 16]} />
            <meshStandardMaterial color={product.model.accent} emissive={product.model.accent} emissiveIntensity={0.45} />
          </mesh>
        </>
      );
    default:
      return (
        <>
          <mesh castShadow>
            <cylinderGeometry args={[0.7, 0.8, 2.3, 34]} />
            <meshPhysicalMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 1.15 + spread, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.4, 16]} />
            <meshStandardMaterial {...accentMaterialProps} />
          </mesh>
        </>
      );
  }
}

function ProductHotspotNodes({
  product,
  active,
  hoveredHotspotId,
  selectedHotspotId,
  hoverRef,
  onSelectHotspot,
}: {
  product: ProductDefinition;
  active: boolean;
  hoveredHotspotId: string | null;
  selectedHotspotId: string | null;
  hoverRef: React.MutableRefObject<string | null>;
  onSelectHotspot: (hotspotId: string | null) => void;
}) {
  if (!active) return null;

  return product.hotspots.map((hotspot) => {
    const highlighted = hoveredHotspotId === hotspot.id || selectedHotspotId === hotspot.id;

    return (
      <group key={hotspot.id} position={hotspot.position}>
        <mesh
          onPointerEnter={(event: ThreeEvent<PointerEvent>) => {
            event.stopPropagation();
            hoverRef.current = hotspot.id;
          }}
          onPointerLeave={(event: ThreeEvent<PointerEvent>) => {
            event.stopPropagation();
            hoverRef.current = null;
          }}
          onClick={(event: ThreeEvent<MouseEvent>) => {
            event.stopPropagation();
            onSelectHotspot(hotspot.id);
          }}
        >
          <sphereGeometry args={[highlighted ? 0.16 : 0.12, 20, 20]} />
          <meshStandardMaterial
            color={highlighted ? product.model.accent : product.model.secondary}
            emissive={highlighted ? product.model.accent : product.model.secondary}
            emissiveIntensity={highlighted ? 2.8 : 1.6}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[highlighted ? 0.34 : 0.28, 20, 20]} />
          <meshBasicMaterial color={product.model.glow} transparent opacity={highlighted ? 0.18 : 0.08} />
        </mesh>
      </group>
    );
  });
}

export function ProductsEcosystem({
  scrollRef,
  hoverRef,
  rotationRef,
  selectedHotspotId,
  particleCount,
  viewState,
  onSelectHotspot,
}: Props) {
  const productRefs = useRef<(THREE.Group | null)[]>([]);
  const lineRefs = useRef<THREE.Object3D[]>([]);
  const particleRef = useRef<THREE.Points>(null);
  const visibleSet = useMemo(() => new Set(viewState.focusedProductIds), [viewState.focusedProductIds]);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 8 + Math.random() * 32;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 22;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = height;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [particleCount]);

  const edgePoints = useMemo(
    () =>
      PRODUCT_CONNECTIONS.map((connection) => {
        const from = getProductById(connection.from);
        const to = getProductById(connection.to);
        const start = new THREE.Vector3(...from.model.anchor);
        const end = new THREE.Vector3(...to.model.anchor);
        const midpoint = start.clone().add(end).multiplyScalar(0.5);
        midpoint.y += 2.2 + Math.abs(start.z - end.z) * 0.04;
        const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
        return curve.getPoints(curvePoints.length - 1);
      }),
    [],
  );

  useFrame(({ clock }, delta) => {
    const progress = scrollRef.current;
    const activeIndex = getProductIndex(progress);
    const activeProgress = getProductProgress(progress, activeIndex);
    const transitionProgress = THREE.MathUtils.smoothstep(progress, 0.88, 1);

    if (particleRef.current) {
      particleRef.current.rotation.y += delta * 0.018;
      particleRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.12;
      const material = particleRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.36 + transitionProgress * 0.14;
    }

    PRODUCTS.forEach((product, index) => {
      const group = productRefs.current[index];
      if (!group) return;

      const active = index === activeIndex;
      const visible = visibleSet.has(product.id) || visibleSet.size === 0;
      const highlighted = viewState.selectedIndustryId
        ? product.industries.includes(viewState.selectedIndustryId)
        : visible;

      const targetOpacity = visible ? (active ? 1 : 0.62) : 0.08;
      const targetScale =
        product.model.scale *
        (active ? 1.18 + viewState.zoomLevel * 0.15 : highlighted ? 0.92 : 0.75) *
        (1 - transitionProgress * 0.12);
      const offset = index - activeIndex;
      const [baseX, baseY, baseZ] = product.model.anchor;
      tmpVector.set(
        visible ? baseX - offset * 0.6 : baseX * 1.15,
        baseY + Math.sin(clock.elapsedTime * 0.6 + index) * 0.16,
        visible ? baseZ + Math.abs(offset) * 0.4 : baseZ - 2.8,
      );

      if (viewState.selectedIndustryId && highlighted) {
        tmpVector.x *= 0.78;
        tmpVector.z += 3.8;
      }

      group.position.lerp(tmpVector, delta * 1.8);
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.4);
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        clock.elapsedTime * 0.22 + (active ? rotationRef.current.y : 0),
        delta * 2.4,
      );
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        (active ? rotationRef.current.x : 0) * 0.5 + Math.sin(clock.elapsedTime * 0.35 + index) * 0.08,
        delta * 2.4,
      );
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, active ? Math.sin(clock.elapsedTime * 0.5) * 0.06 : 0, delta * 2.1);

      group.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const material = object.material;
        const materials = Array.isArray(material) ? material : [material];
        materials.forEach((entry) => {
          if (!("opacity" in entry)) return;
          entry.transparent = true;
          entry.opacity = THREE.MathUtils.lerp(entry.opacity, targetOpacity, delta * 4);
          if ("emissiveIntensity" in entry) {
            entry.emissiveIntensity = THREE.MathUtils.lerp(
              entry.emissiveIntensity,
              active ? 1.4 : highlighted ? 0.5 : 0.12,
              delta * 3,
            );
          }
        });
      });

      const wireframe = group.getObjectByName(`${product.id}-wire`);
      if (wireframe instanceof THREE.Mesh) {
        const material = wireframe.material as THREE.MeshBasicMaterial;
        material.opacity = THREE.MathUtils.lerp(
          material.opacity,
          viewState.inspectionMode === "technical" && active ? 0.42 + activeProgress * 0.24 : 0.02,
          delta * 4,
        );
      }

      const materialsHalo = group.getObjectByName(`${product.id}-materials`);
      if (materialsHalo instanceof THREE.Mesh) {
        const material = materialsHalo.material as THREE.MeshBasicMaterial;
        material.opacity = THREE.MathUtils.lerp(
          material.opacity,
          viewState.inspectionMode === "materials" && active ? 0.28 : 0.04,
          delta * 4,
        );
      }
    });

    PRODUCT_CONNECTIONS.forEach((connection, index) => {
      const line = lineRefs.current[index];
      if (!line) return;

      const fromVisible = visibleSet.size === 0 || visibleSet.has(connection.from);
      const toVisible = visibleSet.size === 0 || visibleSet.has(connection.to);
      const active = connection.from === viewState.activeProductId || connection.to === viewState.activeProductId;
      const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        fromVisible && toVisible ? (active ? 0.76 : 0.22) : 0.04,
        delta * 3,
      );
      material.color.lerp(
        new THREE.Color(active ? "#7fe5ff" : connection.kind === "replacement" ? "#ff7b7b" : "#5affc0"),
        delta * 2.4,
      );
    });
  });

  return (
    <group>
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8feaff" size={0.12} sizeAttenuation transparent opacity={0.38} depthWrite={false} />
      </points>

      {PRODUCT_CONNECTIONS.map((connection, index) => (
        <Line
          key={`${connection.from}-${connection.to}`}
          ref={(node) => {
            if (node) {
              lineRefs.current[index] = node;
            }
          }}
          points={edgePoints[index]}
          color="#5affc0"
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}

      {PRODUCTS.map((product, index) => {
        const active = product.id === viewState.activeProductId;
        const hoveredHotspotId = hoverRef.current;
        return (
          <group
            key={product.id}
            ref={(node) => {
              productRefs.current[index] = node;
            }}
            position={product.model.anchor}
          >
            <ProductShell
              product={product}
              active={active}
              exploded={viewState.exploded && active}
              inspectionMode={viewState.inspectionMode}
            />

            <mesh name={`${product.id}-wire`}>
              <sphereGeometry args={[1.55, 20, 20]} />
              <meshBasicMaterial color={product.model.accent} wireframe transparent opacity={0.02} />
            </mesh>
            <mesh name={`${product.id}-materials`}>
              <icosahedronGeometry args={[1.85, 1]} />
              <meshBasicMaterial color={product.model.glow} transparent opacity={0.04} />
            </mesh>
            <mesh>
              <torusGeometry args={[1.65, 0.03, 16, 48]} />
              <meshBasicMaterial color={product.model.glow} transparent opacity={active ? 0.34 : 0.1} />
            </mesh>

            <ProductHotspotNodes
              product={product}
              active={active}
              hoveredHotspotId={hoveredHotspotId}
              selectedHotspotId={selectedHotspotId}
              hoverRef={hoverRef}
              onSelectHotspot={onSelectHotspot}
            />
          </group>
        );
      })}
    </group>
  );
}
