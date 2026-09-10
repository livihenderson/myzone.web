import type { MetadataRoute } from "next";

const SITE_URL = "https://myzonegym.cz";

// Static date so the sitemap doesn't churn lastModified on every build.
const LAST_MODIFIED = "2026-06-20";

export default function sitemap(): MetadataRoute.Sitemap {
  // /rezervovat is intentionally omitted - it's a thin "booking coming soon"
  // status page and is set to noindex (see app/rezervovat/layout.tsx).
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/o-nas`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/fotogalerie`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gdpr`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/obchodni-podminky`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
