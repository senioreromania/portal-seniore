import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Cămine de bătrâni licențiate MMJS — Listă completă România",
  description:
    "Lista completă a căminelor de bătrâni licențiate de Ministerul Muncii și Solidarității Sociale din România. Filtrează după județ, capacitate, rating.",
  path: "/camine-autorizate",
  keywords: [
    "cămine licențiate",
    "cămine autorizate MMJS",
    "licență asistență socială",
    "cămine de bătrâni licențați România",
  ],
});

export default function CamineAutorizateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
