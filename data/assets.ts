/* Every image is served from public/images. Nothing is loaded from a remote host. */

const U = "/images";

export const PHONE = `${U}/phone-invite.png`;
export const BLUR_BG = `${U}/backdrop-blur.jpg`;
export const BLUR_BG_2 = `${U}/backdrop-blur-2.jpg`;
export const HERO_WEDDING = `${U}/hero-wedding.jpg`;
/** The hero photo carries the page now, so it is described rather than hidden. */
export const HERO_WEDDING_ALT = "A bride and groom together on their wedding day";
export const HERO_HOME = `${U}/hero-home.jpg`;
export const INVITE_RSVP = `${U}/invite-rsvp.png`;

/* The step and feature icons are Tabler components, named in data/content.ts.
   They inherit the brand pink from `text-coral`, so they cannot drift off-palette. */

export const TEMPLATE_PHOTOS = [
  { src: `${U}/reception-venue.jpg`, alt: "A reception room laid out with florals and the cake" },
  { src: `${U}/outdoor-table.jpg`, alt: "An outdoor table laid under string lights" },
  { src: `${U}/phone-confetti.jpg`, alt: "A phone catching a cascade of confetti" },
  { src: `${U}/welcome-sign.jpg`, alt: "A wooden sign asking guests to capture the day" },
  { src: `${U}/floral-table.jpg`, alt: "A floral centrepiece on a rustic table" },
  { src: `${U}/couple-dancing.jpg`, alt: "The couple dancing among their guests" },
  { src: `${U}/toast.jpg`, alt: "Guests raising their glasses for a toast" },
  { src: `${U}/table-setting.jpg`, alt: "Glasses, plates and candles laid for dinner" },
] as const;

export const GALLERY_PHOTOS = [
  { src: `${U}/guests-celebrating.jpg`, alt: "Friends in party hats among falling confetti" },
  { src: `${U}/phones-out.jpg`, alt: "A guest photographing her friends on a phone" },
  { src: `${U}/welcome-sign.jpg`, alt: "A wooden sign asking guests to capture the day" },
  { src: `${U}/floral-table.jpg`, alt: "A floral centrepiece on a rustic table" },
  { src: `${U}/table-setting.jpg`, alt: "Glasses, plates and candles laid for dinner" },
  { src: `${U}/couple-dancing.jpg`, alt: "The couple dancing among their guests" },
  { src: `${U}/printed-keepsakes.jpg`, alt: "Instant prints scattered with confetti" },
  { src: `${U}/toast.jpg`, alt: "Guests raising their glasses for a toast" },
] as const;

export const HOME_TILES = [
  { href: "/weddings", label: "Weddings", src: `${U}/tile-weddings.jpg` },
  { href: "/events/party", label: "Parties", src: `${U}/PartyPackageImage.jpg` },
  { href: "/events/business", label: "Business", src: `${U}/tile-business.jpg` },
  { href: "/events/memorials", label: "Memorials", src: `${U}/MemorialPackageImage.jpg` },
  { href: "/events/engagements", label: "Engagements", src: `${U}/tile-engagements.jpg` },
  { href: "/events/kids-parties", label: "Kids Parties", src: `${U}/memovo-kids-parties-square-800.webp` },
] as const;

export const FLAGS = [
  { src: "/flags/gb.svg", alt: "English" },
  { src: "/flags/es.svg", alt: "Espanol" },
  { src: "/flags/fr.svg", alt: "Francais" },
  { src: "/flags/de.svg", alt: "Deutsch" },
  { src: "/flags/it.svg", alt: "Italiano" },
  { src: "/flags/jp.svg", alt: "Japanese" },
] as const;

/** One celebration photo per customer review, keyed by the reviewer's first name. */
export const WHATS_NEW_IMG = `${U}/memovo-youtube-overlay-768.webp`;
export const PODCAST_IMG = `${U}/podcast-cover.png`;
export const COUPLE_IMG = `${U}/couple-celebrating.jpg`;
