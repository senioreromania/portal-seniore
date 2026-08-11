"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Crown,
  MapPin,
  Phone,
  Globe,
  ArrowRight,
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
  is_premium: boolean;
  images: string[] | null;
  descriere: string | null;
  adresa: string | null;
  telefon: string | null;
  website: string | null;
  status: string;
};

export function ContinuaPremiumClient({ camin }: { camin: Camin }) {
  const router = useRouter();
  const [step, setStep] = useState<"editare" | "imagini" | "preview">("editare");
  const [images, setImages] = useState<string[]>(camin.images ?? []);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(camin.status === "approved");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nume: camin.nume,
    adresa: camin.adresa || "",
    telefon: camin.telefon || "",
    website: camin.website || "",
    descriere: camin.descriere || "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveDetails() {
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

      setStep("imagini");
    } catch {
      setError("Eroare de conexiune");
    }

    setSaving(false);
  }

  async function handlePublish() {
    setPublishing(true);
    setError(null);

    try {
      const res = await fetch("/api/camine/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caminId: camin.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Eroare la publicare");
        setPublishing(false);
        return;
      }

      setPublished(true);
    } catch {
      setError("Eroare de conexiune");
    }

    setPublishing(false);
  }

  if (published) {
    return (
      <div className="bg-white rounded-2xl border border-navy-deep/10 p-10 text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="size-8 text-green-600" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-navy-deep mb-3">
          Cămin publicat!
        </h1>
        <p className="text-navy-deep/60 mb-8 max-w-md mx-auto">
          <strong>{titleCase(form.nume)}</strong> este acum vizibil pe
          Seniore.ro cu badge Premium, în secțiunea de pe prima pagină și în
          capul listei din județul {camin.judet}.
        </p>
        <button
          onClick={() => router.push("/cont")}
          className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          Mergi la contul meu
          <ArrowRight className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-navy-deep/10 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-navy-deep/10">
        <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center">
          <Crown className="size-5 text-gold" />
        </div>
        <div>
          <h1 className="font-heading text-xl font-bold text-navy-deep">
            Plată confirmată — Editează căminul
          </h1>
          <p className="text-sm text-navy-deep/50">
            Abonamentul Premium este activ. Completează detaliile căminului.
          </p>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`flex items-center gap-2 text-sm font-semibold ${step === "editare" ? "text-gold" : "text-navy-deep/40"}`}>
          <span className={`size-6 rounded-full flex items-center justify-center text-xs ${step === "editare" ? "bg-gold text-navy-deep" : "bg-navy-deep/10"}`}>1</span>
          Detalii
        </div>
        <div className="flex-1 h-px bg-navy-deep/10" />
        <div className={`flex items-center gap-2 text-sm font-semibold ${step === "imagini" ? "text-gold" : "text-navy-deep/40"}`}>
          <span className={`size-6 rounded-full flex items-center justify-center text-xs ${step === "imagini" ? "bg-gold text-navy-deep" : "bg-navy-deep/10"}`}>2</span>
          Imagini
        </div>
        <div className="flex-1 h-px bg-navy-deep/10" />
        <div className={`flex items-center gap-2 text-sm font-semibold ${step === "preview" ? "text-gold" : "text-navy-deep/40"}`}>
          <span className={`size-6 rounded-full flex items-center justify-center text-xs ${step === "preview" ? "bg-gold text-navy-deep" : "bg-navy-deep/10"}`}>3</span>
          Preview &amp; Publică
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Edit details */}
      {step === "editare" && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Nume cămin *</label>
            <input
              value={form.nume}
              onChange={(e) => update("nume", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="Numele căminului"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-deep mb-1.5">Adresă</label>
            <input
              value={form.adresa}
              onChange={(e) => update("adresa", e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
              placeholder="Strada, nr..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy-deep mb-1.5">Telefon</label>
              <input
                value={form.telefon}
                onChange={(e) => update("telefon", e.target.value)}
                className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
                placeholder="07xx xxx xxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-deep mb-1.5">Website</label>
              <input
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className="w-full px-4 py-2.5 rounded-sm border border-navy-deep/15 bg-paper text-navy-deep text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
                placeholder="www.exemplu.ro"
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
              placeholder="Descrie căminul: facilități, condiții, personal..."
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveDetails}
              disabled={saving || !form.nume.trim()}
              className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {saving ? (
                <><Loader2 className="size-4 animate-spin" />Se salvează...</>
              ) : (
                <>Salvează și continuă<ArrowRight className="size-4" /></>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Images */}
      {step === "imagini" && (
        <>
          <CaminImageUploader
            caminId={camin.id}
            caminName={form.nume}
            isPremium={true}
            initialImages={images}
            onImagesChange={setImages}
          />
          {images.length === 0 && (
            <p className="text-xs text-navy-deep/50 mt-3">
              Adaugă cel puțin o imagine pentru a putea publica căminul.
            </p>
          )}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setStep("editare")}
              className="px-6 py-3 rounded-sm text-sm font-medium text-navy-deep ring-1 ring-navy-deep/15 hover:bg-navy-deep/5 transition-all"
            >
              Înapoi la detalii
            </button>
            <button
              onClick={() => setStep("preview")}
              disabled={images.length === 0}
              className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Continuă la preview
              <ArrowRight className="size-4" />
            </button>
          </div>
        </>
      )}

      {/* Step 3: Preview & Publish */}
      {step === "preview" && (
        <>
          <p className="text-sm text-navy-deep/50 mb-4">
            Așa va apărea căminul tău pe Seniore.ro:
          </p>

          <div className="max-w-sm rounded-2xl overflow-hidden bg-white border border-gold/40 shadow-xl shadow-gold/20 mb-6">
            <div className="flex items-center justify-between px-4 py-2.5 bg-navy-deep border-b border-gold/30">
              <div className="flex items-center gap-1.5">
                <Crown className="size-3.5 text-gold" />
                <span className="text-xs font-bold uppercase tracking-wide text-gold">Premium</span>
              </div>
            </div>

            {images.length > 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={images[0]} alt={form.nume} className="w-full h-40 object-cover" />
            )}

            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-navy-deep leading-snug mb-3">
                {titleCase(form.nume)}
              </h3>

              {form.descriere && (
                <p className="text-sm text-navy-deep/60 leading-relaxed mb-3 line-clamp-2">
                  {form.descriere}
                </p>
              )}

              {form.adresa && (
                <div className="flex items-start gap-2 text-sm text-navy-deep/50 mb-3">
                  <MapPin className="size-4 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{form.adresa}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-xs text-navy-deep/40 mb-3">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3" />
                  {camin.judet}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-navy-deep/5">
                {form.telefon && (
                  <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                    <Phone className="size-3" />Telefon
                  </span>
                )}
                {form.website && (
                  <span className="inline-flex items-center gap-1 text-xs text-navy-deep/50">
                    <Globe className="size-3" />Website
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("imagini")}
              className="px-6 py-3 rounded-sm text-sm font-medium text-navy-deep ring-1 ring-navy-deep/15 hover:bg-navy-deep/5 transition-all"
            >
              Înapoi la imagini
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="inline-flex items-center gap-2 bg-gold text-navy-deep px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50"
            >
              {publishing ? (
                <><Loader2 className="size-4 animate-spin" />Se publică...</>
              ) : (
                <>Confirmă publicarea<ArrowRight className="size-4" /></>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
