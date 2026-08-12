import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The static site one level up has its own lockfile, so pin the root here.
  turbopack: { root: path.resolve(__dirname) },
  images: {
    // Every image ships in public/, so the optimizer reads them off disk and no
    // remote host is involved. Optimized copies stay cached for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
