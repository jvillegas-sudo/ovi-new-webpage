"use client";

/**
 * OVI — OVI MISSIONS
 * Experience Order 005
 *
 * Immersive control-center experience where each mission is a resolved
 * real-world OVI operation. Visitors enter a cinematic 8-scene journey
 * for each sector.
 *
 * ─── ARCHITECTURE ─────────────────────────────────────────────────────────────
 *   Phase 1 — Control Center:  Holographic wall with mission modules.
 *   Phase 2 — Mission Journey: Scroll-driven 8-scene narrative.
 *     Scene 1 — Contexto:       Where, what problem existed.
 *     Scene 2 — Exploración:    3D asset + camera movement.
 *     Scene 3 — El Problema:    Contamination visualization.
 *     Scene 4 — OVI AI:         AI analysis + risks.
 *     Scene 5 — Ingeniería:     Engineering strategy.
 *     Scene 6 — Ejecución:      Water/foam/steam animation.
 *     Scene 7 — Resultado:      Interactive before/after slider.
 *     Scene 8 — Panel:          Real data or marked placeholders.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { useRef, useState, useMemo, useCallback } from "react";
import type * as THREE from "three";
import type { LucideIcon } from "lucide-react";
import { useFrame } from "@react-three/fiber";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ArrowLeft,
  Bus,
  Factory,
  FlaskConical,
  HeartPulse,
  ShoppingBag,
  Trash2,
  Zap,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@utils/cn";
import { Button, Container, Heading, Text } from "@components/ui";
import { ThreeCanvas } from "@three/components/ThreeCanvas";
import { PostProcessing } from "@three/components/PostProcessing";
import { SceneEnvironment } from "@three/components/SceneEnvironment";
import { OalAssetPlaceholder } from "@lib/oal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MissionResult {
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
  readonly isPlaceholder?: boolean;
}

interface MissionData {
  readonly id: string;
  readonly number: string;
  readonly sector: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly accentColor: string;
  readonly title: string;
  readonly subtitle: string;
  readonly location: string;
  readonly contextProblem: string;
  readonly assetDescription: string;
  readonly contaminationTypes: readonly string[];
  readonly contaminationLevel: string;
  readonly aiAnalysis: string;
  readonly risks: readonly string[];
  readonly strategySteps: readonly string[];
  readonly protocol: string;
  readonly results: readonly MissionResult[];
}

// ─── Mission Registry ─────────────────────────────────────────────────────────

const MISSIONS: readonly MissionData[] = [
  {
    id: "transporte-publico",
    number: "001",
    sector: "Transporte Público",
    icon: Bus,
    color: "var(--color-brand-primary)",
    accentColor: "#00C4FF",
    title: "Flota de Buses Urbanos",
    subtitle: "Sistema de transporte público regional",
    location: "Centro de operaciones de flota — Región Metropolitana",
    contextProblem:
      "Una flota de 40 buses urbanos presentaba acumulación crítica de aceite, hollín y partículas de combustión en el tren motriz, chasis y cabinas. La imagen operativa estaba deteriorada y los ciclos de mantenimiento se extendían por falta de protocolos estandarizados de limpieza.",
    assetDescription: "Bus de transporte público",
    contaminationTypes: ["Aceite", "Hollín", "Polvo de frenos", "Partículas de combustión"],
    contaminationLevel: "Nivel 2 — Moderado",
    aiAnalysis:
      "OVI AI identificó tres vectores de contaminación crítica: incrustación de hidrocarburos en el motor, depósito de hollín en sistema de escape y acumulación de polvo metálico en ruedas y frenos. La falta de protocolo unificado generaba tiempos de lavado inconsistentes y desperdicio de insumos.",
    risks: [
      "Deterioro prematuro de componentes mecánicos",
      "Imagen operativa degradada ante usuarios",
      "Consumo excesivo de agua sin gestión responsable",
      "Incumplimiento de normativas ambientales de flota",
    ],
    strategySteps: [
      "Diagnóstico técnico por vehículo y clasificación por nivel de contaminación",
      "Diseño de protocolo de lavado diferenciado (motor, exterior, interior)",
      "Selección de agentes químicos biodegradables compatibles con acero y caucho",
      "Implementación de sistema de gestión de agua residual",
      "Estandarización del ciclo de limpieza para toda la flota",
    ],
    protocol: "Protocolo UT-2 — Flota Urbana",
    results: [
      { label: "Tiempo de ciclo promedio", value: "—", isPlaceholder: true },
      { label: "Reducción de consumo hídrico", value: "—", isPlaceholder: true },
      { label: "Vehículos intervenidos", value: "40", unit: "buses" },
      {
        label: "Productos biodegradables utilizados",
        value: "Desengrasante alcalino · Neutralizante · Protector de caucho",
      },
      { label: "Beneficio ambiental", value: "—", isPlaceholder: true },
    ],
  },
  {
    id: "recoleccion-residuos",
    number: "002",
    sector: "Recolección de Residuos",
    icon: Trash2,
    color: "var(--color-brand-accent)",
    accentColor: "#00FF85",
    title: "Camiones Recolectores",
    subtitle: "Empresa municipal de gestión de residuos",
    location: "Planta de gestión de residuos — Zona industrial",
    contextProblem:
      "Camiones compactadores de basura con tolvas hidráulicas presentaban acumulación severa de grasa industrial, residuos orgánicos fermentados y lodo en el sistema de compactación. El biofilm activo en tolvas representaba un riesgo sanitario y contaminación cruzada.",
    assetDescription: "Camión recolector compactador",
    contaminationTypes: ["Grasa industrial", "Residuos orgánicos", "Lodo", "Biofilm activo"],
    contaminationLevel: "Nivel 3 — Alto",
    aiAnalysis:
      "OVI AI detectó formación de biofilm en zonas de acumulación de humedad dentro de la tolva hidráulica. El análisis reveló que los ciclos de limpieza previos no llegaban a las superficies internas del sistema de compactación, dejando residuos fermentados activos que aceleraban la corrosión del metal.",
    risks: [
      "Riesgo sanitario por biofilm activo en tolvas",
      "Corrosión acelerada del sistema hidráulico",
      "Contaminación cruzada durante la operación",
      "Incumplimiento de protocolos sanitarios municipales",
    ],
    strategySteps: [
      "Mapeo de zonas críticas de acumulación en la tolva y sistema de compactación",
      "Pre-tratamiento con agente enzimático para degradar residuos orgánicos",
      "Aplicación de desengrasante alcalino a alta presión en sistema interno",
      "Tratamiento de biofilm con agente desinfectante biodegradable certificado",
      "Protocolización del ciclo de limpieza post-turno para mantener el estándar",
    ],
    protocol: "Protocolo HD-3 — Residuos Industriales",
    results: [
      { label: "Tiempo de intervención por vehículo", value: "4–6", unit: "horas" },
      { label: "Biofilm eliminado", value: "100", unit: "%" },
      { label: "Flota intervenida", value: "—", isPlaceholder: true },
      { label: "Ahorro operativo estimado", value: "—", isPlaceholder: true },
      {
        label: "Productos utilizados",
        value: "Enzimático biodegradable · Desengrasante HD · Desinfectante certificado",
      },
    ],
  },
  {
    id: "industria-pesada",
    number: "003",
    sector: "Industria Pesada",
    icon: Factory,
    color: "var(--color-brand-secondary)",
    accentColor: "#0047AB",
    title: "Planta de Manufactura",
    subtitle: "Línea de producción industrial continua",
    location: "Planta de manufactura — Parque industrial",
    contextProblem:
      "Una planta industrial con línea de producción continua presentaba incrustaciones minerales severas en tuberías, tanques y ductos. La acumulación de residuos de proceso generaba riesgo de contaminación del producto final y reducción progresiva del flujo en los sistemas internos.",
    assetDescription: "Planta de manufactura industrial",
    contaminationTypes: ["Incrustaciones minerales", "Residuos de proceso", "Aceite", "Óxido"],
    contaminationLevel: "Nivel 4 — Crítico",
    aiAnalysis:
      "OVI AI identificó incrustación de carbonato de calcio en tuberías de proceso con reducción de hasta un 35% del diámetro interno. El análisis de fluidos reveló contaminación cruzada entre líneas, con riesgo de afectar la calidad del producto. La corrosión activa en puntos de unión indicaba deterioro estructural incipiente.",
    risks: [
      "Contaminación del producto final en línea",
      "Reducción de eficiencia de flujo en tuberías",
      "Parada no planificada de la línea de producción",
      "Corrosión estructural en puntos de unión",
    ],
    strategySteps: [
      "Auditoría técnica completa de sistemas de tuberías, tanques y ductos",
      "Diseño de protocolo CIP (Clean In Place) adaptado a la línea",
      "Selección de descalcificante ácido controlado compatible con acero inoxidable",
      "Implementación por zonas para mantener producción durante la intervención",
      "Sistema de monitoreo post-limpieza con indicadores de flujo y calidad",
    ],
    protocol: "Protocolo PI-4 — Proceso Industrial",
    results: [
      { label: "Recuperación de diámetro interno", value: "—", isPlaceholder: true },
      { label: "Tiempo de intervención", value: "8–12", unit: "horas operativas" },
      { label: "Paradas de producción generadas", value: "0", unit: "(intervención por zonas)" },
      { label: "Ahorro operativo", value: "—", isPlaceholder: true },
      {
        label: "Productos utilizados",
        value: "Descalcificante ácido · Inhibidor de corrosión · Neutralizante CIP",
      },
    ],
  },
  {
    id: "hospitales",
    number: "004",
    sector: "Hospitales",
    icon: HeartPulse,
    color: "#E5F4FF",
    accentColor: "#B0E0FF",
    title: "Centro Hospitalario",
    subtitle: "Hospital de alta complejidad",
    location: "Área quirúrgica y UCI — Hospital regional",
    contextProblem:
      "Un centro hospitalario de alta complejidad presentaba formación de biofilm activo en superficies críticas de quirófanos y UCI. Los protocolos de limpieza convencionales no eliminaban completamente los patógenos resistentes, generando riesgo de infecciones nosocomiales.",
    assetDescription: "Infraestructura hospitalaria crítica",
    contaminationTypes: ["Biofilm activo", "Bacterias resistentes", "Contaminación cruzada"],
    contaminationLevel: "Nivel 5 — Máximo",
    aiAnalysis:
      "OVI AI procesó el patrón de contaminación y detectó formación persistente de biofilm en superficies porosas y uniones de equipamiento médico. El análisis indicó presencia de microorganismos con resistencia a desinfectantes convencionales, requiriendo una estrategia de eliminación en dos fases con validación microbiológica.",
    risks: [
      "Riesgo de infección nosocomial en pacientes críticos",
      "Diseminación de patógenos resistentes",
      "Incumplimiento de normativas sanitarias hospitalarias",
      "Riesgo de cierre de áreas críticas por autoridades de salud",
    ],
    strategySteps: [
      "Mapeo microbiológico completo de zonas críticas antes de intervención",
      "Protocolo de limpieza en dos fases: remoción mecánica + desinfección química",
      "Aplicación de agente desinfectante hospitalario con amplio espectro",
      "Validación microbiológica post-intervención con muestras certificadas",
      "Implementación de programa de limpieza preventiva con frecuencia definida",
    ],
    protocol: "Protocolo HS-5 — Hospitalario Crítico",
    results: [
      { label: "Reducción de carga microbiana", value: "—", isPlaceholder: true },
      { label: "Tiempo por zona crítica", value: "2–3", unit: "horas" },
      { label: "Validación microbiológica", value: "Requerida por protocolo" },
      { label: "Zonas intervenidas", value: "—", isPlaceholder: true },
      {
        label: "Productos utilizados",
        value: "Desinfectante hospitalario certificado · Agente de biofilm",
      },
    ],
  },
  {
    id: "energia",
    number: "005",
    sector: "Energía",
    icon: Zap,
    color: "#FFD700",
    accentColor: "#FFB800",
    title: "Infraestructura Energética",
    subtitle: "Sistema de refrigeración industrial",
    location: "Planta de generación — Torres de enfriamiento",
    contextProblem:
      "Torres de refrigeración e intercambiadores de calor presentaban sedimentación de lodo, depósitos minerales y corrosión activa. La reducción de eficiencia térmica generaba sobreconsumo energético y riesgo de falla operativa en temporadas de alta demanda.",
    assetDescription: "Torre de refrigeración industrial",
    contaminationTypes: ["Lodo", "Sedimentos minerales", "Corrosión activa", "Incrustaciones"],
    contaminationLevel: "Nivel 3 — Alto",
    aiAnalysis:
      "OVI AI analizó el patrón de sedimentación y determinó que los depósitos en intercambiadores de calor reducían la eficiencia térmica en un rango estimado crítico. La corrosión activa en puntos de unión de cobre y acero indicaba electrocorrosión galvánica que requería tratamiento específico con inhibidores.",
    risks: [
      "Reducción de eficiencia energética del sistema",
      "Falla operativa en temporadas de alta demanda",
      "Contaminación de acuíferos por lixiviado de sedimentos",
      "Corrosión estructural en intercambiadores de calor",
    ],
    strategySteps: [
      "Análisis de agua circulante para identificar composición de sedimentos",
      "Limpieza mecánica e hidráulica de torres y tuberías de distribución",
      "Tratamiento químico con inhibidor de corrosión específico para galvánica",
      "Aplicación de descalcificante controlado en intercambiadores",
      "Programa de tratamiento de agua continuo con monitoreo de parámetros",
    ],
    protocol: "Protocolo EI-3 — Energía Industrial",
    results: [
      { label: "Recuperación de eficiencia térmica", value: "—", isPlaceholder: true },
      { label: "Tiempo de intervención", value: "6–10", unit: "horas operativas" },
      { label: "Reducción de consumo energético", value: "—", isPlaceholder: true },
      { label: "Beneficio ambiental", value: "—", isPlaceholder: true },
      {
        label: "Productos utilizados",
        value: "Inhibidor de corrosión · Descalcificante industrial · Biocida de agua",
      },
    ],
  },
  {
    id: "retail",
    number: "006",
    sector: "Retail",
    icon: ShoppingBag,
    color: "var(--color-brand-accent)",
    accentColor: "#00FF85",
    title: "Centro Comercial",
    subtitle: "Piso y superficies de alto tráfico",
    location: "Centro comercial regional — Pisos y áreas comunes",
    contextProblem:
      "Un centro comercial de alto tráfico presentaba deterioro severo de pisos de granito y mármol, acumulación de suciedad incrustada en juntas, manchas de grasa en cocinas del food court y biofilm en baños. La imagen del establecimiento requería una intervención técnica integral.",
    assetDescription: "Superficie de piso comercial",
    contaminationTypes: ["Suciedad incrustada", "Grasa", "Biofilm", "Manchas minerales"],
    contaminationLevel: "Nivel 2 — Moderado",
    aiAnalysis:
      "OVI AI identificó cuatro tipos de contaminación diferenciada por zona: incrustación mineral en pisos de mármol, grasa animal acumulada en juntas del food court, biofilm en superficies húmedas de baños, y depósito de polvo metálico en escaleras mecánicas. Cada zona requería un agente específico para evitar daño en las superficies.",
    risks: [
      "Deterioro permanente de superficies de alto valor",
      "Riesgo sanitario por biofilm activo en baños",
      "Imagen degradada del establecimiento",
      "Resbalamiento en pisos con grasa acumulada",
    ],
    strategySteps: [
      "Diagnóstico por zona con clasificación de tipo de superficie y contaminación",
      "Selección de agentes químicos compatibles con cada material (mármol, granito, acero)",
      "Intervención en etapas para no interrumpir operación comercial",
      "Tratamiento de juntas con agente biofilm certificado",
      "Protocolo de mantenimiento preventivo semanal para mantener estándar",
    ],
    protocol: "Protocolo RC-2 — Retail Comercial",
    results: [
      { label: "Superficies recuperadas", value: "—", isPlaceholder: true },
      { label: "Tiempo de intervención", value: "—", isPlaceholder: true },
      { label: "Materiales sin daño superficial", value: "100", unit: "%" },
      { label: "Ahorro vs. reposición de pisos", value: "—", isPlaceholder: true },
      {
        label: "Productos utilizados",
        value: "Limpiador neutro de mármol · Desengrasante food-safe · Biofilm remover",
      },
    ],
  },
  {
    id: "plantas-alimentos",
    number: "007",
    sector: "Plantas de Alimentos",
    icon: FlaskConical,
    color: "#FF6B35",
    accentColor: "#FF8C5A",
    title: "Planta de Procesamiento",
    subtitle: "Línea de producción de alimentos",
    location: "Planta de alimentos — Línea de procesamiento y envasado",
    contextProblem:
      "Una planta de procesamiento de alimentos presentaba acumulación de grasa animal, biofilm en cintas transportadoras, incrustaciones en equipos de pasteurización y residuos de producto en zonas de envasado. El cumplimiento normativo alimentario requería intervención con productos food-safe certificados.",
    assetDescription: "Equipo de procesamiento de alimentos",
    contaminationTypes: ["Grasa animal", "Biofilm", "Residuos de proceso", "Incrustaciones"],
    contaminationLevel: "Nivel 3 — Alto (Normativa Alimentaria)",
    aiAnalysis:
      "OVI AI procesó el análisis de riesgo alimentario y detectó cuatro zonas críticas: cintas transportadoras con biofilm activo debajo de la banda, zona de pasteurización con incrustaciones de proteína coagulada, drenajes con acumulación de grasa animal y zona de envasado con residuos de producto. La normativa HACCP requería soluciones estrictamente food-safe.",
    risks: [
      "Contaminación del producto alimentario en línea",
      "Incumplimiento de normativa HACCP y FDA",
      "Biofilm activo con riesgo de contaminación cruzada",
      "Falla de auditoría sanitaria con cierre de planta",
    ],
    strategySteps: [
      "Análisis de riesgo HACCP para determinar zonas críticas de control",
      "Selección exclusiva de productos certificados food-safe (NSF/FDA compatibles)",
      "CIP (Clean In Place) para pasteurizador con agente ácido y alcalino alternado",
      "Tratamiento de biofilm en cintas con desinfectante no enjuagable certificado",
      "Validación de limpieza con test de superficies antes de reinicio de producción",
    ],
    protocol: "Protocolo FA-3 — Food Safety",
    results: [
      { label: "Biofilm eliminado en superficies de contacto", value: "100", unit: "%" },
      { label: "Tiempo de intervención", value: "—", isPlaceholder: true },
      { label: "Cumplimiento normativo", value: "HACCP · NSF · FDA Compatible" },
      { label: "Parada de producción generada", value: "—", isPlaceholder: true },
      {
        label: "Productos utilizados",
        value: "CIP ácido food-safe · CIP alcalino · Desinfectante NSF certificado",
      },
    ],
  },
] as const;

// ─── Scene Definitions ─────────────────────────────────────────────────────────

const MISSION_SCENES = [
  { id: "s1", number: "01", title: "CONTEXTO", tagline: "Dónde ocurre. Qué problema existía." },
  {
    id: "s2",
    number: "02",
    title: "EXPLORACIÓN",
    tagline: "El activo se revela. La cámara lo recorre.",
  },
  {
    id: "s3",
    number: "03",
    title: "EL PROBLEMA",
    tagline: "La contaminación se hace visible.",
  },
  { id: "s4", number: "04", title: "OVI AI ANALIZA", tagline: "El desafío. Los riesgos." },
  {
    id: "s5",
    number: "05",
    title: "OVI ENGINEERING",
    tagline: "La estrategia se diseña.",
  },
  {
    id: "s6",
    number: "06",
    title: "EJECUCIÓN",
    tagline: "Agua. Espuma. Vapor. Tecnología.",
  },
  {
    id: "s7",
    number: "07",
    title: "RESULTADO",
    tagline: "Mueve el deslizador para comparar.",
  },
  {
    id: "s8",
    number: "08",
    title: "PANEL DE RESULTADOS",
    tagline: "Datos reales. Impacto demostrado.",
  },
] as const;

// ─── Utility ──────────────────────────────────────────────────────────────────

function sceneWeight(progress: number, index: number, total: number): number {
  const distance = Math.abs(progress * (total - 1) - index);
  return Math.max(0, 1 - distance);
}

// ─── Three.js: Camera Controller ──────────────────────────────────────────────

function MissionCameraController({ progress }: { progress: number }) {
  const lookAt = useRef({ x: 0, y: 0, z: 0 });

  const positions: [number, number, number][] = useMemo(
    () => [
      [0, 1.8, 10.5], // 01 — context, wide establishing
      [3.5, 1.2, 6.2], // 02 — exploration side orbit
      [0, 0.6, 4.8], // 03 — close contamination
      [0, 2.8, 5.5], // 04 — OVI AI scan angle
      [-2.5, 1.6, 5.8], // 05 — engineering view
      [0, 1.5, 6.5], // 06 — execution overview
      [0, 1.0, 5.5], // 07 — result reveal
      [0, 2.5, 8.0], // 08 — final wide panel
    ],
    [],
  );

  const lookTargets: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [0, 0.2, 0],
      [0, 0, 0],
      [0, 0.4, 0],
      [0, 0.3, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0.2, 0],
    ],
    [],
  );

  useFrame(({ camera }) => {
    const n = positions.length - 1;
    const raw = Math.min(progress * n, n - 0.001);
    const from = Math.floor(raw);
    const t = raw - from;
    const to = Math.min(from + 1, n);

    const [fx, fy, fz] = positions[from];
    const [tx, ty, tz] = positions[to];
    camera.position.x += (fx + (tx - fx) * t - camera.position.x) * 0.032;
    camera.position.y += (fy + (ty - fy) * t - camera.position.y) * 0.032;
    camera.position.z += (fz + (tz - fz) * t - camera.position.z) * 0.032;

    const [flx, fly, flz] = lookTargets[from];
    const [tlx, tly, tlz] = lookTargets[to];
    const lx = flx + (tlx - flx) * t;
    const ly = fly + (tly - fly) * t;
    const lz = flz + (tlz - flz) * t;

    lookAt.current.x += (lx - lookAt.current.x) * 0.032;
    lookAt.current.y += (ly - lookAt.current.y) * 0.032;
    lookAt.current.z += (lz - lookAt.current.z) * 0.032;

    camera.lookAt(lookAt.current.x, lookAt.current.y, lookAt.current.z);
  });

  return null;
}

// ─── OAL: Mission → Asset ID mapping ─────────────────────────────────────────

const MISSION_TO_OAL_ID: Record<string, string> = {
  "transporte-publico": "OAL-TR-002",
  "recoleccion-residuos": "OAL-TR-001",
  "industria-pesada": "OAL-IN-002",
  "salud": "OAL-IN-001",
  "energia": "OAL-IN-002",
  "retail": "OAL-IN-004",
  "alimentos": "OAL-IN-003",
};

function getOalIdForMission(missionId: string): string {
  return MISSION_TO_OAL_ID[missionId] ?? "OAL-IN-001";
}

// ─── Three.js: Contamination Cloud ────────────────────────────────────────────

function ContaminationCloud({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 650;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 5.5;
      pos[i3 + 1] = (Math.random() - 0.5) * 2.2;
      pos[i3 + 2] = (Math.random() - 0.5) * 2.6;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.022;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.48;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4A2A08" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

// ─── Three.js: Holographic Scan ───────────────────────────────────────────────

function HolographicScan({ weight }: { weight: number }) {
  const RING_COUNT = 8;
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const sweepRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.34 + i * (1 / RING_COUNT)) % 1;
      mesh.scale.setScalar(0.26 + phase * 7.2);
      (mesh.material as THREE.MeshStandardMaterial).opacity =
        weight * Math.max(0, 0.62 - phase * 0.62) * 0.65;
    });
    if (sweepRef.current) {
      sweepRef.current.position.y = -1.5 + ((t * 0.36) % 1) * 4.0;
      (sweepRef.current.material as THREE.MeshStandardMaterial).opacity = weight * 0.15;
    }
  });

  return (
    <group>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
          >
            <ringGeometry args={[0.94, 1.0, 80]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00FF85" : "#00C4FF"}
              emissive={i % 2 === 0 ? "#00FF85" : "#00C4FF"}
              emissiveIntensity={2.2}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <mesh ref={sweepRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#00FF85"
          emissive="#00FF85"
          emissiveIntensity={1.2}
          transparent
          opacity={0}
          depthWrite={false}
          side={2}
        />
      </mesh>
    </group>
  );
}

// ─── Three.js: Water Cleaning ─────────────────────────────────────────────────

function WaterCleaningEffect({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 520;
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 5.8;
      positions[i3 + 1] = 3.2 + Math.random() * 2.8;
      positions[i3 + 2] = (Math.random() - 0.5) * 3.2;
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = -(0.015 + Math.random() * 0.015);
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current?.geometry.attributes.position) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const dt = Math.min(delta * 60, 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3] * dt;
      positions[i3 + 1] += velocities[i3 + 1] * dt;
      positions[i3 + 2] += velocities[i3 + 2] * dt;
      if (positions[i3 + 1] < -1.5) {
        positions[i3] = (Math.random() - 0.5) * 5.8;
        positions[i3 + 1] = 3.2;
        positions[i3 + 2] = (Math.random() - 0.5) * 3.2;
      }
    }
    attr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.7;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#90DCFF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

function FoamEffect({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 340;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 5.0;
      pos[i3 + 1] = -1.0 + Math.random() * 0.85;
      pos[i3 + 2] = (Math.random() - 0.5) * 2.4;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.48) * 0.07;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.36;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.09} color="#E7F7FF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

function VaporEffect({ weight }: { weight: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 280;
  const { positions, drift } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const drift = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 4.5;
      positions[i3 + 1] = -0.7 + Math.random() * 2.2;
      positions[i3 + 2] = (Math.random() - 0.5) * 2.2;
      drift[i3] = (Math.random() - 0.5) * 0.0022;
      drift[i3 + 1] = 0.0038 + Math.random() * 0.006;
      drift[i3 + 2] = (Math.random() - 0.5) * 0.0014;
    }
    return { positions, drift };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current?.geometry.attributes.position) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const dt = Math.min(delta * 60, 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += drift[i3] * dt;
      positions[i3 + 1] += drift[i3 + 1] * dt;
      positions[i3 + 2] += drift[i3 + 2] * dt;
      if (positions[i3 + 1] > 2.0) {
        positions[i3] = (Math.random() - 0.5) * 4.5;
        positions[i3 + 1] = -0.7;
        positions[i3 + 2] = (Math.random() - 0.5) * 2.2;
      }
    }
    attr.needsUpdate = true;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = weight * 0.22;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.11} color="#BFEAFF" transparent opacity={0} depthWrite={false} />
    </points>
  );
}

// ─── Three.js: Ambient Particles ──────────────────────────────────────────────

function AmbientParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 6.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 3.0;
      const i3 = i * 3;
      pos[i3] = Math.cos(theta) * r;
      pos[i3 + 1] = phi;
      pos[i3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * (0.025 + progress * 0.035);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00C4FF" transparent opacity={0.18} depthWrite={false} />
    </points>
  );
}

// ─── Three.js: Mission World ───────────────────────────────────────────────────

function MissionWorld({ progress, mission }: { progress: number; mission: MissionData }) {
  const N = 8;
  const w = (index: number) => sceneWeight(progress, index, N);

  const w3 = w(2); // contamination scene
  const w4 = w(3); // OVI AI scan
  const w7 = w(6); // transformation/cleaning

  const contaminationWeight = Math.max(
    0,
    Math.min(1, (w3 + w(4) * 0.65 + w(5) * 0.45 + w(3) * 0.35) * 1.25) * (1 - w7 * 1.1),
  );

  const assetWeight = Math.min(1, w(0) + w(1) + w3 + w(3) + w(4) + w(5) + w7 + w(7));

  // OAL asset ID based on current mission
  const oalId = getOalIdForMission(mission.id);

  return (
    <>
      <MissionCameraController progress={progress} />
      <AmbientParticles progress={progress} />
      {/* OAL Asset placeholder — replaces geometric primitives */}
      <OalAssetPlaceholder
        assetId={oalId}
        weight={Math.min(1, assetWeight)}
        label={mission.assetDescription}
      />
      <ContaminationCloud weight={contaminationWeight} />
      <HolographicScan weight={w4} />
      <WaterCleaningEffect weight={w7} />
      <FoamEffect weight={w7} />
      <VaporEffect weight={w7} />
      <pointLight position={[0, 3.5, 3]} intensity={w4 * 3.5} color="#00FF85" distance={14} />
      <pointLight position={[-1, 2, 4]} intensity={w7 * 2.5} color="#90DCFF" distance={12} />
    </>
  );
}

