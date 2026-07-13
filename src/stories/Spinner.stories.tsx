import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@components/ui/Spinner";

/**
 * ## Spinner
 *
 * Inline loading indicator for async operations.
 * Unlike `Loader` (full-screen), Spinner is used inline — inside buttons,
 * cards, or data tables while content loads.
 *
 * ### Sizes
 * `xs` · `sm` · `md` (default) · `lg` · `xl`
 *
 * ### Colors
 * `default` · `primary` · `accent` · `white` · `inherit`
 */
const meta: Meta<typeof Spinner> = {
  title: "Design System/Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: "select", options: ["default", "primary", "accent", "white", "inherit"] },
    label: { control: "text" },
  },
  args: {
    size: "md",
    color: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs text-[var(--color-text-tertiary)]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner spinnerColor="primary" label="Brand cyan" />
      <Spinner spinnerColor="accent" label="Bio green" />
      <Spinner spinnerColor="default" label="Tertiary" />
      <div className="rounded-lg bg-[var(--color-brand-primary)] p-2">
        <Spinner spinnerColor="white" label="White on color" />
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--glass-bg)] px-4 py-3">
      <Spinner size="sm" />
      <span className="text-sm text-[var(--color-text-secondary)]">Processing batch…</span>
    </div>
  ),
};
