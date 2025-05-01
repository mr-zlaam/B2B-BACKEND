import { relations } from "drizzle-orm";
import { userSchema } from "../authSchema";
import { onboardingSchema } from "../onboardingSchema";
import { selectPartnershipSchema } from "../selectPartnershipSchema";
import { applicationSubmissionSchema } from "../applicationSubmissionSchema";
import { bussinessInformationSchema } from "../applicationSubmissionSchema/bussinessInformationSchema";
import { bussinessContactInformationSchema } from "../applicationSubmissionSchema/bussinessContactInformationSchema";

export const userRelations = relations(userSchema, ({ one, many }) => ({
  onboarding: one(onboardingSchema, {
    fields: [userSchema.uid], // User's PK
    references: [onboardingSchema.userId] // Onboarding's FK
  }),
  selectPartnership: many(selectPartnershipSchema),
  applicationSubmission: one(applicationSubmissionSchema, {
    fields: [userSchema.uid],
    references: [applicationSubmissionSchema.userId]
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
  })
}));
