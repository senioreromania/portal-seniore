import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { caminId, nume, adresa, telefon, website, descriere } =
      await req.json();

    if (!caminId) {
      return NextResponse.json({ error: "ID cămin invalid" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Trebuie să fii autentificat" },
        { status: 401 }
      );
    }

    const admin = createAdminClient();

    const { data: camin } = await admin
      .from("camine")
      .select("id, user_id")
      .eq("id", caminId)
      .single();

    if (!camin || camin.user_id !== user.id) {
      return NextResponse.json(
        { error: "Căminul nu a fost găsit sau nu îți aparține" },
        { status: 403 }
      );
    }

    const updateData: Record<string, string | null | number> = {};
    if (nume !== undefined) updateData.nume = nume;
    if (adresa !== undefined) updateData.adresa = adresa || null;
    if (telefon !== undefined) updateData.telefon = telefon || null;
    if (website !== undefined) updateData.website = website || null;
    if (descriere !== undefined) updateData.descriere = descriere || null;

    // Geocode address if it changed
    if (adresa !== undefined && adresa.trim()) {
      try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adresa + ", Romania")}&key=${apiKey}`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (geoData.status === "OK" && geoData.results?.[0]?.geometry?.location) {
          updateData.lat = geoData.results[0].geometry.location.lat;
          updateData.lng = geoData.results[0].geometry.location.lng;
        }
      } catch {
        // Geocoding failed — silently continue, don't block the update
      }
    }

    const { error } = await admin
      .from("camine")
      .update(updateData)
      .eq("id", caminId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Eroare la actualizarea căminului" },
      { status: 500 }
    );
  }
}
