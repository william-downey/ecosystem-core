import { randomUUID } from "crypto";
import { createSeed } from "@/lib/backend/seed";
import type {
  AutomationTrigger,
  Client,
  EmailLog,
  Job,
  LibraryCollection,
  LibraryItem,
  Signal,
  StoreShape,
  TimelineEvent,
} from "@/lib/backend/types";
import {
  assertAutomationTriggerSource,
  assertLibraryBrandBinding,
  filterLibraryForBrand,
  serviceFlows,
} from "@/lib/governance";
import { backendBrandName } from "@/lib/brands";

type GlobalStore = {
  __USOD_STORE?: StoreShape;
};

function nowIso() {
  return new Date().toISOString();
}

function getStore(): StoreShape {
  const g = globalThis as GlobalStore;
  if (!g.__USOD_STORE) {
    g.__USOD_STORE = createSeed();
  }
  return g.__USOD_STORE;
}

export function snapshotStore() {
  return structuredClone(getStore());
}

export function resetStore() {
  const g = globalThis as GlobalStore;
  g.__USOD_STORE = createSeed();
  return snapshotStore();
}

export function listLibraryItems(options: {
  brand: string;
  clientId?: string;
  experimentalOptIn?: boolean;
  type?: string;
}) {
  const items = filterLibraryForBrand(getStore().library_items, options.brand, {
    clientId: options.clientId,
    experimentalOptIn: options.experimentalOptIn,
  });
  return options.type ? items.filter((item) => item.type === options.type) : items;
}

export function getLibraryItem(brand: string, slug: string, options?: {
  clientId?: string;
  experimentalOptIn?: boolean;
}) {
  return listLibraryItems({ brand, ...options }).find((item) => item.slug === slug) ?? null;
}

export function getLibraryItemById(id: string) {
  return getStore().library_items.find((item) => item.id === id) ?? null;
}

export function listLibraryCollections(brand: string) {
  return getStore().library_collections.filter(
    (collection) => backendBrandName(collection.brand) === backendBrandName(brand),
  );
}

export function createLibraryItem(input: Omit<LibraryItem, "id" | "created_at" | "updated_at"> & {
  id?: string;
}) {
  assertLibraryBrandBinding(input);
  const timestamp = nowIso();
  const item: LibraryItem = {
    ...input,
    id: input.id ?? randomUUID(),
    brand: backendBrandName(input.brand),
    created_at: timestamp,
    updated_at: timestamp,
  };
  getStore().library_items.unshift(item);
  return item;
}

export function updateLibraryItem(id: string, patch: Partial<LibraryItem>) {
  const store = getStore();
  const index = store.library_items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const next = {
    ...store.library_items[index],
    ...patch,
    id,
    updated_at: nowIso(),
  };
  assertLibraryBrandBinding(next);
  store.library_items[index] = next;
  return next;
}

export function createLibraryCollection(
  input: Omit<LibraryCollection, "id" | "created_at" | "updated_at">,
) {
  assertLibraryBrandBinding(input);
  const timestamp = nowIso();
  const collection: LibraryCollection = {
    ...input,
    id: randomUUID(),
    brand: backendBrandName(input.brand),
    created_at: timestamp,
    updated_at: timestamp,
  };
  getStore().library_collections.unshift(collection);
  return collection;
}

export function listClients(brand?: string) {
  const clients = getStore().clients;
  if (!brand) return clients;
  return clients.filter((client) => backendBrandName(client.brand) === backendBrandName(brand));
}

export function getClient(id: string) {
  return getStore().clients.find((client) => client.id === id) ?? null;
}

export function upsertClient(input: { name: string; email: string; brand: string }) {
  const store = getStore();
  const existing = store.clients.find(
    (client) =>
      client.email.toLowerCase() === input.email.toLowerCase() &&
      backendBrandName(client.brand) === backendBrandName(input.brand),
  );
  if (existing) return existing;
  const timestamp = nowIso();
  const client: Client = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    brand: backendBrandName(input.brand),
    created_at: timestamp,
    updated_at: timestamp,
    meta: {},
  };
  store.clients.unshift(client);
  return client;
}

export function listJobs(brand?: string) {
  const jobs = getStore().jobs;
  if (!brand) return jobs;
  return jobs.filter((job) => backendBrandName(job.brand) === backendBrandName(brand));
}

export function getJob(id: string) {
  return getStore().jobs.find((job) => job.id === id) ?? null;
}

