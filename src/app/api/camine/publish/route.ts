import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { caminId } = await req.json();

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
      .select("id, user_id, is_premium")
      .eq("id", caminId)
      .single();

    if (!camin || camin.user_id !== user.id) {
      return NextResponse.json(
        { error: "Căminul nu a fost găsit sau nu îți apartine" },
        { status: 403 }
      );
    }

    if (!camin.is_premium) {
      return NextResponse.json(
        { error: "Publicarea automată este disponibilă doar pentru cămine Premium" },
        { status: 403 }
      );
    }

    const { error } = await admin
      .from("camine")
      .update({ status: "approved" })
      .eq("id", caminId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Eroare la publicarea căminului" },
      { status: 500 }
    );
  }
}
