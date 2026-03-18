-- ============================================================
-- NEXUS_AI — Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── USERS ──────────────────────────────────────────────────
-- Mirrors Clerk user data for DB-side references
create table if not exists public.users (
  id            text primary key,          -- Clerk userId
  email         text unique not null,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── SUBSCRIPTIONS ──────────────────────────────────────────
create table if not exists public.subscriptions (
  id                       uuid primary key default uuid_generate_v4(),
  user_id                  text not null references public.users(id) on delete cascade,
  stripe_customer_id       text unique,
  stripe_subscription_id   text unique,
  status                   text not null default 'free',
  -- Values: 'free', 'active', 'past_due', 'canceled', 'trialing'
  price_id                 text,
  current_period_start     timestamptz,
  current_period_end       timestamptz,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

-- ─── CONVERSATIONS ──────────────────────────────────────────
create table if not exists public.conversations (
  id           uuid primary key default uuid_generate_v4(),
  user_id      text not null references public.users(id) on delete cascade,
  title        text not null default 'New Conversation',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ─── MESSAGES ───────────────────────────────────────────────
create table if not exists public.messages (
  id                uuid primary key default uuid_generate_v4(),
  conversation_id   uuid not null references public.conversations(id) on delete cascade,
  user_id           text not null,
  role              text not null check (role in ('user', 'assistant')),
  content           text not null,
  tokens_used       integer default 0,
  created_at        timestamptz default now()
);

-- ─── USAGE ──────────────────────────────────────────────────
create table if not exists public.usage (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               text not null references public.users(id) on delete cascade,
  stripe_customer_id    text,
  messages_count        integer not null default 0,
  tokens_count          integer not null default 0,
  period_start          timestamptz default date_trunc('month', now()),
  updated_at            timestamptz default now(),
  unique(user_id, period_start)
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.users          enable row level security;
alter table public.subscriptions  enable row level security;
alter table public.conversations  enable row level security;
alter table public.messages       enable row level security;
alter table public.usage          enable row level security;

-- USERS: users can only read their own row
create policy "users_select_own" on public.users
  for select using (id = requesting_user_id());

-- SUBSCRIPTIONS: users can only see their own subscription
create policy "subscriptions_select_own" on public.subscriptions
  for select using (user_id = requesting_user_id());

-- CONVERSATIONS: users manage their own conversations
create policy "conversations_select_own" on public.conversations
  for select using (user_id = requesting_user_id());
create policy "conversations_insert_own" on public.conversations
  for insert with check (user_id = requesting_user_id());
create policy "conversations_update_own" on public.conversations
  for update using (user_id = requesting_user_id());
create policy "conversations_delete_own" on public.conversations
  for delete using (user_id = requesting_user_id());

-- MESSAGES: users manage their own messages
create policy "messages_select_own" on public.messages
  for select using (user_id = requesting_user_id());
create policy "messages_insert_own" on public.messages
  for insert with check (user_id = requesting_user_id());

-- USAGE: users can read their own usage
create policy "usage_select_own" on public.usage
  for select using (user_id = requesting_user_id());

-- ============================================================
-- HELPER FUNCTION (Clerk JWT compatibility)
-- ============================================================
-- This function extracts the Clerk userId from the JWT sub claim.
-- You need to set up a Custom JWT Template in Clerk that includes
-- the userId in the 'sub' field, then configure Supabase with
-- Clerk's JWKS endpoint.

create or replace function requesting_user_id()
returns text
language sql stable
as $$
  select nullif(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$;

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_conversations_user_id on public.conversations(user_id);
create index if not exists idx_messages_conversation_id on public.messages(conversation_id);
create index if not exists idx_messages_user_id on public.messages(user_id);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_usage_user_id on public.usage(user_id);

-- ============================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
  before update on public.users
  for each row execute function update_updated_at_column();

create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function update_updated_at_column();

create trigger update_conversations_updated_at
  before update on public.conversations
  for each row execute function update_updated_at_column();
