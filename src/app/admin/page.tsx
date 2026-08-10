import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { AdminClient } from "./admin-client";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/cont");
  }

  // Fetch all camine
  const { data: camine } = await supabase
    .from("camine")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminClient camine={camine ?? []} email={user.email ?? ""} />;
}
