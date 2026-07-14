import Link from "next/link";
import { FlaskConical, Leaf, Shield, Users } from "lucide-react";
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
  title: "About",
  description:
    "Learn about OVI Ventures, our mission, our values, and the science-driven journey behind our sustainable industrial technologies.",
});

const values = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description:
      "We develop every solution with rigorous scientific standards and performance validation. Reliability in demanding industrial settings is a non-negotiable part of our work.",
  },
  {
    icon: Leaf,
    title: "Environmental Sustainability",
    description:
      "Our formulations are designed to reduce harmful residues, support biodegradability, and improve lifecycle impact. Sustainable performance is built into each development decision.",
  },
  {
    icon: FlaskConical,
    title: "Scientific Innovation",
    description:
      "We combine biotechnology, chemistry, and applied research to solve complex operational problems. Innovation starts in the lab but is always shaped by real-world implementation.",
  },
  {
    icon: Users,
    title: "Industry Partnership",
    description:
      "We work closely with operators, engineers, and decision-makers to create practical outcomes. Long-term partnerships help us tailor solutions that fit each environment precisely.",
  },
];

const milestones = [
  {
    title: "Founded with a vision",
    description: "Established to bridge biotechnology and industrial applications.",
  },
  {
    title: "First product line",
    description: "Launched biodegradable industrial cleaning formulations.",
  },
  {
    title: "Industrial expansion",
    description: "Partnered with manufacturers across multiple sectors.",
  },
  {
    title: "Global reach",
    description: "Serving industries worldwide with science-driven solutions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Our Story</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              About OVI Ventures
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              OVI Ventures was founded with a clear mission: to bring rigorous science, responsible
              innovation, and sustainable thinking into the heart of industrial performance.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Heading as="h2" size="4xl">
                Our Mission
              </Heading>
              <Text size="lg" className="mt-6">
                We create science-driven industrial solutions that raise operational standards while
                reducing environmental burden. By integrating biotechnology, green chemistry, and
                systems thinking, we help businesses modernize without compromising sustainability.
              </Text>
              <Text className="mt-4">
                Our work is grounded in practical application. Every product and formulation is
                designed to solve measurable problems across industrial cleaning, remediation,
                process treatment, and advanced performance optimization.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="glow" padding="xl" className="border border-[rgba(0,255,133,0.3)]">
                <Text
                  as="p"
                  size="xl"
                  weight="semibold"
                  className="text-[var(--color-brand-accent)]"
                >
                  “We believe the future of industry depends on solutions that are both highly
                  effective and inherently responsible.”
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
              Our Core Values
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Card key={value.title} variant="glass" padding="lg" className="h-full">
                  <Icon className="h-10 w-10 text-[var(--color-brand-primary)]" />
                  <Heading as="h3" size="lg" className="mt-6">
                    {value.title}
                  </Heading>
                  <Text className="mt-4">{value.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container size="lg">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Our Journey
            </Heading>
          </AnimateIn>

          <div className="mx-auto mt-14 max-w-3xl space-y-8 border-l border-[var(--color-border-default)] pl-8">
            {milestones.map((milestone, index) => (
              <AnimateIn key={milestone.title} animation="slideUp" delay={index * 0.08}>
                <div className="relative">
                  <span className="absolute top-1 -left-[2.15rem] h-4 w-4 rounded-full border-4 border-[var(--color-bg-surface)] bg-[var(--color-brand-primary)]" />
                  <Heading as="h3" size="lg">
                    {milestone.title}
                  </Heading>
                  <Text className="mt-2">{milestone.description}</Text>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Partner with OVI Ventures
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Work with a team that understands the balance between technical performance,
              operational reality, and environmental responsibility.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
