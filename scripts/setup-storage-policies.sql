-- Supabase Storage Policies for issue-photos bucket
-- Run this in your Supabase SQL Editor

-- Policy 1: Allow public to read/view images
CREATE POLICY "Public can view issue photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'issue-photos');

-- Policy 2: Allow public to upload images (for public reporting)
-- If you want to restrict uploads to authenticated users only, 
-- change 'public' to 'authenticated' below
CREATE POLICY "Public can upload issue photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'issue-photos');

-- Policy 3: Allow public to update their own uploads (optional)
CREATE POLICY "Public can update issue photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'issue-photos')
WITH CHECK (bucket_id = 'issue-photos');

-- Policy 4: Allow public to delete (optional, for cleanup)
CREATE POLICY "Public can delete issue photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'issue-photos');

-- Note: If you want to restrict uploads to authenticated users only,
-- replace 'public' with 'authenticated' in Policy 2 above.
