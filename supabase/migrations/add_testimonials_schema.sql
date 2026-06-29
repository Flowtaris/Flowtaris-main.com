CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    client_company TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    rating INTEGER DEFAULT 5,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_testimonials_modtime ON testimonials;
CREATE TRIGGER update_testimonials_modtime BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Fix RLS violations by explicitly allowing all operations on this CMS table.
-- The Next.js Admin dashboard is already protected by authentication middleware.
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all" ON testimonials;
CREATE POLICY "Allow all" ON testimonials FOR ALL USING (true) WITH CHECK (true);

-- Reload schema just in case
NOTIFY pgrst, 'reload schema';
