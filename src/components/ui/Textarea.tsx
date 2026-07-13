"use client";

/**
 * UI Component: Textarea
 *
 * Multi-line text input with auto-resize capability.
 * Shares the same design language as Input.
 */

import * as React from "react";
import { cn } from "@utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Auto-resize textarea to fit content */
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, autoResize = false, id, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? `textarea-${generatedId}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-lg text-sm",
            "bg-[var(--glass-bg)] text-[var(--color-text-primary)]",
            "border border-[var(--color-border-default)]",
            "px-3 py-2.5",
            "placeholder:text-[var(--color-text-tertiary)]",
            "transition-all duration-200",
            "focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)]",
            "resize-y min-h-[120px]",
            error &&
              "border-[var(--color-brand-danger)] focus:border-[var(--color-brand-danger)] focus:ring-[var(--color-brand-danger)]",
            autoResize && "overflow-hidden resize-none",
            className,
          )}
          aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
          aria-invalid={error ? "true" : undefined}
          onChange={handleChange}
          {...props}
        />

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

Textarea.displayName = "Textarea";

export { Textarea };
