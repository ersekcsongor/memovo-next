import type { Metadata } from "next";
import AccountView from "./account-view";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your Memovo account and the galleries you host.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountView />;
}
