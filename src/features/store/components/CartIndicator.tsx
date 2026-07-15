"use client";

/**
 * CartIndicator
 * Work Order 008 — OVI Store
 *
 * Shows the current cart item count as a badge.
 * Designed for embedding in the Navbar when cart integration is surfaced.
 */

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@utils/cn";
import { useCartStore } from "@store/cart.store";

interface CartIndicatorProps {
  className?: string;
}

export function CartIndicator({ className }: CartIndicatorProps) {
  const itemCount = useCartStore((state) => state.itemCount());

  return (
    <Link
      href="/store/carrito"
      aria-label={`Carrito: ${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
      className={cn(
        "relative inline-flex items-center justify-center",
        "h-9 w-9 rounded-full border border-[var(--color-border-default)]",
        "text-[var(--color-text-secondary)] transition-colors",
        "hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
        className,
      )}
    >
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-1 -right-1",
            "flex h-4 w-4 items-center justify-center",
            "rounded-full bg-[var(--color-brand-primary)] text-[10px] font-semibold text-[var(--color-text-inverse)]",
          )}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
