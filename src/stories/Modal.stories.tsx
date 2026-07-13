import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "@components/ui/Modal";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";

/**
 * ## Modal / Dialog
 *
 * Accessible modal dialog with animated entrance/exit.
 * Built with Framer Motion and follows WAI-ARIA dialog pattern.
 *
 * ### Features
 * - Focus trap
 * - Escape key to dismiss
 * - Backdrop click to dismiss
 * - Scroll lock on body
 * - ARIA labelling via `title` / `description`
 *
 * ### Sizes
 * `sm` · `md` (default) · `lg` · `xl` · `full`
 *
 * ### Exported as
 * Both `Modal` and `Dialog` (alias) are exported.
 */
const meta: Meta<typeof Modal> = {
  title: "Design System/Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
    title: { control: "text" },
    description: { control: "text" },
    isOpen: { control: "boolean" },
  },
  args: {
    size: "md",
    title: "Confirm Action",
    description: "This action cannot be undone.",
    isOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo({
  size = "md" as "sm" | "md" | "lg" | "xl" | "full",
  title = "Modal Title",
  description = "",
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size={size}
        title={title}
        description={description}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Your modal content goes here. This area is fully scrollable for tall content.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo title="Confirm Action" description="This action cannot be undone." />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <ModalDemo key={size} size={size} title={`${size.toUpperCase()} Modal`} />
      ))}
    </div>
  ),
};

function WithFormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Invite Team Member</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Invite Team Member"
        description="Send an invitation to join your workspace."
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <Input label="Email address" type="email" placeholder="colleague@company.com" />
          <Input label="Role" placeholder="Researcher, Engineer…" />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export const WithForm: Story = {
  render: () => <WithFormDemo />,
};
