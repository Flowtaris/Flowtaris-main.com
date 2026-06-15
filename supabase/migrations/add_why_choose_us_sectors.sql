CREATE TABLE IF NOT EXISTS why_choose_us_sectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_why_choose_us_sectors_modtime BEFORE UPDATE ON why_choose_us_sectors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Add sector_id to why_choose_us_cards
ALTER TABLE why_choose_us_cards ADD COLUMN IF NOT EXISTS sector_id UUID REFERENCES why_choose_us_sectors(id) ON DELETE CASCADE;

-- Allow anonymous access for the new table
DO $$
BEGIN
    EXECUTE 'ALTER TABLE why_choose_us_sectors DISABLE ROW LEVEL SECURITY;';
END $$;
