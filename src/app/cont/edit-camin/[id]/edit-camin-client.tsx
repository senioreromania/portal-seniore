"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { CaminImageUploader } from "../../camin-image-uploader";
import { titleCase } from "@/lib/seo";

type Camin = {
  id: string;
  nume: string;
  slug: string | null;
  judet: string;
  oras: string;
  adresa: string | null;
  telefon: string | null;
  website: string | null;
  descriere: string | null;
  is_premium: boolean;
  images: string[] | null;
  status: string;
};

export function EditCaminClient({ camin }: { camin: Camin }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nume: camin.nume,
    adresa: camin.adresa || "",
    telefon: camin.telefon || "",
    website: camin.website || "",
    descriere: camin.descriere || "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/camine/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caminId: camin.id,
          nume: form.nume,
          adresa: form.adresa,
          telefon: form.telefon,
          website: form.website,
          descriere: form.descriere,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Eroare la salvare");
        setSaving(false);
        return;
      }

      setSaved(true);
    } catch {
      setError("Eroare de conexiune");
    }

    setSaving(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-navy-deep/10 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-navy-deep/10">
        <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center">
          <Crown className="size-5 text-gold" />
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-xl font-bold text-navy-deep">
            Editează cămin
          </h1>
          <p className="text-sm text-navy-deep/50">
            {titleCase(camin.nume)} — {camin.judet}
          </p>
        </div>
        {camin.is_premium && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/30 font-medium">
            <Crown className="size-3" />
            Premium
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Details form */}
      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">Nume cămin *</label>
          <input
            value={form.nume}
            onChange={(e) => update("nume", e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">Adresă</label>
          <input
            value={form.adresa}
            onChange={(e) => update("adresa", e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Telefon</label>
            <input
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Website</label>
            <input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-deep mb-1.5">Descriere</label>
          <textarea
            rows={5}
            value={form.descriere}
            onChange={(e) => update("descriere", e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || !form.nume.trim()}
            className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><Loader2 className="size-4 animate-spin" />Se salvează...</>
            ) : saved ? (
              <><CheckCircle2 className="size-4 text-green-400" />Salvat!</>
            ) : (
              <>Salvează detaliile</>
            )}
          </button>
        </div>
      </div>

      {/* Images section — only for premium */}
      {camin.is_premium ? (
        <div className="border-t border-navy-deep/10 pt-6">
          <h2 className="font-heading text-lg font-semibold text-navy-deep mb-4">
            Imagini cămin
          </h2>
          <CaminImageUploader
            caminId={camin.id}
            caminName={form.nume}
            isPremium={true}
            initialImages={camin.images ?? []}
          />
        </div>
      ) : (
        <div className="border-t border-navy-deep/10 pt-6">
          <div className="rounded-xl border-2 border-dashed border-navy-deep/15 p-6 text-center">
            <Crown className="size-8 text-gold/40 mx-auto mb-3" />
            <p className="text-sm text-navy-deep/50">
              Upload imagini este disponibil doar pentru cămine Premium.
            </p>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="mt-8 pt-6 border-t border-navy-deep/10">
        <button
          onClick={() => router.push("/cont")}
          className="inline-flex items-center gap-2 text-sm font-medium text-navy-deep/70 hover:text-navy-deep transition-colors"
        >
          <ArrowLeft className="size-4" />
          Înapoi la contul meu
        </button>
      </div>
    </div>
  );
}
