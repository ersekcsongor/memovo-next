import type { Metadata } from "next";
import { PricingView } from "@/components/views";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One-time pricing for your Memovo event gallery. Starter, Pro and Premium plans.",
};

export default function Page() {
  return <PricingView />;
}
