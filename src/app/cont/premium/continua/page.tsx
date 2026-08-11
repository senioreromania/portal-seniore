import Stripe from "stripe";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { createAdminClient } from "@/lib/supabase-admin";
import { ContinuaPremiumClient } from "./continua-premium-client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as Stripe.LatestApiVersion,
});

export const metadata = {
  title: "Finalizează căminul Premium — Seniore.ro",
  robots: { index: false, follow: false },
};

export default async function ContinuaPremiumPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <ErrorState />;
  }

  let camin: {
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
  } | null = null;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const md = session.metadata || {};
    const caminId = md.camin_id;
    const durationMonths = parseInt(md.duration_months || "0", 10);

    if (!caminId || durationMonths <= 0 || session.payment_status !== "paid") {
      return <ErrorState />;
    }

    const admin = createAdminClient();

    const premiumUntil = new Date();
    premiumUntil.setMonth(premiumUntil.getMonth() + durationMonths);

    await admin
      .from("camine")
      .update({
        is_premium: true,
        premium_until: premiumUntil.toISOString(),
      })
      .eq("id", caminId);

    const { data } = await admin
      .from("camine")
      .select(
        "id, nume, slug, judet, oras, is_premium, images, descriere, adresa, telefon, website, status"
      )
      .eq("id", caminId)
      .single();

    camin = data;
  } catch {
    return <ErrorState />;
  }

  if (!camin) {
    return <ErrorState />;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ContinuaPremiumClient camin={camin} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function ErrorState() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-amber-100 mb-6">
            <AlertCircle className="size-8 text-amber-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-deep mb-3">
            Sesiune invalidă
          </h1>
          <p className="text-navy-deep/60 mb-8">
            Nu am putut confirma plata. Verifică din contul tău dacă
            abonamentul Premium a fost activat.
          </p>
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
