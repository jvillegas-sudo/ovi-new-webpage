import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, Boxes, FlaskConical, Layers3, ShieldCheck, Wrench } from "lucide-react";
import {
  AnimateIn,
  AnimateStagger,
  Badge,
  Card,
  Container,
  Heading,
  Section,
  Text,
  buttonVariants,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";
import { cn } from "@utils/cn";
import {
  getStoreProduct,
  getStoreProductsBySlugs,
  storeProducts,
} from "@features/store/store-data";

interface StoreProductPageProps {
  params: Promise<{ slug: string }>;
}

const specificationLabels = {
  purpose: "Purpose",
  industries: "Industries",
  recommendedSurfaces: "Recommended Surfaces",
  contaminationTypes: "Type of Contamination",
  applicationMethod: "Application Method",
  dilution: "Dilution",
  safetyInformation: "Safety Information",
  environmentalBenefits: "Environmental Benefits",
  compatibleEquipment: "Compatible Equipment",
} as const;

export function generateStaticParams() {
  return storeProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: StoreProductPageProps) {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) {
    return buildMetadata({
      title: "OVI Store",
      description: "Especificación técnica no encontrada dentro de OVI Store.",
      canonical: "/store",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${product.name} · OVI Store`,
    description: product.summary,
    canonical: `/store/${product.slug}`,
    keywords: [
      product.name,
      product.categoryLabel,
      ...product.industries,
      "OVI Store",
      "ingeniería en limpieza",
    ],
  });
}

export default async function StoreProductPage({ params }: StoreProductPageProps) {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getStoreProductsBySlugs(product.relatedProducts);

  const specificationCards = [
    { label: specificationLabels.purpose, value: product.purpose },
    { label: specificationLabels.industries, value: product.industries },
    { label: specificationLabels.recommendedSurfaces, value: product.recommendedSurfaces },
    { label: specificationLabels.contaminationTypes, value: product.contaminationTypes },
    { label: specificationLabels.applicationMethod, value: product.applicationMethod },
    { label: specificationLabels.dilution, value: product.dilution },
    { label: specificationLabels.safetyInformation, value: product.safetyInformation },
    { label: specificationLabels.environmentalBenefits, value: product.environmentalBenefits },
    { label: specificationLabels.compatibleEquipment, value: product.compatibleEquipment },
  ] as const;

  return (
    <>
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
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver a OVI Store
            </Link>
          </AnimateIn>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <AnimateIn animation="slideUp" delay={0.06}>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="brand">{product.categoryLabel}</Badge>
                  <Badge variant="default">{product.badge}</Badge>
                </div>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.12}>
                <Heading as="h1" size="4xl" className="mt-6 max-w-4xl">
                  {product.name}
                </Heading>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.18}>
                <Text size="lg" className="mt-6 max-w-3xl text-balance">
                  {product.summary}
                </Text>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.24}>
                <Text className="mt-5 max-w-2xl border-l-2 border-[var(--color-brand-primary)] pl-4 text-[var(--color-text-primary)]">
                  {product.challengeStatement}
                </Text>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/ovi-ai" className={buttonVariants({ size: "lg", rounded: "full" })}>
                    Consultar con OVI AI
                  </Link>
                  <Link
                    href="/solution-lab"
                    className={buttonVariants({ variant: "outline", size: "lg", rounded: "full" })}
                  >
                    Ver este producto en un entorno real
                  </Link>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn animation="scaleIn" delay={0.18}>
              <Card variant="glass" padding="lg">
                <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                  Engineering Context
                </Text>
                <Heading as="h2" size="xl" className="mt-4">
                  Este producto hace parte de una solución de Ingeniería en Limpieza.
                </Heading>
                <Text className="mt-4">
                  Se recomienda dentro de protocolos que integran método, superficie, contaminación,
                  equipo compatible y validación operativa.
                </Text>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[var(--color-border-default)] p-4">
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Solution Lab scene
                    </Text>
                    <Text size="sm" className="mt-2">
                      {product.solutionLabScene}
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border-default)] p-4">
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Related AI recommendation
                    </Text>
                    <Text size="sm" className="mt-2">
                      {product.aiRecommendation}
                    </Text>
                  </div>
                </div>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

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
                  <Text className="mt-4">{item.value}</Text>
                )}
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card variant="glass" padding="lg" className="h-full">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
                <Heading as="h2" size="lg">
                  No está seguro si este es el producto adecuado?
                </Heading>
              </div>
              <Text className="mt-4">
                Lleve esta especificación a OVI AI para validar industria, superficie, contaminación
                y secuencia de aplicación antes de tomar una decisión.
              </Text>
              <Link
                href="/ovi-ai"
                className={cn(buttonVariants({ size: "md", rounded: "full" }), "mt-6")}
              >
                Consultar con OVI AI
              </Link>
            </Card>

            <Card variant="glass" padding="lg" className="h-full">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-[var(--color-brand-accent)]" aria-hidden="true" />
                <Heading as="h2" size="lg">
                  Ver metodología OVI Engineering
                </Heading>
              </div>
              <Text className="mt-4">
                Entienda cómo este producto se integra con diagnóstico, diseño, implementación y
                optimización dentro del marco OVI Engineering.
              </Text>
              <Link
                href="/engineering"
                className={cn(
                  buttonVariants({ variant: "outline", size: "md", rounded: "full" }),
                  "mt-6",
                )}
              >
                Ver metodología OVI Engineering
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
                Use Solution Lab para observar dónde y cómo este producto aparece dentro de un
                entorno operativo y un diagnóstico preliminar.
              </Text>
              <Link
                href="/solution-lab"
                className={cn(
                  buttonVariants({ variant: "outline", size: "md", rounded: "full" }),
                  "mt-6",
                )}
              >
                Open Solution Lab
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Los ingenieros de OVI también recomiendan</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Recomendaciones conectadas a protocolo, equipo, servicio e IA
            </Heading>
          </AnimateIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card variant="solid" padding="lg" className="h-full">
              <ShieldCheck
                className="h-5 w-5 text-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              <Heading as="h3" size="lg" className="mt-5">
                Related Protocol
              </Heading>
              <ul className="mt-4 space-y-2">
                {product.relatedProtocols.map((protocol) => (
                  <li key={protocol} className="text-sm text-[var(--color-text-secondary)]">
                    {protocol}
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="solid" padding="lg" className="h-full">
              <Boxes className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <Heading as="h3" size="lg" className="mt-5">
                Related Equipment
              </Heading>
              <ul className="mt-4 space-y-2">
                {product.relatedEquipment.map((equipment) => (
                  <li key={equipment} className="text-sm text-[var(--color-text-secondary)]">
                    {equipment}
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="solid" padding="lg" className="h-full">
              <Wrench className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <Heading as="h3" size="lg" className="mt-5">
                Related Service
              </Heading>
              <ul className="mt-4 space-y-2">
                {product.recommendedServices.map((service) => (
                  <li key={service} className="text-sm text-[var(--color-text-secondary)]">
                    {service}
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="solid" padding="lg" className="h-full">
              <Bot className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
              <Heading as="h3" size="lg" className="mt-5">
                Related AI Recommendation
              </Heading>
              <Text className="mt-4">{product.aiRecommendation}</Text>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="elevated">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="default">Related Products</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Recomendaciones complementarias para completar la solución
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.slug} variant="glass" padding="lg" className="h-full">
                <Badge variant="accent">{relatedProduct.categoryLabel}</Badge>
                <Heading as="h3" size="lg" className="mt-5">
                  {relatedProduct.name}
                </Heading>
                <Text className="mt-3">{relatedProduct.summary}</Text>
                <Link
                  href={`/store/${relatedProduct.slug}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-6 rounded-full",
                  )}
                >
                  Ver especificación
                </Link>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>
    </>
  );
}
