import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Star, Zap } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@components/ui/Card";
import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { Heading } from "@components/ui/Heading";
import { Text } from "@components/ui/Text";

/**
 * ## Card
 *
 * Glassmorphism container for grouping related content.
 * Built with CVA for type-safe variants and sub-components for structure.
 *
 * ### Variants
 * - **glass** — Frosted glass surface (default). Best for feature cards.
 * - **solid** — Opaque background. Better for dense data.
 * - **outlined** — Transparent with border. Minimal footprint.
 * - **glow** — Animated glow on hover. Use for highlights.
 *
 * ### Padding
 * `none` · `sm` · `md` (default) · `lg` · `xl`
 *
 * ### Sub-components
 * `CardHeader`, `CardContent`, `CardFooter`
 */
const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["glass", "solid", "outlined", "glow"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
  },
  args: {
    variant: "glass",
    padding: "md",
    style: { width: 360 },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Glass: Story = {
  render: () => (
    <Card variant="glass" style={{ width: 360 }}>
      <CardHeader>
        <Badge variant="brand" dot>
          New Feature
        </Badge>
        <Heading as="h3" size="lg">
          Biotech Platform
        </Heading>
      </CardHeader>
      <CardContent>
        <Text>AI-powered pipeline acceleration for industrial biotechnology workflows.</Text>
      </CardContent>
      <CardFooter>
        <Text size="sm" textColor="tertiary">
          v2.4.1
        </Text>
        <Button size="sm" rightIcon={<ArrowRight size={14} />}>
          Explore
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Solid: Story = {
  render: () => (
    <Card variant="solid" style={{ width: 360 }}>
      <CardHeader>
        <Heading as="h3" size="lg">
          Analytics Dashboard
        </Heading>
      </CardHeader>
      <CardContent>
        <Text>Real-time process monitoring across all production lines.</Text>
      </CardContent>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ width: 360 }}>
      <CardHeader>
        <Heading as="h3" size="lg">
          Technical Specs
        </Heading>
      </CardHeader>
      <CardContent>
        <Text>ISO 9001 certified with 99.9% uptime SLA.</Text>
      </CardContent>
    </Card>
  ),
};

export const Glow: Story = {
  render: () => (
    <Card variant="glow" style={{ width: 360 }}>
      <CardHeader>
        <div className="flex size-10 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.1)]">
          <Zap size={20} className="text-[var(--color-brand-primary)]" />
        </div>
        <Heading as="h3" size="lg">
          High Performance
        </Heading>
      </CardHeader>
      <CardContent>
        <Text>Process 10x more data with our optimised compute layer.</Text>
      </CardContent>
    </Card>
  ),
};

// ─── Feature Card ─────────────────────────────────────────────────────────────

export const FeatureCard: Story = {
  render: () => (
    <Card variant="glass" style={{ width: 360 }}>
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-[rgba(0,196,255,0.2)] bg-[rgba(0,196,255,0.1)]">
        <Star size={22} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
      </div>
      <Heading as="h3" size="md">
        Precision Engineering
      </Heading>
      <Text size="sm" className="mt-2">
        Sub-nanometre tolerances across all automated assembly processes.
      </Text>
    </Card>
  ),
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

export const StatCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: 480 }}>
      {[
        { label: "Yield Rate", value: "98.7%", delta: "+2.3%" },
        { label: "Batch Cycles", value: "1,240", delta: "+15" },
        { label: "Uptime", value: "99.9%", delta: "SLA met" },
        { label: "Compounds", value: "42K+", delta: "Active" },
      ].map((stat) => (
        <Card key={stat.label} variant="glass" padding="md">
          <Text size="xs" textColor="tertiary" className="tracking-widest uppercase">
            {stat.label}
          </Text>
          <div className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
            {stat.value}
          </div>
          <Text size="xs" textColor="brand" className="mt-1">
            {stat.delta}
          </Text>
        </Card>
      ))}
    </div>
  ),
};

// ─── Padding Scale ────────────────────────────────────────────────────────────

export const PaddingScale: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["sm", "md", "lg", "xl"] as const).map((p) => (
        <Card key={p} variant="outlined" padding={p} style={{ width: 160 }}>
          <Text size="xs" textColor="tertiary">
            padding: {p}
          </Text>
        </Card>
      ))}
    </div>
  ),
};
