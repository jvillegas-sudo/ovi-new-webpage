"use client";

/**
 * Feature: OVI Productos Químicos — Navegación por Líneas
 * WO-023
 *
 * Sección principal de Productos Químicos OVI, organizada por líneas de negocio
 * del catálogo oficial. Cada línea es una categoría navegable que agrupa todos
 * sus productos reales.
 *
 * Diseño:
 *  - Dark-first, glassmorphism, tipografía premium OVI
 *  - Animaciones con Framer Motion (stagger, reveal on scroll)
 *  - Completamente responsivo: mobile (1 col) / tablet (2 col) / desktop (3 col)
 *  - Listo para escalar a cientos de productos sin rediseño
 */

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  ArrowRight,
  Beaker,
  Bot,
  Droplets,
  FlaskConical,
  Layers3,
  Package,
  ShieldCheck,
  Sparkles,
  Leaf,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@utils/cn";
import { CHEMICAL_LINES, TOTAL_PRODUCTS, type ChemicalLine } from "./chemical-lines-data";

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Particle Background ───────────────────────────────────────────────────────

function ParticleField() {
  const prefersReduced = useReducedMotion();
  const particles = React.useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: Math.random() * 1.4 + 0.3,
        dur: Math.random() * 20 + 12,
        delay: Math.random() * 12,
        opacity: Math.random() * 0.22 + 0.04,
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
            values={`${p.cy}%;${p.cy - 7}%;${p.cy}%`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values={`${p.opacity};${p.opacity * 2.8};${p.opacity}`}
            dur={`${p.dur * 0.65}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

// ─── Portfolio Stats ───────────────────────────────────────────────────────────

const PORTFOLIO_STATS = [
  { value: `${CHEMICAL_LINES.length}`, label: "Líneas de productos", icon: Layers3 },
  { value: `${TOTAL_PRODUCTS}+`, label: "Formulaciones activas", icon: FlaskConical },
  { value: "100%", label: "Biodegradables", icon: Leaf },
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
      aria-label="Cifras del portafolio OVI"
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

// ─── Visual Plate (replaces image placeholder) ────────────────────────────────

interface VisualPlateProps {
  line: ChemicalLine;
}

function VisualPlate({ line }: VisualPlateProps) {
  return (
    <div
      className="relative h-44 w-full overflow-hidden rounded-t-2xl"
      style={{
        background: `linear-gradient(135deg, ${line.gradientFrom} 0%, ${line.gradientTo} 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Subtle grid pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${line.slug}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${line.slug})`}
          style={{ color: line.accentColor }}
        />
      </svg>

      {/* Product count badge */}
      <div className="absolute top-4 right-4">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: line.accentBg,
            border: `1px solid ${line.accentBorder}`,
            color: line.accentColor,
          }}
        >
          {line.productCount} productos
        </span>
      </div>

      {/* Central icon */}
      <div className="flex h-full items-center justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: line.accentBg,
            border: `1px solid ${line.accentBorder}`,
          }}
        >
          <Beaker className="h-7 w-7" style={{ color: line.accentColor }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

// ─── Chemical Line Card ────────────────────────────────────────────────────────

interface LineCardProps {
  line: ChemicalLine;
  index: number;
}

function LineCard({ line }: LineCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        "border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]",
        "hover:shadow-[0_0_36px_rgba(0,196,255,0.1)]",
      )}
      style={{
        ["--hover-border" as string]: line.accentBorder,
      }}
    >
      {/* Visual Plate */}
      <VisualPlate line={line} />

      {/* Top accent line (behind the visual, visible on border) */}
      <div
        className="h-[2px] w-full flex-shrink-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${line.accentColor} 0%, transparent 100%)`,
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Badge */}
        <span
          className="w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
          style={{
            background: line.accentBg,
            border: `1px solid ${line.accentBorder}`,
            color: line.accentColor,
          }}
        >
          {line.badge}
        </span>

        {/* Name */}
        <div>
          <h2 className="text-xl font-black tracking-tight text-[var(--color-text-primary)]">
            {line.name}
          </h2>
          <p className="mt-1 text-sm font-medium" style={{ color: line.accentColor }}>
            {line.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {line.description}
        </p>

        {/* Industries */}
        <div className="flex flex-wrap gap-1.5" aria-label="Industrias atendidas">
          {line.industries.slice(0, 3).map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-2.5 py-0.5 text-xs text-[var(--color-text-tertiary)]"
            >
              {industry}
            </span>
          ))}
          {line.industries.length > 3 && (
            <span className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-2.5 py-0.5 text-xs text-[var(--color-text-tertiary)]">
              +{line.industries.length - 3} más
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto border-t border-[var(--color-border-subtle)] pt-4">
          <Link
            href={`/products/${line.slug}`}
            className={cn(
              "group/cta inline-flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold",
              "transition-all duration-200",
            )}
            style={{
              background: line.accentBg,
              border: `1px solid ${line.accentBorder}`,
              color: line.accentColor,
            }}
            aria-label={`Explorar línea ${line.name}`}
          >
            <span>Explorar línea</span>
            <motion.span
              animate={prefersReduced ? {} : { x: 0 }}
              whileHover={prefersReduced ? {} : { x: 3 }}
              className="transition-transform duration-200 group-hover/cta:translate-x-1"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Ecosystem Integration CTAs ───────────────────────────────────────────────

interface EcoCardProps {
  icon: React.FC<{ className?: string; style?: React.CSSProperties; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
  href: string;
  cta: string;
  color: string;
  bg: string;
  border: string;
}

function EcoCard({ icon: Icon, title, description, href, cta, color, bg, border }: EcoCardProps) {
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
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${color}1a`, border: `1px solid ${border}` }}
        >
          <Icon className="h-5 w-5" style={{ color }} aria-hidden />
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
            animate={prefersReduced ? {} : {}}
            whileHover={prefersReduced ? {} : { x: 3 }}
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ProductsPage() {
  const prefersReduced = useReducedMotion();
  const gridRef = React.useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
        aria-label="Productos Químicos OVI"
      >
        <ParticleField />

        {/* Radial glow */}
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
              Catálogo Oficial OVI
            </span>
          </motion.div>

          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-6 text-5xl font-black tracking-tight text-[var(--color-text-primary)] uppercase md:text-7xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Productos
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
              Químicos OVI
            </span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]"
          >
            Fabricamos y distribuimos soluciones químicas profesionales para las industrias más
            exigentes. Seleccione una línea para explorar el portafolio completo de formulaciones
            OVI.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-12" aria-label="Cifras del portafolio">
        <PortfolioStats />
      </section>

      {/* ── Lines Grid ───────────────────────────────────────────────────────── */}
      <section
        className="mx-auto max-w-7xl px-6 pb-24"
        aria-label="Líneas de productos químicos OVI"
        ref={gridRef}
      >
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
            Líneas de negocio
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[var(--color-text-primary)] md:text-4xl">
            Seleccione una línea
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">
            Cada línea representa un segmento del catálogo oficial OVI y agrupa todas las
            formulaciones diseñadas para ese sector industrial.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          role="list"
          aria-label="Líneas de productos"
        >
          {CHEMICAL_LINES.map((line, index) => (
            <div key={line.slug} role="listitem">
              <LineCard line={line} index={index} />
            </div>
          ))}
        </motion.div>
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
            <EcoCard
              icon={Package}
              title="OVI Catálogo Técnico"
              description="Explore fichas técnicas completas con especificaciones, recomendaciones de dosificación y guías de aplicación."
              href="/store"
              cta="Ir al catálogo"
              color="var(--color-brand-primary)"
              bg="rgba(0,196,255,0.06)"
              border="rgba(0,196,255,0.2)"
            />
            <EcoCard
              icon={FlaskConical}
              title="OVI Laboratorio"
              description="Diseñe un protocolo de limpieza paso a paso con los productos OVI exactos para su operación."
              href="/solution-lab"
              cta="Ir al laboratorio"
              color="var(--color-brand-accent)"
              bg="rgba(0,255,133,0.05)"
              border="rgba(0,255,133,0.18)"
            />
            <EcoCard
              icon={Bot}
              title="OVI AI"
              description="Analice su operación con inteligencia artificial y reciba recomendaciones de productos personalizadas."
              href="/ovi-ai"
              cta="Probar OVI AI"
              color="var(--color-brand-secondary)"
              bg="rgba(0,71,171,0.08)"
              border="rgba(0,71,171,0.22)"
            />
            <EcoCard
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
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
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
