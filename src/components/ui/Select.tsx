"use client";

/**
 * UI Component: Select
 *
 * Styled native select element with full label/hint/error support.
 * Uses a custom chevron icon and glassmorphism styling.
 * Works seamlessly with React Hook Form via ref forwarding.
 *
 * @example
 *   <Select label="Country" options={countries} />
 *   <Select label="Role" error="Required" options={roles} />
 */

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@utils/cn";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options?: SelectOption[];
  /** Render raw <option> children instead of using options prop */
  children?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, placeholder, options, children, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? `select-${generatedId}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-lg text-sm",
              "bg-[var(--glass-bg)] text-[var(--color-text-primary)]",
              "border border-[var(--color-border-default)]",
              "px-3 py-2.5 pr-9",
              "transition-all duration-200",
              "focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] focus:outline-none",
              "cursor-pointer",
              error &&
                "border-[var(--color-brand-danger)] focus:border-[var(--color-brand-danger)] focus:ring-[var(--color-brand-danger)]",
              className,
            )}
            aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
            aria-invalid={error ? "true" : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-[var(--color-text-tertiary)]">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-[var(--color-brand-danger)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
