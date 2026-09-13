-- backend_to_automation.automation_triggers
-- disallow_automation_without_explicit_trigger_source

select
  id,
  source,
  event_type,
  payload,
  created_at,
  meta
from automation_triggers
where source is not null
  and source <> ''
order by created_at desc;

insert into automation_triggers (
  source,
  event_type,
  payload,
  created_at,
  meta
) values (
  $1,
  $2,
  $3::jsonb,
  now(),
  $4::jsonb
)
returning
  id,
  source,
  event_type,
  payload,
  created_at,
  meta;
