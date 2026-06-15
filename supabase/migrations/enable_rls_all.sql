-- ============================================================
-- SECURE ALL CMS TABLES
-- This script enables Row Level Security (RLS) on all content tables.
-- It allows anonymous users to SELECT (read) the data for public pages,
-- but restricts INSERT, UPDATE, and DELETE to authenticated admins only.
-- ============================================================

DO $$
DECLARE
    t_name text;
    tables_to_secure text[] := ARRAY[
        'global_hero', 'global_hero_images', 'modern_technologies',
        'services', 'services_hero', 'services_why_choose', 'services_business_suite_main',
        'services_business_suite_items', 'services_erp_architecture_main',
        'services_erp_architecture_cards', 'services_deep_module',
        'why_choose_us_cards', 
        'integrations', 'integrations_hero', 'integrations_security_precision_main', 'integrations_security_precision_cards', 'integrations_execution_trace',
        'blogs', 'blogs_hero', 'blogs_topics', 'blogs_faqs',
        'case_studies', 'case_studies_hero', 'case_studies_industries', 'case_studies_solutions', 'case_studies_tech_stack', 'case_studies_topics',
        'about_hero', 'about_topics'
    ];
BEGIN
    FOREACH t_name IN ARRAY tables_to_secure
    LOOP
        -- Check if the table actually exists before attempting to secure it
        IF to_regclass(t_name) IS NOT NULL THEN
            -- Enable RLS
            EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t_name);

            -- Drop potential old permissive policies
            BEGIN
                EXECUTE format('DROP POLICY IF EXISTS "Allow all on %I" ON %I;', t_name, t_name);
            EXCEPTION WHEN undefined_object THEN
                -- Ignore if it doesn't exist
            END;

            BEGIN
                EXECUTE format('DROP POLICY IF EXISTS "Allow public read" ON %I;', t_name);
                EXECUTE format('DROP POLICY IF EXISTS "Allow authenticated full access" ON %I;', t_name);
            EXCEPTION WHEN undefined_object THEN
                -- Ignore
            END;

            -- Create Public Read Policy
            EXECUTE format('CREATE POLICY "Allow public read" ON %I FOR SELECT USING (true);', t_name);

            -- Create Authenticated Write Policies
            EXECUTE format('CREATE POLICY "Allow authenticated insert" ON %I FOR INSERT WITH CHECK (auth.role() = ''authenticated'');', t_name);
            EXECUTE format('CREATE POLICY "Allow authenticated update" ON %I FOR UPDATE USING (auth.role() = ''authenticated'');', t_name);
            EXECUTE format('CREATE POLICY "Allow authenticated delete" ON %I FOR DELETE USING (auth.role() = ''authenticated'');', t_name);
        ELSE
            RAISE NOTICE 'Table % does not exist. Skipping RLS setup.', t_name;
        END IF;
    END LOOP;
END $$;
