import { db } from "@/db";
import { sections, files, notes } from "@/db/schema";
import { and, ilike, or, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") || "";
  const term = q.trim();
  const empty = { sections: [], files: [], notes: [] };
  if (!term) return Response.json(empty);

  const like = `%${term}%`;

  const [s, f, n] = await Promise.all([
    db
      .select()
      .from(sections)
      .where(and(sql`${sections.deletedAt} is null`, ilike(sections.name, like)))
      .limit(15),
    db
      .select()
      .from(files)
      .where(and(sql`${files.deletedAt} is null`, ilike(files.name, like)))
      .limit(15),
    db
      .select()
      .from(notes)
      .where(
        and(
          sql`${notes.deletedAt} is null`,
          or(ilike(notes.title, like), ilike(notes.content, like))
        )
      )
      .limit(25),
  ]);

  return Response.json({ sections: s, files: f, notes: n });
}
