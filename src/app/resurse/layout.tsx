import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Resurse și legislație — Seniore.ro",
  description:
    "Resurse, legislație și cadre legale pentru căminele de bătrâni din România. Legi, norme metodologice, ghiduri de licențiere și documente utile.",
  path: "/resurse",
  keywords: [
    "legislație cămine bătrâni",
    "resurse asistență socială",
    "norme licențiere",
    "cadru legal îngrijire vârstnici",
  ],
});

export default function ResurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
