"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Crown, Sparkles, Check, X, CreditCard, Lock } from "lucide-react";

export function PromoteCaminButton({ caminSlug }: { caminSlug: string }) {
  const supabase = createClient();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"plans" | "auth" | "payment" | "success">("plans");
  const [months, setMonths] = useState(6);

  function handleClick() {
    setStep("plans");
    setShowModal(true);
  }

  async function proceedToPayment() {
    const {
      data: { user: u },
    } = await supabase.auth.getUser();

    if (!u) {
      setStep("auth");
      return;
    }

    setUser({ id: u.id, email: u.email ?? "" });
    setStep("payment");
  }

  async function handlePay() {
    setLoading(true);

    // TODO: Connect to payment processor
    // For now, simulate payment confirmation
    // In production: redirect to Stripe/Netopia, on success webhook sets is_premium

    // Find camin by slug in Supabase
    const { data: camin } = await supabase
      .from("camine")
      .select("id")
      .eq("slug", caminSlug)
      .single();

    if (!camin) {
      setLoading(false);
      alert("Căminul nu a fost găsit în baza de date.");
      return;
    }

    // Simulate payment success
    const premiumUntil = new Date();
    premiumUntil.setMonth(premiumUntil.getMonth() + months);

    await supabase
      .from("camine")
      .update({
        is_premium: true,
        premium_until: premiumUntil.toISOString(),
        claimed_by: user?.id,
      })
      .eq("id", camin.id);

    setLoading(false);
    setStep("success");
  }

  if (!showModal) {
    return (
      <button
        onClick={handleClick}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold/10 text-navy-deep border border-gold/30 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-gold hover:shadow-lg hover:shadow-gold/20"
      >
        <Crown className="size-4 text-gold" />
        Vreau să promovez acest cămin
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold/10 text-navy-deep border border-gold/30 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-gold hover:shadow-lg hover:shadow-gold/20"
      >
        <Crown className="size-4 text-gold" />
        Vreau să promovez acest cămin
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-navy-deep/10">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Crown className="size-5 text-gold" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-navy-deep">
                    Cămin Partener Premium
                  </h2>
                  <p className="text-xs text-navy-deep/50">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-navy-deep/30 hover:text-navy-deep transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6">
              {step === "plans" && (
                <>
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

                  <button
                    onClick={proceedToPayment}
                    className="w-full bg-navy-deep text-paper px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-navy-deep/20"
                  >
                    Continuă la plată — {months === 6 ? "600" : "1000"} lei
                  </button>
                </>
              )}

              {step === "auth" && (
                <>
                  <div className="text-center py-6">
                    <div className="size-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Lock className="size-7 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-navy-deep mb-2">
                      Conectează-te pentru a continua
                    </h3>
                    <p className="text-sm text-navy-deep/60 mb-6 leading-relaxed">
                      Ai nevoie de un cont pentru a finaliza plata și a activa
                      abonamentul Premium pentru acest cămin.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`/login?redirect=${encodeURIComponent(`/camine/${caminSlug}`)}`}
                      className="block w-full text-center bg-navy-deep text-paper px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-navy-deep/20"
                    >
                      Conectează-te
                    </a>
                    <a
                      href={`/inregistrare?redirect=${encodeURIComponent(`/camine/${caminSlug}`)}`}
                      className="block w-full text-center px-6 py-3.5 rounded-lg font-semibold text-sm text-navy-deep ring-1 ring-navy-deep/15 hover:bg-navy-deep/5 transition-colors"
                    >
                      Creează cont nou
                    </a>
                    <button
                      onClick={() => setStep("plans")}
                      className="block w-full text-center text-sm text-navy-deep/50 hover:text-navy-deep transition-colors pt-2"
                    >
                      Înapoi la pachete
                    </button>
                  </div>
                </>
              )}

              {step === "payment" && (
                <>
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

                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="block text-xs font-medium text-navy-deep/60 mb-1.5">
                        Nume pe card
                      </label>
                      <input
                        type="text"
                        placeholder="Ion Popescu"
                        className="w-full px-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-deep/60 mb-1.5">
                        Număr card
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-navy-deep/60 mb-1.5">
                          Expiră
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-navy-deep/60 mb-1.5">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2.5 text-sm border border-navy-deep/15 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-navy-deep/40 mb-4">
                    <Lock className="size-3.5" />
                    Plata este securizată. Datele cardului nu sunt stocate.
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handlePay}
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-navy-deep px-6 py-3.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50"
                    >
                      {loading ? (
                        "Se procesează..."
                      ) : (
                        <>
                          <CreditCard className="size-4" />
                          Plătește {months === 6 ? "600" : "1000"} lei
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setStep("plans")}
                      className="px-4 py-3.5 rounded-lg text-sm font-medium text-navy-deep ring-1 ring-navy-deep/15 hover:bg-navy-deep/5 transition-colors"
                    >
                      Înapoi
                    </button>
                  </div>
                </>
              )}

              {step === "success" && (
                <div className="text-center py-8">
                  <div className="size-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <Check className="size-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy-deep mb-2">
                    Plata confirmată!
                  </h3>
                  <p className="text-sm text-navy-deep/60 mb-4 leading-relaxed">
                    Căminul tău este acum <strong>Cămin Partener Premium</strong> pentru
                    {" "}{months} luni. Beneficiile sunt active imediat.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold font-semibold text-sm mb-6">
                    <Sparkles className="size-4" />
                    Premium activ
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      window.location.reload();
                    }}
                    className="w-full bg-navy-deep text-paper px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  >
                    Perfect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
