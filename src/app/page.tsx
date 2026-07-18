import Link from "next/link";
import { Bot, Cpu, Sparkles, TrendingUp } from "lucide-react";
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
import { buildMetadata } from "@lib/metadata";
import {
  CompanyMetrics,
  IndustryCards,
  ServiceHighlights,
  FeaturedProducts,
  FeaturedSolutions,
  KnowledgeHighlights,
} from "@features/home/components";
import {
  homeHero,
  identityMetrics,
  homeAbout,
  homeEngineering,
  homeSustainability,
  successCases,
  successCasesSectionMeta,
  homeOviOs,
  homeOviAi,
  homeContact,
  homeSectorsSection,
  homeServicesSection,
  homeProductsSection,
  getHomeSectors,
} from "@knowledge/home";
import type { HomeLocale } from "@knowledge/home";

// ─── Active locale (no UI selector yet — scaffolded for future activation) ────
const locale: HomeLocale = "es";

// ─── Section content resolved for active locale ───────────────────────────────
const heroContent = homeHero.locales[locale];
const aboutContent = homeAbout.locales[locale];
const engineeringContent = homeEngineering.locales[locale];
const sectorsContent = homeSectorsSection.locales[locale];
const sustainabilityContent = homeSustainability.locales[locale];
const successContent = successCasesSectionMeta.locales[locale];
const oviOsContent = homeOviOs.locales[locale];
const oviAiContent = homeOviAi.locales[locale];
const contactContent = homeContact.locales[locale];

// ─── KB-sourced display data ───────────────────────────────────────────────────
const homeSectors = getHomeSectors();

export const metadata = buildMetadata({
  title: "Inicio",
  description: homeHero.seoDescription,
});

export default function HomePage() {
  return (
    <>
      <HomeCinematicJourney hero={heroContent} locale={locale} />

      {/* Identity Metrics */}
      <Section background="elevated" padding="md">
        <Container>
          <CompanyMetrics metrics={identityMetrics} locale={locale} />
        </Container>
      </Section>

      {/* About / Identity */}
      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">{aboutContent.badge}</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                {aboutContent.heading}
              </Heading>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.2}>
              <Text size="lg" align="center" className="mt-4">
                {aboutContent.body}
              </Text>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* Engineering Pillars */}
      <Section background="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Badge variant="brand">{engineeringContent.badge}</Badge>
              <Heading as="h2" size="4xl" className="mt-4">
                {engineeringContent.heading}
              </Heading>
              <Text size="lg" className="mt-6">
                {engineeringContent.body}
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <div className="p-8">
                <KnowledgeHighlights section={homeEngineering} locale={locale} />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* Sectors */}
      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">{sectorsContent.badge}</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                {sectorsContent.heading}
              </Heading>
            </AnimateIn>
          </div>
          <IndustryCards sectors={homeSectors} locale={locale} />
        </Container>
      </Section>

      {/* Services */}
      <Section background="surface">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="brand">{homeServicesSection.locales[locale].badge}</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                {homeServicesSection.locales[locale].heading}
              </Heading>
            </AnimateIn>
          </div>
          <ServiceHighlights section={homeServicesSection} locale={locale} />
        </Container>
      </Section>

      {/* Products */}
      <Section background="elevated">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">{homeProductsSection.locales[locale].badge}</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                {homeProductsSection.locales[locale].heading}
              </Heading>
            </AnimateIn>
          </div>
          <FeaturedProducts section={homeProductsSection} locale={locale} />
        </Container>
      </Section>

      {/* OVI AI */}
      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="brand">{oviAiContent.badge}</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                {oviAiContent.heading}
              </Heading>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.2}>
              <Text size="lg" align="center" className="mx-auto mt-4 max-w-2xl">
                {oviAiContent.body}
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
                  placeholder={oviAiContent.previewPlaceholder}
                  disabled
                  aria-label="Vista previa de consulta para OVI AI"
                />
                <Text size="sm" className="mt-3">
                  {oviAiContent.previewNote}
                </Text>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* OVI OS */}
      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Badge variant="accent">{oviOsContent.badge}</Badge>
              <Heading as="h2" size="4xl" className="mt-4">
                {oviOsContent.heading}
              </Heading>
              <Text size="lg" className="mt-6">
                {oviOsContent.body}
              </Text>
              <div className="mt-8">
                <Link href="/technology">
                  <Button size="lg">{oviOsContent.cta}</Button>
                </Link>
              </div>
            </AnimateIn>
            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glow" padding="lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-[var(--color-brand-primary)]" />
                    <Text textColor="primary" weight="medium">
                      {oviOsContent.features[0]?.text}
                    </Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[var(--color-brand-accent)]" />
                    <Text textColor="primary" weight="medium">
                      {oviOsContent.features[1]?.text}
                    </Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-[var(--color-brand-secondary)]" />
                    <Text textColor="primary" weight="medium">
                      {oviOsContent.features[2]?.text}
                    </Text>
                  </div>
                </div>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* Sustainability */}
      <Section background="surface" className="border-t border-[rgba(0,255,133,0.4)]">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="accent">{sustainabilityContent.badge}</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h2" size="4xl" align="center" className="mt-4">
              {sustainabilityContent.heading}
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-3xl">
              {sustainabilityContent.body}
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sustainabilityContent.items.map((stat) => (
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
                <Button size="lg">{sustainabilityContent.cta}</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* Success Cases */}
      <Section background="base">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">{successContent.badge}</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h2" size="3xl" align="center">
              {successContent.heading}
            </Heading>
          </AnimateIn>
          <FeaturedSolutions cases={successCases} locale={locale} />
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section background="elevated" padding="md">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              {contactContent.heading}
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-2xl">
              {contactContent.body}
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">{contactContent.primaryCta}</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  {contactContent.secondaryCta}
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
