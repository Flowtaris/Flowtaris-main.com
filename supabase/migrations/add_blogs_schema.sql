-- ============================================================
-- MIGRATION: Add 'blogs' schema
-- ============================================================

-- 1. Create the parent blogs registry table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_blogs_modtime
    BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;

-- 2. Create blogs_hero table
CREATE TABLE IF NOT EXISTS blogs_hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    publication_date DATE,
    author_name TEXT,
    author_designation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(blog_id)
);

CREATE OR REPLACE TRIGGER update_blogs_hero_modtime
    BEFORE UPDATE ON blogs_hero
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE blogs_hero DISABLE ROW LEVEL SECURITY;

-- 3. Create blogs_topics table
CREATE TABLE IF NOT EXISTS blogs_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sub_descriptions TEXT[], -- Array of strings for unlimited sub-descriptions
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_blogs_topics_modtime
    BEFORE UPDATE ON blogs_topics
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE blogs_topics DISABLE ROW LEVEL SECURITY;

-- 4. Create blogs_faqs table
CREATE TABLE IF NOT EXISTS blogs_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_blogs_faqs_modtime
    BEFORE UPDATE ON blogs_faqs
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE blogs_faqs DISABLE ROW LEVEL SECURITY;
