import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sources are pre-optimized WebP in /public/photos; AVIF gives a final
    // compression pass, WebP is the fallback. The optimizer cache (below)
    // keeps the CPU-bound VPS from re-encoding on every request.
    formats: ["image/avif", "image/webp"],
    // Only 75 is used today; keep it explicit so the optimizer caches a
    // single quality variant per size.
    qualities: [75],
    // 30 days — optimized variants survive so the VPS stops re-encoding.
    minimumCacheTTL: 2592000,
    // The layouts request at most ~92vw (gallery) / 50vw (facility cards);
    // the 3840 entry is never needed, so trim the top end.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
