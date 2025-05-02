import { z } from "zod";

export const businessInformationSchemaZ = z.object({
  applicationSubmissionId: z.number({ message: "applicationSubmissionId must be a number" }),
  bussinessName: z.string({ message: "bussinessName must be string" }).trim().max(100, "bussinessName can only have 100 characters"),
  bussinessLegalStructure: z.enum(["SOLE_PROPRIETORSHIP", "PARTNERSHIP", "LLC", "CORPORATION"]), // Replace with actual values
  bussinessType: z.enum(["MANUFACTURER", "RETAILER", "WHOLESALER", "SERVICE"]), // Replace with actual values
  bussinessRegistrationNumber: z.number({ message: "bussinessRegistrationNumber must be a number" }),
  brandAffiliations: z
    .string({ message: "brandAffiliations must be string" })
    .trim()
    .max(150, "brandAffiliations can only have 150 characters")
    .optional(),
  streetLine1: z.string({ message: "streetLine1 must be string" }).trim().max(500, "streetLine1 can only have 500 characters"),
  streetLine2: z.string({ message: "streetLine2 must be string" }).trim().max(500, "streetLine2 can only have 500 characters"),
  city: z.string({ message: "city must be string" }).trim().max(100, "city can only have 100 characters"),
  stateORRegion: z.string({ message: "stateORRegion must be string" }).trim().max(100, "stateORRegion can only have 100 characters"),
  country: z.string({ message: "country must be string" }).trim().max(100, "country can only have 100 characters"),
  postalCode: z.string({ message: "postalCode must be string" }).trim().max(20, "postalCode can only have 20 characters"),
  websiteURI: z.string({ message: "websiteURI must be string" }).trim().url("websiteURI must be a valid URL").optional(),
  annualTurnover: z.string({ message: "annualTurnover must be string" }).trim().max(200, "annualTurnover can only have 200 characters"),
  gstNumber: z
    .string({ message: "gstNumber must be string" })
    .trim()
    .regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, "Invalid GST number"),
  taxIdentificationNumber: z
    .string({ message: "taxIdentificationNumber must be string" })
    .trim()
    .length(10, "taxIdentificationNumber must be 10 characters")
});
