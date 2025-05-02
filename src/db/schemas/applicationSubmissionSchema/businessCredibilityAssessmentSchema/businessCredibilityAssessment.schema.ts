import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { productAuthenticityCertificationsEnum } from "../../shared/enums";
import { applicationSubmissionSchema } from "..";

export const businessCredibilityAssessmentSchema = pgTable("businessCredibilityAssessment", {
  id: serial("id").primaryKey().notNull(),
  applicationSubmissionId: integer("applicationSubmissionId")
    .notNull()
    .references(() => applicationSubmissionSchema.id),
  qualityLevel: varchar("qualityLevel", { length: 100 }).notNull(),
  materialStandard: varchar("materialStandard", { length: 100 }).notNull(),
  serviceLevel: varchar("serviceLevel", { length: 100 }).notNull(),
  standardsLevel: varchar("standardsLevel", { length: 100 }).notNull(),
  productAuthenticityCertifications: productAuthenticityCertificationsEnum().array().default(["NONE"])
});
export type TBUSSINESSCREDIBILITYASSESSMENT = typeof businessCredibilityAssessmentSchema.$inferSelect;
