"use client";

import Link from "next/link";
import { useT } from "@/components/LanguageProvider";

export default function ChatBubble() {
  const t = useT();

  return (
    <Link
      href="/contact"
      /* Stands down on a phone: the bottom bar already carries Help, and two round
         pink things in the same corner read as a mistake. */
      className="fixed right-5 bottom-5 z-40 hidden items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-95 md:flex"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
      </svg>
      {t("chat.ask")}
    </Link>
  );
}
