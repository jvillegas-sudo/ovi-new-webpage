"use client";

/**
 * UI Component: Checkbox
 *
 * Styled checkbox with label, hint, and error support.
 * Built on a native <input type="checkbox"> for full accessibility.
 * Works with React Hook Form via ref forwarding.
 *
 * @example
 *   <Checkbox label="Accept terms" />
 *   <Checkbox label="Subscribe" checked={checked} onChange={setChecked} />
 */

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@utils/cn";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  hint?: string;
  error?: string;
  /** Indeterminate state — used in select-all patterns */
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { box: "size-4", icon: 10, text: "text-sm" },
  md: { box: "size-5", icon: 12, text: "text-sm" },
  lg: { box: "size-6", icon: 14, text: "text-base" },
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      hint,
      error,
      indeterminate = false,
      size = "md",
      id,
      disabled,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const checkboxId = id ?? `checkbox-${generatedId}`;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const hintId = hint ? `${checkboxId}-hint` : undefined;

    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const { box, icon, text } = sizeMap[size];

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex cursor-pointer items-start gap-2.5",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {/* Hidden native input */}
          <input
            ref={combinedRef}
            type="checkbox"
            id={checkboxId}
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            disabled={disabled}
            onChange={(e) => {
              if (!isControlled) setInternalChecked(e.target.checked);
              onChange?.(e);
            }}
            className="sr-only"
            aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
            aria-invalid={error ? "true" : undefined}
            {...props}
          />

          {/* Custom checkbox box */}
          <span
            className={cn(
              box,
              "flex shrink-0 items-center justify-center rounded",
              "border transition-all duration-200",
              isChecked || indeterminate
                ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]"
                : "border-[var(--color-border-default)] bg-[var(--glass-bg)]",
              !disabled &&
                !(isChecked || indeterminate) &&
                "group-hover:border-[var(--color-brand-primary)]",
              error && !(isChecked || indeterminate) && "border-[var(--color-brand-danger)]",
            )}
            aria-hidden="true"
          >
            {indeterminate ? (
              <Minus size={icon} className="stroke-[3] text-[var(--color-text-inverse)]" />
            ) : isChecked ? (
              <Check size={icon} className="stroke-[3] text-[var(--color-text-inverse)]" />
            ) : null}
          </span>

          {/* Label text */}
          {label && (
            <span className={cn(text, "leading-snug text-[var(--color-text-primary)]", "mt-px")}>
              {label}
            </span>
          )}
        </label>

        {hint && !error && (
          <p
            id={hintId}
            className="ml-[calc(var(--size)+0.625rem)] pl-7 text-xs text-[var(--color-text-tertiary)]"
          >
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="pl-7 text-xs text-[var(--color-brand-danger)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
