import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata = {
  title: "Plată anulată — Seniore.ro",
  description: "Plata a fost anulată",
};

export default function CheckoutCancelPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-red-100 mb-6">
            <XCircle className="size-8 text-red-600" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy-deep mb-3">
            Plată anulată
          </h1>
          <p className="text-navy-deep/60 mb-8">
            Procesul de plată a fost anulat. Poți reîncerca oricând.
          </p>
          <Link
            href="/cont"
            className="inline-flex items-center gap-2 bg-navy-deep text-paper px-6 py-3 rounded-sm font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ArrowLeft className="size-4" />
            Înapoi la cont
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
