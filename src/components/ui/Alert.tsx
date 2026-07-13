"use client";

/**
 * UI Component: Alert
 *
 * Contextual feedback messages for user actions or system state.
 * Supports info, success, warning, and error variants.
 *
 * @example
 *   <Alert variant="success" title="Changes saved" />
 *   <Alert variant="error" title="Upload failed" description="File too large." onClose={handleClose} />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@utils/cn";

const alertVariants = cva("relative flex w-full gap-3 rounded-xl border p-4", {
  variants: {
    variant: {
      info: [
        "bg-[rgba(0,196,255,0.06)] border-[rgba(0,196,255,0.25)]",
        "text-[var(--color-brand-primary)]",
      ],
      success: [
        "bg-[rgba(0,200,81,0.06)] border-[rgba(0,200,81,0.25)]",
        "text-[var(--color-brand-success)]",
      ],
      warning: [
        "bg-[rgba(255,165,0,0.06)] border-[rgba(255,165,0,0.25)]",
        "text-[var(--color-brand-warning)]",
      ],
      error: [
        "bg-[rgba(255,59,59,0.06)] border-[rgba(255,59,59,0.25)]",
        "text-[var(--color-brand-danger)]",
      ],
      default: [
        "bg-[var(--glass-bg)] border-[var(--color-border-default)]",
        "text-[var(--color-text-secondary)]",
      ],
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  default: Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  /** Show close/dismiss button */
  onClose?: () => void;
  /** Override the default icon */
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, description, onClose, icon, children, ...props }, ref) => {
    const Icon = iconMap[variant ?? "info"];

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {/* Icon */}
        <span className="mt-0.5 shrink-0" aria-hidden="true">
          {icon ?? <Icon size={18} />}
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {title && (
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
          )}
          {description && (
            <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{description}</p>
          )}
          {children}
        </div>

        {/* Dismiss button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
            aria-label="Dismiss alert"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
