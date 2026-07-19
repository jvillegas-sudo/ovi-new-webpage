"use client";

import { AlertTriangle, ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import Link from "next/link";
import { type OviSector } from "./chemical-lines-data";

interface ChemicalLinePageProps {
  line: OviSector;
}

function ProductImagePlaceholder({ productName }: { productName: string }) {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border-default)] bg-[var(--color-surface)] text-center">
      <ImageOff className="h-6 w-6 text-[var(--color-text-tertiary)]" aria-hidden="true" />
      <p className="mt-2 px-3 text-xs text-[var(--color-text-tertiary)]">
        Imagen real pendiente de extracción del catálogo oficial para {productName}.
      </p>
    </div>
  );
}

export function ChemicalLinePage({ line }: ChemicalLinePageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-brand-primary)]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a sectores
      </Link>

      <header className="mt-6 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6">
        <h1 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          {line.officialName}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {line.products.length} productos en este sector.
        </p>
        {line.contentGap ? (
          <p className="mt-4 inline-flex items-start gap-2 rounded-lg border border-[rgba(255,165,0,0.35)] bg-[rgba(255,165,0,0.08)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 text-[rgba(255,165,0,0.95)]"
              aria-hidden="true"
            />
            {line.contentGap}
          </p>
        ) : null}
      </header>

      {line.products.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6">
          <p className="text-sm text-[var(--color-text-secondary)]">
            No hay productos cargados para este sector hasta validar contenido del catálogo oficial.
          </p>
        </section>
      ) : (
        <section
          className="mt-8 grid gap-5 md:grid-cols-2"
          aria-label={`Productos del sector ${line.officialName}`}
        >
          {line.products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)]"
            >
              <ProductImagePlaceholder productName={product.officialName} />

              <div className="p-5">
                <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-primary)] uppercase">
                  {product.sector}
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight text-[var(--color-text-primary)]">
                  {product.officialName}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {product.shortDescription ??
                    "Descripción oficial pendiente de validación desde el catálogo fuente."}
                </p>

                <Link
                  href={`/products/${line.slug}/${product.slug}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[rgba(0,196,255,0.25)] bg-[rgba(0,196,255,0.08)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                >
                  Ver producto
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
