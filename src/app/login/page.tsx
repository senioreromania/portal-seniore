import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Conectare | Seniore.ro",
  description: "Conectează-te la contul tău Seniore.ro.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
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
              Conectează-te
            </h1>
            <p className="text-sm text-navy-deep/60">
              Accesează contul tău Seniore.ro.
            </p>
          </div>
          <LoginForm redirectTo={redirect} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
