# OVI Product Knowledge — GitHub Instructions

## Source of Truth

The files in `src/data/` are the **official source of truth** for all OVI product and sector information:

- `src/data/sectors.json` — Official sector registry (7 sectors)
- `src/data/products.json` — Official product catalog (56 products)
- `src/data/product-images-manifest.json` — Image asset manifest (56 entries)

These files were created as part of **Work Order 023.1**. No PDF catalog is required for subsequent implementation steps.

## Data Integrity Rules

- **Missing information must remain `null` or empty (`[]`).** Do not fill in unknown fields with guesses.
- **Product facts must never be invented.** Do not invent certifications, dilution ratios, applications, or technical specifications.
- **Official product names must be preserved exactly** as defined in `products.json`.
- **`dataCompleteness`** must accurately reflect what is known. Currently all products are `"name-and-sector-only"` until official data is imported.

## Protected Areas

The following areas of the codebase are **protected** and must not be modified without explicit approval:

- **Hero** — homepage hero section and animations
- **Three.js / R3F scenes** — all 3D scene components and the OVI Story Engine
- **Navigation** — Navbar and routing
- **Home** — `/` route and its page components
- **OVI Lab** — `/ovi-lab` route and features
- **Discover Your Solution** (`/descubre-tu-solucion`) — Solution Journey feature
- **Existing animations** — GSAP, Framer Motion, and Lenis integrations
- **Existing approved components** — UI component library in `src/components/ui/`
- **Existing routes** — all currently registered Next.js App Router routes

## Work Order Guidelines

- Future Work Orders must build **additively**. Do not remove or overwrite existing data.
- When adding product data, update only the relevant fields and set `dataCompleteness` accordingly.
- Image paths in `product-images-manifest.json` follow the pattern `/ovi-media/products/{sectorId}/{slug}.webp`.
- Set `status: "missing"` until an image asset has been imported and verified.
- Set `source: "official-catalog-pending-import"` until the asset origin is confirmed.

## Merge Policy

**Do not merge any branch without explicit approval.** All Work Orders must be reviewed before merging into the main branch.

## Hotelería Content Gap

The **Hotelería** sector (`id: "hoteleria"`) is an officially recognized sector with `"contentGap": true`. No products are assigned to it yet. Do not invent products for this sector.
