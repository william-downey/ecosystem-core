import { NAJournalEntry } from "@/components/northern-afterlight/NAJournalEntry";
import { ShellLayout } from "@/components/ShellLayout";
import { listPosts } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default function JournalPage() {
  const posts = listPosts(NORTHERN_AFTERLIGHT);
  return (
    <ShellLayout brand={NORTHERN_AFTERLIGHT} veil="aurora">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs tracking-[0.28em] text-primary uppercase">Webflow.cms_pages</p>
        <h1 className="mt-3 font-heading text-5xl">Journal</h1>
        {posts.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No journal posts have been published.</p>
        ) : (
          <div className="mt-8">
            {posts.map((post) => (
              <NAJournalEntry key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </ShellLayout>
  );
}
