import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { AccountClient } from "./account-client";

export const metadata: Metadata = {
  title: "Contul meu | Seniore.ro",
  description: "Gestionează-ți contul și căminele adăugate.",
};

export default async function ContPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper py-20">
        <div className="max-w-4xl mx-auto px-6">
          <AccountClient email={user.email ?? ""} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
