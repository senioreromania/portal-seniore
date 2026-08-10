import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Politica de confidențialitate — Seniore.ro",
  description:
    "Politica de confidențialitate a portalului Seniore.ro. Cum colectăm, folosim și protejăm datele personale ale utilizatorilor.",
  path: "/confidentialitate",
});

export default function ConfidentialitateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
