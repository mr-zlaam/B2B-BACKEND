import { relations } from "drizzle-orm";
import { onboardingSchema, userSchema } from "..";
export const onboardingRelations = relations(onboardingSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [onboardingSchema.userId],
    references: [userSchema.uid]
  })
}));
