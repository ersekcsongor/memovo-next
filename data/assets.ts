/* Every image is hot-linked from the live memovo.com CDN. Nothing is stored locally. */

const U = "https://memovo.com/wp-content/uploads";

export const LOGO = `${U}/2023/11/MEMOVO-TM-LOGO_DARK-PINK_HEX-EB8783-2-e1785123476138-1024x288.webp`;
export const PHONE = `${U}/new-phone-design-madison-and-aiden-1-1024x1024.png`;
export const BLUR_BG = `${U}/Wedding_BlurredBackgroundImage-scaled.jpg`;
export const BLUR_BG_2 = `${U}/Wedding_BlurredBackgroundImage-1-scaled.jpg`;
export const HERO_WEDDING = `${U}/MEMOVO-QR-CODE-WEDDING-PICTURES-71-scaled-e1769553001908.jpg`;
export const HERO_HOME = `${U}/MEMOVO-Bridesmaids-Feature-2-to-1.jpg`;
export const INVITE_RSVP = `${U}/Wedding-Digital-Invite-RSVP-1.png`;

export const STEP_ICONS = {
  create: `${U}/create-infographic.png`,
  scan: `${U}/scan-qr-code-infographic.png`,
  upload: `${U}/upload-infographic.png`,
  enjoy: `${U}/BuildEngagement_Seashell-e1775711547958.png`,
  download: `${U}/download-infographic.png`,
  features: `${U}/features-infographic.png`,
} as const;

export const FEATURE_ICONS = {
  social: `${U}/MEMOVO-social-engagement-galleries.png`,
  slideshow: `${U}/Infographics_Pink_-34-e1764633161323.png`,
  guestbook: `${U}/Infographics_Pink_Guestnbook_Written-e1766025211351.png`,
  invite: `${U}/digitial-invitations-and-rsvp-infographgic-1024x1024.png`,
  qr: `${U}/Infographics_Pink_QRCode-e1766025365541.png`,
  canva: `${U}/Infographics_Pink_CanvaTemplate-e1766025417959.png`,
  albums: `${U}/Infographics_Pink_-23-e1764632906576.png`,
  zip: `${U}/Infographics_Pink_-24-e1764633884638.png`,
} as const;

const T = `${U}/elementor/thumbs`;

export const TEMPLATE_PHOTOS = [
  { src: `${T}/IMG_1430-scaled-rif3nlnxbfvfzodmgbnc5uoj5l567gqdscnmvy32lg.jpg`, alt: "Floral display with a QR code sign on an easel at an outdoor ceremony" },
  { src: `${T}/MEMOVO-April-2023-26-scaled-rif3nwxzlgavuzx8mgiuzru2a7lkrtz5twhgn9mcis.jpg`, alt: "I Spy game card with a QR code" },
  { src: `${T}/MEMOVO-QR-CODE-WEDDING-PICTURES-2-scaled-e1771461047276-rjcz3tcpl3yfcgva1fke4sb0syku5jjcu8g4smsu78.jpg`, alt: "Wedding QR code signage" },
  { src: `${T}/IMG_4990-scaled-rif3o0pccsg15frs0i5d9qvwnr31mme36f3ekdgrtw.jpg`, alt: "Wedding banner with the couple's names and a QR code" },
  { src: `${T}/MEMOVO-Mini-Take-Home-Card-Script-1-scaled-rie81zjtvukclgtrbl09fxb4zgasb2he1om3a0u57o.jpg`, alt: "Mini take-home QR code card" },
  { src: `${T}/Guest-Pix-Aug-2024-4-copy-scaled-rif3pm1hxomitnghpoxlzuf0w98fo5ppqaw0u93rac.jpg`, alt: "Wedding table card template" },
  { src: `${T}/MEMOVO-QR-CODE-WEDDING-PICTURES-320-scaled-rif3pqqovusyfp9ny8yqub8bv6l9qn8dey5g8mwsf8.jpg`, alt: "Guest scanning a wedding QR code" },
  { src: `${T}/IMG_5005-scaled-rif3pgegsoesvzoommhukvu9by08dz3bpiz3ylc4bo.jpg`, alt: "Two champagne glasses with a video message card at a reception" },
] as const;

