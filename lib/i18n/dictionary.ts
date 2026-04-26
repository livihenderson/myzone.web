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
      sub: "Soukromé fitness pro tebe a tvou partu. Žádné fronty, žádné čekání.",
      ctaPrimary: "Rezervovat",
      ctaGhost: "Prohlédnout prostory",
    },
    trust: {
      private: "100% soukromí",
      capacity: "Až 4 osoby",
      access: "Denně 6:00–22:00",
      location: "Kladno",
    },
    how: {
      eyebrow: "01 / JAK TO FUNGUJE",
      title: "Čtyři kroky k tvému tréninku",
      steps: [
        {
          n: "01",
          title: "Rezervuj si trénink",
          desc: "Vyber si svůj termín ze 75minutových slotů. Jen pár kliknutí a máš hotovo.",
        },
        {
          n: "02",
          title: "Počkej na SMS",
          desc: "Unikátní vstupní kód ti pošleme SMSkou těsně před začátkem tréninku.",
        },
        {
          n: "03",
          title: "Zadej kód u dveří",
          desc: "Kód tě pustí do gymu, žádná recepce, žádné zdržování.",
        },
        {
          n: "04",
          title: "Užij si svůj trénink",
          desc: "Celý prostor máš jen pro sebe.",
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
      sub: "Nemusíš si nic nosit. Vše potřebné máme pro tebe připravené.",
      items: [
        {
          title: "Šatna & sprcha",
          desc: "Sprchový kout se vším vybavením — sprchové gely, gumičky do vlasů a veškeré hygienické potřeby.",
        },
        {
          title: "Káva zdarma",
          desc: "Káva na uvítanou nebo po tréninku. Na účet podniku.",
        },
        {
          title: "Aktin bar",
          desc: "Proteinové shaky, elektrolyty a tyčinky. Platba pomocí QR kódu.",
        },
        {
          title: "Reproduktory & Wi-Fi",
          desc: "Tvůj playlist, tvé tempo. Wi-Fi pro hosty je samozřejmostí.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / KAPACITA",
      title: "Až 4 osoby",
      sub: "Na jednu rezervaci. Celý prostor patří jen vám.",
    },
    contact: {
      eyebrow: "06 / KONTAKT",
      title: "Najdeš nás na Kladně",
      address: "Leoše Janáčka 237, 272 01 Kladno 1",
      phone: "+420 000 000 000",
      email: "info@myzone.cz",
      hours: "Po–Ne · 6:00–22:00",
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
      sleva: "Chci 15% slevu",
      wait: "VYDRŽ",
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
          a: "Jasně. Jedna rezervace je až pro 4 osoby, platíte za rezervovaný časový slot a ne za počet osob — takže si klidně vezmi partu a celý prostor patří jen vám.",
        },
        {
          q: "Jak dlouho trvá jeden slot?",
          a: "Jeden slot má 75 minut. Dost času na pořádný trénink i rozcvičku a vychladnutí, bez toho aby ses musel/a honit s hodinami.",
        },
        {
          q: "Jak se dostanu dovnitř?",
          a: "Po rezervaci ti těsně před slotem přijde SMSkou unikátní kód, kterým odemkneš dveře. Bez recepce, bez čekání.",
        },
        {
          q: "Můžu si přivést vlastního trenéra?",
          a: "Jasně. Trenér se počítá do limitu 4 osob — stačí, když se vejdete do kapacity.",
        },
        {
          q: "Co když budu chtít rezervaci zrušit?",
          a: "Zrušit nebo přesunout ji můžeš zdarma nejpozději 24 hodin před začátkem slotu.",
        },
        {
          q: "Co si mám vzít s sebou?",
          a: "Jen oblečení, boty na cvičení a ručník. Sprchové gely, drobnosti i voda jsou u nás připravené. Proteinové shaky si koupíš přímo v Aktin baru.",
        },
      ],
    },
    about: {
      eyebrow: "O NÁS",
      title: "Tvoje zóna. Tvoje pravidla.",
      body: [
        "MyZone jsme postavili, protože nám na Kladně chybělo místo, kde se dá cvičit v klidu, bez front a se stoprocentním soustředěním jen na sebe. Už nás nebavilo čekat, až se uvolní stroj, nebo trávit půlku tréninku hledáním činek a kotoučů po celém fitku.",
        "Rozhodli jsme se proto vytvořit prostor, kde tohle odpadá. Zapomeňte na přeplněné posilovny a nepříjemné pohledy. V MyZone je to o vás — o vašem tréninku, vaší hudbě a vašem progresu.",
        "Při vybavování jsme sázeli na kvalitu a funkčnost, kterou ocení jak zkušení sportovci, tak začátečníci, kteří hledají bezpečné a diskrétní místo pro své první kroky. Naším cílem bylo vytvořit prostředí, kde vás nic nerozptyluje a kde máte celé fitko jen pro sebe.",
        "MyZone je vaše zóna, kde platí vaše pravidla a kde váš čas patří jen vám. Přijďte si vyzkoušet, jaké to je trénovat v maximálním soukromí a posouvat své hranice bez zbytečných kompromisů.",
      ],
      cta: "Rezervovat slot",
    },
    gallery: {
      eyebrow: "FOTOGALERIE",
      title: "Nahlédni do MyZone",
      sub: "Prohlédni si prostor, než si u nás zacvičíš poprvé.",
      disclaimer:
        "Fotky jsou zatím pouze ilustrační. Skutečné fotky našeho prostoru doplníme před otevřením.",
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
      sub: "Private fitness for you and your crew. No queues, no waiting.",
      ctaPrimary: "Book now",
      ctaGhost: "See the space",
    },
    trust: {
      private: "100% privacy",
      capacity: "Up to 4 people",
      access: "Daily 6:00–22:00",
      location: "Kladno",
    },
    how: {
      eyebrow: "01 / HOW IT WORKS",
      title: "Four steps to your workout",
      steps: [
        {
          n: "01",
          title: "Book your session",
          desc: "Pick your 75-minute time slot. A few clicks and you're done.",
        },
        {
          n: "02",
          title: "Wait for the SMS",
          desc: "We'll send a unique entry code by SMS right before your session starts.",
        },
        {
          n: "03",
          title: "Enter the code at the door",
          desc: "The code gets you into the gym — no reception, no holdups.",
        },
        {
          n: "04",
          title: "Enjoy your workout",
          desc: "The whole space is yours.",
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
          desc: "Shower with everything you need — shower gels, hair ties and all essential hygiene supplies.",
        },
        {
          title: "Free coffee",
          desc: "A welcome coffee or a post-workout kick. On the house.",
        },
        {
          title: "Aktin bar",
          desc: "Protein shakes, electrolytes and bars. Pay by QR code.",
        },
        {
          title: "Speakers & Wi-Fi",
          desc: "Your playlist, your pace. Wi-Fi for guests, obviously.",
        },
      ],
    },
    capacity: {
      eyebrow: "04 / CAPACITY",
      title: "Up to 4 people",
      sub: "Per booking. The whole space is yours.",
    },
    contact: {
      eyebrow: "06 / CONTACT",
      title: "Find us in Kladno",
      address: "Leoše Janáčka 237, 272 01 Kladno 1",
      phone: "+420 000 000 000",
      email: "info@myzone.cz",
      hours: "Mon–Sun · 6:00–22:00",
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
      sleva: "Get 15% off",
      wait: "WAIT",
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
          a: "Of course. One booking covers up to 4 people — you pay for the time slot, not per person, so bring your crew and the whole space is yours.",
        },
        {
          q: "How long is one session?",
          a: "One slot runs for 75 minutes. Plenty of time for a proper workout plus warm-up and cool-down, without racing the clock.",
        },
        {
          q: "How do I get in?",
          a: "After booking, you'll get a unique code by SMS right before your slot — use it to unlock the door. No reception, no waiting.",
        },
        {
          q: "Can I bring my own trainer?",
          a: "Absolutely. Your trainer counts toward the 4-person cap — just fit them into your booking.",
        },
        {
          q: "What about cancellations?",
          a: "You can cancel or reschedule free of charge up to 24 hours before your slot starts.",
        },
        {
          q: "What should I bring?",
          a: "Just gym clothes, shoes and a towel. Shower gels, essentials and water are on us. Protein shakes are available at the Aktin bar.",
        },
      ],
    },
    about: {
      eyebrow: "ABOUT",
      title: "Your zone. Your rules.",
      body: [
        "We built MyZone because Kladno was missing a place where you can train in peace, without queues, with full focus on yourself. We were tired of waiting for a machine to free up or spending half a session hunting for dumbbells and plates across the gym.",
        "So we decided to create a space where none of that matters. Forget packed gyms and eyes on your back. At MyZone it's about you — your workout, your music, your progress.",
        "We equipped the place for quality and function, ready for seasoned athletes and for beginners looking for a safe, discreet spot to take their first steps. The goal was simple: nothing to distract you, the whole gym to yourself.",
        "MyZone is your zone, your rules, your time. Come try what it feels like to train in full privacy and push your limits without compromise.",
      ],
      cta: "Book a slot",
    },
    gallery: {
      eyebrow: "GALLERY",
      title: "Look inside MyZone",
      sub: "See the space before your first session.",
      disclaimer:
        "Photos are illustrative for now. We'll add real photos of the space before we open.",
      prev: "Previous",
      next: "Next",
      close: "Close",
    },
    footer: {
      tag: "Your zone. Your time.",
      rights: "All rights reserved.",
    },
  },
};

export type Dictionary = (typeof dictionary)["cs"];
