import { createClient } from "@/utils/supabase/server";
import UploadTenderContent from "./content";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { SupabaseConfigWarning } from "@/components/supabase-config-warning";

export default async function UploadPage() {
  if (!isSupabaseConfigured()) {
    return <SupabaseConfigWarning />;
  }

  const supabase = await createClient();
  if (!supabase) return <SupabaseConfigWarning />;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <UploadTenderContent userId={user.id} />;
}
