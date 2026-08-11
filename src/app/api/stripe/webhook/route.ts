import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as Stripe.LatestApiVersion,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const userId = metadata.user_id;
    const caminId = metadata.camin_id;
    const durationMonths = parseInt(metadata.duration_months || "0", 10);

    if (caminId && durationMonths > 0) {
      const supabase = createAdminClient();

      const premiumUntil = new Date();
      premiumUntil.setMonth(premiumUntil.getMonth() + durationMonths);

      await supabase
        .from("camine")
        .update({
          is_premium: true,
          premium_until: premiumUntil.toISOString(),
          user_id: userId || null,
        })
        .eq("id", caminId);
    }
  }

  return NextResponse.json({ received: true });
}
