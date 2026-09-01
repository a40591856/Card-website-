import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "crypto";

// الأقسام (Sections)
export const sections = pgTable("sections", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// الملفات (Files)
export const files = pgTable("files", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  sectionId: text("section_id").references(() => sections.id),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// الملاحظات (Notes)
export const notes = pgTable("notes", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  fileId: text("file_id").references(() => files.id),
  title: text("title").notNull().default(""),
  content: text("content").notNull().default(""),
  type: text("type").notNull().default("note"), // note, checklist, drawing, voice
  tag: text("tag").default(""), // important, urgent, done, idea
  pinned: boolean("pinned").default(false),
  archived: boolean("archived").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// مدير كلمات المرور (Passwords Vault)
export const passwords = pgTable("passwords", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  groupName: text("group_name").default(""),
  siteName: text("site_name").notNull(),
  url: text("url").default(""),
  username: text("username").notNull(),
  password: text("password").notNull(),
  note: text("note").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// مدير المواقع (Sites Manager)
export const sites = pgTable("sites", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  groupName: text("group_name").default(""),
  name: text("name").notNull(),
  url: text("url").notNull(),
  note: text("note").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// إعدادات التطبيق (App Config)
export const appConfig = pgTable("app_config", {
  id: text("id").primaryKey(),
  vaultPassword: text("vault_password").default("1234"),
  lockType: text("lock_type").default(""), // pin, pattern, password, biometric
  lockValue: text("lock_value").default(""),
  theme: text("theme").default("light"), // light, dark, auto
  language: text("language").default("ar"), // ar, en
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
