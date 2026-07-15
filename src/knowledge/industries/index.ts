/**
 * OVI Knowledge Base — Industries
 *
 * Alias module — re-exports sectors as "industries".
 * The terms are used interchangeably in the OVI platform.
 * Sectors is the canonical module; this exists for backward compatibility
 * and future divergence if industries and sectors need to split.
 */

export {
  sectors as industries,
  getSector as getIndustry,
  getSectorsByProduct as getIndustriesByProduct,
  getSectorsByService as getIndustriesByService,
} from "../sectors";
