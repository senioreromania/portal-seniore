import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, slugifyJudet } from "@/lib/seo";
import {
  getFunerareJudeteStats,
  getFunerareTotal,
  buildFunerareListMetadata,
} from "@/lib/funerare";

export const metadata: Metadata = buildFunerareListMetadata();

export default async function FunerareListPage() {
  const judeteStats = await getFunerareJudeteStats();
  const total = await getFunerareTotal();

  const totalPompe = judeteStats.reduce((acc, j) => acc + j.count, 0);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Acasă", url: "/" },
          { name: "Servicii funerare", url: "/servicii-funerare" },
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
              <span className="text-navy-deep/70">Servicii funerare</span>
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
                Director național
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6">
              Servicii funerare în România
            </h1>

            <p className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-8">
              {total} servicii funerare indexate la nivel național — pompe
              funebre, case funerare, cimitire și crematorii. Telefon, adresă,
              hartă și direcții pentru fiecare firmă.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {total}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Total firme
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  {judeteStats.length}
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Județe acoperite
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  1284
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Pompe funebre
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-navy-deep/10">
                <div className="font-heading text-2xl font-bold text-navy-deep">
                  897
                </div>
                <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
                  Cimitire
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista județe */}
        <section className="py-12 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-xl font-bold text-navy-deep mb-6">
              Servicii funerare după județ ({judeteStats.length})
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {judeteStats.map((j) => (
                <Link
                  key={j.judet}
                  href={`/servicii-funerare/${slugifyJudet(j.judet)}`}
                  className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white border border-navy-deep/8 hover:border-gold/30 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                      {j.judet}
                    </span>
                    <span className="text-xs text-navy-deep/40">
                      {j.count} firme
                    </span>
                  </div>
                  <ChevronRight className="size-4 text-navy-deep/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-navy-deep/3">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep mb-6">
              Servicii funerare în România
            </h2>
            <div className="space-y-4 text-navy-deep/60 leading-relaxed">
              <p>
                Portalul nostru indexează {total} servicii funerare din{" "}
                {judeteStats.length} județe ale României. Indiferent dacă ai
                nevoie de <strong>pompe funebre</strong>, o{" "}
                <strong>casă funerară</strong>, un <strong>cimitir</strong> sau
                un <strong>crematoriu</strong>, poți găsi rapid firma potrivită
                în județul tău.
              </p>
              <p>
                Fiecare firmă din director are date de contact (telefon,
                adresă), locație pe hartă și direcții de navigare. Căutarea se
                poate face după județ sau localitate, iar firmele premium apar
                cu evidențiere în listă.
              </p>
              <p>
                Serviciile funerare din România includ organizarea
                înmormântărilor, transportul decedaților, confecționarea
                sicrielor și monumentelor funerare, parastase și servicii de
                repatriere. Unele firme oferă și servicii de incinerare sau
                gestionarea cimitirelor.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/inregistrare"
                className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
              >
                Adaugă firma ta gratuit
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
