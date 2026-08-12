import type { Metadata } from "next";
import { StoryView } from "@/components/views";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How Memovo began, and how a side project grew into the original QR code photo sharing platform for events.",
};

export default function Page() {
  return <StoryView />;
}
