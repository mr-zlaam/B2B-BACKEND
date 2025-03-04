import { integer, pgTable, timestamp, text, index } from "drizzle-orm/pg-core";

export const rateLimiterFlexible = pgTable(
  "rate_limiter_flexible",
  {
    key: text("key").notNull().primaryKey(),
    points: integer("points").notNull(),
    expire: timestamp("expire", { mode: "date" }),
  },
  (table) => [index("key_idx").on(table.key)],
);
export type RateLimiterRecord = typeof rateLimiterFlexible.$inferSelect;
