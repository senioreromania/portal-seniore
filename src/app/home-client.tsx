"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  ShieldCheck,
  Users,
  ArrowRight,
  PlusCircle,
  Building2,
  Navigation,
  ChevronRight,
  Scale,
  FileText,
  Newspaper,
  Trophy,
  Crown,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { slugifyJudet, normalizeJudet } from "@/lib/seo";

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

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const news = [
  {
    date: "23 iulie 2026",
    title:
      "Scrisoare deschisă către Ministerul Muncii: controale orientate către om, nu către hârtii",
    description:
      "Seniore.ro a transmis oficial Ministerului Muncii o scrisoare deschisă care cere continuarea simplificării procedurilor de licențiere.",
    href: "/stiri/scrisoare-deschisa-ministerul-muncii-iulie-2026",
  },
  {
    date: "10 mai 2026",
    title: "Casa Alegria — Centru rezidențial pentru vârstnici în Ploiești",
    description:
      "Două centre rezidențiale licențiate în Ploiești, pe strada Tudor Vladimirescu.",
    href: "/stiri/casa-alegria-centru-rezidential-pentru-varstnici-in-ploiesti",
  },
  {
    date: "8 mai 2026",
    title: "Casa Orizont — Cămin pentru vârstnici în Beleți-Negrești, Argeș",
    description:
      "Cămin pentru vârstnici la poalele Carpaților, în Beleți-Negrești, Argeș.",
    href: "/stiri/casa-orizont-camin-pentru-varstnici-in-natura-beleti-negresti-arges",
  },
];

