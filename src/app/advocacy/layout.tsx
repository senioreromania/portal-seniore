import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Advocacy — Seniore.ro",
  description:
    "Activități de advocacy pentru sectorul îngrijirii vârstnicilor din România. Reforme legislative, simplificarea licențierii, dialog cu autoritățile.",
  path: "/advocacy",
  keywords: [
    "advocacy cămine bătrâni",
    "legislație asistență socială",
    "reformă licențiere",
    "îngrijire vârstnici România",
  ],
});

export default function AdvocacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
