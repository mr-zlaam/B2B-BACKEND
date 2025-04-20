import { pgEnum, pgTable, serial, boolean, timestamp, text, index, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userSchema } from "./user.schema";
export const currentStageEnum = pgEnum("currentStage", [
  "PORTAL_LOGIN",
  "SELECT_PARTNERSHIP",
  "APPLICATION_SUBMISSION",
  "PRODUCT_PORTFOLIO",
  "DOCUMENT_SUBMISSION",
  "VENDOR_AGREEMENT",
  "APPLICATION_STATUS",
  "PARTNERSHIP_ACTIVATION"
]);

export const onboardingSchema = pgTable(
  "onboarding",
  {
    id: serial("id").primaryKey().notNull(),
    currentStage: currentStageEnum().notNull().default("PORTAL_LOGIN"),
    currentStageIndex: serial("currentStageIndex").notNull(),
    isCompleted: boolean("isCompleted").notNull().default(false),
    completedAt: timestamp("completedAt"),
    metaData: text("metaData").default("{}"),
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
    index("current_stage_idx").on(table.currentStageIndex),
    index("isCompleted_idx").on(table.isCompleted)
  ]
);
// ** types

export type TONBOARDING = typeof onboardingSchema.$inferSelect;
export type TCURRENTSTAGE = typeof currentStageEnum.schema;
// Relations
export const onboardingRelations = relations(onboardingSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [onboardingSchema.userId],
    references: [userSchema.uid]
  })
}));
