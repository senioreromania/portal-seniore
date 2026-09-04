import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Globe,
  Star,
  ChevronRight,
  ArrowLeft,
  Navigation,
  Crown,
  Mail,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, slugifyJudet } from "@/lib/seo";
import {
  getFunerareBySlug,
  buildFunerareDetailMetadata,
  judetFromSlug,
  tipLabel,
  tipColor,
  type Funerare,
} from "@/lib/funerare";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ judet: string; slug: string }>;
}): Promise<Metadata> {
  const { judet: judetSlug, slug } = await params;
  const judet = judetFromSlug(judetSlug);
  if (!judet) {
    return {
      title: "Firmă negăsită — Servicii funerare",
      robots: { index: false, follow: false },
    };
  }

  const f = await getFunerareBySlug(judet, slug);
  if (!f) {
    return {
      title: "Firmă negăsită — Servicii funerare",
      robots: { index: false, follow: false },
    };
  }

  return buildFunerareDetailMetadata(f);
}

export default async function FunerareDetailPage({
  params,
}: {
  params: Promise<{ judet: string; slug: string }>;
}) {
  const { judet: judetSlug, slug } = await params;
  const judet = judetFromSlug(judetSlug);

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
              href="/servicii-funerare"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Înapoi la servicii funerare
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const f = await getFunerareBySlug(judet, slug);

  if (!f) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-4">
              Firmă negăsită
            </h1>
            <Link
              href={`/servicii-funerare/${judetSlug}`}
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Vezi serviciile funerare din {judet}
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const mapsDirUrl = f.lat && f.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`
    : f.adresa
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.nume + " " + f.adresa)}`
      : null;

  const mapsEmbedUrl = f.lat && f.lng
    ? `https://maps.google.com/maps?q=${f.lat},${f.lng}&z=14&output=embed`
    : f.adresa
      ? `https://maps.google.com/maps?q=${encodeURIComponent(f.nume + " " + f.adresa)}&z=14&output=embed`
      : null;

  // JSON-LD LocalBusiness
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: f.nume,
    address: {
      "@type": "PostalAddress",
      streetAddress: f.adresa || "",
      addressLocality: f.oras || "",
      addressRegion: f.judet,
      addressCountry: "RO",
    },
    ...(f.telefon ? { telephone: f.telefon } : {}),
    ...(f.website ? { url: f.website } : {}),
    ...(f.lat && f.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: f.lat,
            longitude: f.lng,
          },
        }
      : {}),
    ...(f.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: f.rating,
            reviewCount: f.reviews || 0,
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", url: "/" },
          { name: "Servicii funerare", url: "/servicii-funerare" },
          {
            name: `Servicii funerare ${judet}`,
            url: `/servicii-funerare/${judetSlug}`,
          },
          {
            name: f.nume,
            url: `/servicii-funerare/${judetSlug}/firma/${f.slug}`,
          },
        ])}
      />
      <JsonLd data={localBusinessJsonLd} />
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
                href="/servicii-funerare"
                className="hover:text-navy-deep transition-colors"
              >
                Servicii funerare
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href={`/servicii-funerare/${judetSlug}`}
                className="hover:text-navy-deep transition-colors"
              >
                {judet}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70 line-clamp-1">{f.nume}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-12 pb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tipColor(f.tip)}`}
              >
                {tipLabel(f.tip)}
              </span>
              {f.is_premium && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-deep px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
                  <Crown className="size-3" />
                  Premium
                </span>
              )}
              {f.rating && f.rating > 0 && (
                <span className="inline-flex items-center gap-1.5 text-sm text-navy-deep/60">
                  <Star className="size-4 text-gold fill-gold" />
                  <span className="font-bold text-navy-deep">{f.rating}</span>
                  {f.reviews && (
                    <span className="text-navy-deep/40">
                      ({f.reviews} recenzii)
                    </span>
                  )}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy-deep leading-[1.1] text-balance mb-4">
              {f.nume}
            </h1>

            <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl">
              {tipLabel(f.tip)} în {f.oras}, județul {f.judet}
              {f.adresa ? ` — ${f.adresa}` : ""}.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="bg-white rounded-xl border border-navy-deep/8 p-6">
                  <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                    Date de contact
                  </h2>
                  <div className="space-y-3">
                    {f.telefon && (
                      <a
                        href={`tel:${f.telefon.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-sm text-navy-deep hover:text-gold transition-colors"
                      >
                        <div className="size-10 rounded-lg bg-gold/10 flex items-center justify-center">
                          <Phone className="size-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Telefon
                          </div>
                          <div className="font-semibold">{f.telefon}</div>
                        </div>
                      </a>
                    )}
                    {f.email && (
                      <a
                        href={`mailto:${f.email}`}
                        className="flex items-center gap-3 text-sm text-navy-deep hover:text-gold transition-colors"
                      >
                        <div className="size-10 rounded-lg bg-gold/10 flex items-center justify-center">
                          <Mail className="size-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Email
                          </div>
                          <div className="font-semibold">{f.email}</div>
                        </div>
                      </a>
                    )}
                    {f.website && (
                      <a
                        href={f.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-navy-deep hover:text-gold transition-colors"
                      >
                        <div className="size-10 rounded-lg bg-gold/10 flex items-center justify-center">
                          <Globe className="size-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Website
                          </div>
                          <div className="font-semibold line-clamp-1">
                            {f.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </div>
                        </div>
                      </a>
                    )}
                    {f.adresa && (
                      <div className="flex items-center gap-3 text-sm text-navy-deep">
                        <div className="size-10 rounded-lg bg-gold/10 flex items-center justify-center">
                          <MapPin className="size-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-navy-deep/40 uppercase tracking-wide">
                            Adresă
                          </div>
                          <div className="font-semibold">{f.adresa}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {mapsDirUrl && (
                    <a
                      href={mapsDirUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 bg-gold text-navy-deep px-5 py-3 rounded-lg font-semibold text-sm transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                    >
                      <Navigation className="size-4" />
                      Direcții pe Google Maps
                    </a>
                  )}
                </div>

                {/* Descriere */}
                {f.descriere && (
                  <div className="bg-white rounded-xl border border-navy-deep/8 p-6">
                    <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                      Despre {f.nume}
                    </h2>
                    <p className="text-navy-deep/60 leading-relaxed whitespace-pre-line">
                      {f.descriere}
                    </p>
                  </div>
                )}

                {/* Servicii */}
                {f.servicii && f.servicii.length > 0 && (
                  <div className="bg-white rounded-xl border border-navy-deep/8 p-6">
                    <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                      Servicii oferite
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {f.servicii.map((s, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-navy-deep/5 px-3 py-1.5 text-sm text-navy-deep/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Harta */}
                {mapsEmbedUrl && (
                  <div className="bg-white rounded-xl border border-navy-deep/8 p-6">
                    <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                      Locație pe hartă
                    </h2>
                    <div className="rounded-lg overflow-hidden border border-navy-deep/10">
                      <iframe
                        src={mapsEmbedUrl}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Hartă ${f.nume}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* Quick info */}
                <div className="bg-white rounded-xl border border-navy-deep/8 p-6">
                  <h3 className="font-heading text-base font-bold text-navy-deep mb-4">
                    Informații
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-navy-deep/50">Tip</dt>
                      <dd className="font-semibold text-navy-deep">
                        {tipLabel(f.tip)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-deep/50">Județ</dt>
                      <dd className="font-semibold text-navy-deep">{f.judet}</dd>
                    </div>
                    {f.oras && (
                      <div className="flex justify-between">
                        <dt className="text-navy-deep/50">Localitate</dt>
                        <dd className="font-semibold text-navy-deep">{f.oras}</dd>
                      </div>
                    )}
                    {f.rating && f.rating > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-navy-deep/50">Rating</dt>
                        <dd className="font-semibold text-navy-deep">
                          {f.rating} / 5
                        </dd>
                      </div>
                    )}
                    {f.reviews && (
                      <div className="flex justify-between">
                        <dt className="text-navy-deep/50">Recenzii</dt>
                        <dd className="font-semibold text-navy-deep">{f.reviews}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Back link */}
                <div className="bg-white rounded-xl border border-navy-deep/8 p-6">
                  <Link
                    href={`/servicii-funerare/${judetSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
                  >
                    <ArrowLeft className="size-4" />
                    Toate serviciile funerare din {judet}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
