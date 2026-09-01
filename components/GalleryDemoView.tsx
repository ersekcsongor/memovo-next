"use client";

import { GALLERY_PHOTOS, TEMPLATE_PHOTOS } from "@/data/assets";
import { useT } from "@/components/LanguageProvider";
import { Container, CtaBand, PageBanner } from "@/components/Sections";
import { GalleryGridBlock, type GalleryImage } from "@/components/ui/gallery-grid-block-shadcnui";

/**
 * Which album each photo belongs to. Keyed by file so the mapping survives the
 * arrays being reordered, and translated at render rather than stored in English.
 */
const ALBUM: Record<string, string> = {
  "guests-celebrating.jpg": "gallery.albumGuests",
  "phones-out.jpg": "gallery.albumGuests",
  "phone-confetti.jpg": "gallery.albumGuests",
  "welcome-sign.jpg": "gallery.albumDetails",
  "floral-table.jpg": "gallery.albumDetails",
  "table-setting.jpg": "gallery.albumDetails",
  "printed-keepsakes.jpg": "gallery.albumDetails",
  "couple-dancing.jpg": "gallery.albumReception",
  "toast.jpg": "gallery.albumReception",
  "reception-venue.jpg": "gallery.albumVenue",
  "outdoor-table.jpg": "gallery.albumVenue",
};

export default function GalleryDemoView() {
  const t = useT();

  const stats = [
    { n: "1 248", label: t("gallery.uploads") },
    { n: "86", label: t("gallery.guests") },
    { n: "4", label: t("gallery.albums") },
  ];

  /* Both arrays overlap, so the photos are deduplicated by file before they are
     numbered: two cards sharing an id would break the lightbox. */
  const seen = new Set<string>();
  const images: GalleryImage[] = [...GALLERY_PHOTOS, ...TEMPLATE_PHOTOS]
    .filter((p) => {
      if (seen.has(p.src)) return false;
      seen.add(p.src);
      return true;
    })
    .map((p, i) => {
      const file = p.src.split("/").pop() ?? "";
      return {
        id: i,
        url: p.src,
        title: p.alt,
        category: t((ALBUM[file] ?? "gallery.albumDetails") as never),
      };
    });

  return (
    <>
      <PageBanner heading={t("gallery.heading")} sub={t("gallery.sub")} />

      <section className="bg-white py-10 md:py-12">
        <Container>
          <p className="mx-auto mb-10 max-w-2xl text-center text-navy/80">{t("gallery.intro")}</p>

          <div className="mb-12 flex flex-wrap justify-center gap-10 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl font-bold text-coral-ink">{s.n}</p>
                <p className="text-sm text-navy/60">{s.label}</p>
              </div>
            ))}
          </div>

          <GalleryGridBlock
            images={images}
            allLabel={t("gallery.filterAll")}
            badgeLabel={t("gallery.gridBadge")}
            heading={t("gallery.gridHeading")}
            subheading={t("gallery.gridSub")}
            closeLabel={t("gallery.close")}
            prevLabel={t("gallery.prev")}
            nextLabel={t("gallery.next")}
          />
        </Container>
      </section>

      <CtaBand text={t("gallery.cta")} />
    </>
  );
}
