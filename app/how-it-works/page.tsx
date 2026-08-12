import type { Metadata } from "next";
import { HowItWorksView } from "@/components/views";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Create your gallery, share your QR code, and watch every guest photo, video and message arrive in one place.",
};

export default function Page() {
  return <HowItWorksView />;
}
