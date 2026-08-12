import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The static site one level up has its own lockfile, so pin the root here.
  turbopack: { root: path.resolve(__dirname) },
  images: {
    // Images are served from the live guestpix.com CDN, nothing is stored locally.
    // Requests go through the built-in optimizer, which caches each file on disk.
    // The CDN drops requests when a page fires 30+ of them at once.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "guestpix.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "cdn.weglot.com", pathname: "/flags/**" },
    ],
  },
};

export default nextConfig;
