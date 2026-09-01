"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconCheck, IconCloudUpload, IconRefresh, IconX } from "@tabler/icons-react";
import { api, ApiError, type PublicGallery, type PublicPhoto } from "@/lib/api";
import { CATEGORY_KEY } from "@/lib/categories";
import { fill } from "@/lib/fill";
import { useT } from "@/components/LanguageProvider";
import { Container, HeroSurface } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import Wordmark from "@/components/Wordmark";

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

type Item = {
  /** Stable across retries, so a row keeps its place in the list. */
  key: string;
  file: File;
  preview: string;
  state: "waiting" | "sending" | "done" | "failed";
  error?: string;
};

let counter = 0;

/**
 * Where a scanned code lands. No account, no token: the page reads the gallery
 * by its slug and posts each photo to the public upload route.
 */
export default function UploadView({ slug }: { slug: string }) {
  const t = useT();

  const [gallery, setGallery] = useState<PublicGallery | null>(null);
  const [missing, setMissing] = useState(false);
  const [photos, setPhotos] = useState<PublicPhoto[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    api.galleries
      .bySlug(slug)
      .then((found) => {
        if (cancelled) return;
        setGallery(found);
        if (found.guestsCanView) {
          api.photos.listPublic(slug).then((list) => {
            if (!cancelled) setPhotos(list);
          });
        }
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* Object URLs hold a reference to the file until they are handed back. */
  useEffect(() => {
    return () => items.forEach((item) => URL.revokeObjectURL(item.preview));
    // Running this on unmount only is the point; the list is read at that moment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshPhotos = useCallback(() => {
    if (!gallery?.guestsCanView) return;
    api.photos.listPublic(slug).then(setPhotos).catch(() => {
      /* The upload landed; a stale grid is not worth an error message. */
    });
  }, [gallery?.guestsCanView, slug]);

  /** One request per photo, so a file the server refuses cannot take the rest with it. */
  const send = useCallback(
    async (item: Item, uploader: string) => {
      setItems((list) => list.map((row) => (row.key === item.key ? { ...row, state: "sending" } : row)));
      try {
        await api.photos.upload(slug, item.file, uploader);
        setItems((list) => list.map((row) => (row.key === item.key ? { ...row, state: "done" } : row)));
        return true;
      } catch (error) {
        const message = error instanceof ApiError ? error.message : t("up.failed");
        setItems((list) =>
          list.map((row) => (row.key === item.key ? { ...row, state: "failed", error: message } : row)),
        );
        return false;
      }
    },
    [slug, t],
  );

  const add = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const accepted: Item[] = [];
      for (const file of Array.from(files)) {
        const reason = !ALLOWED.includes(file.type)
          ? t("up.wrongType")
          : file.size > MAX_BYTES
            ? t("up.tooLarge")
            : null;
        accepted.push({
          key: `f${counter++}`,
          file,
          preview: URL.createObjectURL(file),
          state: reason ? "failed" : "waiting",
          error: reason ?? undefined,
        });
      }
      setItems((list) => [...list, ...accepted]);
    },
    [t],
  );

  const sendAll = useCallback(async () => {
    const waiting = items.filter((item) => item.state === "waiting");
    if (waiting.length === 0) return;
    for (const item of waiting) await send(item, name);
    refreshPhotos();
  }, [items, name, refreshPhotos, send]);

  const retry = useCallback(
    async (item: Item) => {
      if (await send(item, name)) refreshPhotos();
    },
    [name, refreshPhotos, send],
  );

  if (missing) {
    return (
      <HeroSurface>
        <Container className="pt-28 pb-16 text-center md:pt-32">
          <h1 className="font-heading text-2xl font-bold text-navy md:text-3xl">{t("up.notFound")}</h1>
        </Container>
      </HeroSurface>
    );
  }

  if (!gallery) {
    return (
      <HeroSurface>
        <Container className="pt-28 pb-16 md:pt-32">
          <p className="text-sm text-muted-foreground">{t("auth.working")}</p>
        </Container>
      </HeroSurface>
    );
  }

  const waiting = items.filter((item) => item.state === "waiting").length;
  const delivered = items.filter((item) => item.state === "done").length;
  const sending = items.some((item) => item.state === "sending");

  return (
    <>
      <HeroSurface>
        <Container className="pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="mx-auto max-w-2xl text-center">
            <Wordmark className="text-[26px]" />
            <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-coral-ink">
              {t(CATEGORY_KEY[gallery.category] as never)}
            </p>
            <h1 className="mt-2 font-heading text-3xl leading-[1.15] font-bold text-navy md:text-4xl">
              {gallery.name}
            </h1>
            <p className="mt-4 text-navy/70">{t("up.body")}</p>
          </div>

          {!gallery.isOpen ? (
            <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted-foreground">
              {t("up.closed")}
            </p>
          ) : (
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-heading text-lg font-bold">{t("up.heading")}</h2>

              {/* The whole panel is a drop target on a desktop; the button is what a
                  phone actually uses, and it opens the camera roll directly. */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  add(e.dataTransfer.files);
                }}
                className={`mt-5 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                  dragging ? "border-coral bg-blush" : "border-border"
                }`}
              >
                <IconCloudUpload className="mx-auto h-8 w-8 text-coral" stroke={1.6} aria-hidden />
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="mt-4 inline-flex min-h-12 items-center rounded-full bg-coral px-7 font-semibold text-white transition hover:brightness-95"
                >
                  {t("up.pick")}
                </button>
                <p className="mt-3 hidden text-sm text-muted-foreground sm:block">{t("up.drop")}</p>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    add(e.target.files);
                    // Clearing it lets the same file be picked again after a failure.
                    e.target.value = "";
                  }}
                />
              </div>

              <label className="mt-5 block">
                <span className="block text-sm font-semibold">{t("up.yourName")}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-3"
                />
                <span className="mt-1 block text-xs text-muted-foreground">{t("up.yourNameHint")}</span>
              </label>

              {items.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-center gap-3 rounded-xl border border-border p-2">
                      {/* A local preview, so it shows before anything has been sent. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.preview} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{item.file.name}</span>
                        {item.error && <span className="block text-xs text-coral-ink">{item.error}</span>}
                      </span>
                      {item.state === "done" && (
                        <IconCheck className="h-5 w-5 shrink-0 text-coral" stroke={2.4} aria-label={t("up.done")} />
                      )}
                      {item.state === "sending" && (
                        <span className="shrink-0 text-xs text-muted-foreground">{t("up.sending")}</span>
                      )}
                      {item.state === "failed" && (
                        <button
                          type="button"
                          onClick={() => retry(item)}
                          className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full border border-border px-3 text-xs font-semibold"
                        >
                          <IconRefresh className="h-3.5 w-3.5" stroke={2} aria-hidden />
                          {t("up.retry")}
                        </button>
                      )}
                      {item.state === "waiting" && (
                        <button
                          type="button"
                          onClick={() => setItems((list) => list.filter((row) => row.key !== item.key))}
                          aria-label={t("mod.remove")}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-blush"
                        >
                          <IconX className="h-4 w-4" stroke={2} aria-hidden />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {waiting > 0 && (
                <button
                  type="button"
                  onClick={sendAll}
                  disabled={sending}
                  className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-coral px-7 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
                >
                  {sending ? t("up.sending") : t("up.send")}
                </button>
              )}

              {delivered > 0 && waiting === 0 && !sending && (
                <p className="mt-5 rounded-xl bg-blush p-4 text-center text-sm font-semibold text-coral-ink">
                  {gallery.requiresApproval ? t("up.doneModerated") : t("up.done")}
                </p>
              )}
            </div>
          )}
        </Container>
      </HeroSurface>

      {gallery.guestsCanView && (
        <section className="bg-white py-10 md:py-16">
          <Container>
            <h2 className="mb-8 text-center font-heading text-2xl font-bold md:text-3xl">{t("up.gallery")}</h2>
            {photos.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">{t("up.galleryEmpty")}</p>
            ) : (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo, i) => (
                  <Reveal key={photo.id} as="li" index={i}>
                    <figure className="overflow-hidden rounded-xl border border-border bg-white">
                      {/* The photos live on the API host and are user supplied, so they
                          stay outside the image optimizer and load as plain files. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.thumbnailUrl ?? photo.fileUrl}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                      <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                        {fill(t("mod.by"), { name: photo.uploaderName ?? t("mod.anonymous") })}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </ul>
            )}
          </Container>
        </section>
      )}
    </>
  );
}
