import type { Metadata } from "next";

export const SITE_URL = "https://www.seniore.ro";
export const SITE_NAME = "Seniore.ro — Portal cu toate Căminele de Bătrâni din România";
export const SITE_DESCRIPTION =
  "Portal cu toate căminele de bătrâni din România. Găsește cămin licențiat în județul tău — prețuri, contact, hartă, capacitate. Listă completă de cămine de bătrâni, case de bătrâni și centre de îngrijire pentru vârstnici.";

export function titleCase(str: string): string {
  const smallWords = new Set(["srl", "srld", "de", "la", "și", "din", "în", "cu", "pentru", "pe", "la", "al", "ai", "ale", "lei"]);
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word, i) => {
      if (i > 0 && smallWords.has(word.replace(/[._-]/g, ""))) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const KEYWORDS = [
  "cămin de bătrâni",
  "camin de batrani",
  "camine batrani",
  "cămine de bătrâni",
  "camin batrani pret",
  "cămin de bătrâni preț",
  "cămin de bătrâni licențiat",
  "cămin de bătrâni România",
  "camin batrani Bucuresti",
  "cămin de bătrâni București",
  "toate căminele de bătrâni",
  "portal cămine de bătrâni",
  "listă cămine de bătrâni",
  "casă de bătrâni",
  "case de bătrâni",
  "case batrani",
  "case de batrani",
  "îngrijire bătrâni",
  "ingrijire batrani",
  "ingrijire varstnici",
  "centru de îngrijire vârstnici",
  "home pentru bătrâni",
  "pensiune pentru bătrâni",
  "pensiune batrani",
  "cămin persoane vârstnice",
  "centre rezidențiale pentru vârstnici",
  "servicii sociale rezidențiale",
];

export type Camin = {
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
  internationalPhone?: string;
  cui?: string;
  licenseDate?: string;
  tip?: string;
};

const JUDET_NORMALIZE: Record<string, string> = {
  "Bistrița Năsăud": "Bistrița-Năsăud",
  "Caraș Severin": "Caraș-Severin",
  "Districtul Bor": "",
  "Regiunea Silistra": "",
  "raionul Călărași": "",
};

export function normalizeJudet(judet: string): string {
  const normalized = JUDET_NORMALIZE[judet];
  if (normalized === "") return "";
  return normalized ?? judet;
}

export function caminPath(camin: { judet: string; slug: string }): string {
  const judetSlug = slugifyJudet(normalizeJudet(camin.judet) || camin.judet);
  return `/camine/${judetSlug}/${camin.slug}`;
}

export function slugifyJudet(judet: string): string {
  return judet
    .toLowerCase()
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/ş/g, "s")
    .replace(/ţ/g, "t")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildHomeMetadata(): Metadata {
  return {
    title: {
      default: "Căminele de Bătrâni din toată România — Caută cămin de bătrâni autorizat în apropierea ta | Seniore.ro",
      template: "%s | Seniore.ro",
    },
    description: SITE_DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: SITE_NAME }],
    alternates: {
      canonical: SITE_URL,
      languages: {
        "ro-RO": SITE_URL,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: "Căminele de Bătrâni din toată România — Caută cămin de bătrâni autorizat în apropierea ta | Seniore.ro",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Căminele de Bătrâni din toată România — Caută cămin de bătrâni autorizat în apropierea ta | Seniore.ro",
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export function buildCamineListMetadata(): Metadata {
  return {
    title: "Toate Căminele de Bătrâni din România — Listă Completă",
    description:
      "Portal cu toate căminele de bătrâni din România. Filtrează după județ, licență, capacitate. Date de contact, hartă, prețuri și direcții pentru fiecare cămin de bătrâni.",
    keywords: [
      ...KEYWORDS,
      "listă cămine de bătrâni",
      "portal cămine bătrâni",
      "cămine bătrâni România",
      "toate căminele de bătrâni",
    ],
    alternates: {
      canonical: `${SITE_URL}/camine`,
    },
    openGraph: {
      title: "Toate Căminele de Bătrâni din România — Listă Completă",
      description:
        "Portal cu toate căminele de bătrâni din România. Filtrează după județ, licență, capacitate.",
      url: `${SITE_URL}/camine`,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Toate Căminele de Bătrâni din România — Listă Completă",
      description: "Portal cu toate căminele de bătrâni din România. Filtrează după județ, licență, capacitate.",
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export function buildCaminMetadata(camin: Camin): Metadata {
  const localitate = camin.localitate || "";
  const judet = normalizeJudet(camin.judet) || "";
  const locPart = localitate ? ` ${localitate},` : judet ? ` ${judet}` : "";
  const title = `${camin.name} — Cămin de bătrâni${locPart} | Seniore.ro`;
  const descParts = [
    `${camin.name}`,
    localitate ? ` din ${localitate}, ${judet}` : judet ? ` din județul ${judet}` : "",
    camin.capacity ? `, ${camin.capacity} locuri` : "",
    camin.licensed ? ", licențiat MMJS" : "",
    camin.phone ? `. Telefon: ${camin.phone}` : "",
    camin.address ? `. Adresă: ${camin.address}` : "",
    ". Vezi hartă, direcții, contact și detalii.",
  ];

  return {
    title,
    description: descParts.join(""),
    keywords: [
      `cămin de bătrâni ${judet}`,
      `cămin de bătrâni ${localitate}`,
      `casă de bătrâni ${judet}`,
      `îngrijire bătrâni ${judet}`,
      camin.name,
      `centru vârstnici ${judet}`,
      `camin batrani ${localitate}`,
      `home pentru bătrâni ${judet}`,
    ],
    alternates: {
      canonical: `${SITE_URL}${caminPath(camin)}`,
    },
    openGraph: {
      title,
      description: descParts.join(""),
      url: `${SITE_URL}${caminPath(camin)}`,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descParts.join(""),
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export function buildJudetMetadata(judet: string, count: number): Metadata {
  const judetNormalized = normalizeJudet(judet);
  const title = `Cămine de bătrâni ${judetNormalized} — ${count} centre de îngrijire`;
  const description = `Cămine de bătrâni în ${judetNormalized}. Prețuri cămine de bătrâni ${judetNormalized}, telefon, hartă și licență MMJS. Găsește cămin de bătrâni în ${judetNormalized}.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `cămin de bătrâni ${judet}`,
      `cămine de bătrâni ${judet}`,
      `casă de bătrâni ${judet}`,
      `îngrijire bătrâni ${judet}`,
      `centru vârstnici ${judet}`,
      `home pentru bătrâni ${judet}`,
      `camin batrani ${judet}`,
    ],
    alternates: {
      canonical: `${SITE_URL}/judet/${slugifyJudet(judet)}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/judet/${slugifyJudet(judet)}`,
      siteName: SITE_NAME,
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

export function buildOrasMetadata(oras: string, judet: string, count: number): Metadata {
  const title = `Cămine de bătrâni ${oras}, ${judet} — ${count} centre`;
  const description = `Cămine de bătrâni în ${oras}, ${judet}. Prețuri cămine de bătrâni ${oras}, telefon, hartă și licență MMJS. Găsește cămin de bătrâni în ${oras}.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `cămin de bătrâni ${oras}`,
      `cămine de bătrâni ${oras}`,
      `casă de bătrâni ${oras}`,
      `îngrijire bătrâni ${oras}`,
      `centru vârstnici ${oras}`,
      `cămin de bătrâni ${oras} ${judet}`,
    ],
    alternates: {
      canonical: `${SITE_URL}/judet/${slugifyJudet(judet)}/${slugifyJudet(oras)}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/judet/${slugifyJudet(judet)}/${slugifyJudet(oras)}`,
      siteName: SITE_NAME,
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

export function buildStaticPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords ?? KEYWORDS,
    alternates: {
      canonical: `${SITE_URL}${opts.path}`,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export function buildStiriListMetadata(): Metadata {
  return buildStaticPageMetadata({
    title: "Știri din domeniul îngrijirii vârstnicilor — Seniore.ro",
    description:
      "Știri, comunicate și analize despre căminele de bătrâni din România. Legislație, licențiere, reforme și evenimente din sectorul asistenței sociale.",
    path: "/stiri",
    keywords: [
      ...KEYWORDS,
      "știri cămine bătrâni",
      "știri cămine bătrâni",
      "legislație asistență socială",
      "licențiere cămine",
    ],
  });
}

export function buildArticleMetadata(opts: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  date: string;
}): Metadata {
  const url = `${SITE_URL}/stiri/${opts.slug}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: "ro_RO",
      type: "article",
      images: opts.image ? [{ url: `${SITE_URL}${opts.image}` }] : [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      publishedTime: opts.date,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: opts.image ? [`${SITE_URL}${opts.image}`] : [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export function newsArticleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  date: string;
  author?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}/stiri/${opts.slug}`,
    datePublished: opts.date,
    dateModified: opts.date,
    inLanguage: "ro-RO",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
  if (opts.image) {
    schema.image = `${SITE_URL}${opts.image}`;
  }
  if (opts.author) {
    schema.author = { "@type": "Organization", name: opts.author };
  }
  return schema;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ro-RO",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/camine?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function nursingHomeJsonLd(camin: Camin) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NursingHome",
    name: camin.name,
    url: `${SITE_URL}${caminPath(camin)}`,
  };

  if (camin.phone) {
    schema.telephone = camin.internationalPhone || camin.phone;
  }
  if (camin.website) {
    schema.sameAs = camin.website;
  }
  if (camin.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: camin.address,
      addressRegion: camin.judet,
      addressLocality: camin.localitate || camin.judet,
      addressCountry: "RO",
    };
  }
  if (camin.lat && camin.lng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: String(camin.lat),
      longitude: String(camin.lng),
    };
  }
  if (camin.rating && camin.reviews) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(camin.rating),
      reviewCount: String(camin.reviews),
    };
  }
  if (camin.capacity) {
    schema.maximumAttendeeCapacity = parseInt(String(camin.capacity)) || undefined;
  }
  if (camin.licensed) {
    schema.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      name: "Licență MMJS",
      credentialCategory: "Licență servicii sociale",
    };
  }

  return schema;
}

export function itemListJsonLd(camine: Camin[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: camine.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE_URL}${caminPath(c)}`,
    })),
    numberOfItems: camine.length,
    url: `${SITE_URL}${baseUrl}`,
  };
}

export function collectionPageJsonLd(judet: string, count: number, camine: Camin[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Cămine de bătrâni ${judet}`,
    description: `Lista căminelor de bătrâni din județul ${judet}. ${count} centre indexate.`,
    url: `${SITE_URL}/judet/${slugifyJudet(judet)}`,
    inLanguage: "ro-RO",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: count,
      itemListElement: camine.slice(0, 20).map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: `${SITE_URL}${caminPath(c)}`,
      })),
    },
  };
}

