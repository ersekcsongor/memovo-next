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
  { common: "Scan and share", binomial: "QR signage at the venue" },
  { common: "Welcome banner", binomial: "The first thing guests see" },
  { common: "Floral display", binomial: "Ceremony styling" },
  { common: "I Spy game", binomial: "A prompt card for guests" },
  { common: "The couple", binomial: "Their wedding day" },
  { common: "Take-home card", binomial: "A keepsake with the gallery link" },
  { common: "Video messages", binomial: "Recorded at the reception" },
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
