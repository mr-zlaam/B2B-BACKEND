import { defineConfig } from "drizzle-kit";
import envConfig from "./src/config/env.config.js";
export default defineConfig({
  out: "./src/databases/migrations",
  schema: "./src/databases/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: envConfig.DATABASE_URI,
  },
});
// toodo install multer
