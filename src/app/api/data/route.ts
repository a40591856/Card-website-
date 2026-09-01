import { db } from "@/db";
import { sections, files, notes } from "@/db/schema";
import { maybeSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await maybeSeed();
    const [s, f, n] = await Promise.all([
      db.select().from(sections),
      db.select().from(files),
      db.select().from(notes),
    ]);
    return Response.json({ sections: s, files: f, notes: n });
  } catch (error) {
    return Response.json({ error: "فشل تحميل البيانات" }, { status: 500 });
  }
}
