"use client";

import { ArrowLeft, ImageOff } from "lucide-react";
import Link from "next/link";
import { type OviProductRecord, type OviSector } from "./chemical-lines-data";

interface ProductDetailPageProps {
  sector: OviSector;
  product: OviProductRecord;
}

export function ProductDetailPage({ sector, product }: ProductDetailPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Link
        href={`/products/${sector.slug}`}
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-brand-primary)]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a {sector.officialName}
      </Link>

      <article className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] md:grid md:grid-cols-2">
        <div className="flex min-h-72 items-center justify-center border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 md:border-r md:border-b-0">
          <div className="text-center">
            <ImageOff
              className="mx-auto h-10 w-10 text-[var(--color-text-tertiary)]"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm text-[var(--color-text-tertiary)]">
              Fotografía oficial pendiente de extracción y aprobación de catálogo.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-brand-primary)] uppercase">
            {product.sector}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--color-text-primary)]">
            {product.officialName}
          </h1>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            {product.shortDescription ??
              "Descripción corta pendiente de validación desde la página oficial del catálogo."}
          </p>

          <div className="mt-6 grid gap-2 text-sm text-[var(--color-text-secondary)]">
            <p>
              <span className="font-semibold text-[var(--color-text-primary)]">Estado:</span>{" "}
              {product.status}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-text-primary)]">
                Página catálogo:
              </span>{" "}
              {product.catalogPage ?? "Pendiente"}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-inverse)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              Solicitar cotización
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-default)] px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              Solicitar información técnica
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
