import { z } from "zod";

// Enum values for bussinessLegalStructure and bussinessType can be explicitly defined
const bussinessLegalStructureEnum = [
  "SOLE_PROPRIETORSHIP",
  "PARTNERSHIP",
  "LIMITED_LIABILITY_PARTNERSHIP",
  "PRIVATE_LIMITED",
  "PUBLIC_LIMITED",
  "COOPERATIVE_SOCIETY"
] as const;

const bussinessTypeEnum = ["ONLINE", "STORE_FRONT", "MANUFACTURER", "WHOLE_SALER", "DISTRIBUTOR", "ARTISAN"] as const;

export const businessInformationSchemaZ = z.object({
  bussinessName: z
    .string({ message: "bussinessName must be a string" })
    .trim()
    .min(2, "bussinessName must be at least 2 characters")
    .max(100, "bussinessName must not exceed 100 characters"),

  bussinessLegalStructure: z.enum(bussinessLegalStructureEnum, {
    errorMap: () => ({ message: "bussinessLegalStructure must be one of the predefined legal structures" })
  }),

  bussinessType: z.enum(bussinessTypeEnum, {
    errorMap: () => ({ message: "bussinessType must be one of the predefined business types" })
  }),

  bussinessRegistrationNumber: z
    .number({ message: "bussinessRegistrationNumber must be a number" })
    .min(1, "bussinessRegistrationNumber must be at least 1 digit"),

  brandAffiliations: z
    .string({ message: "brandAffiliations must be a string" })
    .max(150, "brandAffiliations must not exceed 150 characters")
    .optional(),

  streetLine1: z
    .string({ message: "streetLine1 must be a string" })
    .trim()
    .min(5, "streetLine1 must be at least 5 characters")
    .max(500, "streetLine1 must not exceed 500 characters"),

  streetLine2: z
    .string({ message: "streetLine2 must be a string" })
    .trim()
    .min(5, "streetLine2 must be at least 5 characters")
    .max(500, "streetLine2 must not exceed 500 characters"),

  city: z
    .string({ message: "city must be a string" })
    .trim()
    .min(2, "city must be at least 2 characters")
    .max(100, "city must not exceed 100 characters"),

  stateORRegion: z
    .string({ message: "stateORRegion must be a string" })
    .trim()
    .min(2, "stateORRegion must be at least 2 characters")
    .max(100, "stateORRegion must not exceed 100 characters"),

  country: z
    .string({ message: "country must be a string" })
    .trim()
    .min(2, "country must be at least 2 characters")
    .max(100, "country must not exceed 100 characters"),

  postalCode: z
    .string({ message: "postalCode must be a string" })
    .trim()
    .min(5, "postalCode must be at least 5 characters")
    .max(20, "postalCode must not exceed 20 characters"),

  websiteURI: z
    .string({ message: "websiteURI must be a string" })
    .url("websiteURI must be a valid URL")
    .max(200, "websiteURI must not exceed 200 characters")
    .optional(),

  annualTurnover: z.string({ message: "annualTurnover must be a string" }).max(200, "annualTurnover must not exceed 200 characters"),

  gstNumber: z
    .string({ message: "gstNumber must be a string" })
    .trim()
    .min(15, "gstNumber must be exactly 15 characters")
    .max(15, "gstNumber must be exactly 15 characters"),

  taxIdentificationNumber: z
    .string({ message: "taxIdentificationNumber must be a string" })
    .trim()
    .min(8, "taxIdentificationNumber must be exactly 10 characters")
    .max(25, "taxIdentificationNumber must be exactly 10 characters")
});
