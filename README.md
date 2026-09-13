# Ugly Side of Drama — Unified Multi-Brand Ecosystem

Implementation of the migration packet: brand directory, cross-platform blueprint, governance, temporal layers, routing, admin tools, Supabase schema, Webflow CMS collections, component inventory, integrations, Make.com automation, email flows, and delivery.

The JSON in [`spec/`](spec/) is the source of truth. Fields, keys, and values there are unchanged from the packet.

The record label is **USoD Music Group** in the brand directory and **USoD MG** from the governance suite onward. Both names refer to the same brand. Public routing uses `/usod-mg` as specified in governance and routing architecture. `/usod-music-group` redirects to that home.

## What this repo runs

The packet names Webflow as the presentation layer and Supabase as the native backend. This application implements that architecture as a runnable Next.js routing shell with the same routes, CMS collection shapes, and backend tables:

- **Frontend / routing shell** — Next.js App Router using the exact routes in `spec/routing_architecture.json`
- **CMS collections** — `pages`, `posts`, `brand_pages`, `static_content_blocks` matching `spec/cms_schema.json`
- **Backend** — Supabase SQL in `supabase/migrations`, plus a local store that uses the same tables/fields when Supabase env vars are absent
- **Automation** — Make.com scenario configs in `make/scenarios` and a local runner that executes the same triggers/actions
- **Email** — templates in `email/templates` bound to the Postmark/Brevo profiles in `spec/email_flow_map.json`
- **Delivery** — Dropbox folder structures and Samply naming from `spec/delivery_map.json`

## Brands

| Brand | Home |
| --- | --- |
| Ugly Side of Drama (parent) | `/` |
| Northern Afterlight | `/northern-afterlight` |
| Fifty-Seven Mastering | `/fifty-seven-mastering` |
| USoD MG | `/usod-mg` |
| Fourth Brand | `/fourth-brand` |

Admin tools live at `/admin`. Unregistered paths redirect to `/error/route-not-found`.

## Run locally

```bash
npm install
npm run dev
```

The app listens on [http://127.0.0.1:43147](http://127.0.0.1:43147).

```bash
npm run validate:spec
npm run build
```

## Supabase

Apply migrations in order:

1. `supabase/migrations/0001_backend_master_list.sql` — tables and fields from the backend master list
2. `supabase/migrations/0002_governance_constraints.sql` — brand binding and explicit automation sources

Queries used by the integration map are in `supabase/queries/`.

Without `NEXT_PUBLIC_SUPABASE_URL`, the app uses an in-memory store seeded to the same schema. Copy `.env.example` to `.env.local` to attach a live project.

## Make.com, email, delivery

Scenario JSON in `make/scenarios/` preserves the packet's `name`, `source`, `trigger`, `conditions`, and `actions`. Import those into Make.com and point Supabase webhooks (or `MAKE_WEBHOOK_URL`) at them.

Email and delivery run locally even without provider keys: Postmark/Brevo calls and Dropbox/Samply APIs are mocked, and the resulting paths, links, and email log still follow the spec. Set the env vars in `.env.example` to send for real.

## Governance and time

- Library items require an explicit `brand`
- Automation rows require an explicit `source`
- Dynamic routes require a brand prefix
- Time zone is `America/New_York`
- Sunday 02:00–04:00 pauses automation and delivery
- Northern Afterlight release windows, Fifty-Seven rush mode, and USoD MG signal windows are enforced in backend logic

## API

| Endpoint | Role |
| --- | --- |
| `GET/POST /api/library/items` | `library_items` |
| `GET /api/library/items/:slug?brand=` | brand-scoped item |
| `GET/POST /api/jobs` | mastering jobs + intake confirmation |
| `PATCH /api/jobs/:id` | status changes, including `ready_for_delivery` |
| `GET/POST /api/signals` | meta signals + broadcast |
| `GET/POST /api/automation/triggers` | trigger log / dispatch |
| `GET /api/cms` | Webflow collection shapes |
| `GET /api/spec` | packet JSON |
| `GET /api/temporal` | temporal status |
| `GET/POST /api/delivery` | Dropbox / Samply path generation |
| `GET/POST /api/email` | templated send + log |
