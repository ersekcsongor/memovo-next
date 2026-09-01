/**
 * The one place that knows where the API lives and how a failure is shaped.
 * The base URL is public by design: the browser has to reach it.
 */
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type Plan = "FREE" | "STARTER" | "PRO" | "PREMIUM";

export const EVENT_CATEGORIES = [
  "WEDDING",
  "ENGAGEMENT",
  "PARTY",
  "KIDS_PARTY",
  "BUSINESS",
  "MEMORIAL",
  "SEASONAL_HOLIDAY",
  "COMPANY_CHRISTMAS",
  "OTHER",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  planExpiresAt: string | null;
};

export type AuthResult = { accessToken: string; user: AuthUser };

export type PlanStatus = {
  plan: Plan;
  planExpiresAt: string | null;
  /** null where the plan sets no ceiling. */
  limits: { galleries: number | null; photosPerGallery: number | null };
  /** False while no payment provider is configured, so the page offers something else. */
  paymentsConfigured: boolean;
};

export type GallerySettings = {
  name: string;
  category: EventCategory;
  isPublic: boolean;
  requiresApproval: boolean;
  guestsCanView: boolean;
  expiresAt: string | null;
};

export type Gallery = GallerySettings & {
  id: string;
  slug: string;
  ownerId: string;
  createdAt: string;
  uploadUrl: string;
  pendingCount: number;
  _count: { photos: number };
  isOpen?: boolean;
};

/** What a guest is told about the gallery they scanned into. */
export type PublicGallery = {
  id: string;
  slug: string;
  name: string;
  category: EventCategory;
  isPublic: boolean;
  requiresApproval: boolean;
  guestsCanView: boolean;
  expiresAt: string | null;
  createdAt: string;
  isOpen: boolean;
  uploadUrl: string;
};

export type PhotoStatus = "PENDING" | "APPROVED" | "REJECTED";

export type PublicPhoto = {
  id: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  uploaderName: string | null;
  uploadedAt: string;
};

export type OwnedPhoto = PublicPhoto & { status: PhotoStatus; eventId: string };

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
  // FormData sets its own content type, including the multipart boundary. Naming
  // one here would leave the boundary out and the server would reject the body.
  const sendingForm = init.body instanceof FormData;

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        ...(sendingForm ? {} : { "Content-Type": "application/json" }),
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

  billing: {
    plan: (token: string) => request<PlanStatus>("/billing/plan", {}, token),

    /** Returns the Checkout address for the browser to follow. */
    checkout: (token: string, plan: Exclude<Plan, "FREE">) =>
      request<{ url: string }>("/billing/checkout", { method: "POST", body: JSON.stringify({ plan }) }, token),

    /** Development only; the API refuses it once payments are configured. */
    devPlan: (token: string, plan: Plan) =>
      request<{ plan: Plan; planExpiresAt: string | null }>(
        "/billing/dev-plan",
        { method: "POST", body: JSON.stringify({ plan }) },
        token,
      ),
  },

  galleries: {
    mine: (token: string) => request<Gallery[]>("/events/mine", {}, token),

    owned: (token: string, id: string) => request<Gallery>(`/events/owned/${id}`, {}, token),

    create: (token: string, body: Partial<GallerySettings> & { name: string }) =>
      request<Gallery>("/events", { method: "POST", body: JSON.stringify(body) }, token),

    update: (token: string, id: string, body: Partial<GallerySettings>) =>
      request<Gallery>(`/events/${id}`, { method: "PATCH", body: JSON.stringify(body) }, token),

    remove: (token: string, id: string) =>
      request<{ deleted: boolean }>(`/events/${id}`, { method: "DELETE" }, token),

    /** Public: what the guest page shows before anything is uploaded. */
    bySlug: (slug: string) => request<PublicGallery>(`/events/${slug}`),

    /** The QR images are public, so a plain img src reaches them. */
    qrSvgUrl: (slug: string) => `${BASE}/events/${slug}/qr.svg`,
    qrPngUrl: (slug: string, size = 1024) => `${BASE}/events/${slug}/qr.png?size=${size}`,
  },

  photos: {
    /** Public: the approved photos a guest may see. */
    listPublic: (slug: string) => request<PublicPhoto[]>(`/events/${slug}/photos`),

    listAll: (token: string, eventId: string) =>
      request<OwnedPhoto[]>(`/events/${eventId}/photos/all`, {}, token),

    /** Public: the guest upload. No account, no token. */
    upload: (slug: string, file: File, uploaderName?: string) => {
      const form = new FormData();
      form.append("file", file);
      if (uploaderName?.trim()) form.append("uploaderName", uploaderName.trim());
      return request<PublicPhoto & { status: PhotoStatus }>(`/events/${slug}/photos`, {
        method: "POST",
        body: form,
      });
    },

    setStatus: (token: string, photoId: string, status: PhotoStatus) =>
      request<OwnedPhoto>(`/photos/${photoId}/status`, { method: "PATCH", body: JSON.stringify({ status }) }, token),

    remove: (token: string, photoId: string) =>
      request<{ deleted: boolean }>(`/photos/${photoId}`, { method: "DELETE" }, token),
  },
};
