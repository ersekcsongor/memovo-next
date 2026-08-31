import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Memovo account to reach your event galleries.",
  // A sign-in form has nothing to offer a search engine.
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
