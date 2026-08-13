# Memovo API — NestJS

The server behind the Memovo galleries: accounts, events, guest photo uploads with
moderation, and the contact form leads. Built from `../project-backend-spec.md`.

```bash
npm install
cp .env.example .env      # fill in DATABASE_URL and JWT_SECRET
npm run prisma:migrate    # creates the tables
npm run dev               # http://localhost:4000/api — docs at /api/docs
```

## Layout

| Module | What it owns |
| --- | --- |
| `auth` | Registration, login, JWT issuing and the `JwtAuthGuard` every private route uses |
| `events` | Event CRUD, slug generation, the owner check other modules call |
| `photos` | Guest uploads, the public gallery listing, moderation and deletion |
| `storage` | Where files live. Everything else calls this and knows nothing about paths |
| `leads` | Contact form submissions, the admin list and the status pipeline |
| `mail` | Confirmation to the visitor, notification to the team |
| `prisma` | The database client, global |

## Endpoints

Auth `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`

Events `POST /api/events`, `GET /api/events/mine`, `GET /api/events/:slug`,
`PATCH /api/events/:id`, `DELETE /api/events/:id`

Photos `POST /api/events/:slug/photos` (public, multipart), `GET /api/events/:slug/photos`,
`GET /api/events/:id/photos/all`, `PATCH /api/photos/:id/status`, `DELETE /api/photos/:id`

Leads `POST /api/leads` (public), `GET /api/leads`, `PATCH /api/leads/:id/status`

Swagger lists all of them with schemas at `/api/docs`.

## Photo storage

`StorageService` writes originals and a 480px WebP thumbnail under `UPLOAD_DIR`, one
folder per event, and Nest serves that folder at `/uploads`. Each `Photo` row keeps the
storage keys next to the URLs, so deleting a photo clears the files too. Moving to object
storage later means rewriting that one service.

## What guards the public endpoints

The two open routes are the guest upload and the contact form. Both carry their own
throttle — 20 uploads and 5 submissions per minute per IP — on top of the 60/minute the
whole API runs under. Uploads accept images only, up to 15 MB. An event with
`requiresApproval` holds new photos at `PENDING` until the owner approves them.

## Mail

With `SMTP_HOST` empty the API still works and logs what it would have sent, so the
contact form can be developed without a mail account. Set the SMTP values and the visitor
gets a confirmation in their own language, while `LEAD_NOTIFY_TO` gets the alert.

## Database

PostgreSQL through Prisma. `prisma/schema.prisma` holds `User`, `Event`, `Photo` and
`Lead` with the two status enums. `npm run prisma:studio` opens a browser view of the
rows, which is the quickest way to see the leads arriving during development.
