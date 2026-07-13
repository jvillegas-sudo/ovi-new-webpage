import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Lock, Search, Eye } from "lucide-react";
import { Input } from "@components/ui/Input";

/**
 * ## Input
 *
 * Text input with built-in label, error, and hint text.
 * Fully accessible — `aria-describedby` links input to error/hint.
 * Works with React Hook Form via ref forwarding.
 *
 * ### States
 * - Default
 * - With label, hint, or error
 * - With left/right icons
 * - Disabled
 */
const meta: Meta<typeof Input> = {
  title: "Design System/Forms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Enter value…",
    style: { width: 320 },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "you@company.com",
    type: "email",
  },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    placeholder: "@handle",
    hint: "3–20 characters, letters and numbers only.",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    type: "password",
    value: "short",
    error: "Password must be at least 8 characters.",
    readOnly: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    leftIcon: <Mail size={16} />,
    type: "email",
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    rightIcon: <Eye size={16} />,
  },
};

export const SearchInput: Story = {
  args: {
    placeholder: "Search compounds…",
    leftIcon: <Search size={16} />,
    type: "search",
  },
};

export const Disabled: Story = {
  args: {
    label: "API Key",
    value: "ovi_sk_••••••••••••••••",
    rightIcon: <Lock size={16} />,
    disabled: true,
    readOnly: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      <Input label="Default" placeholder="Enter value" />
      <Input label="With hint" placeholder="@handle" hint="Lowercase letters only." />
      <Input label="With error" placeholder="Email" error="Invalid email address." />
      <Input label="Disabled" value="Locked value" disabled readOnly />
      <Input label="With icon" placeholder="Search…" leftIcon={<Search size={16} />} />
    </div>
  ),
};
