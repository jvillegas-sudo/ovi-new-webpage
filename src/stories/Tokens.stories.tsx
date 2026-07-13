import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Design Tokens
 *
 * The OVI design token system — the single source of truth for all visual decisions.
 *
 * Tokens are defined as CSS custom properties in `globals.css` and as
 * TypeScript constants in `src/config/tokens/`. This allows them to be
 * consumed both in CSS and in component logic.
 *
 * ### Token Categories
 * - **Colors** — Brand palette, backgrounds, text, borders
 * - **Typography** — Font families, sizes, weights, line heights
 * - **Spacing** — 4px grid-based spacing scale
 * - **Radius** — Border radius scale
 * - **Shadows** — Depth and glow effects
 * - **Animation** — Duration and easing curves
 * - **Z-Index** — Stacking order
 */
const meta: Meta = {
  title: "Design System/Tokens",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;

// ─── Color Swatches ───────────────────────────────────────────────────────────

function Swatch({ name, value, cssVar }: { name: string; value: string; cssVar?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-xl border border-[var(--color-border-subtle)]"
        style={{ background: value }}
        title={cssVar ?? value}
      />
      <div>
        <p className="text-xs font-medium text-[var(--color-text-primary)]">{name}</p>
        <p className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{value}</p>
      </div>
    </div>
  );
}

function TokenSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

export const Colors: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-10">
      <TokenSection title="Brand">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          <Swatch name="Primary" value="#00C4FF" cssVar="--color-brand-primary" />
          <Swatch name="Secondary" value="#0047AB" cssVar="--color-brand-secondary" />
          <Swatch name="Accent" value="#00FF85" cssVar="--color-brand-accent" />
          <Swatch name="Danger" value="#FF3B3B" cssVar="--color-brand-danger" />
          <Swatch name="Warning" value="#FFA500" cssVar="--color-brand-warning" />
          <Swatch name="Success" value="#00C851" cssVar="--color-brand-success" />
        </div>
      </TokenSection>

      <TokenSection title="Backgrounds">
        <div className="grid grid-cols-4 gap-4">
          <Swatch name="Base" value="#050508" cssVar="--color-bg-base" />
          <Swatch name="Surface" value="#0A0A0F" cssVar="--color-bg-surface" />
          <Swatch name="Elevated" value="#0F0F18" cssVar="--color-bg-elevated" />
          <Swatch name="Overlay" value="rgba(5,5,8,0.85)" cssVar="--color-bg-overlay" />
        </div>
      </TokenSection>

      <TokenSection title="Text">
        <div className="grid grid-cols-4 gap-4">
          <Swatch name="Primary" value="#F0F0F0" cssVar="--color-text-primary" />
          <Swatch name="Secondary" value="#A0A0B0" cssVar="--color-text-secondary" />
          <Swatch name="Tertiary" value="#60607A" cssVar="--color-text-tertiary" />
          <Swatch name="Inverse" value="#050508" cssVar="--color-text-inverse" />
        </div>
      </TokenSection>

      <TokenSection title="Gradients">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div
              className="h-16 rounded-xl"
              style={{ background: "linear-gradient(135deg, #00C4FF 0%, #0047AB 100%)" }}
            />
            <p className="text-xs font-medium text-[var(--color-text-primary)]">Brand</p>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="h-16 rounded-xl"
              style={{ background: "linear-gradient(135deg, #00FF85 0%, #00C4FF 100%)" }}
            />
            <p className="text-xs font-medium text-[var(--color-text-primary)]">Bio Green</p>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="h-16 rounded-xl border border-[var(--color-border-subtle)]"
              style={{ background: "linear-gradient(180deg, #050508 0%, #0A0A0F 100%)" }}
            />
            <p className="text-xs font-medium text-[var(--color-text-primary)]">Dark</p>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="h-16 rounded-xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,196,255,0.3) 0%, transparent 70%), #050508",
              }}
            />
            <p className="text-xs font-medium text-[var(--color-text-primary)]">Radial Glow</p>
          </div>
        </div>
      </TokenSection>
    </div>
  ),
};

// ─── Typography Scale ─────────────────────────────────────────────────────────

