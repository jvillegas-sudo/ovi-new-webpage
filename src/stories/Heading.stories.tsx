import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@components/ui/Heading";

/**
 * ## Heading
 *
 * Typography primitive for all headings (h1–h6).
 * Semantic HTML level is **decoupled from visual size** — you can render an
 * `h2` with a hero-scale size for correct document outline without breaking layout.
 *
 * ### Fluid Scale
 * Sizes 3xl and above use `clamp()` for smooth scaling between viewports.
 * No abrupt jumps at breakpoints.
 *
 * ### Gradients
 * - **brand** — Cyan → Cobalt (`text-gradient-brand`)
 * - **bio** — Bio-green → Cyan (`text-gradient-bio`)
 *
 * ### Font Family
 * All headings use `--font-display` (SF Pro Display / system default).
 */
const meta: Meta<typeof Heading> = {
  title: "Design System/Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
    },
    gradient: { control: "select", options: ["none", "brand", "bio"] },
    align: { control: "select", options: ["left", "center", "right"] },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold", "extrabold", "black"],
    },
  },
  args: {
    as: "h2",
    size: "3xl",
    gradient: "none",
    align: "left",
    weight: "bold",
    children: "Industrial Biotechnology",
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const GradientBrand: Story = {
  args: { gradient: "brand", children: "Precision at Scale" },
};

export const GradientBio: Story = {
  args: { gradient: "bio", children: "Nature Meets Technology" },
};

export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"] as const).map((size) => (
        <div key={size} className="flex items-baseline gap-4">
          <span className="w-12 shrink-0 font-mono text-xs text-[var(--color-text-tertiary)]">
            {size}
          </span>
          <Heading as="h2" size={size}>
            {size} — The Future of Biotech
          </Heading>
        </div>
      ))}
    </div>
  ),
};

export const WeightScale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["normal", "medium", "semibold", "bold", "extrabold", "black"] as const).map((weight) => (
        <Heading key={weight} as="h3" size="2xl" weight={weight}>
          {weight} — OVI Ventures
        </Heading>
      ))}
    </div>
  ),
};

export const HeroDisplay: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-2">
      <Heading as="h1" size="6xl" gradient="brand" weight="black">
        The Future of Industrial Biotech
      </Heading>
      <Heading as="h2" size="2xl" weight="normal" className="text-[var(--color-text-secondary)]">
        Precision engineering for the next decade of production.
      </Heading>
    </div>
  ),
};
