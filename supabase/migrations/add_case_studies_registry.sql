-- ==========================================
-- CASE STUDIES REGISTRY & CONTENT TABLES
-- ==========================================

-- Parent case studies registry
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_case_studies_modtime BEFORE UPDATE ON case_studies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Hero Section (with image)
CREATE TABLE IF NOT EXISTS case_studies_hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
    hero_title TEXT NOT NULL,
    hero_description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_case_studies_hero_modtime BEFORE UPDATE ON case_studies_hero FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Industry Type
CREATE TABLE IF NOT EXISTS case_studies_industry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_case_studies_industry_modtime BEFORE UPDATE ON case_studies_industry FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Solutions Delivered
CREATE TABLE IF NOT EXISTS case_studies_solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_case_studies_solutions_modtime BEFORE UPDATE ON case_studies_solutions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Technology Stack
CREATE TABLE IF NOT EXISTS case_studies_tech_stack (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_case_studies_tech_stack_modtime BEFORE UPDATE ON case_studies_tech_stack FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Topics and Descriptions
CREATE TABLE IF NOT EXISTS case_studies_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_case_studies_topics_modtime BEFORE UPDATE ON case_studies_topics FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Disable RLS for testing/admin usage until Auth is wired up
ALTER TABLE case_studies DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_hero DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_industry DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_solutions DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_tech_stack DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_topics DISABLE ROW LEVEL SECURITY;
