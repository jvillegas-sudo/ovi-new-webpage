"use client";

/**
 * UI Component: Breadcrumb
 *
 * Navigation trail showing the current page's hierarchy.
 * Supports icons, home shortcut, and truncation.
 * Follows WAI-ARIA breadcrumb pattern (aria-label + aria-current).
 *
 * @example
 *   <Breadcrumb
 *     items={[
 *       { label: "Home", href: "/" },
 *       { label: "Products", href: "/products" },
 *       { label: "Biotech Platform" },
 *     ]}
 *   />
 */

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Show home icon for the first item */
  showHome?: boolean;
  /** Separator node */
  separator?: React.ReactNode;
}

function Breadcrumb({ items, showHome = false, separator, className, ...props }: BreadcrumbProps) {
  const Separator = separator ?? (
    <ChevronRight
      size={14}
      className="shrink-0 text-[var(--color-text-tertiary)]"
      aria-hidden="true"
    />
  );

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const isFirst = i === 0;

          return (
            <li key={i} className="flex items-center gap-1.5">
              {/* Separator (not before first item) */}
              {!isFirst && Separator}

              {isLast || !item.href ? (
                // Current / non-linked item
                <span
                  className={cn(
                    "flex items-center gap-1",
                    isLast
                      ? "font-medium text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-tertiary)]",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {isFirst && showHome ? <Home size={14} aria-hidden="true" /> : item.icon}
                  {item.label}
                </span>
              ) : (
                // Linked item
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded transition-colors duration-150",
                    "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]",
                    "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                  )}
                >
                  {isFirst && showHome ? <Home size={14} aria-hidden="true" /> : item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
