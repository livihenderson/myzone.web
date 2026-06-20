import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Legal text is Czech-only by design (statutory privacy notice); the Navbar
// and Footer chrome stays bilingual via the dictionary.
export const metadata: Metadata = {
  // absolute → bypass the root "%s — MyZone" template (brand already in title).
  title: { absolute: "Zásady zpracování osobních údajů (GDPR) — MyZone" },
  description:
    "Zásady zpracování osobních údajů (GDPR) provozovatele MyZone Gym, Kladno.",
  alternates: { canonical: "/gdpr" },
};

const mail = (
  <a
    href="mailto:info@myzonegym.cz"
    className="text-[var(--color-ice)] underline-offset-4 hover:underline"
  >
    info@myzonegym.cz
  </a>
);

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-2xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3 leading-relaxed text-[var(--color-text-dim)]">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[var(--color-ice-deep)]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function GdprPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <section className="relative pb-24 pt-40 md:pb-32 md:pt-48">
          <div className="mx-auto flex max-w-3xl flex-col gap-10 px-5 md:px-8">
            <header className="flex flex-col gap-3">
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-ice-deep)]">
                GDPR
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Zásady zpracování osobních údajů (GDPR)
              </h1>
              <p className="text-[var(--color-text-dim)]">
                MyZone Gym – soukromý samoobslužný prostor
              </p>
            </header>

            <p className="leading-relaxed text-[var(--color-text-primary)]">
              Odesláním rezervačního formuláře, provedením platby nebo
              potvrzením souhlasu na webových stránkách klient stvrzuje, že se
              seznámil s těmito Zásadami zpracování osobních údajů, plně jim
              rozumí a vyjadřuje s nimi svůj bezvýhradný souhlas.
            </p>

            <div className="flex flex-col gap-10">
              <Section title="1. Správce a kontakt">
                <p>Správcem osobních údajů je provozovatel posilovny:</p>
                <dl className="grid grid-cols-1 gap-1.5">
                  {[
                    ["Jméno", "Matouš Liemann"],
                    ["IČO", "24450758"],
                    ["Adresa", "Ládevská 1108/35, 184 00 Praha 8"],
                    ["Telefon", "+420 722 662 467"],
                    ["Web", "www.myzonegym.cz"],
                    [
                      "Provozovna (místo poskytování služeb)",
                      "MyZone Gym, Leoše Janáčka 237, 272 01 Kladno.",
                    ],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-col gap-0.5 sm:flex-row sm:gap-2"
                    >
                      <dt className="shrink-0 text-[var(--color-text-primary)]">
                        {k}:
                      </dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                    <dt className="shrink-0 text-[var(--color-text-primary)]">
                      Email:
                    </dt>
                    <dd>{mail}</dd>
                  </div>
                </dl>
              </Section>

              <Section title="2. Rozsah zpracovávaných údajů">
                <Bullets
                  items={[
                    "identifikační a kontaktní údaje (jméno, příjmení, e-mail, telefon);",
                    "údaje o rezervaci (termín, číslo rezervace), přístupový PIN;",
                    "platební identifikátory v rozsahu nutném k párování plateb (přes Stripe);",
                    "IP adresa a technické logy nutné pro provoz webu a bezpečnost;",
                    "záznam kamerového systému včetně zvuku ve společných prostorech cvičební zóny MyZone Gym (kamery se zásadně nenacházejí v šatnách a sociálním zázemí);",
                    "identifikační údaje doprovodných osob (v případě vyžádání správcem při řešení škodní nebo bezpečnostní události);",
                  ]}
                />
              </Section>

              <Section title="3. Účely a právní základy">
                <Bullets
                  items={[
                    "Plnění smlouvy (vytvoření a správa rezervace, poskytnutí přístupového PIN kódu do MyZone Gym, komunikace s klientem) – čl. 6 odst. 1 písm. b) GDPR;",
                    "Plnění právní povinnosti (účetnictví a daně) – čl. 6 odst. 1 písm. c) GDPR;",
                    "Oprávněný zájem (ochrana majetku a osob – kamerový systém včetně zvuku z důvodu prevence před krádežemi a vandalismem, IT bezpečnost, vymáhání případných škod a identifikace osob na základě provozního řádu) – čl. 6 odst. 1 písm. f) GDPR;",
                    "Souhlas (je-li vyžadován; např. marketing, volitelné cookies). Bez souhlasu marketingová sdělení nezasíláme.",
                  ]}
                />
              </Section>

              <Section title="4. Doba uchování">
                <Bullets
                  items={[
                    "rezervace a komunikace: 3 roky od poskytnutí služby;",
                    "kamerové záznamy včetně zvuku: max. 72 hodin (déle jen v případě zjištění incidentu, a to po nezbytnou dobu k předání Policii ČR nebo pojišťovně);",
                    "účetní doklady: 5 let podle příslušných právních předpisů.",
                  ]}
                />
              </Section>

              <Section title="5. Příjemci a zpracovatelé">
                <p>
                  Správce využívá pro zajištění chodu MyZone Gym tyto prověřené
                  zpracovatele:
                </p>
                <Bullets
                  items={[
                    "poskytovatel hostingu a správy domény www.myzonegym.cz: Webglobe;",
                    "poskytovatel platební brány: Stripe;",
                    "poskytovatel přístupového systému a zámků: TTLock.",
                  ]}
                />
                <p>
                  K záznamům z kamerového systému mají přístup pouze
                  majitelé/správci MyZone Gym. Osobní údaje nepředáváme do
                  třetích zemí mimo EU/EHP.
                </p>
              </Section>

              <Section title="6. Vaše práva">
                <p>
                  Máte právo požadovat přístup, opravu či výmaz osobních údajů,
                  omezení zpracování, přenositelnost, vznést námitku proti
                  zpracování na základě oprávněného zájmu (včetně kamerového
                  záznamu) a podat stížnost u Úřadu pro ochranu osobních údajů (
                  <a
                    href="https://www.uoou.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-ice)] underline-offset-4 hover:underline"
                  >
                    www.uoou.cz
                  </a>
                  ). Svá práva můžete uplatnit na e-mailu: {mail}.
                </p>
              </Section>

              <Section title="7. Zabezpečení">
                <p>
                  Aplikujeme přísná technická a organizační opatření odpovídající
                  možným rizikům samoobslužného provozu (šifrované HTTPS spojení,
                  řízené a logované přístupy do rezervačního systému, zabezpečená
                  správa přístupových kódů, poučení osob, uzamykatelné prostory a
                  kamerový dohled).
                </p>
              </Section>

              <Section title="8. Osoby v doprovodu">
                <p>
                  Pokud hlavní klient na základě VOP a rezervačního systému
                  přivede do MyZone Gym doprovod (max. 3 osoby), je tento hlavní
                  klient povinen své hosty informovat o tom, že prostor je
                  monitorován kamerovým systémem se záznamem zvuku a že jejich
                  osobní údaje mohou být zpracovány za účelem ochrany majetku. V
                  případě škodní události je hlavní klient povinen poskytnout
                  identifikační údaje těchto osob správci.
                </p>
              </Section>

              <Section title="9. Závěr">
                <p>
                  Tyto zásady můžeme s ohledem na legislativu nebo změny
                  technologií aktualizovat; na webu www.myzonegym.cz je vždy
                  uvedena platná verze.
                </p>
                <p className="text-[var(--color-text-primary)]">
                  Účinnost od: 20. 5. 2026
                </p>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
