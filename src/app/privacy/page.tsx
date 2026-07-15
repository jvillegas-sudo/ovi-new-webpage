import Link from "next/link";
import { Shield } from "lucide-react";
import { AnimateIn, Badge, Container, Heading, Section, Text } from "@components/ui";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de OVI Ingeniería en Limpieza. Conozca cómo recopilamos, usamos y protegemos su información personal.",
  canonical: "/privacy",
});

const lastUpdated = "14 de julio de 2026";

export default function PrivacyPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[40vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Legal</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Política de Privacidad
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text
              size="sm"
              align="center"
              textColor="tertiary"
              className="mt-4 flex items-center justify-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Última actualización: {lastUpdated}
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container size="md">
          <AnimateIn animation="slideUp">
            <div className="prose-ovi space-y-10">
              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  1. Responsable del Tratamiento
                </Heading>
                <Text textColor="secondary">
                  OVI Ingeniería en Limpieza (&quot;OVI&quot;, &quot;nosotros&quot;,
                  &quot;nuestro&quot;) es el responsable del tratamiento de los datos personales
                  recopilados a través de este sitio web (ovi.com). Para cualquier consulta sobre
                  privacidad, puede contactarnos en:{" "}
                  <Link
                    href="mailto:privacidad@ovi.com"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    privacidad@ovi.com
                  </Link>
                  .
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  2. Datos que Recopilamos
                </Heading>
                <Text textColor="secondary">
                  Recopilamos únicamente los datos que usted nos proporciona voluntariamente:
                </Text>
                <ul className="ml-6 list-disc space-y-2 text-[var(--color-text-secondary)]">
                  <li>
                    <strong className="text-[var(--color-text-primary)]">Datos de contacto:</strong>{" "}
                    nombre, correo electrónico, número de teléfono y empresa, cuando completa
                    nuestro formulario de contacto.
                  </li>
                  <li>
                    <strong className="text-[var(--color-text-primary)]">Datos de uso:</strong>{" "}
                    páginas visitadas, tiempo de navegación y acciones dentro del sitio, recopilados
                    de forma anónima para mejorar la experiencia.
                  </li>
                  <li>
                    <strong className="text-[var(--color-text-primary)]">Datos técnicos:</strong>{" "}
                    dirección IP, tipo de navegador y dispositivo, necesarios para el funcionamiento
                    seguro del sitio.
                  </li>
                </ul>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  3. Finalidad del Tratamiento
                </Heading>
                <Text textColor="secondary">
                  Utilizamos sus datos con las siguientes finalidades:
                </Text>
                <ul className="ml-6 list-disc space-y-2 text-[var(--color-text-secondary)]">
                  <li>Responder a sus consultas y solicitudes de información técnica.</li>
                  <li>
                    Enviar comunicaciones comerciales sobre nuestros productos y servicios, solo si
                    ha dado su consentimiento explícito.
                  </li>
                  <li>Mejorar el contenido y la funcionalidad de nuestro sitio web.</li>
                  <li>Cumplir con obligaciones legales aplicables.</li>
                </ul>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  4. Base Legal
                </Heading>
                <Text textColor="secondary">
                  El tratamiento de sus datos se basa en: (a) su consentimiento explícito cuando
                  completa un formulario o acepta comunicaciones; (b) la ejecución de una relación
                  precontractual o contractual a su solicitud; (c) el interés legítimo de OVI en
                  mejorar sus servicios y operar su sitio web de forma segura.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  5. Conservación de Datos
                </Heading>
                <Text textColor="secondary">
                  Conservamos sus datos personales el tiempo necesario para cumplir la finalidad
                  para la que fueron recopilados, y en ningún caso por más tiempo del exigido por la
                  legislación aplicable. Los datos de contacto de clientes y prospectos se conservan
                  por un máximo de 3 años desde el último contacto.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  6. Compartición de Datos
                </Heading>
                <Text textColor="secondary">
                  OVI no vende, alquila ni cede sus datos personales a terceros con fines
                  comerciales. Podemos compartir información con proveedores de servicios técnicos
                  (hosting, analítica, correo electrónico) que actúan como encargados del
                  tratamiento bajo nuestras instrucciones y con garantías contractuales adecuadas.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  7. Sus Derechos
                </Heading>
                <Text textColor="secondary">
                  Usted tiene derecho a acceder, rectificar, suprimir, limitar u oponerse al
                  tratamiento de sus datos, así como el derecho a la portabilidad de datos. Para
                  ejercer cualquiera de estos derechos, contáctenos en{" "}
                  <Link
                    href="mailto:privacidad@ovi.com"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    privacidad@ovi.com
                  </Link>{" "}
                  indicando su solicitud. Responderemos en un plazo máximo de 30 días hábiles.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  8. Cookies
                </Heading>
                <Text textColor="secondary">
                  Este sitio utiliza cookies técnicas imprescindibles para su funcionamiento, y
                  cookies analíticas anónimas para entender el uso del sitio. No utilizamos cookies
                  publicitarias ni de seguimiento de terceros. Al continuar navegando acepta el uso
                  de cookies técnicas.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  9. Seguridad
                </Heading>
                <Text textColor="secondary">
                  Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos
                  contra acceso no autorizado, pérdida, destrucción o divulgación. Toda la
                  comunicación con el sitio web se realiza mediante cifrado TLS/HTTPS.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  10. Cambios en esta Política
                </Heading>
                <Text textColor="secondary">
                  Podemos actualizar esta Política de Privacidad periódicamente. La versión vigente
                  estará siempre disponible en esta página con la fecha de última actualización.
                  Para cambios sustanciales, le notificaremos por los medios de contacto que
                  dispongamos.
                </Text>
              </article>

              <div className="mt-12 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface)] p-6">
                <Text textColor="secondary" size="sm">
                  Si tiene preguntas sobre esta política, puede contactarnos en{" "}
                  <Link
                    href="mailto:privacidad@ovi.com"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    privacidad@ovi.com
                  </Link>{" "}
                  o visitar nuestra página de{" "}
                  <Link
                    href="/contact"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    contacto
                  </Link>
                  .
                </Text>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
