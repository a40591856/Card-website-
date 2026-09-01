import { db } from "@/db";
import { sites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { jsonError } from "@/lib/server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "");

  switch (action) {
    case "update": {
      const [row] = await db
        .update(sites)
        .set({
          groupName: String(body.groupName || "").slice(0, 200),
          name: String(body.name || "").slice(0, 300),
          url: String(body.url || "").slice(0, 1000),
          note: String(body.note || "").slice(0, 5000),
          updatedAt: new Date(),
        })
        .where(eq(sites.id, id))
        .returning();
      if (!row) return jsonError("العنصر غير موجود", 404);
      return Response.json(row);
    }
    case "delete": {
      await db.delete(sites).where(eq(sites.id, id));
      return Response.json({ ok: true });
    }
    default:
      return jsonError("إجراء غير معروف");
  }
}
