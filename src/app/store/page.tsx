import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  Cpu,
  Factory,
  Leaf,
  Search,
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
  getStoreSectorOverviews,
  getStoreProductsByCategory,
  getFeaturedStoreProducts,
} from "@features/store/store-engine";
import type { OviProductCategory } from "@knowledge";

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

// ─── UI config (presentation-layer only — no product data hardcoded) ──────────

const SECTOR_ICON_MAP: Record<string, typeof Truck> = {
  transporte: Truck,
  institucional: Building2,
  hospitales: Building2,
  industria: Factory,
  energia: Cpu,
  retail: ShoppingBag,
  alimentos: Leaf,
};

const CATEGORY_CONFIG: Record<
  OviProductCategory,
  { label: string; description: string; icon: typeof Waves }
> = {
  quimicos: {
    label: "Químicos",
    description:
      "Formulaciones de alto desempeño para remoción de contaminantes industriales. Cada química fue diseñada para un perfil de suciedad específico.",
    icon: Waves,
  },
  equipos: {
    label: "Equipos",
    description:
      "Sistemas de dosificación, lavado y aplicación que garantizan reproducibilidad de protocolo y eficiencia hídrica.",
    icon: ShoppingBag,
  },
  accesorios: {
    label: "Accesorios",
    description:
      "Elementos complementarios para completar el sistema de limpieza: boquillas, lanzas, adaptadores y kits de espuma.",
    icon: Sparkles,
  },
  herramientas: {
    label: "Herramientas",
    description:
      "Instrumentos de medición, control y validación que permiten auditar la calidad del proceso de limpieza.",
    icon: Wrench,
  },
};

const CATEGORY_ORDER: OviProductCategory[] = ["quimicos", "equipos", "accesorios", "herramientas"];

const entryPoints = [
  {
    title: "Encontrar mi solución",
    description:
      "Inicia desde el problema operacional. El motor de recomendaciones OVI conecta industria, activo, contaminante y objetivo para presentar la solución completa.",
    href: "/store/soluciones",
    cta: "Iniciar diagnóstico",
    badge: "Recomendado",
    badgeVariant: "brand" as const,
    icon: Search,
  },
  {
    title: "Consultar con OVI AI",
    description:
      "El asistente de ingeniería OVI te guía paso a paso: industria, activo, zona, material, tipo de suciedad y restricciones para recomendarte la solución precisa.",
    href: "/ovi-ai",
    cta: "Iniciar con OVI AI",
    badge: "IA Técnica",
    badgeVariant: "accent" as const,
    icon: Bot,
  },
  {
    title: "Explorar por industria o categoría",
    description:
      "Navega el catálogo técnico organizado por sector operativo o tipo de producto, siempre vinculado a protocolos y servicios OVI.",
    href: "#store-industries",
    cta: "Explorar catálogo",
    badge: "Catálogo",
    badgeVariant: "default" as const,
    icon: Boxes,
  },
] as const;

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

const futureIntegrationLabels = [
  "Shopify",
  "WooCommerce",
  "Medusa",
  "ERP",
  "OVI OS",
  "Inventario",
  "Multi-moneda",
];

// ─── Button classes ───────────────────────────────────────────────────────────

