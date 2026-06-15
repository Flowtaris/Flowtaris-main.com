-- Add image_url to blogs_topics to support images for each topic
ALTER TABLE blogs_topics ADD COLUMN IF NOT EXISTS image_url TEXT;
