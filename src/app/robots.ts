import type { MetadataRoute } from "next";

const privatePaths = ["/cont", "/admin", "/login", "/inregistrare", "/api"];

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
