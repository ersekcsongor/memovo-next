"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, ApiError, type AuthUser } from "@/lib/api";

const STORAGE_KEY = "memovo-token";

type AuthState = {
  user: AuthUser | null;
  /** The pages that call the API need it; only this provider writes it. */
  token: string | null;
  /** False until the stored token has been checked, so the header does not flicker. */
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  /** Re-reads the account, so a plan bought in another tab shows up here. */
  refresh: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

/**
 * Holds the signed-in account for the whole site.
 *
 * The token lives in localStorage because the API hands one back in the response
 * body and expects it in an Authorization header. That means a script running on
 * this origin could read it; moving to an httpOnly cookie is the fix, and it needs
 * the API to set the cookie instead of returning the token.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      setReady(true);
      return;
    }
    setToken(token);
    let cancelled = false;
    api
      .me(token)
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch((err) => {
        // A rejected token is spent; anything else may just be the API being down,
        // and throwing the token away would sign the visitor out for a blip.
        if (err instanceof ApiError && err.status === 401) localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const accept = useCallback((result: { accessToken: string; user: AuthUser }) => {
    localStorage.setItem(STORAGE_KEY, result.accessToken);
    setToken(result.accessToken);
    setUser(result.user);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => accept(await api.login({ email, password })),
    [accept],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => accept(await api.register({ name, email, password })),
    [accept],
  );

  /* Checkout leaves the site and comes back, so the plan on the account has
     changed under a page that never unmounted. */
  const refresh = useCallback(async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    setUser(await api.me(stored));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, ready, login, register, refresh, logout }),
    [user, token, ready, login, register, refresh, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
