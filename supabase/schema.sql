create extension if not exists pgcrypto;

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  full_name        text        check (full_name is null or char_length(full_name) <= 120),
  phone            text        not null check (char_length(phone) between 7 and 25),
  email            text        check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  property_address text        not null check (char_length(property_address) between 5 and 250),
  sell_timeline    text        check (sell_timeline is null or sell_timeline in ('asap', '30_days', '60_90_days', 'exploring')),
  accepted_terms   boolean     not null check (accepted_terms = true),
  language         text        not null default 'en' check (language in ('en', 'es', 'pt')),
  source           text        not null default 'landing',
  status           text        not null default 'new' check (status in ('new', 'contacted', 'offer_sent', 'closed', 'discarded'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "Public can insert leads" on public.leads;
create policy "Public can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (accepted_terms = true and status = 'new');

revoke all on public.leads from anon, authenticated;
grant insert on public.leads to anon, authenticated;
