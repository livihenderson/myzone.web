import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { vopIntro, vopSections, vopTitle } from "@/lib/legal/vop";

export const metadata: Metadata = {
  title: "Obchodní podmínky — MyZone",
  description:
    "Všeobecné obchodní podmínky pro online rezervaci a pronájem soukromého prostoru MyZone Gym.",
};

export default function ObchodniPodminkyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <section className="relative pb-12 pt-40 md:pb-16 md:pt-48">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]">
              MYZONE GYM
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {vopTitle}
            </h1>
            <p className="mt-4 text-base text-[var(--color-text-dim)] md:text-lg">
              {vopIntro}
            </p>
            <div className="mt-8 h-px w-24 bg-[var(--color-ice)]" />
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 md:px-8">
            {vopSections.map((section) => (
              <article key={section.id} className="flex flex-col gap-5">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-2xl">
                  {section.id}. {section.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {section.clauses.map((clause) => (
                    <div key={clause.id} className="flex flex-col gap-3">
                      <p className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-dim)] md:text-base">
                        <span className="shrink-0 font-mono text-xs text-[var(--color-ice-deep)] md:text-sm">
                          {clause.id}
                        </span>
                        <span>{clause.text}</span>
                      </p>
                      {clause.items ? (
                        <ul className="ml-10 flex list-disc flex-col gap-2 pl-2 text-sm leading-relaxed text-[var(--color-text-dim)] marker:text-[var(--color-ice-deep)] md:text-base">
                          {clause.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
