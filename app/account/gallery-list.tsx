"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconPhoto, IconPlus, IconQrcode } from "@tabler/icons-react";
import { api, type Gallery } from "@/lib/api";
import { CATEGORY_KEY } from "@/lib/categories";
import { fill } from "@/lib/fill";
import { useAuth } from "@/components/AuthProvider";
import { useLang, useT } from "@/components/LanguageProvider";

const LOCALE = { en: "en-GB", hu: "hu-HU", ro: "ro-RO" } as const;

/** The galleries this account owns, each row leading to its code and its photos. */
export default function GalleryList() {
  const { token } = useAuth();
  const { lang } = useLang();
  const t = useT();

  const [galleries, setGalleries] = useState<Gallery[] | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    api.galleries
      .mine(token)
      .then((list) => {
        if (!cancelled) setGalleries(list);
      })
      .catch(() => {
        if (!cancelled) setGalleries([]);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-heading text-xl font-bold">{t("gal.mine")}</h2>
        <Link
          href="/account/galleries/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          <IconPlus className="h-4 w-4" stroke={2.4} aria-hidden />
          {t("gal.new")}
        </Link>
      </div>

      {galleries === null ? (
        <p className="mt-6 text-sm text-muted-foreground">{t("auth.working")}</p>
      ) : galleries.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">{t("auth.accountEmpty")}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {galleries.map((gallery) => (
            <li key={gallery.id}>
              <Link
                href={`/account/galleries/${gallery.id}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:bg-cream"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blush text-coral-ink"
                >
                  <IconQrcode className="h-6 w-6" stroke={1.6} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-heading font-bold">{gallery.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {t(CATEGORY_KEY[gallery.category] as never)} ·{" "}
                    {fill(t("gal.opened"), {
                      date: new Date(gallery.createdAt).toLocaleDateString(LOCALE[lang], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }),
                    })}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="flex items-center justify-end gap-1.5 text-sm font-semibold">
                    <IconPhoto className="h-4 w-4 text-muted-foreground" stroke={2} aria-hidden />
                    {gallery._count.photos}
                  </span>
                  {gallery.pendingCount > 0 && (
                    <span className="mt-1 block rounded-full bg-blush px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-coral-ink">
                      {fill(t("gal.pendingCount"), { count: gallery.pendingCount })}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
