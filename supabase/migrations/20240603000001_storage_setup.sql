-- Update tenders table
ALTER TABLE public.tenders ADD COLUMN IF NOT EXISTS file_name TEXT;
ALTER TABLE public.tenders ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- Create storage bucket for tenders if it doesn't exist (this might need to be done in dashboard but we can add policies)
-- Note: SQL cannot create buckets directly in some Supabase versions, but it can set up policies.
-- We'll assume the bucket exists or will be created.

-- Storage Policies for 'tenders' bucket
-- These assume a bucket named 'tenders' exists

CREATE POLICY "Users can upload their own tenders"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'tenders' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view their own tenders in storage"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'tenders' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own tenders in storage"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'tenders' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
