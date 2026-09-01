import { db } from "@/db";
import { sections, files, notes, passwords, sites } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (String(body.action || "") !== "empty") {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    await db.delete(notes).where(sql`${notes.deletedAt} is not null`);
    await db.delete(files).where(sql`${files.deletedAt} is not null`);
    await db.delete(sections).where(sql`${sections.deletedAt} is not null`);
    await db.delete(passwords).where(sql`${passwords.deletedAt} is not null`);
    await db.delete(sites).where(sql`${sites.deletedAt} is not null`);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
