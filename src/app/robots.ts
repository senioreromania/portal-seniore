import type { MetadataRoute } from "next";

// Only block non-HTML paths (API routes) from crawling.
// Auth/account pages (/cont, /admin, /login, /inregistrare) use
// `robots: { index: false }` metadata instead — blocking them in
// robots.txt prevents Google from reading the noindex directive,
// causing "Indexed, though blocked by robots.txt" warnings.
const privatePaths = ["/api"];

const aiCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...aiCrawlers.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: privatePaths,
      })),
    ],
    sitemap: "https://www.seniore.ro/sitemap.xml",
    host: "https://www.seniore.ro",
  };
}
