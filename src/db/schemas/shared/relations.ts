import { relations } from "drizzle-orm";
import { userSchema } from "../authSchema";
import { onboardingSchema } from "../onboardingSchema";
import { selectPartnershipSchema } from "../selectPartnershipSchema";
import { applicationSubmissionSchema } from "../applicationSubmissionSchema";
import { bussinessInformationSchema } from "../applicationSubmissionSchema/bussinessInformationSchema";
import { bussinessContactInformationSchema } from "../applicationSubmissionSchema/bussinessContactInformationSchema";
import { businessCredibilityAssessmentSchema } from "../applicationSubmissionSchema/businessCredibilityAssessmentSchema";
import { bankingInformationSchema } from "../applicationSubmissionSchema/bankingInformationSchema";
import { documentSubmissionSchema } from "../documentSubmissionSchema";

export const userRelations = relations(userSchema, ({ one, many }) => ({
  onboarding: one(onboardingSchema, {
    fields: [userSchema.uid], // User's PK
    references: [onboardingSchema.userId] // Onboarding's FK
  }),
  selectPartnership: many(selectPartnershipSchema),
  applicationSubmission: one(applicationSubmissionSchema, {
    fields: [userSchema.uid],
    references: [applicationSubmissionSchema.userId]
  }),
  documentSubmission: one(documentSubmissionSchema, {
    fields: [userSchema.uid],
    references: [documentSubmissionSchema.userId]
  })
}));
// application submission relations
export const applicationSubmissionRelation = relations(applicationSubmissionSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [applicationSubmissionSchema.userId],
    references: [userSchema.uid]
  }),
  bussinessInformation: one(bussinessInformationSchema, {
    fields: [applicationSubmissionSchema.id],
    references: [bussinessInformationSchema.id]
  }),
  bussinessContactInformation: one(bussinessContactInformationSchema, {
    fields: [applicationSubmissionSchema.id],
    references: [bussinessContactInformationSchema.id]
  }),
  businessCredibilityAssessment: one(businessCredibilityAssessmentSchema, {
    fields: [applicationSubmissionSchema.id],
    references: [businessCredibilityAssessmentSchema.id]
  }),
  bankingInformation: one(bankingInformationSchema, {
    fields: [applicationSubmissionSchema.id],
    references: [bankingInformationSchema.id]
  })
}));
