/**
 * Event Bus
 *
 * A lightweight, strongly-typed publish/subscribe system.
 * Enables loose coupling between engine managers so they
 * can communicate without direct references.
 */

import type { EngineEventMap } from "@/engine/types";

type Handler<T> = T extends void ? () => void : (payload: T) => void;

export class EventBus {
  /** Internal subscriber registry. */
  private readonly listeners = new Map<
    keyof EngineEventMap,
    Set<Handler<unknown>>
  >();

  /**
   * Subscribe to an event.
   * @returns Unsubscribe function — call it to remove this handler.
   */
  on<K extends keyof EngineEventMap>(
    event: K,
    handler: Handler<EngineEventMap[K]>,
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    // Cast is safe: we only call handler with the payload of the same key K.
    this.listeners.get(event)!.add(handler as Handler<unknown>);

    return () => this.off(event, handler);
  }

  /**
   * Unsubscribe a specific handler from an event.
   */
  off<K extends keyof EngineEventMap>(
    event: K,
    handler: Handler<EngineEventMap[K]>,
  ): void {
    this.listeners.get(event)?.delete(handler as Handler<unknown>);
  }

  /**
   * Emit an event, calling all registered handlers synchronously.
   */
  emit<K extends keyof EngineEventMap>(
    ...args: EngineEventMap[K] extends void
      ? [event: K]
      : [event: K, payload: EngineEventMap[K]]
  ): void {
    const [event, payload] = args as [K, EngineEventMap[K]];
    this.listeners.get(event)?.forEach((handler) => {
      (handler as (p: EngineEventMap[K]) => void)(payload);
    });
  }

  /**
   * Remove all listeners, optionally scoped to a single event.
   */
  clear(event?: keyof EngineEventMap): void {
    if (event !== undefined) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}
