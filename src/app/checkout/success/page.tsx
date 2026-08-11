import Link from "next/link";
import { CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { createAdminClient } from "@/lib/supabase-admin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as Stripe.LatestApiVersion,
});

export const metadata = {
  title: "Plată reușită — Seniore.ro",
  description: "Plata a fost procesată cu succes",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let activated = false;
  let error = false;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const metadata = session.metadata || {};

      const userId = metadata.user_id;
      const caminSlug = metadata.camin_slug;
      const caminId = metadata.camin_id;
      const durationMonths = parseInt(metadata.duration_months || "0", 10);

      if (durationMonths > 0 && caminId && session.payment_status === "paid") {
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

        activated = true;
      }
    } catch {
      error = true;
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md mx-auto px-6 text-center">
          {error ? (
            <>
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-amber-100 mb-6">
                <AlertCircle className="size-8 text-amber-600" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep mb-3">
                Plată confirmată
              </h1>
              <p className="text-navy-deep/60 mb-8">
                Plata a fost procesată cu succes. Activarea Premium se va face
                în câteva minute. Dacă nu se activează, contactează-ne.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="size-8 text-green-600" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep mb-3">
                Plată reușită!
              </h1>
              <p className="text-navy-deep/60 mb-8">
                {activated
                  ? "Abonamentul Premium a fost activat. Căminul tău va fi afișat cu badge-ul Premium și în poziție prioritară în căutări."
                  : "Plata a fost procesată cu succes. Abonamentul Premium va fi activat în câteva minute."}
              </p>
            </>
          )}
          <Link
            href="/cont"
            className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Mergi la contul meu
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
