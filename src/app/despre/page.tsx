"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Shield,
  Heart,
  Handshake,
  Target,
  Eye,
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

const directions = [
  {
    icon: Eye,
    title: "Transparență",
    description:
      "Informații complete și verificate pentru fiecare cămin — locație, servicii, prețuri, licențe.",
  },
  {
    icon: Target,
    title: "Căutare simplă",
    description:
      "Filtre pe județ, oraș și tip de servicii. Familia găsește rapid căminul potrivit.",
  },
  {
    icon: Users,
    title: "Vizibilitate",
    description:
      "Fiecare cămin are o pagină proprie, clară și profesională, în fața familiilor care caută.",
  },
];

const values = [
  {
    num: "01",
    icon: Shield,
    title: "Accuratețe",
    description:
      "Informații verificate și actualizate pentru fiecare cămin în parte.",
  },
  {
    num: "02",
    icon: Eye,
    title: "Claritate",
    description:
      "Date prezentate simplu și logic, ușor de înțeles pentru orice familie.",
  },
  {
    num: "03",
    icon: Target,
    title: "Accesibilitate",
    description:
      "Căutare rapidă, filtre intuitive, rezultate relevante — gratuit, pentru toți.",
  },
  {
    num: "04",
    icon: Handshake,
    title: "Încredere",
    description:
      "Un portal la care familiile revin pentru că găsesc ce caută, fără surprize.",
  },
  {
    num: "05",
    icon: Heart,
    title: "Grijă",
    description:
      "Înțelegem că în spatele fiecărei căutări este o familie și o decizie importantă.",
  },
];

export default function DesprePage() {
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
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/5 border border-navy-deep/10 mb-6"
                >
                  <span className="size-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs font-medium text-navy-deep/70 uppercase tracking-widest">
                    Despre Seniore.ro
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] text-balance mb-6"
                >
                  Portal național al căminelor de bătrâni din România.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg text-navy-deep/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                >
                  Seniore.ro este portalul național al căminelor de bătrâni din
                  România. Oferă familiilor un instrument clar de căutare și
                  comparare, iar căminelor — vizibilitate și transparență.
                  Printr-un portal actualizat și informat, Seniore.ro face
                  legătura între nevoile familiilor și serviciile disponibile.
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
                  src="/despre.png"
                  alt="Servicii de îngrijire a vârstnicilor"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Misiune & Viziune */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={0}
                className="p-8 md:p-10 rounded-xl border border-navy-deep/10 bg-paper"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                    <Target className="size-6 text-gold" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep">
                    Misiunea noastră
                  </h2>
                </div>
                <p className="text-navy-deep/70 leading-relaxed">
                  Să construim cel mai complet și mai ușor de folosit portal
                  de cămine de bătrâni din România. Fiecare familie să poată
                  găsi rapid informațiile de care are nevoie — locație,
                  servicii, prețuri, contact — iar fiecare cămin să aibă
                  posibilitatea să se prezinte clar și transparent în fața
                  familiilor care caută îngrijire pentru cei dragi.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={1}
                className="p-8 md:p-10 rounded-xl border border-navy-deep/10 bg-paper"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                    <Eye className="size-6 text-gold" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep">
                    Viziunea noastră
                  </h2>
                </div>
                <p className="text-navy-deep/70 leading-relaxed">
                  O Românie în care fiecare familie are acces la informația
                  necesară pentru a lua cea mai bună decizie privind îngrijirea
                  vârstnicilor. Un portal național transparent, actualizat și
                  ușor de parcurs, care pune legătura directă între familiile
                  care caută și căminele care oferă servicii de calitate.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trei direcții */}
        <section className="py-20 bg-paper">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                Trei direcții care ghidează portalul
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {directions.map((dir, i) => (
                <motion.div
                  key={dir.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-8 rounded-xl border border-navy-deep/10 bg-white hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-deep/5"
                >
                  <div className="flex items-center justify-center size-14 rounded-lg bg-navy-deep/5 mb-5">
                    <dir.icon className="size-7 text-navy-deep" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-navy-deep mb-3">
                    {dir.title}
                  </h3>
                  <p className="text-navy-deep/60 leading-relaxed">
                    {dir.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Valorile */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-4 text-balance">
                Valorile noastre
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-6 rounded-xl border border-navy-deep/10 bg-paper hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-gold/10">
                      <val.icon className="size-6 text-gold" />
                    </div>
                    <span className="font-heading text-2xl font-bold text-navy-deep/15">
                      {val.num}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy-deep mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-navy-deep/60 leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Angajamentul */}
        <section className="py-20 bg-paper">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-deep mb-6 text-balance">
                Angajamentul nostru
              </h2>
              <p className="text-lg text-navy-deep/70 leading-relaxed mb-6">
                La Seniore.ro credem că informația corectă este primul pas
                către o decizie bună. Când o familie caută un cămin pentru un
                vârstnic drag, are nevoie de claritate, nu de confuzie. De aceea
                construim un portal național în care fiecare cămin este
                prezentat complet, onest și la obiect — locație, servicii,
                prețuri, contact.
              </p>
              <p className="text-lg text-navy-deep/70 leading-relaxed mb-8">
                Ne adresăm tuturor căminelor de bătrâni din România care vor să
                fie găsite de familiile care au nevoie de ele.
              </p>
              <Link
                href="/cum-functioneaza"
                className="group inline-flex items-center gap-2 bg-navy-deep text-paper px-8 py-3.5 rounded-sm font-semibold text-sm ring-1 ring-navy-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20"
              >
                Înregistrează-te
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
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
                  href="/cum-functioneaza"
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
