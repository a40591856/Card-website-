import { db } from "@/db";
import { sites } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(sites)
      .where(sql`${sites.deletedAt} is null`);
    return Response.json({ sites: rows });
  } catch (error) {
    return Response.json({ error: "فشل تحميل المواقع" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  try {
    const [row] = await db
      .insert(sites)
      .values({
        groupName: String(body.groupName || "").slice(0, 200),
        name: String(body.name || "").slice(0, 300),
        url: String(body.url || "").slice(0, 1000),
        note: String(body.note || "").slice(0, 5000),
      })
      .returning();
    return Response.json(row);
  } catch (error) {
    return Response.json({ error: "فشل إضافة الموقع" }, { status: 500 });
  }
}
