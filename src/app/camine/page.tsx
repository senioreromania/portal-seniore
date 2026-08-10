import type { Metadata } from "next";
import { Suspense } from "react";
import { buildCamineListMetadata, itemListJsonLd, normalizeJudet, slugifyJudet, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import camineRaw from "@/data/camine-director.json";
import { CamineDirectorClient } from "./camine-director-client";

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

const camineData = camineRaw as Camin[];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ judet?: string }>;
}): Promise<Metadata> {
  const { judet } = await searchParams;

  if (!judet) {
    return buildCamineListMetadata();
  }

  const judetNormalized = normalizeJudet(judet) || judet;
  const count = camineData.filter((c) => normalizeJudet(c.judet) === judetNormalized).length;
  const licensed = camineData.filter((c) => normalizeJudet(c.judet) === judetNormalized && c.licensed).length;

  if (count === 0) {
    return buildCamineListMetadata();
  }

  const title = `Cămine de bătrâni ${judetNormalized} — ${count} centre de îngrijire`;
  const description = `Cămine de bătrâni în ${judetNormalized}. Prețuri cămine de bătrâni ${judetNormalized}, telefon, hartă și licență MMJS. Găsește cămin de bătrâni în ${judetNormalized}.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `azil de bătrâni ${judetNormalized}`,
      `cămin de bătrâni ${judetNormalized}`,
      `azile de bătrâni ${judetNormalized}`,
      `cămine de bătrâni ${judetNormalized}`,
      `azil batrani ${judetNormalized}`,
    ],
    alternates: {
      canonical: `${SITE_URL}/judet/${slugifyJudet(judetNormalized)}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/judet/${slugifyJudet(judetNormalized)}`,
      siteName: "Seniore.ro — Azile și cămine de bătrâni în România",
      locale: "ro_RO",
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default function CamineDirectorPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd(camineData, "/camine")} />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CamineDirectorClient />
      </Suspense>
    </>
  );
}
