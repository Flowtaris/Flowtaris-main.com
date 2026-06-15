-- This will disable Row-Level Security for the newly created sectors table
-- allowing your Next.js Server Actions to write to it without Auth tokens.

ALTER TABLE why_choose_us_sectors DISABLE ROW LEVEL SECURITY;

-- If you prefer keeping RLS enabled instead, you can run these 4 policies:
-- CREATE POLICY "Enable all operations" ON why_choose_us_sectors FOR ALL USING (true) WITH CHECK (true);
