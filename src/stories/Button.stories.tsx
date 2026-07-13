import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Download, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@components/ui/Button";

/**
 * ## Button
 *
 * The primary interactive element. Built with CVA for type-safe variants.
 *
 * ### Variants
 * - **primary** — Main CTA. Use sparingly, one per view.
 * - **secondary** — Secondary actions. Cobalt blue.
 * - **outline** — Bordered, transparent background.
 * - **ghost** — No border. For toolbar/icon actions.
 * - **destructive** — Destructive actions (delete, remove).
 * - **glass** — Glassmorphism surface.
 *
 * ### Sizes
 * `xs` · `sm` · `md` (default) · `lg` · `xl`
 *
 * ### Accessibility
 * - `disabled` and `loading` both set `aria-busy` and prevent interaction.
 * - Use descriptive text. Avoid "Click here".
 */
const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive", "glass"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    rounded: {
      control: "select",
      options: ["default", "full"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    variant: "primary",
    size: "md",
    children: "Get Started",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", children: "Get Started" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Learn More" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "View Details" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Cancel" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete Account", leftIcon: <Trash2 size={16} /> },
};

export const Glass: Story = {
  args: { variant: "glass", children: "Explore Platform" },
  parameters: { backgrounds: { default: "dark" } },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<Plus size={16} />}>Add Item</Button>
      <Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
      <Button leftIcon={<Download size={16} />} variant="outline">
        Download
      </Button>
      <Button leftIcon={<Star size={16} />} variant="ghost">
        Favorite
      </Button>
    </div>
  ),
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, children: "Processing…" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Unavailable" },
};

// ─── Rounded ─────────────────────────────────────────────────────────────────

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button rounded="default">Default</Button>
      <Button rounded="full">Pill Shape</Button>
      <Button variant="outline" rounded="full">
        Pill Outline
      </Button>
    </div>
  ),
};

// ─── Full Width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Button fullWidth>Full Width Primary</Button>
      <Button fullWidth variant="outline">
        Full Width Outline
      </Button>
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["primary", "secondary", "outline", "ghost", "destructive", "glass"] as const).map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};
