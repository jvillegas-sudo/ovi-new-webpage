import type { Meta, StoryObj } from "@storybook/react";
import { AnimateIn } from "@components/ui/AnimateIn";
import { AnimateStagger } from "@components/ui/AnimateStagger";
import { Card } from "@components/ui/Card";
import { Heading } from "@components/ui/Heading";
import { Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";

/**
 * ## Animations
 *
 * Scroll-triggered animation wrappers built on Framer Motion.
 * Automatically respects `prefers-reduced-motion`.
 *
 * ### AnimateIn
 * Animates a single element into view when it enters the viewport.
 *
 * **Available animations:** `fadeIn` · `slideUp` · `slideDown` · `slideLeft` · `slideRight` · `scaleIn`
 *
 * ### AnimateStagger
 * Wraps a container and staggers its children's entrance animations.
 * Each child is automatically wrapped in a motion element.
 *
 * ### Usage tip
 * In Storybook, scroll-triggered animations may not fire if the element
 * is already in view. Scroll the story panel or reload to see the trigger.
 */
const meta: Meta = {
  title: "Design System/Animations",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

// ─── AnimateIn ────────────────────────────────────────────────────────────────

export const FadeIn: StoryObj = {
  render: () => (
    <AnimateIn animation="fadeIn">
      <Card padding="md" style={{ width: 360 }}>
        <Heading as="h3" size="lg">
          Fade In
        </Heading>
        <Text size="sm" className="mt-2">
          This element fades in when it enters the viewport.
        </Text>
      </Card>
    </AnimateIn>
  ),
};

export const SlideUp: StoryObj = {
  render: () => (
    <AnimateIn animation="slideUp">
      <Card padding="md" style={{ width: 360 }}>
        <Heading as="h3" size="lg">
          Slide Up
        </Heading>
        <Text size="sm" className="mt-2">
          Slides up from below while fading in.
        </Text>
      </Card>
    </AnimateIn>
  ),
};

export const SlideLeft: StoryObj = {
  render: () => (
    <AnimateIn animation="slideLeft">
      <Card padding="md" style={{ width: 360 }}>
        <Heading as="h3" size="lg">
          Slide Left
        </Heading>
        <Text size="sm" className="mt-2">
          Enters from the right side.
        </Text>
      </Card>
    </AnimateIn>
  ),
};

export const ScaleIn: StoryObj = {
  render: () => (
    <AnimateIn animation="scaleIn">
      <Card padding="md" style={{ width: 360 }}>
        <Heading as="h3" size="lg">
          Scale In
        </Heading>
        <Text size="sm" className="mt-2">
          Scales up from 92% while fading in.
        </Text>
      </Card>
    </AnimateIn>
  ),
};

export const WithDelay: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 360 }}>
      {[0, 0.1, 0.2, 0.3].map((delay, i) => (
        <AnimateIn key={i} animation="slideUp" delay={delay}>
          <Card padding="sm">
            <Text size="sm">
              Item {i + 1} — delay: {delay}s
            </Text>
          </Card>
        </AnimateIn>
      ))}
    </div>
  ),
};

// ─── AnimateStagger ───────────────────────────────────────────────────────────

export const Stagger: StoryObj = {
  render: () => (
    <AnimateStagger className="grid grid-cols-3 gap-4" style={{ width: 560 }}>
      {["Precision", "Scale", "Automation", "Analytics", "Security", "Integration"].map((label) => (
        <Card key={label} padding="sm">
          <Badge variant="brand" size="sm">
            {label}
          </Badge>
        </Card>
      ))}
    </AnimateStagger>
  ),
};

export const StaggerList: StoryObj = {
  render: () => (
    <AnimateStagger className="flex flex-col gap-3" stagger={0.1} style={{ width: 400 }}>
      {[
        "Automated compound synthesis",
        "AI pathway optimisation",
        "Real-time process monitoring",
        "Regulatory compliance engine",
        "Supply chain integration",
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-[var(--color-border-subtle)] px-4 py-3"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(0,196,255,0.1)] text-xs font-bold text-[var(--color-brand-primary)]">
            {i + 1}
          </span>
          <Text size="sm" textColor="primary">
            {item}
          </Text>
        </div>
      ))}
    </AnimateStagger>
  ),
};
