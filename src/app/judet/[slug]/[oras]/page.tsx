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
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import {
  buildOrasMetadata,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqOrasJsonLd,
  normalizeJudet,
  slugifyJudet,
  titleCase,
  type Camin,
} from "@/lib/seo";
import { FaqSection } from "@/components/faq-section";
import camineData from "@/data/camine-director.json";

const allCamine = camineData as Camin[];

type OrasParam = { slug: string; oras: string };

const oraseByJudetSlug = new Map<string, { judet: string; orase: Map<string, string> }>();

allCamine.forEach((c) => {
  const judet = normalizeJudet(c.judet);
  if (!judet || !c.localitate) return;
  const judetSlug = slugifyJudet(judet);
  const orasSlug = slugifyJudet(c.localitate);
  if (!oraseByJudetSlug.has(judetSlug)) {
    oraseByJudetSlug.set(judetSlug, { judet, orase: new Map() });
  }
  const entry = oraseByJudetSlug.get(judetSlug)!;
  if (!entry.orase.has(orasSlug)) {
    entry.orase.set(orasSlug, c.localitate);
  }
});

export function generateStaticParams() {
  const params: OrasParam[] = [];
  oraseByJudetSlug.forEach((entry, judetSlug) => {
    entry.orase.forEach((_, orasSlug) => {
      params.push({ slug: judetSlug, oras: orasSlug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; oras: string }>;
}): Promise<Metadata> {
  const { slug, oras } = await params;
  const entry = oraseByJudetSlug.get(slug);
  if (!entry) return { title: "Oraș negăsit — Cămin de Bătrâni România" };
  const orasName = entry.orase.get(oras);
  if (!orasName) return { title: "Oraș negăsit — Cămin de Bătrâni România" };

  const camineInOras = allCamine.filter(
    (c) =>
      normalizeJudet(c.judet) === entry.judet &&
      slugifyJudet(c.localitate) === oras
  );

  return buildOrasMetadata(orasName, entry.judet, camineInOras.length);
}

export default async function OrasPage({
  params,
}: {
  params: Promise<{ slug: string; oras: string }>;
}) {
  const { slug, oras } = await params;
  const entry = oraseByJudetSlug.get(slug);
  if (!entry) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Oraș negăsit
            </h1>
            <Link href="/camine" className="inline-flex items-center gap-2 text-gold font-semibold hover:underline">
              <ArrowLeft className="size-4" />
              Înapoi la portal
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const orasName = entry.orase.get(oras);
  if (!orasName) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Oraș negăsit
            </h1>
            <Link href="/camine" className="inline-flex items-center gap-2 text-gold font-semibold hover:underline">
              <ArrowLeft className="size-4" />
              Înapoi la portal
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const judet = entry.judet;
  const camineInOras = allCamine.filter(
    (c) =>
      normalizeJudet(c.judet) === judet &&
      slugifyJudet(c.localitate) === oras
  );

  const licensed = camineInOras.filter((c) => c.licensed);

  const jsonLdData = collectionPageJsonLd(
    `${orasName}, ${judet}`,
    camineInOras.length,
    camineInOras
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", url: "/" },
          { name: "Cămine de bătrâni", url: "/camine" },
          { name: judet, url: `/judet/${slug}` },
          { name: orasName, url: `/judet/${slug}/${oras}` },
        ])}
      />
      <JsonLd data={jsonLdData} />
      <JsonLd data={faqOrasJsonLd({ oras: orasName, judet, count: camineInOras.length, licensed: licensed.length })} />
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gold/10 border-b border-navy-deep/5">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-navy-deep/50">
              <Link href="/" className="hover:text-navy-deep transition-colors">Acasă</Link>
              <ChevronRight className="size-3.5" />
              <Link href="/camine" className="hover:text-navy-deep transition-colors">Cămine de bătrâni</Link>
              <ChevronRight className="size-3.5" />
              <Link href={`/judet/${slug}`} className="hover:text-navy-deep transition-colors">{judet}</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70 truncate">{orasName}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-12 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="flex items-center gap-2 text-sm text-navy-deep/50 mb-4">
              <MapPin className="size-4" />
              <span>{orasName}, Județul {judet}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6">
              Cămine de bătrâni în {orasName}
            </h1>
            <p className="text-lg text-navy-deep/70 max-w-2xl">
              {camineInOras.length} cămine de bătrâni în {orasName}, județul {judet}.
              Prețuri, contact, hartă, licență și direcții pentru fiecare centru.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-paper border-b border-navy-deep/5">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-navy-deep/10">
              <div className="text-2xl font-bold text-navy-deep">{camineInOras.length}</div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">Cămine</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-navy-deep/10">
              <div className="text-2xl font-bold text-navy-deep">{licensed.length}</div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">Licențiate</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-navy-deep/10">
              <div className="text-2xl font-bold text-navy-deep">{camineInOras.filter(c => c.phone).length}</div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">Cu telefon</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-navy-deep/10">
              <div className="text-2xl font-bold text-navy-deep">{camineInOras.filter(c => c.rating).length}</div>
              <div className="text-xs text-navy-deep/50 uppercase tracking-wide">Cu rating</div>
            </div>
          </div>
        </section>

        {/* List */}
        <section className="py-12 bg-paper">
          <div className="max-w-5xl mx-auto px-6">
            <div className="space-y-4">
              {camineInOras.map((camin) => (
                <Link
                  key={camin.slug}
                  href={`/camine/${slug}/${camin.slug}`}
                  className="group block p-6 rounded-xl bg-white border border-navy-deep/10 hover:border-gold/30 hover:shadow-lg hover:shadow-navy-deep/5 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-heading text-lg font-bold text-navy-deep group-hover:text-gold transition-colors mb-1">
                        {titleCase(camin.name)}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-navy-deep/50">
                        {camin.localitate && (
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            {camin.localitate}
                          </span>
                        )}
                        {camin.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="size-3.5" />
                            {camin.phone}
                          </span>
                        )}
                        {camin.capacity && (
                          <span className="flex items-center gap-1">
                            <Users className="size-3.5" />
                            {camin.capacity} locuri
                          </span>
                        )}
                        {camin.rating && Number(camin.rating) > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="size-3.5 text-gold fill-gold" />
                            {camin.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    {camin.licensed && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20 shrink-0">
                        <ShieldCheck className="size-3.5 text-gold" />
                        <span className="text-xs font-semibold text-navy-deep">Licențiat</span>
                      </div>
                    )}
                    {camin.tip === "Public" && (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 shrink-0">
                        Instituție publică
                      </span>
                    )}
                    {camin.tip !== "Public" && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 shrink-0">
                        Privat
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* SEO contextual links */}
            <div className="mt-10 pt-8 border-t border-navy-deep/10">
              <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                Alte detalii
              </h2>
              <div className="space-y-3 text-sm text-navy-deep/60 leading-relaxed max-w-3xl">
                <p>
                  În {orasName}, județul {judet}, există {camineInOras.length} de cămine de bătrâni și centre de îngrijire a vârstnicilor, din care {licensed.length} sunt licențiate de <a href="https://mmuncii.gov.ro/acreditare-furnizori-si-servicii-sociale/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale</a>. Poți vedea și <Link href={`/judet/${slug}`} className="text-gold hover:underline font-medium">toate căminele de bătrâni din județul {judet}</Link> sau <Link href="/camine-autorizate" className="text-gold hover:underline font-medium">căminele licențiate din întreaga țară</Link>.
                </p>
                <p>
                  Conform <a href="https://legislatie.just.ro/Public/DetaliiDocument/21309" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legii nr. 17/2000 privind asistența socială a persoanelor vârstnice</a> și <a href="https://www.cdep.ro/ords/pls/legis/legis_pck.htp_act?ida=113748" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legii nr. 197/2012 privind asigurarea calității serviciilor sociale</a>, centrele rezidențiale pentru vârstnici trebuie să dețină licență de funcționare. Lista oficială a căminelor licențiate este publicată de <a href="https://mmuncii.gov.ro/wp-content/uploads/2026/03/10032026_Camine_PV.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">MMPS (PDF)</a>.
                </p>
                <p>
                  Pentru sprijin în îngrijirea vârstnicilor cu demență, <a href="https://alz.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Societatea Română Alzheimer</a> oferă consiliere și resurse. <a href="https://caritasromania.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Confederația Caritas România</a> și <a href="https://cag.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Fundația Crucea Alb-Galbenă</a> oferă servicii de îngrijire la domiciliu. Pentru informații despre pensii, consultă <a href="https://www.cnpp.ro/web/guest/home" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Casa Națională de Pensii Publice</a>.
                </p>
                <p>
                  Pe site-ul nostru găsești și <Link href="/resurse" className="text-gold hover:underline font-medium">legislație și resurse</Link>, <Link href="/stiri" className="text-gold hover:underline font-medium">știri despre căminele de bătrâni</Link>, sau poți afla <Link href="/cum-functioneaza" className="text-gold hover:underline font-medium">cum funcționează Seniore.ro</Link>.
                </p>
              </div>
            </div>

            <FaqSection
              title={`Întrebări frecvente — cămine de bătrâni în ${orasName}`}
              items={[
                {
                  question: `Câte cămine de bătrâni sunt în ${orasName}, județul ${judet}?`,
                  answer: `În ${orasName}, județul ${judet}, sunt ${camineInOras.length} cămine de bătrâni indexate, din care ${licensed.length} sunt licențiate MMJS.`,
                },
                {
                  question: `Care cămine din ${orasName} sunt licențiate?`,
                  answer: `Din cele ${camineInOras.length} centre din ${orasName}, ${licensed.length} au licență MMJS activă. Verifică statusul de licențiere pe pagina fiecărui cămin.`,
                },
                {
                  question: `Cum găsesc un cămin de bătrâni în ${orasName}?`,
                  answer: `Pe această pagină găsești toate ${camineInOras.length} căminele de bătrâni din ${orasName}, ${judet}. Fiecare centru are pagină proprie cu date de contact, hartă, capacitate și status de licențiere.`,
                },
              ]}
            />

            {/* Back */}
            <div className="mt-10 pt-8 border-t border-navy-deep/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/judet/${slug}`}
                className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Toate căminele din {judet}
              </Link>
              <Link
                href="/camine"
                className="text-sm text-navy-deep/50 hover:text-gold transition-colors"
              >
                Portal național cămine
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
