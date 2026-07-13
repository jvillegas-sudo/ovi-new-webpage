import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@components/ui/Badge";

/**
 * ## Badge
 *
 * Small label for status indicators, categories, and feature tags.
 *
 * ### Variants
 * - **default** — Neutral glass surface
 * - **brand** — Cyan tint — for primary tags
 * - **accent** — Bio-green — for "new" or positive labels
 * - **solid** — Filled cyan — maximum visibility
 * - **destructive** — Red — errors, alerts, warnings
 *
 * ### Sizes
 * `sm` · `md` (default) · `lg`
 */
const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "brand", "accent", "solid", "destructive"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dot: { control: "boolean" },
  },
  args: {
    variant: "brand",
    size: "md",
    children: "New",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="accent" dot>
        Online
      </Badge>
      <Badge variant="brand" dot>
        Live
      </Badge>
      <Badge variant="destructive" dot>
        Error
      </Badge>
      <Badge variant="default" dot>
        Idle
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="accent" dot>
        New Feature
      </Badge>
      <Badge variant="brand">Beta</Badge>
      <Badge variant="default">v2.4.1</Badge>
      <Badge variant="solid">Pro</Badge>
      <Badge variant="destructive">Deprecated</Badge>
      <Badge variant="default">Open Source</Badge>
    </div>
  ),
};
