import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@components/ui/Checkbox";

/**
 * ## Checkbox
 *
 * Styled checkbox with label, hint, and error support.
 * Native `<input type="checkbox">` for full accessibility.
 * Supports indeterminate state for select-all patterns.
 */
const meta: Meta<typeof Checkbox> = {
  title: "Design System/Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: {
    label: "Accept terms and conditions",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all" },
};

export const WithHint: Story = {
  args: {
    label: "Subscribe to newsletter",
    hint: "We send at most one email per week.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms and conditions",
    error: "You must accept the terms to continue.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Unavailable option" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" defaultChecked />
      <Checkbox size="md" label="Medium checkbox (default)" defaultChecked />
      <Checkbox size="lg" label="Large checkbox" defaultChecked />
    </div>
  ),
};

export const FormGroup: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
        Notification preferences
      </legend>
      <Checkbox label="Product updates" defaultChecked />
      <Checkbox label="Security alerts" defaultChecked />
      <Checkbox label="Newsletter" />
      <Checkbox label="Marketing emails" disabled />
    </fieldset>
  ),
};
