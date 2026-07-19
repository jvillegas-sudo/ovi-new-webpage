"use client";

/**
 * Feature: OVI Línea Química — Vista de Línea
 * WO-023
 *
 * Vista de detalle para una línea química específica del catálogo oficial OVI.
 * Muestra el encabezado de la línea, sus productos listados con tagline,
 * y la estructura lista para recibir fichas de producto completas en el futuro.
 *
 * Estado actual: Estructura preparada — fichas de producto se agregan en WO-024+.
 */

import * as React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Bot,
  CheckCircle2,
  FlaskConical,
  Layers3,
  Package,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@utils/cn";
import { type ChemicalLine } from "./chemical-lines-data";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface ChemicalLinePageProps {
  line: ChemicalLine;
}

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Product Item ──────────────────────────────────────────────────────────────

interface ProductItemProps {
  name: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  index: number;
}

function ProductItem({ name, tagline, accentColor, accentBg, accentBorder }: ProductItemProps) {
  return (
    <motion.li
      variants={itemVariants}
      className={cn(
        "group flex items-start gap-4 rounded-xl border p-4 transition-all duration-200",
        "border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]",
        "hover:border-[rgba(0,196,255,0.25)] hover:shadow-[0_2px_16px_rgba(0,196,255,0.06)]",
      )}
    >
      {/* Icon */}
      <div
        className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
        aria-hidden="true"
      >
        <CheckCircle2 className="h-4 w-4" style={{ color: accentColor }} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-[var(--color-text-primary)]">{name}</span>
        <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)]">{tagline}</span>
      </div>

      {/* Coming soon indicator */}
      <span className="mt-1 flex-shrink-0 rounded-full border border-[var(--color-border-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-tertiary)]">
        Ficha próximamente
      </span>
    </motion.li>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ChemicalLinePage({ line }: ChemicalLinePageProps) {
  const prefersReduced = useReducedMotion();
  const productsRef = React.useRef<HTMLDivElement>(null);
  const productsInView = useInView(productsRef, { once: true, margin: "-60px" });

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-label={`Línea ${line.name}`}>
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${line.gradientFrom} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-16">
          {/* Back link */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-brand-primary)]"
              aria-label="Volver a todas las líneas"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Todas las líneas
            </Link>
          </motion.div>

          {/* Line badge */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: line.accentBg,
                border: `1px solid ${line.accentBorder}`,
                color: line.accentColor,
              }}
            >
              <Beaker className="h-3.5 w-3.5" aria-hidden="true" />
              {line.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-5xl font-black tracking-tight text-[var(--color-text-primary)] md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {line.name}
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-3 text-xl font-medium"
            style={{ color: line.accentColor }}
          >
            {line.subtitle}
          </motion.p>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-secondary)]"
          >
            {line.description}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Información de la línea"
          >
            {/* Product count */}
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2.5"
              style={{
                background: line.accentBg,
                border: `1px solid ${line.accentBorder}`,
              }}
            >
              <FlaskConical
                className="h-4 w-4"
                style={{ color: line.accentColor }}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold" style={{ color: line.accentColor }}>
                {line.productCount} productos
              </span>
            </div>

            {/* Industries */}
            {line.industries.slice(0, 3).map((industry) => (
              <span
                key={industry}
                className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-sm text-[var(--color-text-secondary)]"
              >
                {industry}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products List ──────────────────────────────────────────────────── */}
      <section
        ref={productsRef}
        className="mx-auto max-w-5xl px-6 pb-24"
        aria-label={`Productos de la línea ${line.name}`}
      >
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={productsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
                Portafolio
              </span>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[var(--color-text-primary)]">
                Productos de la línea
              </h2>
            </div>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: line.accentBg,
                border: `1px solid ${line.accentBorder}`,
                color: line.accentColor,
              }}
            >
              {line.productCount} formulaciones
            </span>
          </div>

          {/* Coming soon notice */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-[rgba(0,196,255,0.2)] bg-[rgba(0,196,255,0.05)] p-4">
            <FlaskConical
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-brand-primary)]"
              aria-hidden="true"
            />
            <p className="text-sm text-[var(--color-text-secondary)]">
              Las fichas técnicas completas de cada producto estarán disponibles próximamente.
              Contáctenos para solicitar especificaciones técnicas, hojas de seguridad o muestras de
              cualquier formulación de esta línea.
            </p>
          </div>
        </motion.div>

        {/* Products grid */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate={productsInView ? "visible" : "hidden"}
          className="grid gap-3 sm:grid-cols-2"
          aria-label={`Lista de productos ${line.name}`}
        >
          {line.products.map((product, index) => (
            <ProductItem
              key={product.name}
              name={product.name}
              tagline={product.tagline}
              accentColor={line.accentColor}
              accentBg={line.accentBg}
              accentBorder={line.accentBorder}
              index={index}
            />
          ))}
        </motion.ul>
      </section>

      {/* ── Next Steps ───────────────────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
        aria-label="Próximos pasos"
      >
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Request info */}
            <Link
              href="/contact"
              className={cn(
                "group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-200",
                "border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]",
                "hover:border-[var(--color-border-brand)] hover:shadow-[var(--shadow-glow-primary)]",
              )}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(0,196,255,0.08)",
                  border: "1px solid rgba(0,196,255,0.2)",
                }}
              >
                <Package className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)]">
                  Solicitar ficha técnica
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Reciba especificaciones, dosis y hoja de seguridad de cualquier producto.
                </p>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] transition-all duration-200 group-hover:gap-2">
                Contactar <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            {/* OVI AI */}
            <Link
              href="/ovi-ai"
              className={cn(
                "group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-200",
                "border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]",
                "hover:border-[rgba(0,71,171,0.4)] hover:shadow-[0_0_24px_rgba(0,71,171,0.1)]",
              )}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(0,71,171,0.1)",
                  border: "1px solid rgba(0,71,171,0.25)",
                }}
              >
                <Bot className="h-5 w-5 text-[var(--color-brand-secondary)]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)]">Consultar con OVI AI</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Nuestro motor de IA le ayuda a elegir el producto exacto para su aplicación.
                </p>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-secondary)] transition-all duration-200 group-hover:gap-2">
                Consultar <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            {/* Back to lines */}
            <Link
              href="/products"
              className={cn(
                "group flex flex-col gap-3 rounded-2xl p-6 transition-all duration-200",
                "border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]",
                "hover:border-[rgba(0,255,133,0.3)] hover:shadow-[0_0_24px_rgba(0,255,133,0.08)]",
              )}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(0,255,133,0.06)",
                  border: "1px solid rgba(0,255,133,0.2)",
                }}
              >
                <Layers3 className="h-5 w-5 text-[var(--color-brand-accent)]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)]">
                  Explorar otras líneas
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Vea todas las líneas del catálogo oficial OVI y sus formulaciones disponibles.
                </p>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-accent)] transition-all duration-200 group-hover:gap-2">
                Ver líneas <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
