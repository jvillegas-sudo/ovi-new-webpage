"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Bot, ChevronDown, Factory, Sparkles, Waves } from "lucide-react";
import { Badge, Button, Card, Container, Heading, Text } from "@components/ui";
import { PostProcessing } from "@three/components/PostProcessing";
import { SceneEnvironment } from "@three/components/SceneEnvironment";
import { ThreeCanvas } from "@three/components/ThreeCanvas";

interface HomeCinematicJourneyProps {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

const cinematicScenes = [
  {
    id: "scene-water",
    title: "Escena 01",
    label: "Partículas + Agua",
    detail: "Una gota activa el sistema y se convierte en flujo de operación.",
  },
  {
    id: "scene-logo",
    title: "Escena 02",
    label: "Construcción del logo",
    detail: "La energía se organiza y forma el símbolo de OVI.",
  },
  {
    id: "scene-industrial",
    title: "Escena 03",
    label: "Reveal industrial",
    detail: "Aparecen los entornos industriales donde la solución se ejecuta.",
  },
  {
    id: "scene-ai",
    title: "Escena 04",
    label: "OVI AI",
    detail: "La inteligencia operacional entra en escena como presencia activa.",
  },
  {
    id: "scene-ecosystem",
    title: "Escena 05",
    label: "Ecosistema completo",
    detail: "Todo converge en una plataforma integrada de ingeniería en limpieza.",
  },
] as const;

function getSceneWeight(progress: number, index: number): number {
  const distance = Math.abs(progress * cinematicScenes.length - index);
  return Math.max(0, 1 - distance);
}

function CinematicWorld({ progress }: { progress: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const aiCoreRef = useRef<THREE.Mesh>(null);
  const logoGroupRef = useRef<THREE.Group>(null);

  const waterWeight = getSceneWeight(progress, 0);
  const logoWeight = getSceneWeight(progress, 1);
  const industrialWeight = getSceneWeight(progress, 2);
  const aiWeight = getSceneWeight(progress, 3);
  const ecosystemWeight = getSceneWeight(progress, 4);

  const particles = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 2.8 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 2.8;
      const i3 = i * 3;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = spread;
      positions[i3 + 2] = Math.sin(angle) * radius;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    if (particlesRef.current) {
      particlesRef.current.rotation.y +=
        delta * (0.06 + waterWeight * 0.08 + ecosystemWeight * 0.04);
      particlesRef.current.position.y = Math.sin(elapsed * 0.4) * 0.25;
    }

    if (aiCoreRef.current) {
      aiCoreRef.current.rotation.y += delta * (0.4 + aiWeight * 1.4);
      aiCoreRef.current.position.y = 0.3 + Math.sin(elapsed * 1.8) * 0.18;
      const scale = 0.85 + aiWeight * 0.5 + Math.sin(elapsed * 2.3) * 0.06;
      aiCoreRef.current.scale.setScalar(scale);
    }

    if (logoGroupRef.current) {
      logoGroupRef.current.rotation.y += delta * (0.18 + logoWeight * 0.35);
      logoGroupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.08;
    }
  });

  return (
    <>
      <group position={[0, 0, -6]}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.03 + waterWeight * 0.02}
            color="#00C4FF"
            transparent
            opacity={0.2 + waterWeight * 0.5 + ecosystemWeight * 0.4}
            depthWrite={false}
          />
        </points>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <planeGeometry args={[20, 20, 64, 64]} />
        <meshStandardMaterial
          color="#0A2D46"
          metalness={0.15}
          roughness={0.2}
          transparent
          opacity={0.25 + waterWeight * 0.45}
        />
      </mesh>

