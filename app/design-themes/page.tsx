import type { Metadata } from "next";
import { ThemesView } from "@/components/views";

export const metadata: Metadata = {
  title: "Design Themes",
  description: "20 curated gallery colour themes and font selections, included with Signature and Luxe packages.",
};

export default function Page() {
  return <ThemesView />;
}
