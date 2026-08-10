"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { LogOut, Mail, Building2, Plus, MapPin, Phone, Globe } from "lucide-react";
import { AddCaminForm } from "./add-camin-form";

type Camin = {
  id: string;
  nume: string;
  judet: string;
  oras: string;
  adresa: string | null;
  telefon: string | null;
  email: string | null;
  website: string | null;
  pret_pornire: number | null;
  status: string;
  created_at: string;
};

export function AccountClient({ email }: { email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [camine, setCamine] = useState<Camin[]>([]);
  const [loadingCamine, setLoadingCamine] = useState(true);

  const fetchCamine = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("camine")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setCamine((data as Camin[]) ?? []);
    setLoadingCamine(false);
  }, []);

  useEffect(() => {
    fetchCamine();
  }, [fetchCamine]);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: "În așteptare", color: "bg-amber-100 text-amber-700" },
    approved: { label: "Aprobat", color: "bg-green-100 text-green-700" },
    rejected: { label: "Respins", color: "bg-red-100 text-red-700" },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-deep mb-1">
            Contul meu
          </h1>
          <p className="text-sm text-navy-deep/60">
            Gestionează-ți contul și căminele adăugate.
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="inline-flex items-center gap-2 text-sm font-medium text-navy-deep/70 hover:text-red-600 transition-colors"
        >
          <LogOut className="size-4" />
          {loading ? "Se deconectează..." : "Deconectează-te"}
        </button>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-xl border border-navy-deep/10 p-6">
        <h2 className="font-heading text-lg font-semibold text-navy-deep mb-4">
          Informații cont
        </h2>
        <div className="flex items-center gap-3 text-sm text-navy-deep/70">
          <Mail className="size-4 text-gold" />
          <span>{email}</span>
        </div>
      </div>

      {/* Form or list */}
      {showForm ? (
        <AddCaminForm
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchCamine();
          }}
        />
      ) : (
        <div className="bg-white rounded-xl border border-navy-deep/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-navy-deep">
              Căminele mele ({camine.length})
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gold text-navy-deep px-4 py-2 rounded-sm text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              <Plus className="size-4" />
              Adaugă cămin
            </button>
          </div>

          {loadingCamine ? (
            <div className="text-center py-12 text-navy-deep/40">
              <p className="text-sm">Se încarcă...</p>
            </div>
          ) : camine.length === 0 ? (
            <div className="text-center py-12 text-navy-deep/40">
              <Building2 className="size-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nu ai adăugat niciun cămin încă.</p>
              <p className="text-xs mt-1">
                Apasă &quot;Adaugă cămin&quot; pentru a începe.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {camine.map((c) => {
                const st = statusLabels[c.status] ?? statusLabels.pending;
                return (
                  <div
                    key={c.id}
                    className="border border-navy-deep/10 rounded-lg p-4 hover:border-gold/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading text-base font-semibold text-navy-deep">
                            {c.nume}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}
                          >
                            {st.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-deep/50">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3" />
                            {c.oras}, {c.judet}
                          </span>
                          {c.telefon && (
                            <span className="inline-flex items-center gap-1">
                              <Phone className="size-3" />
                              {c.telefon}
                            </span>
                          )}
                          {c.website && (
                            <span className="inline-flex items-center gap-1">
                              <Globe className="size-3" />
                              {c.website}
                            </span>
                          )}
                          {c.pret_pornire && (
                            <span className="font-medium text-navy-deep/70">
                              de la {c.pret_pornire} lei/lună
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
