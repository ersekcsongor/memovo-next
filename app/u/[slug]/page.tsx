import type { Metadata } from "next";
import UploadView from "./upload-view";

type Params = { params: Promise<{ slug: string }> };

/**
 * The page a QR code opens. Guests reach it with no account, so it stays out of
 * search results: the link belongs to the people at the event.
 */
export const metadata: Metadata = {
  title: "Add your photos",
  description: "Upload the photos you took straight into the album.",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <UploadView slug={slug} />;
}