export function faqJudetJsonLd(opts: {
  judet: string;
  count: number;
  licensed: number;
  orase: string[];
}): Record<string, unknown> {
  const { judet, count, licensed, orase } = opts;
  const questions: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] = [];

  questions.push({
    "@type": "Question",
    name: `Câte cămine de bătrâni sunt în județul ${judet}?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `În județul ${judet} sunt ${count} cămine de bătrâni indexate în portalul nostru, din care ${licensed} sunt licențiate de Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale (MMJS).`,
    },
  });

  questions.push({
    "@type": "Question",
    name: `Care sunt localitățile cu cămine de bătrâni în județul ${judet}?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: orase.length > 0
        ? `Cămine de bătrâni în județul ${judet} se găsesc în următoarele localități: ${orase.join(", ")}.`
        : `Informațiile despre localitățile cu cămine de bătrâni în ${judet} sunt actualizate periodic pe pagina fiecărui județ.`,
    },
  });

  questions.push({
    "@type": "Question",
    name: `Ce prețuri au căminele de bătrâni în județul ${judet}?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Prețurile la căminele de bătrâni din ${judet} variază în funcție de tipul centrului (public sau privat), gradul de dependență al rezidentului și serviciile incluse. Centrele publice au coplături între 1.500 și 3.000 lei/lună, iar cele private pornesc de la 3.500 lei/lună. Contactează direct fiecare centru pentru un deviz personalizat.`,
    },
  });

  questions.push({
    "@type": "Question",
    name: `Cum aleg un cămin de bătrâni în județul ${judet}?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Pentru a alege un cămin de bătrâni în ${judet}, verifică: 1) dacă centrul are licență MMJS, 2) capacitatea și raportul personal-rezident, 3) serviciile medicale incluse, 4) locația și accesul familiei, 5) prețul și ce include tariful. Recomandăm vizitarea centrului înainte de decizie.`,
    },
  });

  questions.push({
    "@type": "Question",
    name: `Ce este un cămin de bătrâni licențiat?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Un cămin de bătrâni licențiat este autorizat de Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale (MMJS) pentru a furniza servicii sociale rezidențiale. Din cele ${count} centre din ${judet}, ${licensed} au licență MMJS activă.`,
    },
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };
}

