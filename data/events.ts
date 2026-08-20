import type { Lang } from "./i18n";

const U = "/images";

/** The prose that changes per language. */
export type EventCopy = {
  /** Pink eyebrow above the hero headline. */
  badge: string;
  /** Headline, one entry per rendered line. */
  heroLines: string[];
  heroSub: string;
  heroCta: string;
  tabs: string[];
  intro: string;
  whyTitle: string;
  whyCopy: string;
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
  copy: Record<Lang, EventCopy>;
};

export const EVENTS: EventPage[] = [
  {
    slug: "engagements",
    label: "Engagements",
    title: "Effortless Engagement Photo Sharing with QR Codes",
    description: "Guest photo collection and digital invitations for proposals, bridal showers and engagement parties.",
    hero: `${U}/hero-engagements.jpg`,
    copy: {
      en: {
        badge: "ENGAGEMENT PHOTO SHARING",
        heroLines: ["Celebrate your love.","Collect every moment","together."],
        heroSub: "Capture every proposal, toast and happy tear in one beautiful engagement gallery.",
        heroCta: "Create Your Engagement Gallery",
        tabs: ["Proposals", "Bridal Showers", "Engagement Parties"],
        intro:
          "From the moment you said yes, the celebrations begin! From the engagement party, bridal shower, bucks/bachelorette and of course, your wedding day, Memovo brings every moment together in one beautifully organised place.",
        whyTitle: "Why couples love it for their engagement era",
        whyCopy:
          "Your engagement is one of the best-loved times of your life, and your family and friends capture it from every angle. Your pre-wedding celebrations arrive through your guests' eyes, and you'll love receiving photos, videos and heartwarming guestbook messages from everyone you're celebrating with.",
        pricingTitle: "Engagements Pricing",
        closing: "From the day you said yes to the big day, capture it all with memovo.",
      },
      hu: {
        badge: "ELJEGYZÉSI FOTÓMEGOSZTÁS",
        heroLines: ["Ünnepeljétek a szerelmeteket.","Gyűjtsetek össze minden pillanatot,","együtt."],
        heroSub: "A lánykéréstől a pohárköszöntőn át a boldog könnyekig, minden egyetlen szép eljegyzési galériába kerül.",
        heroCta: "Elkészítem az eljegyzési galériám",
        tabs: ["Lánykérés", "Leánybúcsú", "Eljegyzési buli"],
        intro:
          "Attól a pillanattól, hogy igent mondtatok, kezdődik az ünneplés! Az eljegyzési bulitól a leánybúcsún át a legénybúcsúig, és persze az esküvő napjáig, a Memovo minden pillanatot egyetlen, gyönyörűen rendezett helyre gyűjt.",
        whyTitle: "Miért imádják a párok az eljegyzés idejére",
        whyCopy:
          "Az eljegyzés az élet egyik legkedvesebb időszaka, amelyet a család és a barátok minden szögből megörökítenek. Az esküvő előtti ünnepek a vendégeitek szemével érkeznek meg hozzátok, és imádni fogjátok a fotókat, videókat és szívmelengető üzeneteket mindenkitől, akivel együtt ünnepeltek.",
        pricingTitle: "Eljegyzési árak",
        closing: "Attól a naptól, hogy igent mondtatok, a nagy napig – örökítsétek meg mindet a Memovóval.",
      },
      ro: {
        badge: "PARTAJARE FOTO DE LOGODNĂ",
        heroLines: ["Sărbătoriți-vă iubirea.","Adunați fiecare moment,","împreună."],
        heroSub: "De la cerere la toast și lacrimile de bucurie, totul într-o singură galerie frumoasă de logodnă.",
        heroCta: "Creează galeria de logodnă",
        tabs: ["Cereri în căsătorie", "Petreceri prenupțiale", "Petreceri de logodnă"],
        intro:
          "Din clipa în care ați spus da, încep sărbătorile! De la petrecerea de logodnă și petrecerea prenupțială până la burlăcii și, desigur, ziua nunții, Memovo adună fiecare moment într-un singur loc frumos organizat.",
        whyTitle: "De ce o îndrăgesc cuplurile în perioada logodnei",
        whyCopy:
          "Logodna este una dintre cele mai frumoase perioade din viață, iar familia și prietenii o surprind din toate unghiurile. Sărbătorile de dinaintea nunții ajung la voi prin ochii invitaților, iar fotografiile, videoclipurile și mesajele calde din cartea de oaspeți vă vor încânta.",
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
    copy: {
      en: {
        badge: "PARTY PHOTO SHARING",
        heroLines: ["Every laugh.","Every dance.","Every memory."],
        heroSub: "Let guests upload their photos instantly and relive the party from every angle.",
        heroCta: "Create Your Party Gallery",
        tabs: ["Birthdays", "Anniversaries", "Graduations", "Reunions"],
        intro:
          "Whatever you're celebrating, your guests are the ones capturing the best bits. With one QR code or private link, every photo, video and message lands in one gallery you can enjoy and download.",
        whyTitle: "Why hosts love it for every party",
        whyCopy:
          "The dance floor moments, the surprise entrance, the friends who never stop laughing. Your guests see your party from every angle in the room, and now you get to keep all of it in a single private gallery that's completely yours.",
        pricingTitle: "Party Pricing",
        closing: "Every laugh, every dance, every moment, captured with memovo.",
      },
      hu: {
        badge: "BULI FOTÓMEGOSZTÁS",
        heroLines: ["Minden nevetés.","Minden tánc.","Minden emlék."],
        heroSub: "A vendégeid azonnal feltöltik a fotóikat, te pedig minden szögből újraélheted a bulit.",
        heroCta: "Elkészítem a buli galériám",
        tabs: ["Szülinapok", "Évfordulók", "Ballagások", "Találkozók"],
        intro:
          "Bármit is ünnepeltek, a legjobb pillanatokat a vendégeitek örökítik meg. Egyetlen QR-kóddal vagy privát linkkel minden fotó, videó és üzenet egy galériába kerül, amit végignézhettek és letölthettek.",
        whyTitle: "Miért szeretik a szervezők minden bulira",
        whyCopy:
          "A táncparkett pillanatai, a meglepetés-belépő, a barátok, akik meg sem állnak a nevetéstől. A vendégeid a terem minden szögéből látják a bulidat, és most mindez megmarad egyetlen privát galériában, ami teljesen a tiéd.",
        pricingTitle: "Buli árak",
        closing: "Minden nevetés, minden tánc, minden pillanat, megörökítve a Memovóval.",
      },
      ro: {
        badge: "PARTAJARE FOTO LA PETRECERI",
        heroLines: ["Fiecare râset.","Fiecare dans.","Fiecare amintire."],
        heroSub: "Invitații încarcă fotografiile pe loc, iar tu retrăiești petrecerea din fiecare unghi.",
        heroCta: "Creează galeria petrecerii",
        tabs: ["Zile de naștere", "Aniversări", "Absolviri", "Reîntâlniri"],
        intro:
          "Orice ați sărbători, invitații sunt cei care surprind cele mai frumoase momente. Cu un singur cod QR sau link privat, fiecare fotografie, videoclip și mesaj ajunge într-o galerie de care vă bucurați și pe care o puteți descărca.",
        whyTitle: "De ce o adoră gazdele la fiecare petrecere",
        whyCopy:
          "Momentele de pe ringul de dans, intrarea-surpriză, prietenii care nu se opresc din râs. Invitații văd petrecerea din fiecare colț al sălii, iar acum păstrați totul într-o singură galerie privată, care este în întregime a voastră.",
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
    copy: {
      en: {
        badge: "KIDS PARTY PHOTO SHARING",
        heroLines: ["Little smiles.","Big fun.","Lasting memories."],
        heroSub: "Capture every laugh, game and birthday surprise in one private gallery.",
        heroCta: "Create Your Kids Party Gallery",
        tabs: ["Birthday Parties", "Christenings", "School Events", "Baby Showers"],
        intro:
          "Send the invite, collect the RSVPs, and gather every photo from the day, all from one simple link. Parents just scan and upload, no app or sign-up needed.",
        whyTitle: "Why parents love it",
        whyCopy:
          "Your child's face when the cake comes out. The friends mid-game. The moments you missed because you were busy hosting. Every parent at the party becomes a photographer, and everything lands in one private gallery you control.",
        pricingTitle: "Kids Party Pricing",
        closing: "Every giggle, every candle, every messy face, captured with memovo.",
      },
      hu: {
        badge: "GYEREKZSÚR FOTÓMEGOSZTÁS",
        heroLines: ["Apró mosolyok.","Nagy móka.","Maradandó emlékek."],
        heroSub: "Minden nevetés, játék és szülinapi meglepetés egyetlen privát galériába kerül.",
        heroCta: "Elkészítem a zsúr galériám",
        tabs: ["Szülinapi zsúrok", "Keresztelők", "Iskolai események", "Babaváró"],
        intro:
          "Küldd ki a meghívót, gyűjtsd be a visszajelzéseket, és szedd össze a nap minden fotóját – mindezt egyetlen linkről. A szülők csak beolvasnak és feltöltenek, alkalmazás és regisztráció nélkül.",
        whyTitle: "Miért szeretik a szülők",
        whyCopy:
          "A gyereked arca, amikor behozzák a tortát. A barátok játék közben. A pillanatok, amikről lemaradtál, mert a vendéglátással voltál elfoglalva. A zsúron minden szülő fotóssá válik, és minden egyetlen privát galériába kerül, amit te felügyelsz.",
        pricingTitle: "Gyerekzsúr árak",
        closing: "Minden kacagás, minden gyertya, minden maszatos arc, megörökítve a Memovóval.",
      },
      ro: {
        badge: "PARTAJARE FOTO PETRECERI COPII",
        heroLines: ["Zâmbete mici.","Distracție mare.","Amintiri care rămân."],
        heroSub: "Fiecare râset, joc și surpriză de ziua de naștere, într-o singură galerie privată.",
        heroCta: "Creează galeria petrecerii",
        tabs: ["Petreceri aniversare", "Botezuri", "Evenimente școlare", "Petreceri pentru bebeluși"],
        intro:
          "Trimite invitația, adună confirmările și strânge fiecare fotografie din acea zi – totul dintr-un singur link. Părinții doar scanează și încarcă, fără aplicație și fără înregistrare.",
        whyTitle: "De ce o adoră părinții",
        whyCopy:
          "Chipul copilului când apare tortul. Prietenii în mijlocul jocului. Momentele pe care le-ați pierdut pentru că erați ocupați cu petrecerea. Fiecare părinte prezent devine fotograf, iar totul ajunge într-o singură galerie privată pe care o controlați.",
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
    copy: {
      en: {
        badge: "BUSINESS EVENT PHOTO SHARING",
        heroLines: ["Capture your event.","Share your success."],
        heroSub: "Collect photos from conferences, seminars and corporate events in one secure place.",
        heroCta: "Create Your Business Gallery",
        tabs: ["Conferences", "Galas", "Product Launches", "Team Events"],
        intro:
          "Turn every attendee into a content creator. With one branded QR code, collect user-generated photos and videos from your whole event, ready to use for marketing, recaps and social.",
        whyTitle: "Why brands love it",
        whyCopy:
          "Your attendees are everywhere your event is happening. Memovo gives you hundreds of authentic, on-brand images from every corner of the room, moderated before they go live, and yours to keep and use.",
        pricingTitle: "Business Pricing",
        closing: "Every highlight, every handshake, every headline moment, with memovo.",
      },
      hu: {
        badge: "CÉGES ESEMÉNY FOTÓMEGOSZTÁS",
        heroLines: ["Örökítsd meg az eseményt.","Oszd meg a sikert."],
        heroSub: "Konferenciák, szemináriumok és céges rendezvények fotói egyetlen biztonságos helyen.",
        heroCta: "Elkészítem a céges galériám",
        tabs: ["Konferenciák", "Gálák", "Termékbemutatók", "Csapatesemények"],
        intro:
          "Váljon minden résztvevő tartalomkészítővé. Egyetlen márkázott QR-kóddal összegyűjtöd a teljes esemény fotóit és videóit, készen a marketingre, az összefoglalókra és a közösségi médiára.",
        whyTitle: "Miért szeretik a márkák",
        whyCopy:
          "A résztvevőitek mindenhol ott vannak, ahol az esemény zajlik. A Memovo több száz hiteles, márkához illő képet ad a terem minden sarkából, moderálva még a megjelenés előtt – és mindez a tiétek, szabadon felhasználhatóan.",
        pricingTitle: "Céges árak",
        closing: "Minden fénypont, minden kézfogás, minden főcímbe kívánkozó pillanat, a Memovóval.",
      },
      ro: {
        badge: "PARTAJARE FOTO EVENIMENTE DE COMPANIE",
        heroLines: ["Surprinde evenimentul.","Împărtășește succesul."],
        heroSub: "Fotografiile de la conferințe, seminare și evenimente de companie, într-un singur loc sigur.",
        heroCta: "Creează galeria companiei",
        tabs: ["Conferințe", "Gale", "Lansări de produs", "Evenimente de echipă"],
        intro:
          "Transformă fiecare participant într-un creator de conținut. Cu un singur cod QR personalizat aduni fotografiile și videoclipurile de la întregul eveniment, gata de folosit pentru marketing, rezumate și social media.",
        whyTitle: "De ce o adoră brandurile",
        whyCopy:
          "Participanții voștri sunt peste tot unde se întâmplă evenimentul. Memovo vă oferă sute de imagini autentice, potrivite brandului, din fiecare colț al sălii, moderate înainte de publicare și ale voastre, de păstrat și folosit.",
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
    copy: {
      en: {
        badge: "MEMORIAL PHOTO SHARING",
        heroLines: ["Celebrate a life.","Share memories","that live on."],
        heroSub: "Create a private space where family and friends can share photos and memories together.",
        heroCta: "Create Memorial Gallery",
        tabs: ["Funerals", "Memorials", "Celebrations of Life", "Anniversaries"],
        intro:
          "A gentle, private way for family and friends to share their photos and memories of a loved one, gathered together in one album that lasts.",
        whyTitle: "A place for everyone's memories",
        whyCopy:
          "Everyone holds a different piece of a life well lived. Memovo brings those pieces together, the photographs kept in drawers, the stories, the moments held by one person, into a single private album your family can keep and revisit.",
        pricingTitle: "Memorial Pricing",
        closing: "Every memory shared, every story kept, with memovo.",
      },
      hu: {
        badge: "MEGEMLÉKEZÉSI FOTÓMEGOSZTÁS",
        heroLines: ["Ünnepeljetek egy életet.","Osszatok meg emlékeket,","amik tovább élnek."],
        heroSub: "Csendes, privát hely, ahol a család és a barátok együtt oszthatják meg a fotóikat és emlékeiket.",
        heroCta: "Megemlékezési galéria létrehozása",
        tabs: ["Temetések", "Megemlékezések", "Búcsúztatók", "Évfordulók"],
        intro:
          "Csendes, privát mód arra, hogy a család és a barátok megosszák fotóikat és emlékeiket egy szeretett emberről, egyetlen albumban, amely megmarad.",
        whyTitle: "Egy hely mindenki emlékének",
        whyCopy:
          "Egy szépen leélt életnek mindenki más darabját őrzi. A Memovo összehozza ezeket a darabokat: a fiókban őrzött fényképeket, a történeteket, az egyetlen ember által megőrzött pillanatokat, egyetlen privát albumba, amelyet a család megőrizhet és újra elővehet.",
        pricingTitle: "Megemlékezési árak",
        closing: "Minden megosztott emlék, minden megőrzött történet, a Memovóval.",
      },
      ro: {
        badge: "PARTAJARE FOTO PENTRU COMEMORĂRI",
        heroLines: ["Sărbătoriți o viață.","Împărtășiți amintiri","care rămân."],
        heroSub: "Un spațiu privat unde familia și prietenii pot împărtăși împreună fotografii și amintiri.",
        heroCta: "Creează galeria de comemorare",
        tabs: ["Înmormântări", "Comemorări", "Sărbătorirea unei vieți", "Aniversări"],
        intro:
          "Un mod blând și privat prin care familia și prietenii își împărtășesc fotografiile și amintirile despre o persoană dragă, adunate într-un singur album care rămâne.",
        whyTitle: "Un loc pentru amintirile tuturor",
        whyCopy:
          "Fiecare păstrează o altă parte dintr-o viață trăită frumos. Memovo adună aceste părți – fotografiile ținute în sertare, poveștile, momentele păstrate de o singură persoană – într-un singur album privat pe care familia îl poate păstra și revedea.",
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
    copy: {
      en: {
        badge: "HOLIDAY PHOTO SHARING",
        heroLines: ["Celebrate every season.","Share memories","that last forever."],
        heroSub: "Collect holiday photos from family and friends in one beautiful gallery.",
        heroCta: "Create Holiday Gallery",
        tabs: ["Christmas", "New Year's Eve", "Thanksgiving", "Easter"],
        intro:
          "The whole family together, once a year. Collect every photo everyone takes across the holidays into one shared gallery that stays organised for you.",
        whyTitle: "Why families love it",
        whyCopy:
          "The cousins who meet once a year. The grandparents with the grandkids. Everyone has a camera in their pocket, and Memovo brings all of it together: one link, one gallery, every memory from the season.",
        pricingTitle: "Seasonal Holiday Pricing",
        closing: "Every gathering, every tradition, every year, captured with memovo.",
      },
      hu: {
        badge: "ÜNNEPI FOTÓMEGOSZTÁS",
        heroLines: ["Ünnepeljetek minden évszakot.","Osszatok meg emlékeket,","amik örökre megmaradnak."],
        heroSub: "A család és a barátok ünnepi fotói egyetlen szép galériában.",
        heroCta: "Ünnepi galéria létrehozása",
        tabs: ["Karácsony", "Szilveszter", "Hálaadás", "Húsvét"],
        intro:
          "Az egész család együtt, évente egyszer. Gyűjtsd össze az ünnepek alatt készült összes fotót egyetlen közös galériába, ami magától rendezett marad.",
        whyTitle: "Miért szeretik a családok",
        whyCopy:
          "Az unokatestvérek, akik évente egyszer találkoznak. A nagyszülők az unokákkal. Mindenki zsebében ott a kamera, és a Memovo mindezt összehozza: egy link, egy galéria, az ünnepek minden emléke.",
        pricingTitle: "Ünnepi árak",
        closing: "Minden összejövetel, minden hagyomány, minden év, megörökítve a Memovóval.",
      },
      ro: {
        badge: "PARTAJARE FOTO DE SĂRBĂTORI",
        heroLines: ["Sărbătoriți fiecare sezon.","Împărtășiți amintiri","care rămân pentru totdeauna."],
        heroSub: "Fotografiile de sărbători ale familiei și prietenilor, într-o singură galerie frumoasă.",
        heroCta: "Creează galeria de sărbători",
        tabs: ["Crăciun", "Revelion", "Ziua Recunoștinței", "Paște"],
        intro:
          "Toată familia împreună, o dată pe an. Adună fiecare fotografie făcută de-a lungul sărbătorilor într-o singură galerie comună, care rămâne organizată singură.",
        whyTitle: "De ce o adoră familiile",
        whyCopy:
          "Verii care se văd o dată pe an. Bunicii cu nepoții. Toată lumea are un aparat foto în buzunar, iar Memovo adună totul: un link, o galerie, fiecare amintire din acest sezon.",
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
    copy: {
      en: {
        badge: "COMPANY CHRISTMAS PARTY PHOTOS",
        heroLines: ["Celebrate together.","Capture the moments.","Share the memories."],
        heroSub: "Collect photos from your company Christmas party and keep every festive moment in one place.",
        heroCta: "Create Christmas Party Gallery",
        tabs: ["Christmas Parties", "End of Year Events", "Awards Nights", "NYE Parties"],
        intro:
          "Your end-of-year party, captured by everyone who was there. One branded QR code on every table collects photos and videos from the whole team into a single moderated gallery.",
        whyTitle: "Why workplaces love it",
        whyCopy:
          "The team photo nobody organised. The dance floor. The awards moment. Your people capture the whole night from where they stand, and moderation means you approve everything before it appears.",
        pricingTitle: "Company Party Pricing",
        closing: "Every toast, every award, every dance, captured with memovo.",
      },
      hu: {
        badge: "CÉGES KARÁCSONYI FOTÓK",
        heroLines: ["Ünnepeljetek együtt.","Örökítsétek meg a pillanatokat.","Osszátok meg az emlékeket."],
        heroSub: "A céges karácsonyi buli fotói egy helyen, hogy minden ünnepi pillanat megmaradjon.",
        heroCta: "Karácsonyi galéria létrehozása",
        tabs: ["Karácsonyi bulik", "Évzáró események", "Díjátadók", "Szilveszteri bulik"],
        intro:
          "Az évzáró bulitok, megörökítve mindenkitől, aki ott volt. Egyetlen márkázott QR-kód minden asztalon összegyűjti az egész csapat fotóit és videóit egy moderált galériába.",
        whyTitle: "Miért szeretik a munkahelyek",
        whyCopy:
          "A csapatfotó, amit senki nem szervezett. A táncparkett. A díjátadás pillanata. A kollégáid onnan örökítik meg az egész estét, ahol állnak, a moderálás pedig azt jelenti, hogy te hagysz jóvá mindent, mielőtt megjelenne.",
        pricingTitle: "Céges buli árak",
        closing: "Minden pohárköszöntő, minden díj, minden tánc, megörökítve a Memovóval.",
      },
      ro: {
        badge: "FOTOGRAFII DE LA PETRECEREA DE CRĂCIUN",
        heroLines: ["Sărbătoriți împreună.","Surprindeți momentele.","Împărtășiți amintirile."],
        heroSub: "Fotografiile de la petrecerea de Crăciun a companiei, ca fiecare moment festiv să rămână într-un loc.",
        heroCta: "Creează galeria de Crăciun",
        tabs: ["Petreceri de Crăciun", "Evenimente de final de an", "Seri de premiere", "Petreceri de Revelion"],
        intro:
          "Petrecerea de final de an, surprinsă de toți cei care au fost acolo. Un cod QR personalizat pe fiecare masă adună fotografiile și videoclipurile întregii echipe într-o singură galerie moderată.",
        whyTitle: "De ce o adoră companiile",
        whyCopy:
          "Fotografia de echipă pe care nu a organizat-o nimeni. Ringul de dans. Momentul premierii. Oamenii voștri surprind toată seara din locul în care se află, iar moderarea înseamnă că aprobați totul înainte să apară.",
        pricingTitle: "Prețuri pentru petreceri de companie",
        closing: "Fiecare toast, fiecare premiu, fiecare dans, surprinse cu memovo.",
      },
    },
  },
];

export function getEvent(slug: string): EventPage | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
