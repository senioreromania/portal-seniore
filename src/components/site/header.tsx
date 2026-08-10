"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/camine", label: "Cămine de bătrâni" },
  { href: "/camine-autorizate", label: "Licențiate" },
  { href: "/cum-functioneaza", label: "Cum funcționează" },
  { href: "/stiri", label: "Știri" },
  { href: "/resurse", label: "Legislație" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/despre", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-navy-deep/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo-seniore.png"
              alt="Seniore.ro — Cămine de bătrâni în România"
              width={160}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-deep/80 hover:text-gold transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Login button */}
            <Link
              href="/cum-functioneaza"
              className="hidden sm:inline-flex items-center bg-gold text-navy-deep px-5 py-2 rounded-sm text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Adaugă centrul tău
            </Link>

            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 text-navy-deep"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Meniu"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden overflow-hidden border-t border-navy-deep/10 bg-white"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-sm font-medium text-navy-deep hover:text-gold transition-colors border-b border-navy-deep/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cum-functioneaza"
                className="py-3 mt-2 inline-flex items-center justify-center bg-gold text-navy-deep px-5 py-2.5 rounded-sm text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Adaugă centrul tău
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
