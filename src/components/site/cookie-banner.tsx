"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-navy-deep text-white mx-auto max-w-3xl m-4 rounded-xl shadow-2xl border border-gold/20">
        <div className="flex items-start gap-4 p-5">
          <Cookie className="size-6 shrink-0 text-gold mt-0.5" />
          <div className="flex-1 space-y-3">
            <p className="text-sm leading-relaxed text-white/90">
              Folosim cookie-uri pentru a asigura funcționarea corectă a
              portalului și pentru a analiza modul de utilizare. Continuând
              navigarea, ești de acord cu{" "}
              <Link
                href="/cookies"
                className="text-gold underline hover:text-gold/80 transition-colors"
              >
                Politica de Cookies
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={accept}
                className="px-5 py-2 bg-gold text-navy-deep text-sm font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                Accept toate
              </button>
              <button
                onClick={reject}
                className="px-5 py-2 bg-transparent text-white/70 text-sm font-medium rounded-lg border border-white/20 hover:border-white/40 hover:text-white transition-colors"
              >
                Doar cookie-uri necesare
              </button>
            </div>
          </div>
          <button
            onClick={reject}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Închide"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
