-- Adds "was this review helpful" vote counters to the reviews table.
-- Safe to run multiple times (idempotent). Run this in the Supabase SQL Editor.
--
-- What this does:
--   1. Adds helpful_yes / helpful_no counters (default 0) with CHECK constraints
--      so they can never go negative.
--   2. Creates an atomic vote function used by the vote-review Edge Function
--      (called via the service_role client, so it bypasses RLS like all other
--      writes to this table — anon/authenticated still cannot UPDATE directly).
--      Supports switching an existing vote (e.g. Yes -> No) by optionally
--      decrementing the previous choice's counter in the same call.

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

-- Drop the original 2-argument overload if it exists from before vote-switching
-- support was added, so only the 3-argument version remains (avoids ambiguous
-- overload resolution on environments upgraded from the earlier version).
drop function if exists public.increment_review_vote(uuid, text);

create or replace function public.increment_review_vote(
  p_review_id uuid,
  p_vote text,
  p_previous_vote text default null
)
returns table(helpful_yes integer, helpful_no integer)
language plpgsql
as $$
begin
  if p_vote not in ('yes', 'no') then
    raise exception 'invalid vote value';
  end if;

  if p_previous_vote is not null and p_previous_vote not in ('yes', 'no') then
    raise exception 'invalid previous vote value';
  end if;

  -- Undo the previous choice, if the caller is switching their vote.
  if p_previous_vote = 'yes' then
    update public.reviews r set helpful_yes = greatest(r.helpful_yes - 1, 0)
      where r.id = p_review_id and r.is_approved = true;
  elsif p_previous_vote = 'no' then
    update public.reviews r set helpful_no = greatest(r.helpful_no - 1, 0)
      where r.id = p_review_id and r.is_approved = true;
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
