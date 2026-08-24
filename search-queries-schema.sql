-- Search query analytics: records every search a visitor performs (pressing
-- Enter or clicking the search button), along with how many products matched,
-- so we can see what people are looking for.
--
-- Run this once against the linked Supabase project:
--   echo "$(cat search-queries-schema.sql)" | supabase db query --linked
-- (safe to re-run; uses IF NOT EXISTS / CREATE OR REPLACE throughout)

create table if not exists public.search_queries (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  results_count integer,
  created_at timestamptz not null default now()
);

create index if not exists search_queries_created_at_idx on public.search_queries (created_at desc);
create index if not exists search_queries_query_idx on public.search_queries (lower(query));

alter table public.search_queries enable row level security;

-- No direct client access at all (not even SELECT) — this table is
-- write-only-via-Edge-Function; reads happen only via the Supabase dashboard
-- or service role. Revoke any default grants just in case.
revoke all on public.search_queries from anon, authenticated;
