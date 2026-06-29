-- ============================================================
-- FIX: Enable RLS on all blog-related tables
-- Resolves Supabase lint: "RLS Disabled in Public"
-- ============================================================

-- Enable RLS on all blog tables
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs_faqs ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting existing policies (idempotent)
DROP POLICY IF EXISTS "Allow public read blogs" ON blogs;
DROP POLICY IF EXISTS "Allow admin manage blogs" ON blogs;
DROP POLICY IF EXISTS "Allow public read blogs_hero" ON blogs_hero;
DROP POLICY IF EXISTS "Allow admin manage blogs_hero" ON blogs_hero;
DROP POLICY IF EXISTS "Allow public read blogs_topics" ON blogs_topics;
DROP POLICY IF EXISTS "Allow admin manage blogs_topics" ON blogs_topics;
DROP POLICY IF EXISTS "Allow public read blogs_faqs" ON blogs_faqs;
DROP POLICY IF EXISTS "Allow admin manage blogs_faqs" ON blogs_faqs;

-- blogs: anyone can read, only authenticated (admin) can write
CREATE POLICY "Allow public read blogs"
  ON blogs FOR SELECT USING (true);

CREATE POLICY "Allow admin manage blogs"
  ON blogs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- blogs_hero
CREATE POLICY "Allow public read blogs_hero"
  ON blogs_hero FOR SELECT USING (true);

CREATE POLICY "Allow admin manage blogs_hero"
  ON blogs_hero FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- blogs_topics
CREATE POLICY "Allow public read blogs_topics"
  ON blogs_topics FOR SELECT USING (true);

CREATE POLICY "Allow admin manage blogs_topics"
  ON blogs_topics FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- blogs_faqs
CREATE POLICY "Allow public read blogs_faqs"
  ON blogs_faqs FOR SELECT USING (true);

CREATE POLICY "Allow admin manage blogs_faqs"
  ON blogs_faqs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
