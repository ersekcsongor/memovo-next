import type { Lang } from "./i18n";

const U = "/images";

/** The prose that changes per language. */
export type EventCopy = {
  heading: string;
  tagline: string;
  tabs: string[];
  intro: string;
  sub: string;
  whyTitle: string;
  whyCopy: string;
  quote: string;
  band: string;
  pricingTitle: string;
  closing: string;
};

export type EventPage = {
  slug: string;
  /** Short name used in the header and footer navigation; translated via `event.<slug>`. */
  label: string;
  title: string;
  description: string;
  hero: string;
  prices: { name: string; usd: number | null }[];
  copy: Record<Lang, EventCopy>;
};

const TIERS = [
  { name: "CLASSIC", usd: 49 },
  { name: "SIGNATURE", usd: 89 },
  { name: "LUXE", usd: 119 },
];

const BUSINESS_TIERS = [
  { name: "STARTER", usd: 199 },
  { name: "PROFESSIONAL", usd: 399 },
  { name: "ENTERPRISE", usd: null },
];

export const EVENTS: EventPage[] = [
  {
    slug: "engagements",
    label: "Engagements",
    title: "Effortless Engagement Photo Sharing with QR Codes",
    description: "Guest photo collection and digital invitations for proposals, bridal showers and engagement parties.",
    hero: `${U}/hero-engagements.jpg`,
    prices: TIERS,
    copy: {
      en: {
        heading: "Guest Photo Collection & Digital Invitations",
        tagline: "Loved & Used For:",
        tabs: ["Proposals", "Bridal Showers", "Engagement Parties"],
        intro:
          "From the moment you said yes, the celebrations begin! From the engagement party, bridal shower, bucks/bachelorette and of course, your wedding day, Memovo brings every moment together in one beautifully organised place.",
        sub: "Every celebration stays connected and ready to relive instantly, via your private QR code or link.",
        whyTitle: "Why couples love it for their engagement era",
        whyCopy:
          "Your engagement is one of the best-loved times of your life, and your family and friends capture it from every angle. Your pre-wedding celebrations arrive through your guests' eyes, and you'll love receiving photos, videos and heartwarming guestbook messages from everyone you're celebrating with.",
        quote: "Quick set up, a lifetime of memories to enjoy!",
        band:
          "An all-in-one place for engaged couples to organise celebrations, manage guests and collect every memory from the engagement to the wedding day.",
        pricingTitle: "Engagements Pricing",
        closing: "From the day you said yes to the big day, capture it all with memovo.",
      },
      hu: {
        heading: "Vendégfotók gyűjtése és digitális meghívók",
        tagline: "Szeretik és használják:",
        tabs: ["Lánykérés", "Leánybúcsú", "Eljegyzési buli"],
        intro:
          "Attól a pillanattól, hogy igent mondtatok, kezdődik az ünneplés! Az eljegyzési bulitól a leánybúcsún át a legénybúcsúig, és persze az esküvő napjáig, a Memovo minden pillanatot egyetlen, gyönyörűen rendezett helyre gyűjt.",
        sub: "Minden ünnep egy helyen marad, és a privát QR-kóddal vagy linkkel azonnal újraélhető.",
        whyTitle: "Miért imádják a párok az eljegyzés idejére",
        whyCopy:
          "Az eljegyzés az élet egyik legkedvesebb időszaka, amelyet a család és a barátok minden szögből megörökítenek. Az esküvő előtti ünnepek a vendégeitek szemével érkeznek meg hozzátok, és imádni fogjátok a fotókat, videókat és szívmelengető üzeneteket mindenkitől, akivel együtt ünnepeltek.",
        quote: "Gyors beállítás, egy életre szóló emlékek!",
        band:
          "Egyetlen hely a jegyeseknek, ahol megszervezhetik az ünnepeket, kezelhetik a vendégeket, és összegyűjthetnek minden emléket az eljegyzéstől az esküvő napjáig.",
        pricingTitle: "Eljegyzési árak",
        closing: "Attól a naptól, hogy igent mondtatok, a nagy napig – örökítsétek meg mindet a Memovóval.",
      },
      ro: {
        heading: "Colectarea fotografiilor invitaților și invitații digitale",
        tagline: "Îndrăgit și folosit pentru:",
        tabs: ["Cereri în căsătorie", "Petreceri prenupțiale", "Petreceri de logodnă"],
        intro:
          "Din clipa în care ați spus da, încep sărbătorile! De la petrecerea de logodnă și petrecerea prenupțială până la burlăcii și, desigur, ziua nunții, Memovo adună fiecare moment într-un singur loc frumos organizat.",
        sub: "Fiecare sărbătoare rămâne conectată și gata de retrăit instant, prin codul QR sau linkul privat.",
        whyTitle: "De ce o îndrăgesc cuplurile în perioada logodnei",
        whyCopy:
          "Logodna este una dintre cele mai frumoase perioade din viață, iar familia și prietenii o surprind din toate unghiurile. Sărbătorile de dinaintea nunții ajung la voi prin ochii invitaților, iar fotografiile, videoclipurile și mesajele calde din cartea de oaspeți vă vor încânta.",
        quote: "Configurare rapidă, amintiri pentru o viață!",
        band:
          "Un singur loc pentru cuplurile logodite, unde își organizează sărbătorile, gestionează invitații și adună fiecare amintire, de la logodnă până în ziua nunții.",
        pricingTitle: "Prețuri pentru logodne",
        closing: "Din ziua în care ați spus da până în ziua cea mare, surprindeți totul cu memovo.",
      },
    },
  },
  {
    slug: "party",
    label: "Party",
    title: "Party Photo Sharing",
    description: "The easiest QR code photo sharing for parties, birthdays, anniversaries and reunions.",
    hero: `${U}/hero-party.png`,
    prices: TIERS,
    copy: {
      en: {
        heading: "The Easiest QR Code Photo Sharing for Parties & Birthdays",
        tagline: "Perfect For:",
        tabs: ["Birthdays", "Anniversaries", "Graduations", "Reunions"],
        intro:
          "Whatever you're celebrating, your guests are the ones capturing the best bits. With one QR code or private link, every photo, video and message lands in one gallery you can enjoy and download.",
        sub: "No app. No guest registration. Just scan and upload.",
        whyTitle: "Why hosts love it for every party",
        whyCopy:
          "The dance floor moments, the surprise entrance, the friends who never stop laughing. Your guests see your party from every angle in the room, and now you get to keep all of it in a single private gallery that's completely yours.",
        quote: "Set it up in 2 minutes, enjoy it forever!",
        band:
          "An all-in-one place to organise your party, invite your guests and collect every photo, video and message from the night.",
        pricingTitle: "Party Pricing",
        closing: "Every laugh, every dance, every moment, captured with memovo.",
      },
      hu: {
        heading: "A legegyszerűbb QR-kódos fotómegosztás bulikra és szülinapokra",
        tagline: "Tökéletes ehhez:",
        tabs: ["Szülinapok", "Évfordulók", "Ballagások", "Találkozók"],
        intro:
          "Bármit is ünnepeltek, a legjobb pillanatokat a vendégeitek örökítik meg. Egyetlen QR-kóddal vagy privát linkkel minden fotó, videó és üzenet egy galériába kerül, amit végignézhettek és letölthettek.",
        sub: "Nincs alkalmazás. Nincs vendégregisztráció. Csak beolvasás és feltöltés.",
        whyTitle: "Miért szeretik a szervezők minden bulira",
        whyCopy:
          "A táncparkett pillanatai, a meglepetés-belépő, a barátok, akik meg sem állnak a nevetéstől. A vendégeid a terem minden szögéből látják a bulidat, és most mindez megmarad egyetlen privát galériában, ami teljesen a tiéd.",
        quote: "2 perc a beállítás, örökre szóló élmény!",
        band:
          "Egyetlen hely, ahol megszervezed a bulit, meghívod a vendégeidet, és összegyűjtesz minden fotót, videót és üzenetet az estéről.",
        pricingTitle: "Buli árak",
        closing: "Minden nevetés, minden tánc, minden pillanat, megörökítve a Memovóval.",
      },
      ro: {
        heading: "Cea mai simplă partajare foto cu cod QR pentru petreceri și aniversări",
        tagline: "Perfect pentru:",
        tabs: ["Zile de naștere", "Aniversări", "Absolviri", "Reîntâlniri"],
        intro:
          "Orice ați sărbători, invitații sunt cei care surprind cele mai frumoase momente. Cu un singur cod QR sau link privat, fiecare fotografie, videoclip și mesaj ajunge într-o galerie de care vă bucurați și pe care o puteți descărca.",
        sub: "Fără aplicație. Fără înregistrare. Doar scanați și încărcați.",
        whyTitle: "De ce o adoră gazdele la fiecare petrecere",
        whyCopy:
          "Momentele de pe ringul de dans, intrarea-surpriză, prietenii care nu se opresc din râs. Invitații văd petrecerea din fiecare colț al sălii, iar acum păstrați totul într-o singură galerie privată, care este în întregime a voastră.",
        quote: "Configurare în 2 minute, bucurie pentru totdeauna!",
        band:
          "Un singur loc unde vă organizați petrecerea, vă invitați oaspeții și adunați fiecare fotografie, videoclip și mesaj din acea seară.",
        pricingTitle: "Prețuri pentru petreceri",
        closing: "Fiecare râset, fiecare dans, fiecare moment, surprinse cu memovo.",
      },
    },
  },
  {
    slug: "kids-parties",
    label: "Kids Parties",
    title: "Kids Parties",
    description: "Kids party photo collection and digital invitations for birthdays, christenings and school events.",
    hero: `${U}/hero-kids-parties.jpg`,
    prices: [
      { name: "CLASSIC", usd: 29 },
      { name: "SIGNATURE", usd: 49 },
      { name: "LUXE", usd: 79 },
    ],
    copy: {
      en: {
        heading: "Kids Party Photo Collection & Digital Invitation",
        tagline: "Loved & Used For:",
        tabs: ["Birthday Parties", "Christenings", "School Events", "Baby Showers"],
        intro:
          "Send the invite, collect the RSVPs, and gather every photo from the day, all from one simple link. Parents just scan and upload, no app or sign-up needed.",
        sub: "Perfect for busy parents who want every photo gathered in one calm place.",
        whyTitle: "Why parents love it",
        whyCopy:
          "Your child's face when the cake comes out. The friends mid-game. The moments you missed because you were busy hosting. Every parent at the party becomes a photographer, and everything lands in one private gallery you control.",
        quote: "Two minutes to set up, memories to keep forever!",
        band: "An all-in-one place for parents to send invitations, collect RSVPs and gather every photo from the day.",
        pricingTitle: "Kids Party Pricing",
        closing: "Every giggle, every candle, every messy face, captured with memovo.",
      },
      hu: {
        heading: "Gyerekzsúr fotógyűjtés és digitális meghívó",
        tagline: "Szeretik és használják:",
        tabs: ["Szülinapi zsúrok", "Keresztelők", "Iskolai események", "Babaváró"],
        intro:
          "Küldd ki a meghívót, gyűjtsd be a visszajelzéseket, és szedd össze a nap minden fotóját – mindezt egyetlen linkről. A szülők csak beolvasnak és feltöltenek, alkalmazás és regisztráció nélkül.",
        sub: "Tökéletes az elfoglalt szülőknek, akik egy nyugodt helyen szeretnék tudni az összes fotót.",
        whyTitle: "Miért szeretik a szülők",
        whyCopy:
          "A gyereked arca, amikor behozzák a tortát. A barátok játék közben. A pillanatok, amikről lemaradtál, mert a vendéglátással voltál elfoglalva. A zsúron minden szülő fotóssá válik, és minden egyetlen privát galériába kerül, amit te felügyelsz.",
        quote: "Két perc a beállítás, örökre szóló emlékek!",
        band: "Egyetlen hely a szülőknek, ahol meghívókat küldhetnek, visszajelzéseket gyűjthetnek és összeszedhetik a nap minden fotóját.",
        pricingTitle: "Gyerekzsúr árak",
        closing: "Minden kacagás, minden gyertya, minden maszatos arc, megörökítve a Memovóval.",
      },
      ro: {
        heading: "Colectarea fotografiilor și invitație digitală pentru petreceri de copii",
        tagline: "Îndrăgit și folosit pentru:",
        tabs: ["Petreceri aniversare", "Botezuri", "Evenimente școlare", "Petreceri pentru bebeluși"],
        intro:
          "Trimite invitația, adună confirmările și strânge fiecare fotografie din acea zi – totul dintr-un singur link. Părinții doar scanează și încarcă, fără aplicație și fără înregistrare.",
        sub: "Perfect pentru părinții ocupați care vor toate fotografiile adunate într-un singur loc liniștit.",
        whyTitle: "De ce o adoră părinții",
        whyCopy:
          "Chipul copilului când apare tortul. Prietenii în mijlocul jocului. Momentele pe care le-ați pierdut pentru că erați ocupați cu petrecerea. Fiecare părinte prezent devine fotograf, iar totul ajunge într-o singură galerie privată pe care o controlați.",
        quote: "Două minute de configurare, amintiri pentru totdeauna!",
        band: "Un singur loc pentru părinți, unde trimit invitații, adună confirmări și strâng fiecare fotografie din acea zi.",
        pricingTitle: "Prețuri pentru petreceri de copii",
        closing: "Fiecare chicot, fiecare lumânare, fiecare obraz mânjit, surprinse cu memovo.",
      },
    },
  },
  {
    slug: "business",
    label: "Business",
    title: "Memovo for Business",
    description: "Effortless photo sharing and attendee engagement for conferences, galas and product launches.",
    hero: `${U}/hero-business.png`,
    prices: BUSINESS_TIERS,
    copy: {
      en: {
        heading: "Capture All The Highlights Through Your Guests Eyes",
        tagline: "Built For:",
        tabs: ["Conferences", "Galas", "Product Launches", "Team Events"],
        intro:
          "Turn every attendee into a content creator. With one branded QR code, collect user-generated photos and videos from your whole event, ready to use for marketing, recaps and social.",
        sub: "Custom branding, content moderation and full commercial rights included.",
        whyTitle: "Why brands love it",
        whyCopy:
          "Your attendees are everywhere your event is happening. Memovo gives you hundreds of authentic, on-brand images from every corner of the room, moderated before they go live, and yours to keep and use.",
        quote: "One QR code. Every angle of your event.",
        band:
          "An all-in-one place for teams to collect, moderate and use authentic content captured by everyone at your event.",
        pricingTitle: "Business Pricing",
        closing: "Every highlight, every handshake, every headline moment, with memovo.",
      },
      hu: {
        heading: "Örökítse meg a fénypontokat a vendégei szemével",
        tagline: "Ehhez készült:",
        tabs: ["Konferenciák", "Gálák", "Termékbemutatók", "Csapatesemények"],
        intro:
          "Váljon minden résztvevő tartalomkészítővé. Egyetlen márkázott QR-kóddal összegyűjtöd a teljes esemény fotóit és videóit, készen a marketingre, az összefoglalókra és a közösségi médiára.",
        sub: "Egyedi arculat, tartalom-moderálás és teljes kereskedelmi felhasználási jog benne van.",
        whyTitle: "Miért szeretik a márkák",
        whyCopy:
          "A résztvevőitek mindenhol ott vannak, ahol az esemény zajlik. A Memovo több száz hiteles, márkához illő képet ad a terem minden sarkából, moderálva még a megjelenés előtt – és mindez a tiétek, szabadon felhasználhatóan.",
        quote: "Egy QR-kód. Az esemény minden szöge.",
        band:
          "Egyetlen hely a csapatoknak, ahol összegyűjthetik, moderálhatják és felhasználhatják a hiteles tartalmat, amit az esemény minden résztvevője készített.",
        pricingTitle: "Céges árak",
        closing: "Minden fénypont, minden kézfogás, minden főcímbe kívánkozó pillanat, a Memovóval.",
      },
      ro: {
        heading: "Surprindeți toate momentele importante prin ochii invitaților",
        tagline: "Construit pentru:",
        tabs: ["Conferințe", "Gale", "Lansări de produs", "Evenimente de echipă"],
        intro:
          "Transformă fiecare participant într-un creator de conținut. Cu un singur cod QR personalizat aduni fotografiile și videoclipurile de la întregul eveniment, gata de folosit pentru marketing, rezumate și social media.",
        sub: "Branding personalizat, moderarea conținutului și drepturi comerciale complete, incluse.",
        whyTitle: "De ce o adoră brandurile",
        whyCopy:
          "Participanții voștri sunt peste tot unde se întâmplă evenimentul. Memovo vă oferă sute de imagini autentice, potrivite brandului, din fiecare colț al sălii, moderate înainte de publicare și ale voastre, de păstrat și folosit.",
        quote: "Un singur cod QR. Fiecare unghi al evenimentului.",
        band:
          "Un singur loc pentru echipe, unde colectează, moderează și folosesc conținutul autentic surprins de toți cei prezenți la eveniment.",
        pricingTitle: "Prețuri pentru companii",
        closing: "Fiecare moment important, fiecare strângere de mână, fiecare titlu de presă, cu memovo.",
      },
    },
  },
  {
    slug: "memorials",
    label: "Memorials",
    title: "Memorial Photo Sharing & Guestbook",
    description: "A gentle, private digital photo album and guestbook for celebrations of life.",
    hero: `${U}/hero-memorials.jpg`,
    prices: TIERS,
    copy: {
      en: {
        heading: "Celebration Of Life Digital Photo Album and Guestbook",
        tagline: "Thoughtfully Made For:",
        tabs: ["Funerals", "Memorials", "Celebrations of Life", "Anniversaries"],
        intro:
          "A gentle, private way for family and friends to share their photos and memories of a loved one, gathered together in one album that lasts.",
        sub: "No app, no registration, and no pressure. Simply scan and share.",
        whyTitle: "A place for everyone's memories",
        whyCopy:
          "Everyone holds a different piece of a life well lived. Memovo brings those pieces together, the photographs kept in drawers, the stories, the moments held by one person, into a single private album your family can keep and revisit.",
        quote: "Gathered with care. Kept forever.",
        band:
          "A gentle, private place for family and friends to gather photographs, stories and messages in memory of someone loved.",
        pricingTitle: "Memorial Pricing",
        closing: "Every memory shared, every story kept, with memovo.",
      },
      hu: {
        heading: "Digitális fotóalbum és vendégkönyv a búcsúztatóra",
        tagline: "Gondos figyelemmel ehhez:",
        tabs: ["Temetések", "Megemlékezések", "Búcsúztatók", "Évfordulók"],
        intro:
          "Csendes, privát mód arra, hogy a család és a barátok megosszák fotóikat és emlékeiket egy szeretett emberről, egyetlen albumban, amely megmarad.",
        sub: "Nincs alkalmazás, nincs regisztráció és nincs nyomás. Csak beolvasás és megosztás.",
        whyTitle: "Egy hely mindenki emlékének",
        whyCopy:
          "Egy szépen leélt életnek mindenki más darabját őrzi. A Memovo összehozza ezeket a darabokat: a fiókban őrzött fényképeket, a történeteket, az egyetlen ember által megőrzött pillanatokat, egyetlen privát albumba, amelyet a család megőrizhet és újra elővehet.",
        quote: "Gondossággal összegyűjtve. Örökre megőrizve.",
        band:
          "Csendes, privát hely a családnak és a barátoknak, ahol fényképeket, történeteket és üzeneteket gyűjthetnek egy szeretett ember emlékére.",
        pricingTitle: "Megemlékezési árak",
        closing: "Minden megosztott emlék, minden megőrzött történet, a Memovóval.",
      },
      ro: {
        heading: "Album foto digital și carte de oaspeți pentru comemorări",
        tagline: "Creat cu grijă pentru:",
        tabs: ["Înmormântări", "Comemorări", "Sărbătorirea unei vieți", "Aniversări"],
        intro:
          "Un mod blând și privat prin care familia și prietenii își împărtășesc fotografiile și amintirile despre o persoană dragă, adunate într-un singur album care rămâne.",
        sub: "Fără aplicație, fără înregistrare și fără presiune. Doar scanați și împărtășiți.",
        whyTitle: "Un loc pentru amintirile tuturor",
        whyCopy:
          "Fiecare păstrează o altă parte dintr-o viață trăită frumos. Memovo adună aceste părți – fotografiile ținute în sertare, poveștile, momentele păstrate de o singură persoană – într-un singur album privat pe care familia îl poate păstra și revedea.",
        quote: "Adunate cu grijă. Păstrate pentru totdeauna.",
        band:
          "Un loc blând și privat unde familia și prietenii adună fotografii, povești și mesaje în memoria cuiva drag.",
        pricingTitle: "Prețuri pentru comemorări",
        closing: "Fiecare amintire împărtășită, fiecare poveste păstrată, cu memovo.",
      },
    },
  },
  {
    slug: "seasonal-holidays",
    label: "Seasonal Holidays",
    title: "Effortless Holiday Photo Sharing with QR Codes",
    description: "Seasonal holiday photo collection for Christmas, New Year's Eve, Thanksgiving and Easter.",
    hero: `${U}/hero-seasonal-holidays.jpg`,
    prices: TIERS,
    copy: {
      en: {
        heading: "Seasonal Holiday Photo Collection",
        tagline: "Perfect For:",
        tabs: ["Christmas", "New Year's Eve", "Thanksgiving", "Easter"],
        intro:
          "The whole family together, once a year. Collect every photo everyone takes across the holidays into one shared gallery that stays organised for you.",
        sub: "One QR code on the table is all it takes.",
        whyTitle: "Why families love it",
        whyCopy:
          "The cousins who meet once a year. The grandparents with the grandkids. Everyone has a camera in their pocket, and Memovo brings all of it together: one link, one gallery, every memory from the season.",
        quote: "One gallery. Every generation.",
        band: "An all-in-one place for families to collect every photo from the season into one shared gallery.",
        pricingTitle: "Seasonal Holiday Pricing",
        closing: "Every gathering, every tradition, every year, captured with memovo.",
      },
      hu: {
        heading: "Ünnepi fotógyűjtés",
        tagline: "Tökéletes ehhez:",
        tabs: ["Karácsony", "Szilveszter", "Hálaadás", "Húsvét"],
        intro:
          "Az egész család együtt, évente egyszer. Gyűjtsd össze az ünnepek alatt készült összes fotót egyetlen közös galériába, ami magától rendezett marad.",
        sub: "Egyetlen QR-kód az asztalon, és kész.",
        whyTitle: "Miért szeretik a családok",
        whyCopy:
          "Az unokatestvérek, akik évente egyszer találkoznak. A nagyszülők az unokákkal. Mindenki zsebében ott a kamera, és a Memovo mindezt összehozza: egy link, egy galéria, az ünnepek minden emléke.",
        quote: "Egy galéria. Minden generáció.",
        band: "Egyetlen hely a családoknak, ahol az ünnepek minden fotóját egy közös galériába gyűjthetik.",
        pricingTitle: "Ünnepi árak",
        closing: "Minden összejövetel, minden hagyomány, minden év, megörökítve a Memovóval.",
      },
      ro: {
        heading: "Colectarea fotografiilor de sărbători",
        tagline: "Perfect pentru:",
        tabs: ["Crăciun", "Revelion", "Ziua Recunoștinței", "Paște"],
        intro:
          "Toată familia împreună, o dată pe an. Adună fiecare fotografie făcută de-a lungul sărbătorilor într-o singură galerie comună, care rămâne organizată singură.",
        sub: "Un singur cod QR pe masă și atât.",
        whyTitle: "De ce o adoră familiile",
        whyCopy:
          "Verii care se văd o dată pe an. Bunicii cu nepoții. Toată lumea are un aparat foto în buzunar, iar Memovo adună totul: un link, o galerie, fiecare amintire din acest sezon.",
        quote: "O galerie. Fiecare generație.",
        band: "Un singur loc pentru familii, unde adună fiecare fotografie din sezon într-o galerie comună.",
        pricingTitle: "Prețuri pentru sărbători",
        closing: "Fiecare reuniune, fiecare tradiție, fiecare an, surprinse cu memovo.",
      },
    },
  },
  {
    slug: "company-christmas-parties",
    label: "Company Christmas Parties",
    title: "Company Christmas Parties",
    description: "Company Christmas party photo sharing with a branded QR code and content moderation.",
    hero: `${U}/hero-company-christmas.jpg`,
    prices: BUSINESS_TIERS,
    copy: {
      en: {
        heading: "Company Christmas Party Photo Sharing with QR Code",
        tagline: "Built For:",
        tabs: ["Christmas Parties", "End of Year Events", "Awards Nights", "NYE Parties"],
        intro:
          "Your end-of-year party, captured by everyone who was there. One branded QR code on every table collects photos and videos from the whole team into a single moderated gallery.",
        sub: "Content moderation keeps everything workplace-appropriate.",
        whyTitle: "Why workplaces love it",
        whyCopy:
          "The team photo nobody organised. The dance floor. The awards moment. Your people capture the whole night from where they stand, and moderation means you approve everything before it appears.",
        quote: "One code. The whole team's night.",
        band: "An all-in-one place for workplaces to collect, moderate and share every photo from the night.",
        pricingTitle: "Company Party Pricing",
        closing: "Every toast, every award, every dance, captured with memovo.",
      },
      hu: {
        heading: "Céges karácsonyi buli fotómegosztás QR-kóddal",
        tagline: "Ehhez készült:",
        tabs: ["Karácsonyi bulik", "Évzáró események", "Díjátadók", "Szilveszteri bulik"],
        intro:
          "Az évzáró bulitok, megörökítve mindenkitől, aki ott volt. Egyetlen márkázott QR-kód minden asztalon összegyűjti az egész csapat fotóit és videóit egy moderált galériába.",
        sub: "A tartalom-moderálás gondoskodik róla, hogy minden munkahelyre illő maradjon.",
        whyTitle: "Miért szeretik a munkahelyek",
        whyCopy:
          "A csapatfotó, amit senki nem szervezett. A táncparkett. A díjátadás pillanata. A kollégáid onnan örökítik meg az egész estét, ahol állnak, a moderálás pedig azt jelenti, hogy te hagysz jóvá mindent, mielőtt megjelenne.",
        quote: "Egy kód. Az egész csapat estéje.",
        band: "Egyetlen hely a munkahelyeknek, ahol összegyűjthetik, moderálhatják és megoszthatják az este minden fotóját.",
        pricingTitle: "Céges buli árak",
        closing: "Minden pohárköszöntő, minden díj, minden tánc, megörökítve a Memovóval.",
      },
      ro: {
        heading: "Partajare foto cu cod QR pentru petrecerea de Crăciun a companiei",
        tagline: "Construit pentru:",
        tabs: ["Petreceri de Crăciun", "Evenimente de final de an", "Seri de premiere", "Petreceri de Revelion"],
        intro:
          "Petrecerea de final de an, surprinsă de toți cei care au fost acolo. Un cod QR personalizat pe fiecare masă adună fotografiile și videoclipurile întregii echipe într-o singură galerie moderată.",
        sub: "Moderarea conținutului păstrează totul potrivit pentru mediul de lucru.",
        whyTitle: "De ce o adoră companiile",
        whyCopy:
          "Fotografia de echipă pe care nu a organizat-o nimeni. Ringul de dans. Momentul premierii. Oamenii voștri surprind toată seara din locul în care se află, iar moderarea înseamnă că aprobați totul înainte să apară.",
        quote: "Un cod. Seara întregii echipe.",
        band: "Un singur loc pentru companii, unde adună, moderează și partajează fiecare fotografie din acea seară.",
        pricingTitle: "Prețuri pentru petreceri de companie",
        closing: "Fiecare toast, fiecare premiu, fiecare dans, surprinse cu memovo.",
      },
    },
  },
];

export function getEvent(slug: string): EventPage | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
