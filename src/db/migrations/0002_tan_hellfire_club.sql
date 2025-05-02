CREATE TYPE "public"."productAuthenticityCertifications" AS ENUM('GIFT_CERTIFICATE', 'HANDLOOM_MARK', 'CRAFT_MARK', 'INDIA_HANDMADE', 'QUALITY_COUNCIL', 'EXPORT_COUNCIL', 'BLOCK_CHAIN', 'NONE');--> statement-breakpoint
CREATE TABLE "businessCredibilityAssessment" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicationSubmissionId" integer NOT NULL,
	"qualityLevel" varchar(100) NOT NULL,
	"materialStandard" varchar(100) NOT NULL,
	"serviceLevel" varchar(100) NOT NULL,
	"standardsLevel" varchar(100) NOT NULL,
	"productAuthenticityCertifications" "productAuthenticityCertifications"[] DEFAULT '{"NONE"}'
);
--> statement-breakpoint
ALTER TABLE "businessCredibilityAssessment" ADD CONSTRAINT "businessCredibilityAssessment_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE no action ON UPDATE no action;