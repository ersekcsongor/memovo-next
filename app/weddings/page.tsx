import type { Metadata } from "next";
import WeddingsView from "@/components/WeddingsView";

export const metadata: Metadata = {
  title: "QR Code Wedding Photos & Guest Photo Sharing",
  description:
    "Capture every wedding moment through your guests' eyes. Guest photos and videos collected with a simple wedding QR code and link.",
};

export default function Page() {
  return <WeddingsView />;
}
