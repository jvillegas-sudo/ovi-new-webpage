import Link from "next/link";
import { FileText } from "lucide-react";
import { AnimateIn, Badge, Container, Heading, Section, Text } from "@components/ui";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Términos de Servicio",
  description:
    "Términos de Servicio de OVI Ingeniería en Limpieza. Conozca las condiciones que rigen el uso de nuestro sitio web y servicios.",
  canonical: "/terms",
});

const lastUpdated = "14 de julio de 2026";

export default function TermsPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[40vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="default">Legal</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Términos de Servicio
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text
              size="sm"
              align="center"
              textColor="tertiary"
              className="mt-4 flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Última actualización: {lastUpdated}
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container size="md">
          <AnimateIn animation="slideUp">
            <div className="space-y-10">
              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  1. Aceptación de los Términos
                </Heading>
                <Text textColor="secondary">
                  Al acceder y utilizar el sitio web oviventures.com (&quot;Sitio&quot;), usted
                  acepta estar vinculado por estos Términos de Servicio. Si no está de acuerdo con
                  alguna parte de estos términos, le pedimos que no utilice el Sitio. El uso
                  continuado del Sitio constituye aceptación de las versiones vigentes de estos
                  términos.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  2. Descripción del Servicio
                </Heading>
                <Text textColor="secondary">
                  OVI Ingeniería en Limpieza ofrece a través de este Sitio información sobre sus
                  productos, servicios, metodología y plataformas tecnológicas para soluciones de
                  Ingeniería en Limpieza de uso industrial, institucional y de flota. El Sitio
                  incluye herramientas interactivas de diagnóstico (OVI AI, Solution Lab) con fines
                  informativos y de orientación técnica.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  3. Uso Permitido
                </Heading>
                <Text textColor="secondary">
                  Usted se compromete a utilizar el Sitio únicamente para fines legales y de
                  conformidad con estos Términos. Está expresamente prohibido:
                </Text>
                <ul className="ml-6 list-disc space-y-2 text-[var(--color-text-secondary)]">
                  <li>
                    Usar el Sitio de cualquier manera que infrinja leyes o regulaciones aplicables.
                  </li>
                  <li>
                    Intentar obtener acceso no autorizado a sistemas, redes o datos de OVI o de
                    terceros.
                  </li>
                  <li>
                    Transmitir material publicitario no solicitado o spam a través de cualquier
                    funcionalidad del Sitio.
                  </li>
                  <li>
                    Copiar, reproducir, distribuir o crear trabajos derivados del contenido del
                    Sitio sin autorización expresa de OVI.
                  </li>
                  <li>
                    Utilizar mecanismos automatizados (bots, scrapers) para acceder al Sitio sin
                    autorización previa y escrita.
                  </li>
                </ul>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  4. Propiedad Intelectual
                </Heading>
                <Text textColor="secondary">
                  Todo el contenido publicado en el Sitio — incluyendo textos, imágenes, logotipos,
                  diseños, código fuente, marcas comerciales y metodologías — es propiedad exclusiva
                  de OVI Ingeniería en Limpieza o de sus licenciantes y está protegido por las leyes
                  de propiedad intelectual aplicables. Ningún contenido podrá ser utilizado sin
                  autorización expresa y por escrito de OVI.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  5. Herramientas de Diagnóstico y Recomendaciones
                </Heading>
                <Text textColor="secondary">
                  Las herramientas interactivas del Sitio (OVI AI, Solution Lab, OVI OS) generan
                  análisis y recomendaciones con fines exclusivamente informativos y orientativos.
                  Estos resultados no constituyen asesoría técnica vinculante ni reemplazan la
                  evaluación de un especialista OVI in situ. OVI no se responsabiliza por decisiones
                  operativas tomadas con base únicamente en los resultados de estas herramientas.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  6. Limitación de Responsabilidad
                </Heading>
                <Text textColor="secondary">
                  El Sitio se provee &quot;tal como está&quot;, sin garantías de ningún tipo,
                  expresas o implícitas. OVI no garantiza que el Sitio esté libre de errores,
                  interrupciones o virus. En la máxima medida permitida por la ley aplicable, OVI no
                  será responsable por daños directos, indirectos, incidentales, especiales o
                  consecuentes derivados del uso o la imposibilidad de uso del Sitio.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  7. Enlaces a Terceros
                </Heading>
                <Text textColor="secondary">
                  El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se
                  proporcionan únicamente para su conveniencia. OVI no controla, respalda ni asume
                  responsabilidad alguna por el contenido, las políticas de privacidad ni las
                  prácticas de sitios web de terceros.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  8. Modificaciones
                </Heading>
                <Text textColor="secondary">
                  OVI se reserva el derecho de modificar estos Términos en cualquier momento. Las
                  modificaciones entrarán en vigor en el momento de su publicación en el Sitio. Le
                  recomendamos revisar estos Términos periódicamente. El uso continuado del Sitio
                  tras la publicación de cambios implica su aceptación.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  9. Ley Aplicable y Jurisdicción
                </Heading>
                <Text textColor="secondary">
                  Estos Términos se regirán e interpretarán conforme a las leyes de la República de
                  Colombia. Cualquier disputa derivada de o relacionada con el uso del Sitio se
                  someterá a la jurisdicción exclusiva de los tribunales competentes de Colombia,
                  renunciando las partes a cualquier otro fuero que pudiera corresponderles.
                </Text>
              </article>

              <article className="space-y-4">
                <Heading as="h2" size="2xl">
                  10. Contacto
                </Heading>
                <Text textColor="secondary">
                  Para cualquier consulta relacionada con estos Términos, puede contactarnos en{" "}
                  <Link
                    href="mailto:legal@oviventures.com"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    legal@oviventures.com
                  </Link>{" "}
                  o a través de nuestra página de{" "}
                  <Link
                    href="/contact"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    contacto
                  </Link>
                  .
                </Text>
              </article>

              <div className="mt-12 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface)] p-6">
                <Text textColor="secondary" size="sm">
                  Estos Términos deben leerse junto con nuestra{" "}
                  <Link
                    href="/privacy"
                    className="text-[var(--color-brand-primary)] transition-colors hover:underline"
                  >
                    Política de Privacidad
                  </Link>
                  , que forma parte integral de la relación entre usted y OVI Ingeniería en
                  Limpieza.
                </Text>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
