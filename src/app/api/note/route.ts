import { db } from "@/db";
import { notes } from "@/db/schema";
import { jsonError } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const fileId = body.fileId ? String(body.fileId) : null;
  const title = String(body.title || "").trim();
  const content = String(body.content || "");
  const type = ["note", "checklist", "drawing", "voice"].includes(String(body.type))
    ? String(body.type)
    : "note";

  const [row] = await db
    .insert(notes)
    .values({ fileId, title, content, type })
    .returning();
  return Response.json(row);
}
