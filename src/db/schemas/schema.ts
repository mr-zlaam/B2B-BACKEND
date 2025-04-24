import { userRelations, userSchema } from "./authSchema";
import { onboardingRelations, onboardingSchema } from "./onboardingSchema";

export const schema = {
  users: userSchema,
  onboarding: onboardingSchema,
  userRelations,
  onboardingRelations
};
export type TSCHEMA = typeof schema;
