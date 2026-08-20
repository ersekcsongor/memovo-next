import {
  IconCirclePlus,
  IconDownload,
  IconFileZip,
  IconHeartHandshake,
  IconMailHeart,
  IconMessage2Heart,
  IconPhotoHeart,
  IconPhotoUp,
  IconQrcode,
  IconScan,
  IconSettings,
  IconSlideshow,
  IconSparkles,
  IconTemplate,
  type Icon,
} from "@tabler/icons-react";

/** `key` names the translation entries `<key>.title` and `<key>.body`. */
export type Step = { Icon: Icon; key: string };
export type Feature = { Icon: Icon; key: string };
/**
 * `usd` is the base amount; a null amount renders the "Contact Us" label instead.
 * `note` and `items` hold translation keys.
 */
export type Plan = { name: string; usd: number | null; note: string; items: string[]; featured?: boolean; cta?: string };

export const STEPS: Step[] = [
  { Icon: IconCirclePlus, key: "steps.create" },
  { Icon: IconScan, key: "steps.scan" },
  { Icon: IconPhotoUp, key: "steps.upload" },
  { Icon: IconSparkles, key: "steps.enjoy" },
  { Icon: IconDownload, key: "steps.download" },
  { Icon: IconSettings, key: "steps.features" },
];

export const FEATURES: Feature[] = [
  { Icon: IconHeartHandshake, key: "features.social" },
  { Icon: IconSlideshow, key: "features.slideshow" },
  { Icon: IconMessage2Heart, key: "features.guestbook" },
  { Icon: IconMailHeart, key: "features.invite" },
  { Icon: IconQrcode, key: "features.qr" },
  { Icon: IconTemplate, key: "features.canva" },
  { Icon: IconPhotoHeart, key: "features.albums" },
  { Icon: IconFileZip, key: "features.zip" },
];

/** Three tiers priced per event, as set out in the design. */
export const WEDDING_PLANS: Plan[] = [
  {
    name: "Starter",
    usd: 19,
    note: "plan.note.starter",
    items: ["plan.photos500", "plan.qrForGuests", "plan.privateGallery", "plan.hqDownload"],
    cta: "plan.chooseStarter",
  },
  {
    name: "Pro",
    usd: 29,
    note: "plan.note.pro",
    featured: true,
    items: ["plan.unlimitedPhotos", "plan.customEventPage", "plan.advancedSettings", "plan.prioritySupport"],
    cta: "plan.choosePro",
  },
  {
    name: "Premium",
    usd: 49,
    note: "plan.note.premium",
    items: ["plan.everythingInPro", "plan.multipleQr", "plan.branding", "plan.dedicatedSupport"],
    cta: "plan.choosePremium",
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

