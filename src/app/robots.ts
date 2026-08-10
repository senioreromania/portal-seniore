import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/centru/", "/cont/", "/admin/", "/api/"],
    },
    sitemap: "https://www.seniore.ro/sitemap.xml",
    host: "https://www.seniore.ro",
  };
}
