-- Supabase Schema (Backend Master List)
-- Tables and fields match spec/supabase_schema.json exactly.
-- Naming: snake_case tables and fields (governance_suite.global.naming_conventions).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- library
-- ---------------------------------------------------------------------------

create table if not exists library_items (
  id uuid primary key default gen_random_uuid(),
  brand text,
  type text,
  slug text,
  title text,
  description text,
  status text,
  visibility text,
  created_at timestamptz,
  updated_at timestamptz,
  meta jsonb
);

create table if not exists library_collections (
  id uuid primary key default gen_random_uuid(),
  brand text,
  name text,
  slug text,
  description text,
  created_at timestamptz,
  updated_at timestamptz,
  meta jsonb
);

-- ---------------------------------------------------------------------------
-- mastering_jobs
-- ---------------------------------------------------------------------------

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  brand text,
  client_id uuid,
  status text,
  rush boolean,
  intake_form_data jsonb,
  delivery_links jsonb,
  created_at timestamptz,
  updated_at timestamptz,
  meta jsonb
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  brand text,
  created_at timestamptz,
  updated_at timestamptz,
  meta jsonb
);

-- ---------------------------------------------------------------------------
-- meta
-- ---------------------------------------------------------------------------

create table if not exists signals (
  id uuid primary key default gen_random_uuid(),
  brand text,
  type text,
  payload jsonb,
  active boolean,
  created_at timestamptz,
  expires_at timestamptz,
  meta jsonb
);

create table if not exists timeline_events (
  id uuid primary key default gen_random_uuid(),
  brand text,
  title text,
  description text,
  timestamp timestamptz,
  meta jsonb
);

-- ---------------------------------------------------------------------------
-- automation
-- ---------------------------------------------------------------------------

create table if not exists automation_triggers (
  id uuid primary key default gen_random_uuid(),
  source text,
  event_type text,
  payload jsonb,
  created_at timestamptz,
  meta jsonb
);
