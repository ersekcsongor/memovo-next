/**
 * Puts values into a translated string's `{name}` slots.
 *
 * `useT` returns the sentence for the current language and nothing more, so the
 * numbers and names go in here. A slot with no value keeps its braces, which
 * makes a missing value visible instead of silently printing "undefined".
 */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}
