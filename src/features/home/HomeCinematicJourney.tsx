"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge, Button, Container, Heading, Text } from "@components/ui";
import { usePrefersReducedMotion } from "@hooks/useMediaQuery";
import type { HeroLocaleContent, HomeLocale } from "@knowledge/home";
import { cinematicScenes as kbCinematicScenes } from "@knowledge/home/cinematic-scenes";
import { useUIStore } from "@store/ui.store";
import { PostProcessing } from "@three/components/PostProcessing";
import { SceneEnvironment } from "@three/components/SceneEnvironment";
import { ThreeCanvas } from "@three/components/ThreeCanvas";
import {
  CleanSurfaceReveal,
  InspectionLightSweep,
  MicroDropletField,
  OviLogoReveal,
  PrecisionWaterDrop,
  PremiumFoamLayer,
  RealMediaPortal,
  TechnicalSteamVolume,
  WaterRippleSurface,
  WetIndustrialSurface,
} from "@three/ovi-dna";
import type { RealMediaItem } from "@three/ovi-dna";

interface HomeCinematicJourneyProps {
  hero: HeroLocaleContent;
  locale?: HomeLocale;
}

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

type FlatCinematicScene = { id: string; number: string; title: string; tagline: string };

function buildFlatScenes(locale: HomeLocale): FlatCinematicScene[] {
  return kbCinematicScenes.map((scene) => ({
    id: scene.sceneId,
    number: scene.number,
    title: scene.locales[locale].title,
    tagline: scene.locales[locale].tagline,
  }));
}

function sceneWeight(progress: number, index: number, total: number): number {
  const distance = Math.abs(progress * (total - 1) - index);
  return Math.max(0, 1 - distance);
}

function CameraController({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion: boolean;
}) {
  const lookAt = useRef({ x: 0, y: 0, z: 0 });

  const camPositions: [number, number, number][] = [
    [0, 2.2, 9],
    [0, 1, 5.8],
    [0, 0.6, 4.2],
    [2.4, 1.4, 5.4],
    [0, 1.1, 5.1],
    [-2.5, 1.2, 5.6],
    [0, 1.4, 7.2],
  ];

  const lookTargets: [number, number, number][] = [
    [0, -0.2, 0],
    [0, -0.4, 0],
    [0, 0.2, 0],
    [0, 0, -3],
    [0, 0, -1.8],
    [0, 0, -2.2],
    [0, 0.3, 1.2],
  ];

  useFrame(({ camera }) => {
    if (reducedMotion) {
      camera.position.lerp(new THREE.Vector3(0, 1.1, 6.4), 0.06);
      lookAt.current.x += (0 - lookAt.current.x) * 0.06;
      lookAt.current.y += (0 - lookAt.current.y) * 0.06;
      lookAt.current.z += (-1.6 - lookAt.current.z) * 0.06;
      camera.lookAt(lookAt.current.x, lookAt.current.y, lookAt.current.z);
      return;
    }

    const n = camPositions.length - 1;
    const raw = Math.min(progress * n, n - 0.001);
    const from = Math.floor(raw);
    const t = raw - from;
    const to = from + 1;

    const [fx, fy, fz] = camPositions[from];
    const [tx, ty, tz] = camPositions[to];
    const [flx, fly, flz] = lookTargets[from];
    const [tlx, tly, tlz] = lookTargets[to];

    camera.position.x += (fx + (tx - fx) * t - camera.position.x) * 0.04;
    camera.position.y += (fy + (ty - fy) * t - camera.position.y) * 0.04;
    camera.position.z += (fz + (tz - fz) * t - camera.position.z) * 0.04;

    lookAt.current.x += (flx + (tlx - flx) * t - lookAt.current.x) * 0.04;
    lookAt.current.y += (fly + (tly - fly) * t - lookAt.current.y) * 0.04;
    lookAt.current.z += (flz + (tlz - flz) * t - lookAt.current.z) * 0.04;
    camera.lookAt(lookAt.current.x, lookAt.current.y, lookAt.current.z);
  });

  return null;
}

function CinematicLighting({ progress }: { progress: number }) {
  const keyLightRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    if (!keyLightRef.current) return;
    keyLightRef.current.intensity = 3.2 + progress * 2.2;
    keyLightRef.current.color.set(progress > 0.35 ? "#5cd4ff" : "#38b8f0");
  });

  return (
    <>
      <spotLight
        ref={keyLightRef}
        position={[0, 10, 3]}
        angle={0.32}
        penumbra={0.95}
        intensity={3.2}
        color="#38b8f0"
        castShadow={false}
      />
      {/* Deep ambient fill — heavier blue for industrial depth */}
      <pointLight position={[0, -1.5, 0]} intensity={1.1} color="#0d2e4e" distance={14} />
      {/* Left edge — OVI cyan */}
      <pointLight position={[5, 2.8, -2]} intensity={1.6} color="#00c4ff" distance={20} />
      {/* Right edge — bio-green accent */}
      <pointLight position={[-4, 2.4, -2]} intensity={1.3} color="#00ff85" distance={18} />
      {/* Deep background fill */}
      <pointLight position={[0, 1.8, -10]} intensity={1.4} color="#ffffff" distance={26} />
      {/* Floor shimmer — wet surface */}
      <pointLight position={[0, -1.0, -2.5]} intensity={0.7} color="#29b5e8" distance={8} />
    </>
  );
}

