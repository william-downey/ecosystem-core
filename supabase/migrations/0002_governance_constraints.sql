-- Governance constraints derived from governance_suite.global.safety
-- and governance_suite.temporal. Field names are unchanged.

-- require_explicit_brand_binding_for_library_items
alter table library_items
  alter column brand set not null;

alter table library_collections
  alter column brand set not null;

-- service jobs and meta events also bind to a brand for routing + visibility
alter table jobs
  alter column brand set not null;

alter table clients
  alter column brand set not null;

alter table signals
  alter column brand set not null;

alter table timeline_events
  alter column brand set not null;

-- disallow_automation_without_explicit_trigger_source
alter table automation_triggers
  alter column source set not null;

alter table automation_triggers
  alter column event_type set not null;

create index if not exists library_items_brand_idx on library_items (brand);
create index if not exists library_items_brand_slug_idx on library_items (brand, slug);
create index if not exists library_collections_brand_idx on library_collections (brand);
create index if not exists jobs_brand_idx on jobs (brand);
create index if not exists jobs_client_id_idx on jobs (client_id);
create index if not exists jobs_status_idx on jobs (status);
create index if not exists signals_brand_active_idx on signals (brand, active);
create index if not exists timeline_events_brand_timestamp_idx on timeline_events (brand, timestamp);
create index if not exists automation_triggers_source_idx on automation_triggers (source);
