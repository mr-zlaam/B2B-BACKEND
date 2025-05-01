import { relations } from "drizzle-orm";
import { applicationSubmissionSchema } from "./applicationSubmission.schema";
import { userSchema } from "../authSchema";

export const applicationSubmissionRelation = relations(applicationSubmissionSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [applicationSubmissionSchema.userId],
    references: [userSchema.uid]
  })
}));
