import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  "Cămine de bătrâni": [
    { href: "/camine", label: "Portal cămine" },
    { href: "/camine-autorizate", label: "Cămine licențiate" },
    { href: "/cum-functioneaza", label: "Cum funcționează" },
  ],
  Organizație: [
    { href: "/despre", label: "Despre noi" },
    { href: "/advocacy", label: "Advocacy" },
    { href: "/petitii", label: "Petiții" },
    { href: "/stiri", label: "Știri" },
    { href: "/resurse", label: "Legislație" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/confidentialitate", label: "Confidențialitate" },
    { href: "/termeni", label: "Termeni" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="pt-20 pb-10 bg-paper border-t border-navy-deep/10 text-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-seniore.png"
                alt="Seniore.ro — Cămine de bătrâni în România"
                width={180}
                height={54}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-navy-deep/70 leading-relaxed max-w-md">
              Seniore.ro — Toate Căminele de Bătrâni în România. Găsește camin de batrani licențiat în județul tău — prețuri, contact, hartă și direcții. Platformă dezvoltată de Seniore.ro.
            </p>
            <dl className="mt-6 text-xs text-navy-deep/60 space-y-1">
              <div className="flex gap-2">
                <dt className="font-semibold">Sediu:</dt>
                <dd>
                  Strada Margeanului, Nr. 22, Sector 5,
                  051047 București, România
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <Mail className="size-4 shrink-0 text-gold mt-0.5" />
                <a
                  href="mailto:office@seniore.ro"
                  className="hover:text-gold transition-colors"
                >
                  office@seniore.ro
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="size-4 shrink-0 text-gold mt-0.5" />
                <span>
                  Strada Margeanului, Nr. 22, Sector 5, 051047 București
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Cămine de bătrâni
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks["Cămine de bătrâni"].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">
              Organizație
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks["Organizație"].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Judete links */}
        <div className="border-t border-navy-deep/10 pt-6 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-navy-deep/70">
            Cămine de bătrâni pe județe
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {[
              { label: "Ilfov", slug: "ilfov" },
              { label: "București", slug: "bucuresti" },
              { label: "Cluj", slug: "cluj" },
              { label: "Timiș", slug: "timis" },
              { label: "Bacău", slug: "bacau" },
              { label: "Bihor", slug: "bihor" },
              { label: "Constanța", slug: "constanta" },
              { label: "Argeș", slug: "arges" },
              { label: "Mureș", slug: "mures" },
              { label: "Dolj", slug: "dolj" },
              { label: "Prahova", slug: "prahova" },
              { label: "Neamț", slug: "neamt" },
              { label: "Arad", slug: "arad" },
              { label: "Brașov", slug: "brasov" },
              { label: "Sibiu", slug: "sibiu" },
              { label: "Dâmbovița", slug: "dambovita" },
              { label: "Iași", slug: "iasi" },
              { label: "Suceava", slug: "suceava" },
              { label: "Covasna", slug: "covasna" },
              { label: "Călărași", slug: "calarasi" },
              { label: "Galați", slug: "galati" },
              { label: "Alba", slug: "alba" },
              { label: "Hunedoara", slug: "hunedoara" },
              { label: "Satu Mare", slug: "satu-mare" },
            ].map((j) => (
              <Link
                key={j.slug}
                href={`/judet/${j.slug}`}
                className="text-navy-deep/60 hover:text-gold transition-colors"
              >
                {j.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ANPC + bottom bar */}
        <div className="border-t border-navy-deep/10 pt-6 mb-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-deep/70">
            Soluționarea litigiilor:
          </span>
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC — SAL
          </a>
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC — SOL
          </a>
          <a
            href="https://anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy-deep/60 hover:text-navy-deep transition-colors"
          >
            ANPC
          </a>
          <a
            href="https://anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Image
              src="/anpc.png"
              alt="ANPC — Autoritatea Națională pentru Protecția Consumatorilor"
              width={400}
              height={150}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-navy-deep/60 sm:ml-auto">
            {footerLinks.Legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-navy-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-navy-deep/10 text-center">
          <span className="text-xs text-navy-deep/50">
            © {new Date().getFullYear()} Portal Cămine de Bătrâni Seniore.ro. Realizat de{" "}
            <a
              href="https://forsite.ro"
              target="_blank"
              rel="noopener"
              className="hover:text-gold transition-colors"
            >
              FORSITE.RO
            </a>
            . Toate drepturile rezervate.
          </span>
        </div>
      </div>
    </footer>
  );
}
