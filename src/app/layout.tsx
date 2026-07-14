/**
 * Root Layout
 *
 * The outermost layout shared by all pages.
 * Responsibilities:
 *   - Global CSS import
 *   - Provider tree mounting
 *   - Navbar + Footer (persistent across all routes)
 *   - Cursor overlay
 *   - Loading screen
 *   - Root metadata
 *
 * Note on fonts:
 *   Using system font stack for the foundation.
 *   To add custom fonts in production, use `next/font/local` with
 *   locally hosted font files in /src/assets/fonts/
 */

import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@providers/index";
import { Navbar } from "@components/layout/Navbar";
import { Footer } from "@components/layout/Footer";
import { Cursor } from "@components/ui/Cursor";
import { Loader } from "@components/ui/Loader";
import { buildMetadata } from "@lib/metadata";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata();

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {/* Global UI layers */}
          <Loader />
          <Cursor />

          {/* Navigation */}
          <Navbar />

          {/* Page Content */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

