import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@components/ui/Tooltip";
import { Button } from "@components/ui/Button";
import { IconButton } from "@components/ui/Icon";
import { Copy, Settings, Info } from "lucide-react";

/**
 * ## Tooltip
 *
 * Floating label that appears on hover or focus.
 * Rendered as an accessible `role="tooltip"` element linked via `aria-describedby`.
 *
 * ### Placement
 * `top` (default) · `bottom` · `left` · `right`
 *
 * ### When to use
 * - Clarify icon-only buttons
 * - Show keyboard shortcuts
 * - Provide short contextual information without cluttering the UI
 *
 * ### When NOT to use
 * - For critical information — use Alert or inline text instead
 * - For interactive content (dropdowns, links) — use a Popover
 */
const meta: Meta<typeof Tooltip> = {
  title: "Design System/Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    content: { control: "text" },
  },
  args: {
    content: "Copy to clipboard",
    placement: "top",
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon={Copy} aria-label="Copy" variant="outline" />
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 place-items-center gap-8 p-12">
      <div />
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outline" size="sm">
          Top
        </Button>
      </Tooltip>
      <div />

      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline" size="sm">
          Left
        </Button>
      </Tooltip>
      <div className="flex size-16 items-center justify-center rounded-xl border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-tertiary)]">
        center
      </div>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline" size="sm">
          Right
        </Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline" size="sm">
          Bottom
        </Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <div className="flex gap-3">
      <Tooltip content="Settings">
        <IconButton icon={Settings} aria-label="Settings" variant="ghost" />
      </Tooltip>
      <Tooltip content="More info">
        <IconButton icon={Info} aria-label="Info" variant="ghost" />
      </Tooltip>
      <Tooltip content="Copy value ⌘C">
        <IconButton icon={Copy} aria-label="Copy" variant="outline" />
      </Tooltip>
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip content="Open command palette — ⌘K" placement="bottom">
      <Button variant="ghost" size="sm">
        Search
      </Button>
    </Tooltip>
  ),
};
