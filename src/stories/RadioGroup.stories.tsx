import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio } from "@components/ui/RadioGroup";

/**
 * ## RadioGroup / Radio
 *
 * Accessible radio button group with two visual variants.
 *
 * ### Variants
 * - **default** — Inline radio dots with labels
 * - **card** — Bordered card tiles for richer option descriptions
 *
 * ### Accessibility
 * Uses `<fieldset>` + `<legend>` for proper grouping.
 * All options share a single `name` for correct keyboard behavior.
 */
const meta: Meta<typeof RadioGroup> = {
  title: "Design System/Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "card"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    orientation: { control: "select", options: ["vertical", "horizontal"] },
  },
  args: {
    label: "Select a plan",
    defaultValue: "pro",
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const options = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise", disabled: true },
];

export const Default: Story = {
  render: () => (
    <RadioGroup label="Select a plan" defaultValue="pro" style={{ width: 360 }}>
      {options.map((o) => (
        <Radio key={o.value} value={o.value} label={o.label} disabled={o.disabled} />
      ))}
    </RadioGroup>
  ),
};

export const Card: Story = {
  render: () => (
    <RadioGroup label="Select a plan" defaultValue="pro" variant="card" style={{ width: 480 }}>
      <Radio value="starter" label="Starter" description="For individuals and small projects" />
      <Radio value="pro" label="Pro" description="For teams — unlimited pipelines" />
      <Radio value="enterprise" label="Enterprise" description="Custom SLA and support" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup label="Billing period" defaultValue="monthly" orientation="horizontal">
      <Radio value="monthly" label="Monthly" />
      <Radio value="annual" label="Annual" />
      <Radio value="lifetime" label="Lifetime" />
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup
      label="Select a plan"
      defaultValue=""
      error="Please select a plan to continue."
      style={{ width: 360 }}
    >
      {options.map((o) => (
        <Radio key={o.value} value={o.value} label={o.label} />
      ))}
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <RadioGroup key={size} label={`Size: ${size}`} size={size} defaultValue="a">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      ))}
    </div>
  ),
};
