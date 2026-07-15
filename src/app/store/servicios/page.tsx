import Link from "next/link";
import { ArrowRight, Bot, ShieldCheck } from "lucide-react";
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
import { getStoreServices, getStoreProducts } from "@features/store/store-engine";
import { cn } from "@utils/cn";

export const metadata = buildMetadata({
  title: "Servicios relacionados · OVI Catálogo Técnico",
  description:
    "Servicios profesionales OVI: lavado de flota, limpieza industrial, diseño de protocolos, capacitación y más. Cada servicio se conecta con productos y protocolos del Knowledge Engine.",
  canonical: "/store/servicios",
  keywords: [
    "servicios OVI",
    "limpieza industrial",
    "lavado de flota",
    "protocolos de limpieza",
    "ingeniería en limpieza",
  ],
});

const outlineLinkClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-default)] bg-transparent px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

export default function ServiciosPage() {
  const storeServices = getStoreServices();
  const storeProducts = getStoreProducts();

  const productById = new Map(storeProducts.map((p) => [p.id, p]));

  return (
    <>
      {/* Hero */}
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[6%] left-[3%] h-[480px] w-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.14) 0%, transparent 72%)",
              filter: "blur(96px)",
            }}
          />
          <div
            className="absolute right-[5%] bottom-[10%] h-[360px] w-[360px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.11) 0%, transparent 72%)",
              filter: "blur(110px)",
            }}
          />
        </div>

        <Container className="relative z-10 py-24">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">SERVICIOS OVI</Badge>
            <Heading as="h1" size="4xl" className="mt-5 max-w-4xl">
              Servicios profesionales de Ingeniería en Limpieza
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl text-balance">
              Cada servicio OVI integra diagnóstico, protocolo, producto y validación. No son
              servicios genéricos — son intervenciones de ingeniería diseñadas para resolver un
              problema operacional específico.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ovi-ai"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]"
              >
                <Bot className="h-4 w-4" aria-hidden="true" />
                Consultar servicio con OVI AI
              </Link>
              <Link href="/store/casos" className={outlineLinkClasses}>
                Ver casos de aplicación
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* Services list */}
      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Catálogo de servicios</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              {storeServices.length} servicio{storeServices.length !== 1 ? "s" : ""} en el Knowledge
              Engine
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-12 space-y-8">
            {storeServices.map((service) => {
              const associatedProducts = service.productosAsociados
                .map((pid) => productById.get(pid))
                .filter(Boolean) as typeof storeProducts;

              return (
                <Card key={service.id} variant="glass" padding="lg">
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left */}
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {service.sectores.map((sector) => (
                          <Badge key={sector} variant="brand" className="capitalize">
                            {sector}
                          </Badge>
                        ))}
                        <Badge variant="default" className="capitalize">
                          {service.status}
                        </Badge>
                      </div>
                      <Heading as="h3" size="2xl" className="mt-4">
                        {service.nombre}
                      </Heading>
                      <Text className="mt-3 max-w-2xl">{service.descripcion}</Text>

                      {service.problemasQueResuelve.length > 0 && (
                        <div className="mt-6">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Problemas que resuelve
                          </Text>
                          <ul className="mt-3 space-y-1.5">
                            {service.problemasQueResuelve.map((problema) => (
                              <li
                                key={problema}
                                className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                              >
                                <ArrowRight
                                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]"
                                  aria-hidden="true"
                                />
                                {problema}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right */}
                    <div className="space-y-4">
                      {service.beneficios.length > 0 && (
                        <Card variant="solid" padding="md">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Beneficios
                          </Text>
                          <ul className="mt-3 space-y-1.5">
                            {service.beneficios.map((b) => (
                              <li
                                key={b}
                                className="flex gap-2 text-sm text-[var(--color-text-secondary)]"
                              >
                                <ShieldCheck
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand-accent)]"
                                  aria-hidden="true"
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      )}

                      {associatedProducts.length > 0 && (
                        <Card variant="solid" padding="md">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Productos relacionados
                          </Text>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {associatedProducts.map((p) => (
                              <Link
                                key={p.id}
                                href={`/store/${p.id}`}
                                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border-brand)] bg-[rgba(0,196,255,0.06)] px-3 py-1 text-xs text-[var(--color-brand-primary)] transition-colors hover:bg-[rgba(0,196,255,0.12)]"
                              >
                                {p.nombre}
                                <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </Card>
                      )}

                      {service.entregables.length > 0 && (
                        <Card variant="solid" padding="md">
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Entregables
                          </Text>
                          <ul className="mt-3 space-y-1.5">
                            {service.entregables.map((e) => (
                              <li key={e} className="text-sm text-[var(--color-text-secondary)]">
                                · {e}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Card
              variant="glass"
              padding="lg"
              className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
            >
              <div>
                <Badge variant="brand">¿Listo para empezar?</Badge>
                <Heading as="h2" size="2xl" className="mt-4">
                  Cada compra debe ser el resultado de un proceso de ingeniería
                </Heading>
                <Text className="mt-3 max-w-2xl">
                  Inicia con OVI AI para obtener una recomendación técnica personalizada, o explora
                  el catálogo para identificar las soluciones que más se ajustan a tu operación.
                </Text>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/ovi-ai"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]"
                >
                  <Bot className="h-4 w-4" aria-hidden="true" />
                  Iniciar con OVI AI
                </Link>
                <Link href="/store" className={cn(outlineLinkClasses, "w-full")}>
                  Ver catálogo
                </Link>
              </div>
            </Card>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
