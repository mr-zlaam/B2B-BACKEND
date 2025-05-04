ALTER TABLE "documentSubmission" ALTER COLUMN "createdAt" SET DATA TYPE timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "documentSubmission" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_bussinessRegisterationDocument_unique" UNIQUE("bussinessRegisterationDocument");--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_businessLicenseDocument_unique" UNIQUE("businessLicenseDocument");--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_ContactPersonAdhaarCardDocment_unique" UNIQUE("ContactPersonAdhaarCardDocment");--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_artisanIdCardDocument_unique" UNIQUE("artisanIdCardDocument");--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_bankStatementDocument_unique" UNIQUE("bankStatementDocument");--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_productCatalogueDocument_unique" UNIQUE("productCatalogueDocument");--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_certificationsDocument_unique" UNIQUE("certificationsDocument");