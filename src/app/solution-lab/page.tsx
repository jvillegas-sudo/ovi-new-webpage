import Link from "next/link";
import { FlaskConical, Layers, Target, Zap } from "lucide-react";
import {
  AnimateIn,
  AnimateStagger,
  Badge,
  Card,
  Container,
  Heading,
  Section,
  Text,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";
import { OviLabWorkspace } from "@features/solution-lab/OviLabWorkspace";

export const metadata = buildMetadata({
  title: "OVI Laboratorio de Soluciones",
  description:
    "OVI Laboratorio de Soluciones — Centro digital de operaciones. Explore entornos operativos reales, identifique desafíos de ingeniería en limpieza y descubra la solución OVI diseñada para su operación.",
  canonical: "/solution-lab",
  keywords: [
    "OVI Laboratorio de Soluciones",
    "simulador de ingeniería",
    "centro de operaciones digital",
    "ingeniería en limpieza",
    "diagnóstico operacional",
    "soluciones industriales OVI",
    "protocolo de limpieza",
    "entorno operativo",
  ],
});

// ─── Engineering pillars ──────────────────────────────────────────────────────

const pillars = [
  {
    icon: Layers,
    color: "text-[var(--color-brand-primary)]",
    bgColor: "rgba(0,196,255,0.1)",
    borderColor: "rgba(0,196,255,0.2)",
    title: "Explore",
    description:
      "Navegue por entornos operativos reales: transporte, institucional, industria y energía. Cada sector refleja los desafíos auténticos de sus instalaciones.",
  },
  {
    icon: Target,
    color: "text-[var(--color-brand-accent)]",
    bgColor: "rgba(0,255,133,0.1)",
    borderColor: "rgba(0,255,133,0.2)",
    title: "Analice",
    description:
      "Seleccione el activo, el área específica y el tipo de contaminación. OVI Laboratorio de Soluciones identifica las variables técnicas críticas de su operación.",
  },
  {
    icon: FlaskConical,
    color: "text-[var(--color-brand-warning)]",
    bgColor: "rgba(255,165,0,0.1)",
    borderColor: "rgba(255,165,0,0.2)",
    title: "Resuelva",
    description:
      "Reciba un diagnóstico de ingeniería preliminar con protocolo sugerido, productos recomendados, tiempos de ejecución e impacto ambiental estimado.",
  },
] as const;

// ─── How it works ─────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "Seleccione un sector operativo",
    description:
      "Transporte, Institucional, Industria o Energía. Cada sector corresponde a un entorno real con sus propios activos y desafíos de limpieza.",
  },
  {
    step: "02",
    title: "Identifique el activo y el área",
    description:
      "Elija el equipo o instalación específica (bus, turbina, quirófano, planta) y la zona donde se presenta el problema.",
  },
  {
    step: "03",
    title: "Defina el tipo de contaminación",
    description:
      "Grasa pesada, aceite hidráulico, residuo orgánico, oxidación u otro contaminante. Esta variable determina el protocolo de ingeniería.",
  },
  {
    step: "04",
    title: "Reciba el diagnóstico de ingeniería",
    description:
      "OVI Laboratorio de Soluciones genera un panel preliminar con protocolo, productos, equipamiento, diluciones y próximos pasos recomendados.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SolutionLabPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <Section
        padding="none"
        background="transparent"
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
      >
        {/* Ambient lighting */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Primary cyan glow — top left */}
          <div
            className="absolute top-[10%] left-[0%] h-[600px] w-[600px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.2) 0%, transparent 70%)",
              filter: "blur(100px)",
              animationDuration: "6s",
            }}
          />
          {/* Accent green glow — bottom right */}
          <div
            className="absolute right-[5%] bottom-[10%] h-[400px] w-[400px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.15) 0%, transparent 70%)",
              filter: "blur(120px)",
              animationDuration: "8s",
              animationDelay: "2s",
            }}
          />
          {/* Cobalt glow — center top */}
          <div
            className="absolute top-[5%] left-[40%] h-[350px] w-[350px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,71,171,0.18) 0%, transparent 70%)",
              filter: "blur(80px)",
              animationDuration: "7s",
              animationDelay: "1s",
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,196,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <Container className="relative z-10 py-28 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand" size="lg">
              OVI — Ingeniería en Limpieza
            </Badge>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.08}>
            <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
              OVI LABORATORIO DE SOLUCIONES
            </Heading>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.16}>
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[clamp(2.5rem,4vw+1.5rem,3.5rem)] leading-tight font-normal tracking-tight text-[var(--color-text-secondary)]">
                Explorar.
              </p>
              <p className="text-[clamp(2.5rem,4vw+1.5rem,3.5rem)] leading-tight font-normal tracking-tight text-[var(--color-text-secondary)]">
                Analizar.
              </p>
              <p className="text-[clamp(2.5rem,4vw+1.5rem,3.5rem)] leading-tight font-normal tracking-tight text-[var(--color-brand-primary)]">
                Resolver.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.24}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-2xl text-balance">
              Seleccione un entorno operativo y descubra cómo OVI diseña soluciones de Ingeniería en
              Limpieza para desafíos reales.
            </Text>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#simulator"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-7 text-base font-medium text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]"
              >
                <Zap size={16} aria-hidden="true" />
                Iniciar Simulación
              </a>
              <Link href="/contact">
                <span className="inline-flex h-12 items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-transparent px-7 text-base font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]">
                  Hablar con un Ingeniero
                </span>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* ─── Pillars ───────────────────────────────────────────────────────── */}
      <Section background="surface" padding="sm">
        <Container>
          <AnimateStagger className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} variant="glass" padding="lg" className="h-full">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      background: pillar.bgColor,
                      border: `1px solid ${pillar.borderColor}`,
                    }}
                    aria-hidden="true"
                  >
                    <Icon className={`h-5 w-5 ${pillar.color}`} />
                  </div>
                  <Heading as="h3" size="lg">
                    {pillar.title}
                  </Heading>
                  <Text className="mt-3">{pillar.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      {/* ─── Main Simulator ────────────────────────────────────────────────── */}
      <Section id="simulator" background="base" padding="lg">
        <Container size="lg">
          <AnimateIn animation="slideUp">
            <div className="mb-10 text-center">
              <Heading as="h2" size="3xl" align="center">
                Centro Digital de Operaciones
              </Heading>
              <Text align="center" className="mx-auto mt-3 max-w-xl">
                Explore los entornos, identifique el desafío y descubra la solución de ingeniería
                diseñada por OVI.
              </Text>
            </div>
          </AnimateIn>

          <AnimateIn animation="scaleIn" delay={0.1} threshold={0.05}>
            <OviLabWorkspace />
          </AnimateIn>
        </Container>
      </Section>

      {/* ─── How it works ──────────────────────────────────────────────────── */}
      <Section background="surface">
        <Container size="md">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Cómo funciona OVI Laboratorio de Soluciones
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text align="center" className="mx-auto mt-4 max-w-2xl">
              Un simulador de ingeniería diseñado para explorar entornos operativos reales y
              descubrir las soluciones de limpieza más adecuadas para cada desafío técnico.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-12 space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex items-start gap-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[var(--color-text-inverse)]"
                  style={{ background: "var(--color-brand-primary)" }}
                  aria-label={`Paso ${item.step}`}
                >
                  {item.step}
                </span>
                <div>
                  <Heading as="h3" size="lg">
                    {item.title}
                  </Heading>
                  <Text className="mt-1">{item.description}</Text>
                </div>
              </div>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      {/* ─── Bottom CTA ────────────────────────────────────────────────────── */}
      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              ¿Requiere una solución a medida?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              El diagnóstico del simulador es un punto de partida. Un ingeniero OVI evaluará las
              condiciones reales de su operación y diseñará la solución definitiva.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <span className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-7 text-base font-medium text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]">
                  Contactar a OVI
                </span>
              </Link>
              <Link href="/solutions">
                <span className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-transparent px-7 text-base font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]">
                  Ver Servicios
                </span>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
