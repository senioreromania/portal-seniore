import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, normalizeJudet, slugifyJudet } from "@/lib/seo";
import camineData from "@/data/camine-director.json";
import { HomeClient } from "./home-client";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

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
  images?: string[];
  tip?: string;
};

const camine = camineData as Camin[];

async function getSupabasePremiumCamine(): Promise<
  (Camin & { highlight: string; description: string })[]
> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("camine")
      .select("*")
      .eq("status", "approved")
      .eq("is_premium", true);

    if (!data) return [];

    const now = new Date();

    return data
      .filter((c: Record<string, unknown>) => {
        const premiumUntil = c.premium_until as string | null;
        return !premiumUntil || new Date(premiumUntil) > now;
      })
      .map((c: Record<string, unknown>) => ({
        slug: (c.slug as string) || `sb-${c.id}`,
        name: c.nume as string,
        phone: (c.telefon as string) || "",
        website: (c.website as string) || "",
        address: (c.adresa as string) || "",
        lat: (c.lat as number) || 0,
        lng: (c.lng as number) || 0,
        judet: (c.judet as string) || "",
        rating: (c.rating as number) || "",
        reviews: (c.reviews as number) || "",
        licensed: (c.licensed as boolean) || false,
        capacity: c.capacity ? String(c.capacity) : "",
        licenseNumber: (c.license_number as string) || "",
        localitate: (c.oras as string) || "",
        serviceType:
          c.servicii && Array.isArray(c.servicii)
            ? (c.servicii as string[]).join(", ")
            : "",
        images:
          c.images && Array.isArray(c.images) ? (c.images as string[]) : [],
        highlight: (c.highlight as string) || "Cămin Partener Premium",
        description: (c.descriere as string) || "",
      }));
  } catch {
    return [];
  }
}

async function getSupabaseSliderCamine(): Promise<
  (Camin & { highlight: string; description: string })[]
> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("camine")
      .select("*")
      .eq("status", "approved")
      .eq("is_premium", true)
      .eq("show_in_slider", true);

    if (!data) return [];

    const now = new Date();

    return data
      .filter((c: Record<string, unknown>) => {
        const premiumUntil = c.premium_until as string | null;
        return !premiumUntil || new Date(premiumUntil) > now;
      })
      .map((c: Record<string, unknown>) => ({
        slug: (c.slug as string) || `sb-${c.id}`,
        name: c.nume as string,
        phone: (c.telefon as string) || "",
        website: (c.website as string) || "",
        address: (c.adresa as string) || "",
        lat: (c.lat as number) || 0,
        lng: (c.lng as number) || 0,
        judet: (c.judet as string) || "",
        rating: (c.rating as number) || "",
        reviews: (c.reviews as number) || "",
        licensed: (c.licensed as boolean) || false,
        capacity: c.capacity ? String(c.capacity) : "",
        licenseNumber: (c.license_number as string) || "",
        localitate: (c.oras as string) || "",
        serviceType:
          c.servicii && Array.isArray(c.servicii)
            ? (c.servicii as string[]).join(", ")
            : "",
        images:
          c.images && Array.isArray(c.images) ? (c.images as string[]) : [],
        highlight: (c.highlight as string) || "Cămin Partener Premium",
        description: (c.descriere as string) || "",
      }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const totalCamine = camine.length;
  const licensedCount = camine.filter((c) => c.licensed).length;
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
  const judete = Array.from(judeteSet).sort();
  const totalOrase = Array.from(oraseMap.values()).reduce(
    (acc, s) => acc + s.size,
    0
  );

  const featured = camine
    .filter((c) => c.licensed && c.rating)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  const supabasePremiumCamine = await getSupabasePremiumCamine();
  const premiumCamine = supabasePremiumCamine;
  const sliderCamine = await getSupabaseSliderCamine();

  // Funerare stats
  let funerareJudete: { judet: string; count: number }[] = [];
  let totalFunerare = 0;
  try {
    const admin = createAdminClient();
    // Fetch all judete in batches (Supabase default limit is 1000)
    const allJudetesFromDb: string[] = [];
    let offset = 0;
    const batchSize = 1000;
    while (true) {
      const { data: batch, error } = await admin
        .from("funerare")
        .select("judet")
        .eq("status", "approved")
        .range(offset, offset + batchSize - 1);
      if (error) {
        console.error("Funerare query error:", error.message);
        break;
      }
      if (!batch || batch.length === 0) break;
      allJudetesFromDb.push(...batch.map((f: { judet: string }) => f.judet));
      if (batch.length < batchSize) break;
      offset += batchSize;
    }
    totalFunerare = allJudetesFromDb.length;
    const counts: Record<string, number> = {};
    for (const judet of allJudetesFromDb) {
      const j = normalizeJudet(judet);
      if (j) counts[j] = (counts[j] || 0) + 1;
    }
    // Include ALL judete from camine list, with 0 for those without funerare data
    const allJudetes = new Set([...judete, ...Object.keys(counts)]);
    funerareJudete = Array.from(allJudetes)
      .sort((a, b) => a.localeCompare(b))
      .map((judet) => ({ judet, count: counts[judet] || 0 }));
  } catch (e) {
    console.error("Funerare stats error:", e);
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Câte cămine de bătrâni sunt în România?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Portalul nostru indexează ${totalCamine} cămine de bătrâni și centre de îngrijire pentru vârstnici la nivel național, din care ${licensedCount} sunt licențiate de Ministerul Muncii.`,
        },
      },
      {
        "@type": "Question",
        name: "Cum găsesc un cămin de bătrâni în județul meu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Folosește portalul nostru național de la pagina /camine și filtrează după județ. Poți vizita și pagina dedicată județului tău pentru a vedea toate căminele din zona ta.",
        },
      },
      {
        "@type": "Question",
        name: "Ce înseamnă cămin licențiat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un cămin de bătrâni licențiat este autorizat de Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale (MMJS) pentru a furniza servicii sociale rezidențiale. Verifică statusul de licențiere pe pagina fiecărui cămin.",
        },
      },
      {
        "@type": "Question",
        name: "Cât costă un cămin de bătrâni în România?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prețurile variază în funcție de tipul centrului (public sau privat), gradul de dependență al rezidentului și serviciile incluse. Centrele publice au coplături între 1.500 și 3.000 lei/lună, iar cele private pornesc de la 3.500 lei/lună. Contactează direct fiecare centru pentru un deviz personalizat.",
        },
      },
      {
        "@type": "Question",
        name: "Care e diferența dintre un cămin public și unul privat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Căminele publice sunt gestionate de autoritățile locale și au tarife subvenționate, dar liste de așteptare mai lungi. Căminele private oferă servicii personalizate, camere individuale și facilități suplimentare, la tarife mai ridicate. Ambele tipuri trebuie să aibă licență MMJS pentru a opera legal.",
        },
      },
      {
        "@type": "Question",
        name: "Cum adaug centrul meu în director?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Accesează pagina /cum-functioneaza și completează formularul cu datele centrului tău. Adăugarea este gratuită. Pentru vizibilitate extinsă poți opta pentru un listing premium.",
        },
      },
      {
        "@type": "Question",
        name: "Ce servicii oferă un cămin de bătrâni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Căminele de bătrâni oferă cazare, masă, asistență în activitățile zilnice, supraveghere medicală, administrarea medicației, activități recreative și suport psihologic. Unele centre oferă și servicii specializate pentru persoane cu demență, Alzheimer sau dependență avansată.",
        },
      },
      {
        "@type": "Question",
        name: "Pot vizita un cămin de bătrâni înainte de a decide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da, recomandăm vizitarea centrului înainte de a lua o decizie. Contactează căminul direct pentru a programa o vizită. Verifică condițiile de cazare, curățenia, atmosfera, raportul personal-rezident și serviciile medicale incluse.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Acasă", url: "/" }])} />
      <JsonLd data={faqJsonLd} />
      <HomeClient
        totalCamine={totalCamine}
        licensedCount={licensedCount}
        totalJudete={judete.length}
        totalOrase={totalOrase}
        judete={judete}
        featured={featured}
        premiumCamine={premiumCamine}
        sliderCamine={sliderCamine}
        funerareJudete={funerareJudete}
        totalFunerare={totalFunerare}
      />
    </>
  );
}
