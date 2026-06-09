import { createClient as createServerClient } from "@/utils/supabase/server";

export async function getTenders() {
  const supabase = await createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('tenders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTenderById(id: string) {
  const supabase = await createServerClient();
  if (!supabase) throw new Error("Supabase is not configured");

  const { data, error } = await supabase
    .from('tenders')
    .select('*, analyses(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
