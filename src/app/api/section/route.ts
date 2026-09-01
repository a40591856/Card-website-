import { db } from "@/db";
import { sections } from "@/db/schema";
import { jsonError } from "@/lib/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  if (!name) return jsonError("اسم القسم مطلوب");
  if (name.length > 200) return jsonError("اسم القسم طويل جداً");
  const [row] = await db.insert(sections).values({ name }).returning();
  return Response.json(row);
}
