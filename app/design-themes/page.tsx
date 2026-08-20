import type { Metadata } from "next";
import { ThemesView } from "@/components/views";

export const metadata: Metadata = {
  title: "Design Themes",
  description: "20 curated gallery colour themes and font selections for your Memovo event gallery.",
};

export default function Page() {
  return <ThemesView />;
}
