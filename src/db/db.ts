import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { app } from "../app.js";
import envConfig from "../config/env.config.js";
import logger from "../util/appUtil/logger.util.js";

const pool = new Pool({
  connectionString: envConfig.DATABASE_URI,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: envConfig.NODE_ENV === "production" ? { rejectUnauthorized: true } : false
});

export const db = drizzle(pool, { logger: true });
export async function connectDB() {
  void (await pool
    .connect()
    .then(() => {
      app.listen(envConfig.PORT, () => {
        logger.info(`Connected to the database successfully ✅ \n  SERVER:: Server is running on port http://localhost:${envConfig.PORT} 🚀`);
      });
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        logger.error(`Database connection error: ${String(err)}`);
        throw err;
      } else logger.error("Error connecting to DB", { err });
      return process.exit(1);
    }));
}
export async function runMigrations() {
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
}
export const closeDbConnection = async (): Promise<void> => {
  await pool.end();
  logger.info("Database connection closed.");
};
export const executeWithRetry = async <T>(operation: () => Promise<T>, retries = 3): Promise<T> => {
  try {
    await closeDbConnection();
    return await operation();
  } catch (error) {
    if (retries <= 0) throw error;
    logger.warn(`Database operation failed, retrying (${retries} attempts left)`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return executeWithRetry(operation, retries - 1);
  }
};
