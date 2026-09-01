"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { api, ApiError, EVENT_CATEGORIES, type EventCategory } from "@/lib/api";
import { CATEGORY_KEY } from "@/lib/categories";
import { useAuth } from "@/components/AuthProvider";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";

/** Everything a gallery needs before it exists. The rest is editable afterwards. */
export default function NewGalleryView() {
  const { token, ready, user } = useAuth();
  const router = useRouter();
  const t = useT();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<EventCategory>("OTHER");
  const [isPublic, setIsPublic] = useState(true);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [guestsCanView, setGuestsCanView] = useState(true);
  const [expiresAt, setExpiresAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setBusy(true);
    setError(null);
    try {
      const gallery = await api.galleries.create(token, {
        name: name.trim(),
        category,
        isPublic,
        requiresApproval,
        guestsCanView,
        // The date input gives a day; uploads close at the end of it.
        expiresAt: expiresAt ? new Date(`${expiresAt}T23:59:59`).toISOString() : null,
      });
      router.push(`/account/galleries/${gallery.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "network");
      setBusy(false);
    }
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/account"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-coral-ink"
          >
            <IconArrowLeft className="h-4 w-4" stroke={2} aria-hidden />
            {t("gal.backToAccount")}
          </Link>

          <h1 className="mt-4 font-heading text-2xl font-bold md:text-3xl">{t("gal.new")}</h1>

          <form onSubmit={submit} className="mt-8 space-y-6">
            <label className="block">
              <span className="block text-sm font-semibold">{t("gal.name")}</span>
              <input
                type="text"
                required
                minLength={2}
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("gal.namePlaceholder")}
                className="mt-1.5 w-full rounded-lg border border-border px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold">{t("gal.category")}</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
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
              checked={isPublic}
              onChange={setIsPublic}
              label={t("gal.isPublic")}
              hint={t("gal.isPublicHint")}
            />
            <Toggle
              checked={requiresApproval}
              onChange={setRequiresApproval}
              label={t("gal.requiresApproval")}
              hint={t("gal.requiresApprovalHint")}
            />
            <Toggle
              checked={guestsCanView}
              onChange={setGuestsCanView}
              label={t("gal.guestsCanView")}
              hint={t("gal.guestsCanViewHint")}
            />

            <label className="block">
              <span className="block text-sm font-semibold">{t("gal.expiresAt")}</span>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border px-4 py-3"
              />
              <span className="mt-1 block text-xs text-muted-foreground">{t("gal.expiresNever")}</span>
            </label>

            {error && <p className="text-sm text-coral-ink">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-coral px-7 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {busy ? t("gal.creating") : t("gal.create")}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

/** A checkbox with the sentence that explains what turning it off does. */
export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-xl border border-border p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 accent-coral"
      />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
    </label>
  );
}
