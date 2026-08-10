import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Petiții — Seniore.ro",
  description:
    "Petiții și demersuri oficiale pentru îmbunătățirea sistemului de îngrijire a vârstnicilor din România. Semnează și susține reformele sectorului.",
  path: "/petitii",
  keywords: [
    "petiții cămine bătrâni",
    "reformă asistență socială",
    "licențiere cămine",
  ],
});

export default function PetitiiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
