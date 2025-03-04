import { defineConfig } from "drizzle-kit";
import process from "node:process";
export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URI as string,
  },
});
// toodo install multer
