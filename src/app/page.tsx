import Link from "next/link";
import {
  CheckCircle2,
  Cpu,
  Factory,
  Wrench,
  Sparkles,
  Bot,
  MonitorSmartphone,
  TrendingUp,
} from "lucide-react";
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
import { HomeCinematicJourney } from "@features/home/HomeCinematicJourney";
import { EngineeringJourneyExperience } from "@features/engineering-journey/EngineeringJourneyExperience";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Inicio",
  description:
    "OVI — Ingeniería en Limpieza. Diseñamos soluciones integrales para resolver desafíos de limpieza, mantenimiento e higiene mediante diagnóstico técnico, protocolos especializados, servicios y tecnología aplicada.",
});

const localizedContent = {
  es: {
    hero: {
      badge: "OVI — Ingeniería en Limpieza",
      title: "INGENIERÍA EN LIMPIEZA",
      subtitle:
        "Diseñamos soluciones integrales para resolver desafíos de limpieza, mantenimiento e higiene mediante diagnóstico técnico, protocolos especializados, servicios y tecnología aplicada.",
      story: [
        "Una gota de agua aparece.",
        "Esa gota se transforma en energía operativa.",
        "La energía evoluciona a inteligencia operacional.",
        "La inteligencia se convierte en soluciones industriales reales.",
      ],
    },
  },
  en: {
    // TODO: Activar cuando la localización EN sea aprobada oficialmente desde el contenido maestro en español.
    hero: {
      badge: "OVI — Cleaning Engineering",
      title: "CLEANING ENGINEERING",
      subtitle:
        "We design intelligent solutions to solve cleaning, maintenance, and hygiene challenges through specialized products, services, technology, artificial intelligence, and OVI OS.",
      story: [
        "A single drop of water appears.",
        "That drop transforms into operational energy.",
        "Energy evolves into operational intelligence.",
        "Intelligence turns into real industrial solutions.",
      ],
    },
  },
} as const;

const content = localizedContent.es;

const identityStats = [
  { value: "360°", label: "Integración operativa" },
  { value: "IA + OVI OS", label: "Tecnología aplicada" },
  { value: "Protocolos", label: "Ejecución estandarizada" },
  { value: "Resultados", label: "Impacto medible" },
];

const sectors = [
  {
    icon: Factory,
    color: "text-[var(--color-brand-primary)]",
    title: "Transporte y Flotas",
    description:
      "Limpieza técnica de flotas con reducción de tiempos de ciclo, menor consumo hídrico y trazabilidad operativa.",
  },
  {
    icon: Cpu,
    color: "text-[var(--color-brand-secondary)]",
    title: "Industria y Manufactura",
    description:
      "Estandarización de limpieza técnica para continuidad operativa y control de calidad en entornos industriales.",
  },
  {
    icon: MonitorSmartphone,
    color: "text-[var(--color-brand-accent)]",
    title: "Institucional",
    description:
      "Protocolos de higiene y mantenimiento para instalaciones de alta densidad de uso y exigencia institucional.",
  },
  {
    icon: Wrench,
    color: "text-[var(--color-brand-primary)]",
    title: "Hospitales y Salud",
    description:
      "Soluciones de limpieza crítica con validación técnica para entornos hospitalarios y de atención médica.",
  },
  {
    icon: TrendingUp,
    color: "text-[var(--color-brand-secondary)]",
    title: "Energía e Infraestructura",
    description:
      "Gestión de limpieza para activos críticos de energía, con foco en seguridad operativa y continuidad.",
  },
  {
    icon: Sparkles,
    color: "text-[var(--color-brand-accent)]",
    title: "Retail y Comercio",
    description:
      "Programas de higiene y presentación para espacios comerciales con alta rotación y exigencia visual.",
  },
  {
    icon: CheckCircle2,
    color: "text-[var(--color-brand-primary)]",
    title: "Alimentos y Bebidas",
    description:
      "Protocolos HACCP-compatibles para plantas de alimentos con exigencias sanitarias de máximo nivel.",
  },
];

