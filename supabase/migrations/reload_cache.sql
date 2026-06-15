-- Reload PostgREST schema cache so the API recognizes the new column
NOTIFY pgrst, 'reload schema';
