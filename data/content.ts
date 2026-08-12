import { FEATURE_ICONS, REVIEW_PHOTOS, STEP_ICONS } from "./assets";

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

/** Quotes stay in English — they are verbatim words from named people. `photo` carries
 *  a celebration photo for the home page carousel; the review grids ignore it. */
export const REVIEWS = [
  { name: "Melanie F.", photo: REVIEW_PHOTOS.melanie, quote: "Memovo was so easy to set up and even easier for our guests to use. We ended up with so many amazing photos and videos we would have never had otherwise. I'm so glad we chose to do this!" },
  { name: "Kithy C.", photo: REVIEW_PHOTOS.kithy, quote: "Perfect site to store pictures and videos from our guests during the wedding." },
  { name: "Nicolette G.", photo: REVIEW_PHOTOS.nicolette, quote: "Innovative and stress free." },
  { name: "Kimberly Cullen", photo: REVIEW_PHOTOS.kimberly, quote: "Such a fun and seamless process for our guests! It was easy to get copies made for our wedding celebration. Most of all, immediate gratification to see pictures from everyone's perspective." },
  { name: "Christopher Fox", photo: REVIEW_PHOTOS.christopher, quote: "Simple, straight forward to set up. Worked for all 40 guests, all phones, all devices. Perfect." },
  { name: "Kate H.", photo: REVIEW_PHOTOS.kate, quote: "The best money spent! We are so glad that we could give our guests the best opportunity to share their experience of our wedding day! They uploaded and shared some amazing moments from the day and we are so grateful!" },
];

export const ALL_FAQS = [...WEDDING_FAQS, "guests", "languages"];

export const THEMES = [
  { name: "Sherbet Lollypop", color: "#F7C9C6" },
  { name: "Chinese New Year", color: "#C0392B" },
  { name: "Champagne and Tuxedos", color: "#E4D2BE" },
  { name: "Evermore", color: "#638789" },
  { name: "Quinceanera", color: "#FCBE87" },
  { name: "Sunflower Fields", color: "#F4C430" },
  { name: "Lipstick Sunsets", color: "#E58783" },
  { name: "Happy Holidays", color: "#B03A48" },
  { name: "Sage Sunsets", color: "#9CAF88" },
  { name: "Cosmopolitan Pink", color: "#E75480" },
  { name: "Pumpkin Patch", color: "#D2691E" },
  { name: "Sky Blue", color: "#87CEEB" },
  { name: "Earthy Luxe", color: "#8B7355" },
  { name: "Feminine Classic", color: "#F9F4EF" },
  { name: "Ocean Blue", color: "#0077BE" },
  { name: "Summer Sunset", color: "#FF8C69" },
  { name: "Earthy Florals", color: "#C4A484" },
  { name: "Default", color: "#072A47" },
  { name: "Monochrome", color: "#333333" },
  { name: "Monochrome Inverted", color: "#FFFFFF" },
] as const;