function SceneAAnnotations({ weight }: { weight: number }) {
  if (weight < 0.05) return null;

  return (
    <group position={[0, 1.2, -2.95]}>
      <Html transform position={[-2.8, 0.8, 0.2]}>
        <div className="w-44 rounded-md border border-[rgba(0,196,255,0.35)] bg-[rgba(4,15,24,0.74)] p-2 text-[10px] uppercase">
          <div className="font-semibold text-[var(--color-brand-primary)]">Contaminación</div>
          <div className="mt-1 text-white">Grasa adherida en carrocería industrial</div>
        </div>
      </Html>
      <Html transform position={[0, 1.2, 0.2]}>
        <div className="w-44 rounded-md border border-[rgba(0,255,133,0.35)] bg-[rgba(4,15,24,0.74)] p-2 text-[10px] uppercase">
          <div className="font-semibold text-[var(--color-brand-accent)]">Zona afectada</div>
          <div className="mt-1 text-white">Panel frontal · riesgo operativo</div>
        </div>
      </Html>
      <Html transform position={[2.8, 0.9, 0.2]}>
        <div className="w-44 rounded-md border border-[rgba(255,255,255,0.35)] bg-[rgba(4,15,24,0.74)] p-2 text-[10px] uppercase">
          <div className="font-semibold text-white">Solución OVI</div>
          <div className="mt-1 text-white">Inspección + protocolo técnico de limpieza</div>
        </div>
      </Html>
    </group>
  );
}

function SceneCTransformationLabel({ weight }: { weight: number }) {
  if (weight < 0.05) return null;

  return (
    <Html transform position={[0, 1.55, -2.2]}>
      <div className="w-80 rounded-lg border border-[rgba(0,196,255,0.4)] bg-[rgba(2,12,19,0.82)] p-3 text-[11px] uppercase">
        <div className="font-semibold text-[var(--color-brand-primary)]">Transformación OVI</div>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-white/90">
          <li>Superficie contaminada</li>
          <li>Luz de inspección</li>
          <li>Aplicación controlada de agua y espuma</li>
          <li>Retiro de contaminación</li>
          <li>Superficie restaurada</li>
          <li>Producto oficial OVI: Handsol</li>
        </ol>
      </div>
    </Html>
  );
}

function CinematicWorld({
  progress,
  reducedMotion,
  quality,
  mediaItems,
}: {
  progress: number;
  reducedMotion: boolean;
  quality: "high" | "medium" | "low";
  mediaItems: readonly RealMediaItem[];
}) {
  const scenes = buildFlatScenes("es");
  const total = scenes.length;
  const w = (index: number) => sceneWeight(progress, index, total);

  return (
    <>
      <CameraController progress={progress} reducedMotion={reducedMotion} />
      <CinematicLighting progress={progress} />

      <WaterRippleSurface
        weight={w(0) + w(1) + w(2) * 0.6}
        reducedMotion={reducedMotion}
        quality={quality}
      />
      <MicroDropletField
        weight={w(0) * 0.9 + w(1) * 0.8 + w(2) * 0.7 + w(3) * 0.35}
        reducedMotion={reducedMotion}
        quality={quality}
      />

      <PrecisionWaterDrop weight={w(0)} reducedMotion={reducedMotion} intensity={1.2} />
      <PremiumFoamLayer weight={w(1)} reducedMotion={reducedMotion} />
      <CleanSurfaceReveal weight={w(1)} reducedMotion={reducedMotion} />

      <OviLogoReveal weight={w(2)} reducedMotion={reducedMotion} />

      <WetIndustrialSurface weight={w(3) + w(5) * 0.4} />
      <InspectionLightSweep weight={w(3) + w(5)} reducedMotion={reducedMotion} />
      <TechnicalSteamVolume
        weight={w(3) + w(5) * 0.9}
        quality={quality}
        reducedMotion={reducedMotion}
      />
      <SceneAAnnotations weight={w(3)} />

      <RealMediaPortal items={mediaItems} weight={w(4)} />
      <SceneCTransformationLabel weight={w(5)} />
    </>
  );
}

