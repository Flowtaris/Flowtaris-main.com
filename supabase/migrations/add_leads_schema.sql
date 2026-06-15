-- ==========================================
-- LEADS TABLE (Contact Form Submissions)
-- ==========================================

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    work_email TEXT NOT NULL,
    platform TEXT,
    service_needed TEXT,
    project_timeline TEXT,
    team_size TEXT,
    business_challenge TEXT,
    current_challenge TEXT,
    desired_outcome TEXT,
    question TEXT,
    preferred_contact TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: The update_updated_at_column trigger should already exist from schema.sql
DROP TRIGGER IF EXISTS update_leads_modtime ON leads;
CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on leads" ON leads;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated select" ON leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON leads;
DROP POLICY IF EXISTS "Allow authenticated delete" ON leads;

-- Allow anyone to submit a contact form (insert)
CREATE POLICY "Allow anonymous inserts" ON leads FOR INSERT WITH CHECK (true);

-- Restrict read, update, delete to authenticated admins only
CREATE POLICY "Allow authenticated select" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON leads FOR DELETE USING (auth.role() = 'authenticated');

GRANT ALL ON TABLE leads TO anon, authenticated;
