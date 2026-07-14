import { ExternalLink, Mail } from "lucide-react";
import { Card, Container, Heading, Section, Text } from "@components/ui";
import { ContactForm } from "@components/ui/ContactForm";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contacte a OVI para hablar sobre limpieza industrial, soluciones químicas biodegradables y lavado de flota.",
});

export default function ContactPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[50vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <Heading as="h1" size="5xl" align="center">
            Contáctenos
          </Heading>
          <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
            Trabajamos con organizaciones que buscan mejorar su desempeño operativo mediante
            soluciones de limpieza sostenibles y eficientes. Cuéntenos su necesidad y empecemos a
            construir juntos.
          </Text>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <Heading as="h2" size="3xl">
                Envíenos un Mensaje
              </Heading>
              <Text className="mt-4 max-w-2xl">
                Comparta sus objetivos, requerimientos técnicos o prioridades ambientales y nuestro
                equipo le conectará con el especialista adecuado.
              </Text>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <Card variant="glass" padding="lg" className="lg:col-span-1">
              <Heading as="h2" size="lg">
                Información de Contacto
              </Heading>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
                  <div>
                    <Text as="p" weight="semibold" textColor="primary">
                      Correo Electrónico
                    </Text>
                    <a
                      href="mailto:info@oviventures.com"
                      className="mt-1 inline-flex text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
                    >
                      info@oviventures.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ExternalLink className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
                  <div>
                    <Text as="p" weight="semibold" textColor="primary">
                      LinkedIn
                    </Text>
                    <a
                      href="https://www.linkedin.com/company/oviventures"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)]"
                    >
                      Conectar en LinkedIn
                    </a>
                  </div>
                </div>

                <div>
                  <Text as="p" weight="semibold" textColor="primary">
                    Tiempo de Respuesta
                  </Text>
                  <Text className="mt-2">Generalmente respondemos en menos de 24 horas.</Text>
                </div>

                <div>
                  <Text as="p" weight="semibold" textColor="primary">
                    Cobertura de Servicio
                  </Text>
                  <Text className="mt-2">
                    OVI atiende clientes industriales y empresas de transporte que requieren
                    soluciones de limpieza profesional con enfoque ambiental.
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
