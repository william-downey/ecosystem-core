-- Queries used by backend_to_frontend.library_items
-- Northern Afterlight: public_with_curated_highlights
-- USoD MG: curated_meta_only

-- Dynamic library views for Northern Afterlight
select
  id,
  brand,
  type,
  slug,
  title,
  description,
  status,
  visibility,
  created_at,
  updated_at,
  meta
from library_items
where brand = 'Northern Afterlight'
  and visibility in ('public', 'highlight')
order by updated_at desc;

-- Meta overlays for USoD MG
select
  id,
  brand,
  type,
  slug,
  title,
  description,
  status,
  visibility,
  created_at,
  updated_at,
  meta
from library_items
where brand = 'USoD MG'
  and (
    coalesce((meta->>'curated')::boolean, false) = true
    or coalesce((meta->>'overlay')::boolean, false) = true
    or type = 'lore'
  )
order by updated_at desc;

-- Single library item by brand + slug (require_brand_context_for_dynamic_routes)
select
  id,
  brand,
  type,
  slug,
  title,
  description,
  status,
  visibility,
  created_at,
  updated_at,
  meta
from library_items
where brand = $1
  and slug = $2
limit 1;

-- Collections
select
  id,
  brand,
  name,
  slug,
  description,
  created_at,
  updated_at,
  meta
from library_collections
where brand = $1
order by name asc;