export function faqCaminJsonLd(camin: Camin): Record<string, unknown> {
  const questions: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] = [];

  if (camin.licensed) {
    questions.push({
      "@type": "Question",
      name: `${camin.name} este licențat?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Da, ${camin.name} are licență MMJS (Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale) pentru furnizarea de servicii sociale rezidențiale.${camin.licenseNumber ? ` Număr licență: ${camin.licenseNumber}.` : ""}${camin.licenseDate ? ` Data licențierii: ${camin.licenseDate}.` : ""}`,
      },
    });
  } else {
    questions.push({
      "@type": "Question",
      name: `${camin.name} este licențat?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${camin.name} nu apare în lista oficială a căminelor licențiate de MMJS. Recomandăm să contactezi direct centrul pentru a verifica statusul de licențiere și autorizațiile actuale.`,
      },
    });
  }

  if (camin.capacity) {
    questions.push({
      "@type": "Question",
      name: `Câte locuri are ${camin.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${camin.name} are o capacitate de ${camin.capacity} locuri. Contactează centrul pentru a verifica disponibilitatea.`,
      },
    });
  }

  if (camin.address || camin.localitate || camin.judet) {
    const locParts = [camin.address, camin.localitate, camin.judet].filter(Boolean);
    questions.push({
      "@type": "Question",
      name: `Unde se află ${camin.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${camin.name} se află la ${locParts.join(", ")}.${camin.lat && camin.lng ? " Poți vedea locația exactă pe harta de pe această pagină și obține direcții pe Google Maps." : ""}`,
      },
    });
  }

  if (camin.phone) {
    questions.push({
      "@type": "Question",
      name: `Cum contactez ${camin.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Poți contacta ${camin.name} la numărul de telefon ${camin.phone}.${camin.website ? ` De asemenea, poți vizita website-ul oficial: ${camin.website}` : ""}`,
      },
    });
  } else if (camin.website) {
    questions.push({
      "@type": "Question",
      name: `Cum contactez ${camin.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Poți contacta ${camin.name} prin website-ul oficial: ${camin.website}.`,
      },
    });
  } else {
    questions.push({
      "@type": "Question",
      name: `Cum obțin informații despre ${camin.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Pentru informații despre ${camin.name}, poți folosi harta de pe această pagină pentru a obține direcții sau ne poți contacta prin portalul nostru.`,
      },
    });
  }

  if (camin.serviceType) {
    questions.push({
      "@type": "Question",
      name: `Ce tip de servicii oferă ${camin.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${camin.name} oferă servicii de tip: ${camin.serviceType}.`,
      },
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };
}

export function faqOrasJsonLd(opts: {
  oras: string;
  judet: string;
  count: number;
  licensed: number;
}): Record<string, unknown> {
  const { oras, judet, count, licensed } = opts;
  const questions: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] = [];

  questions.push({
    "@type": "Question",
    name: `Câte cămine de bătrâni sunt în ${oras}, județul ${judet}?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `În ${oras}, județul ${judet}, sunt ${count} cămine de bătrâni indexate, din care ${licensed} sunt licențiate MMJS.`,
    },
  });

  questions.push({
    "@type": "Question",
    name: `Care cămine din ${oras} sunt licențiate?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Din cele ${count} centre din ${oras}, ${licensed} au licență MMJS activă. Verifică statusul de licențiere pe pagina fiecărui cămin.`,
    },
  });

  questions.push({
    "@type": "Question",
    name: `Cum găsesc un cămin de bătrâni în ${oras}?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `Pe această pagină găsești toate ${count} căminele de bătrâni din ${oras}, ${judet}. Fiecare centru are pagină proprie cu date de contact, hartă, capacitate și status de licențiere.`,
    },
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };
}

