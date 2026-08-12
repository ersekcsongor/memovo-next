import type { Metadata } from "next";
import GalleryDemoView from "@/components/GalleryDemoView";

export const metadata: Metadata = {
  title: "Gallery Demo",
  description: "See what a live Memovo gallery looks like once your guests start uploading.",
};

export default function Page() {
  return <GalleryDemoView />;
}
