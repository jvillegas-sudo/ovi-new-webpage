"use client";

/**
 * UI Component: Kbd (Keyboard Shortcut)
 *
 * Displays keyboard key names with a hardware-key visual style.
 * Use inside tooltips, documentation, or shortcut guides.
 *
 * @example
 *   <Kbd>⌘</Kbd>
 *   <span className="flex items-center gap-1"><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></span>
 */

import * as React from "react";
import { cn } from "@utils/cn";

export type KbdProps = React.HTMLAttributes<HTMLElement>;

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, children, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[1.5rem] rounded-md px-1.5 py-0.5",
        "border border-[var(--color-border-default)] border-b-[var(--color-border-strong)]",
        "bg-[var(--color-bg-elevated)]",
        "font-mono text-[0.6875rem] font-semibold text-[var(--color-text-secondary)]",
        "shadow-[inset_0_-1px_0_var(--color-border-strong)]",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";

export { Kbd };
