// Server Component: emits LocalBusiness (HealthClub) + FAQPage structured
// data. Rendered in the homepage server tree so it lands in the initial HTML
// and crawlers see it without hydration. Czech is the indexed locale, so the
// FAQ Q/A are pulled from dictionary.cs.
import { dictionary } from "@/lib/i18n/dictionary";

const SITE_URL = "https://myzonegym.cz";

const cs = dictionary.cs;

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "@id": `${SITE_URL}/#business`,
  name: "MyZone Gym",
  description:
    "Soukromé fitness v Kladně. Rezervuj slot, obdrž kód SMSkou, odemkni dveře a cvič v klidu - celý prostor jen pro tebe a tvou partu.",
  url: SITE_URL,
  telephone: "+420 722 662 467",
  email: "info@myzonegym.cz",
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Leoše Janáčka 237",
    addressLocality: "Kladno",
    postalCode: "272 01",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.1466,
    longitude: 14.1027,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "06:00",
    closes: "22:00",
  },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cs.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function serialize(data: unknown): string {
  // Escape `<` so a `</script>` sequence inside any string can't break out of
  // the script tag (XSS hardening per the SEO rubric).
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(faqPage) }}
      />
    </>
  );
}
