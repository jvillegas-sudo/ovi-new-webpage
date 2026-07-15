import { buildMetadata } from "@lib/metadata";
import { AnimateIn, Badge, Container, Heading, Section, Text } from "@components/ui";
import { CartDisplay } from "@features/store/components/CartDisplay";

export const metadata = buildMetadata({
  title: "Carrito · OVI Catálogo Técnico",
  description:
    "Revisa los productos seleccionados en tu solicitud técnica antes de continuar con el proceso de ingeniería OVI.",
  canonical: "/store/carrito",
  noIndex: true,
});

export default function CarritoPage() {
  return (
    <>
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[4%] left-[2%] h-[400px] w-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.14) 0%, transparent 72%)",
              filter: "blur(90px)",
            }}
          />
        </div>

        <Container className="relative z-10 py-20">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">OVI CATÁLOGO</Badge>
            <Heading as="h1" size="4xl" className="mt-5">
              Tu carrito de soluciones
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.08}>
            <Text size="lg" className="mt-4 max-w-2xl">
              Cada producto en esta lista forma parte de una solución de ingeniería recomendada por
              OVI. Revisa las especificaciones antes de continuar.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <CartDisplay />
        </Container>
      </Section>
    </>
  );
}
