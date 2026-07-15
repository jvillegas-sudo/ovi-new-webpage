export type OviDnaQuality = "high" | "medium" | "low";

export interface OviDnaBaseProps {
  intensity?: number;
  reducedMotion?: boolean;
  quality?: OviDnaQuality;
}
