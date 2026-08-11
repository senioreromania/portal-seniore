"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { JUDETE_ROMANIA, TIPURI_SERVICII } from "@/lib/camine-constants";
import { X, Check, Lock, ImagePlus, Crown, CreditCard } from "lucide-react";

export function AddCaminForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [premiumMonths, setPremiumMonths] = useState<0 | 6 | 12>(0);

  const [form, setForm] = useState({
    nume: "",
    judet: "",
    oras: "",
    adresa: "",
    telefon: "",
    email: "",
    website: "",
    descriere: "",
    pret_pornire: "",
  });

  const [servicii, setServicii] = useState<string[]>([]);

  function toggleServiciu(s: string) {
    setServicii((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Trebuie să fii conectat.");
      setLoading(false);
      return;
    }

    const slugBase = `${form.nume}-${form.oras}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 80);

    const slugUnique = `${slugBase}-${Math.random().toString(36).slice(2, 8)}`;

    const { data: inserted, error } = await supabase
      .from("camine")
      .insert({
        user_id: user.id,
        nume: form.nume,
        slug: slugUnique,
        judet: form.judet,
        oras: form.oras,
        adresa: form.adresa || null,
        telefon: form.telefon || null,
        email: form.email || null,
        website: form.website || null,
        servicii: servicii.length > 0 ? servicii : null,
        descriere: form.descriere || null,
        pret_pornire: form.pret_pornire ? parseInt(form.pret_pornire) : null,
        status: "pending",
        is_premium: false,
      })
      .select("id")
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (premiumMonths > 0 && inserted) {
      try {
        const packageId = premiumMonths === 6 ? "6luni" : "12luni";
        const checkoutRes = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageId,
            caminSlug: slugUnique,
            caminId: inserted.id,
            successPath: "/cont/premium/continua",
          }),
        });
        const checkoutData = await checkoutRes.json();
        if (checkoutRes.ok && checkoutData.url) {
          window.location.href = checkoutData.url;
          return;
        }
      } catch {
        // If checkout fails, still show success — user can activate premium later
      }
    }

    setSuccess(true);
    setTimeout(() => onSaved(), 1500);
  }

  if (success) {
    return (
      <div className="bg-white rounded-xl border border-navy-deep/10 p-8 text-center">
        <div className="size-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <Check className="size-7 text-green-600" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-navy-deep mb-2">
          Cămin adăugat!
        </h3>
        <p className="text-sm text-navy-deep/60">
          Căminul tău a fost salvat și este în așteptare pentru aprobare.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-navy-deep/10 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-semibold text-navy-deep">
          Adaugă cămin
        </h2>
        <button
          onClick={onClose}
          className="text-navy-deep/40 hover:text-navy-deep transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Nume cămin *
            </label>
            <input
              required
              value={form.nume}
              onChange={(e) => update("nume", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="Căminul de bătrâni..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Județ *
            </label>
            <select
              required
              value={form.judet}
              onChange={(e) => update("judet", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            >
              <option value="">Selectează județul</option>
              {JUDETE_ROMANIA.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Oraș *
            </label>
            <input
              required
              value={form.oras}
              onChange={(e) => update("oras", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="Orașul"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Adresă
            </label>
            <input
              value={form.adresa}
              onChange={(e) => update("adresa", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="Strada, nr..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Telefon
            </label>
            <input
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="07xx xxx xxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="email@exemplu.ro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">
              Website
            </label>
            <input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="www.exemplu.ro"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">
            Preț pornire (lei/lună)
          </label>
          <input
            type="number"
            min="0"
            value={form.pret_pornire}
            onChange={(e) => update("pret_pornire", e.target.value)}
            className="w-full md:w-48 px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            placeholder="ex: 2500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-deep mb-2">
            Tipuri de servicii
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TIPURI_SERVICII.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-sm text-navy-deep/70 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={servicii.includes(s)}
                  onChange={() => toggleServiciu(s)}
                  className="size-4 rounded border-navy-deep/20 text-gold focus:ring-gold/40"
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">
            Descriere
          </label>
          <textarea
            rows={4}
            value={form.descriere}
            onChange={(e) => update("descriere", e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all resize-none"
            placeholder="Descrie căminul: facilități, condiții, personal..."
          />
        </div>

        {/* Imagini — Premium only */}
        <div className="relative rounded-xl border-2 border-dashed border-navy-deep/15 overflow-hidden">
          {/* Lock overlay */}
          <div className="absolute inset-0 bg-navy-deep/5 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center mx-4 w-full">
              <div className="size-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Crown className="size-7 text-gold" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-deep mb-2">
                Imagini — Funcție Premium
              </h3>
              <p className="text-sm text-navy-deep/60 mb-4 leading-relaxed">
                Adaugă până la <strong>12 imagini</strong> pentru căminul tău.
                Disponibil doar pentru <strong>Cămin Partener</strong>.
              </p>
              <div className="bg-paper rounded-lg p-4 mb-4 text-left space-y-2">
                <p className="text-xs font-semibold text-navy-deep/50 uppercase tracking-wide mb-2">
                  Beneficii Cămin Partener
                </p>
                <div className="flex items-start gap-2 text-sm text-navy-deep/70">
                  <Check className="size-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Afișare pe prima pagină</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-navy-deep/70">
                  <Check className="size-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Prioritate în lista căminelor din județul/orașul tău</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-navy-deep/70">
                  <Check className="size-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Badge &quot;Premium&quot; pe listing-ul tău</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-navy-deep/70">
                  <Check className="size-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Până la 12 imagini pentru căminul tău</span>
                </div>
              </div>

              {/* Pachete clickabile */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-navy-deep mb-3">
                  Alege durata abonamentului
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPremiumMonths(premiumMonths === 6 ? 0 : 6)}
                    className={`relative p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      premiumMonths === 6
                        ? "border-gold bg-gold/5 shadow-lg shadow-gold/10 -translate-y-0.5"
                        : "border-navy-deep/10 hover:border-gold/40 hover:bg-gold/5"
                    }`}
                  >
                    <div className="text-xs font-semibold text-navy-deep/40 uppercase tracking-wide mb-1">
                      Standard
                    </div>
                    <div className="font-heading text-xl font-bold text-navy-deep mb-1">
                      6 luni
                    </div>
                    <div className="font-heading text-lg font-bold text-gold">
                      600 lei
                    </div>
                    <div className="text-xs text-navy-deep/40 mt-1">
                      100 lei/lună
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPremiumMonths(premiumMonths === 12 ? 0 : 12)}
                    className={`relative p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      premiumMonths === 12
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
                    <div className="font-heading text-xl font-bold text-navy-deep mb-1">
                      12 luni
                    </div>
                    <div className="font-heading text-lg font-bold text-gold">
                      1000 lei
                    </div>
                    <div className="text-xs text-navy-deep/40 mt-1">
                      ~83 lei/lună
                    </div>
                  </button>
                </div>
              </div>

              {premiumMonths > 0 && (
                <div className="bg-gold/5 rounded-lg p-4 mb-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-navy-deep/60">Abonament selectat</span>
                    <span className="font-semibold text-navy-deep">{premiumMonths} luni</span>
                  </div>
                  <div className="border-t border-gold/20 pt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy-deep">Total de plată</span>
                    <span className="font-heading text-xl font-bold text-navy-deep">
                      {premiumMonths === 6 ? "600" : "1000"} lei
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy-deep/40 mt-2">
                    <Lock className="size-3.5" />
                    Plata se procesează securizat prin Stripe după salvarea căminului.
                  </div>
                </div>
              )}

              {premiumMonths === 0 && (
                <p className="text-xs text-navy-deep/50">
                  Poți activa Premium și mai târziu din pagina &quot;Contul meu&quot;.
                </p>
              )}
            </div>
          </div>

          {/* Grid placeholder (12 slots) */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ImagePlus className="size-5 text-navy-deep/30" />
              <h3 className="font-heading text-base font-semibold text-navy-deep/40">
                Imagini cămin (max. 12)
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold font-medium">
                Premium
              </span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border-2 border-dashed border-navy-deep/10 bg-paper flex items-center justify-center"
                >
                  <ImagePlus className="size-6 text-navy-deep/15" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-deep/20 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading
              ? "Se salvează..."
              : premiumMonths > 0
                ? (
                  <>
                    <CreditCard className="size-4" />
                    Salvează și plătește {premiumMonths === 6 ? "600" : "1000"} lei
                  </>
                )
                : "Salvează căminul"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-sm font-semibold text-sm text-navy-deep ring-1 ring-navy-deep/15 hover:bg-navy-deep/5 transition-all"
          >
            Anulează
          </button>
        </div>
      </form>
    </div>
  );
}
