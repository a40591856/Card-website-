import { db } from "@/db";
import { notes } from "@/db/schema";
import { jsonError } from "@/lib/server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  switch (action) {
    case "update": {
      const title = String(body.title ?? "").slice(0, 500);
      const content = String(body.content ?? "").slice(0, 2_000_000);
      const [row] = await db
        .update(notes)
        .set({ title, content, updatedAt: new Date() })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("الملاحظة غير موجودة", 404);
      return Response.json(row);
    }
    case "move": {
      const fileId = body.fileId ? String(body.fileId) : null;
      const [row] = await db
        .update(notes)
        .set({ fileId, updatedAt: new Date() })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("الملاحظة غير موجودة", 404);
      return Response.json(row);
    }
    case "delete": {
      const [row] = await db
        .update(notes)
        .set({ deletedAt: new Date() })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("الملاحظة غير موجودة", 404);
      return Response.json(row);
    }
    case "restore": {
      const [row] = await db
        .update(notes)
        .set({ deletedAt: null })
        .where((t) => t.id === id)
        .returning();
      if (!row) return jsonError("الملاحظة غير موجودة", 404);
      return Response.json(row);
    }
    default:
      return jsonError("إجراء غير معروف");
  }
}
