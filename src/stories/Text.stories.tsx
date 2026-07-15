import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@components/ui/Text";

/**
 * ## Text
 *
 * Typography primitive for all body copy, captions, and labels.
 * Flexible semantic element via the `as` prop.
 *
 * Use `Heading` for headings (h1–h6). Use `Text` for everything else.
 *
 * ### Color Scale
 * - **primary** — High-contrast readable white `#F0F0F0`
 * - **secondary** — Muted `#A0A0B0` — default for body text
 * - **tertiary** — Disabled/placeholder `#60607A`
 * - **brand** — Cyan `#00C4FF`
 */
const meta: Meta<typeof Text> = {
  title: "Design System/Typography/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    as: { control: "select", options: ["p", "span", "div", "label", "small", "strong", "em"] },
    size: { control: "select", options: ["xs", "sm", "base", "lg", "xl"] },
    textColor: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "brand", "inherit"],
    },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    leading: { control: "select", options: ["tight", "normal", "relaxed"] },
    tracking: { control: "select", options: ["tight", "normal", "wide", "widest"] },
  },
  args: {
    as: "p",
    size: "base",
    textColor: "secondary",
    children:
      "OVI — Ingeniería en Limpieza. Diseñamos soluciones inteligentes para resolver desafíos de limpieza industrial mediante productos especializados, servicios, tecnología e inteligencia artificial.",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const SizeScale: Story = {
  render: () => (
    <div className="flex max-w-prose flex-col gap-4">
      {(["xs", "sm", "base", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex items-baseline gap-4">
          <span className="w-8 shrink-0 font-mono text-xs text-[var(--color-text-tertiary)]">
            {size}
          </span>
          <Text size={size}>Ingeniería en limpieza industrial a escala.</Text>
        </div>
      ))}
    </div>
  ),
};

export const ColorScale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["primary", "secondary", "tertiary", "brand"] as const).map((c) => (
        <div key={c} className="flex items-center gap-4">
          <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-tertiary)]">
            {c}
          </span>
          <Text textColor={c}>The quick brown fox jumps over the lazy dog</Text>
        </div>
      ))}
    </div>
  ),
};

export const BodyParagraph: Story = {
  render: () => (
    <div className="max-w-prose space-y-4">
      <Text size="lg" textColor="primary" weight="medium">
        Our Mission
      </Text>
      <Text>
        At OVI, somos el sistema operativo de la limpieza industrial. Integramos ingeniería,
        tecnología, protocolos y datos para resolver desafíos complejos de limpieza, mantenimiento e
        higiene con una visión de largo plazo.
      </Text>
      <Text>
        Con productos especializados, OVI AI y OVI OS, OVI es la plataforma integral que conecta el
        problema con la solución exacta.
      </Text>
      <Text size="sm" textColor="tertiary">
        OVI — Ingeniería en Limpieza · ovi.com
      </Text>
    </div>
  ),
};
