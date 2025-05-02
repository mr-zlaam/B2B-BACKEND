import { z } from "zod";

export const loginIntoApplicationSchemaZ = z.object({
  applicationId: z.string({ message: "applicationId must be string" }).min(1, "applicationId is required"),
  email: z.string({ message: "email must be string" }).min(1, "email is required").email().toLowerCase(),
  password: z.string({ message: "password must be string" }).min(1, "password is required")
});
