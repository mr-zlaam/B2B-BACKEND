import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import envConfig from "../config/env.config.js";
import logger from "../util/globalUtil/logger.util.js";

export type DatabaseClient = NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};

export class Database {
  private pool: Pool;
  private _db: DatabaseClient | null = null;

  constructor() {
    this.pool = new Pool({
      connectionString: envConfig.DATABASE_URI,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: envConfig.NODE_ENV === "production" ? { rejectUnauthorized: envConfig.NODE_ENV === "production" } : false
    });
    this._db = drizzle(this.pool, { logger: false });
  }

  public get db(): DatabaseClient {
    if (!this._db) {
      throw new Error("Database not initialized. Call connect() first.");
    }
    return this._db;
  }

  public async connect() {
    try {
      await this.pool.connect();
    } catch (err) {
      logger.error("❌ Database connection error:", err);
      throw err;
    }
  }

  public async runMigrations() {
    await migrate(this.db, { migrationsFolder: "./src/db/migrations" });
  }

  public async close() {
    await this.pool.end();
    logger.info("🔌 Database connection closed");
  }

  public async executeWithRetry<T>(operation: () => Promise<T>, retries = 3): Promise<T> {
    try {
      await this.close();
      return await operation();
    } catch (error) {
      if (retries <= 0) throw error;
      logger.warn(`Database operation failed, retrying (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return this.executeWithRetry(operation, retries - 1);
    }
  }
}

export const database = new Database();
