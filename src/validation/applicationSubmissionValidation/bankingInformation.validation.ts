import { z } from "zod";

export const bankingInformationSchemaZ = z.object({
  bankName: z
    .string({ message: "Bank name is required" })
    .trim()
    .min(1, "Bank name is required")
    .max(100, "Bank name must be at most 100 characters"),

  accountType: z
    .string({ message: "Account type is required" })
    .trim()
    .min(1, "Account type is required")
    .max(100, "Account type must be at most 100 characters"),

  accountNumber: z
    .string({ message: "Account number is required" })
    .trim()
    .min(8, "Account number must be at least 8 characters")
    .max(20, "Account number must be at most 20 characters"),

  ifscCode: z
    .string({ message: "IFSC code is required" })
    .trim()
    .length(11, "IFSC code must be exactly 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code format"),

  swiftORBISCode: z
    .string({ message: "SWIFT/OR BIS code is required" })
    .trim()
    .min(8, "SWIFT/OR BIS code must be at least 8 characters")
    .max(11, "SWIFT/OR BIS code must be at most 11 characters"),

  ibanCode: z
    .string({ message: "IBAN code is required" })
    .trim()
    .min(15, "IBAN code must be at least 15 characters")
    .max(34, "IBAN code must be at most 34 characters"),

  bankingComplaints: z
    .record(z.boolean(), {
      message: "Banking complaints must be a record of boolean flags"
    })
    .default({})
});
