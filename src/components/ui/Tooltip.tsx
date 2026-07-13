"use client";

/**
 * UI Component: Tooltip
 *
 * Floating label that appears on hover or focus.
 * Pure CSS implementation for zero JS overhead on simple cases.
 * Supports top, bottom, left, right placement.
 *
 * @example
 *   <Tooltip content="Copy to clipboard">
 *     <Button variant="ghost" size="xs"><Copy size={14} /></Button>
 *   </Tooltip>
 */

import * as React from "react";
import { cn } from "@utils/cn";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  children: React.ReactElement;
}

const placementClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-[var(--color-bg-elevated)] border-l-transparent border-r-transparent border-b-transparent border-4",
  bottom:
    "top-[-4px] left-1/2 -translate-x-1/2 border-b-[var(--color-bg-elevated)] border-l-transparent border-r-transparent border-t-transparent border-4",
  left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-[var(--color-bg-elevated)] border-t-transparent border-b-transparent border-r-transparent border-4",
  right:
    "left-[-4px] top-1/2 -translate-y-1/2 border-r-[var(--color-bg-elevated)] border-t-transparent border-b-transparent border-l-transparent border-4",
};

function Tooltip({ content, placement = "top", className, children }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const tooltipId = React.useId();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = (children as any).props ?? {};

  const child = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    "aria-describedby": tooltipId,
    onMouseEnter: (e: React.MouseEvent) => {
      setVisible(true);
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setVisible(false);
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      setVisible(true);
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      setVisible(false);
      childProps.onBlur?.(e);
    },
  });

  return (
    <span className="relative inline-flex">
      {child}
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-[var(--z-popover)] whitespace-nowrap",
          "rounded-lg bg-[var(--color-bg-elevated)] px-2.5 py-1.5",
          "border border-[var(--color-border-default)]",
          "text-xs font-medium text-[var(--color-text-primary)]",
          "shadow-lg",
          "transition-all duration-150",
          placementClasses[placement],
          visible ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
          className,
        )}
        aria-hidden={!visible}
      >
        {content}
        <span className={cn("absolute border", arrowClasses[placement])} aria-hidden="true" />
      </span>
    </span>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
