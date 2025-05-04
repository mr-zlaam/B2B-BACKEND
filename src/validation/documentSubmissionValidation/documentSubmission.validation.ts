import { z } from "zod";
const fileZodSchema = z.object({
  originalname: z.string({ message: "File  is required." }),
  mimetype: z.string({ message: "File type is required." }).refine((type) => type === "application/pdf", {
    message: "Only PDF files are allowed."
  }),
  buffer: z.instanceof(Buffer),
  size: z.number().max(20 * 1024 * 1024, { message: "Max file size is 10MB." })
});

// Full validation schema for all files:
export const documentSubmissionSchemaZ = z.object({
  bussinessRegisterationDocument: fileZodSchema,
  businessLicenseDocument: fileZodSchema,
  ContactPersonAdhaarCardDocment: fileZodSchema,
  artisanIdCardDocument: fileZodSchema.optional(),
  bankStatementDocument: fileZodSchema,
  productCatalogueDocument: fileZodSchema,
  certificationsDocument: fileZodSchema
});