// ─── Overlay: Scene 1 — Context ───────────────────────────────────────────────

function ContextOverlay({ visible, mission }: { visible: boolean; mission: MissionData }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute bottom-20 left-1/2 z-20 w-full max-w-xl -translate-x-1/2 px-4"
        >
          <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[rgba(2,6,18,0.88)] p-6 backdrop-blur-md">
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--color-brand-primary)]" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--color-brand-primary)]" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-brand-primary)]" />
            <div className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[var(--color-brand-primary)]" />

            <div className="mb-3 font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
              UBICACIÓN
            </div>
            <div className="mb-4 font-mono text-xs text-[var(--color-text-secondary)]">
              {mission.location}
            </div>

            <div className="mb-2 font-mono text-[9px] tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
              EL DESAFÍO
            </div>
            <div className="text-sm leading-relaxed text-[var(--color-text-primary)]">
              {mission.contextProblem}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Overlay: Scene 3 — Problem ───────────────────────────────────────────────

function ProblemOverlay({ visible, mission }: { visible: boolean; mission: MissionData }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 36 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="absolute top-1/2 right-8 z-20 w-68 -translate-y-1/2"
        >
          <div className="relative overflow-hidden rounded-lg border border-[rgba(255,107,53,0.28)] bg-[rgba(12,4,2,0.88)] p-5 backdrop-blur-sm">
            <div className="absolute top-0 left-0 h-3 w-3 border-t border-l border-[#FF6B35]" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-[#FF6B35]" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#FF6B35]" />
            <div className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-[#FF6B35]" />

            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#FF6B35] uppercase">
                CONTAMINACIÓN DETECTADA
              </span>
            </div>

            <div className="mb-3 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
              NIVEL
            </div>
            <div className="mb-4 font-mono text-sm font-semibold text-[#FF6B35]">
              {mission.contaminationLevel}
            </div>

            <div className="mb-2 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
              TIPOS DE SUCIEDAD
            </div>
            <div className="space-y-1.5">
              {mission.contaminationTypes.map((type) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-1 w-1 rounded-full bg-[#FF6B35]" />
                  <span className="font-mono text-xs text-[var(--color-text-primary)]">{type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Overlay: Scene 4 — OVI AI Analysis ───────────────────────────────────────

function AiAnalysisPanel({ visible, mission }: { visible: boolean; mission: MissionData }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
        >
          <div className="relative overflow-hidden rounded-xl border border-[rgba(0,255,133,0.22)] bg-[rgba(2,8,6,0.92)] p-7 backdrop-blur-md">
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-accent)] to-transparent"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--color-brand-accent)]" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--color-brand-accent)]" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-brand-accent)]" />
            <div className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[var(--color-brand-accent)]" />

            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-brand-accent)] uppercase">
                OVI AI · ANÁLISIS EN CURSO
              </span>
              <div className="flex gap-1.5">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand-accent)]" />
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <div className="mb-2 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                DIAGNÓSTICO
              </div>
              <div className="text-sm leading-relaxed text-[var(--color-text-primary)]">
                {mission.aiAnalysis}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="border-t border-[rgba(255,255,255,0.06)] pt-4"
            >
              <div className="mb-3 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                RIESGOS IDENTIFICADOS
              </div>
              <div className="space-y-2">
                {mission.risks.map((risk, i) => (
                  <motion.div
                    key={risk}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <div className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[#FF6B35]" />
                    <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                      {risk}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Overlay: Scene 5 — Engineering Strategy ──────────────────────────────────

function StrategyPanel({ visible, mission }: { visible: boolean; mission: MissionData }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute top-1/2 left-8 z-20 w-72 -translate-y-1/2"
        >
          <div className="relative overflow-hidden rounded-lg border border-[rgba(0,196,255,0.22)] bg-[rgba(2,6,18,0.9)] p-5 backdrop-blur-sm">
            <div className="mb-4">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-brand-primary)] uppercase">
                OVI ENGINEERING · ESTRATEGIA
              </span>
            </div>
            <div className="mb-4">
              <div className="font-mono text-[8px] tracking-[0.16em] text-[var(--color-text-tertiary)] uppercase">
                PROTOCOLO
              </div>
              <div className="mt-1 font-mono text-xs font-semibold text-[var(--color-brand-primary)]">
                {mission.protocol}
              </div>
            </div>
            <div className="space-y-3">
              {mission.strategySteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                  className="flex gap-3"
                >
                  <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[rgba(0,196,255,0.3)] font-mono text-[9px] text-[var(--color-brand-primary)]">
                    {i + 1}
                  </div>
                  <span className="text-xs leading-snug text-[var(--color-text-secondary)]">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Overlay: Scene 7 — Before/After Slider ───────────────────────────────────

function BeforeAfterSlider({ visible }: { visible: boolean }) {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, x)));
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-center"
          >
            <div className="font-mono text-[9px] tracking-[0.28em] text-[var(--color-brand-primary)] uppercase">
              RESULTADO · COMPARADOR INTERACTIVO
            </div>
            <div className="mt-1 text-xs text-[var(--color-text-tertiary)]">
              Mueve el deslizador para comparar antes y después
            </div>
          </motion.div>

          <div
            ref={containerRef}
            className="relative h-52 w-full max-w-xl overflow-hidden rounded-xl border border-[var(--glass-border)] select-none"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* AFTER (clean) — full width background */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#030D18]">
              <div className="text-center">
                <div className="font-mono text-[10px] tracking-widest text-[var(--color-brand-accent)] uppercase">
                  DESPUÉS
                </div>
                <div className="mt-2 font-mono text-2xl font-bold text-[var(--color-brand-accent)]">
                  IMPECABLE
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--color-text-secondary)]">
                  Listo para operar
                </div>
              </div>
              {/* Clean surface effect */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,133,0.08),transparent_60%)]" />
            </div>

            {/* BEFORE (contaminated) — clipped to slider position */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <div className="absolute inset-0 flex h-full w-[100vw] max-w-xl items-center justify-center bg-[#0D0500]">
                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-widest text-[#FF6B35] uppercase">
                    ANTES
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-[#FF6B35]">
                    CONTAMINADO
                  </div>
                  <div className="mt-1 font-mono text-xs text-[var(--color-text-secondary)]">
                    Riesgo operativo activo
                  </div>
                </div>
                {/* Contamination effect */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.12),transparent_60%)]" />
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Drag handle */}
            <div
              className="absolute top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white/80 bg-[rgba(5,5,8,0.9)] shadow-lg"
              style={{ left: `${sliderPos}%` }}
              onPointerDown={handlePointerDown}
            >
              <div className="flex items-center gap-0.5">
                <div className="h-3 w-px bg-white/60" />
                <div className="h-3 w-px bg-white/60" />
                <div className="h-3 w-px bg-white/60" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Overlay: Scene 8 — Results Panel ────────────────────────────────────────

