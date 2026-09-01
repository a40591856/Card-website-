import { db } from "@/db";
import { sections, files, notes, appConfig } from "@/db/schema";
import { eq } from "drizzle-orm";

let seeded = false;

export async function maybeSeed() {
  if (seeded) return;
  seeded = true;

  try {
    // التحقق من وجود بيانات أساسية
    const config = await db.select().from(appConfig).where(eq(appConfig.id, "main")).limit(1);

    if (config.length === 0) {
      await db.insert(appConfig).values({
        id: "main",
        vaultPassword: "1234",
        theme: "light",
        language: "ar",
      });

      // إنشاء بيانات عينة
      const [section1] = await db
        .insert(sections)
        .values({ name: "الملاحظات الشخصية" })
        .returning();

      if (section1) {
        const [file1] = await db
          .insert(files)
          .values({ sectionId: section1.id, name: "الأهداف" })
          .returning();

        if (file1) {
          await db.insert(notes).values({
            fileId: file1.id,
            title: "مرحباً بك في تطبيق الملاحظات",
            content: "هذا تطبيق ملاحظات احترافي مع دعم اللغة العربية والنسخ الاحتياطي والخزنة الآمنة",
            type: "note",
          });
        }
      }
    }
  } catch (error) {
    console.error("Seeding error:", error);
  }
}
