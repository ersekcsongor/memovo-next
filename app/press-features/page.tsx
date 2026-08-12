import type { Metadata } from "next";
import { PressView } from "@/components/views";

export const metadata: Metadata = {
  title: "Press & Features",
  description: "Memovo in the media: interviews, features and press coverage.",
};

export default function Page() {
  return <PressView />;
}
