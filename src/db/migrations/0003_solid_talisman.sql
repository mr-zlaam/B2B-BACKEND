CREATE TABLE "bankingInformation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"applicationSubmissionId" integer NOT NULL,
	"bankName" varchar(100) NOT NULL,
	"accountType" varchar(100) NOT NULL,
	"accountNumber" varchar(20) NOT NULL,
	"ifscCode" varchar(11) NOT NULL,
	"swiftCode" varchar(11) NOT NULL,
	"ibanCode" varchar(34) NOT NULL,
	"bankingComplaints" jsonb DEFAULT '{}'::jsonb NOT NULL,
	CONSTRAINT "bankingInformation_accountNumber_unique" UNIQUE("accountNumber"),
	CONSTRAINT "bankingInformation_ibanCode_unique" UNIQUE("ibanCode")
);
--> statement-breakpoint
ALTER TABLE "bankingInformation" ADD CONSTRAINT "bankingInformation_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE no action ON UPDATE no action;