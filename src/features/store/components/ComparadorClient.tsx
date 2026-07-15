"use client";

/**
 * ComparadorClient
 * Work Order 008 — OVI Store
 *
 * Interactive solution comparator. Allows selecting up to 3 products
 * and comparing their technical specifications side by side.
 * All data comes from the Knowledge Engine via server-passed props.
 */

import { useState } from "react";
import Link from "next/link";
import { X, Plus, Check, ShieldCheck, Wrench, Boxes, ArrowRight } from "lucide-react";
import { AnimateIn, Badge, Card, Heading, Text } from "@components/ui";
import { cn } from "@utils/cn";
import type { OviProduct, OviProtocol, OviService } from "@features/store/store-engine";

interface ProductOption {
  product: OviProduct;
  protocols: OviProtocol[];
  services: OviService[];
  equipment: Array<{ id: string; nombre: string }>;
  sectors: Array<{ id: string; nombre: string }>;
  contamination: Array<{ id: string; nombre: string }>;
  surfaces: Array<{ id: string; nombre: string }>;
}

interface ComparadorClientProps {
  availableProducts: ProductOption[];
}

const MAX_COMPARE = 3;

export function ComparadorClient({ availableProducts }: ComparadorClientProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selected = selectedIds
    .map((id) => availableProducts.find((p) => p.product.id === id))
    .filter(Boolean) as ProductOption[];

  function toggleProduct(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  const comparisonRows = [
    {
      label: "Categoría",
      getValue: (p: ProductOption) => [p.product.categoria],
      type: "tags" as const,
    },
    {
      label: "Sectores",
      getValue: (p: ProductOption) => p.sectors.map((s) => s.nombre),
      type: "tags" as const,
    },
    {
      label: "Tipo de suciedad",
      getValue: (p: ProductOption) => p.contamination.map((c) => c.nombre),
      type: "list" as const,
    },
    {
      label: "Superficies compatibles",
      getValue: (p: ProductOption) => p.surfaces.map((s) => s.nombre),
      type: "list" as const,
    },
    {
      label: "Dilución",
      getValue: (p: ProductOption) => [p.product.dilucion],
      type: "text" as const,
    },
    {
      label: "Modo de uso",
      getValue: (p: ProductOption) => [p.product.modoUso],
      type: "text" as const,
    },
    {
      label: "Tiempo de acción",
      getValue: (p: ProductOption) => [p.product.tiempoAccion ?? "Pendiente documentación"],
      type: "text" as const,
    },
    {
      label: "Protocolos",
      getValue: (p: ProductOption) => p.protocols.map((pr) => `${pr.codigo} · ${pr.nombre}`),
      type: "list" as const,
    },
    {
      label: "Servicios",
      getValue: (p: ProductOption) => p.services.map((s) => s.nombre),
      type: "list" as const,
    },
    {
      label: "Equipos recomendados",
      getValue: (p: ProductOption) => p.equipment.map((e) => e.nombre),
      type: "list" as const,
    },
    {
      label: "Impacto ambiental",
      getValue: (p: ProductOption) => p.product.impactoAmbiental,
      type: "list" as const,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Product selector */}
      <AnimateIn animation="slideUp">
        <div className="rounded-2xl border border-[var(--color-border-default)] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Heading as="h2" size="xl">
                Seleccionar productos para comparar
              </Heading>
              <Text size="sm" textColor="secondary" className="mt-1">
                Hasta {MAX_COMPARE} productos — {selectedIds.length} seleccionado
                {selectedIds.length !== 1 ? "s" : ""}
              </Text>
            </div>
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-sm text-[var(--color-text-tertiary)] underline-offset-2 hover:text-[var(--color-brand-primary)] hover:underline"
              >
                Limpiar selección
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {availableProducts.map(({ product }) => {
              const isSelected = selectedIds.includes(product.id);
              const isDisabled = !isSelected && selectedIds.length >= MAX_COMPARE;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
                    isSelected
                      ? "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)]"
                      : isDisabled
                        ? "cursor-not-allowed border-[var(--color-border-subtle)] opacity-40"
                        : "border-[var(--color-border-default)] hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.04)]",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isSelected
                        ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]"
                        : "border-[var(--color-border-default)]",
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" aria-hidden="true" />}
                    {!isSelected && !isDisabled && (
                      <Plus
                        className="h-3 w-3 text-[var(--color-text-tertiary)]"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Text size="sm" weight="semibold" className="truncate">
                      {product.nombre}
                    </Text>
                    <Text size="sm" textColor="tertiary" className="mt-1">
                      {product.categoria}
                    </Text>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </AnimateIn>

      {/* Comparison table */}
      {selected.length >= 2 ? (
        <AnimateIn animation="slideUp">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="w-48 py-4 pr-4 text-left">
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Especificación
                    </Text>
                  </th>
                  {selected.map((p) => (
                    <th key={p.product.id} className="min-w-48 px-4 py-4 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Badge variant="brand">{p.product.categoria}</Badge>
                          <Heading as="h2" size="md" className="mt-2">
                            {p.product.nombre}
                          </Heading>
                        </div>
                        <button
                          type="button"
                          aria-label={`Quitar ${p.product.nombre} del comparador`}
                          onClick={() => toggleProduct(p.product.id)}
                          className="mt-0.5 rounded-full p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-brand-primary)]"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-[var(--color-border-subtle)]">
                    <td className="py-4 pr-4 align-top">
                      <Text size="sm" textColor="secondary">
                        {row.label}
                      </Text>
                    </td>
                    {selected.map((p) => {
                      const values = row.getValue(p);
                      return (
                        <td key={p.product.id} className="px-4 py-4 align-top">
                          {row.type === "tags" && (
                            <div className="flex flex-wrap gap-1">
                              {values.length > 0 ? (
                                values.map((v) => (
                                  <span
                                    key={v}
                                    className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]"
                                  >
                                    {v}
                                  </span>
                                ))
                              ) : (
                                <Text size="sm" textColor="tertiary">
                                  —
                                </Text>
                              )}
                            </div>
                          )}
                          {row.type === "list" && (
                            <ul className="space-y-1">
                              {values.length > 0 ? (
                                values.map((v) => (
                                  <li
                                    key={v}
                                    className="flex gap-2 text-sm text-[var(--color-text-secondary)]"
                                  >
                                    <span
                                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand-primary)]"
                                      aria-hidden="true"
                                    />
                                    {v}
                                  </li>
                                ))
                              ) : (
                                <Text size="sm" textColor="tertiary">
                                  —
                                </Text>
                              )}
                            </ul>
                          )}
                          {row.type === "text" && (
                            <Text size="sm" textColor="secondary">
                              {values[0] || "—"}
                            </Text>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* CTA row */}
                <tr className="border-t border-[var(--color-border-default)]">
                  <td className="py-6 pr-4">
                    <Text size="sm" textColor="tertiary">
                      Acciones
                    </Text>
                  </td>
                  {selected.map((p) => (
                    <td key={p.product.id} className="px-4 py-6 align-top">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/store/${p.product.id}`}
                          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
                        >
                          Ver ficha técnica
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Protocols summary */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {selected.map((p) => (
              <Card key={p.product.id} variant="solid" padding="lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-[var(--color-brand-accent)]"
                    aria-hidden="true"
                  />
                  <Text size="sm" textColor="secondary">
                    Protocolos de {p.product.nombre}
                  </Text>
                </div>
                {p.protocols.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {p.protocols.map((proto) => (
                      <li key={proto.id} className="text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {proto.codigo}
                        </span>{" "}
                        · {proto.nombre}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text size="sm" textColor="tertiary" className="mt-3">
                    Sin protocolos documentados aún.
                  </Text>
                )}

                <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-border-subtle)] pt-4">
                  <Boxes className="h-4 w-4 text-[var(--color-brand-primary)]" aria-hidden="true" />
                  <Text size="sm" textColor="secondary">
                    Servicios asociados
                  </Text>
                </div>
                {p.services.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.services.map((svc) => (
                      <span
                        key={svc.id}
                        className="rounded-full border border-[var(--color-border-default)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]"
                      >
                        {svc.nombre}
                      </span>
                    ))}
                  </div>
                ) : (
                  <Text size="sm" textColor="tertiary" className="mt-2">
                    —
                  </Text>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--color-border-default)] bg-[rgba(0,196,255,0.04)] p-6">
            <div className="flex items-start gap-3">
              <Wrench
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand-primary)]"
                aria-hidden="true"
              />
              <div>
                <Heading as="h3" size="lg">
                  ¿Necesita apoyo para decidir entre estas soluciones?
                </Heading>
                <Text className="mt-2">
                  Un ingeniero OVI puede validar cuál de estas soluciones es la más adecuada para su
                  operación específica, considerando superficie, contaminación, frecuencia y
                  normativa aplicable.
                </Text>
                <Link
                  href="/ovi-ai"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-2.5 text-sm font-medium text-[var(--color-text-inverse)] transition-all hover:brightness-110"
                >
                  Consultar con OVI AI
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--color-border-default)] py-16 text-center">
          <Text textColor="tertiary">
            Selecciona al menos 2 productos para iniciar la comparación
          </Text>
        </div>
      )}
    </div>
  );
}
