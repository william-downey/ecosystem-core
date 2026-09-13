import { AdminShell } from "@/components/admin/AdminShell";
import { listLibraryCollections, listLibraryItems, listPosts } from "@/lib/backend/store";
import { NORTHERN_AFTERLIGHT } from "@/lib/brands";
import { applyNorthernAfterlightReleaseWindow } from "@/lib/temporal";

export const dynamic = "force-dynamic";

export default function AdminNorthernPage() {
  const tracks = applyNorthernAfterlightReleaseWindow(
    listLibraryItems({ brand: NORTHERN_AFTERLIGHT, type: "track" }),
  );
  const projects = listLibraryItems({ brand: NORTHERN_AFTERLIGHT, type: "project" });
  const posts = listPosts(NORTHERN_AFTERLIGHT);
  const collections = listLibraryCollections(NORTHERN_AFTERLIGHT);

  return (
    <AdminShell title="Northern Afterlight" active="/admin/northern-afterlight">
      <div className="grid gap-8">
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Highlight manager
          </h2>
          <ul className="grid gap-2 text-sm">
            {tracks
              .filter((item) => item.highlight_in_library)
              .map((item) => (
                <li key={item.id} className="rounded-md border border-border px-3 py-2">
                  {item.title} — in release window
                </li>
              ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Library editor
          </h2>
          <p className="text-sm text-muted-foreground">{tracks.length} public/highlight tracks.</p>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Project curator
          </h2>
          <p className="text-sm text-muted-foreground">
            {projects.length} projects · {collections.length} collections
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">
            Journal editor
          </h2>
          <ul className="grid gap-2 text-sm">
            {posts.map((post) => (
              <li key={post.slug}>{post.title}</li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
