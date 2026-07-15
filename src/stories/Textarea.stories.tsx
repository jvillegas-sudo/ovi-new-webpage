import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@components/ui/Textarea";

/**
 * ## Textarea
 *
 * Multi-line text input sharing the same design language as Input.
 * Supports auto-resize, label, hint, and error states.
 * Compatible with React Hook Form via ref forwarding.
 */
const meta: Meta<typeof Textarea> = {
  title: "Design System/Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    autoResize: { control: "boolean" },
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 20 } },
  },
  args: {
    placeholder: "Describe your project…",
    style: { width: 360 },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Project description",
    hint: "Briefly describe your cleaning operation challenge.",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Notes",
    value: "Too short",
    error: "Must be at least 20 characters.",
    readOnly: true,
  },
};

export const AutoResize: Story = {
  args: {
    label: "Auto-resizing textarea",
    autoResize: true,
    placeholder: "Type to see the textarea grow…",
    hint: "This textarea resizes automatically as you type.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Read-only notes",
    value: "This content cannot be edited.",
    disabled: true,
    readOnly: true,
  },
};