export function HomeClient({
  totalCamine,
  licensedCount,
  totalJudete,
  totalOrase,
  judete,
  featured,
  premiumCamine,
}: {
  totalCamine: number;
  licensedCount: number;
  totalJudete: number;
  totalOrase: number;
  judete: string[];
  featured: Camin[];
  premiumCamine: (Camin & { highlight: string; description: string })[];
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchJudet, setSearchJudet] = useState("");

  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return judete
      .filter((j) => j.toLowerCase().includes(q))
      .slice(0, 5)
      .map((j) => ({ type: "judet" as const, label: j, slug: slugifyJudet(j) }));
  }, [searchQuery, judete]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (searchJudet) params.set("judet", searchJudet);
    router.push(`/camine${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ===== HERO with Search ===== */}
        <section className="relative overflow-hidden bg-navy-deep pt-20 pb-20 md:pt-28 md:pb-28">
          {/* Video background — desktop only */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
          >
            <source src="/hero-seniore.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/70 via-navy-deep/50 to-[#0d1520]/70" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto px-6 relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6"
            >
              <ShieldCheck className="size-3.5 text-gold" />
              <span className="text-xs font-medium text-gold uppercase tracking-widest">
                Portal național — {totalCamine} cămine indexate
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-paper leading-[1.1] text-balance mb-6"
            >
              Cămine de bătrâni în România
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-paper/60 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Găsește căminul potrivit pentru cei dragi. Portal național cu{" "}
              {totalCamine} centre de îngrijire a vârstnicilor, din care{" "}
              {licensedCount} licențiate MMJS. Date de contact, hartă, prețuri
              și direcții.
            </motion.p>

            {/* Search bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-paper/10 backdrop-blur-md border border-paper/15">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-paper/30" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Caută cămin, localitate, județ..."
                    className="w-full pl-12 pr-4 py-3.5 text-sm text-paper bg-transparent outline-none placeholder:text-paper/30"
                  />
                  {searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-navy-deep border border-paper/10 shadow-xl overflow-hidden z-20">
                      {searchSuggestions.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/judet/${s.slug}`}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-paper/70 hover:bg-gold/10 transition-colors"
                        >
                          <MapPin className="size-4 text-gold" />
                          Cămine de bătrâni {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <select
                  value={searchJudet}
                  onChange={(e) => setSearchJudet(e.target.value)}
                  className="px-4 py-3.5 text-sm text-paper bg-transparent border border-paper/15 rounded-lg outline-none cursor-pointer min-w-[160px]"
                >
                  <option value="" className="bg-navy-deep">
                    Toate județele
                  </option>
                  {judete.map((j) => (
                    <option key={j} value={j} className="bg-navy-deep">
                      {j}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                >
                  <Search className="size-4" />
                  Caută
                </button>
              </div>
            </motion.form>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10"
            >
              {[
                { value: totalCamine, label: "Cămine indexate" },
                { value: licensedCount, label: "Licențiate MMJS" },
                { value: totalJudete, label: "Județe acoperite" },
                { value: totalOrase, label: "Localități" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-paper/5 border border-paper/10"
                >
                  <div className="font-heading text-2xl md:text-3xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-paper/40 uppercase tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== Browse by Județe ===== */}
        <section className="py-16 md:py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-navy-deep mb-3">
                Caută cămin de bătrâni după județ
              </h2>
              <p className="text-navy-deep/50 max-w-2xl mx-auto">
                Selectează județul pentru a vedea toate căminele de bătrâni din
                zona respectivă
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {judete.map((j, i) => (
                <motion.div
                  key={j}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={fadeUp}
                  custom={i % 6}
                >
                  <Link
                    href={`/judet/${slugifyJudet(j)}`}
                    className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white border border-navy-deep/8 hover:border-gold/30 transition-all duration-300 hover:shadow-sm"
                  >
                    <span className="text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">
                      {j}
                    </span>
                    <ChevronRight className="size-4 text-navy-deep/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Cămine Premium ===== */}
        {premiumCamine.length > 0 && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-gold/20">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-navy-deep/5 rounded-full blur-[140px]" />

            <div className="max-w-7xl mx-auto px-6 relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep text-gold border border-gold/30 mb-5">
                  <Crown className="size-4 text-gold" />
                  <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                    Premium
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-navy-deep mb-3">
                  Cămine de bătrâni PREMIUM
                </h2>
                <p className="text-navy-deep/60 max-w-2xl mx-auto">
                  Cămine de bătrâni cu servicii de excepție, recomandate de
                  familiile beneficiare și verificate de echipura noastră
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumCamine.map((cam, i) => (
                  <motion.div
                    key={cam.slug}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <Link
                      href={`/camine/${cam.slug}`}
                      className="group relative block h-full rounded-2xl overflow-hidden bg-white border-2 border-navy-deep/10 hover:border-gold transition-all duration-300 hover:shadow-2xl hover:shadow-gold/15"
                    >
                      {/* Premium + Rating badges row */}
                      <div className="flex items-center justify-between px-4 py-2 bg-navy-deep">
                        <div className="flex items-center gap-1.5">
                          <Crown className="size-3.5 text-gold" />
                          <span className="text-xs font-bold uppercase tracking-wide text-white">Premium</span>
                        </div>
                        {cam.rating && (
                          <div className="flex items-center gap-1.5">
                            <Star className="size-3.5 text-gold fill-gold" />
                            <span className="text-xs font-bold text-gold">{cam.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Title band */}
                      <div className="h-20 bg-gradient-to-r from-navy-deep via-navy-deep to-[#1a2535] flex flex-col justify-center px-5">
                        <h3 className="font-heading text-lg font-bold text-white leading-snug line-clamp-2">
                          {titleCase(cam.name)}
                        </h3>
                        <p className="text-xs text-gold/80 mt-0.5 line-clamp-1">
                          {cam.highlight}
                        </p>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <ShieldCheck className="size-4 text-gold" />
                          <span className="text-xs font-semibold text-gold uppercase tracking-wide">
                            Licențiat MMJS
                          </span>
                        </div>

                        <p className="text-sm text-navy-deep/60 leading-relaxed mb-3 line-clamp-2">
                          {cam.description}
                        </p>

                        {cam.address && (
                          <div className="flex items-start gap-2 text-sm text-navy-deep/50 mb-3">
                            <MapPin className="size-4 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{cam.address}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-xs text-navy-deep/40 mb-3">
                          {cam.judet && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3" />
                              {cam.judet}
                            </span>
                          )}
                          {cam.capacity && (
                            <span className="inline-flex items-center gap-1">
                              <Users className="size-3" />
                              {cam.capacity} locuri
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-navy-deep/5">
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
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold ml-auto group-hover:translate-x-0.5 transition-transform">
                            Vezi detalii
                            <ArrowRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CTA: Adaugă centrul ===== */}
        <section className="py-16 md:py-20 bg-paper">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gold/10 border border-gold/20 mb-6">
                <PlusCircle className="size-8 text-gold" />
              </div>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-navy-deep mb-4">
                Ești furnizor de servicii sociale?
              </h2>
              <p className="text-lg text-navy-deep/60 leading-relaxed max-w-2xl mx-auto mb-8">
                Adaugă gratuit centrul tău în portalul național. Fiecare
                vizitator care caută „cămin de bătrâni" în județul tău te va
                găsi.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/inregistrare"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                >
                  <PlusCircle className="size-4" />
                  Adaugă centrul tău gratuit
                </Link>
                <Link
                  href="/camine-autorizate"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-navy-deep border border-navy-deep/20 px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-navy-deep/5"
                >
                  <ShieldCheck className="size-4" />
                  Cămine licențiate MMJS
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== Featured Cămine ===== */}
        {featured.length > 0 && (
          <section className="relative py-16 md:py-24 overflow-hidden bg-gold/20">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-navy-deep/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-navy-deep/3 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-5">
                  <Trophy className="size-4 text-gold" />
                  <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                    Top recomandate
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-navy-deep mb-3">
                  Cămine licențiate
                </h2>
                <p className="text-navy-deep/60 max-w-2xl mx-auto">
                  Cămine de bătrâni licențiate MMJS cu cele mai bune recenzii din
                  România
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((cam, i) => (
                  <motion.div
                    key={cam.slug}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <Link
                      href={`/camine/${cam.slug}`}
                      className="group relative block h-full rounded-2xl overflow-hidden bg-paper border-2 border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10"
                    >
                      {/* Ranking badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div
                          className={`flex items-center justify-center size-9 rounded-full font-heading font-bold text-sm shadow-lg ${
                            i === 0
                              ? "bg-gold text-navy-deep shadow-gold/30"
                              : i === 1
                                ? "bg-[#c0c0c0] text-navy-deep shadow-paper/20"
                                : i === 2
                                  ? "bg-[#cd7f32] text-paper shadow-[#cd7f32]/30"
                                  : "bg-navy-deep/10 text-navy-deep/50"
                          }`}
                        >
                          #{i + 1}
                        </div>
                      </div>

                      {/* Colored header band */}
                      <div className="h-2 bg-gradient-to-r from-gold via-gold to-[#b8964f]" />

                      <div className="p-5">
                        {/* License badge */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <ShieldCheck className="size-4 text-gold" />
                          <span className="text-xs font-semibold text-gold uppercase tracking-wide">
                            Licențiat MMJS
                          </span>
                        </div>

                        <h3 className="font-heading text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors line-clamp-2 mb-3 pr-10">
                          {cam.name}
                        </h3>

                        {cam.address && (
                          <div className="flex items-start gap-2 text-sm text-navy-deep/50 mb-3">
                            <MapPin className="size-4 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cam.address}</span>
                          </div>
                        )}

                        {/* Rating stars — large */}
                        {cam.rating && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => {
                                const rating = Number(cam.rating);
                                const filled = star <= Math.round(rating);
                                const half =
                                  star === Math.ceil(rating) &&
                                  rating % 1 >= 0.5;
                                return (
                                  <Star
                                    key={star}
                                    className={`size-4 ${
                                      filled || half
                                        ? "text-gold fill-gold"
                                        : "text-navy-deep/15"
                                    }`}
                                  />
                                );
                              })}
                            </div>
                            <span className="font-heading text-sm font-bold text-navy-deep">
                              {cam.rating}
                            </span>
                            {cam.reviews && (
                              <span className="text-xs text-navy-deep/40">
                                ({cam.reviews} recenzii)
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-3 text-xs text-navy-deep/40 mb-3">
                          {cam.judet && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3" />
                              {cam.judet}
                            </span>
                          )}
                          {cam.capacity && (
                            <span className="inline-flex items-center gap-1">
                              <Users className="size-3" />
                              {cam.capacity} locuri
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
                          {cam.lat && cam.lng && (
                            <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50 ml-auto">
                              <Navigation className="size-3" />
                              Direcții
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/camine"
                  className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                >
                  Vezi toate cele {totalCamine} cămine
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ===== Știri ===== */}
        <section className="py-16 md:py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-navy-deep mb-3">
                  Știri din sector
                </h2>
                <p className="text-navy-deep/50">
                  Actualități și comunicate relevante pentru furnizorii de
                  servicii sociale
                </p>
              </div>
              <Link
                href="/stiri"
                className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
              >
                Toate știrile
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {news.map((article, i) => (
                <motion.div
                  key={article.href}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  custom={i}
                >
                  <Link
                    href={article.href}
                    className="group block h-full p-5 rounded-xl bg-white border border-navy-deep/8 hover:border-gold/30 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs text-navy-deep/40 mb-3">
                      <Newspaper className="size-3.5" />
                      {article.date}
                    </div>
                    <h3 className="font-heading text-base font-semibold text-navy-deep leading-snug group-hover:text-gold transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-navy-deep/50 line-clamp-3">
                      {article.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SEO Content ===== */}
        <section className="py-16 md:py-20 bg-navy-deep/3">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="prose prose-navy max-w-none"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep mb-6">
                Cum alegi un cămin de bătrâni în România
              </h2>
              <div className="space-y-4 text-navy-deep/60 leading-relaxed">
                <p>
                  Alegerea unui <strong>cămin de bătrâni</strong> potrivit
                  pentru cei dragi este o decizie importantă. În România,
                  există sute de centre de îngrijire a vârstnicilor, atât
                  publice cât și private, iar portalul nostru te ajută să
                  găsești rapid opțiunile disponibile în județul tău.
                </p>
                <p>
                  Un <strong>azil de bătrâni licențiat</strong> este autorizat
                  de Ministerul Muncii, Familiei, Tineretului și Solidarității
                  Sociale (MMJS) și trebuie să îndeplinească standarde specifice
                  de calitate: personal calificat, condiții de cazare, mese
                  regulate, asistență medicală și activități recreative. Din
                  cele {totalCamine} de cămine indexate în portalul nostru,{" "}
                  {licensedCount} sunt licențiate.
                </p>
                <p>
                  Când cauți un <strong>centru de îngrijire pentru
                  vârstnici</strong>, verifică: statusul de licențiere,
                  capacitatea centrului, serviciile oferite (îngrijire medicală,
                  asistență socială, recuperare), prețurile și recenziile de
                  la alte familii. Folosește filtrele din portalul nostru
                  pentru a găsi rapid cămine licențiate sau cu telefon de
                  contact direct.
                </p>
                <p>
                  Portalul nostru acoperă toate județele României. Indiferent
                  dacă cauți un cămin de bătrâni în București, Cluj, Timișoara,
                  Iași, Constanța, Brașov sau orice alt județ, poți folosi
                  pagina dedicată județului respectiv pentru a vedea toate
                  centrele din zonă.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <Link
                  href="/camine"
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-navy-deep/8 hover:border-gold/30 transition-all"
                >
                  <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10">
                    <Building2 className="size-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Portal cămine
                    </div>
                    <div className="text-xs text-navy-deep/40">
                      {totalCamine} centre indexate
                    </div>
                  </div>
                </Link>
                <Link
                  href="/camine-autorizate"
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-navy-deep/8 hover:border-gold/30 transition-all"
                >
                  <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10">
                    <ShieldCheck className="size-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Cămine licențiate
                    </div>
                    <div className="text-xs text-navy-deep/40">
                      {licensedCount} autorizate MMJS
                    </div>
                  </div>
                </Link>
                <Link
                  href="/resurse"
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-navy-deep/8 hover:border-gold/30 transition-all"
                >
                  <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10">
                    <Scale className="size-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Legislație
                    </div>
                    <div className="text-xs text-navy-deep/40">
                      Acte normative
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
