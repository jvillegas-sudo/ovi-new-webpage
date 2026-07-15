"use client";

/**
 * Feature: OVI Products — Cinematic Product Portfolio Experience
 *
 * Immersive product portfolio presentation with:
 *   - Animated category filter tabs
 *   - Product cards with reveal animations and detail drawers
 *   - Industry application highlights
 *   - OVI Store / Solution Lab / OVI AI integration CTAs
 *   - Full accessibility: ARIA live regions, keyboard nav, reduced-motion support
 */

import * as React from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  ChevronRight,
  Droplets,
  FlaskConical,
  Leaf,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
  CheckCircle2,
  ExternalLink,
  Layers3,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@utils/cn";

// ─── Types ─────────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;

type CategoryId = "all" | "quimicos" | "equipos" | "accesorios" | "servicios";

interface ProductCategory {
  id: CategoryId;
  label: string;
  description: string;
  icon: IconComponent;
  color: string;
}

interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, "all">;
  badge: string;
  summary: string;
  highlights: string[];
  applications: string[];
  storeSlug?: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const CATEGORIES: ProductCategory[] = [
  {
    id: "all",
    label: "Todo el Portafolio",
    description: "Visualizar todas las soluciones OVI",
    icon: Package,
    color: "var(--color-brand-primary)",
  },
  {
    id: "quimicos",
    label: "Químicos",
    description: "Formulaciones biodegradables de alto desempeño",
    icon: FlaskConical,
    color: "var(--color-brand-primary)",
  },
  {
    id: "equipos",
    label: "Equipos",
    description: "Sistemas de aplicación y dosificación",
    icon: Zap,
    color: "var(--color-brand-secondary)",
  },
  {
    id: "accesorios",
    label: "Accesorios",
    description: "Interfaces de contacto y control",
    icon: Sparkles,
    color: "var(--color-brand-accent)",
  },
  {
    id: "servicios",
    label: "Servicios",
    description: "Servicios de ingeniería en limpieza",
    icon: Wrench,
    color: "rgba(255,165,0,0.9)",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "bioclean-pro",
    name: "OVI Desengrasante Industrial",
    category: "quimicos",
    badge: "Ultradegreaser",
    summary:
      "Desengrasante industrial de alto poder 99% biodegradable. Su base de cáscara de naranja lo convierte en el Ultradegreaser: máxima eficacia contra grasa severa con mínimo impacto ambiental. Formulado para industria pesada, automotriz, petrolera y construcción.",
    highlights: [
      "99% biodegradable — base de cáscara de naranja, seguro para el ambiente y operadores",
      "Ultradegreaser: alto poder de desengrase en suciedad industrial severa",
      "Inhibidores de corrosión que protegen metales durante la limpieza",
      "Sin solventes agresivos ni clorados",
    ],
    applications: ["Industria pesada", "Automotriz", "Sector petrolero", "Construcción"],
    storeSlug: "ovi-biodex",
    accentColor: "var(--color-brand-primary)",
    accentBg: "rgba(0,196,255,0.08)",
    accentBorder: "rgba(0,196,255,0.25)",
  },
  {
    id: "desengrasante-industrial",
    name: "OVI JP 35",
    category: "quimicos",
    badge: "Grasas Minerales",
    summary:
      "Desengrasante biodegradable especializado en grasas minerales para maquinaria, motores y equipos industriales. Formulado para romper grasa mineral sin dañar superficies metálicas.",
    highlights: [
      "Formulación biodegradable específica para grasas minerales",
      "Seguro para superficies metálicas en aplicaciones prolongadas",
      "Sin solventes clorados ni compuestos agresivos",
    ],
    applications: ["Industria pesada", "Sector automotriz", "Sector energético"],
    accentColor: "var(--color-brand-primary)",
    accentBg: "rgba(0,196,255,0.08)",
    accentBorder: "rgba(0,196,255,0.25)",
  },
  {
    id: "ecodetox",
    name: "OVI Ecoshine",
    category: "quimicos",
    badge: "Pisos con Desinfección",
    summary:
      "Limpiador de pisos con triple acción: limpieza profunda, desinfección efectiva y aroma duradero. Formulado para mantenimiento diario en instalaciones institucionales, comerciales e industriales.",
    highlights: [
      "Triple acción: limpieza profunda, desinfección y aroma duradero",
      "Elimina bacterias y microorganismos en pisos de alto tráfico",
      "Fragancia fresca que mejora el ambiente del espacio",
      "Formulación ecológica con bajo impacto ambiental",
    ],
    applications: ["Institucional", "Hospitalario", "Oficinas corporativas"],
    accentColor: "var(--color-brand-accent)",
    accentBg: "rgba(0,255,133,0.07)",
    accentBorder: "rgba(0,255,133,0.2)",
  },
  {
    id: "impershield",
    name: "OVI Eco Wax",
    category: "quimicos",
    badge: "Cera de Pisos",
    summary:
      "Cera ecológica para mantenimiento y embellecimiento de pisos institucionales e industriales. Brinda lustre duradero y capa protectora que facilita la limpieza diaria.",
    highlights: [
      "Lustre duradero en pisos de alto tráfico",
      "Protección que facilita la limpieza diaria",
      "Formulación ecológica compatible con estándares ambientales",
      "Complementa el sistema OVI Ecoseal para protección integral",
    ],
    applications: ["Institucional", "Instalaciones comerciales", "Centros educativos"],
    accentColor: "var(--color-brand-secondary)",
    accentBg: "rgba(0,71,171,0.12)",
    accentBorder: "rgba(0,71,171,0.3)",
  },
  {
    id: "flotaclean",
    name: "OVI Solwash",
    category: "quimicos",
    badge: "Lavado de Flota",
    summary:
      "Detergente especializado 100% biodegradable para lavado de flotas vehiculares pesadas, buses y camiones. Sin abrasivos ni solventes — cuida el brillo de la pintura.",
    highlights: [
      "Formulación 100% biodegradable",
      "Sin abrasivos ni solventes — protege el brillo de la pintura",
      "Compatible con pinturas al agua y solvente",
      "Diseñado para lavado automático y manual",
    ],
    applications: ["Flota de camiones", "Transporte público", "Logística"],
    storeSlug: "ovi-flota-rinse-arch",
    accentColor: "var(--color-brand-primary)",
    accentBg: "rgba(0,196,255,0.08)",
    accentBorder: "rgba(0,196,255,0.25)",
  },
  {
    id: "formulacion-personalizada",
    name: "OVI Formulación Personalizada",
    category: "quimicos",
    badge: "A la Medida",
    summary:
      "Desarrollamos formulaciones específicamente adaptadas a sus requerimientos operativos y ambientales. Partimos de la caracterización del contaminante objetivo y diseñamos desde cero.",
    highlights: [
      "Proceso de 3 fases: análisis → prototipo → validación",
      "Soporte técnico y ajuste in situ incluidos",
      "Documentación técnica y fichas de seguridad completas",
      "Opción de exclusividad de fórmula para el cliente",
    ],
    applications: ["Cualquier industria", "Aplicaciones críticas"],
    accentColor: "rgba(255,165,0,0.9)",
    accentBg: "rgba(255,165,0,0.07)",
    accentBorder: "rgba(255,165,0,0.22)",
  },
  {
    id: "foam-kit",
    name: "OVI Precision Foam Kit",
    category: "equipos",
    badge: "Sistema de Espuma",
    summary:
      "Sistema de aplicación de espuma de precisión para superficies verticales, activos de planta y maquinaria expuesta. Maximiza el tiempo de contacto y reduce el consumo de producto.",
    highlights: [
      "Lanza de espuma regulable 0–100% densidad",
      "Compatible con la línea completa de químicos OVI",
      "Caudal ajustable para cobertura controlada",
      "Diseño ergonómico para operación prolongada",
    ],
    applications: ["Planta industrial", "Flota", "Procesamiento de alimentos"],
    storeSlug: "ovi-precision-foam-kit",
    accentColor: "var(--color-brand-secondary)",
    accentBg: "rgba(0,71,171,0.12)",
    accentBorder: "rgba(0,71,171,0.3)",
  },
  {
    id: "dose-control-cart",
    name: "OVI Dose Control Cart",
    category: "equipos",
    badge: "Dosificación Móvil",
    summary:
      "Estación móvil de dosificación y preparación de soluciones de limpieza. Centraliza el control de concentraciones, reduce el desperdicio y garantiza la repetibilidad del protocolo.",
    highlights: [
      "Capacidad 4 compartimentos de 20 L c/u",
      "Mezclador digital con precisión ±0.5%",
      "Registro electrónico de consumo por turno",
      "Ruedas industriales — apto para pisos rugosos",
    ],
    applications: ["Operaciones multi-turno", "Manufactura", "Hospitales"],
    storeSlug: "ovi-dose-control-cart",
    accentColor: "var(--color-brand-secondary)",
    accentBg: "rgba(0,71,171,0.12)",
    accentBorder: "rgba(0,71,171,0.3)",
  },
  {
    id: "surface-guard",
    name: "OVI Ecoseal",
    category: "accesorios",
    badge: "Sellador de Pisos",
    summary:
      "Sellador para pisos institucionales e industriales. Crea capa protectora que facilita la limpieza diaria, prolonga la vida útil del piso y protege contra manchas, humedad y desgaste.",
    highlights: [
      "Protege pisos de manchas, humedad y desgaste",
      "Facilita la limpieza diaria con menor esfuerzo",
      "Extiende la vida útil de pisos de alto tráfico",
      "Complementa el mantenimiento preventivo OVI",
    ],
    applications: ["Institucional", "Hospitalario", "Instalaciones educativas"],
    storeSlug: "ovi-ecoseal",
    accentColor: "var(--color-brand-accent)",
    accentBg: "rgba(0,255,133,0.07)",
    accentBorder: "rgba(0,255,133,0.2)",
  },
  {
    id: "lavado-flota",
    name: "Servicio de Lavado de Flota",
    category: "servicios",
    badge: "Servicio Técnico",
    summary:
      "Servicio de lavado técnico de vehículos de carga, flota pesada y transporte público. Protocolos estandarizados, personal certificado y gestión adecuada de aguas residuales.",
    highlights: [
      "Protocolos adaptados al tipo de flota y suciedad",
      "Personal certificado con EPP completo",
      "Informe de intervención y registro fotográfico",
      "Gestión de agua de proceso según normativa ambiental",
    ],
    applications: ["Terminales de transporte", "Patios logísticos", "Concesionarios"],
    accentColor: "rgba(255,165,0,0.9)",
    accentBg: "rgba(255,165,0,0.07)",
    accentBorder: "rgba(255,165,0,0.22)",
  },
  {
    id: "limpieza-industrial",
    name: "Servicio de Limpieza Industrial",
    category: "servicios",
    badge: "Servicio Técnico",
    summary:
      "Servicio integral de limpieza para plantas de manufactura, instalaciones industriales y áreas de proceso. Diagnóstico, protocolo y ejecución con trazabilidad completa.",
    highlights: [
      "Diagnóstico técnico previo a toda intervención",
      "Protocolos documentados y auditables",
      "Coordinación con producción para mínimo impacto operativo",
      "Reportes post-intervención con evidencias y KPIs",
    ],
    applications: ["Manufactura", "Alimentos", "Farmacéutico", "Energía"],
    accentColor: "rgba(255,165,0,0.9)",
    accentBg: "rgba(255,165,0,0.07)",
    accentBorder: "rgba(255,165,0,0.22)",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

// ─── Particle Background ───────────────────────────────────────────────────────

function ParticleField() {
  const prefersReduced = useReducedMotion();
  const particles = React.useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: Math.random() * 1.5 + 0.3,
        dur: Math.random() * 18 + 12,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.25 + 0.05,
      })),
    [],
  );

  if (prefersReduced) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {particles.map((p) => (
        <circle
          key={p.id}
          cx={`${p.cx}%`}
          cy={`${p.cy}%`}
          r={p.r}
          fill="var(--color-brand-primary)"
          opacity={p.opacity}
        >
          <animate
            attributeName="cy"
            values={`${p.cy}%;${p.cy - 6}%;${p.cy}%`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values={`${p.opacity};${p.opacity * 2.5};${p.opacity}`}
            dur={`${p.dur * 0.7}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

// ─── Category Tab ──────────────────────────────────────────────────────────────

interface CategoryTabProps {
  category: ProductCategory;
  active: boolean;
  onClick: () => void;
}

function CategoryTab({ category, active, onClick }: CategoryTabProps) {
  const Icon = category.icon;
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      whileHover={prefersReduced ? {} : { y: -2 }}
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      className={cn(
        "relative flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
        active
          ? "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.12)] text-[var(--color-brand-primary)]"
          : "border-[var(--color-border-default)] bg-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]",
      )}
      aria-pressed={active}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{category.label}</span>
      {active && (
        <motion.span
          layoutId="category-indicator"
          className="absolute inset-0 rounded-xl bg-[rgba(0,196,255,0.06)]"
          style={{ zIndex: -1 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      variants={cardVariants}
      layout
      style={{
        borderColor: expanded ? product.accentBorder : "var(--color-border-default)",
        transition: "border-color 0.3s ease",
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--color-surface-elevated)] transition-shadow duration-300",
        expanded
          ? "shadow-[0_0_32px_rgba(0,196,255,0.12)]"
          : "hover:shadow-[0_4px_24px_rgba(0,196,255,0.08)]",
      )}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${product.accentColor} 0%, transparent 100%)`,
          opacity: expanded ? 1 : 0.4,
        }}
      />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Badge */}
        <span
          className="w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
          style={{
            background: product.accentBg,
            border: `1px solid ${product.accentBorder}`,
            color: product.accentColor,
          }}
        >
          {product.badge}
        </span>

        {/* Name */}
        <h3
          className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]"
          style={{ letterSpacing: "-0.01em" }}
        >
          {product.name}
        </h3>

        {/* Summary */}
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {product.summary}
        </p>

        {/* Applications */}
        <div className="flex flex-wrap gap-1.5">
          {product.applications.map((app) => (
            <span
              key={app}
              className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-2.5 py-0.5 text-xs text-[var(--color-text-tertiary)]"
            >
              {app}
            </span>
          ))}
        </div>

        {/* Toggle highlights */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
          style={{ color: product.accentColor }}
          aria-expanded={expanded}
          aria-controls={`product-details-${product.id}`}
        >
          <span>{expanded ? "Ocultar especificaciones" : "Ver especificaciones"}</span>
          <motion.span
            animate={prefersReduced ? {} : { rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>

        {/* Expandable highlights */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`product-details-${product.id}`}
              key="details"
              initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
              animate={prefersReduced ? {} : { height: "auto", opacity: 1 }}
              exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-2 space-y-2 border-t border-[var(--color-border-subtle)] pt-4">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: product.accentColor }}
                      aria-hidden="true"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTAs */}
        <div className="mt-auto flex flex-wrap gap-2 border-t border-[var(--color-border-subtle)] pt-4">
          {product.storeSlug ? (
            <Link
              href={`/store/${product.storeSlug}`}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              style={{
                background: product.accentBg,
                border: `1px solid ${product.accentBorder}`,
                color: product.accentColor,
              }}
            >
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
              Ver en OVI Catálogo Técnico
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-default)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              Solicitar información
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────────

const PORTFOLIO_STATS = [
  { value: "5+", label: "Líneas de productos", icon: Package },
  { value: "100%", label: "Formulaciones biodegradables", icon: Leaf },
  { value: "4", label: "Sectores industriales", icon: Truck },
  { value: "0", label: "Subproductos tóxicos", icon: ShieldCheck },
];

function PortfolioStats() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
      role="list"
      aria-label="Estadísticas del portafolio"
    >
      {PORTFOLIO_STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 text-center"
          >
            <Icon className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
            <span className="text-3xl font-black tracking-tight text-[var(--color-brand-primary)]">
              {stat.value}
            </span>
            <span className="text-xs text-[var(--color-text-tertiary)]">{stat.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Integration CTA ───────────────────────────────────────────────────────────

interface IntegrationCardProps {
  icon: IconComponent;
  title: string;
  description: string;
  href: string;
  cta: string;
  color: string;
  bg: string;
  border: string;
}

function IntegrationCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
  color,
  bg,
  border,
}: IntegrationCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        className="group flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300"
        style={{
          background: bg,
          border: `1px solid ${border}`,
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${color}1a`, border: `1px solid ${border}` }}
        >
          <Icon className="h-5 w-5" style={{ color }} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">{title}</h3>
          <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">{description}</p>
        </div>
        <div
          className="mt-auto flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
          style={{ color }}
        >
          <span>{cta}</span>
          <motion.span
            animate={prefersReduced ? {} : { x: 0 }}
            whileHover={prefersReduced ? {} : { x: 3 }}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryId>("all");
  const prefersReduced = useReducedMotion();
  const heroRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const filteredProducts = React.useMemo(
    () =>
      activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const activeCount = filteredProducts.length;

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
        aria-label="Portafolio de Productos OVI"
      >
        <ParticleField />

        {/* Radial gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,196,255,0.07) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.08)] px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
              <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
              Portafolio de Productos
            </span>
          </motion.div>

          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-6 text-5xl font-black tracking-tight text-[var(--color-text-primary)] uppercase md:text-7xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Ingeniería en
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              cada fórmula
            </span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]"
          >
            Un portafolio diseñado para brindar rendimiento industrial, responsabilidad ambiental y
            valor operativo. Cada producto es parte de una solución diseñada por ingenieros OVI.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-12" aria-label="Cifras del portafolio">
        <PortfolioStats />
      </section>

      {/* ── Catalog ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-24" aria-label="Catálogo de productos">
        {/* Category Tabs */}
        <div className="mb-8">
          <div role="toolbar" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <CategoryTab
                key={cat.id}
                category={cat}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>

          {/* Result count */}
          <motion.p
            key={activeCategory}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-[var(--color-text-tertiary)]"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeCount === PRODUCTS.length
              ? `${activeCount} productos en el portafolio`
              : `${activeCount} producto${activeCount !== 1 ? "s" : ""} en esta categoría`}
          </motion.p>
        </div>

        {/* Product Grid */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Ecosystem Integration ─────────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
        aria-label="Ecosistema OVI"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mb-10 text-center"
          >
            <span className="text-sm font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
              Ecosistema OVI
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--color-text-primary)] md:text-4xl">
              Más allá del producto
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              Cada producto forma parte de un sistema de ingeniería. Explore las plataformas que
              amplifican el valor de cada solución.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <IntegrationCard
              icon={Package}
              title="OVI Catálogo Técnico"
              description="Explore el catálogo técnico completo con especificaciones detalladas, recomendaciones por industria y guías de aplicación."
              href="/store"
              cta="Ir al catálogo"
              color="var(--color-brand-primary)"
              bg="rgba(0,196,255,0.06)"
              border="rgba(0,196,255,0.2)"
            />
            <IntegrationCard
              icon={FlaskConical}
              title="OVI Laboratorio de Soluciones"
              description="Diseñe un protocolo de limpieza paso a paso con los productos OVI correctos para su operación específica."
              href="/solution-lab"
              cta="Ir al laboratorio"
              color="var(--color-brand-accent)"
              bg="rgba(0,255,133,0.05)"
              border="rgba(0,255,133,0.18)"
            />
            <IntegrationCard
              icon={Bot}
              title="OVI AI"
              description="Analice su operación con inteligencia artificial y reciba recomendaciones de productos personalizadas."
              href="/ovi-ai"
              cta="Probar OVI AI"
              color="var(--color-brand-secondary)"
              bg="rgba(0,71,171,0.08)"
              border="rgba(0,71,171,0.22)"
            />
            <IntegrationCard
              icon={Layers3}
              title="Ingeniería"
              description="Conozca la metodología de 5 fases que garantiza que el producto correcto llegue al lugar correcto."
              href="/engineering"
              cta="Ver metodología"
              color="rgba(255,165,0,0.9)"
              bg="rgba(255,165,0,0.06)"
              border="rgba(255,165,0,0.2)"
            />
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-t border-[var(--color-border-subtle)]"
        aria-label="Contacto final"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,196,255,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,196,255,0.25)] bg-[rgba(0,196,255,0.06)] px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Formulación Personalizada
            </span>
            <h2
              className="mt-6 text-4xl font-black tracking-tight text-[var(--color-text-primary)] md:text-5xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              ¿Necesita algo específico?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-text-secondary)]">
              Nuestro servicio de formulación personalizada desarrolla productos específicamente
              adaptados a sus requerimientos operativos y ambientales. El reto define la fórmula.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-semibold text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,196,255,0.4)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              >
                Hablar con un ingeniero
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/solution-lab"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-7 py-3 text-base font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              >
                Diseñar solución en el laboratorio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
