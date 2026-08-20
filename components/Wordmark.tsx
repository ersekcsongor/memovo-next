/**
 * Text wordmark, standing in until there is a real logo file.
 * Set in the site's heading face so it matches the rest of the brand.
 */
export default function Wordmark({ className = "", tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  return (
    <span className={`font-heading leading-none font-bold tracking-tight ${tone === "light" ? "text-white" : "text-coral-ink"} ${className}`}>
      memovo
      <span className="align-super text-xs font-normal">™</span>
    </span>
  );
}
