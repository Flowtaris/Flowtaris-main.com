ALTER TABLE site_config ADD COLUMN IF NOT EXISTS terms_config JSONB DEFAULT '{}'::jsonb;
