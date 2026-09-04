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
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, slugifyJudet } from "@/lib/seo";
import {
  getFunerareByJudet,
  getOraseFromFunerare,
  buildFunerareJudetMetadata,
  judetFromSlug,
  tipLabel,
  tipColor,
  funerarePath,
  type Funerare,
} from "@/lib/funerare";

export async function generateStaticParams() {
  // We'll generate params dynamically — return empty, let it be SSR
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ judet: string }>;
}): Promise<Metadata> {
  const { judet: judetSlug } = await params;
  const judet = judetFromSlug(judetSlug);
  if (!judet) {
    return {
      title: "Județ negăsit — Servicii funerare",
      robots: { index: false, follow: false },
    };
  }
  // Quick count
  const funerare = await getFunerareByJudet(judet);
  return buildFunerareJudetMetadata(judet, funerare.length);
}

export default async function FunerareJudetPage({
  params,
}: {
  params: Promise<{ judet: string }>;
}) {
  const { judet: judetSlug } = await params;
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

  const funerare = await getFunerareByJudet(judet);
  const orase = getOraseFromFunerare(funerare);

  const pompeFunebre = funerare.filter((f) => f.tip === "pompe_funebre");
  const cimitire = funerare.filter((f) => f.tip === "cimitir");
  const crematorii = funerare.filter((f) => f.tip === "crematoriu");
  const withPhone = funerare.filter((f) => f.telefon);
  const withWebsite = funerare.filter((f) => f.website);

  // Related județe
  const allSlugs = [
    "alba", "arad", "arges", "bacau", "bihor", "bistrita-nasaud", "botosani",
    "brasov", "braila", "bucuresti", "buzau", "caras-severin", "calarasi",
    "cluj", "constanta", "covasna", "dambovita", "dolj", "galati", "giurgiu",
    "gorj", "harghita", "hunedoara", "ialomita", "iasi", "ilfov", "maramures",
    "mehedinti", "mures", "neamt", "olt", "prahova", "salaj", "satu-mare",
    "sibiu", "suceava", "teleorman", "timis", "tulcea", "valcea", "vaslui",
    "vrancea",
  ];
  const relatedSlugs = allSlugs
    .filter((s) => s !== judetSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

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
        ])}
      />
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
              <span className="text-navy-deep/70">{judet}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-16 pb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6">
              <MapPin className="size-3.5 text-navy-deep" />
              <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                Județul {judet}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6">
              Servicii funerare în județul {judet}
            </h1>

            <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-8">
              {funerare.length} servicii funerare în județul {judet} — pompe
              funebre, case funerare, cimitire și crematorii. Telefon, adresă,
              hartă și direcții pentru fiecare firmă.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {funerare.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Total firme
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {pompeFunebre.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Pompe funebre
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {cimitire.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Cimitire
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

        {/* Lista firme */}
        <section className="py-12 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            {funerare.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-navy-deep/40 text-lg">
                  Nu există servicii funerare indexate în județul {judet}.
                </p>
                <Link
                  href="/servicii-funerare"
                  className="mt-4 inline-flex items-center gap-2 text-gold font-semibold hover:underline"
                >
                  <ArrowLeft className="size-4" />
                  Vezi toate serviciile funerare din România
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold text-navy-deep">
                    Toate serviciile funerare din {judet} ({funerare.length})
                  </h2>
                  <Link
                    href="/servicii-funerare"
                    className="text-sm font-semibold text-gold hover:underline"
                  >
                    Director național
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {funerare.map((f) => (
                    <FunerareCard key={f.id} f={f} judetSlug={judetSlug} />
                  ))}
                </div>
              </>
            )}

            {/* Localități din județ */}
            {orase.length > 0 && (
              <div className="mt-12 pt-8 border-t border-navy-deep/10">
                <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
                  Servicii funerare după localitate în {judet}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {orase.map((oras) => {
                    const count = funerare.filter(
                      (f) => f.oras === oras
                    ).length;
                    return (
                      <Link
                        key={oras}
                        href={`/servicii-funerare/${judetSlug}/${slugifyJudet(oras)}`}
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
                Servicii funerare în alte județe
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {relatedSlugs.map((s) => {
                  const j = judetFromSlug(s);
                  if (!j) return null;
                  return (
                    <Link
                      key={s}
                      href={`/servicii-funerare/${s}`}
                      className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white border border-navy-deep/8 hover:border-gold/30 transition-all"
                    >
                      <span className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                        {j}
                      </span>
                      <ChevronRight className="size-4 text-navy-deep/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function FunerareCard({ f, judetSlug }: { f: Funerare; judetSlug: string }) {
  return (
    <Link
      href={`/servicii-funerare/${judetSlug}/firma/${f.slug}`}
      className={`group block h-full rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${
        f.is_premium
          ? "bg-white border-gold/40 hover:border-gold/70 hover:shadow-gold/20"
          : "bg-white border-navy-deep/8 hover:border-gold/30 hover:shadow-navy-deep/5 p-5"
      }`}
    >
      {f.is_premium && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-navy-deep border-b border-gold/30">
          <div className="flex items-center gap-1.5">
            <Crown className="size-3.5 text-gold" />
            <span className="text-xs font-bold uppercase tracking-wide text-gold">
              Premium
            </span>
          </div>
        </div>
      )}
      <div className={f.is_premium ? "p-5" : ""}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading text-base font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-2 text-navy-deep">
            {f.nume}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${tipColor(f.tip)}`}
          >
            {tipLabel(f.tip)}
          </span>
          {f.rating && f.rating > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
              <Star className="size-3 text-gold fill-gold" />
              {f.rating}
              {f.reviews && (
                <span className="text-navy-deep/30">({f.reviews})</span>
              )}
            </span>
          )}
        </div>

        {f.adresa && (
          <div className="flex items-start gap-2 text-sm mb-2 text-navy-deep/50">
            <MapPin className="size-4 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{f.adresa}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs mb-3 text-navy-deep/40">
          {f.oras && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {f.oras}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-navy-deep/5">
          {f.telefon && (
            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
              <Phone className="size-3" />
              Telefon
            </span>
          )}
          {f.website && (
            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
              <Globe className="size-3" />
              Website
            </span>
          )}
          {f.lat && f.lng && (
            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50 ml-auto">
              <Navigation className="size-3" />
              Direcții
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
