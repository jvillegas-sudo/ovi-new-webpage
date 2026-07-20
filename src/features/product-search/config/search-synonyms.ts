/**
 * Config: Search Synonyms
 * Work Order 007 · OVI Smart Product Discovery
 *
 * A controlled synonym map that improves product discovery without
 * inventing technical product claims.
 *
 * Rules:
 *   - Keys and values must be normalized (no accents, lowercase).
 *   - Only map terms that genuinely correspond to official sector or
 *     product names already present in chemical-lines-data.ts.
 *   - Do NOT connect a synonym to a product unless a clear linguistic or
 *     sector-level relationship is supported by official data.
 *   - Keep each entry focused and documented.
 *
 * To add a synonym:
 *   1. Add an entry: { "user-typed-term": ["official-term-1", "official-term-2"] }
 *   2. Add a comment explaining the justification.
 *   3. Run `npm run type-check` to confirm no type errors.
 *
 * Format: Record<normalizedUserTerm, normalizedOfficialMatchTerms[]>
 */
export const SEARCH_SYNONYMS: Readonly<Record<string, readonly string[]>> = {
  // ── Sector aliases ────────────────────────────────────────────────────────

  // User types "hotel" or "hotelero" → Hotelería sector
  hotel: ["hoteleria"],
  hotelero: ["hoteleria"],
  hospitalidad: ["hoteleria"],

  // User types "ropa" or "textil" → Lavandería sector
  ropa: ["lavanderia"],
  textil: ["lavanderia"],

  // Abbreviated personal care references → Protección y Cuidado Personal sector
  "cuidado personal": ["proteccion y cuidado personal"],
  "higiene personal": ["proteccion y cuidado personal"],
  personal: ["proteccion y cuidado personal"],

  // Abbreviated institutional references
  mantenimiento: ["institucional y mantenimiento"],
  institucional: ["institucional y mantenimiento"],

  // Biotechnology abbreviation
  bio: ["biotecnologia"],

  // ── Product name translations (Spanish ↔ English official names) ──────────

  // Users may search in Spanish; product names are in English
  desengrasante: ["degreaser"],
  "enjuague maquina": ["eco-machine rinse"],
  "maquina lavar": ["eco-machine"],
  incrustaciones: ["descaler", "descaler-a"],
  sarro: ["descaler", "descaler-a"],
  "cloro textil": ["clorotex"],
  "oxigeno activo": ["oxytex", "oxifree"],

  // ── Common CIP abbreviation ───────────────────────────────────────────────

  // CIP (Clean In Place) maps to both CIP products
  cip: ["cip acido", "cip alcalino"],
};

/**
 * Look up synonym expansions for a normalized search term.
 * Returns the original term plus any synonyms as a flat array.
 */
export function expandTerm(normalizedTerm: string): string[] {
  const synonyms = SEARCH_SYNONYMS[normalizedTerm];
  return synonyms ? [normalizedTerm, ...synonyms] : [normalizedTerm];
}
