"use client";

/**
 * UI Component: Label
 *
 * Accessible form label with optional required indicator.
 * Always associate with a form control via htmlFor.
 *
 * @example
 *   <Label htmlFor="email">Email address</Label>
 *   <Label htmlFor="name" required>Full name</Label>
 */

import * as React from "react";
import { cn } from "@utils/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  hint?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, hint, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-primary)]",
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-[var(--color-brand-danger)]" aria-hidden="true" title="Required">
            *
          </span>
        )}
        {optional && (
          <span className="text-xs font-normal text-[var(--color-text-tertiary)]">(optional)</span>
        )}
        {hint && (
          <span className="text-xs font-normal text-[var(--color-text-tertiary)]">— {hint}</span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";

export { Label };
