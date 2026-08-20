/* Every image is served from public/images. Nothing is loaded from a remote host. */

const U = "/images";

export const PHONE = `${U}/phone-invite.png`;
export const BLUR_BG = `${U}/backdrop-blur.jpg`;
export const BLUR_BG_2 = `${U}/backdrop-blur-2.jpg`;
export const HERO_WEDDING = `${U}/hero-wedding.jpg`;
export const HERO_HOME = `${U}/hero-home.jpg`;
export const INVITE_RSVP = `${U}/invite-rsvp.png`;

/* The step and feature icons are Tabler components, named in data/content.ts.
   They inherit the brand pink from `text-coral`, so they cannot drift off-palette. */

export const TEMPLATE_PHOTOS = [
  { src: `${U}/floral-qr-sign.jpg`, alt: "Floral display with a QR code sign on an easel at an outdoor ceremony" },
  { src: `${U}/i-spy-card.jpg`, alt: "I Spy game card with a QR code" },
  { src: `${U}/qr-signage.jpg`, alt: "Wedding QR code signage" },
  { src: `${U}/welcome-banner.jpg`, alt: "Wedding banner with the couple's names and a QR code" },
  { src: `${U}/take-home-card.jpg`, alt: "Mini take-home QR code card" },
  { src: `${U}/table-card.jpg`, alt: "Wedding table card template" },
  { src: `${U}/guest-scanning.jpg`, alt: "Guest scanning a wedding QR code" },
  { src: `${U}/video-message.jpg`, alt: "Two champagne glasses with a video message card at a reception" },
] as const;

export const GALLERY_PHOTOS = [
  { src: `${U}/guests-celebrating.jpg`, alt: "Guests enjoying an event" },
  { src: `${U}/qr-signage-2.jpg`, alt: "Wedding QR code signage" },
  { src: `${U}/welcome-banner.jpg`, alt: "Wedding welcome banner with a QR code" },
  { src: `${U}/floral-qr-sign.jpg`, alt: "Floral display with a QR code sign" },
  { src: `${U}/i-spy-card.jpg`, alt: "I Spy game card with a QR code" },
  { src: `${U}/couple-celebrating.jpg`, alt: "Couple celebrating their wedding day" },
  { src: `${U}/take-home-card.jpg`, alt: "Mini take-home QR code card" },
  { src: `${U}/video-message.jpg`, alt: "Video message card at a reception" },
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
