-- ==========================================
-- STORAGE SETUP: ASSETS BUCKET
-- ==========================================

-- Create an 'assets' bucket, marked as public so website visitors can view images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true) 
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- 1. Allow public read access to all files in the assets bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'assets');

-- 2. Allow authenticated users to insert files
CREATE POLICY "Authenticated users can upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- 3. Allow authenticated users to update files
CREATE POLICY "Authenticated users can update" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- 4. Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'assets' AND auth.role() = 'authenticated');
