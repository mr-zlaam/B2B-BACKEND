import { userRelations, userSchema } from "./authSchema";
import { onboardingRelations, onboardingSchema } from "./onboardingSchema";
import { selectPartnershipRelations, selectPartnershipSchema } from "./selectPartnership";

export const schema = {
  users: userSchema,
  onboarding: onboardingSchema,
  userRelations,
  onboardingRelations,
  selectPartnership: selectPartnershipSchema,
  selectPartnershipRelations
};
export type TSCHEMA = typeof schema;
