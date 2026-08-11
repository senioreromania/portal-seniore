"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import imageCompression from "browser-image-compression";
import { ImagePlus, Trash2, Loader2, Crown } from "lucide-react";

type Props = {
  caminId: string;
  caminName: string;
  isPremium: boolean;
  initialImages?: string[];
  onImagesChange?: (images: string[]) => void;
};

const MAX_IMAGES = 12;
const MAX_WIDTH = 1280;
const QUALITY = 0.8;

export function CaminImageUploader({
  caminId,
  caminName,
  isPremium,
  initialImages,
  onImagesChange,
}: Props) {
  const supabase = createClient();
  const [images, setImages] = useState<string[]>(initialImages ?? []);
  const [loading, setLoading] = useState(!initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    const { data } = await supabase
      .from("camine")
      .select("images")
      .eq("id", caminId)
      .single();

    const imgs = (data?.images as string[]) ?? [];
    setImages(imgs);
    setLoading(false);
  }, [caminId, supabase]);

  useEffect(() => {
    if (isPremium && !initialImages) fetchImages();
  }, [isPremium, initialImages, fetchImages]);

  async function persistImages(updated: string[]) {
    await supabase.from("camine").update({ images: updated }).eq("id", caminId);
    setImages(updated);
    onImagesChange?.(updated);
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (images.length + files.length > MAX_IMAGES) {
      setError(`Maxim ${MAX_IMAGES} imagini. Ai ${images.length} deja.`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const newUrls: string[] = [];

      for (const file of Array.from(files)) {
        if (images.length + newUrls.length >= MAX_IMAGES) break;

        // Optimize image before upload
        const optimized = await imageCompression(file, {
          maxWidthOrHeight: MAX_WIDTH,
          useWebWorker: true,
          fileType: "image/jpeg",
          initialQuality: QUALITY,
        });

        const fileName = `${caminId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("camine-images")
          .upload(fileName, optimized, {
            contentType: "image/jpeg",
            cacheControl: "3600",
          });

        if (uploadError) {
          setError(`Eroare upload: ${uploadError.message}`);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("camine-images")
          .getPublicUrl(fileName);

        newUrls.push(urlData.publicUrl);
      }

      if (newUrls.length > 0) {
        await persistImages([...images, ...newUrls]);
      }
    } catch {
      setError("Eroare la procesarea imaginii.");
    }

    setUploading(false);
  }

  async function handleDelete(imageUrl: string) {
    const pathMatch = imageUrl.match(/camine-images\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from("camine-images").remove([pathMatch[1]]);
    }
    await persistImages(images.filter((u) => u !== imageUrl));
  }

  if (!isPremium) {
    return (
      <div className="rounded-xl border-2 border-dashed border-navy-deep/15 p-6 text-center">
        <Crown className="size-8 text-gold/40 mx-auto mb-3" />
        <p className="text-sm text-navy-deep/50">
          Upload imagini este disponibil doar pentru cămine Premium.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-navy-deep/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading text-sm font-semibold text-navy-deep">
          Imagini {caminName} ({images.length}/{MAX_IMAGES})
        </h4>
        {images.length < MAX_IMAGES && (
          <label className="inline-flex items-center gap-2 bg-gold text-navy-deep px-3 py-1.5 rounded-sm text-xs font-semibold cursor-pointer hover:bg-gold-light transition-colors">
            {uploading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Se încarcă...
              </>
            ) : (
              <>
                <ImagePlus className="size-3.5" />
                Adaugă imagini
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && (
        <div className="mb-3 p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-navy-deep/40 text-sm">
          Se încarcă...
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-navy-deep/10 rounded-lg">
          <ImagePlus className="size-8 text-navy-deep/20 mx-auto mb-2" />
          <p className="text-sm text-navy-deep/40">
            Nicio imagine încă. Apasă &quot;Adaugă imagini&quot;.
          </p>
          <p className="text-xs text-navy-deep/30 mt-1">
            Imaginile sunt optimizate automat (max 1280px, JPEG 80%)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url) => (
            <div
              key={url}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Imagine ${caminName}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(url)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
