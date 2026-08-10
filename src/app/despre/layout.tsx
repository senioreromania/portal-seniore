import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Despre Seniore.ro — Portal național îngrijire vârstnici",
  description:
    "Seniore.ro — portal național dedicat îngrijirii vârstnicilor. Misiunea noastră: să conectăm familiile cu cămine licențiate și să promovăm standarde de calitate în asistența socială.",
  path: "/despre",
  keywords: [
    "despre cămine de bătrâni",
    "îngrijire vârstnici România",
    "asistență socială",
    "cămine licențiate",
  ],
});

export default function DespreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
