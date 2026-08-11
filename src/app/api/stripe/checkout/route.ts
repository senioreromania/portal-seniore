import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import camineData from "@/data/camine-director.json";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as Stripe.LatestApiVersion,
});

type JsonCamin = {
  slug: string;
  name: string;
  phone?: string;
  website?: string;
  address?: string;
  lat?: number;
  lng?: number;
  judet: string;
  rating?: number;
  reviews?: number;
  licensed?: boolean;
  capacity?: string;
  localitate?: string;
};

const PACKAGES = {
  "6luni": {
    name: "Premium 6 luni",
    description: "Abonament Premium Seniore.ro pentru 6 luni",
    amount: 60000, // 600 RON in cents
    duration_months: 6,
  },
  "12luni": {
    name: "Premium 12 luni",
    description: "Abonament Premium Seniore.ro pentru 12 luni",
    amount: 100000, // 1000 RON in cents
    duration_months: 12,
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, caminSlug, caminId, successPath } = body;

    if (!packageId || !PACKAGES[packageId as keyof typeof PACKAGES]) {
      return NextResponse.json(
        { error: "Pachet invalid" },
        { status: 400 }
      );
    }

    const pkg = PACKAGES[packageId as keyof typeof PACKAGES];

    // Get authenticated user
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

    // Ensure we have a valid camin_id in Supabase
    let resolvedCaminId = caminId || "";
    const admin = createAdminClient();

    if (!resolvedCaminId && caminSlug) {
      // Check if camin already exists in Supabase
      const { data: existing } = await admin
        .from("camine")
        .select("id, user_id")
        .eq("slug", caminSlug)
        .single();

      if (existing) {
        resolvedCaminId = existing.id;

        // Check ownership
        if (existing.user_id && existing.user_id !== user.id) {
          return NextResponse.json(
            { error: "Acest cămin a fost deja promovat de alt cont Seniore.ro" },
            { status: 403 }
          );
        }

        // Claim it if user_id is null
        if (!existing.user_id) {
          await admin
            .from("camine")
            .update({ user_id: user.id })
            .eq("id", existing.id);
        }
      } else {
        // Camin is from JSON — create it in Supabase with user_id + pending status
        const jsonCamin = (camineData as JsonCamin[]).find(
          (c) => c.slug === caminSlug
        );

        if (jsonCamin) {
          const { data: inserted, error: insertError } = await admin
            .from("camine")
            .insert({
              slug: jsonCamin.slug,
              nume: jsonCamin.name,
              judet: jsonCamin.judet,
              oras: jsonCamin.localitate || null,
              adresa: jsonCamin.address || null,
              telefon: jsonCamin.phone || null,
              website: jsonCamin.website || null,
              lat: jsonCamin.lat || null,
              lng: jsonCamin.lng || null,
              rating: jsonCamin.rating || null,
              reviews: jsonCamin.reviews || null,
              licensed: jsonCamin.licensed || false,
              capacity: jsonCamin.capacity ? parseInt(jsonCamin.capacity) : null,
              status: "pending",
              is_premium: false,
              user_id: user.id,
            })
            .select("id")
            .single();

          if (insertError) {
            console.error("Failed to create camin from JSON:", insertError);
            return NextResponse.json(
              { error: "Eroare la crearea căminului" },
              { status: 500 }
            );
          }

          resolvedCaminId = inserted.id;
        }
      }
    } else if (resolvedCaminId) {
      // caminId was provided — verify ownership
      const { data: existing } = await admin
        .from("camine")
        .select("id, user_id")
        .eq("id", resolvedCaminId)
        .single();

      if (existing) {
        if (existing.user_id && existing.user_id !== user.id) {
          return NextResponse.json(
            { error: "Acest cămin a fost deja promovat de alt cont Seniore.ro" },
            { status: 403 }
          );
        }

        if (!existing.user_id) {
          await admin
            .from("camine")
            .update({ user_id: user.id })
            .eq("id", existing.id);
        }
      }
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
            unit_amount: pkg.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}${successPath || "/cont/premium/continua"}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        user_id: user.id,
        user_email: user.email || "",
        package_id: packageId,
        camin_slug: caminSlug || "",
        camin_id: resolvedCaminId,
        duration_months: String(pkg.duration_months),
      },
      customer_email: user.email || undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Eroare la crearea sesiunii de plată" },
      { status: 500 }
    );
  }
}
