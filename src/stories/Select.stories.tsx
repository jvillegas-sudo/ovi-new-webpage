import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@components/ui/Select";

/**
 * ## Select
 *
 * Styled native `<select>` with full label/hint/error support.
 * Uses a custom chevron and glassmorphism styling.
 * Compatible with React Hook Form.
 */
const meta: Meta<typeof Select> = {
  title: "Design System/Forms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Country",
    placeholder: "Select a country…",
    style: { width: 320 },
    options: [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Germany", value: "de" },
      { label: "Japan", value: "jp" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Select the country where your facility is located." },
};

export const WithError: Story = {
  args: { error: "Please select a valid country." },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      <Select
        label="Industry"
        placeholder="Select industry…"
        options={[
          { label: "Industrial Cleaning", value: "cleaning" },
          { label: "Pharmaceuticals", value: "pharma" },
          { label: "Chemical Manufacturing", value: "chem" },
          { label: "Agriculture", value: "ag" },
        ]}
      />
      <Select
        label="Team size"
        placeholder="Select size…"
        options={[
          { label: "1–10 employees", value: "xs" },
          { label: "11–50 employees", value: "sm" },
          { label: "51–200 employees", value: "md" },
          { label: "200+ employees", value: "lg" },
        ]}
        hint="Used to tailor your onboarding experience."
      />
    </div>
  ),
};
