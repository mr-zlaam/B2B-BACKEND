import { z } from "zod";

export const businessContactInformationSchemaZ = z.object({
  applicationSubmissionId: z.number({ message: "applicationSubmissionId must be a number" }),
  name: z
    .string({ message: "name must be string" })
    .trim()
    .min(2, "name must be at least 2 characters")
    .max(100, "name can only have 100 characters"),
  email: z.string({ message: "email must be string" }).trim().email("email is not valid").max(100, "email can only have 100 characters"),
  bussinessRegistrationNumber: z.number({ message: "bussinessRegistrationNumber must be a number" }),
  phoneNumber: z
    .string({ message: "phoneNumber must be string" })
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  whatsappNumber: z
    .string({ message: "whatsappNumber must be string" })
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid whatsapp number")
    .optional(),
  bussinessAddress: z.string({ message: "bussinessAddress must be string" }).trim().max(500, "bussinessAddress can only have 500 characters"),
  district: z.string({ message: "district must be string" }).trim().max(50, "district can only have 50 characters"),
  state: z.string({ message: "state must be string" }).trim().max(50, "state can only have 50 characters"),
  country: z.string({ message: "country must be string" }).trim().max(50, "country can only have 50 characters")
});
