ALTER TABLE site_config ADD COLUMN IF NOT EXISTS social_links_config JSONB DEFAULT '[]'::jsonb;
