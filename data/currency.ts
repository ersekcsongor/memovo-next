export const CURRENCIES = ["USD", "AUD", "GBP", "CAD", "EUR", "INR"] as const;

export type Currency = (typeof CURRENCIES)[number];

/** Prices are stored in USD; these rates render them in the currency the visitor picks. */
export const CURRENCY_META: Record<Currency, { symbol: string; rate: number; round: number }> = {
  USD: { symbol: "$", rate: 1, round: 1 },
  AUD: { symbol: "AU $", rate: 1.52, round: 1 },
  GBP: { symbol: "£", rate: 0.79, round: 1 },
  CAD: { symbol: "CA $", rate: 1.37, round: 1 },
  EUR: { symbol: "€", rate: 0.92, round: 1 },
  INR: { symbol: "₹", rate: 83, round: 100 },
};

/** Formats a USD amount in the given currency. A null amount renders as a fallback label. */
export function formatPrice(usd: number | null, currency: Currency, fallback: string): string {
  if (usd === null) return fallback;
  const { symbol, rate, round } = CURRENCY_META[currency];
  const value = Math.round((usd * rate) / round) * round;
  return `${symbol}${value.toLocaleString("en-US")}`;
}
