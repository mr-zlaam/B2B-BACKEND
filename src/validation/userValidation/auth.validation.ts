import { z } from "zod";
import { validateAndFormatPhone } from "../../util/appUtil/authUtil/phonevalidator.util.js";

const phoneSchema = z.string().refine(
  (value) => {
    const result = validateAndFormatPhone(value);
    return result?.isValid;
  },
  {
    message: "Invalid phone number"
  }
);

export const authValidationSchema = z.object({
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
  email: z
    .string()
    .trim()
    .min(3, "email required atleast 3 characters")
    .max(100, "emails can only have 100 characters")
    .regex(/^(?=.{1,64}@)[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/, { message: "email is not valid" }),
  phone: phoneSchema.transform((val) => {
    const result = validateAndFormatPhone(val);
    return result?.isValid ? result.formattedNumber : val;
  }),
  password: z.string().min(8, "password must be atleast 8 characters").max(100, "password can only have 100 characters"),
  role: z.enum(["ADMIN", "MODERATOR", "VENDOR", "BUYER"], { message: "Role is required" }),
  country: z.string().min(2, "country must be atleast 2 characters").max(50, "country can only have 50 characters"),
  isVerified: z.boolean().default(false),
  companyName: z.string().max(50, "companyName can only have 50 characters").optional(),
  companyURI: z.string().max(1000, "companyURI can only have 1000 characters").url("companyURI must be a valid URL").optional()
});
