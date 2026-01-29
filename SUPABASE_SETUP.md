# Supabase Storage Setup Guide

## Create the Storage Bucket

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Open Storage**
   - Click on **Storage** in the left sidebar

3. **Create New Bucket**
   - Click **New bucket** button
   - **Name**: `issue-photos`
   - **Public bucket**: ✅ **Enable this** (check the box)
   - Click **Create bucket**

4. **Set Storage Policies (REQUIRED)**

   Supabase Storage uses Row-Level Security (RLS). You **must** create policies to allow uploads.

   **Option A: Using SQL Editor (Recommended)**
   
   1. Go to **SQL Editor** in your Supabase Dashboard
   2. Click **New query**
   3. Copy and paste the SQL from `scripts/setup-storage-policies.sql`:

   ```sql
   -- Policy 1: Allow public to read/view images
   CREATE POLICY "Public can view issue photos"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'issue-photos');

   -- Policy 2: Allow public to upload images (for public reporting)
   CREATE POLICY "Public can upload issue photos"
   ON storage.objects FOR INSERT
   WITH CHECK (bucket_id = 'issue-photos');
   ```

   4. Click **Run** to execute the SQL

   **Option B: Using Storage UI**
   
   - Go to **Storage** → **Policies** → Select `issue-photos` bucket
   - Click **New Policy** → **For full customization**
   - Create policies for:
     - **SELECT**: Allow public to read
     - **INSERT**: Allow public to upload

## Verify Setup

After creating the bucket, try uploading an image again. The error should be resolved.

## Troubleshooting

If you still get errors:

1. **Check bucket name**: Make sure it's exactly `issue-photos` (case-sensitive)
2. **Check public access**: The bucket should be public or have proper policies
3. **Check environment variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
