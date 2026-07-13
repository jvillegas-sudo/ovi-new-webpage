import type { Metadata } from "next";

import { Footer } from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";
import { env } from "@/config/env";
import { AppProviders } from "@/providers/app-providers";

import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${env.NEXT_PUBLIC_SITE_NAME} | Industrial Biotechnology`,
    template: `%s | ${env.NEXT_PUBLIC_SITE_NAME}`,
  },
  description:
    "OVI develops advanced industrial biotechnology and cleaning technologies with performance-first engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-base text-text-primary antialiased">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
