import { db } from "@/db";
import { passwords } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(passwords)
      .where(sql`${passwords.deletedAt} is null`);
    return Response.json({ passwords: rows });
  } catch (error) {
    return Response.json({ error: "فشل تحميل كلمات المرور" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  try {
    const [row] = await db
      .insert(passwords)
      .values({
        groupName: String(body.groupName || "").slice(0, 200),
        siteName: String(body.siteName || "").slice(0, 300),
        url: String(body.url || "").slice(0, 1000),
        username: String(body.username || "").slice(0, 300),
        password: String(body.password || "").slice(0, 500),
        note: String(body.note || "").slice(0, 5000),
      })
      .returning();
    return Response.json(row);
  } catch (error) {
    return Response.json({ error: "فشل إضافة كلمة المرور" }, { status: 500 });
  }
}
