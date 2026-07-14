import Link from "next/link";
import {
  AnimateIn,
  AnimateStagger,
  Badge,
  Button,
  Card,
  CardFooter,
  Container,
  Heading,
  Section,
  Text,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Productos",
  description:
    "Explore el portafolio de productos OVI Ventures: soluciones químicas biodegradables, desengrasantes industriales, desinfectantes y más.",
});

const products = [
  {
    name: "OVI BioClean Pro",
    badge: "Limpieza Industrial",
    badgeVariant: "brand" as const,
    description:
      "Formulación enzimática avanzada para desengrase industrial intensivo y limpieza de superficies. 100% biodegradable y libre de fosfatos.",
  },
  {
    name: "OVI Desengrasante Industrial",
    badge: "Tecnología de Limpieza",
    badgeVariant: "default" as const,
    description:
      "Desengrasante de alto rendimiento formulado para maquinaria, equipos y mantenimiento de líneas de producción.",
  },
  {
    name: "OVI EcoDetox",
    badge: "Química Verde",
    badgeVariant: "accent" as const,
    description:
      "Solución biodegradable para el tratamiento y neutralización de contaminantes en superficies y sustratos industriales.",
  },
  {
    name: "OVI ImperShield",
    badge: "Impermeabilización",
    badgeVariant: "brand" as const,
    description:
      "Tratamiento impermeabilizante para superficies de concreto, ladrillo y mampostería en obras de construcción y edificaciones.",
  },
  {
    name: "OVI FlotaClean",
    badge: "Lavado de Flota",
    badgeVariant: "accent" as const,
    description:
      "Producto especializado para el lavado de vehículos de carga y flota industrial, con criterios de buenas prácticas ambientales.",
  },
  {
    name: "OVI Formulación Personalizada",
    badge: "A la Medida",
    badgeVariant: "default" as const,
    description:
      "Servicio de formulación personalizada — desarrollamos productos específicamente adaptados a sus requerimientos operativos y ambientales.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Portafolio de Productos</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Nuestros Productos
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              Explore un portafolio diseñado para brindar rendimiento industrial, responsabilidad
              ambiental y valor operativo adaptado a múltiples aplicaciones.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Formulados para el Rendimiento
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.name}
                variant="solid"
                padding="lg"
                className="flex h-full flex-col"
              >
                <Badge variant={product.badgeVariant} size="md" className="w-fit">
                  {product.badge}
                </Badge>
                <Heading as="h3" size="lg" className="mt-6">
                  {product.name}
                </Heading>
                <Text className="mt-4 flex-1">{product.description}</Text>
                <CardFooter className="justify-start">
                  <Link href="/contact">
                    <Button variant="outline" size="sm">
                      Solicitar Información
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              ¿Necesita Algo Específico?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Nuestro servicio de formulación personalizada le ayuda a resolver retos específicos
              de proceso con productos diseñados a la medida de sus requerimientos.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Contactar al Equipo</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
