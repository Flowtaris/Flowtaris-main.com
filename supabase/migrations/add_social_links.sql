-- Create Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name TEXT NOT NULL,
  url TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on social_links" ON social_links;
CREATE POLICY "Allow public read access on social_links" ON social_links FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on social_links" ON social_links;
CREATE POLICY "Allow authenticated all on social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');

GRANT ALL ON TABLE social_links TO anon, authenticated;

-- Seed default values
INSERT INTO social_links (platform_name, url, priority) VALUES 
  ('Email', 'mailto:contact@flowtaris.com', 3),
  ('LinkedIn', 'https://linkedin.com/company/flowtaris', 2),
  ('X', 'https://x.com/flowtaris', 1);
