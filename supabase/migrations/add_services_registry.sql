-- ============================================================
-- MIGRATION: Add 'services' parent table + service_id columns
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create the parent services registry table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on modification
CREATE OR REPLACE TRIGGER update_services_modtime
    BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 2. Disable RLS so admin UI can access it without auth
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- 3. Add service_id FK to all services content tables
--    (idempotent: safe to run multiple times)

DO $$
BEGIN
    -- services_hero
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_hero' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_hero
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;

    -- services_why_choose
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_why_choose' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_why_choose
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;

    -- services_business_suite_main
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_business_suite_main' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_business_suite_main
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;

    -- services_business_suite_items
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_business_suite_items' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_business_suite_items
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;

    -- services_erp_architecture_main
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_erp_architecture_main' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_erp_architecture_main
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;

    -- services_erp_architecture_cards
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_erp_architecture_cards' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_erp_architecture_cards
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;

    -- services_deep_module
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='services_deep_module' AND column_name='service_id'
    ) THEN
        ALTER TABLE services_deep_module
            ADD COLUMN service_id UUID REFERENCES services(id) ON DELETE CASCADE;
    END IF;
END $$;
