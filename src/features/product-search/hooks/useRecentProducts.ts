"use client";

/**
 * Hook: useRecentProducts
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Persists recently-viewed product IDs in localStorage.
 * Handles SSR (server-side render) gracefully — storage access is deferred
 * to the client mount via useEffect.
 */

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ovi-recent-products";
const MAX_RECENT = 5;

export interface RecentProductsHook {
  /** Up to MAX_RECENT recently viewed product IDs, newest first */
  recentIds: string[];
  /** Record a product view (call when user opens a product) */
  recordView: (productId: string) => void;
  /** Clear all recent history */
  clearRecent: () => void;
}

export function useRecentProducts(): RecentProductsHook {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load from localStorage on mount only (avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setRecentIds(parsed.filter((v): v is string => typeof v === "string").slice(0, MAX_RECENT));
        }
      }
    } catch {
      // localStorage unavailable (private browsing, quota exceeded, etc.)
    }
  }, []);

  const recordView = useCallback((productId: string) => {
    setRecentIds((prev) => {
      const updated = [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore write errors
      }
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return { recentIds, recordView, clearRecent };
}
