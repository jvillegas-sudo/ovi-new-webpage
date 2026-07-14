import Link from "next/link";
import { Bot, Brain, ChevronRight } from "lucide-react";
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
import { OviAiWorkspace } from "@features/ovi-ai/OviAiWorkspace";

export const metadata = buildMetadata({
  title: "OVI AI",
  description:
    "OVI AI — Su Consultor Inteligente de Ingeniería en Limpieza. Describa su desafío operacional y reciba recomendaciones especializadas de servicios, protocolos, productos y soluciones.",
  canonical: "/ovi-ai",
  keywords: [
    "OVI AI",
    "consultor inteligente limpieza",
    "ingeniería en limpieza",
    "diagnóstico operacional",
    "protocolo de limpieza",
    "soluciones industriales OVI",
  ],
});

// ─── Engineering pillars ──────────────────────────────────────────────────────

const engineeringPillars = [
  {
    icon: Brain,
    color: "text-[var(--color-brand-primary)]",
    bgColor: "rgba(0,196,255,0.1)",
    borderColor: "rgba(0,196,255,0.2)",
    title: "Análisis de Contexto",
    description:
      "OVI AI identifica la industria, el tipo de instalación y las variables críticas del entorno para construir un diagnóstico preciso.",
  },
  {
    icon: Bot,
    color: "text-[var(--color-brand-accent)]",
    bgColor: "rgba(0,255,133,0.1)",
    borderColor: "rgba(0,255,133,0.2)",
    title: "Ingeniería Primero",
    description:
      "El protocolo correcto siempre precede al producto. OVI AI sigue el orden de ingeniería: problema → análisis → protocolo → productos → implementación.",
  },
  {
    icon: ChevronRight,
    color: "text-[var(--color-brand-secondary)]",
    bgColor: "rgba(0,71,171,0.1)",
    borderColor: "rgba(0,71,171,0.2)",
    title: "Recomendaciones Especializadas",
    description:
      "Servicios, protocolos y productos recomendados según su sector, nivel de complejidad e impacto ambiental esperado.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OviAiPage() {
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
          <div
            className="absolute top-[15%] left-[5%] h-[500px] w-[500px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.25) 0%, transparent 70%)",
              filter: "blur(80px)",
              animationDuration: "5s",
            }}
          />
          <div
            className="absolute right-[10%] bottom-[20%] h-[380px] w-[380px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.18) 0%, transparent 70%)",
              filter: "blur(100px)",
              animationDuration: "7s",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute top-[10%] right-[30%] h-[280px] w-[280px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,71,171,0.15) 0%, transparent 70%)",
              filter: "blur(90px)",
              animationDuration: "6s",
              animationDelay: "1s",
            }}
          />
        </div>

        <Container className="relative z-10 py-28 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand" size="lg">
              OVI — Ingeniería en Limpieza
            </Badge>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
              OVI AI
            </Heading>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.2}>
            <Heading
              as="h2"
              size="xl"
              align="center"
              weight="normal"
              className="mt-3 text-[var(--color-text-secondary)]"
            >
              Su Consultor Inteligente de Ingeniería en Limpieza
            </Heading>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.3}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-2xl text-balance">
              Describa el desafío que enfrenta su operación. OVI AI analizará la información y le
              recomendará servicios, protocolos, productos y soluciones especializadas.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      {/* ─── Engineering Pillars ───────────────────────────────────────────── */}
      <Section background="surface" padding="sm">
        <Container>
          <AnimateStagger className="grid gap-5 md:grid-cols-3">
            {engineeringPillars.map((pillar) => {
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

      {/* ─── Main Workspace ────────────────────────────────────────────────── */}
      <Section background="base" padding="lg">
        <Container size="lg">
          <AnimateIn animation="slideUp">
            <div className="mb-10 text-center">
              <Heading as="h2" size="3xl" align="center">
                Espacio de Consultoría
              </Heading>
              <Text align="center" className="mx-auto mt-3 max-w-xl">
                Describa su operación con el mayor detalle posible. OVI AI generará un diagnóstico
                de ingeniería preliminar.
              </Text>
            </div>
          </AnimateIn>

          <AnimateIn animation="scaleIn" delay={0.1} threshold={0.05}>
            <OviAiWorkspace />
          </AnimateIn>
        </Container>
      </Section>

      {/* ─── How it works ──────────────────────────────────────────────────── */}
      <Section background="surface">
        <Container size="md">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Cómo funciona OVI AI
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text align="center" className="mx-auto mt-4 max-w-2xl">
              OVI AI no es un chatbot. Es un consultor de ingeniería que sigue el mismo rigor
              metodológico que un ingeniero OVI en campo.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-12 space-y-4">
            {[
              {
                step: "01",
                title: "Usted describe el desafío",
                description:
                  "En sus propias palabras: tipo de instalación, industria, problema observado, volumen o escala.",
              },
              {
                step: "02",
                title: "OVI AI analiza el contexto",
                description:
                  "Identifica la industria, clasifica la complejidad y determina las variables críticas de limpieza.",
              },
              {
                step: "03",
                title: "Diagnóstico de ingeniería",
                description:
                  "Se genera un informe con servicios recomendados, protocolos sugeridos, productos potenciales y próximos pasos.",
              },
              {
                step: "04",
                title: "Conecte con un ingeniero OVI",
                description:
                  "El diagnóstico digital es el punto de partida. Un ingeniero OVI validará las condiciones reales y diseñará la solución definitiva.",
              },
            ].map((item) => (
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
              ¿Prefiere hablar directamente con un ingeniero?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Nuestros especialistas están disponibles para analizar su operación en detalle y
              diseñar la solución exacta que necesita.
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