export function createJob(input: {
  brand: string;
  client_id: string;
  rush?: boolean;
  intake_form_data: Record<string, unknown>;
  meta?: Record<string, unknown>;
}) {
  const brand = backendBrandName(input.brand);
  if (serviceFlows(brand) === "required_for_all_jobs" && !input.intake_form_data) {
    throw new Error("Service flows are required for all jobs.");
  }
  const timestamp = nowIso();
  const job: Job = {
    id: randomUUID(),
    brand,
    client_id: input.client_id,
    status: "received",
    rush: Boolean(input.rush),
    intake_form_data: input.intake_form_data,
    delivery_links: {},
    created_at: timestamp,
    updated_at: timestamp,
    meta: { service_flow: serviceFlows(brand), ...(input.meta ?? {}) },
  };
  getStore().jobs.unshift(job);
  return job;
}

export function updateJob(id: string, patch: Partial<Job>) {
  const store = getStore();
  const index = store.jobs.findIndex((job) => job.id === id);
  if (index === -1) return null;
  const previous = store.jobs[index];
  const next: Job = {
    ...previous,
    ...patch,
    id,
    updated_at: nowIso(),
  };
  store.jobs[index] = next;
  return { previous, next };
}

export function listSignals(brand?: string) {
  const signals = getStore().signals;
  if (!brand) return signals;
  return signals.filter((signal) => backendBrandName(signal.brand) === backendBrandName(brand));
}

export function getSignal(id: string) {
  return getStore().signals.find((signal) => signal.id === id) ?? null;
}

export function createSignal(input: Omit<Signal, "id" | "created_at"> & { id?: string }) {
  const signal: Signal = {
    ...input,
    id: input.id ?? randomUUID(),
    brand: backendBrandName(input.brand),
    created_at: nowIso(),
  };
  getStore().signals.unshift(signal);
  return signal;
}

export function updateSignal(id: string, patch: Partial<Signal>) {
  const store = getStore();
  const index = store.signals.findIndex((signal) => signal.id === id);
  if (index === -1) return null;
  const next = { ...store.signals[index], ...patch, id };
  store.signals[index] = next;
  return next;
}

export function listTimelineEvents(brand?: string) {
  const events = getStore().timeline_events;
  const filtered = brand
    ? events.filter((event) => backendBrandName(event.brand) === backendBrandName(brand))
    : events;
  return [...filtered].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export function createTimelineEvent(input: Omit<TimelineEvent, "id"> & { id?: string }) {
  const event: TimelineEvent = {
    ...input,
    id: input.id ?? randomUUID(),
    brand: backendBrandName(input.brand),
  };
  getStore().timeline_events.unshift(event);
  return event;
}

export function listAutomationTriggers() {
  return [...getStore().automation_triggers].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export function logAutomationTrigger(input: {
  source: string;
  event_type: string;
  payload: Record<string, unknown>;
  meta?: Record<string, unknown>;
}) {
  assertAutomationTriggerSource(input.source);
  const trigger: AutomationTrigger = {
    id: randomUUID(),
    source: input.source,
    event_type: input.event_type,
    payload: input.payload,
    created_at: nowIso(),
    meta: input.meta ?? {},
  };
  getStore().automation_triggers.unshift(trigger);
  return trigger;
}

export function listPages(brand?: string) {
  const pages = getStore().pages;
  if (!brand) return pages;
  return pages.filter((page) => page.brand === brand);
}

export function listPosts(brand?: string) {
  const posts = getStore().posts;
  const filtered = brand ? posts.filter((post) => post.brand === brand) : posts;
  return [...filtered].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
}

export function getPost(brand: string, slug: string) {
  return getStore().posts.find((post) => post.brand === brand && post.slug === slug) ?? null;
}

export function createPost(input: Omit<import("@/lib/backend/types").CmsPost, "published_at"> & {
  published_at?: string;
}) {
  const post = {
    ...input,
    published_at: input.published_at ?? nowIso(),
  };
  getStore().posts.unshift(post);
  return post;
}

export function listBrandPages(brand?: string) {
  const pages = getStore().brand_pages;
  if (!brand) return pages;
  return pages.filter((page) => backendBrandName(page.brand) === backendBrandName(brand));
}

export function listStaticBlocks(brand?: string) {
  const blocks = getStore().static_content_blocks;
  if (!brand) return blocks;
  return blocks.filter((block) => block.brand === brand);
}

export function getStaticBlock(brand: string, key: string) {
  return (
    getStore().static_content_blocks.find((block) => block.brand === brand && block.key === key) ??
    null
  );
}

export function listEmailLog() {
  return [...getStore().email_log].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export function logEmail(input: Omit<EmailLog, "id" | "created_at"> & { id?: string }) {
  const entry: EmailLog = {
    ...input,
    id: input.id ?? randomUUID(),
    created_at: nowIso(),
  };
  getStore().email_log.unshift(entry);
  return entry;
}
