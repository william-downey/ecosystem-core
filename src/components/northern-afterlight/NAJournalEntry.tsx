import type { CmsPost } from "@/lib/backend/types";

export function NAJournalEntry({ post }: { post: CmsPost }) {
  return (
    <article className="border-b border-border py-8 last:border-b-0">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {new Date(post.published_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h3 className="mt-2 font-heading text-3xl">{post.title}</h3>
      <p className="mt-3 max-w-2xl text-muted-foreground">{post.body}</p>
    </article>
  );
}
