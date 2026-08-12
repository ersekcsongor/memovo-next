import type { Metadata } from "next";
import { CommunityView } from "@/components/views";

export const metadata: Metadata = {
  title: "Community Events",
  description: "Wedding fairs, industry expos and community fundraisers where you'll find the Memovo team.",
};

export default function Page() {
  return <CommunityView />;
}
