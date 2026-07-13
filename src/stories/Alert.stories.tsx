import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@components/ui/Alert";

/**
 * ## Alert
 *
 * Contextual feedback messages for user actions or system state.
 *
 * ### Variants
 * - **info** — Informational, non-blocking
 * - **success** — Positive outcome
 * - **warning** — Caution required
 * - **error** — Action failed
 * - **default** — Neutral message
 *
 * ### Accessibility
 * - `role="alert"` — announces to screen readers immediately
 * - Dismiss button has `aria-label="Dismiss alert"`
 */
const meta: Meta<typeof Alert> = {
  title: "Design System/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error", "default"] },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    variant: "info",
    title: "Pipeline started",
    description: "Compound batch #4891 is now processing.",
    style: { width: 420 },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Changes saved",
    description: "Your workflow configuration has been updated.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Low reagent supply",
    description: "Buffer solution A is at 12% capacity. Reorder recommended.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Batch failed",
    description: "Temperature deviation detected at stage 3. Process halted.",
  },
};

export const Default: Story = {
  args: {
    variant: "default",
    title: "Maintenance window",
    description: "Platform will be unavailable Sunday 02:00–04:00 UTC.",
  },
};

export const Dismissible: Story = {
  render: () => (
    <Alert
      variant="info"
      title="New documentation available"
      description="The API reference has been updated with v3 endpoints."
      onClose={() => alert("dismissed")}
      style={{ width: 440 }}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 440 }}>
      <Alert variant="info" title="Pipeline started" description="Batch #4891 is now processing." />
      <Alert
        variant="success"
        title="Export complete"
        description="94 compounds exported to CSV."
      />
      <Alert variant="warning" title="Low reagent supply" description="Buffer A at 12% capacity." />
      <Alert variant="error" title="Batch failed" description="Temperature deviation at stage 3." />
      <Alert variant="default" title="Maintenance window" description="Sunday 02:00–04:00 UTC." />
    </div>
  ),
};
