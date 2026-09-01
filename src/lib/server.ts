import { eq, InferSelectModel } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function upsertRows<T extends PgTable>(
  table: T,
  rows: any[],
  updateSet: any
) {
  if (rows.length === 0) return;

  for (const row of rows) {
    const existing = await db.select().from(table).where(eq(table.id, row.id)).limit(1);

    if (existing.length) {
      await db.update(table).set(updateSet).where(eq(table.id, row.id));
    } else {
      await db.insert(table).values(row);
    }
  }
}
