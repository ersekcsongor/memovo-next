import type { Metadata } from "next";
import { FoundersView } from "@/components/views";

export const metadata: Metadata = {
  title: "Meet The Founders",
  description: "Carla and Warwick Groves, the husband-and-wife team behind Memovo.",
};

export default function Page() {
  return <FoundersView />;
}
