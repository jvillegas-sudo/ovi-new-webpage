"use client";

/**
 * Feature: OVI Engineering — Engineering Design Studio Experience
 *
 * Immersive engineering methodology presentation with:
 *   - Cinematic particle field background
 *   - Interactive 5-step engineering timeline with expandable panels
 *   - Sustainability metrics per phase
 *   - OVI AI + OVI OS integration sections
 *   - Full accessibility: ARIA, keyboard nav, reduced-motion support
 */

import * as React from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Target,
  Wrench,
  BarChart3,
  TrendingUp,
  Droplets,
  Leaf,
  Zap,
  Recycle,
  Brain,
  Monitor,
  ArrowRight,
  CheckCircle2,
  Activity,
  FlaskConical,
  Cpu,
  Settings,
  Database,
  Search,
  PenTool,
  Play,
  LineChart,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;

interface EngineeringPhase {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: IconComponent;
  color: string;
  borderColor: string;
  bgColor: string;
  objectives: string[];
  activities: string[];
  technology: string[];
  outcomes: string[];
  kpis: { label: string; value: string }[];
  sustainability: { icon: IconComponent; label: string; metric: string }[];
}

// ─── Engineering Phases Data ──────────────────────────────────────────────────

const PHASES: EngineeringPhase[] = [
  {
    id: "diagnostico",
    number: "01",
    title: "DIAGNÓSTICO",
    tagline: "Entender el problema antes de diseñar la solución.",
    description:
      "Analizamos la operación, la infraestructura, el tipo de suciedad, los procesos actuales y los objetivos del cliente.",
    icon: Search,
    color: "var(--color-brand-primary)",
    borderColor: "rgba(0,196,255,0.4)",
    bgColor: "rgba(0,196,255,0.08)",
    objectives: [
      "Mapear la operación completa del cliente",
      "Identificar tipos de contaminación y superficies",
      "Evaluar recursos, infraestructura y restricciones",
      "Definir objetivos medibles del proyecto",
    ],
    activities: [
      "Visita técnica de campo con checklist de diagnóstico",
      "Análisis de procesos actuales y puntos críticos",
      "Muestras de contaminantes para análisis de laboratorio",
      "Entrevistas con operadores y responsables de área",
      "Levantamiento fotográfico y mapeo de instalaciones",
    ],
    technology: [
      "Fichas de diagnóstico OVI OS digitales",
      "Análisis de composición de contaminantes",
      "Sensores de pH, conductividad y turbidez",
      "OVI AI para clasificación de desafíos operacionales",
    ],
    outcomes: [
      "Informe de diagnóstico técnico completo",
      "Mapa de riesgos operacionales",
      "Baseline de indicadores actuales",
      "Recomendaciones preliminares de intervención",
    ],
    kpis: [
      { label: "Precisión diagnóstica", value: "98.4%" },
      { label: "Tiempo de diagnóstico", value: "< 48h" },
      { label: "Puntos de análisis", value: "120+" },
    ],
    sustainability: [
      { icon: Droplets, label: "Agua línea base", metric: "Medición previa al inicio" },
      {
        icon: FlaskConical,
        label: "Químicos actuales",
        metric: "Inventario de insumos existentes",
      },
      { icon: Leaf, label: "Huella inicial", metric: "Cálculo CO₂ baseline" },
    ],
  },
  {
    id: "diseno",
    number: "02",
    title: "DISEÑO DE LA SOLUCIÓN",
    tagline: "Ingeniería personalizada para cada desafío único.",
    description:
      "Nuestros ingenieros diseñan un protocolo personalizado integrando productos, equipos, frecuencia, procesos y recursos.",
    icon: PenTool,
    color: "var(--color-brand-accent)",
    borderColor: "rgba(0,255,133,0.4)",
    bgColor: "rgba(0,255,133,0.08)",
    objectives: [
      "Diseñar protocolo técnico óptimo para la operación",
      "Seleccionar productos y equipos adecuados",
      "Calcular frecuencias, dosificaciones y recursos",
      "Estimar impacto ambiental y eficiencia esperada",
    ],
    activities: [
      "Diseño de protocolo por tipo de superficie e industria",
      "Selección de soluciones químicas biodegradables OVI",
      "Especificación de equipos y maquinaria requerida",
      "Cálculo de dosificaciones y consumos proyectados",
      "Planificación de recursos humanos y capacitación",
    ],
    technology: [
      "Biblioteca de protocolos OVI (128 activos)",
      "Motor de optimización OVI AI",
      "Simulación de consumos y eficiencia",
      "Modelado de impacto ambiental por protocolo",
    ],
    outcomes: [
      "Protocolo técnico de limpieza personalizado",
      "Especificación completa de productos y equipos",
      "Plan de implementación y cronograma",
      "Proyección de KPIs e indicadores ambientales",
    ],
    kpis: [
      { label: "Protocolos disponibles", value: "128" },
      { label: "Reducción química estimada", value: "35-45%" },
      { label: "Tiempo de diseño", value: "< 72h" },
    ],
    sustainability: [
      { icon: Droplets, label: "Agua proyectada", metric: "Optimización de consumo hídrico" },
      { icon: FlaskConical, label: "Productos BIO", metric: "100% soluciones biodegradables" },
      { icon: Zap, label: "Energía optimizada", metric: "Equipos de alta eficiencia" },
    ],
  },
  {
    id: "implementacion",
    number: "03",
    title: "IMPLEMENTACIÓN",
    tagline: "Ejecución precisa con estándares industriales.",
    description:
      "Ejecutamos la solución con personal capacitado, protocolos estandarizados y tecnología especializada.",
    icon: Play,
    color: "#a78bfa",
    borderColor: "rgba(167,139,250,0.4)",
    bgColor: "rgba(167,139,250,0.08)",
    objectives: [
      "Ejecutar el protocolo diseñado con precisión técnica",
      "Garantizar seguridad operacional y del personal",
      "Documentar cada intervención en tiempo real",
      "Cumplir estándares de calidad y normas vigentes",
    ],
    activities: [
      "Briefing técnico con el equipo de campo",
      "Preparación y verificación de insumos y equipos",
      "Ejecución del protocolo con supervisión en tiempo real",
      "Registro fotográfico y documental durante la intervención",
      "Verificación de resultados inmediatos post-servicio",
    ],
    technology: [
      "Equipos de limpieza industrial especializados",
      "App OVI OS para registro digital en campo",
      "EPP y protocolos de seguridad industrial",
      "Sensores de control de calidad en tiempo real",
    ],
    outcomes: [
      "Servicio ejecutado según protocolo diseñado",
      "Registro digital completo de la intervención",
      "Certificado de servicio firmado digitalmente",
      "Informe fotográfico antes/después",
    ],
    kpis: [
      { label: "Cumplimiento de protocolo", value: "99.1%" },
      { label: "Tiempo promedio de respuesta", value: "< 24h" },
      { label: "Incidentes de seguridad", value: "0" },
    ],
    sustainability: [
      {
        icon: Droplets,
        label: "Agua utilizada",
        metric: "Monitoreo de consumo real vs. proyectado",
      },
      { icon: Recycle, label: "Residuos tratados", metric: "Gestión de residuos industriales" },
      { icon: FlaskConical, label: "Dosis precisa", metric: "Sin desperdicio de insumos" },
    ],
  },
  {
    id: "medicion",
    number: "04",
    title: "MEDICIÓN",
    tagline: "Los datos son la base de la ingeniería real.",
    description:
      "Medimos indicadores operativos, productividad, consumo de agua, consumo químico, tiempos y calidad del servicio.",
    icon: LineChart,
    color: "#fb923c",
    borderColor: "rgba(251,146,60,0.4)",
    bgColor: "rgba(251,146,60,0.08)",
    objectives: [
      "Cuantificar los resultados operacionales reales",
      "Comparar contra baseline y proyecciones",
      "Detectar desviaciones y oportunidades de mejora",
      "Generar evidencia para reportes de cliente",
    ],
    activities: [
      "Recolección de datos operacionales post-servicio",
      "Análisis de consumos: agua, químicos, energía",
      "Medición de tiempos y productividad del equipo",
      "Evaluación de calidad del resultado final",
      "Generación de reportes KPI automáticos en OVI OS",
    ],
    technology: [
      "Dashboard analítico OVI OS en tiempo real",
      "Integración con sensores de consumo",
      "OVI AI para análisis de tendencias y anomalías",
      "Reportes automáticos con firma digital",
    ],
    outcomes: [
      "Reporte técnico de resultados con evidencia",
      "Dashboard de KPIs actualizado",
      "Comparativa proyectado vs. real",
      "Identificación de áreas de optimización",
    ],
    kpis: [
      { label: "KPIs monitoreados", value: "24+" },
      { label: "Precisión de medición", value: "99.8%" },
      { label: "Reportes automáticos", value: "2,891" },
    ],
    sustainability: [
      { icon: Droplets, label: "Agua ahorrada", metric: "kL reducidos vs. método anterior" },
      { icon: FlaskConical, label: "Reducción química", metric: "% de insumos optimizados" },
      { icon: Leaf, label: "Huella final", metric: "CO₂ equivalente reducido" },
    ],
  },
  {
    id: "optimizacion",
    number: "05",
    title: "OPTIMIZACIÓN CONTINUA",
    tagline: "La ingeniería no termina. Mejora cada ciclo.",
    description:
      "Utilizamos datos, experiencia e inteligencia artificial para mejorar continuamente la operación.",
    icon: RefreshCw,
    color: "#38bdf8",
    borderColor: "rgba(56,189,248,0.4)",
    bgColor: "rgba(56,189,248,0.08)",
    objectives: [
      "Mejorar continuamente el protocolo basado en datos reales",
      "Reducir costos operacionales ciclo a ciclo",
      "Incrementar eficiencia ambiental acumulada",
      "Adaptar la solución a cambios en la operación del cliente",
    ],
    activities: [
      "Revisión periódica de KPIs e indicadores acumulados",
      "Análisis de OVI AI sobre patrones y oportunidades",
      "Ajuste de dosificaciones, frecuencias y protocolos",
      "Capacitación continua del equipo de campo",
      "Reuniones de revisión técnica con el cliente",
    ],
    technology: [
      "OVI AI: análisis predictivo y recomendaciones",
      "OVI OS: trazabilidad histórica de todas las operaciones",
      "Modelos de optimización de consumos por tipo de instalación",
      "Integración con sistemas de gestión del cliente (ERP/CMMS)",
    ],
    outcomes: [
      "Protocolo optimizado basado en datos reales",
      "Reducción progresiva de costos operacionales",
      "Mejora continua de indicadores ambientales",
      "Informe anual de impacto y resultados acumulados",
    ],
    kpis: [
      { label: "Mejora promedio ciclo a ciclo", value: "+12%" },
      { label: "Reducción de costos acumulada", value: "28%" },
      { label: "Satisfacción de clientes", value: "4.9/5" },
    ],
    sustainability: [
      { icon: Droplets, label: "Agua ahorrada total", metric: "284 kL por ciclo de operación" },
      { icon: FlaskConical, label: "Reducción química", metric: "38% menos insumos vs. ciclo 1" },
      { icon: TrendingUp, label: "Vida útil de activos", metric: "+40% mayor vida útil promedio" },
    ],
  },
];

