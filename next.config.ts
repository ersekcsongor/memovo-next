import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The static site one level up has its own lockfile, so pin the root here.
  turbopack: { root: path.resolve(__dirname) },
  /* The dev server answers `_next/static` only for origins named here. A phone on
     the same WiFi reaches the machine by its LAN address, and without these the
     page arrives with every script refused and nothing on it works. Development
     only: a production build serves its assets to anyone. */
  allowedDevOrigins: ["192.168.1.11", "192.168.1.*", "10.*.*.*", "172.16.*.*"],
  images: {
    // Every image ships in public/, so the optimizer reads them off disk and no
    // remote host is involved. Optimized copies stay cached for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
