import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  Download,
  FileText,
  FlaskConical,
  Layers3,
  ShieldCheck,
  ShieldX,
  Wrench,
} from "lucide-react";
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
import { cn } from "@utils/cn";
import {
  getStoreProduct,
  getStoreProductContext,
  getStoreProductStaticParams,
} from "@features/store/store-engine";
import { AddToCartButton } from "@features/store/components/AddToCartButton";

interface StoreProductPageProps {
  params: Promise<{ slug: string }>;
}

const primaryLinkClasses =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const outlineLinkClasses =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] bg-transparent px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const compactOutlineLinkClasses =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] bg-transparent px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

export function generateStaticParams() {
  return getStoreProductStaticParams();
}

export async function generateMetadata({ params }: StoreProductPageProps) {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) {
    return buildMetadata({
      title: "OVI Catálogo Técnico",
      description: "Especificación técnica no encontrada dentro de OVI Catálogo Técnico.",
      canonical: "/store",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${product.nombre} · OVI Catálogo Técnico`,
    description: product.resumen,
    canonical: `/store/${product.id}`,
    keywords: [
      product.nombre,
      product.categoria,
      ...product.industrias,
      "OVI Catálogo Técnico",
      "ingeniería en limpieza",
    ],
  });
}

export default async function StoreProductPage({ params }: StoreProductPageProps) {
  const { slug } = await params;
  const ctx = getStoreProductContext(slug);

  if (!ctx) {
    notFound();
  }

  const {
    product,
    relatedProducts,
    protocols,
    services,
    equipment,
    sectors,
    contamination,
    surfaces,
    fichaTecnica,
    msds,
  } = ctx;

  const specificationCards = [
    { label: "Descripción técnica", value: product.descripcion },
    { label: "Sectores compatibles", value: sectors.map((s) => s.nombre) },
    { label: "Tipo de suciedad", value: contamination.map((c) => c.nombre) },
    { label: "Superficies compatibles", value: surfaces.map((s) => s.nombre) },
    { label: "Método de uso", value: product.modoUso },
    { label: "Dilución", value: product.dilucion },
    { label: "Tiempo de acción", value: product.tiempoAccion ?? "Pendiente documentación oficial" },
    { label: "Información de seguridad", value: product.informacionSeguridad },
    { label: "Impacto ambiental", value: product.impactoAmbiental },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[6%] left-[4%] h-[420px] w-[420px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.16) 0%, transparent 72%)",
              filter: "blur(96px)",
            }}
          />
          <div
            className="absolute right-[8%] bottom-[10%] h-[320px] w-[320px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.12) 0%, transparent 72%)",
              filter: "blur(110px)",
            }}
          />
        </div>

        <Container className="relative z-10 py-28">
          <AnimateIn animation="slideUp">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                OVI Catálogo Técnico
              </Link>
              <span className="text-[var(--color-border-default)]" aria-hidden="true">
                /
              </span>
              <Link
                href="/store/comparador"
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
              >
                Comparar soluciones
              </Link>
            </div>
          </AnimateIn>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <AnimateIn animation="slideUp" delay={0.06}>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="brand">{product.categoria}</Badge>
                  <Badge variant="default" className="capitalize">
                    {product.status === "activo" ? "Disponible" : "En revisión"}
                  </Badge>
                </div>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.12}>
                <Heading as="h1" size="4xl" className="mt-6 max-w-4xl">
                  {product.nombre}
                </Heading>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.18}>
                <Text size="lg" className="mt-6 max-w-3xl text-balance">
                  {product.resumen}
                </Text>
              </AnimateIn>
              {product.desafio && (
                <AnimateIn animation="slideUp" delay={0.24}>
                  <Text className="mt-5 max-w-2xl border-l-2 border-[var(--color-brand-primary)] pl-4 text-[var(--color-text-primary)]">
                    {product.desafio}
                  </Text>
                </AnimateIn>
              )}
              <AnimateIn animation="slideUp" delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <AddToCartButton
                    item={{
                      productId: product.id,
                      nombre: product.nombre,
                      categoria: product.categoria,
                      resumen: product.resumen,
                      cantidad: 1,
                      fuenteRecomendacion: "catalogo",
                    }}
                  />
                  <Link href="/ovi-ai" className={outlineLinkClasses}>
                    Consultar con OVI AI
                  </Link>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn animation="scaleIn" delay={0.18}>
              <Card variant="glass" padding="lg">
                <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                  Contexto de ingeniería
                </Text>
                <Heading as="h2" size="xl" className="mt-4">
                  Este producto forma parte de una solución de Ingeniería en Limpieza.
                </Heading>
                <Text className="mt-4">
                  Se recomienda dentro de protocolos que integran método, superficie, contaminación,
                  equipo compatible y validación operativa.
                </Text>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {sectors.slice(0, 2).map((sector) => (
                    <div
                      key={sector.id}
                      className="rounded-2xl border border-[var(--color-border-default)] p-4"
                    >
                      <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                        Sector
                      </Text>
                      <Text size="sm" className="mt-1 font-medium">
                        {sector.nombre}
                      </Text>
                    </div>
                  ))}
                  {product.recomendacionAI && (
                    <div className="rounded-2xl border border-[var(--color-border-default)] p-4 sm:col-span-2">
                      <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                        Recomendación OVI AI
                      </Text>
                      <Text size="sm" className="mt-2">
                        {product.recomendacionAI}
                      </Text>
                    </div>
                  )}
                </div>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ── Beneficios y aplicaciones ─────────────────────────────────────────── */}
      {(product.beneficios.length > 0 || product.aplicaciones.length > 0) && (
        <Section background="elevated">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              {product.beneficios.length > 0 && (
                <AnimateIn animation="slideUp">
                  <Card variant="glass" padding="lg" className="h-full">
                    <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                      Beneficios
                    </Text>
                    <Heading as="h2" size="xl" className="mt-3">
                      Por qué este producto es la solución correcta
                    </Heading>
                    <ul className="mt-6 space-y-3">
                      {product.beneficios.map((beneficio) => (
                        <li
                          key={beneficio}
                          className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                        >
                          <ArrowRight
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]"
                            aria-hidden="true"
                          />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </AnimateIn>
              )}
              {product.aplicaciones.length > 0 && (
                <AnimateIn animation="slideUp" delay={0.08}>
                  <Card variant="solid" padding="lg" className="h-full">
                    <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                      Aplicaciones
                    </Text>
                    <Heading as="h2" size="xl" className="mt-3">
                      En qué operaciones se utiliza
                    </Heading>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.aplicaciones.map((aplicacion) => (
                        <span
                          key={aplicacion}
                          className="rounded-full border border-[var(--color-border-default)] px-3 py-1.5 text-sm text-[var(--color-text-secondary)]"
                        >
                          {aplicacion}
                        </span>
                      ))}
                    </div>
                  </Card>
                </AnimateIn>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Especificación técnica completa ───────────────────────────────────── */}
      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Especificación técnica</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Cada atributo responde a una decisión de ingeniería
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {specificationCards.map((item) => (
              <Card key={item.label} variant="solid" padding="lg" className="h-full">
                <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                  {item.label}
                </Text>
                {Array.isArray(item.value) ? (
                  item.value.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {item.value.map((value) => (
                        <li
                          key={value}
                          className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]"
                            aria-hidden="true"
                          />
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Text size="sm" textColor="tertiary" className="mt-4">
                      Pendiente documentación oficial
                    </Text>
                  )
                ) : (
                  <Text className="mt-4">{item.value}</Text>
                )}
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      {/* ── Compatibilidades e incompatibilidades ────────────────────────────── */}
      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="default">Compatibilidades</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Qué funciona con este producto y qué no
            </Heading>
          </AnimateIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <AnimateIn animation="slideUp" delay={0.04}>
              <Card variant="solid" padding="lg" className="h-full">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="h-5 w-5 text-[var(--color-brand-accent)]"
                    aria-hidden="true"
                  />
                  <Heading as="h3" size="lg">
                    Compatibilidades confirmadas
                  </Heading>
                </div>
                {surfaces.length > 0 || equipment.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {surfaces.length > 0 && (
                      <div>
                        <Text size="sm" textColor="tertiary">
                          Superficies
                        </Text>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {surfaces.map((s) => (
                            <span
                              key={s.id}
                              className="rounded-full border border-[var(--color-brand-accent)] px-3 py-1 text-xs text-[var(--color-brand-accent)]"
                            >
                              {s.nombre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {equipment.length > 0 && (
                      <div>
                        <Text size="sm" textColor="tertiary">
                          Equipos
                        </Text>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {equipment.map((e) => (
                            <span
                              key={e.id}
                              className="rounded-full border border-[var(--color-brand-accent)] px-3 py-1 text-xs text-[var(--color-brand-accent)]"
                            >
                              {e.nombre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Text size="sm" textColor="tertiary" className="mt-4">
                    Compatibilidades en documentación oficial.
                  </Text>
                )}
              </Card>
            </AnimateIn>

            <AnimateIn animation="slideUp" delay={0.08}>
              <Card variant="solid" padding="lg" className="h-full">
                <div className="flex items-center gap-3">
                  <ShieldX className="h-5 w-5 text-[var(--color-state-error)]" aria-hidden="true" />
                  <Heading as="h3" size="lg">
                    Incompatibilidades a considerar
                  </Heading>
                </div>
                {product.informacionSeguridad.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {product.informacionSeguridad.map((nota) => (
                      <li
                        key={nota}
                        className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-state-error)]"
                          aria-hidden="true"
                        />
                        {nota}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text size="sm" textColor="tertiary" className="mt-4">
                    Consulte la ficha técnica oficial para restricciones específicas.
                  </Text>
                )}
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ── Protocolos, equipos y servicios ──────────────────────────────────── */}
      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Contexto técnico completo</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Protocolos, equipos y servicios asociados
            </Heading>
            <Text size="lg" className="mt-4 max-w-3xl">
              Relaciones derivadas automáticamente desde el Knowledge Engine de OVI — sin vínculos
              manuales.
            </Text>
          </AnimateIn>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card variant="solid" padding="lg" className="h-full">
              <ShieldCheck
                className="h-5 w-5 text-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              <Heading as="h3" size="lg" className="mt-5">
                Protocolos asociados
              </Heading>
              {protocols.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {protocols.map((protocol) => (
                    <li key={protocol.id} className="text-sm text-[var(--color-text-secondary)]">
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {protocol.codigo}
                      </span>{" "}
                      · {protocol.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <Text size="sm" textColor="tertiary" className="mt-4">
                  Protocolos en documentación.
                </Text>
              )}
              <Link
                href="/store/casos"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
              >
                Ver casos de aplicación
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </Card>

            <Card variant="solid" padding="lg" className="h-full">
              <Boxes className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <Heading as="h3" size="lg" className="mt-5">
                Equipos recomendados
              </Heading>
              {equipment.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {equipment.map((eq) => (
                    <li key={eq.id} className="text-sm text-[var(--color-text-secondary)]">
                      {eq.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <Text size="sm" textColor="tertiary" className="mt-4">
                  Equipos en documentación.
                </Text>
              )}
            </Card>

            <Card variant="solid" padding="lg" className="h-full">
              <Wrench className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <Heading as="h3" size="lg" className="mt-5">
                Servicios asociados
              </Heading>
              {services.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {services.map((service) => (
                    <li key={service.id} className="text-sm text-[var(--color-text-secondary)]">
                      {service.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <Text size="sm" textColor="tertiary" className="mt-4">
                  Servicios en documentación.
                </Text>
              )}
              <Link
                href="/store/servicios"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
              >
                Ver todos los servicios
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ── Documentos descargables ───────────────────────────────────────────── */}
      <Section background="elevated">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="default">Documentación técnica</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Fichas técnicas y documentos de seguridad
            </Heading>
          </AnimateIn>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <AnimateIn animation="slideUp" delay={0.04}>
              <Card variant="glass" padding="lg" className="h-full">
                <div className="flex items-center gap-3">
                  <FileText
                    className="h-5 w-5 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                  <Heading as="h3" size="lg">
                    Ficha técnica
                  </Heading>
                </div>
                <Text className="mt-3">
                  Especificaciones completas del producto, instrucciones de uso, diluciones y
                  condiciones de almacenamiento.
                </Text>
                {fichaTecnica ? (
                  <a
                    href={fichaTecnica.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(primaryLinkClasses, "mt-6 gap-2")}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Descargar ficha técnica
                  </a>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border-default)] p-4">
                    <Text size="sm" textColor="tertiary">
                      Ficha técnica en preparación — disponible próximamente.
                    </Text>
                  </div>
                )}
              </Card>
            </AnimateIn>

            <AnimateIn animation="slideUp" delay={0.08}>
              <Card variant="glass" padding="lg" className="h-full">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="h-5 w-5 text-[var(--color-brand-accent)]"
                    aria-hidden="true"
                  />
                  <Heading as="h3" size="lg">
                    MSDS · Hoja de seguridad
                  </Heading>
                </div>
                <Text className="mt-3">
                  Material Safety Data Sheet con información de composición, riesgos, EPP requerido
                  y procedimientos de emergencia.
                </Text>
                {msds ? (
                  <a
                    href={msds.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(outlineLinkClasses, "mt-6 gap-2")}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Descargar MSDS
                  </a>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border-default)] p-4">
                    <Text size="sm" textColor="tertiary">
                      MSDS en preparación — disponible próximamente.
                    </Text>
                  </div>
                )}
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ── OVI AI / Lab / Engineering ────────────────────────────────────────── */}
      <Section background="base">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card variant="glass" padding="lg" className="h-full">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
                <Heading as="h2" size="lg">
                  ¿No está seguro de que este sea el producto adecuado?
                </Heading>
              </div>
              <Text className="mt-4">
                Lleve esta especificación a OVI AI para validar industria, superficie, contaminación
                y secuencia de aplicación antes de tomar una decisión.
              </Text>
              <Link href="/ovi-ai" className={cn(primaryLinkClasses, "mt-6")}>
                Consultar con OVI AI
              </Link>
            </Card>

            <Card variant="glass" padding="lg" className="h-full">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-[var(--color-brand-accent)]" aria-hidden="true" />
                <Heading as="h2" size="lg">
                  Ver método OVI
                </Heading>
              </div>
              <Text className="mt-4">
                Entienda cómo este producto se integra con diagnóstico, diseño, implementación y
                optimización dentro del marco del Método OVI.
              </Text>
              <Link href="/engineering" className={cn(outlineLinkClasses, "mt-6")}>
                Ver método OVI
              </Link>
            </Card>

            <Card variant="glass" padding="lg" className="h-full">
              <div className="flex items-center gap-3">
                <FlaskConical
                  className="h-5 w-5 text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                <Heading as="h2" size="lg">
                  Ver este producto aplicado en un entorno real
                </Heading>
              </div>
              <Text className="mt-4">
                Use OVI Laboratorio de Soluciones para observar dónde y cómo este producto aparece
                dentro de un entorno operativo y un diagnóstico preliminar.
              </Text>
              <Link href="/solution-lab" className={cn(outlineLinkClasses, "mt-6")}>
                Abrir OVI Laboratorio de Soluciones
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ── Productos relacionados ────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <Section background="surface">
          <Container>
            <AnimateIn animation="slideUp">
              <Badge variant="default">Productos complementarios</Badge>
              <Heading as="h2" size="3xl" className="mt-4">
                Recomendaciones para completar la solución
              </Heading>
              <Text size="lg" className="mt-4 max-w-2xl">
                Derivados automáticamente por el Knowledge Engine según compatibilidad de protocolo,
                superficie y sector.
              </Text>
            </AnimateIn>

            <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  variant="glass"
                  padding="lg"
                  className="flex h-full flex-col"
                >
                  <Badge variant="accent">{relatedProduct.categoria}</Badge>
                  <Heading as="h3" size="lg" className="mt-5">
                    {relatedProduct.nombre}
                  </Heading>
                  <Text className="mt-3 flex-1">{relatedProduct.resumen}</Text>
                  <Link
                    href={`/store/${relatedProduct.id}`}
                    className={cn(compactOutlineLinkClasses, "mt-6")}
                  >
                    Ver especificación
                  </Link>
                </Card>
              ))}
            </AnimateStagger>
          </Container>
        </Section>
      )}
    </>
  );
}
