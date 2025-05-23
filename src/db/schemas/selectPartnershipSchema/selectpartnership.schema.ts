import { pgTable, serial, uuid, varchar, boolean, timestamp, integer, index } from "drizzle-orm/pg-core";
import { userSchema } from "../authSchema/index";

export const selectPartnershipSchema = pgTable(
  "selectPartnership",
  {
    id: serial("id").primaryKey().notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => userSchema.uid, { onDelete: "cascade" }),
    // Important: we allow either vendor or buyer levels
    partnershipName: varchar("partnershipName", { length: 100 }).notNull(),
    applicationId: uuid("applicationId").defaultRandom().unique(),
    partnershipLevelIndex: integer("partnershipLevelIndex").notNull().default(1),
    unlockedByPayment: boolean("unlockedByPayment").notNull().default(false),
    unlockedAt: timestamp("unlockedAt", {
      mode: "date",
      precision: 3
    })
      .notNull()
      .defaultNow(),
    completed: boolean("completed").notNull().default(false),
    retentionPeriodAchievedByUser: integer("retentionPeriodAchievedByUser").notNull().default(0),
    requiredRetentionPeriod: integer("requiredRetentionPeriod").notNull().default(0),
    kpiPointsAchievedByUser: integer("kpiPointsAchievedByUser").notNull().default(0),
    requiredKpiPoints: integer("requiredKpiPoints").notNull().default(0),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      precision: 3
    })
      .notNull()
      .defaultNow()
  },
  (table) => [
    index("user_nested_levels_userId_idx").on(table.userId),
    index("user_nested_levels_partnershipLevel_idx").on(table.partnershipLevelIndex),
    index("user_nested_levels_createdAt_idx").on(table.createdAt)
  ]
);

// ** Types
export type TSELECTPARTERSHIP = typeof selectPartnershipSchema.$inferSelect;
