import type { Metadata } from "next";
import type { ReactNode } from "react";

// Thin "booking coming soon" status page — noindexed and omitted from the
// sitemap so it doesn't dilute the indexable surface. Page stays a Client
// Component (animation/i18n); metadata lives in this Server Component layout.
export const metadata: Metadata = {
  // absolute → bypass the root "%s — MyZone" template (brand already in title).
  title: { absolute: "Rezervovat — MyZone" },
  description:
    "Rezervační systém MyZone připravujeme. Spouštíme brzy — mezitím se přihlaš na předotevírací slevu na hlavní stránce.",
  robots: { index: false, follow: true },
};

export default function RezervovatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
