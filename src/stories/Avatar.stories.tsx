import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "@components/ui/Avatar";

/**
 * ## Avatar
 *
 * User profile picture with image, initials, and icon fallback.
 * `AvatarGroup` stacks multiple avatars with overflow count.
 *
 * ### Fallback hierarchy
 * 1. `src` image (if provided and loads successfully)
 * 2. `initials` text (auto-generated from `alt` if not provided)
 * 3. Generic user icon
 *
 * ### Sizes
 * `xs` · `sm` · `md` (default) · `lg` · `xl` · `2xl`
 */
const meta: Meta<typeof Avatar> = {
  title: "Design System/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    ring: { control: "select", options: ["none", "default", "brand", "accent"] },
    online: { control: "select", options: [undefined, true, false] },
  },
  args: {
    alt: "Jane Doe",
    size: "md",
    ring: "none",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { initials: "JD" },
};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    alt: "John Doe",
  },
};

export const Fallback: Story = {
  args: { src: "/nonexistent.jpg", alt: "Jane Smith" },
};

export const Online: Story = {
  args: { initials: "JS", online: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar initials="OV" size={size} />
          <span className="text-xs text-[var(--color-text-tertiary)]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Rings: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="NR" ring="none" size="lg" />
      <Avatar initials="DR" ring="default" size="lg" />
      <Avatar initials="BR" ring="brand" size="lg" />
      <Avatar initials="AR" ring="accent" size="lg" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      size="sm"
      avatars={[
        { alt: "Alice Chen" },
        { alt: "Bob Martin" },
        { alt: "Carol White" },
        { alt: "David Kim" },
        { alt: "Eva Torres" },
        { alt: "Frank Lee" },
        { alt: "Grace Wang" },
      ]}
      max={5}
    />
  ),
};
