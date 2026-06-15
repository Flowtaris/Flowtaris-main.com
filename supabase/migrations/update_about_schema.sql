-- Update about_topics to support an array of descriptions instead of a single string
ALTER TABLE about_topics DROP COLUMN IF EXISTS description;
ALTER TABLE about_topics ADD COLUMN IF NOT EXISTS descriptions TEXT[] DEFAULT '{}';

-- Fix Row-Level Security issues
ALTER TABLE about_topics DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_hero DISABLE ROW LEVEL SECURITY;

-- Reload PostgREST schema cache so the API recognizes the new column
NOTIFY pgrst, 'reload schema';
