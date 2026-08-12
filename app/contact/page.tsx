import type { Metadata } from "next";
import { ContactView } from "@/components/views";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about your gallery, partnerships or press? The Memovo team answers 7 days a week.",
};

export default function Page() {
  return <ContactView />;
}
