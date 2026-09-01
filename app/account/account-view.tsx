"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "@/components/AuthProvider";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";
import GalleryList from "./gallery-list";
import PlanCard from "./plan-card";

export default function AccountView() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const t = useT();

  /* Signing out empties the account too, and without this the guard below would
     race the button and land the visitor on the form instead of the home page. */
  const signingOut = useRef(false);

  useEffect(() => {
    if (ready && !user && !signingOut.current) router.replace("/login");
  }, [ready, user, router]);

  /* The stored token is checked on mount; until that settles the page says nothing
     rather than flashing a signed-out state at someone who is signed in. */
  if (!ready || !user) {
    return (
      <section className="bg-white py-10 md:py-16">
        <Container>
          <p className="text-sm text-muted-foreground">{!ready ? t("auth.working") : t("auth.needSignIn")}</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-2xl font-bold md:text-3xl">{t("auth.accountHeading")}</h1>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coral font-heading text-lg font-bold text-white"
              >
                {user.name.trim().slice(0, 1).toUpperCase()}
              </span>
              <span>
                <span className="block text-xs tracking-wide text-muted-foreground">{t("auth.signedInAs")}</span>
                <span className="block font-heading font-bold">{user.name}</span>
                <span className="block text-sm text-muted-foreground">{user.email}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                signingOut.current = true;
                logout();
                router.replace("/");
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-navy transition hover:bg-cream"
            >
              <IconLogout className="h-4 w-4" stroke={2} aria-hidden />
              {t("auth.signOut")}
            </button>
          </div>

          {/* PlanCard reads the checkout flag off the query string, and a component
              that does that has to be suspended for the page to prerender. */}
          <Suspense fallback={null}>
            <PlanCard />
          </Suspense>
          <GalleryList />
        </div>
      </Container>
    </section>
  );
}
