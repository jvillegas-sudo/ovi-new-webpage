"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  INDUSTRY_ENVIRONMENTS,
  PRODUCTS_TRANSITION,
  getEnvironmentIndex,
  getEnvironmentProgress,
} from "@/scenes/industrial-applications/data/applications";
import type { IndustrialMousePos } from "@/scenes/industrial-applications/hooks/useIndustrialMouseParallax";
import { createAtmosphereMaterial } from "@/scenes/industrial-applications/shaders/AtmosphereMaterial";

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<IndustrialMousePos>;
};

type InstanceDescriptor = {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
};

const temporaryObject = new THREE.Object3D();

export function IndustrialEnvironment({ scrollRef, mouseRef }: Props) {
  const architectureRef = useRef<THREE.InstancedMesh>(null);
  const finsRef = useRef<THREE.InstancedMesh>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const environmentRefs = useRef<(THREE.Group | null)[]>([]);
  const hazardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const shaftRefs = useRef<(THREE.Mesh | null)[]>([]);
  const metricRefs = useRef<(THREE.Group | null)[]>([]);
  const productRefs = useRef<(THREE.Mesh | null)[]>([]);

  const atmosphereMaterial = useMemo(() => createAtmosphereMaterial(), []);
  const workingPrimary = useMemo(() => new THREE.Color(), []);
  const workingSecondary = useMemo(() => new THREE.Color(), []);
  const nextColor = useMemo(() => new THREE.Color(), []);
  const scratchScale = useMemo(() => new THREE.Vector3(), []);
  const ringScale = useMemo(() => new THREE.Vector3(), []);
  const productScale = useMemo(() => new THREE.Vector3(), []);
  const nextFloor = useMemo(() => new THREE.Color(), []);

  const architectureInstances = useMemo<InstanceDescriptor[]>(() => {
    return INDUSTRY_ENVIRONMENTS.flatMap((environment) => {
      const [x, y, z] = environment.anchor;
      return [
        {
          position: [x - 4.9, y + 0.8, z],
          scale: [0.22, 4.8, 0.26],
          color: environment.palette.primary,
        },
        {
          position: [x + 4.9, y + 0.8, z],
          scale: [0.22, 4.8, 0.26],
          color: environment.palette.primary,
        },
        {
          position: [x - 3.25, y + 1.9, z],
          scale: [0.18, 2.6, 0.18],
          color: environment.palette.secondary,
        },
        {
          position: [x + 3.25, y + 1.9, z],
          scale: [0.18, 2.6, 0.18],
          color: environment.palette.secondary,
        },
      ];
    });
  }, []);

  const finInstances = useMemo<InstanceDescriptor[]>(() => {
    return INDUSTRY_ENVIRONMENTS.flatMap((environment) => {
      const [x, y, z] = environment.anchor;
      return [
        {
          position: [x - 4.1, y + 0.2, z - 1.4],
          scale: [0.7, 1.6, 0.05],
          color: environment.palette.accent,
        },
        {
          position: [x + 4.1, y + 0.2, z + 1.4],
          scale: [0.7, 1.6, 0.05],
          color: environment.palette.accent,
        },
        {
          position: [x, y + 3.1, z],
          scale: [7.8, 0.08, 0.2],
          color: environment.palette.secondary,
        },
      ];
    });
  }, []);

  useLayoutEffect(() => {
    const architecture = architectureRef.current;
    if (architecture) {
      architectureInstances.forEach((instance, index) => {
        temporaryObject.position.set(...instance.position);
        temporaryObject.scale.set(...instance.scale);
        temporaryObject.updateMatrix();
        architecture.setMatrixAt(index, temporaryObject.matrix);
        architecture.setColorAt(index, new THREE.Color(instance.color));
      });
      architecture.instanceMatrix.needsUpdate = true;
      if (architecture.instanceColor) {
        architecture.instanceColor.needsUpdate = true;
      }
    }

    const fins = finsRef.current;
    if (fins) {
      finInstances.forEach((instance, index) => {
        temporaryObject.position.set(...instance.position);
        temporaryObject.scale.set(...instance.scale);
        temporaryObject.updateMatrix();
        fins.setMatrixAt(index, temporaryObject.matrix);
        fins.setColorAt(index, new THREE.Color(instance.color));
      });
      fins.instanceMatrix.needsUpdate = true;
      if (fins.instanceColor) {
        fins.instanceColor.needsUpdate = true;
      }
    }
  }, [architectureInstances, finInstances]);

  useEffect(() => {
    return () => {
      atmosphereMaterial.dispose();
    };
  }, [atmosphereMaterial]);

  useFrame(({ clock }, delta) => {
    const progress = scrollRef.current;
    const environmentIndex = getEnvironmentIndex(progress);
    const environmentProgress = getEnvironmentProgress(progress, environmentIndex);
    const current = INDUSTRY_ENVIRONMENTS[environmentIndex];
    const next =
      INDUSTRY_ENVIRONMENTS[
        Math.min(INDUSTRY_ENVIRONMENTS.length - 1, environmentIndex + 1)
      ] ?? current;

    workingPrimary.set(current.palette.primary).lerp(
      nextColor.set(next.palette.primary),
      environmentProgress,
    );
    workingSecondary.set(current.palette.secondary).lerp(
      nextColor.set(next.palette.secondary),
      environmentProgress,
    );

    (atmosphereMaterial.uniforms.uTime.value as number) = clock.elapsedTime;
    (atmosphereMaterial.uniforms.uReveal.value as number) =
      0.35 + environmentProgress * 0.55 + Math.abs(mouseRef.current.x) * 0.12;
    (atmosphereMaterial.uniforms.uPrimary.value as THREE.Color).copy(workingPrimary);
    (atmosphereMaterial.uniforms.uSecondary.value as THREE.Color).copy(workingSecondary);

    if (floorRef.current) {
      const material = floorRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(nextFloor.set(current.palette.floor), delta * 2.5);
      material.emissive.lerp(workingPrimary, delta * 1.4);
      material.emissiveIntensity = 0.18 + environmentProgress * 0.12;
    }

    INDUSTRY_ENVIRONMENTS.forEach((environment, index) => {
      const localProgress = getEnvironmentProgress(progress, index);
      const centered = 1 - Math.min(1, Math.abs(index - environmentIndex) * 0.4);
      const solutionProgress = THREE.MathUtils.smoothstep(localProgress, 0.18, 0.82);
      const hazardProgress = 1 - THREE.MathUtils.smoothstep(localProgress, 0.28, 0.92);
      const group = environmentRefs.current[index];
      const hazard = hazardRefs.current[index];
      const ring = ringRefs.current[index];
      const shaft = shaftRefs.current[index];
      const metrics = metricRefs.current[index];

      if (group) {
        group.position.x = THREE.MathUtils.lerp(
          group.position.x,
          environment.anchor[0] + (index % 2 === 0 ? -0.25 : 0.25) * mouseRef.current.x,
          delta * 1.6,
        );
        group.position.y = THREE.MathUtils.lerp(
          group.position.y,
          environment.anchor[1] + mouseRef.current.y * 0.08,
          delta * 1.6,
        );
      }

      if (hazard) {
        const material = hazard.material as THREE.MeshStandardMaterial;
        scratchScale.setScalar(0.85 + hazardProgress * 0.95);
        scratchScale.y = 0.3 + hazardProgress * 0.5;
        hazard.scale.lerp(scratchScale, delta * 3.2);
        material.emissive.set(environment.palette.danger);
        material.emissiveIntensity = 0.35 + hazardProgress * 0.9;
        material.opacity = 0.15 + hazardProgress * 0.5;
      }

      if (ring) {
        const material = ring.material as THREE.MeshStandardMaterial;
        const targetScale = 0.85 + solutionProgress * 2.3;
        ringScale.set(targetScale, targetScale, targetScale);
        ring.scale.lerp(ringScale, delta * 3);
        material.emissive.set(environment.palette.primary);
        material.emissiveIntensity = 0.3 + solutionProgress * 2.2;
        material.opacity = 0.18 + solutionProgress * 0.5;
      }

      if (shaft) {
        const material = shaft.material as THREE.MeshBasicMaterial;
        material.opacity = THREE.MathUtils.lerp(
          material.opacity,
          0.06 + centered * 0.22 + solutionProgress * 0.12,
          delta * 2.4,
        );
      }

      if (metrics) {
        metrics.rotation.z = THREE.MathUtils.lerp(
          metrics.rotation.z,
          mouseRef.current.x * 0.08,
          delta * 1.5,
        );
        metrics.position.y = THREE.MathUtils.lerp(
          metrics.position.y,
          1.15 + centered * 0.25,
          delta * 2,
        );
        metrics.children.forEach((child, childIndex) => {
          const mesh = child as THREE.Mesh;
          const bar = mesh.scale;
          const metric = environment.kpis[childIndex];
          const normalized = Math.min(1, Number(metric?.value ?? 0) / 50);
          bar.x = THREE.MathUtils.lerp(bar.x, 0.35 + normalized * solutionProgress * 2.1, delta * 3.4);
        });
      }
    });

    const transitionProgress = THREE.MathUtils.smoothstep(progress, 0.9, 1);
    productRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const offset = index - 1.5;
      mesh.position.x = THREE.MathUtils.lerp(
        mesh.position.x,
        offset * 1.25,
        delta * 2,
      );
      mesh.position.y = THREE.MathUtils.lerp(
        mesh.position.y,
        1.4 + Math.sin(clock.elapsedTime + index) * 0.15,
        delta * 2,
      );
      mesh.rotation.y += delta * (0.18 + index * 0.04);
      const targetScale = 0.001 + transitionProgress * (0.75 + index * 0.08);
      productScale.set(targetScale, targetScale, targetScale);
      mesh.scale.lerp(productScale, delta * 2.8);
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        transitionProgress * 0.85,
        delta * 3,
      );
      material.emissiveIntensity = transitionProgress * 1.6;
    });
  });

  return (
    <group>
      <color attach="background" args={["#05080f"]} />
      <fog attach="fog" args={["#05080f", 16, 82]} />

      <mesh position={[0, 1.4, -2]}>
        <boxGeometry args={[16, 7, 72]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>

      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, -2]} receiveShadow>
        <planeGeometry args={[14, 76, 1, 1]} />
        <meshStandardMaterial
          color="#0a111b"
          metalness={0.25}
          roughness={0.52}
          emissive="#122238"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, -2]}>
        <planeGeometry args={[2.4, 76, 1, 1]} />
        <meshStandardMaterial
          color="#101928"
          emissive="#1E3356"
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.22}
        />
      </mesh>

      <instancedMesh ref={architectureRef} args={[undefined, undefined, architectureInstances.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          vertexColors
          metalness={0.82}
          roughness={0.28}
          emissive="#153558"
          emissiveIntensity={0.35}
        />
      </instancedMesh>

      <instancedMesh ref={finsRef} args={[undefined, undefined, finInstances.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          vertexColors
          metalness={0.38}
          roughness={0.14}
          emissive="#295b8b"
          emissiveIntensity={0.28}
          transparent
          opacity={0.8}
        />
      </instancedMesh>

      {INDUSTRY_ENVIRONMENTS.map((environment, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const [x, y, z] = environment.anchor;
        return (
          <group
            key={environment.id}
            ref={(element) => {
              environmentRefs.current[index] = element;
            }}
            position={[x, y, z]}
          >
            <mesh position={[side * 2.4, 0.1, 0]}>
              <boxGeometry args={[1.6, 1.25, 1.85]} />
              <meshStandardMaterial
                color={environment.palette.secondary}
                emissive={environment.palette.primary}
                emissiveIntensity={0.5}
                metalness={0.72}
                roughness={0.24}
              />
            </mesh>

            <mesh position={[-side * 2.4, 0.35, -0.9]}>
              <boxGeometry args={[1.2, 1.7, 1.2]} />
              <meshStandardMaterial
                color={environment.palette.accent}
                emissive={environment.palette.secondary}
                emissiveIntensity={0.45}
                metalness={0.68}
                roughness={0.2}
              />
            </mesh>

            <mesh
              ref={(element) => {
                shaftRefs.current[index] = element;
              }}
              position={[0, 1.8, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[5.2, 5.2]} />
              <meshBasicMaterial
                color={environment.palette.primary}
                transparent
                opacity={0.14}
                side={THREE.DoubleSide}
              />
            </mesh>

            <mesh
              ref={(element) => {
                hazardRefs.current[index] = element;
              }}
              position={[0, -0.3, 0]}
            >
              <cylinderGeometry args={[0.95, 1.25, 0.55, 48]} />
              <meshStandardMaterial
                color={environment.palette.danger}
                emissive={environment.palette.danger}
                emissiveIntensity={0.8}
                transparent
                opacity={0.45}
                roughness={0.32}
                metalness={0.16}
              />
            </mesh>

            <mesh
              ref={(element) => {
                ringRefs.current[index] = element;
              }}
              position={[0, -0.05, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[1.25, 0.08, 18, 64]} />
              <meshStandardMaterial
                color={environment.palette.primary}
                emissive={environment.palette.primary}
                emissiveIntensity={1.8}
                transparent
                opacity={0.45}
                roughness={0.08}
                metalness={0.25}
              />
            </mesh>

            <group
              ref={(element) => {
                metricRefs.current[index] = element;
              }}
              position={[side * 2.6, 1.15, 0.75]}
            >
              {environment.kpis.map((metric, metricIndex) => (
                <mesh
                  key={metric.label}
                  position={[0, metricIndex * 0.34, 0]}
                  rotation={[0, 0, 0]}
                  scale={[0.2, 0.12, 0.12]}
                >
                  <boxGeometry args={[1, 1, 0.4]} />
                  <meshStandardMaterial
                    color={metricIndex === 2 ? environment.palette.accent : environment.palette.primary}
                    emissive={environment.palette.secondary}
                    emissiveIntensity={0.9}
                    metalness={0.22}
                    roughness={0.28}
                  />
                </mesh>
              ))}
            </group>
          </group>
        );
      })}

      {[0, 1, 2, 3].map((index) => (
        <mesh
          key={`${PRODUCTS_TRANSITION.eyebrow}-${index}`}
          ref={(element) => {
            productRefs.current[index] = element;
          }}
          position={[0, 1.4, -35]}
          scale={[0.001, 0.001, 0.001]}
        >
          {index % 2 === 0 ? (
            <boxGeometry args={[0.8 + index * 0.15, 0.5 + index * 0.08, 0.42]} />
          ) : (
            <cylinderGeometry args={[0.28 + index * 0.04, 0.38 + index * 0.04, 0.9, 32]} />
          )}
          <meshStandardMaterial
            color="#7FE5FF"
            emissive="#5AFFC0"
            emissiveIntensity={0}
            metalness={0.55}
            roughness={0.18}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}
