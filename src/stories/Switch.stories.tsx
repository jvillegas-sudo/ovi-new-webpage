import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@components/ui/Switch";

/**
 * ## Switch
 *
 * Boolean toggle for settings that take immediate effect.
 * Prefer Switch over Checkbox when the change applies without a form submit.
 *
 * ### Sizes
 * `sm` · `md` (default) · `lg`
 *
 * ### Colors
 * `default` (cyan) · `accent` (bio-green) · `success` (green)
 */
const meta: Meta<typeof Switch> = {
  title: "Design System/Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["default", "accent", "success"] },
    labelPosition: { control: "select", options: ["left", "right"] },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Enable notifications",
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithHint: Story = {
  args: {
    label: "Dark mode",
    hint: "Reduces eye strain in low-light environments.",
    defaultChecked: true,
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Brand (default)" color="default" defaultChecked />
      <Switch label="Accent (bio-green)" color="accent" defaultChecked />
      <Switch label="Success (green)" color="success" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium (default)" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const LabelLeft: Story = {
  args: { labelPosition: "left", label: "Sync automatically", defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Feature locked", defaultChecked: true },
};

export const SettingsGroup: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <p className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</p>
      <Switch label="Email alerts" defaultChecked />
      <Switch label="Push notifications" />
      <Switch label="Weekly digest" defaultChecked />
      <Switch label="Marketing emails" disabled />
    </div>
  ),
};
