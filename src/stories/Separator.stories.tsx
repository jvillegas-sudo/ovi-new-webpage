import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@components/ui/Separator";

/**
 * ## Separator / Divider
 *
 * Visual separator between sections of content.
 * Can be horizontal (default) or vertical.
 *
 * ### Variants
 * - **default** — Subtle border
 * - **muted** — Even more subtle
 * - **strong** — More visible
 * - **brand** — Gradient cyan fade-in/out
 */
const meta: Meta<typeof Separator> = {
  title: "Design System/Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["default", "muted", "strong", "brand"] },
  },
  args: {
    style: { width: 400 },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 400 }}>
      <div>
        <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">default</p>
        <Separator variant="default" />
      </div>
      <div>
        <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">muted</p>
        <Separator variant="muted" />
      </div>
      <div>
        <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">strong</p>
        <Separator variant="strong" />
      </div>
      <div>
        <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">brand</p>
        <Separator variant="brand" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-4">
      <span className="text-sm text-[var(--color-text-secondary)]">Products</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-[var(--color-text-secondary)]">Solutions</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-[var(--color-text-secondary)]">About</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 400 }}>
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">Section One</p>
        <p className="text-sm text-[var(--color-text-tertiary)]">Content for the first section.</p>
      </div>
      <Separator variant="brand" />
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">Section Two</p>
        <p className="text-sm text-[var(--color-text-tertiary)]">Content for the second section.</p>
      </div>
    </div>
  ),
};
