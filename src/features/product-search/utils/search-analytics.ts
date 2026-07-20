/**
 * Utility: search-analytics
 * Work Order 007 · OVI Smart Product Discovery
 *
 * Emits typed search analytics events as custom DOM events.
 * No external analytics vendor is installed — future integrations can
 * listen for these events and forward to any analytics service.
 *
 * Event name convention: "ovi:search:<type>"
 */

import type { SearchAnalyticsEvent } from "../types/product-search";

const EVENT_PREFIX = "ovi:search";

/**
 * Dispatch a typed analytics event.
 * Safe to call on the server — returns silently when `window` is unavailable.
 */
export function trackSearchEvent(event: SearchAnalyticsEvent): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent(`${EVENT_PREFIX}:${event.type}`, {
        detail: event,
        bubbles: false,
        cancelable: false,
      }),
    );
  } catch {
    // Non-blocking — analytics failures must never affect UX
  }
}
