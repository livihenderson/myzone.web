// Všeobecné obchodní podmínky (VOP) — binding Czech legal text.
// Kept out of the i18n dictionary on purpose: legally binding terms are shown
// verbatim in Czech regardless of the UI language. Rendered by
// app/obchodni-podminky/page.tsx.

export type VopClause = {
  /** Clause number, e.g. "1.1". */
  id: string;
  text: string;
  /** Optional sub-list rendered as bullet items below the clause text. */
  items?: string[];
};

export type VopSection = {
  /** Section number, e.g. "1". */
  id: string;
  heading: string;
  clauses: VopClause[];
};

export const vopTitle = "VŠEOBECNÉ OBCHODNÍ PODMÍNKY";

export const vopIntro =
  "pro online rezervaci a pronájem soukromého prostoru prostřednictvím webu www.myzonegym.cz („VOP“)";

export const vopEffectiveDate = "2. 7. 2026";

export const vopSections: VopSection[] = [
  {
    id: "1",
    heading: "ÚVODNÍ USTANOVENÍ A IDENTIFIKACE PROVOZOVATELE",
    clauses: [
      {
        id: "1.1",
        text: "Tyto VOP upravují vzájemná práva a povinnosti mezi provozovatelem rezervačního systému a pronajímatelem soukromého prostoru MyZone Gym (dále jen „Pronajímatel“ nebo „Provozovatel“) a zákazníky (dále jen „Nájemce“ nebo „Klient“ / „Hlavní klient“).",
      },
      {
        id: "1.2",
        text: "Identifikace Provozovatele:",
        items: [
          "Jméno: Matouš Liemann",
          "IČO: 24450758",
          "Adresa sídla: Ládevská 1108/35, 184 00 Praha 8",
          "Telefon: +420 722 662 467",
          "Email: info@myzonegym.cz",
          "Web: www.myzonegym.cz",
        ],
      },
      {
        id: "1.3",
        text: "Předmětem nájmu je soukromý samoobslužný prostor MyZone Gym umístěný na adrese provozovny: Leoše Janáčka 237, 272 01 Kladno (dále jen „Prostor“ nebo „Gym“).",
      },
      {
        id: "1.4",
        text: "Právní vztahy se řídí právem České republiky, zejména zákonem č. 89/2012 Sb., občanský zákoník, v platném znění (dále jen „OZ“).",
      },
      {
        id: "1.5",
        text: "Tyto VOP jsou veřejně dostupné na www.myzonegym.cz. Kliknutím na tlačítko REZERVOVAT A ZAPLATIT klient stvrzuje, že se s těmito VOP a Provozním řádem detailně seznámil, souhlasí s nimi, bere je jako součást nájemní smlouvy a plně si uvědomuje právní i finanční důsledky jejich porušení.",
      },
    ],
  },
  {
    id: "2",
    heading: "VYMEZENÍ POJMŮ",
    clauses: [
      {
        id: "2.1",
        text: "„Nájemní smlouva“ – smlouva uzavřená mezi Pronajímatelem a Klientem okamžikem stisku tlačítka REZERVOVAT A ZAPLATIT, jejímž předmětem je dočasné užívání prostoru.",
      },
      {
        id: "2.2",
        text: "„Spotřebitel“ – fyzická osoba mimo rámec podnikání (§ 419 OZ).",
      },
      {
        id: "2.3",
        text: "„Podnikatel“ – osoba jednající v rámci své podnikatelské činnosti (§ 420 OZ). Uvede-li Klient při rezervaci IČO, má se automaticky za to, že jedná jako podnikatel.",
      },
      {
        id: "2.4",
        text: "„Hlavní klient“ – osoba, která vytvořila a uhradila rezervaci v systému a na jejíž jméno je rezervace vedena.",
      },
    ],
  },
  {
    id: "3",
    heading: "PŘEDSMLOUVNÍ INFORMACE",
    clauses: [
      {
        id: "3.1",
        text: "Před uzavřením smlouvy jsou Klientovi na webu a v těchto VOP sděleny zejména: identifikace provozovatele, popis služby (pronájem prostoru), cena a způsob platby přes Stripe, podmínky poskytování služby, informace o právech z vadného plnění, nákladech na prostředky komunikace na dálku (běžná sazba operátora Klienta), omezení práva na odstoupení u služeb volného času v pevně určeném termínu a informace o mimosoudním řešení sporů.",
      },
      {
        id: "3.2",
        text: "Provozovatel používá prostředky komunikace na dálku. Náklady klienta na užití těchto prostředků si hradí klient sám.",
      },
    ],
  },
  {
    id: "4",
    heading: "UZAVŘENÍ SMLOUVY A REZERVACE",
    clauses: [
      {
        id: "4.1",
        text: "Klient vytvoří objednávku v online kalendáři na webu www.myzonegym.cz výběrem volného termínu a vyplněním jména, e-mailu a telefonního čísla.",
      },
      {
        id: "4.2",
        text: "Pokud nedojde k platbě, termín se uvolní pro další zájemce.",
      },
      {
        id: "4.3",
        text: "Stiskem REZERVOVAT A ZAPLATIT je klient přesměrován na platební bránu Stripe, kde provede úhradu platební kartou nebo prostřednictvím Apple Pay.",
      },
      {
        id: "4.4",
        text: "Smlouva je uzavřena okamžikem stisku REZERVOVAT A ZAPLATIT. Klient bezodkladně obdrží potvrzení rezervace na e-mail a přístupový PIN kód pro vstup do prostoru zaslaný prostřednictvím SMS zprávy.",
      },
      {
        id: "4.5",
        text: "Rezervovat prostor MyZone Gym může i osoba mladší 18 let. Pokud však rezervaci provádí nezletilá osoba, je povinna s sebou do Prostoru přivést zletilou osobu (starší 18 let), která za ni bude po celou dobu trvání rezervace plně odpovídat. Provedením platby a dokončením rezervace nezletilý stvrzuje, že tuto podmínku splní a zletilý doprovod si je vědom své plné odpovědnosti.",
      },
      {
        id: "4.6",
        text: "U služeb volného času poskytovaných v přesně určeném termínu se neuplatní 14denní právo na odstoupení dle § 1829 OZ (výjimka dle § 1837 písm. j) OZ). Rezervace je závazná.",
      },
    ],
  },
  {
    id: "5",
    heading: "CENA, MĚNA A PLATEBNÍ PODMÍNKY",
    clauses: [
      {
        id: "5.1",
        text: "Cena (nájemné) se řídí aktuálním ceníkem u jednotlivých časových bloků v rezervačním formuláři na webu.",
      },
      {
        id: "5.2",
        text: "Ceny jsou uvedeny v CZK. Provozovatel není plátcem DPH.",
      },
      {
        id: "5.3",
        text: "Akceptované platby: výhradně online platba kartou a Apple Pay prostřednictvím platební brány Stripe. Hotovost ani klasický převod předem nejsou u online rezervací dostupné.",
      },
      {
        id: "5.4",
        text: "Daňový/platební doklad je generován automaticky a zasílán elektronicky na e-mail uvedený v rezervaci.",
      },
    ],
  },
  {
    id: "6",
    heading: "DOBA NÁJMU, PŘÍSTUP A DODRŽOVÁNÍ ČASU",
    clauses: [
      {
        id: "6.1",
        text: "Nájem je sjednán na dobu 75 minut (nebo dle zvoleného bloku). Tato doba je fixní a zahrnuje i čas potřebný na převlečení, přípravu a následný úklid náčiní.",
      },
      {
        id: "6.2",
        text: "Přístupový PIN je aktivní od první minuty rezervace. Klient je povinen prostor opustit nejpozději v poslední minutě rezervovaného času. Pozdní příchod ani předčasný odchod nemají vliv na cenu.",
      },
      {
        id: "6.3",
        text: "Sankce za přetažení času: Klient je striktně povinen dodržovat čas své rezervace. Pokud klient nebo jeho doprovod neopustí prostor včas a zasáhne tak do následujícího bloku (nebo mimo vymezený čas), je provozovatel oprávněn mu naúčtovat dodatečné provozní náklady a smluvní pokutu za neoprávněné užívání prostoru ve výši 500 Kč za každých započatých 15 minut nad rámec rezervace.",
      },
    ],
  },
  {
    id: "7",
    heading: "ZMĚNY, STORNO A NÁHRADNÍ TERMÍNY",
    clauses: [
      {
        id: "7.1",
        text: "Jakákoli změna, přesun nebo zrušení rezervace ze strany klienta je možné nejpozději 24 hodin před začátkem vymezeného termínu. V takovém případě je klient povinen kontaktovat provozovatele výhradně elektronicky na e-mail: info@myzonegym.cz.",
      },
      {
        id: "7.2",
        text: "Při splnění lhůty podle bodu 7.1. bude s klientem situace řešena následovně:",
        items: [
          "Primární řešení: Provozovatel s klientem domluví náhradní termín a rezervaci v systému bezplatně přeplánuje.",
          "Sekundární řešení: Pokud se nepodaří najít vhodný náhradní termín, provozovatel vystaví a zašle klientovi elektronický voucher v hodnotě původní rezervace s určenou platností pro budoucí nákup.",
          "Vrácení peněz: Pokud klient po výslovném sdělení odmítne jak přeplánování termínu, tak vystavení voucheru, bude mu uhrazená částka vrácena v plné výši zpět na původní platební prostředek prostřednictvím platební brány Stripe.",
        ],
      },
      {
        id: "7.3",
        text: "Při zrušení rezervace později než 24 hodin před jejím začátkem, nebo v případě nedostavení se do prostoru, nárok na vrácení peněz, vystavení voucheru ani bezplatný přesun termínu bezvýhradně zaniká.",
      },
      {
        id: "7.4",
        text: "Nebude-li možné rezervovaný termín uskutečnit z technických nebo provozních důvodů na straně provozovatele (např. výpadek technologií, havárie v objektu, vyšší moc), bude klientovi přednostně nabídnut náhradní termín či voucher. Není-li to možné nebo Klient toto odmítne, bude mu uhrazená částka vrácena v plné výši na původní platební prostředek.",
      },
    ],
  },
  {
    id: "8",
    heading: "ODPOVĚDNOST ZA ÚRAZY A ZDRAVOTNÍ STAV",
    clauses: [
      {
        id: "8.1",
        text: "Cvičení na vlastní nebezpečí: Vzhledem k tomu, že MyZone Gym je samoobslužný prostor bez stálé přítomnosti personálu či trenéra, Klient i jeho doprovod využívají Prostor a veškeré vybavení výhradně na vlastní nebezpečí a plnou odpovědnost.",
      },
      {
        id: "8.2",
        text: "Prohlášení o způsobilosti: Klient potvrzením těchto podmínek výslovně prohlašuje, že on i osoby v jeho doprovodu jsou plně zdraví, fyzicky i mentálně způsobilí k intenzivnímu tréninku a netrpí žádnými zdravotními omezeními, která by cvičení kontraindikovala.",
      },
      {
        id: "8.3",
        text: "Znalost vybavení a strojů: Klient potvrzuje, že ovládá techniku cvičení a umí stroje, trenažéry a činky bezpečně používat. Pokud si Klient nebo jeho doprovod není jistý funkčností nebo nastavením jakéhokoli stroje, je povinen cvičení na tomto stroji vynechat, případně si vyhledat oficiální návod výrobce.",
      },
      {
        id: "8.4",
        text: "Vstup a ochrana nezletilých: Vstup osobám mladším 18 let je do Prostoru povolen výhradně v doprovodu dospělé osoby (starší 18 let). Tento dospělý doprovod plně zodpovídá za nezletilou osobu v posilovně a veškerou odpovědnost za ni bere na sebe. Kdokoli přivede do Prostoru nezletilou osobu, má striktní povinnost ji po celou dobu nepřetržitě hlídat a plně zodpovídá za její život, zdraví a veškeré škody, které v Prostoru způsobí.",
      },
      {
        id: "8.5",
        text: "Striktní zákaz pro osoby mladší 15 let: Osobám mladším 15 let je přísně zakázáno jakkoli manipulovat s jakýmkoli náčiním, zařízením či stroji, které se nacházejí v Prostoru posilovny a celé budovy. Pokud by osoba mladší 15 let tento přísný zákaz nerespektovala a způsobila by škodu na majetku v Prostoru, nebo fyzickou či zdravotní újmu sobě či dalším osobám v posilovně MyZone Gym, padá plná odpovědnost za tuto situaci na dospělou osobu, která v Prostoru působila jako dozor, případně na osobu, která rezervaci vytvořila.",
      },
      {
        id: "8.6",
        text: "Vyloučení odpovědnosti Provozovatele za nezletilé: Za jakoukoli újmu na zdraví či životě nezletilých osob v Prostoru nese výhradní odpovědnost osoba starší 18 let, která rezervaci vytvořila nebo která byla v Prostoru přítomna jako doprovod/dozor nezletilého. Provozovatel nenese jakoukoli odpovědnost za zranění, úrazy, zhoršení zdravotního stavu či úmrtí, které vznikly v důsledku nesprávného používání vybavení, nedodržení bezpečnostních zásad, neopatrnosti nebo přecenění vlastních sil ze strany Klienta, jeho doprovodu nebo jimi doprovázených nezletilých osob.",
      },
    ],
  },
  {
    id: "9",
    heading: "PREVENCE PROTI NEOPRÁVNĚNÝM OSOBÁM („ČERNÝM PASAŽÉRŮM“)",
    clauses: [
      {
        id: "9.1",
        text: "Nepřenosnost přístupu: Přístupový PIN kód zaslaný Klientovi je přísně tajný a nepřenosný. Klient nesmí kód sdílet s žádnou třetí osobou, která není nahlášena / schválena jako součást jeho rezervace. Pokud klient pustí dovnitř neoprávněnou osobu, nese plnou právní a finanční odpovědnost za veškeré její jednání v objektu.",
      },
      {
        id: "9.2",
        text: "Maximální kapacita (Pravidlo 1+3): Jedna rezervace opravňuje ke vstupu Hlavního klienta a maximálně 3 (tří) dalších osob jako jeho doprovodu (celkem tedy max. 4 lidé na místě). Vstup jakékoli další osoby (páté a další) je přísně zakázán a je považován za závažné porušení smlouvy. Každý nezletilý návštěvník se započítává do tohoto celkového limitu osob.",
      },
      {
        id: "9.3",
        text: "Odpovědnost Hlavního klienta za skupinu: Hlavní klient plně odpovídá za chování, bezpečnost, dodržování provozního řádu a případné škody způsobené všemi osobami (včetně nezletilých dětí), které do Gymu vstoupily v čase jeho rezervace. Škoda půjde v plném rozsahu právně za ním.",
      },
      {
        id: "9.4",
        text: "Povinnost identifikace hostů: Hlavní klient je povinen znát skutečnou totožnost všech svých hostů (doprovodu). V případě jakéhokoli incidentu (škoda, krádež, úraz, porušení řádu) je Hlavní klient povinen na výzvu Provozovatele neprodleně poskytnout kompletní a pravdivé identifikační údaje (jméno, příjmení, datum narození/trvalé bydliště a kontakt) všech osob, které s ním v daný čas v posilovně byly.",
      },
      {
        id: "9.5",
        text: "Sankce za neidentifikování a zneužití kódu: Pokud Hlavní klient odmítne hosty ztotožnit, uvede falešné údaje, nebo překročí povolený počet osob, bere na sebe automaticky veškerou právní a finanční odpovědnost za jejich jednání. Provozovatel je v takovém případě oprávněn udělit Hlavnímu klientovi smluvní pokutu ve výši 10 000 Kč a udělit mu doživotní zákaz vstupu (ban) do MyZone Gym.",
      },
      {
        id: "9.6",
        text: "Povinnost uzamčení dveří: Klient je při odchodu z Gymu povinen zkontrolovat, že se za ním vchodové dveře řádně dovřely a automaticky uzamkly. Pokud kvůli nedbalosti Klienta zůstane Gym otevřený a volně přístupný a dojde k vandalismu nebo vykradení, jde veškerá vzniklá škoda za tímto Klientem.",
      },
    ],
  },
  {
    id: "10",
    heading: "ŠKODY NA MAJETKU, VANDALISMUS A KRÁDEŽE",
    clauses: [
      {
        id: "10.1",
        text: "Odpovědnost za škodu: Klient odpovídá za veškeré škody na budově, interiéru a fitness vybavení, které v čase své rezervace způsobí on, jeho doprovod či jím doprovázené nezletilé osoby (včetně vandalismu, hrubého zacházení nebo zanedbání povinností). Klient se zavazuje vzniklou škodu uhradit v plné výši (v tržní ceně opravy či nového stroje) nejpozději do 30 dnů od výzvy.",
      },
      {
        id: "10.2",
        text: "Povinnost nahlásit závadu při příchodu: Klient je povinen ihned po příchodu do MyZone Gym prostor zkontrolovat. Pokud zjistí, že je v posilovně něco rozbité, zničené nebo chybí, je povinen to neprodleně nahlásit (vyfotit/popsat) na e-mail: info@myzonegym.cz. Pokud tak neučiní a závada bude zjištěna po jeho odchodu, má se za to, že škodu způsobil tento Klient, a odpovědnost padá na něj.",
      },
      {
        id: "10.3",
        text: "Nulová tolerance krádeží: Jakákoli krádež vybavení, doplňků, vybavení zázemí nebo zboží z nabídky bude Provozovatelem okamžitě nahlášena Policii ČR jako podezření ze spáchání trestného činu nebo přestupku. Jako klíčový důkazní materiál bude Policii předán kamerový záznam a identifikační údaje Klienta z rezervačního systému.",
      },
    ],
  },
  {
    id: "11",
    heading: "PRAVIDLA CHOVÁNÍ A ZÁKAZY (PROVOZNÍ ŘÁD)",
    clauses: [
      {
        id: "11.1",
        text: "V celém Prostoru MyZone Gym je striktně zakázáno:",
        items: [
          "Kouření (včetně elektronických cigaret a vapu);",
          "Konzumace alkoholu a jakýchkoliv omamných a návykových látek;",
          "Vstup pod vlivem alkoholu či drog;",
          "Manipulace s otevřeným ohněm;",
          "Jakékoliv sexuální aktivity a natáčení či focení pornografického či sexuálního obsahu;",
          "Přespávání;",
          "Užívání a distribuce nelegálních látek (včetně dopingu);",
          "Vstup se zvířaty;",
          "Jednání v rozporu s dobrými mravy a hlučné chování porušující noční klid (mezi 22:00 a 6:00).",
        ],
      },
      {
        id: "11.2",
        text: "Porušení bodu 11.1. je považováno za hrubé porušení nájemní smlouvy. Provozovatel má právo okamžitě dálkově deaktivovat přístupový kód, vykázat osoby z prostoru a udělit Klientovi trvalý zákaz vstupu, a to i zpětně na základě analýzy kamerového záznamu.",
      },
      {
        id: "11.3",
        text: "Klient je povinen udržovat čistotu: měnit si obuv za čistou vnitřní obuv, používat při cvičení vlastní čistý ručník jako podložku na stroje, vracet činky a kotouče na své stojany a po tréninku otřít stroje dezinfekcí, je-li k dispozici.",
      },
    ],
  },
  {
    id: "12",
    heading: "KAMEROVÝ SYSTÉM SE ZÁZNAMEM ZVUKU",
    clauses: [
      {
        id: "12.1",
        text: "Klient bere na vědomí a potvrzením VOP výslovně souhlasí s tím, že z důvodu bezpečnosti, ochrany majetku, prevence proti krádežím a kontroly dodržování těchto VOP je Prostor MyZone Gym nepřetržitě monitorován kamerovým systémem se záznamem obrazu i zvuku.",
      },
      {
        id: "12.2",
        text: "Kamery jsou umístěny výhradně v hlavní cvičební zóně a u vstupních dveří. Kamery se ze zásady nenacházejí v prostorách určených k převlékání a osobní hygieně (šatny, sprchy, WC).",
      },
      {
        id: "12.3",
        text: "Zpracování kamerových záznamů se řídí dokumentem „Zásady zpracování osobních údajů (GDPR)“ umístěným na www.myzonegym.cz. Hlavní klient je povinen o přítomnosti kamer se záznamem zvuku informovat svůj doprovod.",
      },
    ],
  },
  {
    id: "13",
    heading: "PRAVOMOCI PROVOZOVATELE A REKLAMACE",
    clauses: [
      {
        id: "13.1",
        text: "Právo zrušení účtu / Ban: Provozovatel si vyhrazuje právo odmítnout rezervaci nebo zablokovat profil jakémukoli Klientovi, který v minulosti porušil VOP, provozní řád, dluží peníze za způsobenou škodu nebo se choval hrubě k zařízení Gymu.",
      },
      {
        id: "13.2",
        text: "Reklamace: Pokud má Prostor vadu, která objektivně brání jeho řádnému užívání (např. nejde elektřina, porucha zámku), má Klient právo na přiměřenou slevu, náhradní termín či vrácení peněz. Reklamaci uplatňuje Klient e-mailem na info@myzonegym.cz (popis vady, čas rezervace, případně foto). Provozovatel vyřídí reklamaci nejpozději do 30 dnů.",
      },
    ],
  },
  {
    id: "14",
    heading: "MIMOSOUDNÍ ŘEŠENÍ SPORŮ",
    clauses: [
      {
        id: "14.1",
        text: "Orgánem mimosoudního řešení spotřebitelských sporů mezi Provozovatelem a Klientem (spotřebitelem) je Česká obchodní inspekce (www.coi.cz). Klient může využít také platformu pro řešení sporů online zřízenou Evropskou komisí.",
      },
    ],
  },
  {
    id: "15",
    heading: "ZÁVĚREČNÁ USTANOVENÍ",
    clauses: [
      {
        id: "15.1",
        text: "Provozovatel je oprávněn znění VOP jednostranně měnit. Pro Klienta je závazné znění VOP platné a zveřejněné na webu v přesný okamžik odeslání a zaplacení jeho rezervace.",
      },
      {
        id: "15.2",
        text: "Pokud by se stalo některé ustanovení těchto VOP neplatným nebo neúčinným, nemá to vliv na platnost ostatních ustanovení.",
      },
      {
        id: "15.3",
        text: `Tyto VOP nabývají platnosti a účinnosti dne ${vopEffectiveDate}.`,
      },
    ],
  },
];
