import { z } from "zod";
import { productAuthenticityCertificationsEnum } from "../../db/schemas/shared/enums";

export const businessCredibilityAssessmentSchemaZ = z.object({
  qualityLevel: z
    .string({ message: "Quality level must be a string" })
    .trim()
    .min(1, "Quality level is required")
    .max(100, "Quality level must be at most 100 characters"),

  materialStandard: z
    .string({ message: "Material standard must be a string" })
    .trim()
    .min(1, "Material standard is required")
    .max(100, "Material standard must be at most 100 characters"),

  serviceLevel: z
    .string({ message: "Service level must be a string" })
    .trim()
    .min(1, "Service level is required")
    .max(100, "Service level must be at most 100 characters"),

  standardsLevel: z
    .string({ message: "Standards level must be a string" })
    .trim()
    .min(1, "Standards level is required")
    .max(100, "Standards level must be at most 100 characters"),

  productAuthenticityCertifications: z
    .array(
      z.enum(productAuthenticityCertificationsEnum.enumValues, {
        errorMap: () => ({ message: "Each certification must be a valid enum string" })
      }),
      { message: "Certifications must be an array of strings" }
    )
    .default(["NONE"])
});
