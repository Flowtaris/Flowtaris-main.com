-- Remove topic and small_description from global_hero_images
ALTER TABLE global_hero_images DROP COLUMN IF EXISTS topic;
ALTER TABLE global_hero_images DROP COLUMN IF EXISTS small_description;
