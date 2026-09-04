
-- Switch app_releases from direct file uploads to admin-pasted external links
-- (e.g. MediaFire), so the admin panel no longer needs to store the file itself.

ALTER TABLE public.app_releases
  ALTER COLUMN storage_path DROP NOT NULL,
  ALTER COLUMN size_bytes DROP NOT NULL,
  ALTER COLUMN size_bytes DROP DEFAULT;

ALTER TABLE public.app_releases
  ADD COLUMN download_url text,
  ADD COLUMN size_label text;

ALTER TABLE public.app_releases
  ADD CONSTRAINT app_releases_has_source
  CHECK (storage_path IS NOT NULL OR download_url IS NOT NULL);
