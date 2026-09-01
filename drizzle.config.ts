import type { Config } from "drizzle-kit";

const config = {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/notes_db",
  },
} satisfies Config;

export default config;
