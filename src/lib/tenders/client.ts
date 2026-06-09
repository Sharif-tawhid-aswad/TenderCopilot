import { createClient as createBrowserClient } from "@/utils/supabase/client";

export async function uploadTender(file: File, userId: string, title: string) {
  const supabase = createBrowserClient();
  if (!supabase) throw new Error("Supabase is not configured");

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
      organization: 'Not Specified'
    })
    .select()
    .single();

  if (dbError) {
    await supabase.storage.from('tenders').remove([filePath]);
    throw dbError;
  }

  return tender;
}

// These functions should only be called from Server Components
// We define them elsewhere or handle the import carefully