export function HomeCinematicJourney({ hero, locale = "es" }: HomeCinematicJourneyProps) {
  const journeyRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const threePerformanceLevel = useUIStore((state) => state.threePerformanceLevel);

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(Math.max(0, Math.min(1, value)));
  });

  useEffect(() => {
    setHasWebGL(supportsWebGL());
  }, []);

  const scenes = useMemo(() => buildFlatScenes(locale), [locale]);
  const activeIndex = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const activeScene = scenes[activeIndex];
  const mediaItems = useMemo(
    () =>
      [
        { id: "sector-transporte", title: "Transporte", kind: "foto", status: "pending" },
        { id: "sector-industria", title: "Industria", kind: "video", status: "pending" },
        { id: "sector-alimentos", title: "Alimentos", kind: "foto", status: "pending" },
        { id: "sector-institucional", title: "Institucional", kind: "foto", status: "pending" },
        { id: "sector-energia", title: "Energía", kind: "video", status: "pending" },
        { id: "sector-retail", title: "Retail", kind: "foto", status: "pending" },
        {
          id: "sector-infraestructura",
          title: "Infraestructura",
          kind: "video",
          status: "pending",
        },
      ] as const,
    [],
  );

  if (!hasWebGL) {
    return (
      <section className="relative min-h-screen bg-[#02060E]">
        <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center py-16 text-center">
          <Badge variant="brand" size="lg">
            {hero.badge}
          </Badge>
          <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
            {hero.title}
          </Heading>
          <Text size="lg" align="center" className="mx-auto mt-5 max-w-3xl text-balance">
            {hero.subtitle}
          </Text>
          <Image
            src="/brand/ovi-logo.svg"
            alt="OVI"
            width={320}
            height={135}
            className="mt-8 w-full max-w-[320px] object-contain opacity-90"
            priority
          />
          <Text
            size="sm"
            align="center"
            className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]"
          >
            Tu dispositivo usa una versión optimizada sin WebGL para mantener la experiencia
            accesible.
          </Text>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg">Iniciar la Experiencia</Button>
            <Link href="/descubre-tu-solucion">
              <Button variant="outline" size="lg">
                Resolver un desafío
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={journeyRef} className="relative h-[700vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <ThreeCanvas
            className="h-full w-full"
            forcePerformance={prefersReducedMotion ? "low" : undefined}
          >
            <color attach="background" args={["#02060E"]} />
            <fog attach="fog" args={["#02060E", 7, 26]} />
            <CinematicWorld
              progress={progress}
              reducedMotion={prefersReducedMotion}
              quality={threePerformanceLevel}
              mediaItems={mediaItems}
            />
            <SceneEnvironment preset="night" intensity={0.58} />
            {!prefersReducedMotion && <PostProcessing />}
          </ThreeCanvas>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,255,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(0,255,133,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,14,0.35)_0%,transparent_25%,transparent_75%,rgba(2,6,14,0.55)_100%)]" />

        <div className="absolute top-1/2 left-6 z-20 flex -translate-y-1/2 flex-col items-center gap-3">
          {scenes.map((scene, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={scene.id} className="flex items-center gap-2.5">
                <div
                  className={`h-px transition-all duration-700 ${isActive ? "w-8 bg-[var(--color-brand-primary)]" : "w-3 bg-[rgba(255,255,255,0.2)]"}`}
                />
                <div
                  className={`rounded-full transition-all duration-700 ${isActive ? "h-1.5 w-1.5 scale-150 bg-[var(--color-brand-primary)] shadow-[0_0_8px_var(--color-brand-primary)]" : "h-1 w-1 bg-[rgba(255,255,255,0.2)]"}`}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/2 right-6 z-20 -translate-y-1/2">
          <Text
            size="xs"
            className="font-mono tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase"
          >
            {activeScene?.number} / {String(scenes.length).padStart(2, "0")}
          </Text>
        </div>

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
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-5">
            <div className="glass pointer-events-auto rounded-2xl border border-[var(--color-border-default)] px-6 py-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <Text
                    size="xs"
                    className="tracking-[0.18em] text-[var(--color-brand-primary)] uppercase"
                  >
                    Escena {activeScene?.number}
                  </Text>
                  <Text weight="semibold" className="mt-0.5 text-[var(--color-text-primary)]">
                    {activeScene?.title}
                  </Text>
                  <Text size="sm" className="mt-1 text-[var(--color-text-secondary)]">
                    {activeScene?.tagline}
                  </Text>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
                  <Text size="xs" className="text-[var(--color-text-tertiary)]">
                    {Math.round(progress * 100)}%
                  </Text>
                  <div className="h-0.5 w-20 rounded-full bg-[var(--color-border-default)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all duration-300"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">Iniciar la Experiencia</Button>
              <Link href="/descubre-tu-solucion">
                <Button variant="outline" size="lg">
                  Resolver un desafío
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <ChevronDown className="h-5 w-5 animate-bounce text-[var(--color-text-tertiary)]" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
