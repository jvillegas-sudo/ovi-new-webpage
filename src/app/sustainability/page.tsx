import Link from "next/link";
import { Leaf, RefreshCw, Wind } from "lucide-react";
import {
  AnimateIn,
  AnimateStagger,
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Section,
  Text,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Sostenibilidad",
  description:
    "Descubre cómo OVI Ventures integra la sostenibilidad en sus productos, servicios y buenas prácticas ambientales en cada proyecto.",
});

const pillars = [
  {
    icon: Leaf,
    color: "text-[var(--color-brand-accent)]",
    title: "100% Biodegradable",
    description:
      "Todas nuestras formulaciones están diseñadas para degradarse naturalmente sin dejar residuos tóxicos en el suelo ni en el agua.",
  },
  {
    icon: Wind,
    color: "text-[var(--color-brand-primary)]",
    title: "Huella de Carbono Reducida",
    description:
      "Reducimos las emisiones de carbono a lo largo del ciclo de vida de nuestros productos mediante química más limpia y procesos más eficientes.",
  },
  {
    icon: RefreshCw,
    color: "text-[var(--color-brand-secondary)]",
    title: "Economía Circular",
    description:
      "Transformamos residuos en recursos, promoviendo un modelo industrial de circuito cerrado donde sea posible, especialmente en el lavado de flota.",
  },
];

const impactStats = [
  { value: "100%", label: "Garantía de fórmulas biodegradables" },
  { value: "Cero", label: "Subproductos químicos tóxicos" },
  { value: "3", label: "Líneas de negocio con criterios ambientales integrados" },
  { value: "Activo", label: "Compromiso ambiental en cada proyecto" },
];

export default function SustainabilityPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Compromiso Ambiental</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" gradient="bio" align="center" className="mt-4">
              Ciencia para un Futuro Sostenible
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              Diseñamos pensando en el planeta desde la primera formulación hasta el resultado
              final, asegurando que la sostenibilidad esté integrada en cada solución que
              desarrollamos.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Heading as="h2" size="4xl">
                Nuestro Compromiso Ambiental
              </Heading>
              <Text size="lg" className="mt-6">
                En OVI Ventures la sostenibilidad comienza mucho antes de que un producto llegue al
                campo. Integramos pensamiento de ciclo de vida, química más segura e innovación en
                nuestros procesos desde el inicio, para que la responsabilidad ambiental sea parte
                esencial y no un añadido posterior.
              </Text>
              <Text className="mt-4">
                Ese enfoque ayuda a nuestros clientes a reducir residuos, bajar emisiones y alejarse
                de formulaciones tradicionales que generan costos ecológicos evitables. Las buenas
                prácticas ambientales no son una opción: son parte del estándar de trabajo.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glass" padding="xl">
                <Text
                  as="p"
                  size="xl"
                  weight="semibold"
                  className="text-[var(--color-brand-accent)]"
                >
                  &ldquo;El rendimiento y la sostenibilidad deben reforzarse mutuamente. Esa
                  convicción está en el centro de cada servicio y producto OVI.&rdquo;
                </Text>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Tres Pilares de Sostenibilidad
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <Card key={pillar.title} variant="glow" padding="lg" className="h-full">
                  <Icon className={`h-12 w-12 ${pillar.color}`} />
                  <Heading as="h3" size="lg" className="mt-6">
                    {pillar.title}
                  </Heading>
                  <Text className="mt-4">{pillar.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Impacto Medible
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Card key={stat.label} variant="solid" padding="lg" className="text-center">
                <Text
                  as="p"
                  size="xl"
                  weight="bold"
                  className={
                    index % 2 === 0
                      ? "text-[var(--color-brand-accent)]"
                      : "text-[var(--color-brand-primary)]"
                  }
                >
                  {stat.value}
                </Text>
                <Text className="mt-3">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Únase a la Revolución Sostenible
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Trabaje con OVI Ventures para acelerar operaciones más limpias y un crecimiento
              industrial más responsable con el medio ambiente.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Contáctenos</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
