import type { MetadataRoute } from "next";
import camineData from "@/data/camine-director.json";
import { SITE_URL, slugifyJudet, normalizeJudet } from "@/lib/seo";
import { articleMetas } from "@/app/stiri/article-metas";

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
  { url: "/membri", priority: 0.4, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { url: "/confidentialitate", priority: 0.3, changeFrequency: "yearly" },
  { url: "/termeni", priority: 0.3, changeFrequency: "yearly" },
  { url: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.url}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const caminEntries: MetadataRoute.Sitemap = camine.map((c) => ({
    url: `${SITE_URL}/camine/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

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

  return [...staticEntries, ...stiriEntries, ...judetEntries, ...oraseEntries, ...caminEntries];
}
