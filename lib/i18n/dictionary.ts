export type Locale = "cs" | "en";

export const dictionary = {
  cs: {
    nav: {
      home: "Úvod",
      about: "O nás",
      gallery: "Fotogalerie",
      reserve: "Rezervovat",
    },
    hero: {
      eyebrow: "SOUKROMÉ FITNESS · KLADNO",
      title: "Tvoje zóna.\nTvůj čas.",
      sub: "Soukromé fitness pro tebe a tvou partu. Žádné fronty, žádné čekání, žádné rušivé pohledy.",
      ctaPrimary: "Rezervovat",
      ctaGhost: "Prohlédnout prostory",
    },
    trust: {
      private: "100% soukromé",
      capacity: "Max 3 osoby + trenér",
      access: "Přístup 24/7",
      location: "Kladno",
    },
    how: {
      eyebrow: "01 / JAK TO FUNGUJE",
      title: "Čtyři kroky k tvému tréninku",
      steps: [
        {
          n: "01",
          title: "Rezervuj slot",
          desc: "Vyber si volný čas přímo online. Rezervace na pár kliknutí.",
        },
        {
          n: "02",
          title: "Obdrž kód",
          desc: "Unikátní kód ti přijde e-mailem těsně před tvým slotem.",
        },
        {
          n: "03",
          title: "Odemkni dveře",
          desc: "Kód tě pustí do gymu. Bez recepce, bez čekání.",
        },
        {
          n: "04",
          title: "Cvič v klidu",
          desc: "Celý prostor patří jen tobě a tvé partě.",
        },
      ],
    },
    facilities: {
      eyebrow: "02 / VYBAVENÍ",
      title: "Vše, co potřebuješ",
      sub: "Kompletní silové, kardio i doplňkové vybavení v moderním prostoru.",
      cards: [
        {
          title: "Silový trénink",
          desc: "Leg press, klec, multi-press, rohový multifunkční stroj (záda, veslování, zakopávání, kladky).",
        },
        {
          title: "Činky 2–35 kg",
          desc: "Kompletní sada jednoručních činek ve všech váhách.",
        },
        {
          title: "Kardio",
          desc: "Běžecký pás a prostor pro tvou rozcvičku.",
        },
        {
          title: "Volné váhy & doplňky",
          desc: "Osy, zakřivená osa, lavice, gumy, podložky, kotouče.",
        },
      ],
    },
    comfort: {
      eyebrow: "03 / KOMFORT",
      title: "Staráme se o tvůj komfort",
      sub: "Nemusíš nic nosit. Vše potřebné máme pro tebe připravené.",
      items: [
        {
          title: "Šatna & sprcha",
          desc: "Sprchový kout se vším vybavením — sprchové gely, gumičky do vlasů, tampony, vložky.",
        },
        {
          title: "Nespresso zdarma",
          desc: "Káva na uvítanou nebo po tréninku. Na náklady podniku.",
        },
        {
          title: "Aktin bar",
          desc: "Proteinové shaky, elektrolyty a tyčinky. Platba QR kódem.",
        },
        {
          title: "Reproduktory & Wi-Fi",
          desc: "Tvůj playlist, tvé tempo. Wi-Fi pro hosty samozřejmostí.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / KAPACITA",
      title: "3 osoby + trenér",
      sub: "Na jednu rezervaci. Celý prostor patří jen vám.",
    },
    contact: {
      eyebrow: "05 / KONTAKT",
      title: "Najdeš nás v Kladně",
      address: "Petra Bezruče 3388, Kladno",
      phone: "+420 000 000 000",
      email: "ahoj@myzone.cz",
      hours: "Po–Ne · 24/7 po rezervaci",
    },
    sleva: {
      eyebrow: "06 / PŘEDOTEVÍRACÍ BONUS",
      title: "Sleva 15 % na první vstup",
      sub: "Přihlaš se před oficiálním otevřením a pošleme ti osobní slevový kód 15 %.",
      name: "Jméno",
      email: "E-mail",
      phone: "Telefon (nepovinné)",
      source: "Odkud o nás víš?",
      sourceOptions: ["Instagram", "Kamarád", "Google", "Jiné"],
      message: "Zpráva (nepovinné)",
      submit: "Chci slevu",
      submitting: "Odesílám…",
      successTitle: "Díky!",
      successBody:
        "Před oficiálním otevřením ti na e-mail pošleme osobní 15% slevový kód. Sleduj schránku.",
      errorRequired: "Toto pole je povinné.",
      errorEmail: "Neplatný e-mail.",
    },
    reserve: {
      status: "STATUS: V PŘÍPRAVĚ",
      title: "Rezervační systém připravujeme",
      body: "Spouštíme brzy. Mezitím se přihlaš na 15% slevu na hlavní stránce.",
      back: "Zpět na hlavní stránku",
    },
    about: {
      eyebrow: "O NÁS",
      title: "Prostor, kde si nemusíš hlídat záda",
      body: [
        "Když jsme začínali cvičit, komerční gymy nám přišly nepříjemné. Stovky lidí, fronty, nikdo po sobě neuklidí, pohledy. Nedalo se soustředit na trénink.",
        "Chtěli jsme moderní prostor, který dá klid a soukromí. Místo, kam přijdeš ty a tvá parta, zavřete za sebou a je to jen vaše.",
        "MyZone je přesně to — tvoje zóna, tvoje pravidla, tvůj čas.",
      ],
      pullquote: "Tvoje zóna. Tvoje pravidla.",
      cta: "Rezervovat slot",
    },
    gallery: {
      eyebrow: "FOTOGALERIE",
      title: "Nahlédni do MyZone",
      sub: "Prohlédni si prostor, než u nás cvičíš poprvé.",
      prev: "Předchozí",
      next: "Další",
      close: "Zavřít",
    },
    footer: {
      tag: "Tvoje zóna. Tvůj čas.",
      rights: "Všechna práva vyhrazena.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      reserve: "Book now",
    },
    hero: {
      eyebrow: "PRIVATE FITNESS · KLADNO",
      title: "Your zone.\nYour time.",
      sub: "Private fitness for you and your crew. No queues, no waiting, no eyes on you.",
      ctaPrimary: "Book now",
      ctaGhost: "See the space",
    },
    trust: {
      private: "100% private",
      capacity: "Max 3 + trainer",
      access: "24/7 access",
      location: "Kladno",
    },
    how: {
      eyebrow: "01 / HOW IT WORKS",
      title: "Four steps to your workout",
      steps: [
        {
          n: "01",
          title: "Book a slot",
          desc: "Pick your time online. A few clicks and you're in.",
        },
        {
          n: "02",
          title: "Get your code",
          desc: "A unique code lands in your inbox right before your slot.",
        },
        {
          n: "03",
          title: "Unlock the door",
          desc: "Your code gets you in. No reception, no waiting.",
        },
        {
          n: "04",
          title: "Train in peace",
          desc: "The whole space is yours and your crew's.",
        },
      ],
    },
    facilities: {
      eyebrow: "02 / EQUIPMENT",
      title: "Everything you need",
      sub: "Full strength, cardio and accessory equipment in a modern space.",
      cards: [
        {
          title: "Strength",
          desc: "Leg press, power rack, multi-press, multi-station (back, rows, leg curls, cable stack).",
        },
        {
          title: "Dumbbells 2–35 kg",
          desc: "Full dumbbell set across the weight range.",
        },
        {
          title: "Cardio",
          desc: "Treadmill and space for your warm-up.",
        },
        {
          title: "Free weights & extras",
          desc: "Bars, EZ bar, benches, bands, mats, plates.",
        },
      ],
    },
    comfort: {
      eyebrow: "03 / COMFORT",
      title: "We take care of the details",
      sub: "You don't need to bring a thing. We've got you covered.",
      items: [
        {
          title: "Changing room & shower",
          desc: "Fully stocked — shower gels, hair ties, tampons, pads.",
        },
        {
          title: "Free Nespresso",
          desc: "Welcome coffee or post-workout kick. On the house.",
        },
        {
          title: "Aktin bar",
          desc: "Protein shakes, electrolytes and bars. QR-code payment.",
        },
        {
          title: "Speakers & Wi-Fi",
          desc: "Your playlist, your pace. Wi-Fi for guests, obviously.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / CAPACITY",
      title: "3 people + trainer",
      sub: "Per booking. The whole space is yours.",
    },
    contact: {
      eyebrow: "05 / CONTACT",
      title: "Find us in Kladno",
      address: "Petra Bezruče 3388, Kladno",
      phone: "+420 000 000 000",
      email: "hello@myzone.cz",
      hours: "Mon–Sun · 24/7 after booking",
    },
    sleva: {
      eyebrow: "06 / PRE-LAUNCH BONUS",
      title: "15% off your first visit",
      sub: "Sign up before we open and we'll send you a personal 15% discount code.",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      source: "How did you hear about us?",
      sourceOptions: ["Instagram", "A friend", "Google", "Other"],
      message: "Message (optional)",
      submit: "Get my discount",
      submitting: "Sending…",
      successTitle: "Thanks!",
      successBody:
        "Before we officially open, we'll email your personal 15% discount code. Watch your inbox.",
      errorRequired: "This field is required.",
      errorEmail: "Invalid email.",
    },
    reserve: {
      status: "STATUS: COMING SOON",
      title: "Booking system in the works",
      body: "Launching soon. In the meantime, grab the 15% discount on the home page.",
      back: "Back to home",
    },
    about: {
      eyebrow: "ABOUT",
      title: "A space where you don't have to watch your back",
      body: [
        "When we started training, commercial gyms felt uncomfortable. Crowds, queues, nobody cleans up, eyes everywhere. You couldn't focus on a set.",
        "We wanted a modern space that gave us calm and privacy. A place you and your crew walk into, lock the door, and it's yours.",
        "MyZone is exactly that — your zone, your rules, your time.",
      ],
      pullquote: "Your zone. Your rules.",
      cta: "Book a slot",
    },
    gallery: {
      eyebrow: "GALLERY",
      title: "Look inside MyZone",
      sub: "See the space before your first session.",
      prev: "Previous",
      next: "Next",
      close: "Close",
    },
    footer: {
      tag: "Your zone. Your time.",
      rights: "All rights reserved.",
    },
  },
} as const;

export type Dictionary = typeof dictionary.cs;
