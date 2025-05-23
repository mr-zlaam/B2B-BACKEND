import { pgTable, serial, timestamp, index, uuid, integer } from "drizzle-orm/pg-core";
import { userSchema } from "..";
import { onboardingCurrentStageEnum } from "../shared/enums";

export const onboardingSchema = pgTable(
  "onboarding",
  {
    id: serial("id").primaryKey().notNull(),
    currentOnboardingStage: onboardingCurrentStageEnum().notNull().default("SELECT_PARTNERSHIP"),
    currentOnboardingStageIndex: integer("currentOnboardingStageIndex").default(1).notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3
    })
      .notNull()
      .defaultNow(),
    onboardingStatusPercentage: integer("onboardingStatusPercentage").notNull().default(0),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      precision: 3
    })
      .notNull()
      .defaultNow(),
    // ** Relations
    userId: uuid("userId")
      .notNull()
      .references(() => userSchema.uid, { onDelete: "cascade" })
      .unique()
  },
  (table) => [
    index("onbarding_user_id_fk").on(table.userId),
    index("onboarding_createdAt_idx").on(table.createdAt),
    index("onboarding_id_idx").on(table.id),
    index("current_stage_idx").on(table.currentOnboardingStageIndex)
  ]
);
// ** types

export type TONBOARDING = typeof onboardingSchema.$inferSelect;
export type TCURRENTSTAGE = typeof onboardingCurrentStageEnum.schema;
// Relations
