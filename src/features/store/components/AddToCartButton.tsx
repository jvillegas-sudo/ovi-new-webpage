"use client";

/**
 * AddToCartButton
 * Work Order 008 — OVI Store
 *
 * Client component that bridges server-rendered product pages with the
 * Zustand cart store. Provides optimistic feedback on add-to-cart action.
 */

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@utils/cn";
import { useCartStore } from "@store/cart.store";
import type { CartItem } from "@store/cart.store";

interface AddToCartButtonProps {
  item: Omit<CartItem, "agregadoEn">;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AddToCartButton({ item, className, size = "md" }: AddToCartButtonProps) {
  const { addItem, hasProduct } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);
  const alreadyInCart = hasProduct(item.productId);

  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  function handleAdd() {
    if (justAdded) return;
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={
        justAdded
          ? `${item.nombre} agregado al carrito`
          : alreadyInCart
            ? `${item.nombre} ya está en el carrito — agregar otra unidad`
            : `Agregar ${item.nombre} al carrito`
      }
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
        "active:scale-[0.98]",
        justAdded
          ? "bg-[var(--color-brand-accent)] text-[var(--color-text-inverse)]"
          : "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110",
        sizeClasses[size],
        className,
      )}
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Agregado al carrito
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          {alreadyInCart ? "Agregar otra unidad" : "Agregar al carrito"}
        </>
      )}
    </button>
  );
}
