"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Scale,
  Sparkles,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Gavel,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const legislation = [
  {
    type: "HG",
    number: "HG nr. 426/2020",
    title:
      "Privind aprobarea standardelor de cost pentru serviciile sociale",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/226519",
  },
  {
    type: "Ordin",
    number: "Ordin MMJS nr. 29/2019",
    title:
      "Pentru aprobarea Standardelor minime de calitate pentru acreditarea serviciilor sociale destinate persoanelor vârstnice și altor categorii de adulți în dificultate",
    href: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/211004",
  },
  {
    type: "Ordin",
    number: "Ordin MMJS nr. 82/2019",
    title:
      "Standarde specifice minime de calitate obligatorii pentru serviciile sociale destinate persoanelor adulte cu dizabilități",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/290697",
  },
  {
    type: "HG",
    number: "HG nr. 1086/2018",
    title:
      "Privind aprobarea modelului-cadru al Planului anual de acțiune privind serviciile sociale",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/199793",
  },
  {
    type: "HG",
    number: "HG nr. 797/2017",
    title:
      "Pentru aprobarea regulamentelor-cadru de organizare și funcționare ale serviciilor publice de asistență socială",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/201267",
  },
  {
    type: "HG",
    number: "HG nr. 867/2015",
    title:
      "Pentru aprobarea Nomenclatorului serviciilor sociale și a regulamentelor-cadru de organizare și funcționare",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/172757",
  },
  {
    type: "HG",
    number: "HG nr. 118/2014",
    title:
      "Pentru aprobarea Normelor metodologice de aplicare a Legii nr. 197/2012",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/156275",
  },
  {
    type: "Lege",
    number: "Legea nr. 197/2012",
    title: "Privind asigurarea calității în domeniul serviciilor sociale",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/190494",
  },
  {
    type: "Lege",
    number: "Legea nr. 292/2011",
    title: "Legea asistenței sociale (cadru general)",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/133913",
  },
  {
    type: "Lege",
    number: "Legea nr. 448/2006",
    title: "Privind protecția și promovarea drepturilor persoanelor cu handicap",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/88315",
  },
  {
    type: "Ordin",
    number: "Ordin MMJS nr. 73/2005",
    title:
      "Privind aprobarea modelului Contractului pentru acordarea de servicii sociale",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/59555",
  },
  {
    type: "Lege",
    number: "Legea nr. 272/2004",
    title:
      "Privind protecția și promovarea drepturilor copilului (republicată)",
    href: "https://legislatie.just.ro/Public/DetaliiDocument/286109",
  },
  {
    type: "OUG",
    number: "OG nr. 68/2003",
    title:
      "Privind serviciile sociale (cu modificările și completările ulterioare)",
    href: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/170973",
  },
  {
    type: "Lege",
    number: "Legea nr. 116/2002",
    title: "Privind prevenirea și combaterea marginalizării sociale",
    href: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/34645",
  },
  {
    type: "Lege",
    number: "Legea nr. 17/2000",
    title:
      "Privind asistența socială a persoanelor vârstnice (republicată 2024)",
    href: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/287816",
  },
];

const exploreLinks = [
  {
    icon: Gavel,
    title: "Advocacy",
    subtitle: "Campanii și poziții",
    description: "Cum reprezentăm sectorul în fața autorităților.",
    href: "/advocacy",
  },
  {
    icon: BookOpen,
    title: "Cămine Premium",
    subtitle: "Rețeaua națională",
    description: "Criterii, beneficii și cum poți deveni Cămin Premium.",
    href: "/cum-functioneaza",
  },
  {
    icon: ShieldCheck,
    title: "Petiții",
    subtitle: "Semnează oficial",
    description: "Petiții active pentru modificări legislative.",
    href: "/petitii",
  },
];

