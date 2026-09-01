import type { Metadata } from "next";
import GalleryDetailView from "./gallery-detail-view";

type Params = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Gallery",
  description: "The QR code, the photos and the settings for one gallery.",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: Params) {
  const { id } = await params;
  return <GalleryDetailView id={id} />;
}
