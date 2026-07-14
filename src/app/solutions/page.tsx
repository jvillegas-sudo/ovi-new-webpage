import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Factory,
  FlaskConical,
  Fuel,
  HeartPulse,
  Microscope,
  Settings2,
  Sprout,
  UtensilsCrossed,
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
  title: "Solutions",
  description:
    "Explore OVI Ventures solutions across industrial cleaning, biotechnology, and custom formulation services for diverse industries.",
});

const cleaningBenefits = [
  "Deep degreasing power for heavy-duty environments",
  "Reduced residue and improved equipment uptime",
  "Biodegradable chemistry for safer discharge profiles",
  "Formulations adaptable to food-safe and industrial settings",
];

const biotechBenefits = [
  "Biological treatment for wastewater and effluent streams",
  "Targeted remediation strategies for contaminated systems",
  "Lower chemical dependence through microorganism-based performance",
  "Continuous optimization for changing operating conditions",
];

const customBenefits = [
  "Tailored chemistry and biology matched to your process",
  "Technical validation against operational performance goals",
  "Scalable deployment from pilot runs to full operations",
  "Documentation support for compliance and procurement teams",
];

const industries = [
  {
    icon: UtensilsCrossed,
    name: "Food & Beverage",
    description:
      "Hygiene-focused cleaning and surface protection for regulated production environments.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "High-standard sanitation and antimicrobial performance for critical spaces.",
  },
  {
    icon: Factory,
    name: "Manufacturing & Industrial",
    description: "Heavy-duty cleaning, treatment, and process support for complex operations.",
  },
  {
    icon: Fuel,
    name: "Oil & Gas",
    description: "Targeted degreasing and remediation solutions for harsh industrial conditions.",
  },
  {
    icon: Sprout,
    name: "Agriculture",
    description:
      "Biotechnology-led treatments supporting sustainable and resilient production systems.",
  },
  {
    icon: Building2,
    name: "Hospitality",
    description: "Safe, high-performance sanitation solutions for guest-facing environments.",
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
            <Badge variant="brand">Our Solutions</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Solutions for Every Industry
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              We combine scientific depth with industrial pragmatism to create technologies that
              clean better, remediate smarter, and perform responsibly at scale.
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
                Industrial Cleaning Solutions
              </Heading>
              <Text className="mt-6">
                OVI Ventures formulates industrial cleaning systems for facilities that demand
                performance, precision, and operational resilience. Our products are engineered to
                remove stubborn contamination while protecting surfaces, equipment, and workflow
                continuity.
              </Text>
              <Text className="mt-4">
                Whether applied in production environments, high-throughput maintenance cycles, or
                hygiene-critical zones, our cleaning technologies are built to reduce manual burden
                and improve consistency. Each formulation is created with sustainability in mind,
                minimizing unnecessary residues and hazardous inputs.
              </Text>
              <div className="mt-8 space-y-4">
                {cleaningBenefits.map((benefit) => (
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
                  Key Benefits
                </Text>
                <div className="mt-8 space-y-6">
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Faster turnaround
                    </Text>
                    <Text className="mt-2">
                      Shorter cleaning cycles with stronger process consistency.
                    </Text>
                  </div>
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Lower impact chemistry
                    </Text>
                    <Text className="mt-2">
                      Designed to reduce harsh residues and support safer handling.
                    </Text>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-[var(--glass-bg)] p-4">
                      <Text as="p" weight="bold" className="text-[var(--color-brand-primary)]">
                        100%
                      </Text>
                      <Text size="sm">Biodegradable formulation focus</Text>
                    </div>
                    <div className="rounded-xl bg-[var(--glass-bg)] p-4">
                      <Text as="p" weight="bold" className="text-[var(--color-brand-primary)]">
                        24/7
                      </Text>
                      <Text size="sm">Designed for round-the-clock operations</Text>
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
                  Key Facts
                </Text>
                <div className="mt-8 space-y-6">
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Biological precision
                    </Text>
                    <Text className="mt-2">
                      Custom microbial systems tuned to real treatment challenges.
                    </Text>
                  </div>
                  <div>
                    <Text as="p" size="xl" weight="bold" textColor="primary">
                      Environmental gain
                    </Text>
                    <Text className="mt-2">
                      Lower chemical intensity with measurable remediation value.
                    </Text>
                  </div>
                  <div className="rounded-xl bg-[var(--glass-bg)] p-4">
                    <Text as="p" weight="bold" className="text-[var(--color-brand-accent)]">
                      50+ applications
                    </Text>
                    <Text size="sm">
                      Adaptable to treatment, remediation, and industrial support workflows.
                    </Text>
                  </div>
                </div>
              </Card>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1} className="lg:order-2">
              <Microscope className="h-16 w-16 text-[var(--color-brand-accent)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Biotechnology &amp; Bioremediation
              </Heading>
              <Text className="mt-6">
                Our biotechnology platforms harness microorganism performance to improve process
                treatment, environmental remediation, and system recovery. We focus on biologically
                active solutions that work efficiently under industrial constraints.
              </Text>
              <Text className="mt-4">
                From wastewater treatment to contamination management, we develop targeted
                biological systems that reduce dependency on aggressive conventional chemistry. The
                result is a more balanced approach to operational efficiency and ecological
                responsibility.
              </Text>
              <div className="mt-8 space-y-4">
                {biotechBenefits.map((benefit) => (
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
              <Settings2 className="h-16 w-16 text-[var(--color-brand-secondary)]" />
              <Heading as="h2" size="4xl" className="mt-6">
                Custom Formulation Services
              </Heading>
              <Text className="mt-6">
                Some industrial challenges demand something more precise than an off-the-shelf
                answer. Our custom formulation services combine technical discovery, laboratory
                development, and practical implementation to create fit-for-purpose solutions.
              </Text>
              <Text className="mt-4">
                We collaborate with operations teams to understand process requirements, material
                interactions, environmental constraints, and compliance expectations. That insight
                guides tailored development that aligns with your exact operating priorities.
              </Text>
              <div className="mt-8 space-y-4">
                {customBenefits.map((benefit) => (
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
                  Process Steps
                </Text>
                <ol className="mt-8 space-y-6">
                  {[
                    "Technical discovery and problem mapping",
                    "Lab formulation and compatibility screening",
                    "Pilot validation in real operating conditions",
                    "Scale-up support with technical guidance",
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
              Industries We Serve
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;

              return (
                <Card key={industry.name} variant="glass" padding="lg" className="h-full">
                  <Icon className="h-10 w-10 text-[var(--color-brand-primary)]" />
                  <Heading as="h3" size="lg" className="mt-6">
                    {industry.name}
                  </Heading>
                  <Text className="mt-4">{industry.description}</Text>
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
              Need a Custom Solution?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Talk to our team about the technical, environmental, and operational demands of your
              application.
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
