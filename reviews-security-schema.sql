-- Phase 1 security hardening for the existing `reviews` table.
-- Safe to run multiple times (idempotent). Run this in the Supabase SQL Editor.
--
-- What this does:
--   1. Adds a moderation flag (is_approved) so new reviews are quarantined until reviewed.
--      Existing reviews are marked approved so nothing currently visible disappears.
--   2. Adds CHECK constraints so malformed data is rejected at the database engine level.
--   3. Enables Row Level Security and restricts the anon/authenticated roles to
--      read-only access on approved rows. Direct public INSERT/UPDATE/DELETE is revoked;
--      going forward, only the submit-review Edge Function (using the service_role key)
--      can write new reviews.

alter table public.reviews
  add column if not exists is_approved boolean not null default false;

-- Preserve visibility of reviews that already exist today.
update public.reviews set is_approved = true where is_approved is distinct from true;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_rating_range_check') then
    alter table public.reviews
      add constraint reviews_rating_range_check check (rating >= 1 and rating <= 5);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_reviewer_name_length_check') then
    alter table public.reviews
      add constraint reviews_reviewer_name_length_check
      check (char_length(trim(reviewer_name)) between 2 and 80);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_comment_length_check') then
    alter table public.reviews
      add constraint reviews_comment_length_check
      check (char_length(trim(comment)) between 5 and 600);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_shop_key_format_check') then
    alter table public.reviews
      add constraint reviews_shop_key_format_check
      check (shop_key ~* '^[a-z0-9_-]+$');
  end if;
end $$;

create index if not exists idx_reviews_product_approved
  on public.reviews (shop_key, product_index, is_approved)
  where is_approved = true;

alter table public.reviews enable row level security;

-- Drop any pre-existing permissive policies from before this hardening pass.
-- A permissive SELECT policy using `true` would otherwise be OR'd together
-- with the restrictive policy below, exposing unapproved reviews to everyone.
drop policy if exists "Public can read reviews" on public.reviews;
drop policy if exists "Public can insert reviews" on public.reviews;
drop policy if exists "Public can update reviews" on public.reviews;
drop policy if exists "Public can delete reviews" on public.reviews;

drop policy if exists "Public can view approved reviews" on public.reviews;
create policy "Public can view approved reviews"
on public.reviews
for select
to anon, authenticated
using (is_approved = true);

-- Remove direct public write access. New reviews must go through the
-- submit-review Edge Function (service_role), which validates and moderates input.
revoke insert, update, delete on public.reviews from anon, authenticated;
grant select on public.reviews to anon, authenticated;
grant all on public.reviews to service_role;
