-- Adds image-attachment support to product reviews.
-- Safe to run multiple times (idempotent). Run this in the Supabase SQL Editor
-- AFTER reviews-security-schema.sql.
--
-- What this does:
--   1. Creates a public storage bucket "review-images" for review photo attachments.
--   2. Allows anon/authenticated to upload (INSERT) into that bucket only, and
--      allows public read access. Update/delete are intentionally NOT granted,
--      so uploaded images cannot be overwritten or removed by visitors.
--   3. Adds an `image_urls` jsonb column to `reviews` (defaults to an empty array),
--      capped at 4 URLs via a CHECK constraint. The submit-review Edge Function
--      validates each URL points at this bucket before inserting.

insert into storage.buckets (id, name, public)
values ('review-images', 'review-images', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can upload review images" on storage.objects;
create policy "Anyone can upload review images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'review-images');

drop policy if exists "Public can view review images" on storage.objects;
create policy "Public can view review images"
on storage.objects
for select
to public
using (bucket_id = 'review-images');

alter table public.reviews
  add column if not exists image_urls jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_image_urls_check') then
    alter table public.reviews
      add constraint reviews_image_urls_check
      check (jsonb_typeof(image_urls) = 'array' and jsonb_array_length(image_urls) <= 4);
  end if;
end $$;
