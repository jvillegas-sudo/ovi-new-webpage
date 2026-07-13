import { Badge, Container, Heading, Section, Text } from "@/components";
import { foundationCapabilities } from "@/features/foundation";
import { ThreeCanvas } from "@/three/canvas";

export default function FoundationPage() {
  return (
    <Section>
      <Container className="space-y-10">
        <div className="space-y-5">
          <Badge>Project Foundation Ready</Badge>
          <Heading>OVI digital platform architecture is initialized.</Heading>
          <Text className="max-w-3xl">
            The platform now includes reusable primitives, motion systems, 3D rendering infrastructure, and
            enterprise-grade frontend conventions.
          </Text>
        </div>

        <ThreeCanvas />

        <ul className="grid gap-3 md:grid-cols-2">
          {foundationCapabilities.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-secondary">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
