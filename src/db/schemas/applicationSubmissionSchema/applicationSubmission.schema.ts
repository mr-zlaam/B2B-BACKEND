import { pgTable, serial, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { userSchema } from "../authSchema";

export const applicationSubmissionSchema = pgTable(
  "applicationSubmission",
  {
    id: serial("id").primaryKey().notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => userSchema.uid, { onDelete: "cascade" })
      .unique(),
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
  (table) => [index("applicationSubmission_createdAt_idx").on(table.createdAt)]
);
// ** types
export type TAPPLICATIONSUBMISSION = typeof applicationSubmissionSchema.$inferSelect;
