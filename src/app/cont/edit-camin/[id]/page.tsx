import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { EditCaminClient } from "./edit-camin-client";

export const metadata = {
  title: "Editează cămin — Seniore.ro",
  robots: { index: false, follow: false },
};

export default async function EditCaminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center min-h-[60vh]">
          <p className="text-navy-deep/60">Trebuie să fii autentificat.</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const admin = createAdminClient();
  const { data: camin } = await admin
    .from("camine")
    .select(
      "id, nume, slug, judet, oras, adresa, telefon, website, descriere, is_premium, images, status, user_id"
    )
    .eq("id", id)
    .single();

  if (!camin || camin.user_id !== user.id) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-paper py-16">
        <div className="max-w-4xl mx-auto px-6">
          <EditCaminClient camin={camin} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
