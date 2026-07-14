import Link from "next/link";
import { Leaf, RefreshCw, Wind } from "lucide-react";
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
  title: "Sustainability",
  description:
    "See how OVI Ventures embeds sustainability into research, formulation design, and measurable industrial impact.",
});

const pillars = [
  {
    icon: Leaf,
    color: "text-[var(--color-brand-accent)]",
    title: "100% Biodegradable",
    description: "All formulations are engineered to break down naturally without toxic residues.",
  },
  {
    icon: Wind,
    color: "text-[var(--color-brand-primary)]",
    title: "Carbon Conscious",
    description:
      "Reduced carbon footprint across the full product lifecycle through cleaner chemistry and smarter deployment.",
  },
  {
    icon: RefreshCw,
    color: "text-[var(--color-brand-secondary)]",
    title: "Circular Economy",
    description:
      "Waste streams converted to inputs, supporting a closed-loop industrial model wherever possible.",
  },
];

const impactStats = [
  { value: "90%+", label: "Reduction in CO2 compared to conventional alternatives" },
  { value: "100%", label: "Biodegradable formula guarantee" },
  { value: "0", label: "Toxic chemical byproducts" },
  { value: "50+", label: "Industries using sustainable OVI solutions" },
];

export default function SustainabilityPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Environmental Commitment</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" gradient="bio" align="center" className="mt-4">
              Science for a Sustainable Future
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              We design for the planet from the first research hypothesis to the final product
              outcome, ensuring sustainability is integrated into every solution we build.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Heading as="h2" size="4xl">
                Our Environmental Commitment
              </Heading>
              <Text size="lg" className="mt-6">
                Sustainability at OVI Ventures begins long before a product reaches the field. We
                integrate lifecycle thinking, safer chemistry, and biological innovation into our
                R&amp;D process from day one so that environmental responsibility is embedded, not
                retrofitted.
              </Text>
              <Text className="mt-4">
                That approach helps our partners reduce waste, lower emissions, and move away from
                legacy formulations that create avoidable ecological costs.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glass" padding="xl">
                <Text
                  as="p"
                  size="xl"
                  weight="semibold"
                  className="text-[var(--color-brand-accent)]"
                >
                  “Performance and sustainability should reinforce each other. That belief is at the
                  core of every OVI formulation.”
                </Text>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Three Pillars of Sustainability
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <Card key={pillar.title} variant="glow" padding="lg" className="h-full">
                  <Icon className={`h-12 w-12 ${pillar.color}`} />
                  <Heading as="h3" size="lg" className="mt-6">
                    {pillar.title}
                  </Heading>
                  <Text className="mt-4">{pillar.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Measurable Impact
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {impactStats.map((stat, index) => (
              <Card key={stat.label} variant="solid" padding="lg" className="text-center">
                <Text
                  as="p"
                  size="xl"
                  weight="bold"
                  className={
                    index % 2 === 0
                      ? "text-[var(--color-brand-accent)]"
                      : "text-[var(--color-brand-primary)]"
                  }
                >
                  {stat.value}
                </Text>
                <Text className="mt-3">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Join the Sustainable Revolution
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Partner with OVI Ventures to accelerate cleaner operations and more responsible
              industrial growth.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
