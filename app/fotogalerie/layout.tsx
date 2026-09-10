import type { Metadata } from "next";
import type { ReactNode } from "react";

// The page itself stays a Client Component (lightbox/i18n); metadata lives in
// this Server Component layout so the route gets a unique title + canonical.
export const metadata: Metadata = {
  // absolute → bypass the root "%s - MyZone" template (brand already in title).
  title: { absolute: "Fotogalerie - MyZone soukromé fitness Kladno" },
  description:
    "Nahlédni do MyZone Gym v Kladně. Prohlédni si silové i kardio vybavení, šatnu a celý prostor, než si u nás poprvé zacvičíš.",
  alternates: { canonical: "/fotogalerie" },
  openGraph: {
    title: "Fotogalerie - MyZone soukromé fitness Kladno",
    description:
      "Nahlédni do MyZone Gym v Kladně. Prohlédni si vybavení a celý prostor, než si u nás poprvé zacvičíš.",
    url: "https://myzonegym.cz/fotogalerie",
  },
};

export default function FotogalerieLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
