import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Globe,
  Star,
  ShieldCheck,
  Users,
  Navigation,
  ChevronRight,
  ArrowLeft,
  Crown,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import {
  buildJudetMetadata,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqJudetJsonLd,
  normalizeJudet,
  slugifyJudet,
  titleCase,
  type Camin,
} from "@/lib/seo";
import { FaqSection } from "@/components/faq-section";
import camineData from "@/data/camine-director.json";
import { createClient } from "@/lib/supabase-server";

const allCamine = camineData as Camin[];
const jsonSlugSet = new Set(allCamine.map((c) => c.slug));

type CaminWithPremium = Camin & { isPremium?: boolean };

async function getSupabaseCamineForJudet(judet: string): Promise<CaminWithPremium[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("camine")
      .select("*")
      .eq("status", "approved")
      .eq("judet", judet);

    if (!data) return [];

    const now = new Date();

    return data
      .map((c: Record<string, unknown>) => {
        const premiumUntil = c.premium_until as string | null;
        const isActivePremium =
          Boolean(c.is_premium) && (!premiumUntil || new Date(premiumUntil) > now);
        return {
          slug: (c.slug as string) || `sb-${c.id}`,
          name: c.nume as string,
          phone: (c.telefon as string) || "",
          website: (c.website as string) || "",
          address: (c.adresa as string) || "",
          lat: 0,
          lng: 0,
          judet: (c.judet as string) || "",
          rating: "",
          reviews: "",
          licensed: false,
          capacity: "",
          licenseNumber: "",
          localitate: (c.oras as string) || "",
          serviceType: "",
          isPremium: isActivePremium,
        };
      })
      .filter((c) => normalizeJudet(c.judet) === judet)
      // Skip non-premium Supabase rows that duplicate an existing JSON entry
      .filter((c) => c.isPremium || !jsonSlugSet.has(c.slug));
  } catch {
    return [];
  }
}

// Build lookup: slug -> judet name
const judetBySlug = new Map<string, string>();
const judetCounts = new Map<string, number>();
allCamine.forEach((c) => {
  const judet = normalizeJudet(c.judet);
  if (judet) {
    const slug = slugifyJudet(judet);
    if (!judetBySlug.has(slug)) judetBySlug.set(slug, judet);
    judetCounts.set(slug, (judetCounts.get(slug) || 0) + 1);
  }
});

