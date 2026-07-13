import type { Meta, StoryObj } from "@storybook/react";
import { FormField, FormGroup } from "@components/ui/FormField";
import { Input } from "@components/ui/Input";
import { Select } from "@components/ui/Select";
import { Textarea } from "@components/ui/Textarea";
import { Checkbox } from "@components/ui/Checkbox";
import { Button } from "@components/ui/Button";

/**
 * ## FormField / FormGroup
 *
 * `FormField` is a layout wrapper that composes Label + form control + hint/error.
 * `FormGroup` groups related fields with an optional title and description.
 *
 * ### When to use
 * - Use `FormField` when building forms without React Hook Form's `register` field bindings
 * - Use the `label`, `hint`, and `error` props directly on `Input`/`Select`/`Textarea` for simpler cases
 * - Use `FormGroup` to separate logical sections in long forms
 */
const meta: Meta = {
  title: "Design System/Forms/FormField",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

export const BasicField: StoryObj = {
  render: () => (
    <FormField
      label="Email address"
      htmlFor="email"
      required
      style={{ width: 360 } as React.CSSProperties}
    >
      <Input id="email" type="email" placeholder="you@company.com" />
    </FormField>
  ),
};

export const WithHint: StoryObj = {
  render: () => (
    <FormField
      label="Workspace slug"
      htmlFor="slug"
      hint="Lowercase letters, numbers, and hyphens only."
      style={{ width: 360 } as React.CSSProperties}
    >
      <Input id="slug" placeholder="my-workspace" />
    </FormField>
  ),
};

export const WithError: StoryObj = {
  render: () => (
    <FormField
      label="Password"
      htmlFor="pw"
      error="Password must be at least 8 characters."
      style={{ width: 360 } as React.CSSProperties}
    >
      <Input id="pw" type="password" defaultValue="123" />
    </FormField>
  ),
};

export const CompleteForm: StoryObj = {
  render: () => (
    <form
      className="flex flex-col gap-6"
      style={{ width: 440 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <FormGroup title="Account Details" description="Basic information for your OVI account.">
        <FormField label="Full name" htmlFor="name" required>
          <Input id="name" placeholder="Jane Doe" />
        </FormField>
        <FormField label="Work email" htmlFor="email" required>
          <Input id="email" type="email" placeholder="you@company.com" />
        </FormField>
      </FormGroup>

      <FormGroup title="Organisation" description="Tell us about your company.">
        <FormField label="Company name" htmlFor="company" required>
          <Input id="company" placeholder="BioTech Corp" />
        </FormField>
        <FormField label="Industry" htmlFor="industry">
          <Select
            id="industry"
            placeholder="Select industry…"
            options={[
              { label: "Biotechnology", value: "biotech" },
              { label: "Pharmaceuticals", value: "pharma" },
              { label: "Chemical Manufacturing", value: "chem" },
            ]}
          />
        </FormField>
        <FormField label="Tell us about your project" htmlFor="desc" optional>
          <Textarea id="desc" placeholder="Brief description…" rows={3} />
        </FormField>
      </FormGroup>

      <Checkbox label="I agree to the Terms of Service and Privacy Policy" />

      <Button type="submit" variant="primary">
        Create Account
      </Button>
    </form>
  ),
};
