"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { useT } from "@/components/LanguageProvider";
import { Container } from "@/components/Sections";

/** Turns whatever the API said into one of our own sentences. */
function messageFor(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 0) return "auth.errNetwork";
    if (err.status === 401) return "auth.errWrong";
    if (err.status === 409) return "auth.errTaken";
  }
  return "auth.errGeneric";
}

const field =
  "mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-navy outline-none focus:border-coral";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const { user, ready, login, register } = useAuth();
  const router = useRouter();
  const t = useT();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Someone already signed in has no business on this page.
  useEffect(() => {
    if (ready && user) router.replace("/account");
  }, [ready, user, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (isRegister) await register(name, email, password);
      else await login(email, password);
      router.push("/account");
    } catch (err) {
      setError(messageFor(err));
      setBusy(false);
    }
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="font-heading text-2xl font-bold md:text-3xl">
            {t(isRegister ? "auth.registerHeading" : "auth.loginHeading")}
          </h1>
          <p className="mt-2 mb-8 text-sm text-muted-foreground">
            {t(isRegister ? "auth.registerSub" : "auth.loginSub")}
          </p>

          <form onSubmit={onSubmit} noValidate>
            {isRegister && (
              <label className="mb-5 block text-sm font-semibold">
                {t("auth.name")}
                <input
                  className={field}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}

            <label className="mb-5 block text-sm font-semibold">
              {t("auth.email")}
              <input
                className={field}
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="mb-2 block text-sm font-semibold">
              {t("auth.password")}
              <input
                className={field}
                type="password"
                name="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                required
                minLength={8}
                maxLength={200}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={isRegister ? "password-hint" : undefined}
              />
            </label>
            {isRegister && (
              <p id="password-hint" className="mb-6 text-xs text-muted-foreground">
                {t("auth.passwordHint")}
              </p>
            )}

            {/* Announced when it appears, and sitting next to the fields it refers to. */}
            {error && (
              <p role="alert" className="mb-6 rounded-lg bg-blush px-4 py-3 text-sm font-medium text-coral-ink">
                {t(error as never)}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-coral px-7 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {busy ? t("auth.working") : t(isRegister ? "auth.createAccount" : "auth.signIn")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t(isRegister ? "auth.haveAccount" : "auth.noAccount")}{" "}
            <Link href={isRegister ? "/login" : "/register"} className="font-semibold text-coral-ink">
              {t(isRegister ? "auth.signIn" : "auth.createAccount")}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
