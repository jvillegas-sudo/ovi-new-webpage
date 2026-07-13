"use client";

/**
 * UI Component: Tabs
 *
 * Tabbed navigation for switching between related content panels.
 * Built with React context + keyboard navigation (←/→ arrow keys).
 *
 * @example
 *   <Tabs defaultValue="overview">
 *     <TabsList>
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       <TabsTrigger value="details">Details</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="overview">...</TabsContent>
 *     <TabsContent value="details">...</TabsContent>
 *   </Tabs>
 */

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@utils/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContext {
  value: string;
  onChange: (value: string) => void;
  variant: "default" | "pills" | "underline" | "boxed";
}

const TabsCtx = React.createContext<TabsContext | null>(null);

function useTabsCtx() {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) throw new Error("TabsTrigger/TabsContent must be used inside Tabs");
  return ctx;
}

// ─── Tabs Root ────────────────────────────────────────────────────────────────

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "default" | "pills" | "underline" | "boxed";
  children: React.ReactNode;
}

function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  variant = "default",
  children,
  className,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const onChange = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <TabsCtx.Provider value={{ value: currentValue, onChange, variant }}>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

Tabs.displayName = "Tabs";

// ─── TabsList ─────────────────────────────────────────────────────────────────

const tabsListVariants = cva("flex items-center gap-1", {
  variants: {
    variant: {
      default: "rounded-xl bg-[var(--color-bg-elevated)] p-1",
      pills: "gap-1.5",
      underline: "border-b border-[var(--color-border-subtle)] gap-0 rounded-none pb-0",
      boxed: "border border-[var(--color-border-subtle)] rounded-xl p-1 bg-[var(--glass-bg)]",
    },
  },
  defaultVariants: { variant: "default" },
});

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

function TabsList({ className, children, ...props }: TabsListProps) {
  const { variant } = useTabsCtx();
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not(:disabled)',
    );
    if (!tabs?.length) return;
    const arr = Array.from(tabs);
    const current = document.activeElement as HTMLButtonElement;
    const idx = arr.indexOf(current);

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      arr[(idx + 1) % arr.length].focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      arr[(idx - 1 + arr.length) % arr.length].focus();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

TabsList.displayName = "TabsList";

// ─── TabsTrigger ──────────────────────────────────────────────────────────────

const triggerVariants = cva(
  "relative inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "rounded-lg px-4 py-1.5 data-[state=active]:bg-[var(--color-bg-base)] data-[state=active]:text-[var(--color-text-primary)] data-[state=inactive]:text-[var(--color-text-tertiary)] data-[state=inactive]:hover:text-[var(--color-text-secondary)]",
        pills:
          "rounded-full border px-4 py-1.5 data-[state=active]:bg-[var(--color-brand-primary)] data-[state=active]:text-[var(--color-text-inverse)] data-[state=active]:border-transparent data-[state=inactive]:border-[var(--color-border-default)] data-[state=inactive]:text-[var(--color-text-secondary)] data-[state=inactive]:hover:border-[var(--color-border-strong)]",
        underline:
          "rounded-none px-4 pb-3 pt-1 border-b-2 data-[state=active]:border-[var(--color-brand-primary)] data-[state=active]:text-[var(--color-text-primary)] data-[state=inactive]:border-transparent data-[state=inactive]:text-[var(--color-text-tertiary)] data-[state=inactive]:hover:text-[var(--color-text-secondary)]",
        boxed:
          "rounded-lg px-4 py-1.5 data-[state=active]:bg-[var(--color-brand-primary)] data-[state=active]:text-[var(--color-text-inverse)] data-[state=inactive]:text-[var(--color-text-tertiary)] data-[state=inactive]:hover:text-[var(--color-text-secondary)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  badge?: string | number;
}

function TabsTrigger({ value, badge, children, className, ...props }: TabsTriggerProps) {
  const { value: current, onChange, variant } = useTabsCtx();
  const isActive = current === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onChange(value)}
      className={cn(triggerVariants({ variant }), className)}
      {...props}
    >
      {children}
      {badge !== undefined && (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-xs leading-none font-semibold",
            isActive
              ? "bg-white/20"
              : "bg-[var(--color-bg-elevated)] text-[var(--color-text-tertiary)]",
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

TabsTrigger.displayName = "TabsTrigger";

// ─── TabsContent ──────────────────────────────────────────────────────────────

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: current } = useTabsCtx();
  if (current !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-${value}`}
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
