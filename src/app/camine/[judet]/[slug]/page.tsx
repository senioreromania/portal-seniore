import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Globe,
  MapPin,
  Star,
  Navigation,
  ShieldCheck,
  Users,
  FileText,
  ChevronRight,
  ArrowLeft,
  Building2,
} from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import { buildCaminMetadata, nursingHomeJsonLd, breadcrumbJsonLd, faqCaminJsonLd, normalizeJudet, SITE_NAME, slugifyJudet, titleCase, caminPath } from "@/lib/seo";
import { FaqSection } from "@/components/faq-section";
import { PromoteCaminButton } from "./promote-button";
import { ShareButton } from "./share-button";
import { createClient } from "@/lib/supabase-server";
import camineData from "@/data/camine-director.json";

type Camin = {
  id?: string;
  slug: string;
  name: string;
  phone: string;
  internationalPhone?: string;
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
  licenseDate: string;
  cui: string;
  serviceType: string;
  localitate: string;
  description?: string;
  images?: string[];
  tip?: string;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return (camineData as Camin[]).map((c) => ({
    judet: slugifyJudet(normalizeJudet(c.judet) || c.judet),
    slug: c.slug,
  }));
}

async function getCaminFromSupabase(slug: string): Promise<Camin | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("camine")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug || `sb-${data.id}`,
    name: data.nume,
    phone: data.telefon || "",
    internationalPhone: data.telefon || "",
    website: data.website || "",
    address: data.adresa || "",
    lat: data.lat || 0,
    lng: data.lng || 0,
    judet: data.judet || "",
    rating: data.rating || 0,
    reviews: data.reviews || 0,
    licensed: data.licensed || false,
    capacity: data.capacity ? String(data.capacity) : "",
    licenseNumber: data.license_number || "",
    licenseDate: "",
    cui: "",
    serviceType: (data.servicii && Array.isArray(data.servicii)) ? data.servicii.join(", ") : "",
    localitate: data.oras || "",
    description: data.descriere || "",
    images: (data.images && Array.isArray(data.images)) ? data.images : [],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ judet: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let camin: Camin | undefined = await getCaminFromSupabase(slug) ?? undefined;

  if (!camin) {
    camin = (camineData as Camin[]).find((c) => c.slug === slug);
  }

  if (!camin) {
    return {
      title: `Cămin negăsit — ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }
  return buildCaminMetadata(camin);
}

export default async function CaminDetailPage({
  params,
}: {
  params: Promise<{ judet: string; slug: string }>;
}) {
  const { judet: judetParam, slug } = await params;
  let camin: Camin | undefined = await getCaminFromSupabase(slug) ?? undefined;

  if (!camin) {
    camin = (camineData as Camin[]).find((c) => c.slug === slug);
  }

  if (!camin) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Cămin negăsit
            </h1>
            <Link
              href="/camine"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Înapoi la portal
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const hasCoords = camin.lat && camin.lng;
  const mapsDirectionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${camin.lat},${camin.lng}`
    : camin.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camin.name + " " + camin.address)}`
      : "";

  const wazeDirectionsUrl = hasCoords
    ? `https://www.waze.com/ul?navigate=yes&ll=${camin.lat},${camin.lng}`
    : camin.address
      ? `https://www.waze.com/search?q=${encodeURIComponent(camin.name + " " + camin.address)}`
      : "";

  const mapsEmbedUrl = hasCoords
    ? `https://maps.google.com/maps?q=${camin.lat},${camin.lng}&z=14&output=embed`
    : "";

  // Find related in same judet
  const caminJudet = normalizeJudet(camin.judet);
  const related = (camineData as Camin[])
    .filter((c) => normalizeJudet(c.judet) === caminJudet && c.slug !== camin.slug)
    .slice(0, 4);

  const thisCaminPath = caminPath(camin);

  return (
    <>
      <JsonLd data={nursingHomeJsonLd(camin)} />
      <JsonLd data={faqCaminJsonLd(camin)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", url: "/" },
          { name: "Portal cămine", url: "/camine" },
          { name: camin.judet, url: `/judet/${judetParam}` },
          { name: camin.name, url: thisCaminPath },
        ])}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gold/10 border-b border-navy-deep/5">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-navy-deep/50">
              <Link href="/" className="hover:text-navy-deep transition-colors">
                Acasă
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href="/camine"
                className="hover:text-navy-deep transition-colors"
              >
                Portal cămine
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href={`/judet/${judetParam}`}
                className="hover:text-navy-deep transition-colors"
              >
                {camin.judet}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70 truncate">{camin.name}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="relative overflow-hidden bg-gold/20 pt-12 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-navy-deep/10 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
              <div className="flex items-center justify-center size-12 sm:size-14 rounded-xl bg-navy-deep/10 shrink-0">
                <Building2 className="size-6 sm:size-7 text-navy-deep" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-heading text-xl sm:text-2xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                  {titleCase(camin.name)}
                </h1>
                {camin.judet && (
                  <div className="flex items-center gap-2 text-sm text-navy-deep/50 mt-2">
                    <MapPin className="size-4 shrink-0" />
                    {camin.localitate && (
                      <span>{camin.localitate}, </span>
                    )}
                    <span>Județul {camin.judet}</span>
                  </div>
                )}
              </div>
              {camin.licensed && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 shrink-0 self-start">
                  <ShieldCheck className="size-4 text-gold" />
                  <span className="text-xs font-semibold text-navy-deep uppercase tracking-wide">
                    Licențiat
                  </span>
                </div>
              )}
              {camin.tip === "Public" && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 shrink-0 self-start">
                  <Building2 className="size-4 text-blue-700" />
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    Instituție publică
                  </span>
                </div>
              )}
              {camin.tip !== "Public" && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shrink-0 self-start">
                  <Building2 className="size-4 text-emerald-700" />
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                    Privat
                  </span>
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
              {camin.rating && Number(camin.rating) > 0 ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Star className="size-4 text-gold fill-gold" />
                  <span className="text-sm font-semibold text-navy-deep">
                    {camin.rating}
                  </span>
                  {camin.reviews && Number(camin.reviews) > 0 && (
                    <span className="text-xs text-navy-deep/40">
                      ({camin.reviews} recenzii Google)
                    </span>
                  )}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Star className="size-4 text-navy-deep/30" />
                  <span className="text-sm text-navy-deep/50">
                    Fără Google Reviews
                  </span>
                </div>
              )}
              {camin.capacity && Number(camin.capacity) > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <Users className="size-4 text-navy-deep/50" />
                  <span className="text-sm font-semibold text-navy-deep">
                    {camin.capacity} locuri
                  </span>
                </div>
              )}
              {camin.serviceType && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-navy-deep/10">
                  <FileText className="size-4 text-navy-deep/50" />
                  <span className="text-sm text-navy-deep/70">
                    {camin.serviceType}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-paper">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Contact info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                  <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                    Date de contact
                  </h2>
                  <div className="space-y-3">
                    {camin.phone && (
                      <a
                        href={`tel:${camin.internationalPhone || camin.phone}`}
                        className="group flex items-center gap-4 p-3 rounded-lg bg-paper hover:bg-gold/5 transition-colors"
                      >
                        <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10 group-hover:bg-gold transition-colors">
                          <Phone className="size-5 text-gold group-hover:text-navy-deep transition-colors" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Telefon
                          </div>
                          <div className="font-heading text-base font-semibold text-navy-deep">
                            {camin.phone}
                          </div>
                        </div>
                      </a>
                    )}
                    {camin.website && (
                      <a
                        href={camin.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-3 rounded-lg bg-paper hover:bg-gold/5 transition-colors"
                      >
                        <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10 group-hover:bg-gold transition-colors">
                          <Globe className="size-5 text-gold group-hover:text-navy-deep transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Website
                          </div>
                          <div className="font-heading text-base font-semibold text-navy-deep truncate">
                            {camin.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </div>
                        </div>
                      </a>
                    )}
                    {camin.address && (
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-paper">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-navy-deep/5">
                          <MapPin className="size-5 text-navy-deep" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Adresă
                          </div>
                          <div className="text-sm text-navy-deep/80">
                            {camin.address}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Directions buttons */}
                  {mapsDirectionsUrl && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-5">
                      <a
                        href={mapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 flex-1 justify-center bg-navy-deep text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-navy-deep/90 hover:shadow-lg hover:shadow-navy-deep/20"
                      >
                        <Navigation className="size-4" />
                        Direcții pe Google Maps
                      </a>
                      {wazeDirectionsUrl && (
                        <a
                          href={wazeDirectionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 flex-1 justify-center bg-[#33CCFF] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#33CCFF]/20"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5l-3-3 1.41-1.41L10.5 13.67l5.59-5.58L17.5 9.5l-7 7z"/>
                          </svg>
                          Direcții pe Waze
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* License info */}
                {camin.licensed && (
                  <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="size-6 text-gold" />
                      <h2 className="font-heading text-lg font-bold text-navy-deep">
                        Status licențiere
                      </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {camin.cui && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            CUI
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.cui}
                          </div>
                        </div>
                      )}
                      {camin.licenseNumber && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            Nr. licență
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.licenseNumber}
                          </div>
                        </div>
                      )}
                      {camin.licenseDate && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            Data licențiere
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.licenseDate}
                          </div>
                        </div>
                      )}
                      {camin.capacity && (
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide mb-1">
                            Capacitate
                          </div>
                          <div className="text-sm font-semibold text-navy-deep">
                            {camin.capacity} locuri
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-navy-deep/40 mt-4 leading-relaxed">
                      Date conform listei oficiale a Ministerului Muncii,
                      Familiei, Tineretului și Solidarității Sociale.
                    </p>
                  </div>
                )}

                {/* Map */}
                {mapsEmbedUrl && (
                  <div className="rounded-xl overflow-hidden border border-navy-deep/10 shadow-sm">
                    <iframe
                      src={mapsEmbedUrl}
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Hartă — ${camin.name}`}
                    />
                  </div>
                )}

                {/* Gallery */}
                {camin.images && camin.images.length > 0 && (
                  <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                    <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                      Galerie foto
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {camin.images.map((url, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={url}
                          src={url}
                          alt={`${camin.name} — imagine ${i + 1}`}
                          className="w-full h-32 sm:h-40 object-cover rounded-lg border border-navy-deep/10"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                  <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                    Despre {titleCase(camin.name)}
                  </h2>
                  {camin.description && camin.description.trim() ? (
                    <p className="text-sm text-navy-deep/70 leading-relaxed">
                      {camin.description}
                    </p>
                  ) : (
                    <p className="text-sm text-navy-deep/50 italic">
                      Momentan fără descriere.
                    </p>
                  )}
                </div>

                {/* Owner CTA */}
                <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
                  <p className="text-sm text-navy-deep/70 mb-3">
                    Ești proprietarul acestui cămin de bătrâni și dorești modificări / actualizări? Contactează echipa Seniore.ro.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gold text-navy-deep px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                  >
                    <Phone className="size-4" />
                    Contact
                  </Link>
                </div>

                {/* SEO contextual links */}
                <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                  <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                    Alte detalii
                  </h2>
                  <p className="text-sm text-navy-deep/60 leading-relaxed">
                    {camin.name} este un cămin de bătrâni din {camin.localitate || camin.judet}, indexat în portalul <Link href="/camine" className="text-gold hover:underline font-medium">Seniore.ro</Link>. Cauți și alte opțiuni? Vezi <Link href={`/judet/${judetParam}`} className="text-gold hover:underline font-medium">cămine de bătrâni în {camin.judet}</Link> sau <Link href="/camine-autorizate" className="text-gold hover:underline font-medium">cămine licențiate MMJS</Link> din întreaga țară.
                  </p>
                  <p className="text-sm text-navy-deep/60 leading-relaxed mt-3">
                    Conform <a href="https://www.cdep.ro/ords/pls/legis/legis_pck.htp_act?ida=113748" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legii nr. 197/2012 privind asigurarea calității serviciilor sociale</a>, centrele rezidențiale pentru vârstnici trebuie să dețină licență de funcționare emisă de <a href="https://mmuncii.gov.ro/acreditare-furnizori-si-servicii-sociale/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale</a>. {camin.licensed ? `${camin.name} figurează în lista oficială a căminelor licențiate.` : `Recomandăm să verifici direct la centru statusul de licențiere.`} Lista completă a căminelor licențiate este publicată de <a href="https://mmuncii.gov.ro/wp-content/uploads/2026/03/10032026_Camine_PV.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">MMPS (PDF)</a>.
                  </p>
                  <p className="text-sm text-navy-deep/60 leading-relaxed mt-3">
                    Pentru informații despre drepturile persoanelor vârstnice, consultă <a href="https://legislatie.just.ro/Public/DetaliiDocument/21309" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legea nr. 17/2000 privind asistența socială a persoanelor vârstnice</a>. Dacă ai nevoie de sprijin pentru îngrijirea unui vârstnic cu demență, <a href="https://alz.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Societatea Română Alzheimer</a> oferă consiliere și resurse. Pentru informații despre pensii și drepturi de asigurări sociale, poți accesa <a href="https://www.cnpp.ro/web/guest/home" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Casa Națională de Pensii Publice</a>.
                  </p>
                  <p className="text-sm text-navy-deep/60 leading-relaxed mt-3">
                    Alte resurse utile: <a href="https://caritasromania.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Confederația Caritas România</a> — îngrijire la domiciliu pentru vârstnici, <a href="https://cnoppv.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Consiliul Național al Organizațiilor de Pensionari</a>, <a href="https://seniorinet.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Federația SenioriNET</a> și <a href="https://www.adivromania.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Asociația Directorilor Instituțiilor pentru Vârstnici (A.D.I.V.)</a>. Pe site-ul nostru găsești și <Link href="/resurse" className="text-gold hover:underline font-medium">legislație și resurse</Link> sau <Link href="/stiri" className="text-gold hover:underline font-medium">știri despre căminele de bătrâni</Link> din România.
                  </p>
                </div>
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* Contact CTA */}
                <div className="p-6 rounded-xl bg-navy-deep">
                  <h3 className="font-heading text-base font-bold text-paper mb-2">
                    Contactează acest cămin
                  </h3>
                  <p className="text-sm text-paper/60 leading-relaxed mb-4">
                    Sună direct pentru informații despre locuri disponibile,
                    tarife și condiții de cazare.
                  </p>
                  {camin.phone ? (
                    <a
                      href={`tel:${camin.internationalPhone || camin.phone}`}
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Phone className="size-4" />
                      {camin.phone}
                    </a>
                  ) : camin.website ? (
                    <a
                      href={camin.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Globe className="size-4" />
                      Vizitează website
                    </a>
                  ) : mapsDirectionsUrl ? (
                    <a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Navigation className="size-4" />
                      Direcții pe hartă
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                    >
                      Contact Seniore.ro
                    </Link>
                  )}
                  {camin.phone && (
                    <a
                      href={`https://wa.me/${(camin.internationalPhone || camin.phone).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Bună ziua, aș dori informații despre locurile disponibile la ${camin.name}.` )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 w-full justify-center bg-[#25D366] text-white px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20 mt-2"
                    >
                      <WhatsAppIcon className="size-4" />
                      Contact WhatsApp
                    </a>
                  )}
                </div>

                {/* Promote CTA */}
                <PromoteCaminButton caminSlug={camin.slug} caminPath={thisCaminPath} caminId={camin.id} />

                {/* Related */}
                {related.length > 0 && (
                  <div className="p-6 rounded-xl bg-white border border-navy-deep/10">
                    <h3 className="font-heading text-base font-bold text-navy-deep mb-4">
                      Alte cămine în {camin.judet}
                    </h3>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/camine/${judetParam}/${r.slug}`}
                          className="group flex items-center justify-between gap-2 text-sm text-navy-deep/70 hover:text-gold transition-colors"
                        >
                          <span className="line-clamp-1">{r.name}</span>
                          <ChevronRight className="size-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/judet/${judetParam}`}
                      className="block mt-4 pt-4 border-t border-navy-deep/5 text-sm font-semibold text-gold hover:underline"
                    >
                      Vezi toate din {camin.judet}
                    </Link>
                  </div>
                )}

                {/* Share */}
                <div className="p-6 rounded-xl bg-navy-deep">
                  <h3 className="font-heading text-base font-bold text-paper mb-2">
                    Trimite unui prieten
                  </h3>
                  <p className="text-sm text-paper/60 leading-relaxed mb-4">
                    Cunoști pe cineva care caută un cămin de bătrâni în {camin.localitate || camin.judet}? Distribuie această pagină.
                  </p>
                  <ShareButton caminName={camin.name} />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-navy-deep/10">
              <Link
                href="/camine"
                className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Înapoi la portalul căminelor
              </Link>
            </div>
          </div>
        </section>

        <FaqSection
          title={`Întrebări frecvente — ${camin.name}`}
          items={[
            {
              question: `${camin.name} este licențiat?`,
              answer: camin.licensed
                ? `Da, ${camin.name} are licență MMJS (Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale) pentru furnizarea de servicii sociale rezidențiale.${camin.licenseNumber ? ` Număr licență: ${camin.licenseNumber}.` : ""}${camin.licenseDate ? ` Data licențierii: ${camin.licenseDate}.` : ""}`
                : `${camin.name} nu apare în lista oficială a căminelor licențiate de MMJS. Recomandăm să contactezi direct centrul pentru a verifica statusul de licențiere și autorizațiile actuale.`,
            },
            ...(camin.capacity ? [{
              question: `Câte locuri are ${camin.name}?`,
              answer: `${camin.name} are o capacitate de ${camin.capacity} locuri. Contactează centrul pentru a verifica disponibilitatea.`,
            }] : []),
            ...(camin.address || camin.localitate || camin.judet ? [{
              question: `Unde se află ${camin.name}?`,
              answer: `${camin.name} se află la ${[camin.address, camin.localitate, camin.judet].filter(Boolean).join(", ")}.${camin.lat && camin.lng ? " Poți vedea locația exactă pe harta de pe această pagină și obține direcții pe Google Maps." : ""}`,
            }] : []),
            ...(camin.phone ? [{
              question: `Cum contactez ${camin.name}?`,
              answer: camin.website ? (
                <>
                  Poți contacta {camin.name} la numărul de telefon{" "}
                  <a href={`tel:${camin.internationalPhone || camin.phone}`} className="text-gold font-semibold hover:underline">
                    {camin.phone}
                  </a>
                  . De asemenea, poți vizita website-ul oficial:{" "}
                  <a href={camin.website} target="_blank" rel="noopener noreferrer" className="text-gold font-semibold hover:underline">
                    {camin.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </>
              ) : (
                <>
                  Poți contacta {camin.name} la numărul de telefon{" "}
                  <a href={`tel:${camin.internationalPhone || camin.phone}`} className="text-gold font-semibold hover:underline">
                    {camin.phone}
                  </a>
                  .
                </>
              ),
            }] : camin.website ? [{
              question: `Cum contactez ${camin.name}?`,
              answer: (
                <>
                  Poți contacta {camin.name} prin website-ul oficial:{" "}
                  <a href={camin.website} target="_blank" rel="noopener noreferrer" className="text-gold font-semibold hover:underline">
                    {camin.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                  .
                </>
              ),
            }] : [{
              question: `Cum obțin informații despre ${camin.name}?`,
              answer: `Pentru informații despre ${camin.name}, poți folosi harta de pe această pagină pentru a obține direcții sau ne poți contacta prin portalul nostru.`,
            }]),
            ...(camin.serviceType ? [{
              question: `Ce tip de servicii oferă ${camin.name}?`,
              answer: `${camin.name} oferă servicii de tip: ${camin.serviceType}.`,
            }] : []),
          ]}
        />

        {/* Back */}
        <div className="pb-12 bg-paper">
          <div className="max-w-5xl mx-auto px-6">
            <Link
              href="/camine"
              className="group inline-flex items-center gap-2 text-navy-deep font-semibold text-sm hover:text-gold transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Înapoi la portalul căminelor
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
