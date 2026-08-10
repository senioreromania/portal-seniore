import type { MetadataRoute } from "next";
import camineData from "@/data/camine-director.json";
import { SITE_URL, slugifyJudet, normalizeJudet } from "@/lib/seo";
import { articleMetas } from "@/app/stiri/article-metas";
import { createClient } from "@/lib/supabase-server";

type Camin = {
  slug: string;
  judet: string;
  localitate: string;
  licensed: boolean;
};

const camine = camineData as Camin[];

const staticPages: {
  url: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { url: "", priority: 1.0, changeFrequency: "daily" },
  { url: "/camine", priority: 0.9, changeFrequency: "daily" },
  { url: "/camine-autorizate", priority: 0.8, changeFrequency: "weekly" },
  { url: "/cum-functioneaza", priority: 0.7, changeFrequency: "monthly" },
  { url: "/despre", priority: 0.5, changeFrequency: "monthly" },
  { url: "/stiri", priority: 0.6, changeFrequency: "weekly" },
  { url: "/advocacy", priority: 0.4, changeFrequency: "monthly" },
  { url: "/petitii", priority: 0.4, changeFrequency: "monthly" },
  { url: "/resurse", priority: 0.5, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { url: "/confidentialitate", priority: 0.3, changeFrequency: "yearly" },
  { url: "/termeni", priority: 0.3, changeFrequency: "yearly" },
  { url: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.url}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // JSON care homes
  const jsonSlugs = new Set(camine.map((c) => c.slug));
  const caminEntries: MetadataRoute.Sitemap = camine.map((c) => ({
    url: `${SITE_URL}/camine/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Merge judete and orase from both sources
  const judeteSet = new Set<string>();
  const oraseMap = new Map<string, Set<string>>();
  camine.forEach((c) => {
    const judet = normalizeJudet(c.judet);
    if (judet) {
      judeteSet.add(judet);
      if (c.localitate) {
        if (!oraseMap.has(judet)) oraseMap.set(judet, new Set());
        oraseMap.get(judet)!.add(c.localitate);
      }
    }
  });

  // Supabase approved care homes (only those not already in JSON)
  const supabaseEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: sbCamine } = await supabase
      .from("camine")
      .select("slug, judet, oras")
      .eq("status", "approved")
      .not("slug", "is", null);

    if (sbCamine) {
      for (const c of sbCamine) {
        if (c.slug && !jsonSlugs.has(c.slug)) {
          supabaseEntries.push({
            url: `${SITE_URL}/camine/${c.slug}`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          });

          // Add judete and orase from Supabase care homes
          const judet = normalizeJudet(c.judet || "");
          if (judet) {
            judeteSet.add(judet);
            if (c.oras) {
              if (!oraseMap.has(judet)) oraseMap.set(judet, new Set());
              oraseMap.get(judet)!.add(c.oras);
            }
          }
        }
      }
    }
  } catch {
    // Supabase not available, skip
  }

  const judetEntries: MetadataRoute.Sitemap = Array.from(judeteSet).map((j) => ({
    url: `${SITE_URL}/judet/${slugifyJudet(j)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const stiriEntries: MetadataRoute.Sitemap = articleMetas.map((a) => ({
    url: `${SITE_URL}/stiri/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const oraseEntries: MetadataRoute.Sitemap = [];
  oraseMap.forEach((orase, judet) => {
    orase.forEach((oras) => {
      oraseEntries.push({
        url: `${SITE_URL}/judet/${slugifyJudet(judet)}/${slugifyJudet(oras)}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    });
  });

  return [...staticEntries, ...stiriEntries, ...judetEntries, ...oraseEntries, ...caminEntries, ...supabaseEntries];
}
