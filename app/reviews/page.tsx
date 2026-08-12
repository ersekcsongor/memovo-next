import type { Metadata } from "next";
import { ReviewsView } from "@/components/views";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Rated 4.8 out of 5 by hosts around the world. Read what Memovo customers say.",
};

export default function Page() {
  return <ReviewsView />;
}
