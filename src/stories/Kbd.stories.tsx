import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "@components/ui/Kbd";

/**
 * ## Kbd (Keyboard Shortcut)
 *
 * Renders keyboard key names with a hardware-key visual style.
 * Use in tooltips, documentation, or shortcut guides.
 *
 * @example
 *   <Kbd>⌘</Kbd>
 *   <span className="flex items-center gap-1">
 *     <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
 *   </span>
 */
const meta: Meta<typeof Kbd> = {
  title: "Design System/Typography/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "⌘" },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {};

export const Keys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["⌘", "⌥", "⇧", "⌃", "Enter", "Esc", "Tab", "↑", "↓", "←", "→", "Del", "Space"].map(
        (key) => (
          <Kbd key={key}>{key}</Kbd>
        ),
      )}
    </div>
  ),
};

export const Shortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { label: "Open command palette", keys: ["⌘", "K"] },
        { label: "Save", keys: ["⌘", "S"] },
        { label: "Undo", keys: ["⌘", "Z"] },
        { label: "Find & replace", keys: ["⌘", "⇧", "H"] },
        { label: "Close modal", keys: ["Esc"] },
      ].map(({ label, keys }) => (
        <div key={label} className="flex items-center justify-between gap-8" style={{ width: 300 }}>
          <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
          <span className="flex items-center gap-1">
            {keys.map((k, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-[var(--color-text-tertiary)]">+</span>}
                <Kbd>{k}</Kbd>
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  ),
};
