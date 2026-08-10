import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Politica de cookies — Seniore.ro",
  description:
    "Politica de cookies a portalului Seniore.ro. Ce cookie-uri folosim și cum le poți gestiona.",
  path: "/cookies",
});

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
