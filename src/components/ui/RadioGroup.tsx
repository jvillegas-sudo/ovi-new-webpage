"use client";

/**
 * UI Component: RadioGroup + Radio
 *
 * Accessible radio button group with styled cards or inline variants.
 * Uses React context to manage group state.
 *
 * @example
 *   <RadioGroup value={value} onChange={setValue} label="Plan">
 *     <Radio value="starter" label="Starter" description="For individuals" />
 *     <Radio value="pro" label="Pro" description="For teams" />
 *   </RadioGroup>
 */

import * as React from "react";
import { cn } from "@utils/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

interface RadioGroupContext {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  variant: "default" | "card";
  size: "sm" | "md" | "lg";
  error?: string;
}

const RadioGroupCtx = React.createContext<RadioGroupContext | null>(null);

function useRadioGroup() {
  const ctx = React.useContext(RadioGroupCtx);
  if (!ctx) throw new Error("Radio must be used inside RadioGroup");
  return ctx;
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  /** Controlled selected value */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  variant?: "default" | "card";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function RadioGroup({
  value,
  defaultValue,
  onChange,
  name,
  label,
  hint,
  error,
  disabled,
  variant = "default",
  size = "md",
  orientation = "vertical",
  children,
  className,
  style,
}: RadioGroupProps) {
  const generatedName = React.useId();
  const groupName = name ?? `radio-${generatedName}`;
  const errorId = error ? `${groupName}-error` : undefined;

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <RadioGroupCtx.Provider
      value={{
        name: groupName,
        value: currentValue,
        onChange: handleChange,
        disabled,
        variant,
        size,
        error,
      }}
    >
      <fieldset
        className={cn("flex flex-col gap-2", className)}
        style={style}
        aria-describedby={errorId}
      >
        {label && (
          <legend className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">
            {label}
          </legend>
        )}
        <div
          className={cn(
            "flex gap-2",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          )}
          role="radiogroup"
        >
          {children}
        </div>
        {hint && !error && <p className="text-xs text-[var(--color-text-tertiary)]">{hint}</p>}
        {error && (
          <p id={errorId} className="text-xs text-[var(--color-brand-danger)]" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    </RadioGroupCtx.Provider>
  );
}

RadioGroup.displayName = "RadioGroup";

// ─── Radio ────────────────────────────────────────────────────────────────────

export interface RadioProps {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { dot: "size-3.5", inner: "size-1.5", text: "text-sm" },
  md: { dot: "size-4", inner: "size-2", text: "text-sm" },
  lg: { dot: "size-5", inner: "size-2.5", text: "text-base" },
};

function Radio({ value, label, description, disabled, className }: RadioProps) {
  const group = useRadioGroup();
  const isChecked = group.value === value;
  const isDisabled = disabled ?? group.disabled;
  const inputId = `${group.name}-${value}`;
  const { dot, inner, text } = sizeMap[group.size];

  if (group.variant === "card") {
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "relative flex cursor-pointer gap-3 rounded-xl border p-4 transition-all duration-200",
          isChecked
            ? "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.06)]"
            : "border-[var(--color-border-default)] bg-[var(--glass-bg)] hover:border-[var(--color-border-strong)]",
          isDisabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input
          type="radio"
          id={inputId}
          name={group.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => group.onChange(value)}
          className="sr-only"
        />
        <span
          className={cn(
            dot,
            "mt-0.5 flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
            isChecked
              ? "border-[var(--color-brand-primary)]"
              : "border-[var(--color-border-default)]",
          )}
          aria-hidden="true"
        >
          {isChecked && (
            <span className={cn(inner, "rounded-full bg-[var(--color-brand-primary)]")} />
          )}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className={cn(text, "font-medium text-[var(--color-text-primary)]")}>{label}</span>
          {description && (
            <span className="text-xs text-[var(--color-text-tertiary)]">{description}</span>
          )}
        </div>
      </label>
    );
  }

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-start gap-2.5",
        isDisabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        type="radio"
        id={inputId}
        name={group.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => group.onChange(value)}
        className="sr-only"
      />
      <span
        className={cn(
          dot,
          "mt-0.5 flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
          isChecked
            ? "border-[var(--color-brand-primary)]"
            : "border-[var(--color-border-default)] bg-[var(--glass-bg)]",
        )}
        aria-hidden="true"
      >
        {isChecked && (
          <span className={cn(inner, "rounded-full bg-[var(--color-brand-primary)]")} />
        )}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className={cn(text, "leading-snug text-[var(--color-text-primary)]")}>{label}</span>
        {description && (
          <span className="text-xs text-[var(--color-text-tertiary)]">{description}</span>
        )}
      </div>
    </label>
  );
}

Radio.displayName = "Radio";

export { RadioGroup, Radio };
