import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JakToFunguje } from "@/components/sections/JakToFunguje";
import { Vybaveni } from "@/components/sections/Vybaveni";
import { Komfort } from "@/components/sections/Komfort";
import { Kapacita } from "@/components/sections/Kapacita";
import { KontaktMap } from "@/components/sections/KontaktMap";
import { SlevaForm } from "@/components/sections/SlevaForm";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <JakToFunguje />
        <Vybaveni />
        <Komfort />
        <Kapacita />
        <KontaktMap />
        <SlevaForm />
      </main>
      <Footer />
    </>
  );
}
