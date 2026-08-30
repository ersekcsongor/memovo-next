import type { Metadata } from "next";
import { type GalleryItem } from "@/components/ui/circular-gallery";
import { GALLERY_PHOTOS } from "@/data/assets";
import GalleryView from "./gallery-view";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "A rotating gallery of real Memovo events, driven by scroll.",
};

/* Captions sit alongside GALLERY_PHOTOS, so the gallery follows the data file. */
const CAPTIONS = [
  { common: "Guests in the moment", binomial: "Candid shots from the floor" },
  { common: "Everyone's a photographer", binomial: "Phones out all evening" },
  { common: "Help us capture the day", binomial: "The sign at the entrance" },
  { common: "Ceremony styling", binomial: "Flowers on every table" },
  { common: "The table settings", binomial: "Details worth keeping" },
  { common: "The first dance", binomial: "Surrounded by everyone" },
  { common: "Printed keepsakes", binomial: "Photos guests took home" },
  { common: "The toast", binomial: "Glasses up at the reception" },
] as const;

const galleryItems: GalleryItem[] = GALLERY_PHOTOS.map((photo, i) => ({
  common: CAPTIONS[i].common,
  binomial: CAPTIONS[i].binomial,
  photo: {
    url: photo.src,
    text: photo.alt,
    by: "Memovo",
  },
}));

export default function GalleryPage() {
  return (
    /* GalleryView owns the page rhythm: intro, the ring on its scroll runway,
       the steps behind the photos, then the closing band. */
    <div className="w-full bg-white text-foreground">
      <GalleryView items={galleryItems} />
    </div>
  );
}
