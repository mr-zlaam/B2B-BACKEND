import { z } from "zod";
import { phoneSchema } from "./auth.validation.js";
import { validateAndFormatPhone } from "../../util/appUtil/authUtil/phonevalidator.util.js";
// ** @description: This file contains the validation schema for updating user information username,fullName, phone,companyURI(optional), companyName(optional).
export const updateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "username required atleast 3 characters")
    .max(30, "username must not contain more than 30 characters")
    .regex(/^[a-z0-9_]+$/, "username can only contain lowercase, underscores and numbers"),
  fullName: z
    .string()
    .trim()
    .min(3, "fullName required atleast 3 characters")
    .max(50, "fullName can only have 50 characters")
    .regex(/^[A-Za-z\s]+$/, "fullName can only have spaces and alphabets"),

  phone: phoneSchema.transform((val) => {
    const result = validateAndFormatPhone(val);
    return result?.isValid ? result.formattedNumber : val;
  }),
  companyName: z.string().max(50, "companyName can only have 50 characters").optional(),
  companyURI: z.string().max(1000, "companyURI can only have 1000 characters").url("companyURI must be a valid URL").optional()
});

// ** @description: This file contains the validation schema for updating user information about email.
export const updateUserEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, "email required atleast 3 characters")
    .max(100, "emails can only have 100 characters")
    .regex(/^(?=.{1,64}@)[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/, { message: "email is not valid" })
});
// ** @description: This file contains the validation schema for updating user information about password.

export const updateUserPasswordSchema = z.object({
  oldPassword: z.string().min(8, "password must be atleast 8 characters").max(100, "password can only have 100 characters"),
  newPassword: z.string().min(8, "password must be atleast 8 characters").max(100, "password can only have 100 characters")
});
