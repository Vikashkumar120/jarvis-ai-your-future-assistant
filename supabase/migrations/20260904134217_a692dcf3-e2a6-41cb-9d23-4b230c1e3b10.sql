ALTER TABLE public.app_releases
  ADD COLUMN IF NOT EXISTS download_url text,
  ADD COLUMN IF NOT EXISTS size_label text,
  ALTER COLUMN storage_path DROP NOT NULL,
  ALTER COLUMN storage_path SET DEFAULT '';