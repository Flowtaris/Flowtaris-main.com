-- Add Site Settings Table

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated all on site_settings" ON site_settings;
CREATE POLICY "Allow authenticated all on site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

GRANT ALL ON TABLE site_settings TO anon, authenticated;

-- Default Values
INSERT INTO site_settings (key, value) VALUES ('company_name', 'Flowtaris') ON CONFLICT (key) DO NOTHING;
INSERT INTO site_settings (key, value) VALUES ('logo_url', '/images/logo.png') ON CONFLICT (key) DO NOTHING;
