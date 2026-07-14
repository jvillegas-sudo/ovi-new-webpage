import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  FlaskConical,
  Truck,
  Droplets,
  HardHat,
  Factory,
  ShieldCheck,
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
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Servicios",
  description:
    "Conoce los servicios de OVI — Ingeniería en Limpieza: soluciones químicas biodegradables, limpieza industrial e infraestructura, y lavado de flota industrial.",
});

const chimicaBeneficios = [
  "Formulaciones biodegradables de alto rendimiento",
  "Producción y comercialización a escala industrial",
  "Compatibles con normativas ambientales vigentes",
  "Adaptables a diferentes sectores productivos",
];

const limpiezaBeneficios = [
  "Limpieza industrial profunda en plantas y fábricas",
  "Mantenimiento de infraestructura civil y edificaciones",
  "Post obra: limpieza gruesa, fina e impermeabilización",
  "Equipos especializados con protocolos de seguridad",
];

const flotaBeneficios = [
  "Lavado especializado de vehículos industriales y de carga",
  "Uso de productos biodegradables en cada proceso",
  "Gestión responsable del agua y residuos generados",
  "Implementación de buenas prácticas ambientales certificables",
];

const sectores = [
  {
    icon: Factory,
    name: "Manufactura e Industria",
    description:
      "Limpieza profunda y mantenimiento de plantas y equipos industriales en operación.",
  },
  {
    icon: HardHat,
    name: "Construcción y Obra",
    description:
      "Servicios de limpieza post obra gruesa, fina e impermeabilización de estructuras.",
  },
  {
    icon: Truck,
    name: "Transporte y Logística",
    description:
      "Lavado de flotas de camiones, buses y vehículos de carga con criterios ambientales.",
  },
  {
    icon: Droplets,
    name: "Infraestructura Pública",
    description: "Limpieza y mantenimiento de infraestructura civil, vial y de servicios públicos.",
  },
  {
    icon: ShieldCheck,
    name: "Salud y Saneamiento",
    description:
      "Soluciones de higiene y desinfección para instalaciones de salud y espacios críticos.",
  },
  {
    icon: Building2,
    name: "Comercio e Inmobiliario",
    description: "Limpieza integral de centros comerciales, oficinas y complejos corporativos.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Nuestros Servicios</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Soluciones para Cada Necesidad Industrial
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              Combinamos química biodegradable, experiencia en limpieza industrial y buenas
              prácticas ambientales para ofrecer soluciones que marcan la diferencia en cada
              proyecto.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <FlaskConical className="h-16 w-16 text-[var(--color-brand-primary)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Soluciones Químicas Biodegradables
              </Heading>
              <Text className="mt-6">
                OVI produce y comercializa soluciones químicas biodegradables de alto rendimiento
                para la industria. Nuestros productos están formulados con materia prima de calidad
                y diseñados para maximizar la eficacia en cada aplicación mientras minimizan el
                impacto ambiental.
              </Text>
              <Text className="mt-4">
                Trabajamos con sectores productivos que requieren limpiadores, desengrasantes,
                desinfectantes y productos de mantenimiento que cumplan con estándares industriales
                sin comprometer el ecosistema.
              </Text>
              <div className="mt-8 space-y-4">
                {chimicaBeneficios.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                    <Text textColor="primary">{benefit}</Text>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glow" padding="xl">
                <Text
                  size="sm"
                  weight="semibold"
                  tracking="widest"
                  className="text-[var(--color-brand-primary)] uppercase"
                >
                  Ventajas Clave
                </Text>
                <div className="mt-8 space-y-6">
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Alto rendimiento
                    </Text>
                    <Text className="mt-2">
                      Formulaciones concentradas que optimizan el uso y reducen costos.
                    </Text>
                  </div>
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Química responsable
                    </Text>
                    <Text className="mt-2">
                      Diseñadas para degradarse de forma natural sin residuos tóxicos.
                    </Text>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-[var(--glass-bg)] p-4">
                      <Text as="p" weight="bold" className="text-[var(--color-brand-primary)]">
                        100%
                      </Text>
                      <Text size="sm">Fórmulas biodegradables</Text>
                    </div>
                    <div className="rounded-xl bg-[var(--glass-bg)] p-4">
                      <Text as="p" weight="bold" className="text-[var(--color-brand-primary)]">
                        Industrial
                      </Text>
                      <Text size="sm">Capacidad productiva a escala</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight" className="lg:order-1">
              <Card variant="glass" padding="xl">
                <Text
                  size="sm"
                  weight="semibold"
                  tracking="widest"
                  className="text-[var(--color-brand-accent)] uppercase"
                >
                  Cobertura de Servicio
                </Text>
                <div className="mt-8 space-y-6">
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Limpieza integral
                    </Text>
                    <Text className="mt-2">
                      Desde plantas industriales hasta edificaciones post construcción.
                    </Text>
                  </div>
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Impermeabilización
                    </Text>
                    <Text className="mt-2">
                      Tratamientos técnicos para proteger estructuras a largo plazo.
                    </Text>
                  </div>
                  <div className="rounded-xl bg-[var(--glass-bg)] p-4">
                    <Text as="p" weight="bold" className="text-[var(--color-brand-accent)]">
                      Equipo especializado
                    </Text>
                    <Text size="sm">
                      Personal capacitado en seguridad industrial y técnicas de limpieza avanzadas.
                    </Text>
                  </div>
                </div>
              </Card>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1} className="lg:order-2">
              <Building2 className="h-16 w-16 text-[var(--color-brand-accent)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Limpieza Industrial e Infraestructura
              </Heading>
              <Text className="mt-6">
                Ofrecemos servicios profesionales de limpieza industrial, de infraestructura y post
                obra. Nuestro equipo está capacitado para intervenir en entornos de alta exigencia,
                asegurando resultados de calidad en cada etapa del proceso.
              </Text>
              <Text className="mt-4">
                Desde la limpieza gruesa posterior a la construcción hasta la limpieza fina de
                acabados y la impermeabilización de superficies, cubrimos todo el ciclo con
                soluciones técnicas y ambientalmente responsables.
              </Text>
              <div className="mt-8 space-y-4">
                {limpiezaBeneficios.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                    <Text textColor="primary">{benefit}</Text>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Truck className="h-16 w-16 text-[var(--color-brand-secondary)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Lavado de Flota Industrial
              </Heading>
              <Text className="mt-6">
                Desarrollamos el lavado de flota industrial de transporte con un enfoque en buenas
                prácticas ambientales. Nuestro proceso garantiza vehículos en óptimas condiciones de
                higiene y presentación, mientras implementamos medidas responsables en el manejo del
                agua y los residuos generados.
              </Text>
              <Text className="mt-4">
                Trabajamos con empresas de transporte, logística y distribución que quieren mantener
                su flota impecable sin generar un impacto ambiental negativo. Cada lavado es una
                oportunidad de reforzar buenas prácticas.
              </Text>
              <div className="mt-8 space-y-4">
                {flotaBeneficios.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                    <Text textColor="primary">{benefit}</Text>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="solid" padding="xl">
                <Text
                  size="sm"
                  weight="semibold"
                  tracking="widest"
                  className="text-[var(--color-brand-secondary)] uppercase"
                >
                  Nuestro Proceso
                </Text>
                <ol className="mt-8 space-y-6">
                  {[
                    "Evaluación del estado y necesidades de la flota",
                    "Prelavado y eliminación de suciedad pesada",
                    "Aplicación de productos biodegradables especializados",
                    "Enjuague y manejo responsable del agua residual",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--glass-bg)] font-semibold text-[var(--color-brand-secondary)]">
                        {index + 1}
                      </span>
                      <Text textColor="primary">{step}</Text>
                    </li>
                  ))}
                </ol>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Sectores que Atendemos
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sectores.map((sector) => {
              const Icon = sector.icon;

              return (
                <Card key={sector.name} variant="glass" padding="lg" className="h-full">
                  <Icon className="h-10 w-10 text-[var(--color-brand-primary)]" />
                  <Heading as="h3" size="lg" className="mt-6">
                    {sector.name}
                  </Heading>
                  <Text className="mt-4">{sector.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              ¿Necesita una Solución Personalizada?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Hable con nuestro equipo sobre sus requerimientos técnicos, ambientales y operativos.
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
