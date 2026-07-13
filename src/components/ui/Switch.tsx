"use client";

/**
 * UI Component: Switch / Toggle
 *
 * Boolean toggle input — an accessible alternative to a checkbox
 * when the action takes immediate effect (no submit needed).
 *
 * @example
 *   <Switch label="Dark mode" checked={isDark} onChange={setIsDark} />
 *   <Switch label="Notifications" size="lg" />
 */

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@utils/cn";

const switchTrackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-within:ring-2 focus-within:ring-[var(--color-brand-primary)] focus-within:ring-offset-1 focus-within:ring-offset-[var(--color-bg-base)]",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[3.25rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none absolute left-0.5 top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const translateMap = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-6",
};

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  labelPosition?: "left" | "right";
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "accent" | "success";
}

const colorMap = {
  default: "bg-[var(--color-brand-primary)]",
  accent: "bg-[var(--color-brand-accent)]",
  success: "bg-[var(--color-brand-success)]",
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      labelPosition = "right",
      hint,
      error,
      size = "md",
      color = "default",
      id,
      checked,
      defaultChecked,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const switchId = id ?? `switch-${generatedId}`;
    const errorId = error ? `${switchId}-error` : undefined;
    const hintId = hint ? `${switchId}-hint` : undefined;

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    const Track = (
      <span
        className={cn(
          switchTrackVariants({ size }),
          isChecked
            ? colorMap[color]
            : "border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]",
          disabled && "cursor-not-allowed opacity-50",
        )}
        aria-hidden="true"
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          aria-checked={isChecked}
          aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        <span
          className={cn(
            switchThumbVariants({ size }),
            isChecked ? translateMap[size] : "translate-x-0",
          )}
        />
      </span>
    );

    if (!label) {
      return (
        <div className={cn("flex flex-col gap-1.5", className)}>
          {Track}
          {error && (
            <p id={errorId} className="text-xs text-[var(--color-brand-danger)]" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }

    const textSizeMap = { sm: "text-sm", md: "text-sm", lg: "text-base" };

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={switchId}
          className={cn(
            "flex cursor-pointer items-center gap-3",
            labelPosition === "left" && "flex-row-reverse justify-end",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {Track}
          <div className="flex flex-col">
            <span
              className={cn(
                textSizeMap[size],
                "leading-snug font-medium text-[var(--color-text-primary)]",
              )}
            >
              {label}
            </span>
            {hint && !error && (
              <span id={hintId} className="text-xs text-[var(--color-text-tertiary)]">
                {hint}
              </span>
            )}
          </div>
        </label>
        {error && (
          <p id={errorId} className="text-xs text-[var(--color-brand-danger)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
