import { z } from "zod";
import { phoneSchema } from "../userValidation/auth.validation";
import { validateAndFormatPhone } from "../../util/appUtil/authUtil/phonevalidator.util";

export const businessContactInformationSchemaZ = z.object({
  name: z
    .string({ message: "name must be a string" })
    .trim()
    .min(3, "name must be at least 3 characters")
    .max(100, "name must not exceed 100 characters")
    .regex(/^[A-Za-z\s]+$/, "name can only contain letters and spaces"),

  email: z
    .string({ message: "email must be a string" })
    .trim()
    .toLowerCase()
    .min(5, "email must be at least 5 characters")
    .max(100, "email must not exceed 100 characters")
    .regex(/^(?=.{1,64}@)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "email is not valid"),

  bussinessRegistrationNumber: z.number({ message: "bussinessRegistrationNumber must be a number" }),

  phoneNumber: phoneSchema
    .transform((val) => {
      const result = validateAndFormatPhone(val);
      return result?.isValid ? result.formattedNumber : val;
    })
    .optional(),

  whatsappNumber: phoneSchema
    .transform((val) => {
      const result = validateAndFormatPhone(val);
      return result?.isValid ? result.formattedNumber : val;
    })
    .optional(),

  bussinessAddress: z
    .string({ message: "bussinessAddress must be a string" })
    .trim()
    .min(10, "bussinessAddress must be at least 10 characters")
    .max(500, "bussinessAddress must not exceed 500 characters"),

  district: z
    .string({ message: "district must be a string" })
    .trim()
    .min(2, "district must be at least 2 characters")
    .max(50, "district must not exceed 50 characters"),

  state: z
    .string({ message: "state must be a string" })
    .trim()
    .min(2, "state must be at least 2 characters")
    .max(50, "state must not exceed 50 characters")
    .optional(),

  country: z
    .string({ message: "country must be a string" })
    .trim()
    .min(2, "country must be at least 2 characters")
    .max(50, "country must not exceed 50 characters")
    .optional()
});
