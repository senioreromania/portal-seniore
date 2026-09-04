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
  getFunerareByOras,
  getFunerareByJudet,
  buildFunerareOrasMetadata,
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
  params: Promise<{ judet: string; oras: string }>;
}): Promise<Metadata> {
  const { judet: judetSlug, oras: orasSlug } = await params;
  const judet = judetFromSlug(judetSlug);
  if (!judet) {
    return {
      title: "Localitate negăsită — Servicii funerare",
      robots: { index: false, follow: false },
    };
  }

  // Try to find the oras by matching slugified name
  const allFunerare = await getFunerareByJudet(judet);
  const match = allFunerare.find(
    (f) => f.oras && slugifyJudet(f.oras) === orasSlug
  );
  const oras = match?.oras || orasSlug;

  return buildFunerareOrasMetadata(oras, judet, allFunerare.filter(
    (f) => f.oras && slugifyJudet(f.oras) === orasSlug
  ).length);
}

export default async function FunerareOrasPage({
  params,
}: {
  params: Promise<{ judet: string; oras: string }>;
}) {
  const { judet: judetSlug, oras: orasSlug } = await params;
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

  // Find the oras name from the slug
  const allInJudet = await getFunerareByJudet(judet);
  const match = allInJudet.find(
    (f) => f.oras && slugifyJudet(f.oras) === orasSlug
  );
  const oras = match?.oras || orasSlug.replace(/-/g, " ");

  const funerare = allInJudet.filter(
    (f) => f.oras && slugifyJudet(f.oras) === orasSlug
  );

  const pompeFunebre = funerare.filter((f) => f.tip === "pompe_funebre");
  const cimitire = funerare.filter((f) => f.tip === "cimitir");
  const crematorii = funerare.filter((f) => f.tip === "crematoriu");

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
            name: `Servicii funerare ${oras}`,
            url: `/servicii-funerare/${judetSlug}/${orasSlug}`,
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
              <Link
                href={`/servicii-funerare/${judetSlug}`}
                className="hover:text-navy-deep transition-colors"
              >
                {judet}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-navy-deep/70">{oras}</span>
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
                {oras}, județul {judet}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6">
              Servicii funerare în {oras}, {judet}
            </h1>

            <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-8">
              {funerare.length} servicii funerare în {oras}, județul {judet} —
              pompe funebre, case funerare, cimitire și crematorii.
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
                  {crematorii.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Crematorii
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
                  Nu există servicii funerare indexate în {oras}, {judet}.
                </p>
                <Link
                  href={`/servicii-funerare/${judetSlug}`}
                  className="mt-4 inline-flex items-center gap-2 text-gold font-semibold hover:underline"
                >
                  <ArrowLeft className="size-4" />
                  Vezi toate serviciile din {judet}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold text-navy-deep">
                    Servicii funerare în {oras} ({funerare.length})
                  </h2>
                  <Link
                    href={`/servicii-funerare/${judetSlug}`}
                    className="text-sm font-semibold text-gold hover:underline"
                  >
                    Tot județul {judet}
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {funerare.map((f) => (
                    <Link
                      key={f.id}
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
                        <h3 className="font-heading text-base font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-2 text-navy-deep mb-3">
                          {f.nume}
                        </h3>

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
                            </span>
                          )}
                        </div>

                        {f.adresa && (
                          <div className="flex items-start gap-2 text-sm mb-2 text-navy-deep/50">
                            <MapPin className="size-4 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{f.adresa}</span>
                          </div>
                        )}

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
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
