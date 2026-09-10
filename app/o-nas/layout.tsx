import type { Metadata } from "next";
import type { ReactNode } from "react";

// The page itself stays a Client Component (i18n via context); metadata lives
// in this Server Component layout so the route gets a unique title + canonical.
export const metadata: Metadata = {
  // absolute → bypass the root "%s - MyZone" template (brand already in title).
  title: { absolute: "O nás - MyZone soukromé fitness Kladno" },
  description:
    "MyZone je soukromé fitness v Kladně, kde celý prostor patří jen tobě a tvé partě. Cvič v klidu, bez front, se 100% soukromím a kompletním vybavením.",
  alternates: { canonical: "/o-nas" },
  openGraph: {
    title: "O nás - MyZone soukromé fitness Kladno",
    description:
      "MyZone je soukromé fitness v Kladně, kde celý prostor patří jen tobě a tvé partě. Cvič v klidu, bez front, se 100% soukromím.",
    url: "https://myzonegym.cz/o-nas",
  },
};

export default function ONasLayout({ children }: { children: ReactNode }) {
  return children;
}