export function generateStaticParams() {
  return Array.from(judetBySlug.keys()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const judet = judetBySlug.get(slug);
  if (!judet) {
    return { title: "Județ negăsit — Cămin de Bătrâni România" };
  }
  return buildJudetMetadata(judet, judetCounts.get(slug) || 0);
}

export default async function JudetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const judet = judetBySlug.get(slug);

  if (!judet) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Județ negăsit
            </h1>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Înapoi la director
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const camineInJudetJsonRaw = allCamine.filter(
    (c) => normalizeJudet(c.judet) === judet
  );
  const supabaseCamineJudet = await getSupabaseCamineForJudet(judet);
  const supabasePremiumJudet = supabaseCamineJudet.filter((c) => c.isPremium);
  const supabaseRegularJudet = supabaseCamineJudet.filter((c) => !c.isPremium);
  const premiumSlugsJudet = new Set(supabasePremiumJudet.map((c) => c.slug));
  const camineInJudetJson = camineInJudetJsonRaw.filter(
    (c) => !premiumSlugsJudet.has(c.slug)
  );
  const camineInJudet: CaminWithPremium[] = [
    ...supabasePremiumJudet,
    ...camineInJudetJson,
    ...supabaseRegularJudet,
  ];

  const licensed = camineInJudet.filter((c) => c.licensed);
  const withPhone = camineInJudet.filter((c) => c.phone);
  const oraseSet = new Set<string>();
  camineInJudet.forEach((c) => {
    if (c.localitate) oraseSet.add(c.localitate);
  });
  const orase = Array.from(oraseSet).sort();

  // Related județe (same region-ish, just pick a few others)
  const allJudete = Array.from(judetBySlug.values()).sort();
  const relatedJudete = allJudete
    .filter((j) => j !== judet)
    .slice(0, 8);

  const jsonLdData = collectionPageJsonLd(
    judet,
    camineInJudet.length,
    camineInJudet
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", url: "/" },
          { name: "Cămine de bătrâni", url: "/camine" },
          { name: `Cămine de bătrâni ${judet}`, url: `/judet/${slug}` },
        ])}
      />
      <JsonLd data={jsonLdData} />
      <JsonLd data={faqJudetJsonLd({ judet, count: camineInJudet.length, licensed: licensed.length, orase })} />
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gold/10 border-b border-navy-deep/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-navy-deep/50">
              <Link href="/" className="hover:text-navy-deep transition-colors">
                Acasă
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href="/camine"
                className="hover:text-navy-deep transition-colors"
              >
                Cămine de bătrâni
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70">{judet}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-16 pb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
            >
              <MapPin className="size-3.5 text-navy-deep" />
              <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                Județul {judet}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6">
              Cămine de bătrâni în județul {judet}
            </h1>

            <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-8">
              {camineInJudet.length} cămine de bătrâni și centre de îngrijire a
              vârstnicilor în județul {judet}, din care {licensed.length}{" "}
              licențiate MMJS. Găsește prețuri, contact, hartă și direcții
              pentru fiecare centru.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {camineInJudet.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Total cămine
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {licensed.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Licențiate
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {withPhone.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Cu telefon
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {orase.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Localități
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista cămine */}
        <section className="py-12 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            {camineInJudet.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-navy-deep/40 text-lg">
                  Nu există cămine indexate în județul {judet}.
                </p>
                <Link
                  href="/camine"
                  className="mt-4 inline-flex items-center gap-2 text-gold font-semibold hover:underline"
                >
                  <ArrowLeft className="size-4" />
                  Vezi toate căminele din România
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold text-navy-deep">
                    Toate căminele din {judet} ({camineInJudet.length})
                  </h2>
                  <Link
                    href="/camine"
                    className="text-sm font-semibold text-gold hover:underline"
                  >
                    Portal național
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {camineInJudet.map((cam) => (
                    <Link
                      key={cam.slug}
                      href={`/camine/${slug}/${cam.slug}`}
                      className={`group block h-full rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${
                        cam.isPremium
                          ? "bg-white border-gold/40 hover:border-gold/70 hover:shadow-gold/20"
                          : "bg-white border-navy-deep/8 hover:border-gold/30 hover:shadow-navy-deep/5 p-5"
                      }`}
                    >
                      {cam.isPremium && (
                        <div className="flex items-center justify-between px-4 py-2.5 bg-navy-deep border-b border-gold/30">
                          <div className="flex items-center gap-1.5">
                            <Crown className="size-3.5 text-gold" />
                            <span className="text-xs font-bold uppercase tracking-wide text-gold">Premium</span>
                          </div>
                          {cam.licensed && (
                            <div className="flex items-center gap-1">
                              <ShieldCheck className="size-3.5 text-gold" />
                              <span className="text-xs font-semibold text-gold uppercase tracking-wide">Licențiat</span>
                            </div>
                          )}
                          {cam.tip === "Public" && (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                              Cămin de stat
                            </span>
                          )}
                          {cam.tip !== "Public" && (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                              Privat
                            </span>
                          )}
                        </div>
                      )}
                      <div className={cam.isPremium ? "p-5" : ""}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className={`font-heading text-base font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-2 text-navy-deep`}>
                            {titleCase(cam.name)}
                          </h3>
                          {!cam.isPremium && cam.licensed && (
                            <ShieldCheck className="size-5 text-gold shrink-0" />
                          )}
                        </div>

                        {!cam.isPremium && (
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {cam.tip === "Public" && (
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                                Cămin de stat
                              </span>
                            )}
                            {cam.tip !== "Public" && (
                              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                                Privat
                              </span>
                            )}
                          </div>
                        )}

                        {cam.address && (
                          <div className="flex items-start gap-2 text-sm mb-2 text-navy-deep/50">
                            <MapPin className="size-4 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cam.address}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-xs mb-3 text-navy-deep/40">
                          {cam.localitate && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3" />
                              {cam.localitate}
                            </span>
                          )}
                          {cam.capacity && (
                            <span className="inline-flex items-center gap-1">
                              <Users className="size-3" />
                              {cam.capacity} locuri
                            </span>
                          )}
                          {cam.rating && Number(cam.rating) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="size-3 text-gold fill-gold" />
                              {cam.rating}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-navy-deep/5">
                          {cam.phone && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                              <Phone className="size-3" />
                              Telefon
                            </span>
                          )}
                          {cam.website && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                              <Globe className="size-3" />
                              Website
                            </span>
                          )}
                          {Number(cam.lat) !== 0 && Number(cam.lng) !== 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50 ml-auto">
                              <Navigation className="size-3" />
                              Direcții
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Localități din județ */}
            {orase.length > 0 && (
              <div className="mt-12 pt-8 border-t border-navy-deep/10">
                <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                  Cămine de bătrâni după localitate în {judet}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {orase.map((oras) => {
                    const count = camineInJudet.filter(
                      (c) => c.localitate === oras
                    ).length;
                    const orasSlug = slugifyJudet(oras);
                    return (
                      <Link
                        key={oras}
                        href={`/judet/${slug}/${orasSlug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-navy-deep/8 text-sm text-navy-deep/70 hover:border-gold/30 hover:text-gold transition-all"
                      >
                        <MapPin className="size-3 text-gold" />
                        {oras}
                        <span className="text-xs text-navy-deep/30">
                          ({count})
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related județe */}
            <div className="mt-12 pt-8 border-t border-navy-deep/10">
              <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                Cămine de bătrâni în alte județe
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {relatedJudete.map((j) => (
                  <Link
                    key={j}
                    href={`/judet/${slugifyJudet(j)}`}
                    className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white border border-navy-deep/8 hover:border-gold/30 transition-all"
                  >
                    <span className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                      {j}
                    </span>
                    <ChevronRight className="size-4 text-navy-deep/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* SEO contextual links */}
            <div className="mt-12 pt-8 border-t border-navy-deep/10 text-center">
              <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                Alte detalii
              </h2>
              <div className="space-y-3 text-sm text-navy-deep/60 leading-relaxed max-w-3xl mx-auto text-left">
                <p>
                  În județul {judet} există {camineInJudet.length} de cămine de bătrâni și centre de îngrijire a vârstnicilor, din care {licensed.length} sunt licențiate de <a href="https://mmuncii.gov.ro/acreditare-furnizori-si-servicii-sociale/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale</a>. Lista completă a căminelor licențiate la nivel național este publicată de <a href="https://mmuncii.gov.ro/wp-content/uploads/2026/03/10032026_Camine_PV.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">MMPS (PDF)</a>, iar pe site-ul nostru poți consulta <Link href="/camine-autorizate" className="text-gold hover:underline font-medium">căminele licențiate din întreaga țară</Link>.
                </p>
                <p>
                  Conform <a href="https://legislatie.just.ro/Public/DetaliiDocument/21309" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legii nr. 17/2000 privind asistența socială a persoanelor vârstnice</a> și <a href="https://www.cdep.ro/ords/pls/legis/legis_pck.htp_act?ida=113748" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legii nr. 197/2012 privind asigurarea calității serviciilor sociale</a>, toate centrele rezidențiale pentru vârstnici trebuie să dețină licență de funcționare. Pentru informații despre pensii și drepturi de asigurări sociale, consultă <a href="https://www.cnpp.ro/web/guest/home" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Casa Națională de Pensii Publice</a>.
                </p>
                <p>
                  Dacă ai nevoie de sprijin pentru îngrijirea unui vârstnic cu demență, <a href="https://alz.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Societatea Română Alzheimer</a> oferă consiliere și resurse. <a href="https://caritasromania.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Confederația Caritas România</a> și <a href="https://cag.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Fundația Crucea Alb-Galbenă</a> oferă servicii de îngrijire la domiciliu pentru vârstnici. Alte resurse: <a href="https://cnoppv.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Consiliul Național al Organizațiilor de Pensionari</a> și <a href="https://seniorinet.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Federația SenioriNET</a>.
                </p>
                <p>
                  Pe site-ul nostru găsești și <Link href="/resurse" className="text-gold hover:underline font-medium">legislație și resurse</Link> despre căminele de bătrâni, <Link href="/stiri" className="text-gold hover:underline font-medium">știri despre căminele de bătrâni</Link> din România, sau poți afla <Link href="/cum-functioneaza" className="text-gold hover:underline font-medium">cum funcționează Seniore.ro</Link>. Pentru a adăuga un cămin în director, accesează pagina de <Link href="/contact" className="text-gold hover:underline font-medium">contact</Link>.
                </p>
              </div>
            </div>

          </div>
        </section>

        <FaqSection
          title={`Întrebări frecvente — cămine de bătrâni în ${judet}`}
          items={[
            {
              question: `Câte cămine de bătrâni sunt în județul ${judet}?`,
              answer: `În județul ${judet} sunt ${camineInJudet.length} cămine de bătrâni indexate în portalul nostru, din care ${licensed.length} sunt licențiate de Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale (MMJS).`,
            },
            {
              question: `Care sunt localitățile cu cămine de bătrâni în județul ${judet}?`,
              answer: orase.length > 0
                ? `Cămine de bătrâni din ${judet} se găsesc în următoarele localități: ${orase.join(", ")}.`
                : `Informațiile despre localitățile cu cămine de bătrâni în ${judet} sunt actualizate periodic pe pagina fiecărui județ.`,
            },
            {
              question: `Ce prețuri au căminele de bătrâni în județul ${judet}?`,
              answer: `Prețurile la căminele de bătrâni din ${judet} variază în funcție de tipul centrului (public sau privat), gradul de dependență al rezidentului și serviciile incluse. Centrele publice au coplături între 1.500 și 3.000 lei/lună, iar cele private pornesc de la 3.500 lei/lună. Contactează direct fiecare centru pentru un deviz personalizat.`,
            },
            {
              question: `Cum aleg un cămin de bătrâni în județul ${judet}?`,
              answer: `Pentru a alege un cămin de bătrâni în ${judet}, verifică: 1) dacă centrul are licență MMJS, 2) capacitatea și raportul personal-rezident, 3) serviciile medicale incluse, 4) locația și accesul familiei, 5) prețul și ce include tariful. Recomandăm vizitarea centrului înainte de decizie.`,
            },
            {
              question: `Ce este un cămin de bătrâni licențiat?`,
              answer: `Un cămin de bătrâni licențiat este autorizat de Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale (MMJS) pentru a furniza servicii sociale rezidențiale. Din cele ${camineInJudet.length} centre din ${judet}, ${licensed.length} au licență MMJS activă.`,
            },
          ]}
        />

        {/* Back */}
        <div className="pb-12 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <Link
              href="/camine"
              className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Înapoi la portalul național
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
