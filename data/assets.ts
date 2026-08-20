/* Every image is served from public/images. Nothing is loaded from a remote host. */

const U = "/images";

export const PHONE = `${U}/new-phone-design-madison-and-aiden-1-1024x1024.png`;
export const BLUR_BG = `${U}/Wedding_BlurredBackgroundImage-scaled.jpg`;
export const BLUR_BG_2 = `${U}/Wedding_BlurredBackgroundImage-1-scaled.jpg`;
export const HERO_WEDDING = `${U}/MEMOVO-QR-CODE-WEDDING-PICTURES-71-scaled-e1769553001908.jpg`;
export const HERO_HOME = `${U}/MEMOVO-Bridesmaids-Feature-2-to-1.jpg`;
export const INVITE_RSVP = `${U}/Wedding-Digital-Invite-RSVP-1.png`;

/* The step and feature icons are Tabler components, named in data/content.ts.
   They inherit the brand pink from `text-coral`, so they cannot drift off-palette. */

export const TEMPLATE_PHOTOS = [
  { src: `${U}/IMG_1430-scaled-rif3nlnxbfvfzodmgbnc5uoj5l567gqdscnmvy32lg.jpg`, alt: "Floral display with a QR code sign on an easel at an outdoor ceremony" },
  { src: `${U}/MEMOVO-April-2023-26-scaled-rif3nwxzlgavuzx8mgiuzru2a7lkrtz5twhgn9mcis.jpg`, alt: "I Spy game card with a QR code" },
  { src: `${U}/MEMOVO-QR-CODE-WEDDING-PICTURES-2-scaled-e1771461047276-rjcz3tcpl3yfcgva1fke4sb0syku5jjcu8g4smsu78.jpg`, alt: "Wedding QR code signage" },
  { src: `${U}/IMG_4990-scaled-rif3o0pccsg15frs0i5d9qvwnr31mme36f3ekdgrtw.jpg`, alt: "Wedding banner with the couple's names and a QR code" },
  { src: `${U}/MEMOVO-Mini-Take-Home-Card-Script-1-scaled-rie81zjtvukclgtrbl09fxb4zgasb2he1om3a0u57o.jpg`, alt: "Mini take-home QR code card" },
  { src: `${U}/memovo-Aug-2024-4-copy-scaled-rif3pm1hxomitnghpoxlzuf0w98fo5ppqaw0u93rac.jpg`, alt: "Wedding table card template" },
  { src: `${U}/MEMOVO-QR-CODE-WEDDING-PICTURES-320-scaled-rif3pqqovusyfp9ny8yqub8bv6l9qn8dey5g8mwsf8.jpg`, alt: "Guest scanning a wedding QR code" },
  { src: `${U}/IMG_5005-scaled-rif3pgegsoesvzoommhukvu9by08dz3bpiz3ylc4bo.jpg`, alt: "Two champagne glasses with a video message card at a reception" },
] as const;

export const GALLERY_PHOTOS = [
  { src: `${U}/IMG_5705-1-scaled-rlqutiqglrll8cxk97fyb6sk1in3j1laqiylfynizo.jpg`, alt: "Guests enjoying an event" },
  { src: `${U}/MEMOVO-QR-CODE-WEDDING-PICTURES-255-scaled-rif3ns8sna4g8y42dwhq5b0rba8qpcgi59818vtbdw.jpg`, alt: "Wedding QR code signage" },
  { src: `${U}/IMG_4990-scaled-rif3o0pccsg15frs0i5d9qvwnr31mme36f3ekdgrtw.jpg`, alt: "Wedding welcome banner with a QR code" },
  { src: `${U}/IMG_1430-scaled-rif3nlnxbfvfzodmgbnc5uoj5l567gqdscnmvy32lg.jpg`, alt: "Floral display with a QR code sign" },
  { src: `${U}/MEMOVO-April-2023-26-scaled-rif3nwxzlgavuzx8mgiuzru2a7lkrtz5twhgn9mcis.jpg`, alt: "I Spy game card with a QR code" },
  { src: `${U}/memovo-Nov-2024-216-scaled-rlqux0ou1ke0g3ultpvylb0bn5ea6hhbvudnr1grtw.jpg`, alt: "Couple celebrating their wedding day" },
  { src: `${U}/MEMOVO-Mini-Take-Home-Card-Script-1-scaled-rie81zjtvukclgtrbl09fxb4zgasb2he1om3a0u57o.jpg`, alt: "Mini take-home QR code card" },
  { src: `${U}/IMG_5005-scaled-rif3pgegsoesvzoommhukvu9by08dz3bpiz3ylc4bo.jpg`, alt: "Video message card at a reception" },
] as const;

export const HOME_TILES = [
  { href: "/weddings", label: "Weddings", src: `${U}/IMG_5257-1-scaled-e1763438563896.jpg` },
  { href: "/events/party", label: "Parties", src: `${U}/PartyPackageImage.jpg` },
  { href: "/events/business", label: "Business", src: `${U}/HeaderImage_Business_HowitWorks-scaled-e1758597542624.jpg` },
  { href: "/events/memorials", label: "Memorials", src: `${U}/MemorialPackageImage.jpg` },
  { href: "/events/engagements", label: "Engagements", src: `${U}/IMG_9118-scaled.jpg` },
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
export const PODCAST_IMG = `${U}/M0DE_b71xqtpp7HYsNWpa_Q1pEoUlA-rog5f21uy258eh19kbxtwf9g8tndwp6vzl52bgicx0.png`;
export const COUPLE_IMG = `${U}/memovo-Nov-2024-216-scaled-rlqux0ou1ke0g3ultpvylb0bn5ea6hhbvudnr1grtw.jpg`;
