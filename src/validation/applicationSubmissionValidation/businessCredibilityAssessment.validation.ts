import { z } from "zod";

export const businessCredibilityAssessmentSchemaZ = z.object({
  applicationSubmissionId: z.number({ message: "applicationSubmissionId must be a number" }),
  qualityLevel: z.string({ message: "qualityLevel must be string" }).trim().max(100, "qualityLevel can only have 100 characters"),
  materialStandard: z.string({ message: "materialStandard must be string" }).trim().max(100, "materialStandard can only have 100 characters"),
  serviceLevel: z.string({ message: "serviceLevel must be string" }).trim().max(100, "serviceLevel can only have 100 characters"),
  standardsLevel: z.string({ message: "standardsLevel must be string" }).trim().max(100, "standardsLevel can only have 100 characters"),
  productAuthenticityCertifications: z
    .array(z.enum(["NONE", "ISO", "CE", "FDA"])) // Replace with actual enum values
    .default(["NONE"])
});
