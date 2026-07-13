/**
 * Global Type Definitions — Common
 *
 * Shared TypeScript types used across the entire application.
 * Keep this file focused on truly global types only.
 */

// ─── Utility Types ──────────────────────────────────────────────────────────

/** Makes specified keys optional in a type */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Makes specified keys required in a type */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Deep partial recursion */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/** Extract keys of T whose values match V */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/** Nullable wrapper */
export type Nullable<T> = T | null;

/** Maybe wrapper (nullable + undefined) */
export type Maybe<T> = T | null | undefined;

// ─── UI Types ───────────────────────────────────────────────────────────────

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
export type ColorScheme = "dark" | "light";
export type Orientation = "horizontal" | "vertical";
export type Alignment = "left" | "center" | "right";
export type Position = "top" | "right" | "bottom" | "left";

// ─── Navigation Types ───────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

// ─── SEO Types ──────────────────────────────────────────────────────────────

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noIndex?: boolean;
}

// ─── API Types ──────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// ─── Animation Types ────────────────────────────────────────────────────────

export type AnimationDirection = "up" | "down" | "left" | "right";

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  once?: boolean;
}
