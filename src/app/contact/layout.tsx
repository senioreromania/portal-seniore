import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Contact — Seniore.ro",
  description:
    "Contactează Seniore.ro. Întrebări despre cămine de bătrâni, licențiere, adăugare centrul tău în portal sau colaborări.",
  path: "/contact",
  keywords: ["contact cămine bătrâni", "contact portal îngrijire vârstnici"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
