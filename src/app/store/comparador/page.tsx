import { AnimateIn, Badge, Container, Heading, Section, Text } from "@components/ui";
import { buildMetadata } from "@lib/metadata";
import { getStoreProducts, getStoreProductContext } from "@features/store/store-engine";
import { ComparadorClient } from "@features/store/components/ComparadorClient";

export const metadata = buildMetadata({
  title: "Comparador de soluciones · OVI Catálogo Técnico",
  description:
    "Compara hasta 3 soluciones técnicas OVI lado a lado. Sectores, superficies, protocolos, servicios y especificaciones en una sola vista.",
  canonical: "/store/comparador",
  keywords: [
    "comparador de productos",
    "OVI Catálogo Técnico",
    "comparar soluciones",
    "ingeniería en limpieza",
  ],
});

export default function ComparadorPage() {
  const products = getStoreProducts();

  // Build full context for all products — passed to client comparator
  const availableProducts = products.flatMap((p) => {
    const ctx = getStoreProductContext(p.id);
    if (!ctx) return [];
    return [
      {
        product: ctx.product,
        protocols: ctx.protocols,
        services: ctx.services,
        equipment: ctx.equipment,
        sectors: ctx.sectors,
        contamination: ctx.contamination,
        surfaces: ctx.surfaces,
      },
    ];
  });

  return (
    <>
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[6%] left-[4%] h-[480px] w-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.16) 0%, transparent 72%)",
              filter: "blur(96px)",
            }}
          />
          <div
            className="absolute right-[6%] bottom-[8%] h-[340px] w-[340px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.12) 0%, transparent 72%)",
              filter: "blur(110px)",
            }}
          />
        </div>

        <Container className="relative z-10 py-24">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">COMPARADOR DE SOLUCIONES</Badge>
            <Heading as="h1" size="4xl" className="mt-5 max-w-4xl">
              Compara soluciones técnicas antes de decidir
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-5 max-w-3xl text-balance">
              Selecciona hasta 3 productos para comparar especificaciones, protocolos, servicios y
              sectores de aplicación en una sola vista. Todos los datos provienen del Knowledge
              Engine OVI.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <ComparadorClient availableProducts={availableProducts} />
        </Container>
      </Section>
    </>
  );
}
