"use client";

/**
 * CartDisplay
 * Work Order 008 — OVI Store
 *
 * Client component rendering the full cart contents with quantity controls.
 * Architecture prepared for future Shopify/WooCommerce/Stripe integration.
 */

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Bot } from "lucide-react";
import { Card, Heading, Text, Badge } from "@components/ui";
import { cn } from "@utils/cn";
import { useCartStore } from "@store/cart.store";

const primaryLinkClasses =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const outlineLinkClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-default)] bg-transparent px-7 py-3 text-base font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

export function CartDisplay() {
  const { items, removeItem, updateQuantity, clearItems, totalQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
        <div className="rounded-full border border-[var(--color-border-default)] bg-[rgba(0,196,255,0.06)] p-8">
          <ShoppingCart
            className="h-12 w-12 text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        </div>
        <div>
          <Heading as="h2" size="2xl">
            Tu carrito está vacío
          </Heading>
          <Text className="mt-3 max-w-md text-balance">
            Los productos en tu carrito provienen de un diagnóstico técnico de ingeniería, no de un
            listado genérico de compras.
          </Text>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/ovi-ai" className={primaryLinkClasses}>
            <Bot className="h-4 w-4" aria-hidden="true" />
            Iniciar diagnóstico con OVI AI
          </Link>
          <Link href="/store" className={outlineLinkClasses}>
            Explorar catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Items list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Text size="sm" textColor="secondary">
            {totalQuantity()} {totalQuantity() === 1 ? "producto" : "productos"} en el carrito
          </Text>
          <button
            type="button"
            onClick={clearItems}
            className="text-sm text-[var(--color-text-tertiary)] underline-offset-2 hover:text-[var(--color-state-error)] hover:underline"
          >
            Vaciar carrito
          </button>
        </div>

        {items.map((item) => (
          <Card key={item.productId} variant="solid" padding="lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand">{item.categoria}</Badge>
                  {item.fuenteRecomendacion && (
                    <Badge variant="accent">
                      {item.fuenteRecomendacion === "ovi-ai"
                        ? "Recomendado por OVI AI"
                        : item.fuenteRecomendacion === "ovi-lab"
                          ? "Desde OVI Lab"
                          : "Desde catálogo"}
                    </Badge>
                  )}
                </div>
                <Heading as="h3" size="lg" className="mt-3">
                  {item.nombre}
                </Heading>
                <Text size="sm" className="mt-2 max-w-xl">
                  {item.resumen}
                </Text>
                {item.sectorOrigen && (
                  <Text size="sm" textColor="tertiary" className="mt-2">
                    Sector:{" "}
                    <span className="text-[var(--color-brand-primary)]">{item.sectorOrigen}</span>
                  </Text>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity controls */}
                <div className="flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-2 py-1">
                  <button
                    type="button"
                    aria-label={`Reducir cantidad de ${item.nombre}`}
                    onClick={() => updateQuantity(item.productId, item.cantidad - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    <Minus className="h-3 w-3" aria-hidden="true" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.cantidad}</span>
                  <button
                    type="button"
                    aria-label={`Aumentar cantidad de ${item.nombre}`}
                    onClick={() => updateQuantity(item.productId, item.cantidad + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    <Plus className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                  onClick={() => removeItem(item.productId)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-default)]",
                    "text-[var(--color-text-tertiary)] transition-colors",
                    "hover:border-[var(--color-state-error)] hover:text-[var(--color-state-error)]",
                  )}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--color-border-subtle)] pt-4">
              <Link
                href={`/store/${item.productId}`}
                className="text-sm text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
              >
                Ver ficha técnica
              </Link>
              <span className="text-[var(--color-border-default)]" aria-hidden="true">
                ·
              </span>
              <Link
                href="/ovi-ai"
                className="text-sm text-[var(--color-text-secondary)] underline-offset-2 hover:text-[var(--color-brand-primary)] hover:underline"
              >
                Validar con OVI AI
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Order summary */}
      <div className="lg:sticky lg:top-24">
        <Card variant="glass" padding="lg" className="h-fit">
          <Heading as="h2" size="xl">
            Resumen de solicitud
          </Heading>

          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between gap-4 text-sm">
                <Text size="sm" className="flex-1 truncate">
                  {item.nombre}
                </Text>
                <Text size="sm" textColor="secondary">
                  × {item.cantidad}
                </Text>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-4">
            <div className="flex justify-between">
              <Text size="sm" textColor="secondary">
                Total de productos
              </Text>
              <Text size="sm" weight="semibold">
                {totalQuantity()} unidades
              </Text>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--color-border-brand)] bg-[rgba(0,196,255,0.05)] p-4">
            <Text size="sm" textColor="secondary">
              Precios y disponibilidad se confirman con un ingeniero OVI antes de formalizar el
              pedido.
            </Text>
          </div>

          <Link href="/store/checkout" className={cn(primaryLinkClasses, "mt-6 w-full")}>
            Continuar con la solicitud
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link href="/store" className={cn(outlineLinkClasses, "mt-3 w-full")}>
            Seguir explorando
          </Link>
        </Card>
      </div>
    </div>
  );
}