export const GALLERY_PHOTOS = [
  { src: `${T}/IMG_5705-1-scaled-rlqutiqglrll8cxk97fyb6sk1in3j1laqiylfynizo.jpg`, alt: "Guests enjoying an event" },
  { src: `${T}/MEMOVO-QR-CODE-WEDDING-PICTURES-255-scaled-rif3ns8sna4g8y42dwhq5b0rba8qpcgi59818vtbdw.jpg`, alt: "Wedding QR code signage" },
  { src: `${T}/IMG_4990-scaled-rif3o0pccsg15frs0i5d9qvwnr31mme36f3ekdgrtw.jpg`, alt: "Wedding welcome banner with a QR code" },
  { src: `${T}/IMG_1430-scaled-rif3nlnxbfvfzodmgbnc5uoj5l567gqdscnmvy32lg.jpg`, alt: "Floral display with a QR code sign" },
  { src: `${T}/MEMOVO-April-2023-26-scaled-rif3nwxzlgavuzx8mgiuzru2a7lkrtz5twhgn9mcis.jpg`, alt: "I Spy game card with a QR code" },
  { src: `${T}/Guest-Pix-Nov-2024-216-scaled-rlqux0ou1ke0g3ultpvylb0bn5ea6hhbvudnr1grtw.jpg`, alt: "Couple celebrating their wedding day" },
  { src: `${T}/MEMOVO-Mini-Take-Home-Card-Script-1-scaled-rie81zjtvukclgtrbl09fxb4zgasb2he1om3a0u57o.jpg`, alt: "Mini take-home QR code card" },
  { src: `${T}/IMG_5005-scaled-rif3pgegsoesvzoommhukvu9by08dz3bpiz3ylc4bo.jpg`, alt: "Video message card at a reception" },
] as const;

export const PRESS_LOGOS = [
  { src: `${U}/Marie-Claire-logo-scaled-e1776127405838.png`, alt: "Marie Claire" },
  { src: `${U}/bridal-journey-logo.png`, alt: "The Bridal Journey" },
  { src: `${U}/the-knot-logo.png`, alt: "The Knot" },
  { src: `${U}/Cosmopolitan-logo.png`, alt: "Cosmopolitan" },
  { src: `${U}/FINANCIAL-REVIEW-LOGO.png`, alt: "Australian Financial Review" },
  { src: `${U}/DAILY-MAIL-LOGO-1.png`, alt: "Daily Mail" },
  { src: `${U}/polka-dot-weddings-bw.png`, alt: "Polka Dot Weddings" },
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
  { src: "https://cdn.weglot.com/flags/square/gb.svg", alt: "English" },
  { src: "https://cdn.weglot.com/flags/square/es.svg", alt: "Espanol" },
  { src: "https://cdn.weglot.com/flags/square/fr.svg", alt: "Francais" },
  { src: "https://cdn.weglot.com/flags/square/de.svg", alt: "Deutsch" },
  { src: "https://cdn.weglot.com/flags/square/it.svg", alt: "Italiano" },
  { src: "https://cdn.weglot.com/flags/square/jp.svg", alt: "Japanese" },
] as const;

/** One celebration photo per customer review, keyed by the reviewer's first name. */
export const REVIEW_PHOTOS = {
  melanie: { src: `${U}/IMG_5257-1-scaled-e1763438563896.jpg`, alt: "Couple on their wedding day" },
  kithy: { src: `${U}/IMG_9118-scaled.jpg`, alt: "Couple celebrating their engagement" },
  nicolette: { src: `${T}/MEMOVO-QR-CODE-WEDDING-PICTURES-320-scaled-rif3pqqovusyfp9ny8yqub8bv6l9qn8dey5g8mwsf8.jpg`, alt: "Guest scanning a wedding QR code" },
  kimberly: { src: `${T}/Guest-Pix-Nov-2024-216-scaled-rlqux0ou1ke0g3ultpvylb0bn5ea6hhbvudnr1grtw.jpg`, alt: "Couple celebrating their wedding day" },
  christopher: { src: `${T}/IMG_5705-1-scaled-rlqutiqglrll8cxk97fyb6sk1in3j1laqiylfynizo.jpg`, alt: "Guests enjoying an event" },
  kate: { src: `${U}/MEMOVO-QR-CODE-WEDDING-PICTURES-71-scaled-e1769553001908.jpg`, alt: "Wedding celebration with a QR code sign" },
} as const;

export const WHATS_NEW_IMG = `${U}/memovo-youtube-overlay-768.webp`;
export const PODCAST_IMG = `${T}/M0DE_b71xqtpp7HYsNWpa_Q1pEoUlA-rog5f21uy258eh19kbxtwf9g8tndwp6vzl52bgicx0.png`;
export const COUPLE_IMG = `${T}/Guest-Pix-Nov-2024-216-scaled-rlqux0ou1ke0g3ultpvylb0bn5ea6hhbvudnr1grtw.jpg`;
