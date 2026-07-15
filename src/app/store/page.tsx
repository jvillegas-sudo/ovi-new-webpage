import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  Cpu,
  Factory,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Waves,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";
import { cn } from "@utils/cn";
import {
  futureIntegrations,
  getStoreProductsByCategory,
  getStoreProductsBySlugs,
  storeCategories,
  storeEntryPoints,
  storeIndustries,
  storeProducts,
  type StoreCategorySlug,
  type StoreIndustrySlug,
} from "@features/store/store-data";

export const metadata = buildMetadata({
  title: "OVI Catálogo Técnico",
  description:
    "OVI Catálogo Técnico — Soluciones profesionales para Ingeniería en Limpieza. Una experiencia de recomendación técnica donde cada producto forma parte de una solución diseñada por ingenieros OVI.",
  canonical: "/store",
  keywords: [
    "OVI Catálogo Técnico",
    "ingeniería en limpieza",
    "productos recomendados",
    "soluciones profesionales",
    "catálogo técnico",
    "OVI AI",
    "OVI Laboratorio de Soluciones",
  ],
});

const industryIcons: Record<StoreIndustrySlug, typeof Truck> = {
  transporte: Truck,
  institucional: Building2,
  industria: Factory,
  energia: Cpu,
};

const categoryIcons: Record<StoreCategorySlug, typeof Boxes> = {
  quimicos: Waves,
  equipos: ShoppingBag,
  accesorios: Sparkles,
  herramientas: Wrench,
};

const experiencePillars = [
  {
    title: "Especificación primero",
    description:
      "Cada producto se presenta como una recomendación técnica, no como una ficha comercial.",
  },
  {
    title: "Conexión con ingeniería",
    description:
      "OVI AI, Método OVI y OVI Laboratorio de Soluciones acompañan cada decisión antes de cualquier compra.",
  },
  {
    title: "Arquitectura preparada",
    description:
      "La experiencia ya contempla futuras integraciones con ecommerce, ERP, inventario y logística.",
  },
] as const;

const primaryLinkClasses =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const outlineLinkClasses =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] bg-transparent px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const compactOutlineLinkClasses =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] bg-transparent px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const compactPrimaryLinkClasses =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

