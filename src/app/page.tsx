import Link from "next/link";
import { ChevronDown, CheckCircle2, FlaskConical, Truck, Building2 } from "lucide-react";
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
  title: "Inicio",
  description:
    "OVI Ventures ofrece soluciones químicas biodegradables, limpieza industrial e infraestructura, y lavado de flota con buenas prácticas ambientales.",
});

const stats = [
  { value: "3", label: "Líneas de Negocio" },
  { value: "100%", label: "Fórmulas Biodegradables" },
  { value: "Industrial", label: "Alcance Sectorial" },
  { value: "Verde", label: "Compromiso Ambiental" },
];

const solutionCards = [
  {
    icon: FlaskConical,
    color: "text-[var(--color-brand-primary)]",
    title: "Soluciones Químicas Biodegradables",
    description:
      "Producción y comercialización de soluciones químicas biodegradables de alto rendimiento para la industria, formuladas para maximizar el desempeño minimizando el impacto ambiental.",
    href: "/solutions",
  },
  {
    icon: Building2,
    color: "text-[var(--color-brand-accent)]",
    title: "Limpieza Industrial e Infraestructura",
    description:
      "Limpieza industrial, de infraestructura, post obra gruesa y fina, e impermeabilización. Soluciones integrales para cada etapa constructiva y de mantenimiento.",
    href: "/solutions",
  },
  {
    icon: Truck,
    color: "text-[var(--color-brand-secondary)]",
    title: "Lavado de Flota Industrial",
    description:
      "Lavado especializado de flota industrial de transporte, incorporando buenas prácticas ambientales para el cuidado del vehículo y del entorno.",
    href: "/solutions",
  },
];

const differentiators = [
  "Productos 100% biodegradables y seguros",
  "Procesos alineados con buenas prácticas ambientales",
  "Cobertura industrial integral: desde fábricas hasta flotas",
  "Equipo técnico especializado en limpieza industrial",
];

const sustainabilityStats = [
  { value: "100%", label: "Fórmulas biodegradables" },
  { value: "Cero", label: "Residuos tóxicos" },
  { value: "Verde", label: "Prácticas ambientales responsables" },
];

export default function HomePage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[20%] left-[10%] h-[600px] w-[600px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
              animationDuration: "4s",
            }}
          />
          <div
            className="absolute right-[15%] bottom-[25%] h-[420px] w-[420px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.22) 0%, transparent 70%)",
              filter: "blur(100px)",
              animationDuration: "6s",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute top-[12%] right-[25%] h-[320px] w-[320px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,71,171,0.18) 0%, transparent 70%)",
              filter: "blur(90px)",
              animationDuration: "5s",
              animationDelay: "1s",
            }}
          />
        </div>

        <Container className="relative z-10 py-28 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand" size="lg">
              Limpieza Industrial &amp; Química Biodegradable
            </Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
              <span className="block">Limpieza Profesional.</span>
              <span className="block">Sosteniblemente Hecha.</span>
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl text-balance">
              OVI Ventures desarrolla soluciones químicas biodegradables, servicios de limpieza
              industrial e infraestructura, y lavado de flota industrial con buenas prácticas
              ambientales para impulsar un sector productivo más limpio y responsable.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/solutions">
                <Button size="lg">Ver Servicios</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Conócenos
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} style={{ color: "var(--color-text-tertiary)" }} />
        </div>
      </Section>

      <Section background="elevated" padding="md">
        <Container>
          <AnimateStagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} variant="solid" padding="lg" className="text-center">
                <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-primary)]">
                  {stat.value}
                </Text>
                <Text className="mt-2">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">Lo Que Hacemos</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                Tres Líneas de Negocio, Un Solo Compromiso
              </Heading>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.2}>
              <Text size="lg" align="center" className="mt-4">
                Desde la formulación química biodegradable hasta la limpieza de grandes
                infraestructuras y flotas de transporte, ofrecemos soluciones integrales con impacto
                ambiental positivo.
              </Text>
            </AnimateIn>
          </div>

          <AnimateStagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <Card key={card.title} variant="glow" padding="lg" className="flex h-full flex-col">
                  <Icon className={`h-12 w-12 ${card.color}`} />
                  <Heading as="h3" size="lg" className="mt-6">
                    {card.title}
                  </Heading>
                  <Text className="mt-4 flex-1">{card.description}</Text>
                  <Link
                    href={card.href}
                    className="mt-8 inline-flex text-sm font-medium text-[var(--color-brand-primary)] transition-colors hover:text-white"
                  >
                    Conocer más →
                  </Link>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Badge variant="brand">¿Por Qué OVI?</Badge>
              <Heading as="h2" size="4xl" className="mt-4">
                Soluciones diseñadas para el sector industrial y el cuidado del planeta
              </Heading>
              <Text size="lg" className="mt-6">
                Combinamos química verde, experiencia técnica y responsabilidad ambiental para
                ofrecer servicios que no solo limpian mejor, sino que cuidan el entorno donde
                operamos. Cada producto y proceso está pensado para reducir el impacto ecológico sin
                sacrificar rendimiento.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <div className="glass rounded-2xl border border-[var(--color-border-default)] p-8">
                <ul className="space-y-5">
                  {differentiators.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                      <Text textColor="primary" weight="medium">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="surface" className="border-t border-[rgba(0,255,133,0.4)]">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Sostenibilidad</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h2" size="4xl" align="center" className="mt-4">
              Comprometidos con un Planeta más Limpio
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-3xl">
              La sostenibilidad no es un complemento; está en el centro de todo lo que hacemos.
              Diseñamos nuestros productos y procesos para generar el menor impacto posible en el
              ecosistema, promoviendo buenas prácticas ambientales en cada proyecto.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {sustainabilityStats.map((stat) => (
              <Card key={stat.label} variant="glass" padding="lg" className="text-center">
                <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-accent)]">
                  {stat.value}
                </Text>
                <Text className="mt-3">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>

          <AnimateIn animation="slideUp" delay={0.3}>
            <div className="mt-10">
              <Link href="/sustainability">
                <Button size="lg">Ver Sostenibilidad</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              ¿Listo para transformar sus operaciones?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-2xl">
              Construyamos juntos un modelo operativo más limpio, eficiente y ambientalmente
              responsable.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Contáctenos</Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" size="lg">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
