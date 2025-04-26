import { relations } from "drizzle-orm";
import { userSchema } from "../authSchema";
import { onboardingSchema } from "./onboarding.schema";

export const onboardingRelations = relations(onboardingSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [onboardingSchema.userId],
    references: [userSchema.uid]
  })
}));
