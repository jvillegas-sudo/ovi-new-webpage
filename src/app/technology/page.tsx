import Link from "next/link";
import { Beaker, CheckCircle2, Cog, FlaskConical, Microscope } from "lucide-react";
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
  title: "Technology",
  description:
    "Discover the OVI Ventures R&D process, core technologies, and quality standards behind our industrial biotechnology solutions.",
});

const processSteps = [
  {
    number: "1",
    title: "Research",
    description:
      "Deep scientific investigation of target processes and environmental requirements.",
  },
  {
    number: "2",
    title: "Development",
    description:
      "Formulating proprietary biological and chemical solutions in our R&D laboratories.",
  },
  {
    number: "3",
    title: "Testing",
    description: "Rigorous multi-phase testing under real industrial conditions.",
  },
  {
    number: "4",
    title: "Deployment",
    description: "Validated solutions delivered with full technical support and monitoring.",
  },
];

const technologies = [
  {
    icon: Microscope,
    title: "Applied Microbiology",
    description:
      "We engineer microorganism-based systems that support remediation, treatment efficiency, and resilient biological performance in industrial settings.",
  },
  {
    icon: FlaskConical,
    title: "Green Chemistry",
    description:
      "Our formulations emphasize biodegradability, effective contaminant breakdown, and reduced environmental burden without compromising efficacy.",
  },
  {
    icon: Cog,
    title: "Process Engineering",
    description:
      "We align chemistry, biology, and operational workflows to improve repeatability, efficiency, and real-world deployment outcomes.",
  },
];

const qualityCommitments = [
  "Pharmaceutical-grade development discipline",
  "ISO-aligned documentation and validation practices",
  "Performance testing under representative industrial conditions",
  "Technical support through deployment and optimization",
];

export default function TechnologyPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">R&amp;D Excellence</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Innovation at the Molecular Level
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              Our proprietary research process turns scientific insight into reliable industrial
              solutions designed for measurable performance and long-term sustainability.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              How We Develop Solutions
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <Card key={step.title} variant="glass" padding="lg" className="h-full">
                <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-primary)]">
                  {step.number}
                </Text>
                <Heading as="h3" size="lg" className="mt-4">
                  {step.title}
                </Heading>
                <Text className="mt-4">{step.description}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Core Technologies
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {technologies.map((item, index) => {
              const Icon = item.icon;
              const colors = [
                "text-[var(--color-brand-accent)]",
                "text-[var(--color-brand-primary)]",
                "text-[var(--color-brand-secondary)]",
              ];

              return (
                <Card key={item.title} variant="glow" padding="lg" className="h-full">
                  <Icon className={`h-12 w-12 ${colors[index]}`} />
                  <Heading as="h3" size="lg" className="mt-6">
                    {item.title}
                  </Heading>
                  <Text className="mt-4">{item.description}</Text>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Beaker className="h-14 w-14 text-[var(--color-brand-primary)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Quality &amp; Compliance
              </Heading>
              <Text size="lg" className="mt-6">
                OVI Ventures develops solutions with a quality mindset shaped by laboratory rigor,
                documentation discipline, and deployment accountability. Our systems are informed by
                pharmaceutical-grade expectations and aligned with the needs of regulated and
                high-performance industries.
              </Text>
              <Text className="mt-4">
                From formulation through implementation, we prioritize traceability,
                reproducibility, and evidence-based validation to support confident adoption.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <Card variant="solid" padding="xl">
                <ul className="space-y-5">
                  {qualityCommitments.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                      <Text textColor="primary">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Explore Our Solutions
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              See how our technology translates into real industrial performance across sectors.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/solutions">
                <Button size="lg">View Solutions</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
