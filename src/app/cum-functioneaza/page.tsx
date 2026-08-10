"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const benefits = [
  "Vizibilitate națională — pagina ta apare în căutări după județ, oraș, zonă",
  "Listare gratuită pentru toate căminele de bătrâni din România",
  "Date de contact complete — telefon, website, adresă, hartă Google Maps",
  "SEO optimizat — fiecare pagină de cămin e indexabilă separat în Google",
  "Badge de licențiere vizibil pentru familiile care caută siguranță",
  "Actualizare gratuită a datelor oricând ai nevoie",
];

const premiumBenefits = [
  "Afișare prioritară în secțiunea Cămine Premium de pe prima pagină",
  "Badge \"Cămin Premium\" vizibil pe pagina ta și în listări",
  "Poziționare la topul listei din județul și localitatea ta",
  "Galerie foto extinsă și descriere personalizată",
  "Statistici de vizualizări pentru pagina ta",
  "Promovare în campaniile noastre de social media",
];

export default function AdaugaCentruPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          <div className="max-w-4xl mx-auto px-6 relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
            >
              Cum funcționează
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mb-8"
            >
              Fii descoperit de familiile care caută îngrijire de calitate
              pentru vârstnici. Listare gratuită pentru toate căminele de
              bătrâni din România. Devino Cămin Premium pentru vizibilitate
              maximă.
            </motion.p>
          </div>
        </section>

        <section className="py-16 bg-paper">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-2xl font-bold text-navy-deep mb-8">
              Listare gratuită
            </h2>
            <div className="space-y-4 mb-12">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-navy-deep/80">{b}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-navy-deep text-paper mb-8 text-center">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Devino Cămin Premium
              </h3>
              <p className="text-paper/70 mb-6 max-w-xl mx-auto">
                Abonamentul Premium îți oferă vizibilitate maximă și prioritate
                în rezultatele căutării. Plătești 100 lei/lună și primești:
              </p>
              <div className="space-y-3 mb-8 max-w-lg mx-auto text-left">
                {premiumBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-paper/80">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-paper/80">
                <div className="flex items-center gap-2">
                  <Phone className="size-5 text-gold" />
                  <span>0785 598 779</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-gold" />
                  <span>office@seniore.ro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="size-5 text-gold" />
                  <span>www.seniore.ro</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
              >
                Înregistrează-te
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl border border-navy-deep/10 bg-paper">
              <h3 className="font-heading text-lg font-bold text-navy-deep mb-3">
                Cum adaugi centrul
              </h3>
              <p className="text-navy-deep/70 mb-4">
                Adaugă centrul tău direct pe Seniore.ro în 2 pași simpli:
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-gold/20 text-gold font-bold text-sm shrink-0">1</span>
                  <span className="text-navy-deep/80">Te înregistrezi</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-gold/20 text-gold font-bold text-sm shrink-0">2</span>
                  <span className="text-navy-deep/80">Completezi formularul online cu datele căminului și pagina ta apare în portal imediat.</span>
                </div>
              </div>
              <p className="text-sm text-navy-deep/60 mb-4">
                Listarea de bază este gratuită.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
              >
                Începe acum
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SEO contextual links */}
        <section className="py-12 bg-paper border-t border-navy-deep/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-heading text-lg font-bold text-navy-deep mb-4">
              Alte detalii
            </h2>
            <div className="space-y-3 text-sm text-navy-deep/60 leading-relaxed max-w-3xl mx-auto text-left">
              <p>
                Seniore.ro indexează cămine de bătrâni din toate județele României. Cauți un <Link href="/camine" className="text-gold hover:underline font-medium">cămin de bătrâni</Link> sau <Link href="/camine-autorizate" className="text-gold hover:underline font-medium">cămine licențiate MMJS</Link>? Accesează paginile dedicate. Conform <a href="https://www.cdep.ro/ords/pls/legis/legis_pck.htp_act?ida=113748" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legii nr. 197/2012 privind asigurarea calității serviciilor sociale</a>, centrele rezidențiale trebuie să dețină licență de funcționare emisă de <a href="https://mmuncii.gov.ro/acreditare-furnizori-si-servicii-sociale/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Ministerul Muncii, Familiei, Tineretului și Solidarității Sociale</a>.
              </p>
              <p>
                Pentru informații despre drepturile persoanelor vârstnice, consultă <a href="https://legislatie.just.ro/Public/DetaliiDocument/21309" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Legea nr. 17/2000 privind asistența socială a persoanelor vârstnice</a>. Pentru sprijin în îngrijirea vârstnicilor cu demență, <a href="https://alz.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Societatea Română Alzheimer</a> oferă consiliere. <a href="https://www.cnpp.ro/web/guest/home" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Casa Națională de Pensii Publice</a> oferă informații despre pensii și drepturi de asigurări sociale.
              </p>
              <p>
                Pe site-ul nostru găsești și <Link href="/resurse" className="text-gold hover:underline font-medium">legislație și resurse</Link>, <Link href="/stiri" className="text-gold hover:underline font-medium">știri despre căminele de bătrâni</Link>, sau poți afla mai multe <Link href="/despre" className="text-gold hover:underline font-medium">despre Seniore.ro</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