export default function StorePage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="relative flex min-h-[75vh] items-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[8%] left-[2%] h-[520px] w-[520px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.2) 0%, transparent 72%)",
              filter: "blur(96px)",
              animationDuration: "7s",
            }}
          />
          <div
            className="absolute right-[8%] bottom-[12%] h-[380px] w-[380px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.14) 0%, transparent 72%)",
              filter: "blur(110px)",
              animationDuration: "8s",
              animationDelay: "1.5s",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,196,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,255,0.35) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <Container className="relative z-10 py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <AnimateIn animation="slideUp">
                <Badge variant="brand" size="lg">
                  OVI CATÁLOGO
                </Badge>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.08}>
                <Heading as="h1" size="5xl" className="mt-6 max-w-4xl">
                  Soluciones Profesionales para Ingeniería en Limpieza
                </Heading>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.16}>
                <Text size="lg" className="mt-6 max-w-3xl text-balance">
                  Cada producto forma parte de una solución diseñada por nuestros ingenieros.
                  Explore productos, equipos y accesorios recomendados para su operación.
                </Text>
              </AnimateIn>
              <AnimateIn animation="slideUp" delay={0.24}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/ovi-ai" className={primaryLinkClasses}>
                    Resolver un desafío
                  </Link>
                  <Link href="/engineering" className={outlineLinkClasses}>
                    Ver método OVI
                  </Link>
                </div>
              </AnimateIn>
            </div>

            <AnimateStagger className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {experiencePillars.map((pillar) => (
                <Card key={pillar.title} variant="glass" padding="lg" className="glass-hover">
                  <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                    Experiencia OVI
                  </Text>
                  <Heading as="h2" size="lg" className="mt-3">
                    {pillar.title}
                  </Heading>
                  <Text className="mt-3">{pillar.description}</Text>
                </Card>
              ))}
            </AnimateStagger>
          </div>
        </Container>
      </Section>

      <Section background="surface" id="shopping-philosophy">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Filosofía de recomendación</Badge>
            <Heading as="h2" size="3xl" className="mt-4 max-w-3xl">
              Nunca preguntamos qué desea comprar. Preguntamos qué desafío desea resolver.
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl">
              OVI Catálogo Técnico es la etapa final de una recomendación de ingeniería. Estas tres
              rutas de entrada organizan la experiencia sin convertirla en un ecommerce tradicional.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {storeEntryPoints.map((entryPoint, index) => {
              const Icon = index === 0 ? Bot : index === 1 ? Building2 : Boxes;
              return (
                <Card key={entryPoint.title} variant="glass" padding="lg" className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant={index === 0 ? "brand" : index === 1 ? "accent" : "default"}>
                      Opción {index + 1}
                    </Badge>
                    <Icon
                      className="h-5 w-5 text-[var(--color-brand-primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <Heading as="h3" size="lg" className="mt-6">
                    {entryPoint.title}
                  </Heading>
                  <Text className="mt-4">{entryPoint.description}</Text>
                  {index === 1 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {storeIndustries.map((industry) => (
                        <span
                          key={industry.slug}
                          className="rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                        >
                          {industry.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {index === 2 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {storeCategories.map((category) => (
                        <span
                          key={category.slug}
                          className="rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                        >
                          {category.label}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={entryPoint.href} className={cn(compactOutlineLinkClasses, "mt-8")}>
                    {entryPoint.cta}
                  </Link>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="base" id="store-industries">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Explorar por Industria</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Recomendaciones construidas desde el contexto operacional
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl">
              Cada industria traduce un reto diferente en protocolos, productos, equipos y servicios
              coordinados por el Método OVI.
            </Text>
          </AnimateIn>

          <Tabs defaultValue={storeIndustries[0].slug} variant="pills" className="mt-10 gap-8">
            <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
              {storeIndustries.map((industry) => {
                const Icon = industryIcons[industry.slug];
                return (
                  <TabsTrigger key={industry.slug} value={industry.slug} className="rounded-full">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {industry.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {storeIndustries.map((industry) => {
              const products = getStoreProductsBySlugs(industry.featuredProductSlugs);
              const Icon = industryIcons[industry.slug];

              return (
                <TabsContent key={industry.slug} value={industry.slug}>
                  <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <Card variant="glass" padding="lg" className="h-full">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-[var(--color-border-brand)] bg-[rgba(0,196,255,0.08)] p-3">
                          <Icon
                            className="h-6 w-6 text-[var(--color-brand-primary)]"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                            {industry.label}
                          </Text>
                          <Heading as="h3" size="xl" className="mt-1">
                            {industry.challenge}
                          </Heading>
                        </div>
                      </div>
                      <Text className="mt-6">{industry.description}</Text>

                      <div className="mt-8 space-y-6">
                        <div>
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Protocolos relacionados
                          </Text>
                          <ul className="mt-3 space-y-2">
                            {industry.protocols.map((protocol) => (
                              <li
                                key={protocol}
                                className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                              >
                                <ShieldCheck
                                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]"
                                  aria-hidden="true"
                                />
                                <span>{protocol}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Text
                            size="sm"
                            tracking="widest"
                            textColor="tertiary"
                            className="uppercase"
                          >
                            Servicios recomendados
                          </Text>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {industry.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {products.map((product) => (
                        <Card
                          key={product.slug}
                          variant="solid"
                          padding="lg"
                          className="flex h-full flex-col"
                        >
                          <Badge variant="brand" className="w-fit">
                            {product.categoryLabel}
                          </Badge>
                          <Heading as="h3" size="lg" className="mt-5">
                            {product.name}
                          </Heading>
                          <Text className="mt-3 flex-1">{product.summary}</Text>
                          <Text
                            size="sm"
                            className="mt-4 border-t border-[var(--color-border-subtle)] pt-4"
                          >
                            {product.challengeStatement}
                          </Text>
                          <Link
                            href={`/store/${product.slug}`}
                            className={cn(compactOutlineLinkClasses, "mt-6")}
                          >
                            Ver especificación
                          </Link>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </Container>
      </Section>

      <Section background="surface" id="store-products">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Explorar por Producto</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Productos, equipos y accesorios como sistema de solución
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl">
              La navegación por producto mantiene el mismo enfoque técnico: propósito, aplicación,
              compatibilidades y relación directa con protocolos y servicios.
            </Text>
          </AnimateIn>

          <Tabs defaultValue={storeCategories[0].slug} variant="boxed" className="mt-10 gap-8">
            <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
              {storeCategories.map((category) => {
                const Icon = categoryIcons[category.slug];
                const count = getStoreProductsByCategory(category.slug).length;
                return (
                  <TabsTrigger key={category.slug} value={category.slug} badge={count}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {storeCategories.map((category) => {
              const products = getStoreProductsByCategory(category.slug);
              return (
                <TabsContent key={category.slug} value={category.slug}>
                  <Card variant="glass" padding="lg">
                    <div className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-6 md:flex-row md:items-end md:justify-between">
                      <div>
                        <Heading as="h3" size="xl">
                          {category.label}
                        </Heading>
                        <Text className="mt-3 max-w-2xl">{category.description}</Text>
                      </div>
                      <Link href="/ovi-ai" className={outlineLinkClasses}>
                        Consultar con OVI AI
                      </Link>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                      {products.map((product) => (
                        <Card
                          key={product.slug}
                          variant="solid"
                          padding="lg"
                          className="flex h-full flex-col"
                        >
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="default">{product.badge}</Badge>
                            <Text
                              size="sm"
                              tracking="widest"
                              textColor="tertiary"
                              className="uppercase"
                            >
                              {product.categoryLabel}
                            </Text>
                          </div>
                          <Heading as="h3" size="lg" className="mt-5">
                            {product.name}
                          </Heading>
                          <Text className="mt-3 flex-1">{product.purpose}</Text>
                          <div className="mt-6 grid gap-3 text-sm text-[var(--color-text-secondary)] md:grid-cols-2">
                            <div>
                              <Text as="span" size="sm" textColor="primary" weight="semibold">
                                Aplicación
                              </Text>
                              <Text as="p" size="sm" className="mt-1">
                                {product.applicationMethod}
                              </Text>
                            </div>
                            <div>
                              <Text as="span" size="sm" textColor="primary" weight="semibold">
                                Dilución
                              </Text>
                              <Text as="p" size="sm" className="mt-1">
                                {product.dilution}
                              </Text>
                            </div>
                          </div>
                          <Link
                            href={`/store/${product.slug}`}
                            className={cn(compactPrimaryLinkClasses, "mt-6")}
                          >
                            Ver detalle técnico
                          </Link>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Recomendaciones destacadas</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Especificaciones pensadas para continuar la conversación de ingeniería
            </Heading>
          </AnimateIn>
          <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {storeProducts.slice(0, 3).map((product) => (
              <Card key={product.slug} variant="glass" padding="lg" className="h-full">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="accent">{product.badge}</Badge>
                  <ArrowRight
                    className="h-4 w-4 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                </div>
                <Heading as="h3" size="lg" className="mt-5">
                  {product.name}
                </Heading>
                <Text className="mt-3">{product.summary}</Text>
                <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-4">
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Diagnóstico OVI AI
                  </Text>
                  <Text size="sm" className="mt-2">
                    {product.aiRecommendation}
                  </Text>
                </div>
                <Link
                  href={`/store/${product.slug}`}
                  className={cn(compactOutlineLinkClasses, "mt-6")}
                >
                  Abrir ficha
                </Link>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="default">Arquitectura preparada</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Futuras integraciones sin comprometer la experiencia premium actual
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl">
              La interfaz actual prioriza la experiencia, pero la arquitectura del ecosistema
              contempla plataformas de comercio, operación, inventario y pagos para fases futuras.
            </Text>
          </AnimateIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card variant="glass" padding="lg">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {futureIntegrations.map((integration) => (
                  <div
                    key={integration}
                    className="rounded-2xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.03)] px-4 py-5"
                  >
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Futuro
                    </Text>
                    <Heading as="h3" size="md" className="mt-2">
                      {integration}
                    </Heading>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="solid" padding="lg" className="h-full">
              <div className="flex items-center gap-3">
                <Leaf className="h-5 w-5 text-[var(--color-brand-accent)]" aria-hidden="true" />
                <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                  Ecosistema OVI
                </Text>
              </div>
              <Heading as="h3" size="xl" className="mt-5">
                UX de compra sin checkout, arquitectura lista para escalar.
              </Heading>
              <Text className="mt-4">
                Esta fase prioriza narrativa, especificación y recomendación técnica. Las conexiones
                con Shopify, WooCommerce, Medusa, ERP y OVI OS quedan previstas desde el modelo de
                datos y el journey de navegación.
              </Text>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/solution-lab" className={primaryLinkClasses}>
                  Ver este producto en OVI Laboratorio de Soluciones
                </Link>
                <Link href="/ovi-ai" className={outlineLinkClasses}>
                  Consultar con OVI AI
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
