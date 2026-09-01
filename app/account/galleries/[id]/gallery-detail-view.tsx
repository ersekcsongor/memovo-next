"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconDownload,
  IconEyeOff,
  IconTrash,
} from "@tabler/icons-react";
import {
  api,
  ApiError,
  EVENT_CATEGORIES,
  type EventCategory,
  type Gallery,
  type OwnedPhoto,
  type PhotoStatus,
} from "@/lib/api";
import { CATEGORY_KEY } from "@/lib/categories";
import { fill } from "@/lib/fill";
import { useAuth } from "@/components/AuthProvider";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";
import { Toggle } from "../new/new-gallery-view";

/** The owner's view of one gallery: the code to share, the photos, the settings. */
export default function GalleryDetailView({ id }: { id: string }) {
  const { token, ready, user } = useAuth();
  const router = useRouter();
  const t = useT();

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [photos, setPhotos] = useState<OwnedPhoto[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  const load = useCallback(() => {
    if (!token) return;
    api.galleries
      .owned(token, id)
      .then(setGallery)
      .catch((err) => setError(err instanceof ApiError ? err.message : "network"));
    api.photos
      .listAll(token, id)
      .then(setPhotos)
      .catch(() => setPhotos([]));
  }, [token, id]);

  useEffect(load, [load]);

  const copy = useCallback(async () => {
    if (!gallery) return;
    try {
      await navigator.clipboard.writeText(gallery.uploadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard access can be refused; the link is on screen to copy by hand. */
    }
  }, [gallery]);

  const save = useCallback(
    async (patch: Partial<Gallery>) => {
      if (!token || !gallery) return;
      // Shown at once, so a toggle answers the tap rather than the round trip.
      setGallery({ ...gallery, ...patch });
      try {
        await api.galleries.update(token, gallery.id, patch);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "network");
        load();
      }
    },
    [token, gallery, load],
  );

  const setStatus = useCallback(
    async (photoId: string, status: PhotoStatus) => {
      if (!token) return;
      setPhotos((list) => list.map((p) => (p.id === photoId ? { ...p, status } : p)));
      await api.photos.setStatus(token, photoId, status).catch(load);
    },
    [token, load],
  );

  const removePhoto = useCallback(
    async (photoId: string) => {
      if (!token || !confirm(t("mod.removeConfirm"))) return;
      setPhotos((list) => list.filter((p) => p.id !== photoId));
      await api.photos.remove(token, photoId).catch(load);
    },
    [token, t, load],
  );

  const removeGallery = useCallback(async () => {
    if (!token || !gallery || !confirm(t("gal.deleteConfirm"))) return;
    await api.galleries.remove(token, gallery.id);
    router.push("/account");
  }, [token, gallery, t, router]);

  if (!gallery) {
    return (
      <section className="bg-white py-10 md:py-16">
        <Container>
          <p className="text-sm text-muted-foreground">{error ?? t("auth.working")}</p>
        </Container>
      </section>
    );
  }

  const waiting = photos.filter((p) => p.status === "PENDING").length;
  const guests = new Set(photos.map((p) => p.uploaderName ?? "")).size;

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/account"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-coral-ink"
          >
            <IconArrowLeft className="h-4 w-4" stroke={2} aria-hidden />
            {t("gal.backToAccount")}
          </Link>

          <h1 className="mt-4 font-heading text-2xl font-bold md:text-3xl">{gallery.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(CATEGORY_KEY[gallery.category] as never)}
            {gallery.isOpen === false && ` · ${t("gal.closed")}`}
          </p>

          {/* The QR and the link. This is what the gallery is for. */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold">{t("qr.heading")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("qr.body")}</p>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* The QR endpoint is public, so a plain img reaches it with no token. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={api.galleries.qrSvgUrl(gallery.slug)}
                alt={fill(t("qr.alt"), { name: gallery.name })}
                className="h-48 w-48 shrink-0 rounded-xl border border-border bg-white p-3"
              />

              <div className="w-full min-w-0">
                <p className="text-sm font-semibold">{t("qr.link")}</p>
                <p className="mt-1.5 truncate rounded-lg border border-border bg-white px-4 py-3 text-sm">
                  {gallery.uploadUrl}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-sm font-semibold text-white transition hover:brightness-95"
                  >
                    {copied ? <IconCheck className="h-4 w-4" stroke={2.4} aria-hidden /> : <IconCopy className="h-4 w-4" stroke={2} aria-hidden />}
                    {copied ? t("qr.copied") : t("qr.copy")}
                  </button>
                  <a
                    href={api.galleries.qrPngUrl(gallery.slug)}
                    download={`memovo-${gallery.slug}.png`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold text-navy transition hover:bg-cream"
                  >
                    <IconDownload className="h-4 w-4" stroke={2} aria-hidden />
                    {t("qr.downloadPng")}
                  </a>
                  <a
                    href={api.galleries.qrSvgUrl(gallery.slug)}
                    download={`memovo-${gallery.slug}.svg`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold text-navy transition hover:bg-cream"
                  >
                    <IconDownload className="h-4 w-4" stroke={2} aria-hidden />
                    {t("qr.downloadSvg")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            <Stat label={t("mod.total")} value={photos.length} />
            <Stat label={t("mod.waiting")} value={waiting} />
            <Stat label={t("mod.guests")} value={guests} />
          </dl>

          {/* Moderation */}
          <h2 className="mt-10 font-heading text-xl font-bold">{t("mod.heading")}</h2>
          {photos.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{t("mod.empty")}</p>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((photo) => (
                <li key={photo.id} className="overflow-hidden rounded-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.thumbnailUrl ?? photo.fileUrl}
                    alt=""
                    loading="lazy"
                    className={`aspect-square w-full object-cover ${photo.status === "REJECTED" ? "opacity-40" : ""}`}
                  />
                  <div className="p-2">
                    <p className="truncate text-xs text-muted-foreground">
                      {fill(t("mod.by"), { name: photo.uploaderName ?? t("mod.anonymous") })}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-coral-ink">
                      {photo.status === "PENDING"
                        ? t("mod.pending")
                        : photo.status === "APPROVED"
                          ? t("mod.approved")
                          : t("mod.rejected")}
                    </p>
                    <div className="mt-2 flex gap-1">
                      {photo.status !== "APPROVED" && (
                        <button
                          type="button"
                          onClick={() => setStatus(photo.id, "APPROVED")}
                          aria-label={t("mod.approve")}
                          title={t("mod.approve")}
                          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-coral text-white transition hover:brightness-95"
                        >
                          <IconCheck className="h-4 w-4" stroke={2.4} aria-hidden />
                        </button>
                      )}
                      {photo.status !== "REJECTED" && (
                        <button
                          type="button"
                          onClick={() => setStatus(photo.id, "REJECTED")}
                          aria-label={t("mod.reject")}
                          title={t("mod.reject")}
                          className="flex h-11 flex-1 items-center justify-center rounded-lg border border-border transition hover:bg-cream"
                        >
                          <IconEyeOff className="h-4 w-4" stroke={2} aria-hidden />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        aria-label={t("mod.remove")}
                        title={t("mod.remove")}
                        className="flex h-11 flex-1 items-center justify-center rounded-lg border border-border text-coral-ink transition hover:bg-blush"
                      >
                        <IconTrash className="h-4 w-4" stroke={2} aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Settings */}
          <h2 className="mt-10 font-heading text-xl font-bold">{t("gal.settings")}</h2>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold">{t("gal.category")}</span>
              <select
                value={gallery.category}
                onChange={(e) => save({ category: e.target.value as EventCategory })}
                className="mt-1.5 w-full rounded-lg border border-border px-4 py-3"
              >
                {EVENT_CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {t(CATEGORY_KEY[value] as never)}
                  </option>
                ))}
              </select>
            </label>

            <Toggle
              checked={gallery.isPublic}
              onChange={(value) => save({ isPublic: value })}
              label={t("gal.isPublic")}
              hint={t("gal.isPublicHint")}
            />
            <Toggle
              checked={gallery.requiresApproval}
              onChange={(value) => save({ requiresApproval: value })}
              label={t("gal.requiresApproval")}
              hint={t("gal.requiresApprovalHint")}
            />
            <Toggle
              checked={gallery.guestsCanView}
              onChange={(value) => save({ guestsCanView: value })}
              label={t("gal.guestsCanView")}
              hint={t("gal.guestsCanViewHint")}
            />

            {saved && <p className="text-sm font-semibold text-coral-ink">{t("gal.saved")}</p>}
            {error && <p className="text-sm text-coral-ink">{error}</p>}

            <button
              type="button"
              onClick={removeGallery}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-coral-ink transition hover:bg-blush"
            >
              <IconTrash className="h-4 w-4" stroke={2} aria-hidden />
              {t("gal.delete")}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-blush px-4 py-3 text-center">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-heading text-xl font-bold">{value}</dd>
    </div>
  );
}
