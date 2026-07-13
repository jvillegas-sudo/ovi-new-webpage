"use client";

/**
 * Provider: Root Application Providers
 *
 * Composes all providers in the correct order:
 *   LenisProvider → children
 *
 * Add new providers here as the app grows.
 * Keep this file clean — each provider should live in its own file.
 */

import { LenisProvider } from "./lenis.provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <LenisProvider>{children}</LenisProvider>;
}