      <group ref={logoGroupRef} position={[0, 0.5, 0]}>
        {[
          [-1.5, 0, 0],
          [-0.75, 0.45, 0],
          [0, 0, 0],
          [0.75, -0.45, 0],
          [1.5, 0, 0],
        ].map((position, index) => (
          <mesh key={index} position={position as [number, number, number]}>
            <boxGeometry args={[0.45, 0.45, 0.45]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#00C4FF" : "#00FF85"}
              emissive={index % 2 === 0 ? "#005E7A" : "#007A4C"}
              transparent
              opacity={logoWeight}
            />
          </mesh>
        ))}
      </group>

      <group position={[0, -0.15, -2.2]}>
        {[
          [-2.6, 0.35, 0.1, 0.9],
          [-1.4, 0.5, -0.3, 1.2],
          [0, 0.65, 0, 1.4],
          [1.3, 0.45, 0.2, 1.1],
          [2.4, 0.3, -0.2, 0.8],
        ].map(([x, y, z, h], index) => (
          <mesh key={index} position={[x, y, z]} scale={[0.8, h, 0.8]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#1B2A38"
              emissive="#0C1620"
              transparent
              opacity={industrialWeight}
            />
          </mesh>
        ))}
      </group>

      <group position={[0, 0.3, 1.1]}>
        <mesh ref={aiCoreRef}>
          <sphereGeometry args={[0.45, 48, 48]} />
          <meshStandardMaterial
            color="#00C4FF"
            emissive="#00A4D4"
            transparent
            opacity={0.2 + aiWeight * 0.8}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.03, 24, 160]} />
          <meshStandardMaterial color="#00FF85" emissive="#00AA58" transparent opacity={aiWeight} />
        </mesh>
      </group>

      <group position={[0, 0.5, 2.5]}>
        {[
          [-1.8, 0.4, 0],
          [-0.4, 1.1, -0.2],
          [0.6, 0.7, 0.2],
          [1.8, 0.9, -0.1],
        ].map((position, index) => (
          <mesh key={index} position={position as [number, number, number]}>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial
              color="#00FF85"
              emissive="#00A060"
              transparent
              opacity={ecosystemWeight}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export function HomeCinematicJourney({ hero }: HomeCinematicJourneyProps) {
  const journeyRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(Math.max(0, Math.min(1, value)));
  });

  const activeIndex = Math.min(
    cinematicScenes.length - 1,
    Math.floor(progress * cinematicScenes.length),
  );

  return (
    <section ref={journeyRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <ThreeCanvas className="h-full w-full">
            <color attach="background" args={["#010812"]} />
            <fog attach="fog" args={["#010812", 8, 24]} />
            <CinematicWorld progress={progress} />
            <SceneEnvironment preset="night" intensity={0.9} />
            <PostProcessing />
          </ThreeCanvas>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,196,255,0.12),transparent_56%),radial-gradient(circle_at_bottom,rgba(0,255,133,0.1),transparent_52%)]" />

        <Container className="relative z-10 flex h-full flex-col justify-between py-10">
          <div className="pointer-events-auto mx-auto max-w-4xl text-center">
            <Badge variant="brand" size="lg">
              {hero.badge}
            </Badge>
            <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
              {hero.title}
            </Heading>
            <Text size="lg" align="center" className="mx-auto mt-5 max-w-3xl text-balance">
              {hero.subtitle}
            </Text>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {cinematicScenes.map((scene, index) => {
                const selected = index === activeIndex;

                return (
                  <Card
                    key={scene.id}
                    variant="glass"
                    padding="sm"
                    className={`min-w-48 border transition-colors ${
                      selected
                        ? "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.16)]"
                        : "border-[var(--color-border-default)]"
                    }`}
                  >
                    <Text
                      size="xs"
                      className="tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase"
                    >
                      {scene.title}
                    </Text>
                    <Text weight="medium" className="mt-1 text-[var(--color-text-primary)]">
                      {scene.label}
                    </Text>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-4">
            <Card variant="glass" padding="md" className="pointer-events-auto">
              <div className="flex items-start gap-3">
                {activeIndex === 0 && (
                  <Waves className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
                )}
                {activeIndex === 1 && (
                  <Sparkles className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                )}
                {activeIndex === 2 && (
                  <Factory className="mt-1 h-5 w-5 text-[var(--color-brand-secondary)]" />
                )}
                {activeIndex === 3 && (
                  <Bot className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
                )}
                {activeIndex === 4 && (
                  <Sparkles className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                )}
                <div>
                  <Text
                    size="sm"
                    className="tracking-[0.12em] text-[var(--color-text-tertiary)] uppercase"
                  >
                    Journey activo
                  </Text>
                  <Text weight="semibold" className="mt-1">
                    {cinematicScenes[activeIndex]?.label}
                  </Text>
                  <Text size="sm" className="mt-1">
                    {cinematicScenes[activeIndex]?.detail}
                  </Text>
                </div>
              </div>
            </Card>

            <div className="pointer-events-auto flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Solicitar Diagnóstico</Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" size="lg">
                  Explorar Soluciones
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <ChevronDown className="h-6 w-6 animate-bounce text-[var(--color-text-tertiary)]" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
