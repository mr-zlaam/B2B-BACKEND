import { userSchema } from "./authSchema";
import { onboardingSchema } from "./onboardingSchema";

export const schema = {
  users: userSchema,
  onboarding: onboardingSchema
};
export type TSCHEMA = typeof schema;
