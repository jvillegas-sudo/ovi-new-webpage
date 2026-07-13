import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Flame,
  FlaskConical,
  Globe,
  Heart,
  Mail,
  MapPin,
  Moon,
  Search,
  Settings,
  Star,
  Trash2,
  Zap,
} from "lucide-react";
import { Icon, IconButton } from "@components/ui/Icon";

/**
 * ## Icon
 *
 * Wrapper around lucide-react icons with consistent sizing and colour.
 *
 * ### When to use
 * - Use `Icon` for inline display icons (in text, cards, badges)
 * - Use `IconButton` for clickable icon-only actions — always requires `aria-label`
 *
 * ### Accessibility
 * - Decorative icons (default): `aria-hidden="true"` is set automatically
 * - Standalone icons: pass `aria-label` to make them accessible
 *
 * ### Available colours
 * `inherit` · `default` · `muted` · `primary` · `brand` · `accent` ·
 * `secondary` · `success` · `warning` · `danger`
 */
const meta: Meta<typeof Icon> = {
  title: "Design System/Icons/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    iconColor: {
      control: "select",
      options: [
        "inherit",
        "default",
        "muted",
        "primary",
        "brand",
        "accent",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
  args: {
    icon: Star,
    size: "md",
    iconColor: "brand",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const SizeScale: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={Zap} size={size} iconColor="brand" />
          <span className="text-xs text-[var(--color-text-tertiary)]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          ["inherit", "inherit"],
          ["default", "tertiary"],
          ["muted", "secondary"],
          ["primary", "white"],
          ["brand", "cyan"],
          ["accent", "green"],
          ["secondary", "cobalt"],
          ["success", "success"],
          ["warning", "warning"],
          ["danger", "danger"],
        ] as const
      ).map(([iconColor, label]) => (
        <div key={iconColor} className="flex flex-col items-center gap-2">
          <Icon icon={Star} size="lg" iconColor={iconColor} />
          <span className="text-xs text-[var(--color-text-tertiary)]">{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const IconGallery: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-6">
      {[
        ArrowRight,
        Download,
        ExternalLink,
        Flame,
        FlaskConical,
        Globe,
        Heart,
        Mail,
        MapPin,
        Moon,
        Search,
        Settings,
        Star,
        Trash2,
        Zap,
      ].map((IconComponent, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Icon icon={IconComponent} size="md" iconColor="muted" />
        </div>
      ))}
    </div>
  ),
};

// ─── IconButton ───────────────────────────────────────────────────────────────

export const IconButtonGhost: StoryObj<typeof IconButton> = {
  render: () => (
    <div className="flex gap-2">
      <IconButton icon={Search} aria-label="Search" variant="ghost" />
      <IconButton icon={Settings} aria-label="Settings" variant="ghost" />
      <IconButton icon={Mail} aria-label="Messages" variant="ghost" />
    </div>
  ),
};

export const IconButtonVariants: StoryObj<typeof IconButton> = {
  render: () => (
    <div className="flex gap-3">
      <IconButton icon={Star} aria-label="Favorite" variant="ghost" />
      <IconButton icon={Star} aria-label="Favorite" variant="outline" />
      <IconButton icon={Star} aria-label="Favorite" variant="solid" />
    </div>
  ),
};

export const IconButtonSizes: StoryObj<typeof IconButton> = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <IconButton
          key={size}
          icon={Zap}
          aria-label={`Size ${size}`}
          size={size}
          variant="outline"
        />
      ))}
    </div>
  ),
};