function ResultsPanel({
  visible,
  mission,
  onOpenOviAi,
}: {
  visible: boolean;
  mission: MissionData;
  onOpenOviAi: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 z-20 flex items-center justify-center px-4"
        >
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-center"
            >
              <div className="font-mono text-[9px] tracking-[0.28em] text-[var(--color-brand-accent)] uppercase">
                MISIÓN COMPLETADA · {mission.number}
              </div>
              <div className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                {mission.title}
              </div>
            </motion.div>

            {/* Results grid */}
            <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[rgba(2,6,18,0.9)] p-6 backdrop-blur-md">
              <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--color-brand-accent)]" />
              <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--color-brand-accent)]" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[var(--color-brand-accent)]" />
              <div className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[var(--color-brand-accent)]" />

              <div className="mb-4 font-mono text-[9px] tracking-[0.2em] text-[var(--color-brand-accent)] uppercase">
                PANEL DE RESULTADOS
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {mission.results.map((result, i) => (
                  <motion.div
                    key={result.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className={cn(
                      "rounded-lg border p-3",
                      result.isPlaceholder
                        ? "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                        : "border-[rgba(0,255,133,0.12)] bg-[rgba(0,255,133,0.04)]",
                    )}
                  >
                    <div className="mb-1 font-mono text-[8px] tracking-[0.16em] text-[var(--color-text-tertiary)] uppercase">
                      {result.label}
                    </div>
                    {result.isPlaceholder ? (
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-xs text-[var(--color-text-tertiary)]">
                          — EN PROCESO DE DOCUMENTACIÓN
                        </div>
                      </div>
                    ) : (
                      <div className="font-mono text-sm font-semibold text-[var(--color-text-primary)]">
                        {result.value}
                        {result.unit && (
                          <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">
                            {result.unit}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Integration CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-3"
            >
              <Link href={`/solution-lab?mission=${mission.id}`}>
                <button className="flex items-center gap-2 rounded-full border border-[rgba(0,196,255,0.2)] bg-[rgba(0,196,255,0.06)] px-4 py-2 font-mono text-[10px] tracking-widest text-[var(--color-brand-primary)] uppercase transition-all duration-200 hover:border-[rgba(0,196,255,0.5)] hover:bg-[rgba(0,196,255,0.12)]">
                  <span>OVI Laboratorio</span>
                  <ExternalLink size={10} />
                </button>
              </Link>
              <button
                onClick={onOpenOviAi}
                className="flex items-center gap-2 rounded-full border border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.06)] px-4 py-2 font-mono text-[10px] tracking-widest text-[var(--color-brand-accent)] uppercase transition-all duration-200 hover:border-[rgba(0,255,133,0.5)] hover:bg-[rgba(0,255,133,0.12)]"
              >
                <span>Consultar OVI AI</span>
                <ExternalLink size={10} />
              </button>
              <Link href="/contact">
                <button className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-2 font-mono text-[10px] tracking-widest text-[var(--color-text-secondary)] uppercase transition-all duration-200 hover:border-[rgba(255,255,255,0.25)] hover:text-[var(--color-text-primary)]">
                  <span>Visita Técnica</span>
                  <ExternalLink size={10} />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mission Journey (8-Scene Scroll Experience) ──────────────────────────────

function MissionJourney({
  mission,
  onBack,
  onOpenOviAi,
}: {
  mission: MissionData;
  onBack: () => void;
  onOpenOviAi: () => void;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.max(0, Math.min(1, v)));
  });

  const N = MISSION_SCENES.length;
  const activeIndex = Math.min(N - 1, Math.floor(progress * N));
  const activeScene = MISSION_SCENES[activeIndex];

  const isScan = activeIndex === 3; // OVI AI
  const isProblem = activeIndex === 2; // contamination
  const isStrategy = activeIndex === 4; // engineering
  const isContext = activeIndex === 0; // context
  const isResult = activeIndex === 6; // before/after
  const isResultsPanel = activeIndex === 7; // results panel

  return (
    <section
      ref={containerRef}
      className="relative h-[800vh]"
      aria-label={`OVI Misiones — ${mission.title}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Three.js Canvas */}
        <div className="absolute inset-0">
          <ThreeCanvas className="h-full w-full">
            <color attach="background" args={["#020406"]} />
            <fog attach="fog" args={["#020406", 14, 32]} />
            <MissionWorld progress={progress} mission={mission} />
            <SceneEnvironment preset="night" intensity={0.45} />
            <PostProcessing />
          </ThreeCanvas>
        </div>

        {/* Atmospheric gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,196,255,0.05),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,4,6,0.4)_0%,transparent_22%,transparent_78%,rgba(2,4,6,0.65)_100%)]" />

        {/* Scan overlay — green tint during OVI AI scene */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isScan ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,255,133,0.05) 0%, transparent 65%)",
          }}
        />

        {/* Problem overlay — red/orange tint during contamination */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isProblem ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,107,53,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Back button */}
        <div className="absolute top-24 left-6 z-30">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.5)] px-3 py-1.5 text-[var(--color-text-secondary)] backdrop-blur-sm transition-all duration-200 hover:border-[rgba(255,255,255,0.25)] hover:text-[var(--color-text-primary)]"
            aria-label="Volver al Centro de Control"
          >
            <ArrowLeft size={14} />
            <span className="font-mono text-[9px] tracking-widest uppercase">Misiones</span>
          </button>
        </div>

        {/* Scene indicator — left rail */}
        <div className="absolute top-1/2 left-6 z-20 flex -translate-y-1/2 flex-col items-center gap-3">
          {MISSION_SCENES.map((scene, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={scene.id} className="flex items-center gap-2.5">
                <div
                  className={`h-px transition-all duration-700 ${
                    isActive
                      ? "w-8 bg-[var(--color-brand-primary)]"
                      : "w-3 bg-[rgba(255,255,255,0.12)]"
                  }`}
                />
                <div
                  className={`rounded-full transition-all duration-700 ${
                    isActive
                      ? "h-1.5 w-1.5 scale-150 bg-[var(--color-brand-primary)] shadow-[0_0_8px_var(--color-brand-primary)]"
                      : "h-1 w-1 bg-[rgba(255,255,255,0.12)]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Scene counter — right rail */}
        <div className="absolute top-1/2 right-6 z-20 -translate-y-1/2">
          <div className="font-mono text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
            {activeScene?.number} / 08
          </div>
        </div>

        {/* Top header */}
        <div className="absolute top-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene?.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-1 font-mono text-[8px] tracking-[0.3em] text-[var(--color-brand-primary)] uppercase">
                OVI MISSIONS · {mission.number} · {mission.sector}
              </div>
              <div className="text-base font-semibold tracking-wide text-[var(--color-text-primary)]">
                {activeScene?.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mission badge — top right */}
        <div className="absolute top-8 right-8 z-20">
          <div className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.48)] px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
              {mission.title}
            </span>
          </div>
        </div>

        {/* Bottom scene tagline */}
        <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene?.id + "-tag"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45 }}
              className={cn(
                isResult || isResultsPanel ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            >
              <div className="text-sm text-[var(--color-text-secondary)]">
                {activeScene?.tagline}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll hint — only on first scene */}
        <AnimatePresence>
          {progress < 0.05 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 text-[var(--color-text-tertiary)]"
              >
                <span className="font-mono text-[8px] tracking-[0.22em] uppercase">
                  Desplazarse para explorar
                </span>
                <ChevronDown size={14} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Conditional scene overlays ── */}
        <ContextOverlay visible={isContext} mission={mission} />
        <ProblemOverlay visible={isProblem} mission={mission} />
        <AiAnalysisPanel visible={isScan} mission={mission} />
        <StrategyPanel visible={isStrategy} mission={mission} />
        <BeforeAfterSlider visible={isResult} />
        <ResultsPanel visible={isResultsPanel} mission={mission} onOpenOviAi={onOpenOviAi} />
      </div>
    </section>
  );
}

// ─── Control Center — Mission Selection Hub ────────────────────────────────────

function MissionModule({
  mission,
  index,
  onSelect,
}: {
  mission: MissionData;
  index: number;
  onSelect: (mission: MissionData) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = mission.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
      onClick={() => onSelect(mission)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(mission);
        }
      }}
      aria-label={`Iniciar misión ${mission.number}: ${mission.title}`}
    >
      {/* Holographic border */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border bg-[rgba(2,6,18,0.82)] p-5 transition-all duration-500",
          isHovered
            ? "border-[rgba(0,196,255,0.4)] shadow-[0_0_30px_rgba(0,196,255,0.08)]"
            : "border-[rgba(255,255,255,0.07)]",
        )}
      >
        {/* Scan line on hover */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-primary)] to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Corner accents */}
        <div
          className={cn(
            "absolute top-0 left-0 h-3 w-3 border-t border-l transition-colors duration-300",
            isHovered ? "border-[var(--color-brand-primary)]" : "border-[rgba(255,255,255,0.1)]",
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-3 w-3 border-t border-r transition-colors duration-300",
            isHovered ? "border-[var(--color-brand-primary)]" : "border-[rgba(255,255,255,0.1)]",
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 h-3 w-3 border-b border-l transition-colors duration-300",
            isHovered ? "border-[var(--color-brand-primary)]" : "border-[rgba(255,255,255,0.1)]",
          )}
        />
        <div
          className={cn(
            "absolute right-0 bottom-0 h-3 w-3 border-r border-b transition-colors duration-300",
            isHovered ? "border-[var(--color-brand-primary)]" : "border-[rgba(255,255,255,0.1)]",
          )}
        />

        {/* Mission number */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              "font-mono text-[9px] tracking-[0.28em] uppercase transition-colors duration-300",
              isHovered ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-tertiary)]",
            )}
          >
            MISIÓN {mission.number}
          </span>
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              isHovered
                ? "scale-150 bg-[var(--color-brand-primary)] shadow-[0_0_8px_var(--color-brand-primary)]"
                : "bg-[rgba(255,255,255,0.12)]",
            )}
          />
        </div>

        {/* Icon + sector */}
        <div className="mb-4 flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 flex-none items-center justify-center rounded-lg border transition-all duration-300",
              isHovered
                ? "border-[rgba(0,196,255,0.35)] bg-[rgba(0,196,255,0.08)]"
                : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]",
            )}
          >
            <Icon
              size={18}
              className={cn(
                "transition-colors duration-300",
                isHovered
                  ? "text-[var(--color-brand-primary)]"
                  : "text-[var(--color-text-secondary)]",
              )}
            />
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-text-tertiary)] uppercase">
              {mission.sector}
            </div>
            <div className="mt-1 font-semibold text-[var(--color-text-primary)]">
              {mission.title}
            </div>
          </div>
        </div>

        {/* Brief problem */}
        <div className="mb-5 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {mission.contextProblem}
        </div>

        {/* Contamination tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {mission.contaminationTypes.slice(0, 3).map((type) => (
            <span
              key={type}
              className="rounded-full border border-[rgba(255,107,53,0.18)] bg-[rgba(255,107,53,0.06)] px-2 py-0.5 font-mono text-[8px] tracking-wide text-[#FF6B35]"
            >
              {type}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className={cn(
            "flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300",
            isHovered ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-tertiary)]",
          )}
        >
          <div
            className={cn(
              "h-px transition-all duration-500",
              isHovered ? "w-8 bg-[var(--color-brand-primary)]" : "w-4 bg-[rgba(255,255,255,0.12)]",
            )}
          />
          <span>INICIAR MISIÓN</span>
        </div>
      </div>
    </motion.div>
  );
}

function ControlCenter({ onSelectMission }: { onSelectMission: (mission: MissionData) => void }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,255,0.04),transparent_60%)]" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,196,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-brand-primary)]" />
              <span className="font-mono text-[9px] tracking-[0.32em] text-[var(--color-brand-primary)] uppercase">
                OVI MISSIONS · CENTRO DE CONTROL
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-brand-primary)]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <Heading as="h1" size="5xl" align="center" className="mt-2">
              Operaciones Reales.
              <br />
              <span className="text-[var(--color-brand-primary)]">Resultados Demostrados.</span>
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-2xl">
              Cada misión es una operación real resuelta por OVI. Entra virtualmente al escenario,
              explora el activo, observa el proceso y analiza los resultados.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-8 flex items-center justify-center gap-6"
          >
            {[
              { value: "7", label: "Sectores" },
              { value: "8", label: "Escenas por misión" },
              { value: "360°", label: "Experiencia inmersiva" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-[var(--color-brand-primary)]">
                  {stat.value}
                </div>
                <div className="mt-0.5 font-mono text-[9px] tracking-widest text-[var(--color-text-tertiary)] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </div>

      {/* Mission Grid */}
      <Container className="pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
          <span className="font-mono text-[9px] tracking-[0.26em] text-[var(--color-text-tertiary)] uppercase">
            SELECCIONA UNA MISIÓN
          </span>
          <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MISSIONS.map((mission, i) => (
            <MissionModule
              key={mission.id}
              mission={mission}
              index={i}
              onSelect={onSelectMission}
            />
          ))}
        </div>
      </Container>

      {/* Philosophy statement */}
      <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]">
        <Container className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-3 font-mono text-[9px] tracking-[0.28em] text-[var(--color-brand-primary)] uppercase">
              FILOSOFÍA OVI
            </div>
            <Heading as="h2" size="3xl" align="center">
              No mostramos testimonios.
              <br />
              <span className="text-[var(--color-text-secondary)]">Demostramos resultados.</span>
            </Heading>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-xl">
              OVI ya resolvió un problema muy parecido al tuyo. Explora las misiones y compruébalo.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button size="lg" variant="primary" rounded="full">
                Solicitar Visita Técnica
              </Button>
            </Link>
            <Link href="/ovi-ai">
              <Button size="lg" variant="ghost" rounded="full">
                Consultar OVI AI
              </Button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export function MissionsControlCenter() {
  const [selectedMission, setSelectedMission] = useState<MissionData | null>(null);

  const handleSelectMission = useCallback((mission: MissionData) => {
    setSelectedMission(mission);
    // Scroll to top when entering a mission
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedMission(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOpenOviAi = useCallback(() => {
    // Open OVI AI companion — dispatch event that OviAiCompanion listens for
    window.dispatchEvent(new CustomEvent("ovi-ai:open"));
  }, []);

  return (
    <AnimatePresence mode="wait">
      {selectedMission ? (
        <motion.div
          key={selectedMission.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MissionJourney
            mission={selectedMission}
            onBack={handleBack}
            onOpenOviAi={handleOpenOviAi}
          />
        </motion.div>
      ) : (
        <motion.div
          key="control-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ControlCenter onSelectMission={handleSelectMission} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
