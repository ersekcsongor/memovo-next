"use client";

import { useEffect, useState } from "react";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { useT } from "@/components/LanguageProvider";

/* The cards are a fixed 300px wide and the ring radius is fixed too, so the whole
   assembly is scaled down on narrow viewports. Scaling keeps the spacing between
   cards proportional; shrinking the radius alone collapses them onto each other. */
function scaleFor(width: number) {
  if (width >= 1280) return 1;
  if (width >= 1024) return 0.85;
  if (width >= 640) return 0.7;
  return 0.55;
}

export default function GalleryView({ items }: { items: GalleryItem[] }) {
  const [scale, setScale] = useState(1);
  const t = useT();

  useEffect(() => {
    const update = () => setScale(scaleFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-10 z-10 px-4 text-center md:top-16">
        <h1 className="font-heading text-2xl font-bold text-navy sm:text-3xl md:text-4xl">
          {t("ring.heading")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("ring.sub")}</p>
      </div>
      <div className="h-full w-full" style={{ transform: `scale(${scale})` }}>
        <CircularGallery items={items} />
      </div>
    </div>
  );
}
