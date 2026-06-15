-- Set up a function to automatically update 'updated_at' columns whenever a row is modified
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- 1. GLOBAL HERO SECTION
-- ==========================================
CREATE TABLE global_hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    main_description TEXT NOT NULL,
    small_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_global_hero_modtime BEFORE UPDATE ON global_hero FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE global_hero_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_id UUID REFERENCES global_hero(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    topic TEXT NOT NULL,
    small_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_global_hero_images_modtime BEFORE UPDATE ON global_hero_images FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 2. MODERN TECHNOLOGIES SECTION
-- ==========================================
CREATE TABLE modern_technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo_url TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_modern_technologies_modtime BEFORE UPDATE ON modern_technologies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 3. SERVICES PAGE/SECTION
-- ==========================================

-- Parent services registry (each row = one service page)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Migration for existing installs: add service_id FK to all content tables
-- (safe to run repeatedly thanks to IF NOT EXISTS / DO guards)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_hero' AND column_name='service_id') THEN
        ALTER TABLE services_hero ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_why_choose' AND column_name='service_id') THEN
        ALTER TABLE services_why_choose ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_business_suite_main' AND column_name='service_id') THEN
        ALTER TABLE services_business_suite_main ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_business_suite_items' AND column_name='service_id') THEN
        ALTER TABLE services_business_suite_items ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_erp_architecture_main' AND column_name='service_id') THEN
        ALTER TABLE services_erp_architecture_main ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_erp_architecture_cards' AND column_name='service_id') THEN
        ALTER TABLE services_erp_architecture_cards ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_deep_module' AND column_name='service_id') THEN
        ALTER TABLE services_deep_module ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
END $$;

CREATE TABLE services_hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    hero_description TEXT NOT NULL,
    normal_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_hero_modtime BEFORE UPDATE ON services_hero FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE services_why_choose (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    main_description TEXT NOT NULL,
    small_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_why_choose_modtime BEFORE UPDATE ON services_why_choose FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- A Complete Business Management Suite
CREATE TABLE services_business_suite_main (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    small_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_business_suite_main_modtime BEFORE UPDATE ON services_business_suite_main FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE services_business_suite_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_business_suite_items_modtime BEFORE UPDATE ON services_business_suite_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Engineering the ERP Architecture
CREATE TABLE services_erp_architecture_main (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    small_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_erp_architecture_main_modtime BEFORE UPDATE ON services_erp_architecture_main FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE services_erp_architecture_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_erp_architecture_cards_modtime BEFORE UPDATE ON services_erp_architecture_cards FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Deep Module Expertise
CREATE TABLE services_deep_module (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    small_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_services_deep_module_modtime BEFORE UPDATE ON services_deep_module FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 4. WHY CHOOSE US SECTION
-- ==========================================
CREATE TABLE why_choose_us_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    small_description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_why_choose_us_cards_modtime BEFORE UPDATE ON why_choose_us_cards FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 5. INTEGRATIONS SECTION
-- ==========================================
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    svg_slot_1 TEXT, 
    svg_slot_2 TEXT, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_integrations_modtime BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 6. TEMPORARY PUBLIC ACCESS (NO RLS)
-- ==========================================
-- Because you haven't wired up Supabase Auth logins yet, we are giving anonymous 
-- users full access to these tables so you can test your Admin UI immediately.
-- 
-- DO NOT LEAVE THIS ON IN PRODUCTION WITHOUT AUTH!

DO $$
DECLARE
    t_name text;
BEGIN
    FOR t_name IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN (
            'global_hero', 'global_hero_images', 'modern_technologies',
            'services', 'services_hero', 'services_why_choose', 'services_business_suite_main',
            'services_business_suite_items', 'services_erp_architecture_main',
            'services_erp_architecture_cards', 'services_deep_module',
            'why_choose_us_cards', 'integrations'
        )
    LOOP
        EXECUTE format('ALTER TABLE %I DISABLE ROW LEVEL SECURITY;', t_name);
    END LOOP;
END $$;
