"use client";

/**
 * UI Component: FormField
 *
 * Wrapper that composes Label + form control + hint/error messaging.
 * Works with any form input (Input, Select, Textarea, Checkbox, etc.)
 *
 * @example
 *   <FormField label="Email" required error={errors.email?.message}>
 *     <Input placeholder="you@company.com" {...register("email")} />
 *   </FormField>
 */

import * as React from "react";
import { cn } from "@utils/cn";
import { Label } from "./Label";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  /** Bind label to this id */
  htmlFor?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  hint,
  error,
  required,
  optional,
  htmlFor,
  children,
  className,
  ...props
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint ? `${htmlFor}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required} optional={optional}>
          {label}
        </Label>
      )}

      {children}

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
}

FormField.displayName = "FormField";

// ─── FormGroup ────────────────────────────────────────────────────────────────

/**
 * FormGroup — groups related form fields with optional title/description.
 * Use for logical sections within a longer form.
 */

interface FormGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function FormGroup({ title, description, children, className }: FormGroupProps) {
  return (
    <fieldset className={cn("m-0 flex flex-col gap-5 border-none p-0", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <legend className="text-base font-semibold text-[var(--color-text-primary)]">
              {title}
            </legend>
          )}
          {description && (
            <p className="text-sm text-[var(--color-text-tertiary)]">{description}</p>
          )}
        </div>
      )}
      {children}
    </fieldset>
  );
}

FormGroup.displayName = "FormGroup";

export { FormField, FormGroup };
