import { z } from "zod";

export const bankingInformationSchemaZ = z.object({
  applicationSubmissionId: z.number({ message: "applicationSubmissionId must be a number" }),
  bankName: z
    .string({ message: "bankName must be string" })
    .trim()
    .min(2, "bankName must be at least 2 characters")
    .max(100, "bankName can only have 100 characters"),
  accountType: z
    .string({ message: "accountType must be string" })
    .trim()
    .min(2, "accountType must be at least 2 characters")
    .max(100, "accountType can only have 100 characters"),
  accountNumber: z
    .string({ message: "accountNumber must be string" })
    .trim()
    .min(6, "accountNumber must be at least 6 digits")
    .max(20, "accountNumber can only have 20 characters")
    .regex(/^\d+$/, "accountNumber must be numeric"),
  ifscCode: z
    .string({ message: "ifscCode must be string" })
    .trim()
    .length(11, "ifscCode must be exactly 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code format"),
  swiftORBISCode: z.string({ message: "swiftORBISCode must be string" }).trim().length(11, "swiftORBISCode must be 11 characters"),
  ibanCode: z
    .string({ message: "ibanCode must be string" })
    .trim()
    .min(15, "ibanCode must be at least 15 characters")
    .max(34, "ibanCode can only have 34 characters")
    .regex(/^[A-Z0-9]+$/, "ibanCode must be alphanumeric"),
  bankingComplaints: z.record(z.boolean()).default({})
});
