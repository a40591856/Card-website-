import { db } from "@/db";
import { sections } from "@/db/schema";
import { jsonError } from "@/lib/server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  switch (action) {
    case "rename": {
      const name = String(body.name || "").trim();
      if (!name) return jsonError("اسم القسم مطلوب");
      const [row] = await db
        .update(sections)
        .set({ name })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("القسم غير موجود", 404);
      return Response.json(row);
    }
    case "delete": {
      const [row] = await db
        .update(sections)
        .set({ deletedAt: new Date() })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("القسم غير موجود", 404);
      return Response.json(row);
    }
    case "restore": {
      const [row] = await db
        .update(sections)
        .set({ deletedAt: null })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("القسم غير موجود", 404);
      return Response.json(row);
    }
    default:
      return jsonError("إجراء غير معروف");
  }
}
