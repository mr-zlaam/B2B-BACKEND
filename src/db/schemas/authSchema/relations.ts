import { relations } from "drizzle-orm";
import { onboardingSchema } from "../onboardingSchema/onboarding.schema";
import { userSchema } from "./user.schema";
// schema/users.ts
export const userRelations = relations(userSchema, ({ one }) => ({
  onboarding: one(onboardingSchema, {
    fields: [userSchema.uid], // User's PK
    references: [onboardingSchema.userId] // Onboarding's FK
  })
}));
