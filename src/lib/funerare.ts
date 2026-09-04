import { createAdminClient } from "@/lib/supabase-admin";
import { normalizeJudet, slugifyJudet } from "@/lib/seo";
import type { Metadata } from "next";

export type Funerare = {
  id: string;
  nume: string;
  judet: string;
  oras: string;
  adresa: string | null;
  telefon: string | null;
  email: string | null;
  website: string | null;
  descriere: string | null;
  servicii: string[] | null;
  tip: string;
  pret_pornire: number | null;
  status: string;
  is_premium: boolean;
  show_in_slider: boolean;
  highlight: string | null;
  slug: string;
  lat: number | null;
  lng: number | null;
  rating: number | null;
  reviews: number | null;
  place_id: string | null;
  google_url: string | null;
  images: string[] | null;
};

// Fetch all funerare for a judet (paginated, Supabase max 1000 per request)
export async function getFunerareByJudet(judet: string): Promise<Funerare[]> {
  const admin = createAdminClient();
  const all: Funerare[] = [];
  let offset = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await admin
      .from("funerare")
      .select("*")
      .eq("status", "approved")
      .eq("judet", judet)
      .order("is_premium", { ascending: false })
      .order("rating", { ascending: false, nullsFirst: false })
      .range(offset, offset + batchSize - 1);

    if (error || !data || data.length === 0) break;
    all.push(...(data as Funerare[]));
    if (data.length < batchSize) break;
    offset += batchSize;
  }

  return all;
}

// Fetch a single funerare by judet + slug
export async function getFunerareBySlug(
  judet: string,
  slug: string
): Promise<Funerare | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("funerare")
    .select("*")
    .eq("status", "approved")
    .eq("judet", judet)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Funerare;
}

// Fetch all funerare for a judet + oras
export async function getFunerareByOras(
  judet: string,
  oras: string
): Promise<Funerare[]> {
  const admin = createAdminClient();
  const all: Funerare[] = [];
  let offset = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await admin
      .from("funerare")
      .select("*")
      .eq("status", "approved")
      .eq("judet", judet)
      .eq("oras", oras)
      .order("is_premium", { ascending: false })
      .order("rating", { ascending: false, nullsFirst: false })
      .range(offset, offset + batchSize - 1);

    if (error || !data || data.length === 0) break;
    all.push(...(data as Funerare[]));
    if (data.length < batchSize) break;
    offset += batchSize;
  }

  return all;
}

// Get all judete that have funerare data, with counts
export async function getFunerareJudeteStats(): Promise<
  { judet: string; count: number }[]
> {
  const admin = createAdminClient();
  const allJudetes: string[] = [];
  let offset = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await admin
      .from("funerare")
      .select("judet")
      .eq("status", "approved")
      .range(offset, offset + batchSize - 1);

    if (error || !data || data.length === 0) break;
    allJudetes.push(...data.map((d: { judet: string }) => d.judet));
    if (data.length < batchSize) break;
    offset += batchSize;
  }

  const counts: Record<string, number> = {};
  for (const j of allJudetes) {
    const normalized = normalizeJudet(j);
    if (normalized) counts[normalized] = (counts[normalized] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([judet, count]) => ({ judet, count }))
    .sort((a, b) => a.judet.localeCompare(b.judet));
}

// Get total count
export async function getFunerareTotal(): Promise<number> {
  const admin = createAdminClient();
  const { count } = await admin
    .from("funerare")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  return count || 0;
}

// Get unique orase for a judet
export function getOraseFromFunerare(funerare: Funerare[]): string[] {
  const set = new Set<string>();
  for (const f of funerare) {
    if (f.oras) set.add(f.oras);
  }
  return Array.from(set).sort();
}

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export function buildFunerareJudetMetadata(
  judet: string,
  count: number
): Metadata {
  const title = `Servicii funerare ${judet} — ${count} pompe funebre și cimitire`;
  const description = `Servicii funerare în ${judet}. Pompe funebre, case funerare, cimitire și crematorii în județul ${judet}. Telefon, adresă și hartă pentru fiecare firmă.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/servicii-funerare/${slugifyJudet(judet)}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export function buildFunerareOrasMetadata(
  oras: string,
  judet: string,
  count: number
): Metadata {
  const title = `Servicii funerare ${oras}, ${judet} — ${count} firme`;
  const description = `Servicii funerare în ${oras}, județul ${judet}. Pompe funebre, case funerare și cimitiri. Telefon, adresă și hartă pentru fiecare firmă.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/servicii-funerare/${slugifyJudet(judet)}/${slugifyJudet(oras)}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export function buildFunerareDetailMetadata(f: Funerare): Metadata {
  const tipLabel =
    f.tip === "cimitir"
      ? "Cimitir"
      : f.tip === "crematoriu"
        ? "Crematoriu"
        : "Pompe funebre";

  const title = `${f.nume} — ${tipLabel} ${f.oras}, ${f.judet}`;
  const description = `${f.nume} din ${f.oras}, județul ${f.judet}. ${tipLabel} — telefon, adresă, hartă și direcții. ${
    f.telefon ? `Sună: ${f.telefon}.` : ""
  }`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/servicii-funerare/${slugifyJudet(f.judet)}/${f.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export function buildFunerareListMetadata(): Metadata {
  const title = "Servicii funerare România — pompe funebre, cimitire, crematorii";
  const description =
    "Director național servicii funerare. Pompe funebre, case funerare, cimitire și crematorii din România. Telefon, adresă și hartă pentru fiecare firmă.";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/servicii-funerare",
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function tipLabel(tip: string): string {
  switch (tip) {
    case "cimitir":
      return "Cimitir";
    case "crematoriu":
      return "Crematoriu";
    case "pompe_funebre":
    default:
      return "Pompe funebre";
  }
}

export function tipColor(tip: string): string {
  switch (tip) {
    case "cimitir":
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
    case "crematoriu":
      return "bg-purple-50 text-purple-700 ring-1 ring-purple-200";
    case "pompe_funebre":
    default:
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }
}

// Judet slug → judet name lookup (from camine-constants)
import { JUDETE_ROMANIA } from "@/lib/camine-constants";

const judetSlugMap = new Map<string, string>();
for (const j of JUDETE_ROMANIA) {
  judetSlugMap.set(slugifyJudet(j), j);
}

export function judetFromSlug(slug: string): string | undefined {
  return judetSlugMap.get(slug);
}

export function funerarePath(f: { judet: string; slug: string }): string {
  return `/servicii-funerare/${slugifyJudet(f.judet)}/firma/${f.slug}`;
}
