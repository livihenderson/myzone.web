import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: "MyZone — Soukromé fitness, Kladno",
  description:
    "Soukromé fitness v Kladně. Tvoje zóna. Tvůj čas. Rezervuj, obdrž kód, odemkni dveře a cvič v klidu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg-black)] text-[var(--color-text-primary)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--color-ice)] focus:px-3 focus:py-2 focus:text-[var(--color-bg-black)]"
        >
          Přeskočit na obsah
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
