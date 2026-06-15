-- ============================================================
-- FIX: Supabase sometimes forcefully enforces RLS on new tables.
-- We will enable RLS and create a blanket "Allow All" policy
-- for the blog tables so the admin UI works without auth.
-- ==========================================

-- 1. BLOGS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on blogs" ON blogs;
CREATE POLICY "Allow all on blogs" ON blogs FOR ALL USING (true);

-- 2. BLOGS_HERO
ALTER TABLE blogs_hero ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on blogs_hero" ON blogs_hero;
CREATE POLICY "Allow all on blogs_hero" ON blogs_hero FOR ALL USING (true);

-- 3. BLOGS_TOPICS
ALTER TABLE blogs_topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on blogs_topics" ON blogs_topics;
CREATE POLICY "Allow all on blogs_topics" ON blogs_topics FOR ALL USING (true);

-- 4. BLOGS_FAQS
ALTER TABLE blogs_faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on blogs_faqs" ON blogs_faqs;
CREATE POLICY "Allow all on blogs_faqs" ON blogs_faqs FOR ALL USING (true);

-- Grant privileges explicitly just in case
GRANT ALL ON TABLE blogs TO anon, authenticated;
GRANT ALL ON TABLE blogs_hero TO anon, authenticated;
GRANT ALL ON TABLE blogs_topics TO anon, authenticated;
GRANT ALL ON TABLE blogs_faqs TO anon, authenticated;
