/**
 * Home Page
 *
 * This is the root page placeholder.
 * The home page content will be built in the next phase.
 * For now it renders a minimal foundation-ready state.
 */

import { buildMetadata } from "@lib/metadata";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "OVI Ventures — Industrial biotechnology and cleaning technology. Science-driven solutions for a cleaner, more sustainable world.",
});

export default function HomePage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ paddingTop: "80px" }}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <span
          className="text-7xl font-black tracking-tighter"
          style={{ color: "var(--color-brand-primary)" }}
        >
          OVI
        </span>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Foundation ready. Home page coming next.
        </p>
      </div>
    </div>
  );
}
