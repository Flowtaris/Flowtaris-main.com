-- Migration to add 'name' to 'modern_technologies'
ALTER TABLE modern_technologies ADD COLUMN name VARCHAR(255);
