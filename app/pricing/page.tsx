import type { Metadata } from "next";
import { PricingView } from "@/components/views";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One-time pricing for your Memovo event gallery. Classic, Signature and Signature Bundle packages.",
};

export default function Page() {
  return <PricingView />;
}
