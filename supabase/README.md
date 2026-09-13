# Supabase (backend master list)

SQL in `migrations/` creates the tables and fields from `spec/supabase_schema.json` without renaming anything.

```bash
supabase db reset
# or run the SQL in the Supabase SQL editor, in numeric order
```

`queries/` holds the select/insert statements used by:

- `backend_to_frontend.library_items`
- `backend_to_frontend.jobs`
- `backend_to_automation.automation_triggers`

Point the hosted project at these tables, then set `NEXT_PUBLIC_SUPABASE_URL` and a service role or anon key. Until those exist, the Next.js app serves the same fields from the local store.
