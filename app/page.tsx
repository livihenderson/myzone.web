import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JakToFunguje } from "@/components/sections/JakToFunguje";
import { Vybaveni } from "@/components/sections/Vybaveni";
import { Komfort } from "@/components/sections/Komfort";
import { Kapacita } from "@/components/sections/Kapacita";
import { KontaktMap } from "@/components/sections/KontaktMap";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <JakToFunguje />
        <Vybaveni />
        <Komfort />
        <Kapacita />
        <KontaktMap />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
