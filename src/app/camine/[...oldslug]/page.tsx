import { permanentRedirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase-server";
import { normalizeJudet, slugifyJudet } from "@/lib/seo";
import camineData from "@/data/camine-director.json";

type Camin = {
  slug: string;
  judet: string;
};

export const revalidate = 3600;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function OldCaminRedirect({
  params,
}: {
  params: Promise<{ oldslug: string[] }>;
}) {
  const { oldslug } = await params;

  // Only handle single-segment old URLs: /camine/[slug]
  // Multi-segment URLs like /camine/[judet]/[slug] are handled by the nested route
  if (oldslug.length !== 1) {
    notFound();
  }

  const slug = oldslug[0];

  const jsonCamin = (camineData as Camin[]).find((c) => c.slug === slug);
  if (jsonCamin) {
    const judetSlug = slugifyJudet(normalizeJudet(jsonCamin.judet) || jsonCamin.judet);
    permanentRedirect(`/camine/${judetSlug}/${slug}`);
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("camine")
    .select("judet")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (data?.judet) {
    const judetSlug = slugifyJudet(normalizeJudet(data.judet) || data.judet);
    permanentRedirect(`/camine/${judetSlug}/${slug}`);
  }

  notFound();
}
