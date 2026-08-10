import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Membri — Seniore.ro",
  description:
    "Lista membrilor Seniore.ro. Cămine și centre de îngrijire pentru vârstnici care respectă standarde de calitate și etică profesională.",
  path: "/membri",
  keywords: [
    "membri cămine bătrâni",
    "cămine licențiate România",
    "centre îngrijire vârstnici",
  ],
});

export default function MembriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
