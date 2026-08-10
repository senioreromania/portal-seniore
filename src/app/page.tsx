import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, normalizeJudet, slugifyJudet } from "@/lib/seo";
import camineData from "@/data/camine-director.json";
import premiumSlugs from "@/data/camine-premium.json";
import { HomeClient } from "./home-client";

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

type PremiumEntry = {
  slug: string;
  highlight: string;
  description: string;
  featured: boolean;
};

const camine = camineData as Camin[];
const premiumList = premiumSlugs as PremiumEntry[];

export default function HomePage() {
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

  const premiumCamine = premiumList
    .map((p) => {
      const camin = camine.find((c) => c.slug === p.slug);
      if (!camin) return null;
      return { ...camin, highlight: p.highlight, description: p.description };
    })
    .filter((c): c is Camin & { highlight: string; description: string } => c !== null);

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
        name: "Cum adaug centrul meu în director?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Accesează pagina /cum-functioneaza și completează formularul cu datele centrului tău. Adăugarea este gratuită. Pentru vizibilitate extinsă poți opta pentru un listing premium.",
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
      />
    </>
  );
}