const primaryLinkClasses =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const outlineLinkClasses =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] bg-transparent px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const compactOutlineLinkClasses =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] bg-transparent px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const compactPrimaryLinkClasses =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StorePage() {
  const sectorOverviews = getStoreSectorOverviews();
  const featuredProducts = getFeaturedStoreProducts(3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
                  <Link href="/store/soluciones" className={primaryLinkClasses}>
                    <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                    Encontrar mi solución
                  </Link>
                  <Link href="/engineering" className={outlineLinkClasses}>
                    Ver Método OVI
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

      {/* ── Philosophy / Entry Points ─────────────────────────────────────── */}
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
              OVI Catálogo Técnico es la etapa final de una recomendación de ingeniería. Estas rutas
              de entrada organizan la experiencia sin convertirla en un ecommerce tradicional.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {entryPoints.map((ep) => {
              const Icon = ep.icon;
              return (
                <Card key={ep.title} variant="glass" padding="lg" className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant={ep.badgeVariant}>{ep.badge}</Badge>
                    <Icon
                      className="h-5 w-5 text-[var(--color-brand-primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <Heading as="h3" size="lg" className="mt-6">
                    {ep.title}
                  </Heading>
                  <Text className="mt-4">{ep.description}</Text>
                  <Link href={ep.href} className={cn(compactOutlineLinkClasses, "mt-8")}>
                    {ep.cta}
                  </Link>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      {/* ── Industries ────────────────────────────────────────────────────── */}
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

          {sectorOverviews.length > 0 && (
            <Tabs defaultValue={sectorOverviews[0].id} variant="pills" className="mt-10 gap-8">
              <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
                {sectorOverviews.map((sector) => {
                  const Icon = SECTOR_ICON_MAP[sector.id] ?? Factory;
                  return (
                    <TabsTrigger key={sector.id} value={sector.id} className="rounded-full">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {sector.nombre}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {sectorOverviews.map((sector) => {
                const Icon = SECTOR_ICON_MAP[sector.id] ?? Factory;
                return (
                  <TabsContent key={sector.id} value={sector.id}>
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
                            <Text
                              size="sm"
                              tracking="widest"
                              textColor="brand"
                              className="uppercase"
                            >
                              {sector.nombre}
                            </Text>
                            <Heading as="h3" size="xl" className="mt-1">
                              {sector.desafios[0] ?? sector.nombre}
                            </Heading>
                          </div>
                        </div>
                        <Text className="mt-6">{sector.descripcion}</Text>

                        <div className="mt-8 space-y-6">
                          {sector.protocols.length > 0 && (
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
                                {sector.protocols.slice(0, 3).map((protocol) => (
                                  <li
                                    key={protocol.id}
                                    className="flex gap-3 text-sm text-[var(--color-text-secondary)]"
                                  >
                                    <ShieldCheck
                                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]"
                                      aria-hidden="true"
                                    />
                                    <span>
                                      {protocol.codigo} · {protocol.nombre}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {sector.services.length > 0 && (
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
                                {sector.services.slice(0, 4).map((service) => (
                                  <span
                                    key={service.id}
                                    className="rounded-full border border-[var(--color-border-default)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                                  >
                                    {service.nombre}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/store/soluciones?industria=${sector.id}`}
                          className={cn(compactOutlineLinkClasses, "mt-8")}
                        >
                          Encontrar solución para {sector.nombre}
                        </Link>
                      </Card>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {sector.products.slice(0, 6).map((product) => (
                          <Card
                            key={product.id}
                            variant="solid"
                            padding="lg"
                            className="flex h-full flex-col"
                          >
                            <Badge variant="brand" className="w-fit">
                              {CATEGORY_CONFIG[product.categoria]?.label ?? product.categoria}
                            </Badge>
                            <Heading as="h3" size="lg" className="mt-5">
                              {product.nombre}
                            </Heading>
                            <Text className="mt-3 flex-1">{product.resumen}</Text>
                            <Text
                              size="sm"
                              className="mt-4 border-t border-[var(--color-border-subtle)] pt-4"
                            >
                              {product.recomendacionAI ?? product.aplicaciones[0] ?? ""}
                            </Text>
                            <Link
                              href={`/store/${product.id}`}
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
          )}
        </Container>
      </Section>

      {/* ── Products by Category ──────────────────────────────────────────── */}
      <Section background="surface" id="store-products">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Explorar por Categoría</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Productos, equipos y accesorios como sistema de solución
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl">
              La navegación por categoría mantiene el enfoque técnico: propósito, aplicación,
              compatibilidades y relación directa con protocolos y servicios.
            </Text>
          </AnimateIn>

          <Tabs defaultValue={CATEGORY_ORDER[0]} variant="boxed" className="mt-10 gap-8">
            <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
              {CATEGORY_ORDER.map((category) => {
                const cfg = CATEGORY_CONFIG[category];
                const Icon = cfg.icon;
                const count = getStoreProductsByCategory(category).length;
                return (
                  <TabsTrigger key={category} value={category} badge={count}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {cfg.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {CATEGORY_ORDER.map((category) => {
              const cfg = CATEGORY_CONFIG[category];
              const products = getStoreProductsByCategory(category);
              return (
                <TabsContent key={category} value={category}>
                  <Card variant="glass" padding="lg">
                    <div className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-6 md:flex-row md:items-end md:justify-between">
                      <div>
                        <Heading as="h3" size="xl">
                          {cfg.label}
                        </Heading>
                        <Text className="mt-3 max-w-2xl">{cfg.description}</Text>
                      </div>
                      <Link href="/ovi-ai" className={outlineLinkClasses}>
                        Consultar con OVI AI
                      </Link>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                      {products.map((product) => (
                        <Card
                          key={product.id}
                          variant="solid"
                          padding="lg"
                          className="flex h-full flex-col"
                        >
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="default">{cfg.label}</Badge>
                            <Text
                              size="sm"
                              tracking="widest"
                              textColor="tertiary"
                              className="uppercase"
                            >
                              {product.categoria}
                            </Text>
                          </div>
                          <Heading as="h3" size="lg" className="mt-5">
                            {product.nombre}
                          </Heading>
                          <Text className="mt-3 flex-1">{product.resumen}</Text>
                          <div className="mt-6 grid gap-3 text-sm text-[var(--color-text-secondary)] md:grid-cols-2">
                            <div>
                              <Text as="span" size="sm" textColor="primary" weight="semibold">
                                Aplicación
                              </Text>
                              <Text as="p" size="sm" className="mt-1">
                                {product.modoUso}
                              </Text>
                            </div>
                            <div>
                              <Text as="span" size="sm" textColor="primary" weight="semibold">
                                Dilución
                              </Text>
                              <Text as="p" size="sm" className="mt-1">
                                {product.dilucion}
                              </Text>
                            </div>
                          </div>
                          <Link
                            href={`/store/${product.id}`}
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

      {/* ── Featured / Recommended ────────────────────────────────────────── */}
      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Recomendaciones destacadas</Badge>
            <Heading as="h2" size="3xl" className="mt-4">
              Especificaciones pensadas para continuar la conversación de ingeniería
            </Heading>
          </AnimateIn>
          <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} variant="glass" padding="lg" className="h-full">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="accent">
                    {CATEGORY_CONFIG[product.categoria]?.label ?? product.categoria}
                  </Badge>
                  <ArrowRight
                    className="h-4 w-4 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                </div>
                <Heading as="h3" size="lg" className="mt-5">
                  {product.nombre}
                </Heading>
                <Text className="mt-3">{product.resumen}</Text>
                {product.recomendacionAI && (
                  <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-4">
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Diagnóstico OVI AI
                    </Text>
                    <Text size="sm" className="mt-2">
                      {product.recomendacionAI}
                    </Text>
                  </div>
                )}
                <Link href={`/store/${product.id}`} className={cn(compactOutlineLinkClasses, "mt-6")}>
                  Abrir ficha
                </Link>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      {/* ── Future Integrations ───────────────────────────────────────────── */}
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
                {futureIntegrationLabels.map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.03)] px-4 py-5"
                  >
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Futuro
                    </Text>
                    <Heading as="h3" size="md" className="mt-2">
                      {label}
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
                <Link href="/store/soluciones" className={primaryLinkClasses}>
                  Encontrar mi solución
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
