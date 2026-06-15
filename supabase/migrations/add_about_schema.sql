-- ==========================================
-- ABOUT PAGE CONTENT TABLES
-- ==========================================

-- Hero Section
CREATE TABLE IF NOT EXISTS about_hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_about_hero_modtime BEFORE UPDATE ON about_hero FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Topics Section
CREATE TABLE IF NOT EXISTS about_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_about_topics_modtime BEFORE UPDATE ON about_topics FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Disable RLS
ALTER TABLE about_hero DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_topics DISABLE ROW LEVEL SECURITY;