export default function ResursePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gold/20 pt-20 pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold/10 to-[#b8964f]/10" />
          {/* Navy glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-navy-deep/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/10 border border-navy-deep/20 mb-6"
                >
                  <Sparkles className="size-3.5 text-navy-deep" />
                  <span className="text-xs font-medium text-navy-deep uppercase tracking-widest">
                    Resurse Seniore.ro
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  Bibliotecă legislativă pentru furnizorii privați.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl"
                >
                  Cadrul normativ, mereu actualizat. Legislație relevantă,
                  documente publice de guvernanță și resurse pentru căminele
                  de bătrâni.
                </motion.p>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-navy-deep/10"
              >
                <Image
                  src="/resurse.png"
                  alt="Resurse Seniore.ro"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Legislație */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-10 rounded-lg bg-gold/10">
                  <Scale className="size-5 text-gold" />
                </div>
                <div className="w-12 h-px bg-gold" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                Cadrul normativ, mereu actualizat
              </h2>
              <p className="text-navy-deep/60 mt-4 leading-relaxed">
                Toate actele normative relevante pentru furnizorii privați de
                servicii sociale, cu linkuri către textul oficial.
              </p>
            </motion.div>

            <div className="space-y-3">
              {legislation.map((law, i) => (
                <motion.a
                  key={law.number}
                  href={law.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  custom={Math.min(i + 1, 5)}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-md hover:shadow-navy-deep/5"
                >
                  <div className="flex items-center justify-center px-3 py-1.5 rounded-md bg-navy-deep/5 shrink-0 min-w-[70px] text-center">
                    <span className="text-xs font-bold text-navy-deep/60 uppercase">
                      {law.type}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-navy-deep mb-1">
                      {law.number}
                    </span>
                    <p className="text-sm text-navy-deep/60 leading-relaxed">
                      {law.title}
                    </p>
                  </div>
                  <ExternalLink className="size-4 text-navy-deep/30 group-hover:text-gold transition-colors shrink-0 mt-1" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Explorează mai departe */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="max-w-2xl mb-14"
            >
              <div className="w-12 h-px bg-gold mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep leading-tight text-balance">
                Explorează mai departe
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {exploreLinks.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    href={item.href}
                    className="group block p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5 h-full"
                  >
                    <div className="flex items-center justify-center size-14 rounded-lg bg-navy-deep/5 mb-5">
                      <item.icon className="size-7 text-navy-deep" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-navy-deep mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gold mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-navy-deep/60 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                      Explorează
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
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
                Pe site-ul nostru poți căuta <Link href="/camine" className="text-gold hover:underline font-medium">cămine de bătrâni din România</Link> sau <Link href="/camine-autorizate" className="text-gold hover:underline font-medium">cămine licențiate MMJS</Link>. Lista oficială a căminelor licențiate este publicată de <a href="https://mmuncii.gov.ro/wp-content/uploads/2026/03/10032026_Camine_PV.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Ministerul Muncii (PDF)</a>, iar procedura de licențiere este detaliată pe <a href="https://servicii.mmuncii.gov.ro/servicii-beneficii/licentiere-servicii-sociale/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">portalul MMPS</a>.
              </p>
              <p>
                <a href="https://www.cnpp.ro/web/guest/home" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Casa Națională de Pensii Publice</a> oferă informații despre pensii și drepturi de asigurări sociale. <a href="https://anpd.gov.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Autoritatea Națională pentru Protecția Drepturilor Persoanelor cu Dizabilități</a> protejează drepturile vârstnicilor cu dizabilități. <a href="https://www.adivromania.ro/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">Asociația Directorilor Instituțiilor pentru Vârstnici (A.D.I.V.)</a> reprezintă directorii căminelor de bătrâni.
              </p>
              <p>
                Pe site-ul nostru găsești și <Link href="/stiri" className="text-gold hover:underline font-medium">știri despre căminele de bătrâni</Link>, <Link href="/despre" className="text-gold hover:underline font-medium">despre Seniore.ro</Link>, sau poți afla <Link href="/cum-functioneaza" className="text-gold hover:underline font-medium">cum funcționează portalul</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 bg-gold/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                Înregistrează-ți căminul în Portalul Seniore.ro
              </h2>
              <p className="text-navy-deep/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                Alătură-te comunității Seniore.ro pentru reprezentare
                instituțională, consultanță juridică și acces la rețeaua de
                furnizori privați.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/inregistrare"
                  className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
                >
                  Înregistrează-te
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-transparent text-navy-deep px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep/20 transition-all duration-300 hover:bg-navy-deep/5"
                >
                  Vorbește cu echipa
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
