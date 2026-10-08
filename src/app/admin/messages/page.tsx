import { desc } from "drizzle-orm";
import { db } from "@/dbConfig/dbConfig";
import { blogForm } from "../../../../db/schema";

export default async function AdminMessagesPage() {
  let messages: typeof blogForm.$inferSelect[] = [];
  let storageReady = Boolean(process.env.DATABASE_URL);
  if (storageReady) {
    try { messages = await db.select().from(blogForm).orderBy(desc(blogForm.createdAt), desc(blogForm.id)).limit(50); }
    catch { storageReady = false; }
  }
  return (
    <main className="site-shell flex flex-col gap-6 py-8">
      <div className="flex flex-col gap-3">
        <h1>Contact responses</h1>
        <p className="text-sm text-muted-foreground">The latest 50 messages from your portfolio and contact forms.</p>
      </div>
      {!storageReady ? <p role="status" className="surface text-sm">Message storage is unavailable. Check the database connection.</p>
        : messages.length === 0 ? <p className="surface text-sm text-muted-foreground">No messages yet.</p>
        : messages.map((inquiry) => (
          <article key={inquiry.id} className="surface flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex flex-col gap-2">
                {inquiry.name && <h2 className="break-words text-base">{inquiry.name}</h2>}
                <p className="break-all text-sm text-muted-foreground">{inquiry.email || "No email provided"}</p>
                {inquiry.number && <p className="text-sm text-muted-foreground">{inquiry.number}</p>}
              </div>
              {inquiry.createdAt && <time dateTime={inquiry.createdAt.toISOString()} className="eyebrow">{inquiry.createdAt.toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</time>}
            </div>
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{inquiry.message || "No message provided"}</p>
          </article>
        ))}
    </main>
  );
}
