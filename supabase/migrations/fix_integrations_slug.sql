-- Fix: Add slug column to existing integrations table if it was created previously
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='integrations' AND column_name='slug'
    ) THEN
        ALTER TABLE integrations ADD COLUMN slug TEXT UNIQUE;
        
        -- Backfill existing records with a slug derived from name
        UPDATE integrations SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;
    END IF;
END $$;