export const Typography: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8">
      <TokenSection title="Font Families">
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Display", className: "font-display", sample: "Aa — Display" },
            { name: "Body (Sans)", className: "font-sans", sample: "Aa — Body" },
            { name: "Mono", className: "font-mono", sample: "Aa — Mono" },
          ].map(({ name, className, sample }) => (
            <div key={name} className="rounded-xl border border-[var(--color-border-subtle)] p-4">
              <p className={`text-2xl font-bold text-[var(--color-text-primary)] ${className}`}>
                {sample}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">{name}</p>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Type Scale">
        <div className="flex flex-col gap-3">
          {[
            { name: "2xs", value: "0.75rem (12px)", cls: "text-xs" },
            { name: "xs", value: "0.8125rem (13px)", cls: "text-xs" },
            { name: "sm", value: "0.875rem (14px)", cls: "text-sm" },
            { name: "base", value: "1rem (16px)", cls: "text-base" },
            { name: "lg", value: "1.125rem (18px)", cls: "text-lg" },
            { name: "xl", value: "1.25rem (20px)", cls: "text-xl" },
            { name: "2xl", value: "1.5rem (24px)", cls: "text-2xl" },
            { name: "3xl", value: "clamp(1.75–2rem)", cls: "text-3xl" },
            { name: "4xl", value: "clamp(2–2.5rem)", cls: "text-4xl" },
            { name: "5xl", value: "clamp(2.5–3.5rem)", cls: "text-5xl" },
          ].map(({ name, value, cls }) => (
            <div key={name} className="flex items-baseline gap-6">
              <span className="w-10 shrink-0 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                {name}
              </span>
              <span className={`${cls} leading-tight text-[var(--color-text-primary)]`}>
                The quick brown fox
              </span>
              <span className="ml-auto font-mono text-[10px] text-[var(--color-text-tertiary)]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </TokenSection>
    </div>
  ),
};

// ─── Spacing Scale ────────────────────────────────────────────────────────────

export const Spacing: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="mb-4 text-xs text-[var(--color-text-tertiary)]">
        Based on a 4px base unit grid
      </p>
      {[
        [0.5, "2px"],
        [1, "4px"],
        [2, "8px"],
        [3, "12px"],
        [4, "16px"],
        [5, "20px"],
        [6, "24px"],
        [8, "32px"],
        [10, "40px"],
        [12, "48px"],
        [16, "64px"],
        [20, "80px"],
        [24, "96px"],
        [32, "128px"],
      ].map(([token, px]) => (
        <div key={String(token)} className="flex items-center gap-4">
          <span className="w-8 shrink-0 font-mono text-xs text-[var(--color-text-tertiary)]">
            {token}
          </span>
          <div
            className="h-4 rounded-sm bg-[var(--color-brand-primary)] opacity-70"
            style={{ width: `${Number(String(px).replace("px", ""))}px` }}
          />
          <span className="font-mono text-xs text-[var(--color-text-tertiary)]">{px}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Border Radius ────────────────────────────────────────────────────────────

export const BorderRadius: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {[
        { name: "xs", value: "0.125rem (2px)", cls: "rounded-xs" },
        { name: "sm", value: "0.25rem (4px)", cls: "rounded-sm" },
        { name: "md", value: "0.5rem (8px)", cls: "rounded-md" },
        { name: "lg", value: "0.75rem (12px)", cls: "rounded-lg" },
        { name: "xl", value: "1rem (16px)", cls: "rounded-xl" },
        { name: "2xl", value: "1.5rem (24px)", cls: "rounded-2xl" },
        { name: "3xl", value: "2rem (32px)", cls: "rounded-3xl" },
        { name: "full", value: "9999px", cls: "rounded-full" },
      ].map(({ name, value, cls }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div
            className={`size-16 border border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)] ${cls}`}
          />
          <p className="text-xs font-medium text-[var(--color-text-primary)]">{name}</p>
          <p className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{value}</p>
        </div>
      ))}
    </div>
  ),
};

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const Shadows: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {[
        { name: "sm", shadow: "0 2px 4px rgba(0, 0, 0, 0.5)" },
        { name: "md", shadow: "0 4px 12px rgba(0, 0, 0, 0.6)" },
        { name: "lg", shadow: "0 8px 24px rgba(0, 0, 0, 0.7)" },
        { name: "xl", shadow: "0 16px 48px rgba(0, 0, 0, 0.8)" },
        {
          name: "glow-primary",
          shadow: "0 0 20px rgba(0, 196, 255, 0.3), 0 0 60px rgba(0, 196, 255, 0.1)",
        },
        {
          name: "glow-accent",
          shadow: "0 0 20px rgba(0, 255, 133, 0.3), 0 0 60px rgba(0, 255, 133, 0.1)",
        },
        {
          name: "glass",
          shadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        },
      ].map(({ name, shadow }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div
            className="size-20 rounded-xl bg-[var(--color-bg-elevated)]"
            style={{ boxShadow: shadow }}
          />
          <p className="font-mono text-xs text-[var(--color-text-secondary)]">{name}</p>
        </div>
      ))}
    </div>
  ),
};

// ─── Animation ────────────────────────────────────────────────────────────────

export const AnimationTokens: StoryObj = {
  name: "Animation",
  render: () => (
    <div className="flex flex-col gap-6">
      <TokenSection title="Duration">
        <div className="flex gap-6">
          {[
            { name: "fast", value: "200ms", cssVar: "--duration-fast" },
            { name: "normal", value: "300ms", cssVar: "--duration-normal" },
            { name: "slow", value: "500ms", cssVar: "--duration-slow" },
          ].map(({ name, value }) => (
            <div key={name} className="flex flex-col gap-2">
              <div className="flex h-8 items-center gap-2">
                <div
                  className="h-1 rounded-full bg-[var(--color-brand-primary)]"
                  style={{ width: parseInt(value) / 3 }}
                />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
              <p className="font-mono text-xs text-[var(--color-text-tertiary)]">{value}</p>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Easing Curves">
        <div className="flex flex-col gap-3">
          {[
            {
              name: "smooth",
              value: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              desc: "Standard transitions",
            },
            {
              name: "cinema",
              value: "cubic-bezier(0.16, 1, 0.3, 1)",
              desc: "Content reveals, entrances",
            },
            {
              name: "spring",
              value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              desc: "Bouncy interactions",
            },
          ].map(({ name, value, desc }) => (
            <div
              key={name}
              className="rounded-lg border border-[var(--color-border-subtle)] px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">{desc}</p>
              </div>
              <p className="mt-1 font-mono text-xs text-[var(--color-brand-primary)]">{value}</p>
            </div>
          ))}
        </div>
      </TokenSection>
    </div>
  ),
};
