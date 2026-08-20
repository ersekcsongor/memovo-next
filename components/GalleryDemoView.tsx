"use client";

import Image from "next/image";
import { GALLERY_PHOTOS, TEMPLATE_PHOTOS } from "@/data/assets";
import { useT } from "@/components/LanguageProvider";
import { Container, CtaBand, PageBanner } from "@/components/Sections";

/** Guest names shown on each tile, the way a real gallery labels uploads. */
const UPLOADERS = ["Anna", "Máté", "Sofia", "Andrei", "Kate", "Bence", "Elena", "Chris"];

const PHOTOS = [...GALLERY_PHOTOS, ...TEMPLATE_PHOTOS];

export default function GalleryDemoView() {
  const t = useT();

  const stats = [
    { n: "1 248", label: t("gallery.uploads") },
    { n: "86", label: t("gallery.guests") },
    { n: "4", label: t("gallery.albums") },
  ];

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

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PHOTOS.map((p, i) => (
              <figure key={`${p.src}-${i}`} className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-2 text-xs text-white">
                  {UPLOADERS[i % UPLOADERS.length]}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand text={t("gallery.cta")} />
    </>
  );
}
