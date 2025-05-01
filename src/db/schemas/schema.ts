import { applicationSubmissionSchema } from "./applicationSubmissionSchema";
import { userSchema } from "./authSchema";
import { onboardingSchema } from "./onboardingSchema";
import { selectPartnershipSchema } from "./selectPartnershipSchema";
import { applicationSubmissionRelation, userRelations } from "./shared/relations";

export const schema = {
  users: userSchema,
  onboarding: onboardingSchema,
  userRelations,
  selectPartnership: selectPartnershipSchema,
  applicationSubmission: applicationSubmissionSchema,
  applicationSubmissionRelation
};
export type TSCHEMA = typeof schema;
