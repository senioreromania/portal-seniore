import { config } from "dotenv";
import camineRaw from "../src/data/camine-director.json";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type Camin = {
  slug: string;
  name: string;
  phone: string;
  website: string;
  address: string;
  lat: string | number;
  lng: string | number;
  judet: string;
  rating: string | number;
  reviews: string | number;
  licensed: boolean;
  capacity: string;
  licenseNumber: string;
  localitate: string;
  serviceType: string;
};

async function insertBatch(rows: Record<string, unknown>[]) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/camine`, {
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

async function main() {
  const camine = camineRaw as Camin[];
  console.log(`Total de importat: ${camine.length}`);

  let success = 0;
  let errors = 0;

  const BATCH = 100;

  for (let i = 0; i < camine.length; i += BATCH) {
    const batch = camine.slice(i, i + BATCH);
    const rows = batch.map((c) => ({
      user_id: null,
      nume: c.name.replace(/\n/g, " ").trim(),
      judet: c.judet,
      oras: c.localitate || "",
      adresa: c.address || null,
      telefon: c.phone || null,
      email: null,
      website: c.website || null,
      servicii: c.serviceType ? [c.serviceType] : null,
      descriere: null,
      pret_pornire: null,
      status: "approved",
      is_premium: false,
      slug: c.slug,
      lat: c.lat ? Number(c.lat) : null,
      lng: c.lng ? Number(c.lng) : null,
      licensed: c.licensed || false,
      capacity: c.capacity || null,
      license_number: c.licenseNumber || null,
      rating: c.rating ? Number(c.rating) : null,
      reviews: c.reviews ? Number(c.reviews) : null,
    }));

    try {
      await insertBatch(rows);
      success += batch.length;
      console.log(`Importat ${i}-${i + BATCH} (${success} total)`);
    } catch (err) {
      console.error(`Eroare la batch ${i}-${i + BATCH}:`, (err as Error).message);
      errors += batch.length;
    }
  }

  console.log(`\nGata! Succes: ${success}, Erori: ${errors}`);
}

main().catch(console.error);
