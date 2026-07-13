"use client";

import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { ThreeEffects } from "@/three/effects";
import { ThreePerformance } from "@/three/performance";

export const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 48 }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 2, 3]} intensity={1} />
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial color="#3DD2FF" metalness={0.4} roughness={0.18} />
        </mesh>
      </Float>
      <Environment preset="city" />
      <ThreeEffects />
      <ThreePerformance />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
};
