"use client";

import {
  PRODUCT_INFORMATION_LAYERS,
  PRODUCTS,
  PRODUCT_SEARCH_EXAMPLES,
} from "@/scenes/products/data/products";

export function ProductsFallback() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-bg-base px-6 py-16 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-primary">
              Chapter 04
            </p>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
              Interactive Product Ecosystem
            </h2>
          </div>

          <div className="max-w-2xl rounded-2xl border border-white/10 bg-bg-elevated/80 px-5 py-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
              Alternative non-WebGL experience
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-text-secondary">
              Complete product data, hotspots, relationships, AI guidance, and industry transition cues remain fully accessible.
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-bg-elevated/70 p-6 shadow-glass backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
            Progressive information layers
          </p>
          <ol className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {PRODUCT_INFORMATION_LAYERS.map((layer, index) => (
              <li
                key={layer}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
              >
                {index + 1}. {layer}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-bg-elevated/70 p-6 shadow-glass backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
            Intelligent search prompts
          </p>
          <ul className="mt-4 flex flex-wrap gap-3" aria-label="Suggested intelligent search prompts">
            {PRODUCT_SEARCH_EXAMPLES.map((example) => (
              <li
                key={example}
                className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
              >
                {example}
              </li>
            ))}
          </ul>
        </section>

        <ol className="mt-8 grid gap-5 xl:grid-cols-2" aria-label="Interactive product ecosystem inventory">
          {PRODUCTS.map((product) => (
            <li
              key={product.id}
              className="rounded-3xl border border-white/10 bg-bg-elevated/80 p-6 shadow-glass backdrop-blur"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-text-muted">
                    {product.chapter} · {product.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em] text-text-secondary">
                    {product.purpose}
                  </p>
                </div>

                <span
                  className="inline-flex rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    color: product.model.primary,
                    border: `1px solid ${product.model.primary}55`,
                    background: `${product.model.primary}12`,
                  }}
                >
                  {product.technology}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Industries
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white">
                    {product.industries.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Equipment compatibility
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white">
                    {product.equipmentCompatibility.join(" · ")}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {product.specifications.map((specification) => (
                  <div key={specification.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      {specification.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                      {specification.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {product.sustainability.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-black uppercase tracking-tight text-white">
                      {metric.value}
                      {metric.suffix}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Hotspots
                  </p>
                  <ul className="mt-3 space-y-3">
                    {product.hotspots.map((hotspot) => (
                      <li key={hotspot.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">
                          {hotspot.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                          {hotspot.title}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-secondary">
                          {hotspot.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    AI recommendation layer
                  </p>
                  {product.aiPrompts.slice(0, 1).map((prompt) => (
                    <div key={prompt.query} className="mt-3 rounded-2xl border border-brand-primary/20 bg-brand-primary/10 p-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-primary">
                        {prompt.query}
                      </p>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                        {prompt.protocol}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-text-secondary">
                        Required products · {prompt.requiredProducts.join(" · ")}
                      </p>
                    </div>
                  ))}
                </section>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
