import { config } from "dotenv";
import funerareRaw from "../src/data/funerare-director.json";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type Funerare = {
  slug: string;
  name: string;
  phone: string;
  internationalPhone: string;
  website: string;
  address: string;
  lat: string | number;
  lng: string | number;
  judet: string;
  rating: string | number;
  reviews: string | number;
  placeId: string;
  googleUrl: string;
  tip: string;
  localitate: string;
};

async function insertBatch(rows: Record<string, unknown>[]) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/funerare`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
}

// Generate unique slug per judet (append number if duplicate)
function buildUniqueSlugs(entries: Funerare[]): Map<number, string> {
  const slugMap = new Map<number, string>();
  const seen = new Map<string, number>(); // key: "judet|slug" → count

  entries.forEach((entry, idx) => {
    const baseSlug = entry.slug || slugify(entry.name);
    const key = `${entry.judet}|${baseSlug}`;
    const count = seen.get(key) || 0;

    if (count === 0) {
      slugMap.set(idx, baseSlug);
    } else {
      slugMap.set(idx, `${baseSlug}-${count}`);
    }

    seen.set(key, count + 1);
  });

  return slugMap;
}

function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "si")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  const funerare = funerareRaw as Funerare[];
  console.log(`Total de importat: ${funerare.length}`);

  const slugMap = buildUniqueSlugs(funerare);

  let success = 0;
  let errors = 0;

  const BATCH = 100;

  for (let i = 0; i < funerare.length; i += BATCH) {
    const batch = funerare.slice(i, i + BATCH);
    const rows = batch.map((f, batchIdx) => {
      const idx = i + batchIdx;
      const slug = slugMap.get(idx) || f.slug;

      return {
        user_id: null,
        nume: f.name.replace(/\n/g, " ").trim(),
        judet: f.judet,
        oras: f.localitate || "",
        adresa: f.address || null,
        telefon: f.phone || null,
        email: null,
        website: f.website || null,
        tip: f.tip || "pompe_funebre",
        servicii: null,
        descriere: null,
        pret_pornire: null,
        status: "approved",
        is_premium: false,
        show_in_slider: false,
        highlight: null,
        slug: slug,
        lat: f.lat ? Number(f.lat) : null,
        lng: f.lng ? Number(f.lng) : null,
        rating: f.rating ? Number(f.rating) : null,
        reviews: f.reviews ? Number(f.reviews) : null,
        place_id: f.placeId || null,
        google_url: f.googleUrl || null,
        images: null,
      };
    });

    try {
      await insertBatch(rows);
      success += batch.length;
      console.log(`Importat ${i}-${i + batch.length} (${success} total)`);
    } catch (err) {
      console.error(`Eroare la batch ${i}-${i + batch.length}:`, (err as Error).message);
      errors += batch.length;
    }
  }

  console.log(`\nGata! Succes: ${success}, Erori: ${errors}`);
}

main().catch(console.error);
