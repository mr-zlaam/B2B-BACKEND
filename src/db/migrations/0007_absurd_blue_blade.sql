ALTER TABLE "bankingInformation" DROP CONSTRAINT "bankingInformation_applicationSubmissionId_applicationSubmission_id_fk";
--> statement-breakpoint
ALTER TABLE "businessCredibilityAssessment" DROP CONSTRAINT "businessCredibilityAssessment_applicationSubmissionId_applicationSubmission_id_fk";
--> statement-breakpoint
ALTER TABLE "bussinessContactInformationSchema" DROP CONSTRAINT "bussinessContactInformationSchema_applicationSubmissionId_applicationSubmission_id_fk";
--> statement-breakpoint
ALTER TABLE "bussinessInformation" DROP CONSTRAINT "bussinessInformation_applicationSubmissionId_applicationSubmission_id_fk";
--> statement-breakpoint
ALTER TABLE "bankingInformation" ADD CONSTRAINT "bankingInformation_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businessCredibilityAssessment" ADD CONSTRAINT "businessCredibilityAssessment_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bussinessContactInformationSchema" ADD CONSTRAINT "bussinessContactInformationSchema_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bussinessInformation" ADD CONSTRAINT "bussinessInformation_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE cascade ON UPDATE no action;