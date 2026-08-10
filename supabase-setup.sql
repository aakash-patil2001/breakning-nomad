-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).

-- =========================================================
-- waitlist
-- =========================================================
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  city text not null,
  occupation text not null,
  interest text,
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

-- The public anon key may INSERT a signup...
create policy "Public can insert waitlist signups"
  on waitlist
  for insert
  to anon
  with check (true);

-- ...but raw rows (names/emails) are never publicly readable. The homepage
-- counter instead calls this function, which runs with elevated privileges
-- (security definer) and only ever returns a row count, never the rows
-- themselves.
create or replace function get_waitlist_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from waitlist;
$$;

grant execute on function get_waitlist_count() to anon;

-- =========================================================
-- custom_requests
-- =========================================================
create table custom_requests (
  id uuid primary key default gen_random_uuid(),
  destination text not null,
  email text not null,
  created_at timestamptz not null default now()
);

alter table custom_requests enable row level security;

-- Insert-only for the public anon key — no read policy, so submitted
-- requests are only visible from the Supabase dashboard/service role.
create policy "Public can insert custom requests"
  on custom_requests
  for insert
  to anon
  with check (true);
