import Link from "next/link";
import { ArrowRight, Bot, ShieldCheck, Wrench } from "lucide-react";
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
import { getStoreApplicationCases, getStoreSectorOverviews } from "@features/store/store-engine";
import { cn } from "@utils/cn";

export const metadata = buildMetadata({
  title: "Casos de aplicación · OVI Catálogo Técnico",
  description:
    "Casos reales de aplicación derivados del Knowledge Engine OVI. Cada caso conecta contaminación, sector, superficie, productos, protocolos y servicios.",
  canonical: "/store/casos",
  keywords: [
    "casos de aplicación",
    "OVI Catálogo Técnico",
    "soluciones de ingeniería",
    "limpieza industrial",
    "protocolos OVI",
  ],
});

const outlineLinkClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-default)] bg-transparent px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

export default function CasosPage() {
  const casos = getStoreApplicationCases();
  const sectorOverviews = getStoreSectorOverviews();

  return (
    <>
      {/* Hero */}
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[5%] left-[3%] h-[500px] w-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.15) 0%, transparent 72%)",
              filter: "blur(96px)",
            }}
          />
          <div
            className="absolute right-[4%] bottom-[10%] h-[360px] w-[360px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.11) 0%, transparent 72%)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,196,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,255,0.35) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <Container className="relative z-10 py-24">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">CASOS DE APLICACIÓN</Badge>
            <Heading as="h1" size="4xl" className="mt-5 max-w-4xl">
              Soluciones derivadas del Knowledge Engine OVI
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl text-balance">
              Cada caso de aplicación es generado automáticamente cruzando sector, tipo de
              contaminación, superficie y los productos, protocolos y servicios compatibles del
              catálogo OVI.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ovi-ai"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]"
              >
                <Bot className="h-4 w-4" aria-hidden="true" />
                Generar caso personalizado con OVI AI
              </Link>
              <Link href="/store" className={outlineLinkClasses}>
                Ver catálogo completo
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* Application cases */}
      {casos.length > 0 ? (
        <Section background="surface">
          <Container>
            <AnimateIn animation="slideUp">
              <Badge variant="accent">Casos derivados del Knowledge Engine</Badge>
              <Heading as="h2" size="3xl" className="mt-4">
                {casos.length} caso{casos.length !== 1 ? "s" : ""} documentado
                {casos.length !== 1 ? "s" : ""}
              </Heading>
              <Text size="lg" className="mt-4 max-w-2xl">
                Ningún caso es manual. Todos los vínculos entre sector, contaminación, productos,
                protocolos y servicios son derivados automáticamente.
              </Text>
            </AnimateIn>

            <AnimateStagger className="mt-12 space-y-8">
              {casos.map((caso) => (
                <Card key={caso.id} variant="glass" padding="lg">
                  <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
                    {/* Left — case details */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="brand">{caso.sectorNombre}</Badge>
                        <Badge variant="default">{caso.contaminacion}</Badge>
                      </div>
                      <Heading as="h3" size="2xl" className="mt-4">
                        {caso.titulo}
                      </Heading>
                      <Text className="mt-3 max-w-2xl">{caso.descripcion}</Text>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-[var(--color-border-default)] p-4">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Contaminación objetivo
                          </Text>
                          <Text size="sm" className="mt-2 font-medium">
                            {caso.contaminacion}
                          </Text>
                        </div>
                        <div className="rounded-2xl border border-[var(--color-border-default)] p-4">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Superficie principal
                          </Text>
                          <Text size="sm" className="mt-2 font-medium">
                            {caso.superficie}
                          </Text>
                        </div>
                      </div>

                      {/* Products */}
                      {caso.products.length > 0 && (
                        <div className="mt-6">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Productos recomendados
                          </Text>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {caso.products.map((p) => (
                              <Link
                                key={p.id}
                                href={`/store/${p.id}`}
                                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-brand)] bg-[rgba(0,196,255,0.06)] px-3 py-1.5 text-sm text-[var(--color-brand-primary)] transition-colors hover:bg-[rgba(0,196,255,0.12)]"
                              >
                                {p.nombre}
                                <ArrowRight className="h-3 w-3" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right — protocols & services */}
                    <div className="space-y-4">
                      {caso.protocols.length > 0 && (
                        <Card variant="solid" padding="md">
                          <div className="flex items-center gap-2">
                            <ShieldCheck
                              className="h-4 w-4 text-[var(--color-brand-accent)]"
                              aria-hidden="true"
                            />
                            <Text size="sm" textColor="secondary">
                              Protocolos aplicables
                            </Text>
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {caso.protocols.map((proto) => (
                              <li
                                key={proto.id}
                                className="text-sm text-[var(--color-text-secondary)]"
                              >
                                <span className="font-medium text-[var(--color-text-primary)]">
                                  {proto.codigo}
                                </span>{" "}
                                · {proto.nombre}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      )}

                      {caso.services.length > 0 && (
                        <Card variant="solid" padding="md">
                          <div className="flex items-center gap-2">
                            <Wrench
                              className="h-4 w-4 text-[var(--color-brand-primary)]"
                              aria-hidden="true"
                            />
                            <Text size="sm" textColor="secondary">
                              Servicios OVI recomendados
                            </Text>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {caso.services.map((svc) => (
                              <span
                                key={svc.id}
                                className="rounded-full border border-[var(--color-border-default)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                              >
                                {svc.nombre}
                              </span>
                            ))}
                          </div>
                        </Card>
                      )}

                      <div className="flex flex-wrap gap-3">
                        {caso.products[0] && (
                          <Link
                            href={`/store/${caso.products[0].id}`}
                            className={outlineLinkClasses}
                          >
                            Ver ficha técnica
                          </Link>
                        )}
                        <Link href="/ovi-ai" className={outlineLinkClasses}>
                          Validar con OVI AI
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </AnimateStagger>
          </Container>
        </Section>
      ) : (
        <Section background="surface">
          <Container>
            <AnimateIn animation="slideUp">
              <Card variant="glass" padding="lg" className="py-16 text-center">
                <Text textColor="tertiary">
                  Los casos de aplicación se generan automáticamente a medida que se amplía el
                  Knowledge Engine OVI.
                </Text>
                <Link href="/ovi-ai" className={cn(outlineLinkClasses, "mt-6 inline-flex")}>
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  Generar un caso con OVI AI
                </Link>
              </Card>
            </AnimateIn>
          </Container>
        </Section>
      )}

      {/* Sector overviews */}
      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="default">Por sector operativo</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Soluciones organizadas por contexto industrial
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-10 grid gap-6 md:grid-cols-2">
            {sectorOverviews.map((sector) => (
              <Card key={sector.id} variant="solid" padding="lg" className="h-full">
                <Heading as="h3" size="xl">
                  {sector.nombre}
                </Heading>
                <Text size="sm" className="mt-2">
                  {sector.descripcion}
                </Text>

                {sector.desafios.length > 0 && (
                  <div className="mt-4">
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Desafíos principales
                    </Text>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {sector.desafios.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-[var(--color-border-default)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--color-border-subtle)] pt-4">
                  <div>
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Productos
                    </Text>
                    <Text size="sm" weight="semibold" className="mt-1">
                      {sector.products.length}
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Protocolos
                    </Text>
                    <Text size="sm" weight="semibold" className="mt-1">
                      {sector.protocols.length}
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Servicios
                    </Text>
                    <Text size="sm" weight="semibold" className="mt-1">
                      {sector.services.length}
                    </Text>
                  </div>
                </div>

                <Link
                  href={`/store?sector=${sector.id}`}
                  className={cn(outlineLinkClasses, "mt-5")}
                >
                  Ver soluciones para {sector.nombre}
                </Link>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="elevated">
        <Container>
          <AnimateIn animation="slideUp">
            <Card
              variant="glass"
              padding="lg"
              className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            >
              <div>
                <Badge variant="brand">Diagnóstico personalizado</Badge>
                <Heading as="h2" size="2xl" className="mt-4">
                  ¿No encuentras tu caso de uso específico?
                </Heading>
                <Text className="mt-4">
                  OVI AI analiza tu operación en tiempo real y genera una recomendación técnica
                  personalizada que integra producto, protocolo, equipo y servicio para tu contexto
                  exacto.
                </Text>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/ovi-ai"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]"
                >
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  Iniciar diagnóstico con OVI AI
                </Link>
                <Link href="/store" className={outlineLinkClasses}>
                  Explorar catálogo
                </Link>
              </div>
            </Card>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
