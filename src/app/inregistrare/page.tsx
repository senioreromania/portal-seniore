import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { RegisterForm } from "./register-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Înregistrare | Seniore.ro",
  description: "Creează un cont pe Seniore.ro pentru a-ți adăuga căminul.",
};

export default async function InregistrarePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center bg-paper py-20">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-navy-deep mb-2">
              Creează un cont
            </h1>
            <p className="text-sm text-navy-deep/60">
              Înregistrează-te pentru a-ți adăuga căminul în portal.
            </p>
          </div>
          <RegisterForm redirectTo={redirect} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
