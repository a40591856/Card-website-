import { db } from "@/db";
import { files } from "@/db/schema";
import { jsonError } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const sectionId = body.sectionId ? String(body.sectionId) : null;
  if (!name) return jsonError("اسم الملف مطلوب");
  if (name.length > 200) return jsonError("اسم الملف طويل جداً");
  const [row] = await db.insert(files).values({ sectionId, name }).returning();
  return Response.json(row);
}
