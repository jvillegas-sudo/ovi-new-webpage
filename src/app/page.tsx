import Link from "next/link";
import { ChevronDown, CheckCircle2, FlaskConical, Microscope, Settings2 } from "lucide-react";
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
  title: "Home",
  description:
    "OVI Ventures builds industrial biotechnology and cleaning technology solutions that raise performance while lowering environmental impact.",
});

const stats = [
  { value: "10+", label: "Years of R&D" },
  { value: "50+", label: "Industrial Applications" },
  { value: "100%", label: "Biodegradable Formulas" },
  { value: "Global", label: "Industry Reach" },
];

const solutionCards = [
  {
    icon: FlaskConical,
    color: "text-[var(--color-brand-primary)]",
    title: "Industrial Cleaning",
    description:
      "High-performance cleaning systems engineered for production lines, sensitive equipment, and demanding maintenance environments.",
    href: "/solutions",
  },
  {
    icon: Microscope,
    color: "text-[var(--color-brand-accent)]",
    title: "Biotechnology",
    description:
      "Applied microbiology and bioremediation technologies designed to improve process efficiency and environmental outcomes.",
    href: "/technology",
  },
  {
    icon: Settings2,
    color: "text-[var(--color-brand-secondary)]",
    title: "Custom Formulations",
    description:
      "Tailored solution development for complex industrial contexts, regulatory demands, and sustainability objectives.",
    href: "/products",
  },
];

const sciencePoints = [
  "Microorganism Engineering",
  "Biodegradable Chemistry",
  "Industrial-Grade Performance",
  "Regulatory Compliance",
];

const sustainabilityStats = [
  { value: "90%+", label: "CO2 footprint reduction" },
  { value: "100%", label: "Biodegradable formulas" },
  { value: "Zero", label: "Toxic byproducts" },
];

export default function HomePage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[20%] left-[10%] h-[600px] w-[600px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
              animationDuration: "4s",
            }}
          />
          <div
            className="absolute right-[15%] bottom-[25%] h-[420px] w-[420px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,255,133,0.22) 0%, transparent 70%)",
              filter: "blur(100px)",
              animationDuration: "6s",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute top-[12%] right-[25%] h-[320px] w-[320px] animate-pulse rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,71,171,0.18) 0%, transparent 70%)",
              filter: "blur(90px)",
              animationDuration: "5s",
              animationDelay: "1s",
            }}
          />
        </div>

        <Container className="relative z-10 py-28 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand" size="lg">
              Industrial Biotechnology &amp; Cleaning Technology
            </Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="6xl" gradient="brand" align="center" className="mt-6">
              <span className="block">Science-Driven.</span>
              <span className="block">Sustainably Built.</span>
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl text-balance">
              OVI Ventures develops biotechnology and cleaning technologies that help industrial
              operators achieve stronger performance, safer environments, and a more sustainable
              operational footprint.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/solutions">
                <Button size="lg">Explore Solutions</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} style={{ color: "var(--color-text-tertiary)" }} />
        </div>
      </Section>

      <Section background="elevated" padding="md">
        <Container>
          <AnimateStagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} variant="solid" padding="lg" className="text-center">
                <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-primary)]">
                  {stat.value}
                </Text>
                <Text className="mt-2">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="base">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimateIn animation="slideUp">
              <Badge variant="accent">What We Do</Badge>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.1}>
              <Heading as="h2" size="4xl" align="center" className="mt-4">
                Comprehensive Solutions for Every Industry
              </Heading>
            </AnimateIn>
            <AnimateIn animation="slideUp" delay={0.2}>
              <Text size="lg" align="center" className="mt-4">
                From industrial cleaning performance to biotechnology innovation, we design
                practical systems that deliver measurable operational and environmental value.
              </Text>
            </AnimateIn>
          </div>

          <AnimateStagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <Card key={card.title} variant="glow" padding="lg" className="flex h-full flex-col">
                  <Icon className={`h-12 w-12 ${card.color}`} />
                  <Heading as="h3" size="lg" className="mt-6">
                    {card.title}
                  </Heading>
                  <Text className="mt-4 flex-1">{card.description}</Text>
                  <Link
                    href={card.href}
                    className="mt-8 inline-flex text-sm font-medium text-[var(--color-brand-primary)] transition-colors hover:text-white"
                  >
                    Learn More →
                  </Link>
                </Card>
              );
            })}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateIn animation="slideRight">
              <Badge variant="brand">Powered by Science</Badge>
              <Heading as="h2" size="4xl" className="mt-4">
                Research-led development for real industrial conditions
              </Heading>
              <Text size="lg" className="mt-6">
                Our R&amp;D approach combines applied microbiology, green chemistry, and performance
                engineering. Every formulation is designed to solve a measurable challenge in
                cleaning, treatment, remediation, or process optimization.
              </Text>
            </AnimateIn>

            <AnimateIn animation="slideLeft" delay={0.1}>
              <div className="glass rounded-2xl border border-[var(--color-border-default)] p-8">
                <ul className="space-y-5">
                  {sciencePoints.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-brand-accent)]" />
                      <Text textColor="primary" weight="medium">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      <Section background="surface" className="border-t border-[rgba(0,255,133,0.4)]">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="accent">Sustainability</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h2" size="4xl" align="center" className="mt-4">
              Committed to a Cleaner Planet
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-3xl">
              Sustainability is not an afterthought in our process. It is built into the way we
              design chemistry, engineer biology, and deliver industrial performance.
            </Text>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {sustainabilityStats.map((stat) => (
              <Card key={stat.label} variant="glass" padding="lg" className="text-center">
                <Text as="p" size="xl" weight="bold" className="text-[var(--color-brand-accent)]">
                  {stat.value}
                </Text>
                <Text className="mt-3">{stat.label}</Text>
              </Card>
            ))}
          </AnimateStagger>

          <AnimateIn animation="slideUp" delay={0.3}>
            <div className="mt-10">
              <Link href="/sustainability">
                <Button size="lg">Explore Sustainability</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="lg" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Ready to transform your operations?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mx-auto mt-4 max-w-2xl">
              Let&apos;s build a cleaner, more efficient operating model backed by science,
              performance data, and sustainable thinking.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" size="lg">
                  View Solutions
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
