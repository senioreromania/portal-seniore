import type { Metadata } from "next";
import { buildStiriListMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStiriListMetadata();

export default function StiriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
