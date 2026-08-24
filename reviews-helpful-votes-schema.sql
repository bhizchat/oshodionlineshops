-- Adds "was this review helpful" vote counters to the reviews table.
-- Safe to run multiple times (idempotent). Run this in the Supabase SQL Editor.
--
-- What this does:
--   1. Adds helpful_yes / helpful_no counters (default 0) with CHECK constraints
--      so they can never go negative.
--   2. Creates an atomic increment function used by the vote-review Edge Function
--      (called via the service_role client, so it bypasses RLS like all other
--      writes to this table — anon/authenticated still cannot UPDATE directly).

alter table public.reviews
  add column if not exists helpful_yes integer not null default 0;

alter table public.reviews
  add column if not exists helpful_no integer not null default 0;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_helpful_yes_nonnegative_check') then
    alter table public.reviews
      add constraint reviews_helpful_yes_nonnegative_check check (helpful_yes >= 0);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'reviews_helpful_no_nonnegative_check') then
    alter table public.reviews
      add constraint reviews_helpful_no_nonnegative_check check (helpful_no >= 0);
  end if;
end $$;

create or replace function public.increment_review_vote(p_review_id uuid, p_vote text)
returns table(helpful_yes integer, helpful_no integer)
language plpgsql
as $$
begin
  if p_vote not in ('yes', 'no') then
    raise exception 'invalid vote value';
  end if;

  if p_vote = 'yes' then
    update public.reviews r set helpful_yes = r.helpful_yes + 1
      where r.id = p_review_id and r.is_approved = true;
  else
    update public.reviews r set helpful_no = r.helpful_no + 1
      where r.id = p_review_id and r.is_approved = true;
  end if;

  return query select r.helpful_yes, r.helpful_no from public.reviews r where r.id = p_review_id;
end;
$$;
