export type Locale = "cs" | "en";

export const dictionary = {
  cs: {
    nav: {
      home: "Úvod",
      about: "O nás",
      gallery: "Fotogalerie",
      contact: "Kontakt",
      faq: "Dotazy",
      reserve: "Rezervovat",
    },
    hero: {
      eyebrow: "SOUKROMÉ FITNESS · KLADNO",
      title: "Tvoje zóna.\nTvůj čas.",
      sub: "Soukromé fitness pro tebe a tvou partu. Žádné fronty, žádné čekání, žádné nepříjemné pohledy.",
      ctaPrimary: "Rezervovat",
      ctaGhost: "Prohlédnout prostory",
    },
    trust: {
      private: "100% soukromé",
      capacity: "Max 3 osoby + trenér",
      access: "Denně 6:00–22:00",
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
          desc: "Unikátní kód ti přijde SMSkou těsně před tvým slotem.",
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
          desc: "Dřepovací klec, bench-pressová klec, multipress, leg press, hrazda na shyby.",
        },
        {
          title: "Kladky & stroje",
          desc: "Nastavitelná kladková stanice, veslovací stanice, lat pulldown. Adaptéry: biceps, triceps, záda, kotníky.",
        },
        {
          title: "Kardio & mobilita",
          desc: "Běžecký pás, stepper, švihadlo, masážní roller, podložky na cvičení.",
        },
        {
          title: "Volné váhy",
          desc: "Kotouče 220 kg, jednoruční činky 0,5–35 kg, osa rovná i zakřivená, nastavitelná lavice, odporové gumy.",
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
          desc: "Tvůj playlist, tvé tempo. Wi-Fi pro hosty je samozřejmostí.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / KAPACITA",
      title: "3 osoby + trenér",
      sub: "Na jednu rezervaci. Celý prostor patří jen vám.",
    },
    contact: {
      eyebrow: "06 / KONTAKT",
      title: "Najdeš nás v Kladně",
      address: "Leoše Janáčka 237, 272 01 Kladno 1",
      phone: "+420 000 000 000",
      email: "info@myzone.cz",
      hours: "Po–Ne · 6:00–22:00 po rezervaci",
      parkingTipLabel: "TIP — KDE ZAPARKOVAT",
      parkingTipBody:
        "OC Central Kladno máš 3 minuty pěšky. První 3 hodiny parkuješ zdarma.",
    },
    sleva: {
      eyebrow: "05 / PŘEDOTEVÍRACÍ BONUS",
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
    faq: {
      eyebrow: "07 / ČASTÉ DOTAZY",
      title: "Nejčastější otázky",
      items: [
        {
          q: "Musím být členem?",
          a: "Ne. U nás si rezervuješ jednotlivý slot bez dlouhodobého závazku — platíš jen za to, co si odcvičíš.",
        },
        {
          q: "Můžu si vzít kamaráda?",
          a: "Jasně. Jedna rezervace je až pro 3 osoby + trenéra — vezmi si partu a celý prostor patří jen vám.",
        },
        {
          q: "Jak se dostanu dovnitř?",
          a: "Po rezervaci ti těsně před slotem přijde SMSkou unikátní kód, kterým odemkneš dveře. Bez recepce, bez čekání.",
        },
        {
          q: "Můžu si přivést vlastního trenéra?",
          a: "Jasně. Trenér se nepočítá do limitu 3 osob — přijde s tebou navíc.",
        },
        {
          q: "Co když budu chtít rezervaci zrušit?",
          a: "Zrušit nebo přesunout ji můžeš zdarma nejpozději 4 hodiny před začátkem slotu.",
        },
        {
          q: "Co si mám vzít s sebou?",
          a: "Jen oblečení, boty na cvičení a ručník. Sprchové gely, drobnosti i voda jsou u nás připravené. Proteinové shaky si koupíš přímo v Aktin baru.",
        },
      ],
    },
    about: {
      eyebrow: "O NÁS",
      title: "Prostor, kde si nemusíš hlídat záda",
      body: [
        "Když jsme začínali cvičit, komerční gymy nám přišly nepříjemné. Stovky lidí, fronty, nikdo po sobě neuklidí, nepříjemné pohledy. Nedalo se soustředit na trénink.",
        "Chtěli jsme moderní prostor, který dá klid a soukromí. Místo, kam přijdeš ty a tvá parta, zavřete za sebou a je to jen vaše.",
        "MyZone je přesně to — tvoje zóna, tvoje pravidla, tvůj čas.",
      ],
      pullquote: "Tvoje zóna. Tvoje pravidla.",
      cta: "Rezervovat slot",
    },
    gallery: {
      eyebrow: "FOTOGALERIE",
      title: "Nahlédni do MyZone",
      sub: "Prohlédni si prostor, než si u nás zacvičíš poprvé.",
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
      contact: "Contact",
      faq: "FAQ",
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
      access: "Daily 6:00–22:00",
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
          desc: "A unique code lands on your phone by SMS right before your slot.",
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
          desc: "Squat cage, bench-press cage, multi-press, leg press, pull-up bar.",
        },
        {
          title: "Cables & machines",
          desc: "Adjustable cable station, rowing station, lat pulldown. Attachments: biceps, triceps, back, ankle.",
        },
        {
          title: "Cardio & mobility",
          desc: "Treadmill, stepper, jump rope, foam roller, exercise mats.",
        },
        {
          title: "Free weights",
          desc: "220 kg of plates, dumbbells 0.5–35 kg, straight & EZ curl bar, adjustable bench, resistance bands.",
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
      eyebrow: "06 / CONTACT",
      title: "Find us in Kladno",
      address: "Leoše Janáčka 237, 272 01 Kladno 1",
      phone: "+420 000 000 000",
      email: "info@myzone.cz",
      hours: "Mon–Sun · 6:00–22:00 after booking",
      parkingTipLabel: "PARKING TIP",
      parkingTipBody:
        "Central Kladno mall is a 3-minute walk away. First 3 hours of parking are free.",
    },
    sleva: {
      eyebrow: "05 / PRE-LAUNCH BONUS",
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
    faq: {
      eyebrow: "07 / FAQ",
      title: "Frequently asked",
      items: [
        {
          q: "Do I need a membership?",
          a: "No. You book individual slots with no long-term commitment — pay only for what you actually train.",
        },
        {
          q: "Can I bring a friend?",
          a: "Of course. One booking covers up to 3 people + a trainer — bring your crew and the whole space is yours.",
        },
        {
          q: "How do I get in?",
          a: "After booking, you'll get a unique code by SMS right before your slot — use it to unlock the door. No reception, no waiting.",
        },
        {
          q: "Can I bring my own trainer?",
          a: "Absolutely. Trainers don't count toward the 3-person limit — they come along as an extra.",
        },
        {
          q: "What about cancellations?",
          a: "You can cancel or reschedule free of charge up to 4 hours before your slot starts.",
        },
        {
          q: "What should I bring?",
          a: "Just gym clothes, shoes and a towel. Shower gels, essentials and water are on us. Protein shakes are available at the Aktin bar.",
        },
      ],
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
