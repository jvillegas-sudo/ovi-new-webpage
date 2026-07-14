import Link from "next/link";
import { Beaker, CheckCircle2, Cog, FlaskConical, Microscope } from "lucide-react";
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
  title: "Metodología",
  description:
    "Descubre el proceso de trabajo, las tecnologías y los estándares de calidad detrás de los servicios de limpieza y química biodegradable de OVI — Ingeniería en Limpieza.",
});

const processSteps = [
  {
    number: "1",
    title: "Diagnóstico",
    description:
      "Evaluación técnica detallada de las necesidades y condiciones del entorno a intervenir.",
  },
  {
    number: "2",
    title: "Formulación",
    description:
      "Selección y preparación de soluciones químicas biodegradables apropiadas para cada caso.",
  },
  {
    number: "3",
    title: "Ejecución",
    description:
      "Aplicación del servicio con personal capacitado, equipos especializados y protocolos de seguridad.",
  },
  {
    number: "4",
    title: "Verificación",
    description:
      "Control de calidad post intervención y seguimiento para garantizar los resultados esperados.",
  },
];

const technologies = [
  {
    icon: Microscope,
    title: "Química Biodegradable",
    description:
      "Utilizamos formulaciones de química verde con alta biodegradabilidad, diseñadas para descomponer contaminantes eficientemente sin dejar residuos tóxicos en el ambiente.",
  },
  {
    icon: FlaskConical,
    title: "Limpieza Técnica Industrial",
    description:
      "Aplicamos técnicas especializadas para cada entorno: plantas industriales, infraestructura civil, post obra y flotas de transporte, adaptando el proceso a las condiciones reales.",
  },
  {
    icon: Cog,
    title: "Buenas Prácticas Ambientales",
    description:
      "Cada servicio incorpora criterios de gestión ambiental responsable: manejo adecuado del agua, clasificación de residuos y uso eficiente de los insumos.",
  },
];

const qualityCommitments = [
  "Personal técnico certificado y con experiencia en entornos industriales",
  "Uso exclusivo de productos biodegradables y de bajo impacto ambiental",
  "Protocolos de seguridad y salud ocupacional en cada intervención",
  "Seguimiento y verificación de resultados al finalizar cada servicio",
];

export default function TechnologyPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Excelencia Operativa</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Nuestra Metodología de Trabajo
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              Nuestro proceso de trabajo convierte el conocimiento técnico y la química responsable
              en soluciones industriales confiables, seguras y con impacto ambiental positivo.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Cómo Trabajamos
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <Card key={step.title} variant="glass" padding="lg" className="h-full">
                <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-primary)]">
                  {step.number}
                </Text>
                <Heading as="h3" size="lg" className="mt-4">
                  {step.title}
                </Heading>
                <Text className="mt-4">{step.description}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Tecnologías y Enfoques
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {technologies.map((item, index) => {
              const Icon = item.icon;
              const colors = [
                "text-[var(--color-brand-accent)]",
                "text-[var(--color-brand-primary)]",
                "text-[var(--color-brand-secondary)]",
              ];

              return (
                <Card key={item.title} variant="glow" padding="lg" className="h-full">
                  <Icon className={`h-12 w-12 ${colors[index]}`} />
                  <Heading as="h3" size="lg" className="mt-6">
                    {item.title}
                  </Heading>
                  <Text className="mt-4">{item.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Beaker className="h-14 w-14 text-[var(--color-brand-primary)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Calidad y Responsabilidad
              </Heading>
              <Text size="lg" className="mt-6">
                OVI desarrolla sus servicios con un estándar de calidad definido por el rigor
                técnico, la responsabilidad ambiental y el compromiso con los resultados. Nuestros
                procesos están alineados con las mejores prácticas de la industria y con los
                requerimientos de cada cliente.
              </Text>
              <Text className="mt-4">
                Desde la formulación hasta la ejecución en campo, priorizamos la trazabilidad, la
                reproducibilidad y la validación basada en evidencia para garantizar una adopción
                segura y efectiva de cada servicio.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="solid" padding="xl">
                <ul className="space-y-5">
                  {qualityCommitments.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                      <Text textColor="primary">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Explore Nuestros Servicios
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Vea cómo nuestra metodología se traduce en resultados industriales concretos en cada
              sector que atendemos.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/solutions">
                <Button size="lg">Ver Servicios</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
