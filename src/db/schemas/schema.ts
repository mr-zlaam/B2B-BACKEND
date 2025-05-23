import { applicationSubmissionSchema } from "./applicationSubmissionSchema";
import { userSchema } from "./authSchema";
import { documentSubmissionSchema } from "./documentSubmissionSchema";
import { onboardingSchema } from "./onboardingSchema";
import { selectPartnershipSchema } from "./selectPartnershipSchema";
import { applicationSubmissionRelation, userRelations } from "./shared/relations";
import { vendorOrBuyerAgreementSchema } from "./vendorOrBuyerAgreementSchema/vendorOrBuyerAgreement.schema";

export const schema = {
  users: userSchema,
  onboarding: onboardingSchema,
  userRelations,
  selectPartnership: selectPartnershipSchema,
  applicationSubmission: applicationSubmissionSchema,
  applicationSubmissionRelation,
  documentSubmissionSchema,
  vendorOrBuyerAgreementSchema
};
export type TSCHEMA = typeof schema;
