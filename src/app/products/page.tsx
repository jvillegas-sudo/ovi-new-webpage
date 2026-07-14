import Link from "next/link";
import {
  AnimateIn,
  AnimateStagger,
  Badge,
  Button,
  Card,
  CardFooter,
  Container,
  Heading,
  Section,
  Text,
} from "@components/ui";
import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "Explore the OVI Ventures product portfolio across industrial cleaning, biotechnology, protective treatments, and custom solutions.",
});

const products = [
  {
    name: "OVI BioClean Pro",
    badge: "Industrial Cleaning",
    badgeVariant: "brand" as const,
    description:
      "Advanced enzymatic formulation for heavy industrial degreasing and surface cleaning. Biodegradable and phosphate-free.",
  },
  {
    name: "OVI Industrial Degreaser",
    badge: "Cleaning Technology",
    badgeVariant: "default" as const,
    description:
      "High-performance degreaser formulated for machinery, equipment, and production line maintenance.",
  },
  {
    name: "OVI BioTreat",
    badge: "Biotechnology",
    badgeVariant: "accent" as const,
    description:
      "Microorganism-based treatment system for wastewater, effluent, and contaminated process streams.",
  },
  {
    name: "OVI Surface Shield",
    badge: "Protective",
    badgeVariant: "brand" as const,
    description:
      "Long-lasting antimicrobial surface protection for food-grade, healthcare, and industrial environments.",
  },
  {
    name: "OVI EcoDetox",
    badge: "Bioremediation",
    badgeVariant: "accent" as const,
    description:
      "Soil and groundwater remediation using tailored microbial consortia for contaminated site restoration.",
  },
  {
    name: "OVI Custom Blend",
    badge: "Custom Solutions",
    badgeVariant: "default" as const,
    description:
      "Bespoke formulation service — we engineer products precisely matched to your operational requirements.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Section
        padding="none"
        background="transparent"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Container className="py-24 text-center">
          <AnimateIn animation="slideUp">
            <Badge variant="brand">Product Portfolio</Badge>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Heading as="h1" size="5xl" align="center" className="mt-4">
              Our Product Range
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <Text size="lg" align="center" className="mx-auto mt-6 max-w-3xl">
              Explore a portfolio engineered to deliver industrial performance, environmental
              responsibility, and tailored operational value across multiple applications.
            </Text>
          </AnimateIn>
        </Container>
      </Section>

      <Section background="surface">
        <Container>
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="4xl" align="center">
              Engineered for Performance
            </Heading>
          </AnimateIn>

          <AnimateStagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.name}
                variant="solid"
                padding="lg"
                className="flex h-full flex-col"
              >
                <Badge variant={product.badgeVariant} size="md" className="w-fit">
                  {product.badge}
                </Badge>
                <Heading as="h3" size="lg" className="mt-6">
                  {product.name}
                </Heading>
                <Text className="mt-4 flex-1">{product.description}</Text>
                <CardFooter className="justify-start">
                  <Link href="/contact">
                    <Button variant="outline" size="sm">
                      Request Info
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </AnimateStagger>
        </Container>
      </Section>

      <Section background="elevated" padding="md">
        <Container size="md" className="text-center">
          <AnimateIn animation="slideUp">
            <Heading as="h2" size="3xl" align="center">
              Need Something Specific?
            </Heading>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.1}>
            <Text size="lg" align="center" className="mt-4">
              Our bespoke formulation service helps you solve process-specific challenges with
              products engineered around your exact requirements.
            </Text>
          </AnimateIn>
          <AnimateIn animation="slideUp" delay={0.2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Contact Our Team</Button>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
