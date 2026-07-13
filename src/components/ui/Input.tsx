"use client";

/**
 * UI Component: Input
 *
 * Form input with built-in label, error, and hint text.
 * Fully accessible — uses aria-describedby for error/hint association.
 * Works seamlessly with React Hook Form via ref forwarding.
 */

import * as React from "react";
import { cn } from "@utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? `input-${generatedId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className="pointer-events-none absolute left-3 text-[var(--color-text-tertiary)]"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base
              "w-full rounded-lg text-sm",
              "bg-[var(--glass-bg)] text-[var(--color-text-primary)]",
              "border border-[var(--color-border-default)]",
              "px-3 py-2.5",
              "placeholder:text-[var(--color-text-tertiary)]",
              // Transitions
              "transition-all duration-200",
              // Focus
              "focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)]",
              // Error state
              error && "border-[var(--color-brand-danger)] focus:border-[var(--color-brand-danger)] focus:ring-[var(--color-brand-danger)]",
              // Icon padding
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className,
            )}
            aria-describedby={
              [errorId, hintId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={error ? "true" : undefined}
            {...props}
          />

          {rightIcon && (
            <span
              className="pointer-events-none absolute right-3 text-[var(--color-text-tertiary)]"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
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

Input.displayName = "Input";

export { Input };
