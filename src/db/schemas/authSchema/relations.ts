import { relations } from "drizzle-orm";
import { onboardingSchema } from "../onboardingSchema";
import { userSchema } from "./user.schema";
import { selectPartnershipSchema } from "../selectPartnership";
// schema/users.ts
export const userRelations = relations(userSchema, ({ one, many }) => ({
  onboarding: one(onboardingSchema, {
    fields: [userSchema.uid], // User's PK
    references: [onboardingSchema.userId] // Onboarding's FK
  }),
  selectPartnership: many(selectPartnershipSchema)
}));
