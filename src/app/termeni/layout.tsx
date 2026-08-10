import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Termeni și condiții — Seniore.ro",
  description:
    "Termeni și condiții de utilizare a portalului Seniore.ro. Reguli pentru utilizatori și furnizori de servicii.",
  path: "/termeni",
});

export default function TermeniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
