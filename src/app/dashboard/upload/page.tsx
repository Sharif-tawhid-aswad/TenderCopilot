import { createClient } from "@/utils/supabase/server";
import UploadTenderContent from "./content";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <UploadTenderContent userId={user.id} />;
}
