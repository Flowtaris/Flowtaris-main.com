-- Fix: Explicitly disable RLS for the newly created tables so that the admin panel can insert data without auth policies.
ALTER TABLE case_studies DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_hero DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_industry DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_solutions DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_tech_stack DISABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies_topics DISABLE ROW LEVEL SECURITY;
