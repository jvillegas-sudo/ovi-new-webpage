"use client";

/**
 * CheckoutForm
 * Work Order 008 — OVI Store
 *
 * Checkout request form. Architecture prepared for future integration with
 * Shopify, WooCommerce, Stripe, PayPal, ERP, and OVI OS.
 *
 * Current behavior: submits a structured request that will be processed by
 * an OVI engineer before any order is confirmed. No payment is collected now.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { Card, Heading, Text } from "@components/ui";
import { useCartStore } from "@store/cart.store";
import { cn } from "@utils/cn";

type FormState = "idle" | "submitting" | "success" | "error";

interface CheckoutFormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  sector: string;
  descripcionDesafio: string;
  notasAdicionales: string;
}

const SECTORES = [
  "Transporte",
  "Institucional / Hospitalario",
  "Industria / Manufactura",
  "Energía",
  "Alimentos",
  "Otro",
];

const inputClasses = cn(
  "w-full rounded-xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.04)]",
  "px-4 py-3 text-sm text-[var(--color-text-primary)]",
  "placeholder:text-[var(--color-text-tertiary)]",
  "focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]",
  "transition-colors",
);

const labelClasses = "block text-sm font-medium text-[var(--color-text-secondary)] mb-2";

export function CheckoutForm() {
  const router = useRouter();
  const { items, totalQuantity, meta, resetCart } = useCartStore();
  const [formState, setFormState] = useState<FormState>("idle");
  const [data, setData] = useState<CheckoutFormData>({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    sector: "",
    descripcionDesafio: meta.notasTecnicas ?? "",
    notasAdicionales: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;

    setFormState("submitting");

    // ── Future integration hook ─────────────────────────────────────────────
    // This is the point where Shopify, WooCommerce, Stripe, ERP, or OVI OS
    // integration will be wired in. For now, simulate a successful submission.
    // Replace with: await createShopifyOrder(items, data) or similar.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState("success");
    resetCart();
  }

  if (formState === "success") {
    return (
      <Card variant="glass" padding="lg" className="flex flex-col items-center py-16 text-center">
        <CheckCircle className="h-14 w-14 text-[var(--color-brand-accent)]" aria-hidden="true" />
        <Heading as="h2" size="2xl" className="mt-6">
          Solicitud enviada correctamente
        </Heading>
        <Text className="mt-4 max-w-md text-balance">
          Un ingeniero OVI revisará tu solicitud y te contactará en las próximas horas para validar
          especificaciones, disponibilidad y condiciones de entrega.
        </Text>
        <Text size="sm" textColor="tertiary" className="mt-3">
          Revisa tu correo electrónico para la confirmación de recepción.
        </Text>
        <button
          type="button"
          onClick={() => router.push("/store")}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] px-6 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
        >
          Volver al catálogo
        </button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Cart summary */}
      {items.length > 0 && (
        <Card variant="solid" padding="lg">
          <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
            Resumen del pedido ({totalQuantity()} unidades)
          </Text>
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4 text-sm">
                <span className="text-[var(--color-text-secondary)]">{item.nombre}</span>
                <span className="text-[var(--color-text-tertiary)]">× {item.cantidad}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {items.length === 0 && (
        <Card variant="solid" padding="lg">
          <Text textColor="tertiary">
            Tu carrito está vacío. Agrega productos desde el catálogo antes de continuar.
          </Text>
        </Card>
      )}

      {/* Contact info */}
      <Card variant="glass" padding="lg" className="space-y-5">
        <Heading as="h2" size="xl">
          Datos de contacto
        </Heading>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="checkout-nombre" className={labelClasses}>
              Nombre completo <span className="text-[var(--color-state-error)]">*</span>
            </label>
            <input
              id="checkout-nombre"
              name="nombre"
              type="text"
              required
              value={data.nombre}
              onChange={handleChange}
              placeholder="Juan García"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="checkout-empresa" className={labelClasses}>
              Empresa / Organización <span className="text-[var(--color-state-error)]">*</span>
            </label>
            <input
              id="checkout-empresa"
              name="empresa"
              type="text"
              required
              value={data.empresa}
              onChange={handleChange}
              placeholder="Mi empresa S.A."
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="checkout-email" className={labelClasses}>
              Correo electrónico <span className="text-[var(--color-state-error)]">*</span>
            </label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              required
              value={data.email}
              onChange={handleChange}
              placeholder="juan@empresa.com"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="checkout-telefono" className={labelClasses}>
              Teléfono / WhatsApp
            </label>
            <input
              id="checkout-telefono"
              name="telefono"
              type="tel"
              value={data.telefono}
              onChange={handleChange}
              placeholder="+57 300 000 0000"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="checkout-sector" className={labelClasses}>
            Sector operativo <span className="text-[var(--color-state-error)]">*</span>
          </label>
          <select
            id="checkout-sector"
            name="sector"
            required
            value={data.sector}
            onChange={handleChange}
            className={cn(inputClasses, "appearance-none")}
          >
            <option value="" disabled>
              Selecciona tu sector
            </option>
            {SECTORES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Technical context */}
      <Card variant="glass" padding="lg" className="space-y-5">
        <Heading as="h2" size="xl">
          Contexto técnico
        </Heading>
        <Text size="sm" textColor="secondary">
          Esta información ayuda al equipo OVI a preparar una propuesta más precisa antes del primer
          contacto.
        </Text>

        <div>
          <label htmlFor="checkout-desafio" className={labelClasses}>
            Describa brevemente el desafío operacional
          </label>
          <textarea
            id="checkout-desafio"
            name="descripcionDesafio"
            rows={4}
            value={data.descripcionDesafio}
            onChange={handleChange}
            placeholder="Ej: Necesitamos reducir el tiempo de lavado de flota en nuestro patio de 40 unidades. Actualmente el proceso tarda 35 minutos por unidad..."
            className={cn(inputClasses, "resize-none")}
          />
        </div>

        <div>
          <label htmlFor="checkout-notas" className={labelClasses}>
            Notas adicionales
          </label>
          <textarea
            id="checkout-notas"
            name="notasAdicionales"
            rows={3}
            value={data.notasAdicionales}
            onChange={handleChange}
            placeholder="Restricciones de presupuesto, fechas requeridas, condiciones especiales..."
            className={cn(inputClasses, "resize-none")}
          />
        </div>
      </Card>

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === "submitting" || items.length === 0}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium tracking-wide transition-all",
          "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)]",
          "hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
          "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Enviando solicitud...
          </>
        ) : (
          "Enviar solicitud de ingeniería"
        )}
      </button>

      <Text size="sm" textColor="tertiary" className="text-center">
        No se procesará ningún cobro. Un ingeniero OVI confirmará disponibilidad y condiciones antes
        de formalizar el pedido.
      </Text>
    </form>
  );
}
