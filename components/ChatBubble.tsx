"use client";

import Link from "next/link";
import { useT } from "@/components/LanguageProvider";

export default function ChatBubble() {
  const t = useT();

  return (
    <Link
      href="/contact"
      className="fixed right-5 bottom-5 z-[9999] flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-lg"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
      </svg>
      {t("chat.ask")}
    </Link>
  );
}
