import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://myzonegym.cz";
const SITE_DESCRIPTION =
  "Soukromé fitness v Kladně. Tvoje zóna. Tvůj čas. Rezervuj, obdrž kód, odemkni dveře a cvič v klidu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MyZone — Soukromé fitness, Kladno",
    template: "%s — MyZone",
  },
  description: SITE_DESCRIPTION,
  applicationName: "MyZone Gym",
  alternates: {
    canonical: "/",
    // Content is served cs/en at the same URL (en is a client-side toggle),
    // and cs is the indexed locale — so both cs and x-default resolve here.
    languages: {
      cs: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "MyZone Gym",
    locale: "cs_CZ",
    url: SITE_URL,
    title: "MyZone — Soukromé fitness, Kladno",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "MyZone — Soukromé fitness, Kladno",
    description: SITE_DESCRIPTION,
  },
};

// Explicit viewport so iOS Safari sizes the layout to the visible area
// (not the layout viewport), matching the dvh units the hero uses.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-[var(--color-bg-black)] text-[var(--color-text-primary)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--color-ice)] focus:px-3 focus:py-2 focus:text-[var(--color-bg-black)]"
        >
          Přeskočit na obsah
        </a>
        <Providers>{children}</Providers>
        {/* Reservine booking widget. Pinned (no @latest — supply-chain +
            cache-busting risk) and loaded afterInteractive: the
            <reservine-button> wrapper only needs to upgrade before a user
            clicks "Rezervovat", and it degrades to a normal <Button> link
            until then, so it must not block first paint / hydration. */}
        <Script
          src="https://unpkg.com/reservine-button@0.0.24"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
