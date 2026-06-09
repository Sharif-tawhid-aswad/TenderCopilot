import { createClient } from "@/utils/supabase/client";

export async function uploadTender(file: File, userId: string, title: string) {
  const supabase = createClient();

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // 1. Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from('tenders')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // 2. Insert into Database
  const { error: dbError, data: tender } = await supabase
    .from('tenders')
    .insert({
      user_id: userId,
      title: title,
      file_name: file.name,
      storage_path: filePath,
      status: 'draft',
      organization: 'Not Specified' // Default for now
    })
    .select()
    .single();

  if (dbError) {
    // Cleanup storage if DB fails
    await supabase.storage.from('tenders').remove([filePath]);
    throw dbError;
  }

  return tender;
}

export async function getTenders() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tenders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTenderById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tenders')
    .select('*, analyses(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
