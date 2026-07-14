import { ExternalLink, Mail } from "lucide-react";
import { Card, Container, Heading, Section, Text } from "@components/ui";
import { ContactForm } from "@components/ui/ContactForm";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact OVI Ventures to discuss industrial biotechnology, cleaning technology, and custom formulation opportunities.",
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
            Get in Touch
          </Heading>
          <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
            We work with organizations looking to improve industrial performance through
            science-led, sustainable solutions. Tell us about your challenge and let&apos;s start a
            conversation.
          </Text>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <Heading as="h2" size="3xl">
                Send a Message
              </Heading>
              <Text className="mt-4 max-w-2xl">
                Share your objectives, technical requirements, or sustainability priorities and our
                team will connect you with the right specialist.
              </Text>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <Card variant="glass" padding="lg" className="lg:col-span-1">
              <Heading as="h2" size="lg">
                Contact Information
              </Heading>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-[var(--color-brand-primary)]" />
                  <div>
                    <Text as="p" weight="semibold" textColor="primary">
                      Email
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
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                <div>
                  <Text as="p" weight="semibold" textColor="primary">
                    Response Time
                  </Text>
                  <Text className="mt-2">We typically respond within 24 hours.</Text>
                </div>

                <div>
                  <Text as="p" weight="semibold" textColor="primary">
                    Global Reach
                  </Text>
                  <Text className="mt-2">
                    OVI Ventures supports partners across international markets with solutions
                    tailored to local operational and regulatory realities.
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
