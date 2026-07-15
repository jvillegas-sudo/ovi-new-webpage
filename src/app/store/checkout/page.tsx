import Link from "next/link";
import { ArrowLeft, Bot, Lock, Package, ShieldCheck, Truck } from "lucide-react";
import {
  AnimateIn,
  AnimateStagger,
  Badge,
  Card,
  Container,
  Heading,
  Section,
  Text,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";
import { futureIntegrations } from "@features/store/store-engine";
import { CheckoutForm } from "@features/store/components/CheckoutForm";

export const metadata = buildMetadata({
  title: "Solicitud técnica · OVI Catálogo Técnico",
  description:
    "Completa tu solicitud técnica. Un ingeniero OVI revisará tu pedido y te contactará para confirmar especificaciones, disponibilidad y condiciones.",
  canonical: "/store/checkout",
  noIndex: true,
});

const integrationBadges = Object.entries(futureIntegrations).map(([key, val]) => ({
  key,
  label: key === "oviOs" ? "OVI OS" : key.charAt(0).toUpperCase() + key.slice(1),
  descripcion: val.descripcion,
}));

const steps = [
  {
    icon: Package,
    title: "1. Datos de solicitud",
    description: "Completa el formulario con tus datos de contacto y la información del pedido.",
  },
  {
    icon: ShieldCheck,
    title: "2. Revisión de ingeniería",
    description:
      "Un ingeniero OVI revisará las especificaciones técnicas y validará la solución completa.",
  },
  {
    icon: Truck,
    title: "3. Confirmación y logística",
    description:
      "Recibirás una confirmación formal con precios, disponibilidad y condiciones de entrega.",
  },
];

export default function CheckoutPage() {
  return (
    <>
      <Section padding="none" background="transparent" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[4%] right-[5%] h-[380px] w-[380px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.13) 0%, transparent 72%)",
              filter: "blur(90px)",
            }}
          />
        </div>

        <Container className="relative z-10 py-20">
          <AnimateIn animation="slideUp">
            <Link
              href="/store/carrito"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al carrito
            </Link>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.06}>
            <Badge variant="brand" className="mt-6">
              SOLICITUD TÉCNICA
            </Badge>
            <Heading as="h1" size="4xl" className="mt-4">
              Formalizar solicitud de ingeniería
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.12}>
            <Text size="lg" className="mt-4 max-w-2xl">
              Esta no es una compra impulsiva. Es el inicio de un proceso de ingeniería. Un equipo
              OVI revisará tu solicitud antes de confirmar cualquier pedido.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      {/* Process steps */}
      <Section background="elevated">
        <Container>
          <AnimateStagger className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} variant="solid" padding="lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--color-border-brand)] bg-[rgba(0,196,255,0.08)]">
                    <Icon
                      className="h-5 w-5 text-[var(--color-brand-primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <Heading as="h3" size="lg" className="mt-5">
                    {step.title}
                  </Heading>
                  <Text size="sm" className="mt-3">
                    {step.description}
                  </Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      {/* Checkout form */}
      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <AnimateIn animation="slideUp">
              <CheckoutForm />
            </AnimateIn>

            {/* Sidebar — context & future integrations */}
            <div className="space-y-6">
              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[var(--color-brand-accent)]" aria-hidden="true" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Proceso seguro
                  </Text>
                </div>
                <Heading as="h2" size="lg" className="mt-3">
                  Tu solicitud está en manos de ingeniería
                </Heading>
                <Text size="sm" className="mt-3">
                  No se procesa ningún pago en esta etapa. La solicitud es revisada por un ingeniero
                  OVI que te contactará para confirmar especificaciones, condiciones y
                  disponibilidad.
                </Text>
              </Card>

              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-[var(--color-brand-primary)]" aria-hidden="true" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    OVI AI disponible
                  </Text>
                </div>
                <Text size="sm" className="mt-3">
                  ¿Tienes dudas sobre las especificaciones antes de continuar? Consulta con OVI AI.
                </Text>
                <Link
                  href="/ovi-ai"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
                >
                  Consultar con OVI AI
                </Link>
              </Card>

              <Card variant="solid" padding="lg">
                <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                  Arquitectura preparada
                </Text>
                <Text size="sm" className="mt-3">
                  Integraciones futuras en camino:
                </Text>
                <div className="mt-4 flex flex-wrap gap-2">
                  {integrationBadges.map((i) => (
                    <span
                      key={i.key}
                      className="rounded-full border border-[var(--color-border-default)] px-3 py-1 text-xs text-[var(--color-text-tertiary)]"
                    >
                      {i.label}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
