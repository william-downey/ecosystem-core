export type LibraryItem = {
  id: string;
  brand: string;
  type: string;
  slug: string;
  title: string;
  description: string;
  status: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  meta: Record<string, unknown>;
};

export type LibraryCollection = {
  id: string;
  brand: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  meta: Record<string, unknown>;
};

export type Job = {
  id: string;
  brand: string;
  client_id: string;
  status: string;
  rush: boolean;
  intake_form_data: Record<string, unknown>;
  delivery_links: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  meta: Record<string, unknown>;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  brand: string;
  created_at: string;
  updated_at: string;
  meta: Record<string, unknown>;
};

export type Signal = {
  id: string;
  brand: string;
  type: string;
  payload: Record<string, unknown>;
  active: boolean;
  created_at: string;
  expires_at: string | null;
  meta: Record<string, unknown>;
};

export type TimelineEvent = {
  id: string;
  brand: string;
  title: string;
  description: string;
  timestamp: string;
  meta: Record<string, unknown>;
};

export type AutomationTrigger = {
  id: string;
  source: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
  meta: Record<string, unknown>;
};

export type CmsPage = {
  slug: string;
  title: string;
  brand: string;
  layout: string;
  content_blocks: Record<string, unknown>;
  seo_meta: Record<string, unknown>;
};

export type CmsPost = {
  slug: string;
  title: string;
  brand: string;
  body: string;
  tags: string[];
  published_at: string;
  seo_meta: Record<string, unknown>;
};

export type CmsBrandPage = {
  brand: string;
  slug: string;
  title: string;
  hero_block: Record<string, unknown>;
  sections: Record<string, unknown>[];
};

export type CmsStaticBlock = {
  key: string;
  brand: string;
  content: string;
  meta: Record<string, unknown>;
};

export type EmailLog = {
  id: string;
  profile: string;
  provider: string;
  template: string;
  to: string;
  subject: string;
  status: string;
  created_at: string;
  payload: Record<string, unknown>;
};

export type StoreShape = {
  library_items: LibraryItem[];
  library_collections: LibraryCollection[];
  jobs: Job[];
  clients: Client[];
  signals: Signal[];
  timeline_events: TimelineEvent[];
  automation_triggers: AutomationTrigger[];
  pages: CmsPage[];
  posts: CmsPost[];
  brand_pages: CmsBrandPage[];
  static_content_blocks: CmsStaticBlock[];
  email_log: EmailLog[];
};