// ─── Particle Field ───────────────────────────────────────────────────────────

function ParticleField() {
  const shouldReduce = useReducedMotion();

  const particles = React.useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.35 + 0.05,
        color: i % 3 === 0 ? "#00c4ff" : i % 3 === 1 ? "#00ff85" : "#0047ab",
      })),
    [],
  );

  if (shouldReduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: p.color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 0.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Grid Lines ───────────────────────────────────────────────────────────────

function GridLines() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,196,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,196,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

// ─── Section Fade Wrapper ─────────────────────────────────────────────────────

function FadeSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduce ? 0 : 0.65,
        delay: shouldReduce ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Phase Card ───────────────────────────────────────────────────────────────

function PhaseCard({
  phase,
  index,
  isActive,
  onToggle,
}: {
  phase: EngineeringPhase;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const Icon = phase.icon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: shouldReduce ? 0 : index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: shouldReduce ? 0 : 0.6,
        delay: shouldReduce ? 0 : index * 0.1,
        ease: "easeOut",
      }}
    >
      <div
        className={cn(
          "glass relative overflow-hidden rounded-2xl transition-all duration-300",
          isActive ? "ring-1" : "hover:ring-1",
        )}
        style={{
          borderColor: phase.borderColor,
          boxShadow: isActive ? `0 0 40px ${phase.bgColor}, 0 0 80px ${phase.bgColor}` : undefined,
          ["--ring-color" as string]: phase.borderColor,
        }}
      >
        {/* Phase header — clickable */}
        <button
          className="w-full cursor-pointer px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ ["--tw-ring-color" as string]: phase.color }}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isActive}
          aria-controls={`phase-panel-${phase.id}`}
          id={`phase-header-${phase.id}`}
        >
          <div className="flex items-center gap-4">
            {/* Number badge */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black"
              style={{
                background: phase.bgColor,
                border: `1px solid ${phase.borderColor}`,
                color: phase.color,
              }}
              aria-hidden="true"
            >
              {phase.number}
            </div>

            {/* Icon + title */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Icon
                className="h-5 w-5 shrink-0"
                style={{ color: phase.color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: phase.color }}
                >
                  {phase.title}
                </p>
                <p className="mt-0.5 truncate text-sm text-[var(--color-text-secondary)]">
                  {phase.tagline}
                </p>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.25 }}
              className="shrink-0 text-[var(--color-text-tertiary)]"
              aria-hidden="true"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="mt-3 pl-16 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {phase.description}
          </p>
        </button>

        {/* Expanded engineering panel */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              id={`phase-panel-${phase.id}`}
              role="region"
              aria-labelledby={`phase-header-${phase.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className="mx-6 mb-6 rounded-xl p-5"
                style={{
                  background: phase.bgColor,
                  border: `1px solid ${phase.borderColor}`,
                }}
              >
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {/* Objectives */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Target
                        className="h-4 w-4"
                        style={{ color: phase.color }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: phase.color }}
                      >
                        Objetivos
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.objectives.map((obj) => (
                        <li
                          key={obj}
                          className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                        >
                          <ChevronRight
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: phase.color }}
                            aria-hidden="true"
                          />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Activities */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Wrench
                        className="h-4 w-4"
                        style={{ color: phase.color }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: phase.color }}
                      >
                        Actividades
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.activities.map((act) => (
                        <li
                          key={act}
                          className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                        >
                          <ChevronRight
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: phase.color }}
                            aria-hidden="true"
                          />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Cpu className="h-4 w-4" style={{ color: phase.color }} aria-hidden="true" />
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: phase.color }}
                      >
                        Tecnología
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.technology.map((tech) => (
                        <li
                          key={tech}
                          className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                        >
                          <ChevronRight
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: phase.color }}
                            aria-hidden="true"
                          />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Outcomes */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4"
                        style={{ color: phase.color }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: phase.color }}
                      >
                        Resultados
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.outcomes.map((out) => (
                        <li
                          key={out}
                          className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                        >
                          <ChevronRight
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: phase.color }}
                            aria-hidden="true"
                          />
                          {out}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* KPIs */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <BarChart3
                        className="h-4 w-4"
                        style={{ color: phase.color }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: phase.color }}
                      >
                        KPIs Clave
                      </span>
                    </div>
                    <div className="space-y-2">
                      {phase.kpis.map((kpi) => (
                        <div
                          key={kpi.label}
                          className="rounded-lg p-2.5"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            border: `1px solid ${phase.borderColor}`,
                          }}
                        >
                          <p className="text-[11px] text-[var(--color-text-tertiary)]">
                            {kpi.label}
                          </p>
                          <p className="mt-0.5 text-base font-bold" style={{ color: phase.color }}>
                            {kpi.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Leaf
                        className="h-4 w-4 text-[var(--color-brand-accent)]"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-bold tracking-widest text-[var(--color-brand-accent)] uppercase">
                        Impacto Ambiental
                      </span>
                    </div>
                    <div className="space-y-2">
                      {phase.sustainability.map((s) => {
                        const SIcon = s.icon;
                        return (
                          <div
                            key={s.label}
                            className="flex items-start gap-2 rounded-lg p-2.5"
                            style={{
                              background: "rgba(0,255,133,0.06)",
                              border: "1px solid rgba(0,255,133,0.2)",
                            }}
                          >
                            <SIcon
                              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]"
                              aria-hidden="true"
                            />
                            <div>
                              <p className="text-[11px] font-medium text-[var(--color-brand-accent)]">
                                {s.label}
                              </p>
                              <p className="text-[11px] text-[var(--color-text-tertiary)]">
                                {s.metric}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "284", unit: "kL", label: "Agua ahorrada / ciclo" },
  { value: "38", unit: "%", label: "Reducción de químicos" },
  { value: "128", unit: "", label: "Protocolos activos" },
  { value: "99.1", unit: "%", label: "Cumplimiento de servicio" },
];

function StatCounter({ value, unit, label }: { value: string; unit: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setDisplay(value);
      return;
    }
    const numeric = parseFloat(value.replace(/,/g, ""));
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const duration = 1600;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      if (value.includes(".")) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(String(Math.floor(current)));
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, shouldReduce]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-black text-[var(--color-brand-primary)] md:text-4xl">
        {display}
        <span className="text-xl">{unit}</span>
      </p>
      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{label}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EngineeringPage() {
  const [activePhase, setActivePhase] = React.useState<string | null>("diagnostico");

  const togglePhase = (id: string) => {
    setActivePhase((prev) => (prev === id ? null : id));
  };

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
        style={{ background: "var(--color-bg-base)" }}
      >
        <ParticleField />
        <GridLines />

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--color-brand-primary)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full opacity-8 blur-3xl"
          style={{ background: "var(--color-brand-accent)" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase"
              style={{
                background: "rgba(0,196,255,0.1)",
                border: "1px solid rgba(0,196,255,0.3)",
                color: "var(--color-brand-primary)",
              }}
            >
              Studio de Ingeniería
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="mt-6 leading-none font-black tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "var(--color-text-primary)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            OVI <span style={{ color: "var(--color-brand-primary)" }}>ENGINEERING</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg font-medium md:text-xl"
            style={{ color: "var(--color-brand-accent)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ingeniería en Limpieza aplicada a resultados.
          </motion.p>

          <motion.p
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Cada operación presenta desafíos únicos. Por eso diseñamos soluciones personalizadas que
            integran ingeniería, productos, protocolos, equipos, inteligencia artificial y
            tecnología para maximizar la eficiencia operativa y reducir el impacto ambiental.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--color-brand-primary)",
                color: "#000",
              }}
            >
              Solicitar Diagnóstico
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(0,196,255,0.1)",
                border: "1px solid rgba(0,196,255,0.3)",
                color: "var(--color-brand-primary)",
              }}
            >
              Hablar con un Ingeniero
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[var(--color-border-default)] pt-1.5">
            <div className="h-1.5 w-1 rounded-full bg-[var(--color-brand-primary)]" />
          </div>
        </motion.div>
      </section>

      {/* ── Philosophy Banner ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="philosophy-heading"
        style={{ background: "var(--color-bg-surface)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <FadeSection>
            <div
              className="relative overflow-hidden rounded-2xl px-8 py-10 text-center md:px-16"
              style={{
                background: "linear-gradient(135deg, rgba(0,196,255,0.08), rgba(0,71,171,0.12))",
                border: "1px solid rgba(0,196,255,0.2)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,196,255,0.3) 20px, rgba(0,196,255,0.3) 21px)",
                }}
              />
              <p
                id="philosophy-heading"
                className="relative text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-brand-primary)" }}
              >
                El Principio OVI
              </p>
              <p
                className="relative mt-4 text-2xl leading-snug font-black md:text-4xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                OVI no comienza con{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>productos</span>.
                <br />
                OVI comienza entendiendo el{" "}
                <span style={{ color: "var(--color-brand-accent)" }}>problema</span>.
              </p>
              <p
                className="relative mx-auto mt-4 max-w-2xl text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Cada instalación, cada industria y cada desafío operacional es distinto. Nuestra
                ingeniería empieza con escuchar, analizar y comprender antes de proponer cualquier
                solución.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="Indicadores de ingeniería OVI"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <FadeSection>
            <div
              className="grid grid-cols-2 gap-6 rounded-2xl p-8 md:grid-cols-4"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--color-border-subtle)",
                backdropFilter: "var(--glass-blur)",
              }}
            >
              {HERO_STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Engineering Method Timeline ────────────────────────────────────── */}
      <section aria-labelledby="method-heading" style={{ background: "var(--color-bg-surface)" }}>
        <div className="mx-auto max-w-4xl px-6 py-24">
          <FadeSection>
            <div className="mb-14 text-center">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase"
                style={{
                  background: "rgba(0,255,133,0.08)",
                  border: "1px solid rgba(0,255,133,0.25)",
                  color: "var(--color-brand-accent)",
                }}
              >
                Metodología
              </span>
              <h2
                id="method-heading"
                className="mt-4 text-3xl font-black md:text-5xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                El Método OVI Engineering
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Cinco fases de ingeniería que transforman un desafío operacional en una solución
                medible, sostenible y de mejora continua. Haz clic en cada etapa para explorar el
                detalle técnico.
              </p>
            </div>
          </FadeSection>

          {/* Vertical connector line */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-[29px] hidden w-px md:block"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-brand-primary), var(--color-brand-accent))",
                opacity: 0.3,
              }}
            />

            <div className="space-y-4" role="list" aria-label="Fases del método OVI Engineering">
              {PHASES.map((phase, index) => (
                <div key={phase.id} role="listitem">
                  <PhaseCard
                    phase={phase}
                    index={index}
                    isActive={activePhase === phase.id}
                    onToggle={() => togglePhase(phase.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OVI AI Connection ──────────────────────────────────────────────── */}
      <section aria-labelledby="ai-heading" style={{ background: "var(--color-bg-elevated)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeSection delay={0}>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase"
                style={{
                  background: "rgba(0,196,255,0.08)",
                  border: "1px solid rgba(0,196,255,0.25)",
                  color: "var(--color-brand-primary)",
                }}
              >
                Inteligencia Artificial
              </span>
              <h2
                id="ai-heading"
                className="mt-4 text-3xl font-black md:text-4xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                OVI AI en la
                <br />
                <span style={{ color: "var(--color-brand-primary)" }}>Ingeniería Operacional</span>
              </h2>
              <p
                className="mt-5 text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                OVI AI asiste a los ingenieros analizando la información operacional del cliente y
                sugiriendo protocolos optimizados, dosificaciones y combinaciones de productos según
                el tipo de industria, la infraestructura y los desafíos específicos.
              </p>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No reemplaza al ingeniero. Amplifica su capacidad de análisis con datos, patrones de
                operaciones anteriores y modelos de optimización ambiental.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Análisis de contexto operacional por industria",
                  "Recomendación de protocolos y productos",
                  "Estimación de consumos y eficiencia proyectada",
                  "Detección de patrones de mejora en operaciones históricas",
                  "Generación automática de informes técnicos",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-primary)]"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/ovi-ai"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(0,196,255,0.1)",
                  border: "1px solid rgba(0,196,255,0.3)",
                  color: "var(--color-brand-primary)",
                }}
              >
                Explorar OVI AI
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </FadeSection>

            <FadeSection delay={0.15}>
              <div
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: "rgba(0,196,255,0.05)",
                  border: "1px solid rgba(0,196,255,0.2)",
                }}
              >
                <Brain
                  className="mb-6 h-10 w-10 text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                <p
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--color-brand-primary)" }}
                >
                  Flujo OVI AI
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { step: "01", label: "Ingesta de datos operacionales del cliente" },
                    { step: "02", label: "Clasificación de desafío e industria" },
                    { step: "03", label: "Búsqueda en base de protocolos OVI" },
                    { step: "04", label: "Optimización por eficiencia y sostenibilidad" },
                    { step: "05", label: "Protocolo recomendado + informe técnico" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(0,196,255,0.15)",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <span
                        className="text-xs font-black"
                        style={{ color: "var(--color-brand-primary)" }}
                      >
                        {item.step}
                      </span>
                      <span className="flex-1 text-xs text-[var(--color-text-secondary)]">
                        {item.label}
                      </span>
                      <Activity
                        className="h-3.5 w-3.5 text-[var(--color-brand-primary)]"
                        style={{ opacity: 0.5 }}
                        aria-hidden="true"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── OVI OS Connection ──────────────────────────────────────────────── */}
      <section aria-labelledby="os-heading" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeSection delay={0.1} className="order-2 lg:order-1">
              <div
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: "rgba(0,255,133,0.04)",
                  border: "1px solid rgba(0,255,133,0.18)",
                }}
              >
                <Monitor
                  className="mb-6 h-10 w-10 text-[var(--color-brand-accent)]"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold tracking-widest text-[var(--color-brand-accent)] uppercase">
                  Módulos OVI OS
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { icon: Activity, label: "KPIs en tiempo real" },
                    { icon: CheckCircle2, label: "Cumplimiento SLA" },
                    { icon: BarChart3, label: "Analítica operacional" },
                    { icon: Settings, label: "Gestión de protocolos" },
                    { icon: Database, label: "Trazabilidad completa" },
                    { icon: TrendingUp, label: "Mejora continua" },
                    { icon: Leaf, label: "Indicadores ambientales" },
                    { icon: FlaskConical, label: "Gestión de productos" },
                  ].map((item) => {
                    const IIcon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                        style={{
                          background: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(0,255,133,0.12)",
                        }}
                      >
                        <IIcon
                          className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-accent)]"
                          aria-hidden="true"
                        />
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeSection>

            <FadeSection delay={0} className="order-1 lg:order-2">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase"
                style={{
                  background: "rgba(0,255,133,0.08)",
                  border: "1px solid rgba(0,255,133,0.25)",
                  color: "var(--color-brand-accent)",
                }}
              >
                Plataforma Operacional
              </span>
              <h2
                id="os-heading"
                className="mt-4 text-3xl font-black md:text-4xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                OVI OS monitorea
                <br />
                <span style={{ color: "var(--color-brand-accent)" }}>toda la ejecución</span>
              </h2>
              <p
                className="mt-5 text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                OVI OS es la plataforma que centraliza la ejecución, el cumplimiento, los KPIs y la
                mejora continua de cada proyecto de ingeniería. Conecta los protocolos diseñados con
                los resultados reales medidos en campo.
              </p>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Cada fase del Método OVI Engineering queda registrada, trazada y disponible para
                análisis histórico, auditorías y reportes de cliente.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Trazabilidad de cada intervención en tiempo real",
                  "KPIs operacionales actualizados automáticamente",
                  "Alertas de desviación y cumplimiento de SLA",
                  "Historial técnico completo por instalación y cliente",
                  "Reportes ejecutivos y certificados digitales automáticos",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/ovi-os"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(0,255,133,0.08)",
                  border: "1px solid rgba(0,255,133,0.25)",
                  color: "var(--color-brand-accent)",
                }}
              >
                Explorar OVI OS
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" style={{ background: "var(--color-bg-elevated)" }}>
        <div className="mx-auto max-w-4xl px-6 py-28">
          <FadeSection>
            <div
              className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,196,255,0.1) 0%, rgba(0,71,171,0.15) 50%, rgba(0,255,133,0.08) 100%)",
                border: "1px solid rgba(0,196,255,0.25)",
              }}
            >
              {/* Background grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,196,255,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,196,255,0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              <p
                className="relative text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-brand-primary)" }}
              >
                ¿Listo para resolver su desafío operacional?
              </p>
              <h2
                id="cta-heading"
                className="relative mt-4 text-3xl font-black md:text-5xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                Hablemos de
                <span style={{ color: "var(--color-brand-primary)" }}> ingeniería</span>.
              </h2>
              <p
                className="relative mx-auto mt-4 max-w-xl text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Nuestro equipo de ingenieros analiza su operación y diseña una solución
                personalizada para maximizar eficiencia y reducir impacto ambiental.
              </p>

              <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-black transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "var(--color-brand-primary)",
                    color: "#000",
                    boxShadow: "0 0 20px rgba(0,196,255,0.3)",
                  }}
                >
                  Solicitar Diagnóstico
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Hablar con un Ingeniero
                </Link>
                <Link
                  href="/ovi-ai"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(0,255,133,0.08)",
                    border: "1px solid rgba(0,255,133,0.25)",
                    color: "var(--color-brand-accent)",
                  }}
                >
                  Explorar OVI AI
                  <Brain className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>
    </main>
  );
}
