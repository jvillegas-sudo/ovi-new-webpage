"use client";

/**
 * CommercialNavHub — WO-022 Commercial Navigation Hub
 *
 * Primary commercial entry point placed immediately after the Hero.
 * Six navigation cards linking to the main OVI business lines.
 *
 * Design constraints:
 * - Dark-first, no dashboard silhouette, no generic appearance.
 * - Industrial / cinematic visual language consistent with the Hero.
 * - Glassmorphism cards with cyan glow hover.
 * - Staggered entry animation via Framer Motion.
 * - Fully responsive: mobile (1 col) / tablet (2 col) / desktop (3 col).
 */

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Wrench,
  BarChart3,
  BrainCircuit,
  FileText,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { AnimateIn, Badge, Container, Heading, Text } from "@components/ui";
import { cn } from "@utils/cn";

// ─── Card data ────────────────────────────────────────────────────────────────

interface NavCard {
  id: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  accent: "primary" | "accent" | "secondary";
}

const NAV_CARDS: NavCard[] = [
  {
    id: "productos",
    icon: FlaskConical,
    title: "Productos",
    description: "Líneas industriales, alimentarias, institucionales y biotecnológicas.",
    href: "/products",
    accent: "primary",
  },
  {
    id: "servicios",
    icon: Wrench,
    title: "Servicios",
    description: "Limpieza locativa, industrial y lavado de flota In-House.",
    href: "/store/servicios",
    accent: "primary",
  },
  {
    id: "casos",
    icon: BarChart3,
    title: "Casos de Éxito",
    description: "Evidencia técnica real de intervenciones verificadas en campo.",
    href: "/store/casos",
    accent: "accent",
  },
  {
    id: "diagnostico",
    icon: BrainCircuit,
    title: "Diagnóstico con IA",
    description: "Motor inteligente que recomienda la solución OVI exacta para tu desafío.",
    href: "/descubre-tu-solucion",
    accent: "accent",
  },
  {
    id: "cotizar",
    icon: FileText,
    title: "Cotizar Proyecto",
    description: "Inicia un proyecto técnico y recibe propuesta en menos de 24 horas.",
    href: "/contact",
    accent: "primary",
  },
  {
    id: "especialista",
    icon: MessageSquare,
    title: "Hablar con un Especialista",
    description: "Contacto directo con ingeniería OVI para soporte técnico inmediato.",
    href: "/contact",
    accent: "secondary",
  },
];

// ─── Accent token map ─────────────────────────────────────────────────────────

const ACCENT_TOKENS = {
  primary: {
    icon: "text-[var(--color-brand-primary)]",
    border: "hover:border-[var(--color-border-brand)]",
    glow: "hover:shadow-[var(--shadow-glow-primary)]",
    indicator: "bg-[var(--color-brand-primary)]",
    arrow: "text-[var(--color-brand-primary)]",
  },
  accent: {
    icon: "text-[var(--color-brand-accent)]",
    border: "hover:border-[rgba(0,255,133,0.35)]",
    glow: "hover:shadow-[var(--shadow-glow-accent)]",
    indicator: "bg-[var(--color-brand-accent)]",
    arrow: "text-[var(--color-brand-accent)]",
  },
  secondary: {
    icon: "text-[#4d9fff]",
    border: "hover:border-[rgba(0,71,171,0.55)]",
    glow: "hover:shadow-[0_0_20px_rgba(0,71,171,0.35),0_0_60px_rgba(0,71,171,0.1)]",
    indicator: "bg-[#4d9fff]",
    arrow: "text-[#4d9fff]",
  },
};

// ─── Card component ───────────────────────────────────────────────────────────

interface HubCardProps {
  card: NavCard;
  index: number;
}

function HubCard({ card, index }: HubCardProps) {
  const tokens = ACCENT_TOKENS[card.accent];
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.018 }}
      className="h-full"
    >
      <Link href={card.href} className="block h-full focus-visible:outline-none">
        <div
          className={cn(
            "glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6",
            "border border-[var(--color-glass-border,rgba(255,255,255,0.1))]",
            "transition-all duration-300",
            tokens.border,
            tokens.glow,
            "group",
          )}
        >
          {/* Top indicator line */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rounded-full transition-transform duration-300",
              "group-hover:scale-x-100",
              tokens.indicator,
            )}
          />

          {/* Icon */}
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              "bg-[rgba(255,255,255,0.05)]",
              "transition-colors duration-300 group-hover:bg-[rgba(255,255,255,0.09)]",
            )}
          >
            <Icon className={cn("h-5 w-5", tokens.icon)} />
          </div>

          {/* Text */}
          <Heading as="h3" size="sm" className="mt-4 leading-snug">
            {card.title}
          </Heading>
          <Text
            size="sm"
            className="mt-2 flex-1 leading-relaxed text-[var(--color-text-secondary)]"
          >
            {card.description}
          </Text>

          {/* CTA row */}
          <div
            className={cn(
              "mt-5 flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase",
              tokens.arrow,
            )}
          >
            <span>Explorar</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CommercialNavHub() {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-[linear-gradient(to_bottom,#02060E_0%,#050508_20%,#050508_100%)]",
        "py-20 md:py-28",
      )}
      aria-label="Explora las soluciones OVI"
    >
      {/* Ambient glow — integrates with Hero's dark atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%,rgba(0,196,255,0.07),transparent 70%)," +
            "radial-gradient(ellipse 60% 30% at 80% 100%,rgba(0,255,133,0.04),transparent 70%)",
        }}
      />

      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand" size="lg">
              Soluciones OVI
            </Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h2" size="4xl" gradient="brand" align="center" className="mt-5">
              Explora las Soluciones OVI
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-xl text-balance">
              Ingeniería especializada en limpieza industrial. Elige tu punto de entrada.
            </Text>
          </AnimateIn>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_CARDS.map((card, index) => (
            <HubCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