const services = [
  "Diagnóstico técnico de limpieza, mantenimiento e higiene",
  "Diseño de protocolos operativos por tipo de instalación",
  "Implementación en campo con control de desempeño",
  "Capacitación y acompañamiento técnico continuo",
];

const products = [
  "Productos especializados definidos como resultado del diagnóstico técnico",
  "Equipamiento y herramientas seleccionados según protocolo y nivel de riesgo",
  "Soluciones adaptadas por tipo de superficie, proceso, sector y objetivo operativo",
  "Integración de producto + método + control de resultados para continuidad operativa",
];

const engineeringPillars = [
  "Ingeniería aplicada para resolver problemas complejos de limpieza",
  "Tecnología y datos para decisiones operativas inteligentes",
  "Protocolos, productos y servicios diseñados como un solo sistema",
  "Sostenibilidad con impacto medible en operación real",
];

const sustainabilityImpact = [
  { value: "Ahorro de agua", label: "Reducción de consumo hídrico por operación" },
  { value: "Optimización de procesos", label: "Menos reprocesos y mayor eficiencia" },
  { value: "Reducción del consumo químico", label: "Uso técnico y controlado de insumos" },
  { value: "Mayor productividad", label: "Más rendimiento operativo con menos recursos" },
  { value: "Menor impacto ambiental", label: "Operación más limpia y responsable" },
];

