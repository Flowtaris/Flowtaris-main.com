ALTER TABLE site_config ADD COLUMN IF NOT EXISTS privacy_config JSONB DEFAULT '{}'::jsonb;
