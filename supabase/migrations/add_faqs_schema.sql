CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public to view active faqs" ON faqs FOR SELECT USING (status = 'Active');
CREATE POLICY "Allow admins to manage faqs" ON faqs FOR ALL USING (true) WITH CHECK (true);

-- Add to publications if using realtime
-- ALTER PUBLICATION supabase_realtime ADD TABLE faqs;
