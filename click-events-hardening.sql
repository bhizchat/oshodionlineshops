-- Phase 1 hardening addendum for the `click_events` table created by
-- click-events-schema.sql. Safe to run multiple times. Run in the Supabase SQL Editor
-- AFTER click-events-schema.sql.
--
-- What this does:
--   1. Restricts event_type to the three known classifications so junk/garbage
--      rows cannot be inserted.
--   2. Caps text field lengths to prevent storage-abuse via oversized payloads.
--   3. Keeps anon INSERT (required, since visitors are not authenticated) but
--      restricts SELECT to authenticated/service roles only, so analytics data
--      cannot be scraped by anonymous visitors.

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'click_events_event_type_check') then
    alter table public.click_events
      add constraint click_events_event_type_check
      check (event_type in ('Product clicks', 'Calls', 'Messages', 'Shop clicks'));
  end if;
end $$;

-- 'Shop clicks' (Visit Shop button on product pages) was added after this
-- file's original constraint shipped. On a database where the constraint
-- already exists with only the original 3 values, replace it so 'Shop
-- clicks' inserts aren't rejected. Safe/idempotent to re-run.
alter table public.click_events drop constraint if exists click_events_event_type_check;
alter table public.click_events
  add constraint click_events_event_type_check
  check (event_type in ('Product clicks', 'Calls', 'Messages', 'Shop clicks'));

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'click_events_field_length_check') then
    alter table public.click_events
      add constraint click_events_field_length_check
      check (
        char_length(coalesce(event_label, '')) <= 120 and
        char_length(coalesce(product_name, '')) <= 200 and
        char_length(coalesce(source_page, '')) <= 300 and
        char_length(coalesce(shop_key, '')) <= 80 and
        char_length(coalesce(target_url, '')) <= 500 and
        char_length(coalesce(phone_number, '')) <= 30
      );
  end if;
end $$;

alter table public.click_events enable row level security;

drop policy if exists "Allow anon insert click events" on public.click_events;
create policy "Allow anon insert click events"
on public.click_events
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow public read click events" on public.click_events;

drop policy if exists "Allow authenticated read click events" on public.click_events;
create policy "Allow authenticated read click events"
on public.click_events
for select
to authenticated, service_role
using (true);
