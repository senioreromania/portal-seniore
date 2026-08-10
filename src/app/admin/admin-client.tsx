"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase-browser";
import { JUDETE_ROMANIA } from "@/lib/camine-constants";
import {
  Search,
  Check,
  X,
  Crown,
  Edit3,
  Trash2,
  Save,
  Lock,
  Unlock,
  MapPin,
  Phone,
  Globe,
  Mail,
  Building2,
  ChevronDown,
  ChevronRight,
  ImagePlus,
  Upload,
  Loader2,
} from "lucide-react";

type Camin = {
  id: string;
  nume: string;
  judet: string;
  oras: string;
  adresa: string | null;
  telefon: string | null;
  email: string | null;
  website: string | null;
  descriere: string | null;
  pret_pornire: number | null;
  status: string;
  is_premium: boolean;
  slug: string | null;
  created_at: string;
  images: string[] | null;
};

export function AdminClient({
  camine: initial,
  email,
}: {
  camine: Camin[];
  email: string;
}) {
  const supabase = createClient();
  const [camine, setCamine] = useState<Camin[]>(initial);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Camin>>({});
  const [pending, startTransition] = useTransition();
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  async function uploadImages(caminId: string, files: FileList) {
    setUploadingId(caminId);
    const camin = camine.find((c) => c.id === caminId);
    const existingImages = camin?.images ?? [];
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (existingImages.length + newUrls.length >= 12) break;
      const ext = file.name.split(".").pop();
      const fileName = `${caminId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("camine-images")
        .upload(fileName, file);

      if (!error) {
        const { data: urlData } = supabase.storage
          .from("camine-images")
          .getPublicUrl(fileName);
        newUrls.push(urlData.publicUrl);
      }
    }

    if (newUrls.length > 0) {
      const updatedImages = [...existingImages, ...newUrls].slice(0, 12);
      await supabase
        .from("camine")
        .update({ images: updatedImages })
        .eq("id", caminId);
      setCamine((prev) =>
        prev.map((c) =>
          c.id === caminId ? { ...c, images: updatedImages } : c
        )
      );
    }
    setUploadingId(null);
  }

  async function deleteImage(caminId: string, imageUrl: string) {
    const camin = camine.find((c) => c.id === caminId);
    const updatedImages = (camin?.images ?? []).filter((u) => u !== imageUrl);

    // Extract path from URL for storage deletion
    const pathMatch = imageUrl.match(/camine-images\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from("camine-images").remove([pathMatch[1]]);
    }

    await supabase
      .from("camine")
      .update({ images: updatedImages })
      .eq("id", caminId);
    setCamine((prev) =>
      prev.map((c) =>
        c.id === caminId ? { ...c, images: updatedImages } : c
      )
    );
  }

  const filtered = camine.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.nume.toLowerCase().includes(q) ||
        c.judet.toLowerCase().includes(q) ||
        c.oras.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const stats = {
    total: camine.length,
    pending: camine.filter((c) => c.status === "pending").length,
    approved: camine.filter((c) => c.status === "approved").length,
    premium: camine.filter((c) => c.is_premium).length,
  };

  async function updateStatus(id: string, status: string) {
    startTransition(async () => {
      await supabase.from("camine").update({ status }).eq("id", id);
      setCamine((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    });
  }

  async function togglePremium(id: string, current: boolean) {
    startTransition(async () => {
      await supabase
        .from("camine")
        .update({ is_premium: !current })
        .eq("id", id);
      setCamine((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_premium: !current } : c))
      );
    });
  }

  async function deleteCamin(id: string) {
    if (!confirm("Sigur vrei să ștergi acest cămin?")) return;
    startTransition(async () => {
      await supabase.from("camine").delete().eq("id", id);
      setCamine((prev) => prev.filter((c) => c.id !== id));
    });
  }

  function startEdit(c: Camin) {
    setEditingId(c.id);
    setEditForm({
      nume: c.nume,
      judet: c.judet,
      oras: c.oras,
      adresa: c.adresa,
      telefon: c.telefon,
      email: c.email,
      website: c.website,
      descriere: c.descriere,
      pret_pornire: c.pret_pornire,
    });
  }

  async function saveEdit(id: string) {
    startTransition(async () => {
      await supabase.from("camine").update(editForm).eq("id", id);
      setCamine((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...editForm } : c))
      );
      setEditingId(null);
      setEditForm({});
    });
  }

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const statusLabels: Record<string, string> = {
    pending: "În așteptare",
    approved: "Aprobat",
    rejected: "Respins",
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-navy-deep text-paper py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold mb-1">
                Panou Admin
              </h1>
              <p className="text-sm text-paper/60">{email}</p>
            </div>
            <div className="flex gap-2">
              <a
                href="/cont"
                className="px-4 py-2 text-sm font-medium bg-paper/10 rounded-sm hover:bg-paper/20 transition-colors"
              >
                Contul meu
              </a>
              <a
                href="/"
                className="px-4 py-2 text-sm font-medium bg-paper/10 rounded-sm hover:bg-paper/20 transition-colors"
              >
                Acasă
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-navy-deep/10 p-4">
            <div className="font-heading text-2xl font-bold text-navy-deep">
              {stats.total}
            </div>
            <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
              Total
            </div>
          </div>
          <div className="bg-white rounded-xl border border-navy-deep/10 p-4">
            <div className="font-heading text-2xl font-bold text-amber-600">
              {stats.pending}
            </div>
            <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
              În așteptare
            </div>
          </div>
          <div className="bg-white rounded-xl border border-navy-deep/10 p-4">
            <div className="font-heading text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
            <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
              Aprobate
            </div>
          </div>
          <div className="bg-white rounded-xl border border-navy-deep/10 p-4">
            <div className="font-heading text-2xl font-bold text-gold">
              {stats.premium}
            </div>
            <div className="text-xs text-navy-deep/50 uppercase tracking-wide">
              Premium
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-navy-deep/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Caută după nume, județ, oraș..."
              className="w-full pl-12 pr-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 transition-all bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 text-sm border border-navy-deep/15 rounded-lg outline-none focus:ring-2 focus:ring-gold/30 bg-white cursor-pointer min-w-[180px]"
          >
            <option value="all">Toate statusurile</option>
            <option value="pending">În așteptare</option>
            <option value="approved">Aprobate</option>
            <option value="rejected">Respise</option>
          </select>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-navy-deep/40">
              <Building2 className="size-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Niciun cămin găsit.</p>
            </div>
          ) : (
            filtered.map((c) => {
              const isExpanded = expandedId === c.id;
              const isEditing = editingId === c.id;

              return (
                <div
                  key={c.id}
                  className="bg-white rounded-xl border border-navy-deep/10 overflow-hidden"
                >
                  {/* Row header */}
                  <div className="flex items-center gap-3 p-4">
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : c.id)
                      }
                      className="text-navy-deep/30 hover:text-navy-deep transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="size-5" />
                      ) : (
                        <ChevronRight className="size-5" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-sm font-semibold text-navy-deep truncate">
                          {c.nume}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[c.status]}`}
                        >
                          {statusLabels[c.status]}
                        </span>
                        {c.is_premium && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold font-semibold border border-gold/20">
                            <Crown className="size-3" />
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-navy-deep/40 mt-1">
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
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {c.status === "pending" && (
                        <button
                          onClick={() => updateStatus(c.id, "approved")}
                          disabled={pending}
                          title="Aprobă"
                          className="size-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors"
                        >
                          <Check className="size-4" />
                        </button>
                      )}
                      {c.status === "pending" && (
                        <button
                          onClick={() => updateStatus(c.id, "rejected")}
                          disabled={pending}
                          title="Respinge"
                          className="size-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                      {c.status === "approved" && (
                        <button
                          onClick={() => updateStatus(c.id, "pending")}
                          disabled={pending}
                          title="Marchează ca pending"
                          className="size-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center transition-colors"
                        >
                          <Unlock className="size-4" />
                        </button>
                      )}
                      <button
                        onClick={() => togglePremium(c.id, c.is_premium)}
                        disabled={pending}
                        title={c.is_premium ? "Dezactivează Premium" : "Activează Premium"}
                        className={`size-8 rounded-lg flex items-center justify-center transition-colors ${
                          c.is_premium
                            ? "bg-gold/15 text-gold hover:bg-gold/25"
                            : "bg-navy-deep/5 text-navy-deep/30 hover:bg-navy-deep/10"
                        }`}
                      >
                        <Crown className="size-4" />
                      </button>
                      <button
                        onClick={() => (isEditing ? saveEdit(c.id) : startEdit(c))}
                        disabled={pending}
                        title="Editează"
                        className="size-8 rounded-lg bg-navy-deep/5 text-navy-deep/60 hover:bg-navy-deep/10 flex items-center justify-center transition-colors"
                      >
                        {isEditing ? <Save className="size-4" /> : <Edit3 className="size-4" />}
                      </button>
                      <button
                        onClick={() => deleteCamin(c.id)}
                        disabled={pending}
                        title="Șterge"
                        className="size-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded edit form */}
                  {isExpanded && isEditing && (
                    <div className="border-t border-navy-deep/10 p-4 bg-paper/50 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Nume
                          </label>
                          <input
                            value={editForm.nume ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, nume: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Județ
                          </label>
                          <select
                            value={editForm.judet ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, judet: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          >
                            {JUDETE_ROMANIA.map((j) => (
                              <option key={j} value={j}>
                                {j}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Oraș
                          </label>
                          <input
                            value={editForm.oras ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, oras: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Adresă
                          </label>
                          <input
                            value={editForm.adresa ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, adresa: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Telefon
                          </label>
                          <input
                            value={editForm.telefon ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, telefon: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Email
                          </label>
                          <input
                            value={editForm.email ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, email: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Website
                          </label>
                          <input
                            value={editForm.website ?? ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, website: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Preț pornire (lei/lună)
                          </label>
                          <input
                            type="number"
                            value={editForm.pret_pornire ?? ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                pret_pornire: e.target.value
                                  ? parseInt(e.target.value)
                                  : null,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                            Status
                          </label>
                          <select
                            value={editForm.status ?? c.status}
                            onChange={(e) =>
                              setEditForm({ ...editForm, status: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
                          >
                            <option value="pending">În așteptare</option>
                            <option value="approved">Aprobat</option>
                            <option value="rejected">Respins</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-navy-deep/60 mb-1">
                          Descriere
                        </label>
                        <textarea
                          rows={3}
                          value={editForm.descriere ?? ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, descriere: e.target.value })
                          }
                          className="w-full px-3 py-2 text-sm border border-navy-deep/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => saveEdit(c.id)}
                          disabled={pending}
                          className="bg-navy-deep text-paper px-4 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Salvează
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({});
                          }}
                          className="px-4 py-2 rounded-sm text-sm font-medium text-navy-deep ring-1 ring-navy-deep/15 hover:bg-navy-deep/5 transition-colors"
                        >
                          Anulează
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Expanded read-only view */}
                  {isExpanded && !isEditing && (
                    <div className="border-t border-navy-deep/10 p-4 bg-paper/50">
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        {c.adresa && (
                          <div className="flex items-center gap-2 text-navy-deep/60">
                            <MapPin className="size-3.5 text-navy-deep/30" />
                            {c.adresa}
                          </div>
                        )}
                        {c.email && (
                          <div className="flex items-center gap-2 text-navy-deep/60">
                            <Mail className="size-3.5 text-navy-deep/30" />
                            {c.email}
                          </div>
                        )}
                        {c.website && (
                          <div className="flex items-center gap-2 text-navy-deep/60">
                            <Globe className="size-3.5 text-navy-deep/30" />
                            {c.website}
                          </div>
                        )}
                        {c.pret_pornire !== null && (
                          <div className="text-navy-deep/60">
                            Preț pornire: <strong>{c.pret_pornire} lei/lună</strong>
                          </div>
                        )}
                      </div>
                      {c.descriere && (
                        <p className="text-sm text-navy-deep/50 mt-3 leading-relaxed">
                          {c.descriere}
                        </p>
                      )}
                      <p className="text-xs text-navy-deep/30 mt-3">
                        Adăugat la: {new Date(c.created_at).toLocaleDateString("ro-RO")}
                      </p>

                      {/* Images section */}
                      <div className="mt-4 pt-4 border-t border-navy-deep/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <ImagePlus className="size-4 text-navy-deep/40" />
                            <span className="text-sm font-medium text-navy-deep/70">
                              Imagini ({c.images?.length ?? 0}/12)
                            </span>
                          </div>
                          <label
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer transition-colors ${
                              uploadingId === c.id
                                ? "bg-navy-deep/10 text-navy-deep/40"
                                : "bg-navy-deep/5 text-navy-deep/60 hover:bg-navy-deep/10"
                            }`}
                          >
                            {uploadingId === c.id ? (
                              <>
                                <Loader2 className="size-3.5 animate-spin" />
                                Se încarcă...
                              </>
                            ) : (
                              <>
                                <Upload className="size-3.5" />
                                Încarcă imagini
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              disabled={uploadingId === c.id || (c.images?.length ?? 0) >= 12}
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  uploadImages(c.id, e.target.files);
                                  e.target.value = "";
                                }
                              }}
                            />
                          </label>
                        </div>

                        {c.images && c.images.length > 0 ? (
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {c.images.map((url, idx) => (
                              <div
                                key={url}
                                className="relative group aspect-square rounded-lg overflow-hidden border border-navy-deep/10"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt={`${c.nume} - ${idx + 1}`}
                                  className="size-full object-cover"
                                />
                                <button
                                  onClick={() => deleteImage(c.id, url)}
                                  className="absolute top-1 right-1 size-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="size-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-navy-deep/30">
                            Nicio imagine încărcată.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
