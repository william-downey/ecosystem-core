-- Meta signals and timeline events
-- enforce_temporal_layers_for_meta_events: active + unexpired for signal_window

select
  id,
  brand,
  type,
  payload,
  active,
  created_at,
  expires_at,
  meta
from signals
where brand = 'USoD MG'
  and active = true
  and (expires_at is null or expires_at > now())
order by created_at desc;

select
  id,
  brand,
  title,
  description,
  timestamp,
  meta
from timeline_events
where brand = $1
order by timestamp desc;
