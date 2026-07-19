"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Factory, FlaskConical } from "lucide-react";
import Link from "next/link";
import { OVI_SECTORS, TOTAL_PRODUCTS } from "./chemical-lines-data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function sectorIcon(slug: string) {
  if (slug === "industrial") return Factory;
  if (slug === "institucional") return Building2;
  return FlaskConical;
}

export function ProductsPage() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
          Catálogo oficial OVI
        </span>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--color-text-primary)] md:text-6xl">
          Productos por sector
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Portafolio técnico organizado por sector oficial para facilitar selección, comparación y
          consulta profesional.
        </p>
      </motion.div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Resumen del catálogo">
        <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 text-center">
          <p className="text-xs tracking-wide text-[var(--color-text-tertiary)] uppercase">
            Sectores
          </p>
          <p className="mt-2 text-3xl font-black text-[var(--color-brand-primary)]">
            {OVI_SECTORS.length}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 text-center">
          <p className="text-xs tracking-wide text-[var(--color-text-tertiary)] uppercase">
            Productos
          </p>
          <p className="mt-2 text-3xl font-black text-[var(--color-brand-primary)]">
            {TOTAL_PRODUCTS}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-5 text-center">
          <p className="text-xs tracking-wide text-[var(--color-text-tertiary)] uppercase">
            Estado
          </p>
          <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
            Carga inicial WO-023
          </p>
        </div>
      </section>

      <section className="mt-12" aria-label="Sectores oficiales">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          role="list"
        >
          {OVI_SECTORS.map((sector) => {
            const Icon = sectorIcon(sector.slug);
            return (
              <motion.article
                key={sector.slug}
                variants={cardVariants}
                role="listitem"
                className="flex flex-col rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,196,255,0.25)] bg-[rgba(0,196,255,0.08)]">
                  <Icon className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
                </div>

                <h2 className="text-xl font-black tracking-tight text-[var(--color-text-primary)]">
                  {sector.officialName}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {sector.products.length} productos oficiales en esta carga.
                </p>
                {sector.contentGap ? (
                  <p className="mt-3 rounded-lg border border-[rgba(255,165,0,0.35)] bg-[rgba(255,165,0,0.08)] p-3 text-xs text-[var(--color-text-secondary)]">
                    {sector.contentGap}
                  </p>
                ) : null}

                <Link
                  href={`/products/${sector.slug}`}
                  className="mt-5 inline-flex items-center justify-between rounded-xl border border-[rgba(0,196,255,0.25)] bg-[rgba(0,196,255,0.07)] px-4 py-3 text-sm font-semibold text-[var(--color-brand-primary)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                >
                  Ver sector
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
