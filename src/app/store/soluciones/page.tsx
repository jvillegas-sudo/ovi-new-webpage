import Link from "next/link";
import { ArrowLeft, Bot, FlaskConical, Layers3, Target } from "lucide-react";
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
import { sectors } from "@knowledge/sectors";
import { contaminationTypes } from "@knowledge/contamination";
import { SolutionFinderClient } from "@features/store/components/SolutionFinderClient";

export const metadata = buildMetadata({
  title: "Encontrar mi solución · OVI Catálogo Técnico",
  description:
    "Centro de Soluciones OVI — Selecciona industria, tipo de suciedad y objetivo. El motor del Knowledge Engine OVI presenta diagnóstico, producto, protocolo y servicio recomendados.",
  canonical: "/store/soluciones",
  keywords: [
    "encontrar solución OVI",
    "centro de soluciones",
    "diagnóstico de ingeniería",
    "recomendación de producto",
    "OVI Knowledge Engine",
    "limpieza industrial",
    "protocolo de limpieza",
  ],
});

const howItWorks = [
  {
    icon: Target,
    step: "01",
    title: "Defina el contexto",
    description:
      "Industria, activo, tipo de suciedad y nivel de contaminación. Cuanto más preciso, más confiable la recomendación.",
  },
  {
    icon: Layers3,
    step: "02",
    title: "El Knowledge Engine razona",
    description:
      "El motor de reglas OVI evalúa todos los productos, protocolos y servicios de la base de conocimiento para encontrar la mejor solución.",
  },
  {
    icon: FlaskConical,
    step: "03",
    title: "Reciba la solución completa",
    description:
      "Diagnóstico técnico, producto principal, complementarios, protocolo asociado y servicio recomendado — todo documentado.",
  },
] as const;

const backLinkClasses =
  "inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-all hover:text-[var(--color-brand-primary)]";

export default function SolucionesPage() {
  // Pass KB data server-side to the client wizard — no hardcoded data
  const activeSectors = sectors.filter((s) => s.status !== "inactivo");
  const activeContamination = contaminationTypes.filter((c) => c.status !== "inactivo");

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[5%] left-[3%] h-[480px] w-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.16) 0%, transparent 72%)",
              filter: "blur(96px)",
            }}
          />
          <div
            className="absolute right-[5%] bottom-[8%] h-[360px] w-[360px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.11) 0%, transparent 72%)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,196,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,255,0.4) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <Container className="relative z-10 py-24">
          <AnimateIn animation="slideUp">
            <Link href="/store" className={backLinkClasses}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              OVI Catálogo Técnico
            </Link>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.06}>
            <Badge variant="brand" size="lg" className="mt-6">
              CENTRO DE SOLUCIONES
            </Badge>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.12}>
            <Heading as="h1" size="5xl" className="mt-5 max-w-4xl">
              Encontrar mi solución
            </Heading>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.18}>
            <Text size="lg" className="mt-6 max-w-3xl text-balance">
              Describa su desafío operacional. El Knowledge Engine OVI consultará todos los
              productos, protocolos y servicios de la base de conocimiento y le presentará la
              solución de ingeniería más adecuada.
            </Text>
          </AnimateIn>

          <AnimateIn animation="slideUp" delay={0.24}>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                <Bot className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" aria-hidden="true" />
                Basado en OVI Knowledge Engine
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                Sin modelo de lenguaje — razonamiento determinístico
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                {activeSectors.length} sectores · {activeContamination.length} contaminantes
              </span>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Cómo funciona</Badge>
            <Heading as="h2" size="2xl" className="mt-4 max-w-2xl">
              Diagnóstico técnico en tres pasos
            </Heading>
          </AnimateIn>
          <AnimateStagger className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} variant="glass" padding="lg">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[rgba(0,196,255,0.1)] p-2.5">
                      <Icon
                        className="h-5 w-5 text-[var(--color-brand-primary)]"
                        aria-hidden="true"
                      />
                    </div>
                    <Text
                      size="sm"
                      tracking="widest"
                      textColor="tertiary"
                      className="font-mono uppercase"
                    >
                      {item.step}
                    </Text>
                  </div>
                  <Heading as="h3" size="lg" className="mt-5">
                    {item.title}
                  </Heading>
                  <Text className="mt-3">{item.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      {/* ── Solution Finder Wizard ─────────────────────────────────────────── */}
      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Diagnóstico interactivo</Badge>
            <Heading as="h2" size="3xl" className="mt-4 max-w-3xl">
              Defina su desafío operacional
            </Heading>
            <Text size="lg" className="mt-4 max-w-2xl">
              Responda cuatro preguntas. El Knowledge Engine OVI analizará su contexto y presentará
              la solución completa: producto, protocolo, servicio y diagnóstico técnico.
            </Text>
          </AnimateIn>

          <div className="mt-12">
            <SolutionFinderClient
              sectors={activeSectors}
              contaminationTypes={activeContamination}
            />
          </div>
        </Container>
      </Section>

      {/* ── Escalation to OVI AI ───────────────────────────────────────────── */}
      <Section background="elevated">
        <Container>
          <AnimateIn animation="slideUp">
            <Card variant="glass" padding="lg" className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,196,255,0.1)]">
                <Bot className="h-7 w-7 text-[var(--color-brand-primary)]" aria-hidden="true" />
              </div>
              <Badge variant="accent">Diagnóstico avanzado</Badge>
              <Heading as="h2" size="2xl" className="mt-4">
                ¿Necesita un diagnóstico más profundo?
              </Heading>
              <Text className="mt-4">
                OVI AI conduce una conversación de ingeniería completa: zona, material, restricciones
                ambientales, nivel de riesgo y objetivos específicos — para contextos complejos o
                instalaciones críticas.
              </Text>
              <Link
                href="/ovi-ai"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] active:scale-[0.98]"
              >
                <Bot className="h-4 w-4" aria-hidden="true" />
                Consultar con OVI AI
              </Link>
            </Card>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
