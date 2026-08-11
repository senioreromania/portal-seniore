"use client";

import { useState } from "react";
import { Crown, Check, Loader2, CreditCard, Lock, X } from "lucide-react";

type Props = {
  caminId: string;
  caminName: string;
};

export function PremiumCheckout({ caminId, caminName }: Props) {
  const [months, setMonths] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setError(null);
    setLoading(true);

    try {
      const packageId = months === 6 ? "6luni" : "12luni";
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          caminId,
          successPath: "/cont/premium/continua",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Eroare la procesarea plății");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Eroare de conexiune");
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-navy-deep/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Crown className="size-5 text-gold" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-navy-deep">
              Cămin Partener Premium
            </h2>
            <p className="text-xs text-navy-deep/50">{caminName}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 text-center">
          {error}
        </div>
      )}

      {/* Beneficii */}
      <div className="bg-paper rounded-xl p-5 mb-5">
        <h3 className="font-heading text-base font-semibold text-navy-deep mb-3">
          Beneficii Premium
        </h3>
        <div className="space-y-2">
          {[
            "Afișare pe prima pagină",
            "Prioritate în lista căminelor din județul/orașul tău",
            'Badge "Premium" pe listing-ul tău',
            "Până la 12 imagini pentru căminul tău",
          ].map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-navy-deep/70">
              <Check className="size-4 text-green-600 mt-0.5 shrink-0" />
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Pachete */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-navy-deep mb-3">
          Alege durata abonamentului
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMonths(6)}
            className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 ${
              months === 6
                ? "border-gold bg-gold/5 shadow-lg shadow-gold/10 -translate-y-0.5"
                : "border-navy-deep/10 hover:border-gold/40 hover:bg-gold/5"
            }`}
          >
            <div className="text-xs font-semibold text-navy-deep/40 uppercase tracking-wide mb-1">
              Standard
            </div>
            <div className="font-heading text-2xl font-bold text-navy-deep mb-1">
              6 luni
            </div>
            <div className="font-heading text-xl font-bold text-gold">
              600 lei
            </div>
            <div className="text-xs text-navy-deep/40 mt-1">
              100 lei/lună
            </div>
          </button>

          <button
            onClick={() => setMonths(12)}
            className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 ${
              months === 12
                ? "border-gold bg-gold/5 shadow-lg shadow-gold/10 -translate-y-0.5"
                : "border-navy-deep/10 hover:border-gold/40 hover:bg-gold/5"
            }`}
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-navy-deep text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow-sm">
              Economisești 200 lei
            </span>
            <div className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">
              Popular
            </div>
            <div className="font-heading text-2xl font-bold text-navy-deep mb-1">
              12 luni
            </div>
            <div className="font-heading text-xl font-bold text-gold">
              1000 lei
            </div>
            <div className="text-xs text-navy-deep/40 mt-1">
              ~83 lei/lună
            </div>
          </button>
        </div>
      </div>

      {/* Summary + Pay */}
      <div className="bg-gold/5 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-navy-deep/60">Abonament</span>
          <span className="font-semibold text-navy-deep">
            {months} luni
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-navy-deep/60">Preț/lună</span>
          <span className="font-semibold text-navy-deep">
            {months === 6 ? "100 lei" : "~83 lei"}
          </span>
        </div>
        <div className="border-t border-gold/20 pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-navy-deep">Total de plată</span>
          <span className="font-heading text-2xl font-bold text-navy-deep">
            {months === 6 ? "600" : "1000"} lei
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-navy-deep/40 mb-4">
        <Lock className="size-3.5" />
        Plata este securizată prin Stripe. Datele cardului nu sunt stocate.
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Se procesează...
          </>
        ) : (
          <>
            <CreditCard className="size-4" />
            Continuă la plată — {months === 6 ? "600" : "1000"} lei
          </>
        )}
      </button>
    </div>
  );
}

