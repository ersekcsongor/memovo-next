import { FEATURE_ICONS, STEP_ICONS } from "./assets";

/** `key` names the translation entries `<key>.title` and `<key>.body`. */
export type Step = { icon: string; key: string };
export type Feature = { icon: string; key: string };
/**
 * `usd` is the base amount; a null amount renders the "Contact Us" label instead.
 * `note` and `items` hold translation keys.
 */
export type Plan = { name: string; usd: number | null; note: string; items: string[]; featured?: boolean };

export const STEPS: Step[] = [
  { icon: STEP_ICONS.create, key: "steps.create" },
  { icon: STEP_ICONS.scan, key: "steps.scan" },
  { icon: STEP_ICONS.upload, key: "steps.upload" },
  { icon: STEP_ICONS.enjoy, key: "steps.enjoy" },
  { icon: STEP_ICONS.download, key: "steps.download" },
  { icon: STEP_ICONS.features, key: "steps.features" },
];

export const FEATURES: Feature[] = [
  { icon: FEATURE_ICONS.social, key: "features.social" },
  { icon: FEATURE_ICONS.slideshow, key: "features.slideshow" },
  { icon: FEATURE_ICONS.guestbook, key: "features.guestbook" },
  { icon: FEATURE_ICONS.invite, key: "features.invite" },
  { icon: FEATURE_ICONS.qr, key: "features.qr" },
  { icon: FEATURE_ICONS.canva, key: "features.canva" },
  { icon: FEATURE_ICONS.albums, key: "features.albums" },
  { icon: FEATURE_ICONS.zip, key: "features.zip" },
];

export const WEDDING_PLANS: Plan[] = [
  {
    name: "CLASSIC",
    usd: 49,
    note: "plan.note.one",
    items: [
      "plan.gallery1",
      "plan.unlimitedAll",
      "plan.moderation",
      "plan.guestbook",
      "plan.hosting3",
      "plan.canva",
    ],
  },
  {
    name: "SIGNATURE",
    usd: 89,
    note: "plan.note.one",
    featured: true,
    items: [
      "plan.gallery1",
      "plan.theme",
      "plan.superAlbums",
      "plan.moderationGuestbook",
      "plan.hosting12",
      "plan.canva",
    ],
  },
  {
    name: "SIGNATURE BUNDLE",
    usd: 119,
    note: "plan.note.three",
    items: [
      "plan.galleries3",
      "plan.qr3",
      "plan.theme",
      "plan.superAlbums",
      "plan.hosting24",
      "plan.canva",
    ],
  },
];

/** Each entry names the translation pair `faq.<key>.q` and `faq.<key>.a`. */
export const WEDDING_FAQS = ["package", "app", "payment", "privacy", "after", "when"];

export const ALL_FAQS = [...WEDDING_FAQS, "guests", "languages"];

/** Plain descriptive colour names, written for Memovo rather than carried over. */
export const THEMES = [
  { name: "Blush Petal", color: "#F7C9C6" },
  { name: "Red Lantern", color: "#C0392B" },
  { name: "Linen and Gold", color: "#E4D2BE" },
  { name: "Still Water", color: "#638789" },
  { name: "Apricot Hour", color: "#FCBE87" },
  { name: "Meadow Gold", color: "#F4C430" },
  { name: "Coral Dusk", color: "#E58783" },
  { name: "Mulled Wine", color: "#B03A48" },
  { name: "Olive Grove", color: "#9CAF88" },
  { name: "Raspberry", color: "#E75480" },
  { name: "Autumn Spice", color: "#D2691E" },
  { name: "Open Sky", color: "#87CEEB" },
  { name: "Walnut", color: "#8B7355" },
  { name: "Soft Ivory", color: "#F9F4EF" },
  { name: "Deep Harbour", color: "#0077BE" },
  { name: "Peach Sunset", color: "#FF8C69" },
  { name: "Sandstone", color: "#C4A484" },
  { name: "Midnight", color: "#072A47" },
  { name: "Charcoal", color: "#333333" },
  { name: "Paper", color: "#FFFFFF" },
] as const;