const successCases = [
  {
    title: "Caso 01 — Operación industrial multi-sitio",
    detail:
      "Estandarización de protocolos y mejora de control operativo en múltiples instalaciones.",
  },
  {
    title: "Caso 02 — Flota de transporte de alto uso",
    detail: "Reducción de tiempos de limpieza y menor consumo de agua por unidad atendida.",
  },
  {
    title: "Caso 03 — Infraestructura crítica",
    detail: "Implementación de limpieza técnica con trazabilidad e indicadores por proceso.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeCinematicJourney hero={content.hero} />

      {/* Experience Order 002 — The Engineering Journey */}
      <EngineeringJourneyExperience />

      <Section background="elevated" padding="md">
        <Container>
          <AnimateStagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {identityStats.map((stat) => (
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
              <Badge variant="accent">Quiénes Somos</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                Integramos ingeniería, tecnología y operación para transformar la limpieza
              </Heading>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.2}>
              <Text size="lg" align="center" className="mt-4">
                OVI integra ingeniería, tecnología, productos, servicios, protocolos, inteligencia
                operacional y sostenibilidad para resolver desafíos complejos de limpieza,
                mantenimiento e higiene con una visión integral y de largo plazo.
              </Text>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Badge variant="brand">Ingeniería en Limpieza</Badge>
              <Heading as="h2" size="4xl" className="mt-4">
                OVI no solo limpia. OVI diseña soluciones de ingeniería en limpieza.
              </Heading>
              <Text size="lg" className="mt-6">
                Cada proyecto combina diagnóstico técnico, diseño operativo, protocolos, tecnología
                e implementación en campo para generar resultados consistentes y medibles.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <div className="glass rounded-2xl border border-[var(--color-border-default)] p-8">
                <ul className="space-y-5">
                  {engineeringPillars.map((item) => (
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

      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">Sectores</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                Soluciones diseñadas para distintos entornos operativos
              </Heading>
            </AnimateIn>
          </div>
          <AnimateStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectors.map((card) => {
              const Icon = card.icon;

              return (
                <Card key={card.title} variant="glow" padding="md" className="flex h-full flex-col">
                  <Icon className={`h-8 w-8 ${card.color}`} />
                  <Heading as="h3" size="md" className="mt-4">
                    {card.title}
                  </Heading>
                  <Text size="sm" className="mt-2 flex-1">
                    {card.description}
                  </Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="brand">Servicios</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                Diseño, ejecución y mejora continua de su operación
              </Heading>
            </AnimateIn>
          </div>
          <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service} variant="glass" padding="lg" className="flex items-start gap-4">
                <Wrench className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
                <Text textColor="primary" weight="medium">
                  {service}
                </Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">Productos</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                El producto correcto aparece después del diagnóstico correcto
              </Heading>
            </AnimateIn>
          </div>
          <AnimateStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Card key={product} variant="solid" padding="lg">
                <Text textColor="primary" weight="medium">
                  {product}
                </Text>
              </Card>
            ))}
          </AnimateStagger>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/store">
                <Button size="lg">Ir al catálogo técnico</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="brand">OVI AI</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                Pregúntele a OVI AI
              </Heading>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.2}>
              <Text size="lg" align="center" className="mx-auto mt-4 max-w-2xl">
                Describa su desafío y descubra la solución recomendada.
              </Text>
            </AnimateIn>
          </div>
          <AnimateIn animation="slideUp" delay={0.3}>
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="glass rounded-2xl border border-[var(--color-border-default)] p-5">
                <div className="flex items-center gap-3 border-b border-[var(--color-border-default)] pb-4">
                  <Bot className="h-5 w-5 text-[var(--color-brand-primary)]" />
                  <Text weight="medium">Vista previa premium de interacción</Text>
                </div>
                <textarea
                  className="mt-4 h-28 w-full resize-none rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 text-sm text-[var(--color-text-primary)] transition-colors outline-none placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-brand-primary)]"
                  placeholder="Ejemplo: Necesito limpiar una flota de buses con menor consumo de agua."
                  disabled
                  aria-label="Vista previa de consulta para OVI AI"
                />
                <Text size="sm" className="mt-3">
                  OVI AI estará disponible próximamente. Esta sección prepara la experiencia de
                  interacción.
                </Text>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Badge variant="accent">OVI OS</Badge>
              <Heading as="h2" size="4xl" className="mt-4">
                Centro operativo inteligente para su gestión de limpieza
              </Heading>
              <Text size="lg" className="mt-6">
                OVI OS centraliza información, indicadores operativos y recomendaciones inteligentes
                para elevar el control, la trazabilidad y la toma de decisiones.
              </Text>
              <div className="mt-8">
                <Link href="/technology">
                  <Button size="lg">Conocer OVI OS</Button>
                </Link>
              </div>
            </AnimateIn>
            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glow" padding="lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-[var(--color-brand-primary)]" />
                    <Text textColor="primary" weight="medium">
                      Indicadores operativos en una sola vista
                    </Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[var(--color-brand-accent)]" />
                    <Text textColor="primary" weight="medium">
                      Recomendaciones inteligentes basadas en operación real
                    </Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-[var(--color-brand-secondary)]" />
                    <Text textColor="primary" weight="medium">
                      Integración entre protocolos, servicios, productos y ejecución
                    </Text>
                  </div>
                </div>
              </Card>
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
              Impacto medible para su operación y el entorno
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-3xl">
              Diseñamos soluciones que combinan productividad y responsabilidad ambiental con
              resultados verificables en consumo de agua, uso químico, eficiencia operativa e
              impacto ambiental.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sustainabilityImpact.map((stat) => (
              <Card key={stat.label} variant="glass" padding="lg" className="text-center">
                <Text as="p" size="lg" weight="bold" className="text-[var(--color-brand-accent)]">
                  {stat.value}
                </Text>
                <Text className="mt-3">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>

          <AnimateIn animation="slideUp" delay={0.3}>
            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg">Explorar Soluciones</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="base">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Casos de Éxito</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h2" size="3xl" align="center">
              Resultados reales en entornos de alta exigencia operativa
            </Heading>
          </AnimateIn>
          <AnimateStagger className="mt-10 grid gap-6 md:grid-cols-3">
            {successCases.map((item) => (
              <Card key={item.title} variant="glass" padding="lg" className="text-left">
                <Heading as="h3" size="md">
                  {item.title}
                </Heading>
                <Text className="mt-3">{item.detail}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Contacto
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-2xl">
              Conversemos sobre su operación y diseñemos la solución adecuada para sus desafíos de
              limpieza, mantenimiento e higiene.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">▶ Iniciar la Experiencia</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Hablar con un Ingeniero
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
