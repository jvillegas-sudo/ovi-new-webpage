import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@components/ui/Progress";

/**
 * ## Progress
 *
 * Linear progress indicator for loading, upload, and multi-step completion.
 *
 * ### Variants
 * `default` (cyan) · `accent` · `success` · `warning` · `danger` · `gradient`
 *
 * ### Sizes
 * `xs` · `sm` · `md` (default) · `lg` · `xl`
 */
const meta: Meta<typeof Progress> = {
  title: "Design System/Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "success", "warning", "danger", "gradient"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showLabel: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: {
    value: 65,
    style: { width: 400 },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { showLabel: true, label: "Uploading…" },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 400 }}>
      {(["default", "accent", "success", "warning", "danger", "gradient"] as const).map((v) => (
        <Progress key={v} variant={v} value={65} label={v} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 400 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="flex items-center gap-4">
          <span className="w-6 font-mono text-xs text-[var(--color-text-tertiary)]">{s}</span>
          <Progress size={s} value={72} className="flex-1" />
        </div>
      ))}
    </div>
  ),
};

export const MultiStep: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 400 }}>
      <div>
        <div className="mb-2 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>Step 2 of 4 — Compound synthesis</span>
          <span>50%</span>
        </div>
        <Progress value={50} variant="gradient" size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={100} variant="success" size="xs" label="Data collection" />
        <Progress value={100} variant="success" size="xs" label="Validation" />
        <Progress value={65} size="xs" label="Synthesis" />
        <Progress value={0} size="xs" label="Analysis" />
      </div>
    </div>
  ),
};
