import type { Metadata } from "next";
import { FaqsView } from "@/components/views";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about packages, privacy, upload windows, guest limits and languages.",
};

export default function Page() {
  return <FaqsView />;
}
