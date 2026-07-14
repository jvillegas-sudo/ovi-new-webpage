import Link from "next/link";
import { FlaskConical, Leaf, Shield, Users } from "lucide-react";
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
  title: "Nosotros",
  description:
    "Conoce OVI — Ingeniería en Limpieza, nuestra misión, valores y el camino que nos llevó a ser referentes en limpieza industrial y soluciones químicas biodegradables.",
});

const values = [
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description:
      "Desarrollamos cada servicio y producto con estrictos estándares técnicos y validación de desempeño. La confiabilidad en entornos industriales exigentes es parte fundamental de nuestra propuesta.",
  },
  {
    icon: Leaf,
    title: "Compromiso Ambiental",
    description:
      "Nuestras formulaciones están diseñadas para reducir residuos nocivos, favorecer la biodegradabilidad y mejorar el impacto ambiental. Las buenas prácticas ecológicas guían cada decisión.",
  },
  {
    icon: FlaskConical,
    title: "Innovación Técnica",
    description:
      "Combinamos química verde, experiencia en limpieza industrial y procesos eficientes para resolver retos operativos complejos. La innovación nace en el laboratorio y se consolida en el campo.",
  },
  {
    icon: Users,
    title: "Alianza con la Industria",
    description:
      "Trabajamos de la mano con operadores, ingenieros y tomadores de decisión para crear resultados concretos. Las alianzas de largo plazo nos permiten ajustar soluciones a cada entorno.",
  },
];

const milestones = [
  {
    title: "Nacimos con una visión",
    description:
      "Fundados para integrar química biodegradable con las necesidades reales de la industria y el transporte.",
  },
  {
    title: "Primera línea de productos",
    description: "Lanzamiento de soluciones químicas biodegradables para limpieza industrial.",
  },
  {
    title: "Expansión de servicios",
    description:
      "Ampliamos nuestra cobertura hacia limpieza de infraestructura, post obra y lavado de flota.",
  },
  {
    title: "Impacto sectorial",
    description:
      "Apoyando a empresas e industrias con soluciones limpias, eficientes y ambientalmente responsables.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Nuestra Historia</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Sobre OVI
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              OVI nació con una misión clara: llevar ciencia responsable, innovación sostenible y
              excelencia técnica al corazón de la limpieza industrial y la producción de soluciones
              químicas biodegradables.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Heading as="h2" size="4xl">
                Nuestra Misión
              </Heading>
              <Text size="lg" className="mt-6">
                Creamos soluciones industriales de limpieza y química biodegradable que elevan los
                estándares operativos reduciendo la huella ambiental. Integrando química verde,
                procesos eficientes y buenas prácticas, ayudamos a las empresas a modernizarse sin
                comprometer la sostenibilidad.
              </Text>
              <Text className="mt-4">
                Nuestro trabajo está anclado en la aplicación práctica. Cada producto y servicio
                está diseñado para resolver problemas medibles en limpieza industrial, post obra,
                impermeabilización y lavado de flota de transporte.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glow" padding="xl" className="border border-[rgba(0,255,133,0.3)]">
                <Text
                  as="p"
                  size="xl"
                  weight="semibold"
                  className="text-[var(--color-brand-accent)]"
                >
                  &ldquo;Creemos que el futuro de la industria depende de soluciones que sean
                  altamente efectivas e inherentemente responsables con el medio ambiente.&rdquo;
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
              Nuestros Valores
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Card key={value.title} variant="glass" padding="lg" className="h-full">
                  <Icon className="h-10 w-10 text-[var(--color-brand-primary)]" />
                  <Heading as="h3" size="lg" className="mt-6">
                    {value.title}
                  </Heading>
                  <Text className="mt-4">{value.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container size="lg">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Nuestro Recorrido
            </Heading>
          </AnimateIn>

          <div className="mx-auto mt-14 max-w-3xl space-y-8 border-l border-[var(--color-border-default)] pl-8">
            {milestones.map((milestone, index) => (
              <AnimateIn key={milestone.title} animation="slideUp" delay={index * 0.08}>
                <div className="relative">
                  <span className="absolute top-1 -left-[2.15rem] h-4 w-4 rounded-full border-4 border-[var(--color-bg-surface)] bg-[var(--color-brand-primary)]" />
                  <Heading as="h3" size="lg">
                    {milestone.title}
                  </Heading>
                  <Text className="mt-2">{milestone.description}</Text>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Trabaje con OVI
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Cuente con un equipo que entiende el equilibrio entre desempeño técnico, realidad
              operativa y responsabilidad ambiental.
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
