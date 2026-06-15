-- Allow public (anonymous) uploads to the assets bucket so you don't need to log in during local development
CREATE POLICY "Public Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Public Update Access" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'assets');

CREATE POLICY "Public Delete Access" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'assets');
