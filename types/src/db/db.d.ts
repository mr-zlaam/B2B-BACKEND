import { Pool } from "pg";
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<
  Record<string, never>
> & {
  $client: Pool;
};
export declare function connectDB(): Promise<void>;
export declare function migrateDb(): Promise<void>;
export declare const closeDbConnection: () => Promise<void>;
export declare const executeWithRetry: <T>(
  operation: () => Promise<T>,
  retries?: number,
) => Promise<T>;
