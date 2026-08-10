import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Adaugă centrul tău în portal — Seniore.ro",
  description:
    "Adaugă gratuit căminul tău de bătrâni în portalul național. Fii descoperit de familiile care caută îngrijire pentru vârstnici. Incluziune gratuită pentru toate căminele licențiate.",
  path: "/cum-functioneaza",
  keywords: [
    "adaugă cămin bătrâni",
    "înregistrare cămin portal",
    "listare cămin îngrijire",
    "promovare cămin bătrâni",
  ],
});

export default function AdaugaCentruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
