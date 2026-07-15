import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@components/ui/Breadcrumb";
import { FlaskConical } from "lucide-react";

/**
 * ## Breadcrumb
 *
 * Navigation trail showing the current page's hierarchy.
 *
 * ### Accessibility
 * - Rendered inside `<nav aria-label="Breadcrumb">`
 * - Current page marked with `aria-current="page"`
 *
 * ### Usage
 * The last item in the array is always treated as the current page
 * and rendered non-interactively.
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Design System/Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Plataforma OVI" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const WithHomeIcon: Story = {
  args: { showHome: true },
};

export const Deep: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Research", href: "/research" },
      { label: "Compounds", href: "/research/compounds" },
      { label: "Batch #4891", href: "/research/compounds/4891" },
      { label: "Analysis Report" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Lab", href: "/lab", icon: <FlaskConical size={12} /> },
      { label: "Compound #88", icon: <FlaskConical size={12} /> },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "Products", href: "/products" }, { label: "OVI BioCore" }],
  },
};
