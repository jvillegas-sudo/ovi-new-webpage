"use client";

/**
 * Feature: OVI OS — Mission Control Experience
 *
 * Cinematic platform overview with:
 *   - Ambient particle field background
 *   - DEMO metrics dashboard
 *   - 9 interactive module cards with detail panels
 *   - OVI AI integration section
 *   - OVI Store conceptual cards
 *   - Full accessibility: ARIA, keyboard nav, reduced-motion support
 */

import * as React from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  Brain,
  Cpu,
  FlaskConical,
  Package,
  Leaf,
  BarChart3,
  Wrench,
  FileText,
  BookOpen,
  X,
  ChevronRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Droplets,
  Activity,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;

interface Module {
  id: string;
  icon: IconComponent;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  features: string[];
  demoStat: { label: string; value: string };
}

interface Metric {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendUp: boolean;
  color: string;
  icon: IconComponent;
  chartData: number[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODULES: Module[] = [
  {
    id: "ovi-ai",
    icon: Brain,
    title: "OVI AI",
    subtitle: "Inteligencia Operacional",
    color: "var(--color-brand-primary)",
    borderColor: "rgba(0,196,255,0.35)",
    bgColor: "rgba(0,196,255,0.08)",
    description:
      "Motor de inteligencia artificial que analiza contexto operacional, recomienda protocolos y optimiza decisiones de ingeniería en tiempo real.",
    features: [
      "Diagnóstico de desafíos operacionales",
      "Recomendación de protocolos y productos",
      "Análisis de contexto por industria",
      "Informes técnicos automatizados",
    ],
    demoStat: { label: "Consultas procesadas", value: "1,240" },
  },
  {
    id: "engineering",
    icon: Cpu,
    title: "Proyectos de Ingeniería",
    subtitle: "Gestión de Proyectos",
    color: "var(--color-brand-accent)",
    borderColor: "rgba(0,255,133,0.35)",
    bgColor: "rgba(0,255,133,0.08)",
    description:
      "Centralice el ciclo de vida de proyectos de limpieza industrial: desde el diagnóstico inicial hasta la entrega final y seguimiento post-servicio.",
    features: [
      "Seguimiento de proyectos activos",
      "Asignación de recursos y equipos",
      "Cronogramas y alertas de cumplimiento",
      "Historial técnico de cada instalación",
    ],
    demoStat: { label: "Proyectos activos", value: "47" },
  },
  {
    id: "protocols",
    icon: FlaskConical,
    title: "Protocolos",
    subtitle: "Biblioteca Técnica",
    color: "#a78bfa",
    borderColor: "rgba(167,139,250,0.35)",
    bgColor: "rgba(167,139,250,0.08)",
    description:
      "Acceda a la biblioteca completa de protocolos de limpieza OVI, organizados por industria, tipo de superficie, nivel de riesgo y normativa aplicable.",
    features: [
      "Protocolos por industria y sector",
      "Versiones y control de cambios",
      "Validación de cumplimiento normativo",
      "Integración con OVI AI",
    ],
    demoStat: { label: "Protocolos activos", value: "128" },
  },
  {
    id: "products",
    icon: Package,
    title: "Productos",
    subtitle: "Catálogo y Stock",
    color: "#f472b6",
    borderColor: "rgba(244,114,182,0.35)",
    bgColor: "rgba(244,114,182,0.08)",
    description:
      "Gestione el catálogo de productos OVI: soluciones químicas biodegradables, equipos y materiales, con trazabilidad de uso por proyecto y cliente.",
    features: [
      "Catálogo de soluciones químicas",
      "Gestión de inventario por bodega",
      "Trazabilidad de uso por proyecto",
      "Alertas de reposición automática",
    ],
    demoStat: { label: "Productos catalogados", value: "86" },
  },
  {
    id: "environmental",
    icon: Leaf,
    title: "Indicadores Ambientales",
    subtitle: "Impacto y Sostenibilidad",
    color: "var(--color-brand-accent)",
    borderColor: "rgba(0,255,133,0.35)",
    bgColor: "rgba(0,255,133,0.08)",
    description:
      "Monitoree el impacto ambiental de las operaciones: reducción de químicos, agua reutilizada, emisiones evitadas y cumplimiento de objetivos ESG.",
    features: [
      "Métricas de agua y químicos ahorrados",
      "Huella de carbono por operación",
      "Reportes ESG automáticos",
      "Comparativas históricas de impacto",
    ],
    demoStat: { label: "Agua ahorrada (L)", value: "284,000" },
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analítica Operacional",
    subtitle: "Datos y Tendencias",
    color: "var(--color-brand-primary)",
    borderColor: "rgba(0,196,255,0.35)",
    bgColor: "rgba(0,196,255,0.08)",
    description:
      "Visualice el rendimiento operacional en tiempo real: eficiencia de servicios, KPIs de calidad, tendencias históricas y alertas de desviación.",
    features: [
      "KPIs de eficiencia operacional",
      "Alertas y umbrales configurables",
      "Análisis de tendencias históricas",
      "Exportación a reportes ejecutivos",
    ],
    demoStat: { label: "Eficiencia promedio", value: "94.2%" },
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Planificación de Mantenimiento",
    subtitle: "Preventivo y Correctivo",
    color: "#fb923c",
    borderColor: "rgba(251,146,60,0.35)",
    bgColor: "rgba(251,146,60,0.08)",
    description:
      "Programe y gestione planes de mantenimiento preventivo para equipos y activos, con alertas de vencimiento y seguimiento de historial técnico.",
    features: [
      "Calendarios de mantenimiento preventivo",
      "Órdenes de trabajo digitales",
      "Historial técnico de equipos",
      "Alertas de vencimiento y riesgo",
    ],
    demoStat: { label: "Equipos monitoreados", value: "312" },
  },
  {
    id: "reports",
    icon: FileText,
    title: "Reportes",
    subtitle: "Documentación y Entregables",
    color: "#38bdf8",
    borderColor: "rgba(56,189,248,0.35)",
    bgColor: "rgba(56,189,248,0.08)",
    description:
      "Genere informes técnicos, certificados de servicio y reportes ejecutivos de manera automática, con firma digital y envío directo al cliente.",
    features: [
      "Informes técnicos automáticos",
      "Certificados de servicio digital",
      "Reportes ejecutivos personalizados",
      "Historial de entregables por cliente",
    ],
    demoStat: { label: "Reportes generados", value: "2,891" },
  },
  {
    id: "knowledge",
    icon: BookOpen,
    title: "Centro de Conocimiento",
    subtitle: "Capacitación y Recursos",
    color: "#a3e635",
    borderColor: "rgba(163,230,53,0.35)",
    bgColor: "rgba(163,230,53,0.08)",
    description:
      "Acceda a la base de conocimiento OVI: guías técnicas, fichas de datos de seguridad, normativas aplicables y materiales de capacitación.",
    features: [
      "Guías y manuales técnicos",
      "Fichas de seguridad (FDS)",
      "Normativas y regulaciones",
      "Materiales de capacitación",
    ],
    demoStat: { label: "Documentos disponibles", value: "530" },
  },
];

const METRICS: Metric[] = [
  {
    label: "Agua Ahorrada",
    value: "284",
    unit: "kL",
    trend: "+12% vs mes anterior",
    trendUp: true,
    color: "var(--color-brand-primary)",
    icon: Droplets,
    chartData: [60, 75, 55, 80, 70, 90, 85, 95, 88, 100],
  },
  {
    label: "Reducción Química",
    value: "38",
    unit: "%",
    trend: "+5% vs mes anterior",
    trendUp: true,
    color: "var(--color-brand-accent)",
    icon: Leaf,
    chartData: [45, 50, 48, 55, 52, 60, 58, 65, 62, 70],
  },
  {
    label: "Proyectos Activos",
    value: "47",
    unit: "",
    trend: "+3 este mes",
    trendUp: true,
    color: "#a78bfa",
    icon: Activity,
    chartData: [30, 35, 38, 40, 42, 44, 43, 45, 46, 47],
  },
  {
    label: "Eficiencia Operacional",
    value: "94.2",
    unit: "%",
    trend: "+1.4% vs mes anterior",
    trendUp: true,
    color: "#fb923c",
    icon: TrendingUp,
    chartData: [82, 85, 84, 87, 86, 89, 90, 91, 93, 94],
  },
  {
    label: "Equipos en Estado OK",
    value: "298",
    unit: "/312",
    trend: "95.5% disponibilidad",
    trendUp: true,
    color: "#38bdf8",
    icon: ShieldCheck,
    chartData: [88, 90, 89, 92, 91, 93, 94, 94, 95, 96],
  },
  {
    label: "Cumplimiento de Servicio",
    value: "99.1",
    unit: "%",
    trend: "Cumplimiento SLA",
    trendUp: true,
    color: "var(--color-brand-accent)",
    icon: CheckCircle2,
    chartData: [92, 94, 93, 95, 96, 97, 97, 98, 99, 99],
  },
];

const STORE_CARDS = [
  {
    icon: Package,
    title: "Productos Recomendados",
    description:
      "OVI OS analiza su operación y sugiere los productos más adecuados para su tipo de instalación e industria.",
    badge: "Personalizado",
    color: "var(--color-brand-primary)",
    items: ["Solución Multiuso OVI Pro", "Desgrasante Industrial BIO", "Neutralizante Superficial"],
  },
  {
    icon: Cpu,
    title: "Equipos Sugeridos",
    description:
      "Equipos y maquinaria recomendados en función de la escala operacional y las necesidades específicas del proyecto.",
    badge: "Por escala",
    color: "var(--color-brand-accent)",
    items: ["Hidrolavadora de Alta Presión", "Dosificador Automático OVI", "Kit de Aplicación PRO"],
  },
  {
    icon: FlaskConical,
    title: "Protocolos Recomendados",
    description:
      "Secuencias de limpieza optimizadas por OVI AI para maximizar eficiencia y minimizar impacto ambiental.",
    badge: "Optimizado",
    color: "#a78bfa",
    items: [
      "Protocolo Limpieza Industrial A3",
      "Protocolo Flota Pesada",
      "Protocolo Post-Obra Rápido",
    ],
  },
];

// ─── Particle Field ───────────────────────────────────────────────────────────

function ParticleField() {
  const shouldReduce = useReducedMotion();

  const particles = React.useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  );

  if (shouldReduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--color-brand-primary)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
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

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
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

    const duration = 1400;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;

      if (value.includes(",")) {
        setDisplay(Math.floor(current).toLocaleString("es-CL"));
      } else if (value.includes(".")) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(String(Math.floor(current)));
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, shouldReduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Mini Chart ───────────────────────────────────────────────────────────────

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  const max = Math.max(...data);

  return (
    <div ref={ref} className="flex h-8 items-end gap-0.5" aria-hidden="true">
      {data.map((val, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{ background: color, opacity: 0.6 }}
          initial={{ height: 0 }}
          animate={isInView ? { height: `${(val / max) * 100}%` } : { height: 0 }}
          transition={{
            duration: shouldReduce ? 0 : 0.5,
            delay: shouldReduce ? 0 : i * 0.04,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon;
  return (
    <div
      className="glass relative overflow-hidden rounded-xl p-4"
      style={{
        borderColor: metric.color.startsWith("var")
          ? `color-mix(in srgb, ${metric.color} 30%, transparent)`
          : `${metric.color}30`,
      }}
    >
      {/* Demo badge */}
      <span
        className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase"
        style={{
          background: "rgba(255,165,0,0.15)",
          color: "var(--color-brand-warning)",
          border: "1px solid rgba(255,165,0,0.3)",
        }}
        aria-label="Datos de demostración"
      >
        DEMO
      </span>

      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{
            background: `${metric.color}18`,
            border: `1px solid ${metric.color}30`,
          }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: metric.color }} />
        </div>
        <span className="text-xs text-[var(--color-text-tertiary)]">{metric.label}</span>
      </div>

      <div className="mb-2">
        <span className="text-2xl font-black text-[var(--color-text-primary)]">
          <AnimatedCounter value={metric.value} />
        </span>
        {metric.unit && (
          <span className="ml-1 text-sm font-medium" style={{ color: metric.color }}>
            {metric.unit}
          </span>
        )}
      </div>

      <MiniChart data={metric.chartData} color={metric.color} />

      <p className="mt-2 text-[11px] text-[var(--color-text-tertiary)]">
        <span
          style={{
            color: metric.trendUp ? "var(--color-brand-accent)" : "var(--color-brand-danger)",
          }}
        >
          {metric.trendUp ? "↑" : "↓"}
        </span>{" "}
        {metric.trend}
      </p>
    </div>
  );
}

// ─── Module Card ──────────────────────────────────────────────────────────────

function ModuleCard({
  module,
  onOpen,
  index,
}: {
  module: Module;
  onOpen: (m: Module) => void;
  index: number;
}) {
  const Icon = module.icon;
  const shouldReduce = useReducedMotion();

  return (
    <motion.button
      className={cn(
        "glass glass-hover group relative w-full cursor-pointer overflow-hidden rounded-2xl p-6 text-left",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
      )}
      style={
        {
          borderColor: module.borderColor,
          "--focus-color": module.color,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduce ? {} : { y: -4, scale: 1.01 }}
      whileFocus={shouldReduce ? {} : { y: -2 }}
      onClick={() => onOpen(module)}
      aria-label={`Ver detalle: ${module.title}`}
    >
      {/* Corner glow on hover */}
      <div
        aria-hidden="true"
        className="absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: module.color }}
      />

      {/* Animated border glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${module.borderColor}` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: module.bgColor,
            border: `1px solid ${module.borderColor}`,
          }}
        >
          <Icon
            className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
            style={{ color: module.color }}
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
          {module.title}
        </h3>
        <p className="mt-0.5 text-sm text-[var(--color-text-tertiary)]">{module.subtitle}</p>

        {/* Demo stat */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-tertiary)]">{module.demoStat.label}</p>
            <p className="text-base font-bold" style={{ color: module.color }}>
              {module.demoStat.value}
            </p>
          </div>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: module.bgColor, border: `1px solid ${module.borderColor}` }}
          >
            <ChevronRight className="h-4 w-4" style={{ color: module.color }} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Module Detail Panel ──────────────────────────────────────────────────────

function ModuleDetailPanel({ module, onClose }: { module: Module | null; onClose: () => void }) {
  const shouldReduce = useReducedMotion();

  // Close on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus trap: focus close button on open
  const closeRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (module) {
      setTimeout(() => closeRef.current?.focus(), 50);
    }
  }, [module]);

  const Icon = module?.icon;

  return (
    <AnimatePresence>
      {module && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[var(--z-overlay)] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="module-detail-title"
            className={cn(
              "fixed right-0 bottom-0 left-0 z-[var(--z-modal)]",
              "md:top-0 md:right-0 md:bottom-0 md:left-auto md:w-[520px]",
              "overflow-y-auto",
            )}
            style={{
              background: "rgba(10,10,15,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid ${module.borderColor}`,
              borderLeft: `1px solid ${module.borderColor}`,
            }}
            initial={shouldReduce ? { opacity: 0 } : { x: "100%", opacity: 0 }}
            animate={shouldReduce ? { opacity: 1 } : { x: 0, opacity: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { x: "100%", opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ background: module.color }}
            />

            <div className="relative p-8">
              {/* Close */}
              <button
                ref={closeRef}
                onClick={onClose}
                className={cn(
                  "absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full",
                  "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                  "bg-[var(--glass-bg)] hover:bg-[var(--glass-bg-hover)]",
                  "border border-[var(--color-border-subtle)]",
                  "transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                )}
                aria-label="Cerrar panel"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon + title */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: module.bgColor,
                    border: `2px solid ${module.borderColor}`,
                    boxShadow: `0 0 24px ${module.color}30`,
                  }}
                >
                  {Icon && <Icon className="h-7 w-7" style={{ color: module.color }} />}
                </div>
                <div>
                  <h2
                    id="module-detail-title"
                    className="font-display text-2xl font-bold text-[var(--color-text-primary)]"
                  >
                    {module.title}
                  </h2>
                  <p className="text-sm" style={{ color: module.color }}>
                    {module.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 leading-relaxed text-[var(--color-text-secondary)]">
                {module.description}
              </p>

              {/* Demo stat */}
              <div
                className="mb-6 rounded-xl p-4"
                style={{
                  background: module.bgColor,
                  border: `1px solid ${module.borderColor}`,
                }}
              >
                <p className="mb-1 text-xs tracking-widest text-[var(--color-text-tertiary)] uppercase">
                  {module.demoStat.label} —{" "}
                  <span
                    className="font-bold uppercase"
                    style={{ color: "var(--color-brand-warning)" }}
                  >
                    DEMO
                  </span>
                </p>
                <p className="text-3xl font-black" style={{ color: module.color }}>
                  {module.demoStat.value}
                </p>
              </div>

              {/* Features */}
              <div>
                <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
                  Capacidades del módulo
                </p>
                <ul className="space-y-2.5">
                  {module.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: module.color }}
                        aria-hidden="true"
                      />
                      <span className="text-sm text-[var(--color-text-secondary)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6",
                    "text-sm font-medium text-[var(--color-text-inverse)]",
                    "transition-all duration-200 hover:brightness-110 active:scale-[0.98]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                  )}
                  style={{
                    background: module.color,
                    boxShadow: `0 0 20px ${module.color}40`,
                  }}
                >
                  Solicitar demostración
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={onClose}
                  className={cn(
                    "inline-flex h-11 items-center justify-center rounded-xl px-6",
                    "text-sm font-medium text-[var(--color-text-secondary)]",
                    "border border-[var(--color-border-default)]",
                    "transition-colors duration-200 hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
                    "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                  )}
                >
                  Volver al panel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
      aria-label="OVI OS — Plataforma Inteligente"
    >
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-[10%] left-[5%] h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,196,255,0.2) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: shouldReduce ? "none" : "pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[5%] bottom-[10%] h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,255,133,0.15) 0%, transparent 65%)",
            filter: "blur(100px)",
            animation: shouldReduce ? "none" : "pulse 8s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-[30%] right-[20%] h-[350px] w-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,71,171,0.2) 0%, transparent 65%)",
            filter: "blur(90px)",
            animation: shouldReduce ? "none" : "pulse 7s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(0,196,255,0.1)",
              border: "1px solid rgba(0,196,255,0.25)",
              color: "var(--color-brand-primary)",
            }}
          >
            <Zap className="h-3 w-3" aria-hidden="true" />
            OVI — Ingeniería en Limpieza
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none font-black tracking-tighter"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #00c4ff 0%, #0047ab 40%, #00ff85 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OVI OS
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.4rem)] font-light text-balance text-[var(--color-text-secondary)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          La plataforma inteligente para gestionar soluciones de Ingeniería en Limpieza.
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-3xl text-base text-balance text-[var(--color-text-tertiary)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Centralice operaciones. Analice indicadores. Optimice procesos.
          <br className="hidden sm:block" />
          Conecte productos, protocolos, inteligencia artificial y resultados en una sola
          plataforma.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex h-13 items-center gap-2 rounded-xl px-8 py-3.5",
              "bg-[var(--color-brand-primary)] font-semibold text-[var(--color-text-inverse)]",
              "transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 active:scale-[0.98]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
            )}
          >
            Solicitar una demostración
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/ovi-ai"
            className={cn(
              "inline-flex h-13 items-center gap-2 rounded-xl px-8 py-3.5",
              "border border-[var(--color-border-default)] font-semibold text-[var(--color-text-primary)]",
              "transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] active:scale-[0.98]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
            )}
          >
            Conocer OVI AI
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1 }}
          aria-hidden="true"
        >
          <motion.div
            className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-[var(--color-border-default)] pt-1"
            animate={
              shouldReduce
                ? {}
                : {
                    borderColor: [
                      "rgba(255,255,255,0.2)",
                      "rgba(0,196,255,0.5)",
                      "rgba(255,255,255,0.2)",
                    ],
                  }
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="h-1.5 w-1 rounded-full bg-[var(--color-brand-primary)]"
              animate={shouldReduce ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: DEMO Dashboard ──────────────────────────────────────────────────

function DashboardSection() {
  return (
    <section
      className="relative overflow-hidden py-[var(--section-padding-y)]"
      aria-label="Panel de métricas DEMO"
      style={{ background: "var(--color-bg-surface)" }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-brand-primary)" }}
      />

      <div className="relative mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(255,165,0,0.12)",
              border: "1px solid rgba(255,165,0,0.3)",
              color: "var(--color-brand-warning)",
            }}
          >
            Vista previa DEMO — Datos ilustrativos
          </span>
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
            Mission Control
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
            Vista operacional en tiempo real de todos los indicadores clave de la plataforma.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
          role="list"
          aria-label="Métricas operacionales"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div
          className="glass mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ borderColor: "rgba(0,255,133,0.2)" }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--color-brand-accent)" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              Sistema Operativo: <span className="text-[var(--color-brand-accent)]">ACTIVO</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--color-text-tertiary)]">
            <span>
              Módulos activos: <strong className="text-[var(--color-text-primary)]">9/9</strong>
            </span>
            <span>
              Uptime: <strong className="text-[var(--color-brand-accent)]">99.97%</strong>
            </span>
            <span>
              Última sincronización:{" "}
              <strong className="text-[var(--color-text-primary)]">hace 2 min</strong>
            </span>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
              style={{ background: "rgba(255,165,0,0.15)", color: "var(--color-brand-warning)" }}
            >
              DEMO
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Modules ─────────────────────────────────────────────────────────

function ModulesSection({ onModuleOpen }: { onModuleOpen: (m: Module) => void }) {
  return (
    <section
      className="relative overflow-hidden py-[var(--section-padding-y)]"
      aria-label="Módulos de OVI OS"
    >
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--color-brand-accent)" }}
      />

      <div className="relative mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
            Módulos de la Plataforma
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
            Seleccione un módulo para explorar sus capacidades. Haga clic para ver el detalle.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Módulos disponibles"
        >
          {MODULES.map((module, i) => (
            <div key={module.id} role="listitem">
              <ModuleCard module={module} onOpen={onModuleOpen} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: OVI AI Integration ──────────────────────────────────────────────

function OviAiSection() {
  return (
    <section
      className="relative overflow-hidden py-[var(--section-padding-y)]"
      aria-label="OVI AI potencia OVI OS"
      style={{ background: "var(--color-bg-surface)" }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--color-brand-primary)" }}
      />

      <div className="relative mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(0,196,255,0.1)",
                border: "1px solid rgba(0,196,255,0.25)",
                color: "var(--color-brand-primary)",
              }}
            >
              <Brain className="h-3 w-3" aria-hidden="true" />
              Inteligencia Integrada
            </span>

            <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              OVI AI potencia{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00c4ff 0%, #00ff85 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                OVI OS
              </span>
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              OVI AI es la inteligencia. OVI OS es el sistema operativo. Juntos forman la plataforma
              más avanzada de gestión de Ingeniería en Limpieza.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Brain,
                  title: "La inteligencia recomienda",
                  desc: "OVI AI analiza contexto operacional, diagnóstica desafíos y recomienda protocolos, productos y secuencias de acción.",
                  color: "var(--color-brand-primary)",
                },
                {
                  icon: Cpu,
                  title: "OVI OS ejecuta y gestiona",
                  desc: "OVI OS recibe las recomendaciones y las convierte en tareas, órdenes de trabajo y seguimiento operacional estructurado.",
                  color: "var(--color-brand-accent)",
                },
                {
                  icon: TrendingUp,
                  title: "El ciclo se optimiza solo",
                  desc: "Los resultados alimentan a OVI AI, que refina continuamente sus recomendaciones para mejorar la eficiencia operacional.",
                  color: "#a78bfa",
                },
              ].map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  >
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <ItemIcon
                        className="h-5 w-5"
                        style={{ color: item.color }}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                href="/ovi-ai"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-6 py-3",
                  "bg-[var(--color-brand-primary)] text-sm font-semibold text-[var(--color-text-inverse)]",
                  "transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 active:scale-[0.98]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
                )}
              >
                Conocer OVI AI
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual diagram */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            aria-hidden="true"
          >
            {/* Central hub */}
            <div className="relative flex items-center justify-center p-12">
              {/* Orbit ring */}
              <motion.div
                className="absolute h-72 w-72 rounded-full border border-[rgba(0,196,255,0.2)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute h-56 w-56 rounded-full border border-dashed border-[rgba(0,255,133,0.15)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* OVI AI node */}
              <div
                className="glass absolute -top-4 left-1/2 flex h-20 w-20 -translate-x-1/2 flex-col items-center justify-center rounded-2xl"
                style={{
                  borderColor: "rgba(0,196,255,0.4)",
                  boxShadow: "0 0 30px rgba(0,196,255,0.2)",
                }}
              >
                <Brain className="h-7 w-7 text-[var(--color-brand-primary)]" />
                <span className="mt-1 text-[10px] font-bold text-[var(--color-brand-primary)]">
                  OVI AI
                </span>
              </div>

              {/* Central OVI OS */}
              <div
                className="glass relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-3xl"
                style={{
                  borderColor: "rgba(0,196,255,0.4)",
                  boxShadow: "0 0 50px rgba(0,196,255,0.25), 0 0 100px rgba(0,196,255,0.1)",
                }}
              >
                <Cpu className="h-10 w-10 text-[var(--color-brand-primary)]" />
                <span className="mt-1 text-sm font-black text-[var(--color-brand-primary)]">
                  OVI OS
                </span>
              </div>

              {/* Satellite nodes */}
              {[
                {
                  label: "Protocolos",
                  icon: FlaskConical,
                  color: "#a78bfa",
                  pos: "bottom-4 left-8",
                },
                {
                  label: "Proyectos",
                  icon: Cpu,
                  color: "var(--color-brand-accent)",
                  pos: "bottom-4 right-8",
                },
                {
                  label: "Productos",
                  icon: Package,
                  color: "#f472b6",
                  pos: "top-1/2 -translate-y-1/2 -right-4",
                },
                {
                  label: "Analítica",
                  icon: BarChart3,
                  color: "var(--color-brand-primary)",
                  pos: "top-1/2 -translate-y-1/2 -left-4",
                },
              ].map((node) => {
                const NodeIcon = node.icon;
                return (
                  <div
                    key={node.label}
                    className={cn(
                      "glass absolute flex h-16 w-16 flex-col items-center justify-center rounded-xl",
                      node.pos,
                    )}
                    style={{
                      borderColor: `${node.color}40`,
                      boxShadow: `0 0 20px ${node.color}20`,
                    }}
                  >
                    <NodeIcon className="h-5 w-5" style={{ color: node.color }} />
                    <span className="mt-0.5 text-[9px] font-bold" style={{ color: node.color }}>
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: OVI Store ───────────────────────────────────────────────────────

function OviStoreSection() {
  return (
    <section
      className="relative overflow-hidden py-[var(--section-padding-y)]"
      aria-label="OVI Catálogo Técnico — Integración conceptual"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "#a78bfa" }}
      />

      <div className="relative mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.25)",
              color: "#a78bfa",
            }}
          >
            <Star className="h-3 w-3" aria-hidden="true" />
            OVI Catálogo Técnico — Próximamente
          </span>
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
            Recomendaciones Inteligentes
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-secondary)]">
            OVI OS conectará directamente con OVI Catálogo Técnico para recomendar productos,
            equipos y protocolos personalizados según su operación.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {STORE_CARDS.map((card, i) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="glass glass-hover rounded-2xl p-6"
                style={{ borderColor: `${card.color}30` }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: `${card.color}15`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    <CardIcon
                      className="h-5 w-5"
                      style={{ color: card.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase"
                    style={{
                      background: `${card.color}15`,
                      color: card.color,
                      border: `1px solid ${card.color}25`,
                    }}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {card.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]"
                    >
                      <ChevronRight
                        className="h-3 w-3 shrink-0"
                        style={{ color: card.color }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-5 rounded-lg p-3 text-center text-xs"
                  style={{
                    background: "rgba(255,165,0,0.06)",
                    border: "1px solid rgba(255,165,0,0.2)",
                    color: "var(--color-brand-warning)",
                  }}
                >
                  Integración ecommerce — próximamente
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA ─────────────────────────────────────────────────────────────

function CtaSection() {
  const ctas = [
    {
      label: "Solicitar una demostración",
      href: "/contact",
      style: "primary",
      icon: ArrowRight,
    },
    {
      label: "Conocer OVI AI",
      href: "/ovi-ai",
      style: "outline",
      icon: Brain,
    },
    {
      label: "Hablar con un Ingeniero",
      href: "/contact",
      style: "ghost",
      icon: ChevronRight,
    },
  ] as const;

  return (
    <section
      className="relative overflow-hidden py-[var(--section-padding-y)]"
      aria-label="Próximos pasos"
      style={{ background: "var(--color-bg-elevated)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,196,255,0.4) 0%, rgba(0,255,133,0.2) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-bold text-balance text-[var(--color-text-primary)] md:text-5xl">
            Lleve su operación al siguiente nivel
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-balance text-[var(--color-text-secondary)]">
            OVI OS es el cerebro digital de su operación de limpieza. Conozca cómo transformar su
            gestión con inteligencia artificial e ingeniería de precisión.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {ctas.map((cta, i) => {
              const CtaIcon = cta.icon;
              return (
                <motion.div
                  key={cta.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={cta.href}
                    className={cn(
                      "inline-flex h-13 items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
                      cta.style === "primary" &&
                        "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110",
                      cta.style === "outline" &&
                        "border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
                      cta.style === "ghost" &&
                        "text-[var(--color-text-secondary)] hover:text-[var(--color-brand-accent)]",
                    )}
                  >
                    {cta.label}
                    <CtaIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export function OviOsPage() {
  const [activeModule, setActiveModule] = React.useState<Module | null>(null);

  const handleModuleOpen = React.useCallback((m: Module) => setActiveModule(m), []);
  const handleModuleClose = React.useCallback(() => setActiveModule(null), []);

  // Prevent body scroll when panel is open
  React.useEffect(() => {
    document.body.style.overflow = activeModule ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModule]);

  return (
    <>
      <HeroSection />
      <DashboardSection />
      <ModulesSection onModuleOpen={handleModuleOpen} />
      <OviAiSection />
      <OviStoreSection />
      <CtaSection />

      <ModuleDetailPanel module={activeModule} onClose={handleModuleClose} />
    </>
  );
}
