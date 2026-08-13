# Vendégalbum – QR-kódos fotómegosztó platform

## Projekt áttekintés

Egy SaaS-szerű webalkalmazás, amely lehetővé teszi eseményszervezők (kezdésnek: esküvők)
számára, hogy létrehozzanak egy QR-kódos galériát, ahová a vendégek fotókat tölthetnek fel
mobilról. A kliens (esemény tulajdonosa) egy admin felületen keresztül megnézheti,
moderálhatja és letöltheti a beérkezett képeket.

**Stack:**
- Frontend: React (már létezik, külön repo/mappa)
- Backend: NestJS (most épül)
- Adatbázis: PostgreSQL
- Fájltárolás: helyi lemez a backend mellett, `StorageService` mögé rejtve
- ORM: Prisma (preferált) vagy TypeORM

---

## 1. Architektúra

```
React frontend  <-->  NestJS backend API  <-->  PostgreSQL (metaadatok)
                              |
                              v
                    uploads/ könyvtár (kép fájlok)
```

A képfájlok a backend melletti `uploads/` könyvtárba kerülnek, az adatbázis pedig csak az
elérési utat és a metaadatokat tárolja. Minden fájlművelet a `StorageService`-en megy át,
így a tárolás később kicserélhető object storage-ra anélkül, hogy a photos modulhoz
hozzá kellene nyúlni.

---

## 2. Adatbázis séma (Prisma modellek vázlata)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  events    Event[]
}

model Event {
  id          String   @id @default(uuid())
  slug        String   @unique
  name        String
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  isPublic    Boolean  @default(true)
  requiresApproval Boolean @default(false)
  expiresAt   DateTime?
  createdAt   DateTime @default(now())
  photos      Photo[]
}

model Photo {
  id           String   @id @default(uuid())
  eventId      String
  event        Event    @relation(fields: [eventId], references: [id])
  uploaderName String?
  fileUrl      String
  thumbnailUrl String?
  status       PhotoStatus @default(APPROVED)
  uploadedAt   DateTime @default(now())
}

enum PhotoStatus {
  PENDING
  APPROVED
  REJECTED
}

model Lead {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String
  status    LeadStatus @default(NEW)
  createdAt DateTime @default(now())
}

enum LeadStatus {
  NEW
  CONTACTED
  CONVERTED
  CLOSED
}
```

---

## 3. API végpontok

### Auth
- `POST /auth/register` – regisztráció
- `POST /auth/login` – bejelentkezés (JWT token visszaadása)

### Events
- `POST /events` – új esemény létrehozása (auth kötelező), slug automatikus generálása
- `GET /events/:slug` – esemény publikus adatai (galéria oldalhoz)
- `GET /events/mine` – bejelentkezett user saját eseményei
- `PATCH /events/:id` – esemény beállítások módosítása (pl. requiresApproval)
- `DELETE /events/:id` – esemény törlése

### Photos
- `POST /events/:slug/photos` – kép feltöltés (multipart/form-data, publikus végpont,
  nem kell auth, de rate limitelni kell)
- `GET /events/:slug/photos` – galéria képei (csak APPROVED, ha requiresApproval=true)
- `GET /events/:id/photos/all` – összes kép admin nézethez (auth kötelező, owner check)
- `PATCH /photos/:id/status` – kép jóváhagyása/elutasítása (auth kötelező)
- `DELETE /photos/:id` – kép törlése (auth kötelező + a fájlt is törölni kell a lemezről)

### Leads (kontakt form automatizálás)
- `POST /leads` – kontakt form beküldése (publikus, + automatikus visszaigazoló email)
- `GET /leads` – lead lista admin nézethez (auth kötelező)
- `PATCH /leads/:id/status` – lead státusz frissítése

---

## 4. Fájltárolás

- A NestJS-ben egy `StorageModule` / `StorageService` végzi az összes fájlműveletet
  (mentés, törlés, publikus URL összeállítása). A photos modul csak ezt hívja, a
  könyvtárszerkezetről semmit nem tud.
- A backend fogadja a multipart uploadot, és a fájlt az `UPLOAD_DIR` alá írja,
  eseményenként külön mappába.
- Kép feltöltéskor generálj egy thumbnailt is (`sharp` csomaggal), és azt is mentsd el
  külön kulcs alatt.
- A `uploads/` könyvtárat a Nest statikusan szolgálja ki az `/uploads` útvonalon, így a
  galéria közvetlenül hivatkozhat a fájlokra.
- A `Photo` sorok a publikus URL mellett a tárolási kulcsot is eltárolják, különben
  törléskor a fájl a lemezen maradna.

### Szükséges environment változók (.env, SOHA ne kerüljön git-be)

```
DATABASE_URL=
JWT_SECRET=
UPLOAD_DIR=./uploads    # ide kerülnek a képfájlok
PUBLIC_URL=             # a backend publikus címe, a képURL-ek eleje
SMTP_HOST=              # lead automatikus email visszaigazoláshoz
SMTP_USER=
SMTP_PASS=
```

Adj hozzá egy `.env.example` fájlt is a repo-hoz (titkok nélkül), és győződj meg róla,
hogy a `.env` szerepel a `.gitignore`-ban.

---

## 5. Moderáció és biztonság

- A publikus feltöltési végpontot (`POST /events/:slug/photos`) rate limitelni kell
  (pl. `@nestjs/throttler`), hogy ne lehessen spammelni.
- Fájltípus és méret validáció feltöltéskor (csak kép, max pl. 15 MB).
- Ha `requiresApproval=true` egy eseménynél, a feltöltött képek `PENDING` státusszal
  kerülnek be, és csak az owner jóváhagyása után jelennek meg a publikus galériában.
- Opcionális, később bővíthető: automatikus tartalommoderáció API-val (pl. AWS
  Rekognition vagy Google Vision) a nyilvánvalóan nem odaillő tartalom kiszűrésére.

---

## 6. Fejlesztési sorrend (javaslat Claude Code-nak)

1. NestJS projekt inicializálása, alap modulstruktúra (`auth`, `events`, `photos`, `leads`, `storage`)
2. Prisma séma felállítása + migráció, PostgreSQL kapcsolat
3. Auth modul (JWT alapú)
4. Events CRUD
5. Storage service (fájl mentés, törlés, publikus URL)
6. Photos modul (feltöltés + galéria lekérdezés + moderáció)
7. Leads modul + automatikus email visszaigazolás
8. Rate limiting, validáció, hibakezelés
9. Swagger/OpenAPI dokumentáció (`@nestjs/swagger`) a React frontend integrációhoz

---

## 7. Amit neked kell előtte elintézned (nem a kódból megy)

- PostgreSQL adatbázis (helyi Docker konténer fejlesztéshez, vagy managed szolgáltatás
  éles környezetben, pl. Neon, Supabase, Railway)
- SMTP szolgáltató a lead visszaigazoló emailekhez (pl. Resend, SendGrid, vagy sima Gmail SMTP tesztre)