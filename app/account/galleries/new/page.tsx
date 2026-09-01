import type { Metadata } from "next";
import NewGalleryView from "./new-gallery-view";

export const metadata: Metadata = {
  title: "New gallery",
  description: "Open a gallery and get the QR code your guests upload through.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <NewGalleryView />;
}
