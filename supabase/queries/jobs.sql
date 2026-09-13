-- Queries used by backend_to_frontend.jobs
-- Fifty-Seven Mastering: private_per_client, service_flows required_for_all_jobs

select
  id,
  brand,
  client_id,
  status,
  rush,
  intake_form_data,
  delivery_links,
  created_at,
  updated_at,
  meta
from jobs
where brand = 'Fifty-Seven Mastering'
  and id = $1
limit 1;

select
  id,
  brand,
  client_id,
  status,
  rush,
  intake_form_data,
  delivery_links,
  created_at,
  updated_at,
  meta
from jobs
where brand = 'Fifty-Seven Mastering'
order by
  case when rush = true and status = 'in_progress' then 0 else 1 end,
  updated_at desc;

select
  id,
  name,
  email,
  brand,
  created_at,
  updated_at,
  meta
from clients
where brand = 'Fifty-Seven Mastering'
  and id = $1
limit 1;
