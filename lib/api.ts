/**
 * The one place that knows where the API lives and how a failure is shaped.
 * The base URL is public by design: the browser has to reach it.
 */
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type AuthUser = { id: string; email: string; name: string };
export type AuthResult = { accessToken: string; user: AuthUser };

/** Carries the status so a caller can tell "wrong password" from "API is down". */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
  } catch {
    // fetch only rejects when the request never landed: no server, no network, CORS.
    throw new ApiError("network", 0);
  }

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      // Nest sends a string for one failure and an array for a failed validation.
      message = Array.isArray(body?.message) ? body.message.join(", ") : (body?.message ?? message);
    } catch {
      /* A non-JSON error body leaves the status text in place. */
    }
    throw new ApiError(message, res.status);
  }

  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

export const api = {
  register: (body: { email: string; name: string; password: string }) =>
    request<AuthResult>("/auth/register", { method: "POST", body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request<AuthResult>("/auth/login", { method: "POST", body: JSON.stringify(body) }),

  me: (token: string) => request<AuthUser>("/auth/me", {}, token),
};
