import { db } from "@/db";
import { sections, files, notes } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { jsonError } from "@/lib/server";
import { maybeSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

function attachment(payload: unknown, filename: string) {
  return Response.json(payload, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const kind = sp.get("kind") || "all";
  const id = sp.get("id") || "";

  await maybeSeed();

  if (kind === "all") {
    const [s, f, n] = await Promise.all([
      db.select().from(sections),
      db.select().from(files),
      db.select().from(notes),
    ]);
    return attachment(
      {
        app: "notes-app",
        version: 1,
        exportedAt: new Date().toISOString(),
        sections: s,
        files: f,
        notes: n,
      },
      `notes-backup-${new Date().toISOString().slice(0, 10)}.json`
    );
  }

  return jsonError("نوع تصدير غير معروف");
}
