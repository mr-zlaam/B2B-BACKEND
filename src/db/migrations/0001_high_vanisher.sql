CREATE TABLE "bussinessContactInformationSchema" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicationSubmissionId" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"bussinessRegistrationNumber" integer NOT NULL,
	"phoneNumber" varchar(15) NOT NULL,
	"whatsappNumber" varchar(15),
	"bussinessAddress" varchar(500) NOT NULL,
	"district" varchar(50) NOT NULL,
	"state" varchar(50),
	"country" varchar(50),
	CONSTRAINT "bussinessContactInformationSchema_email_unique" UNIQUE("email"),
	CONSTRAINT "bussinessContactInformationSchema_bussinessRegistrationNumber_unique" UNIQUE("bussinessRegistrationNumber"),
	CONSTRAINT "bussinessContactInformationSchema_phoneNumber_unique" UNIQUE("phoneNumber"),
	CONSTRAINT "bussinessContactInformationSchema_whatsappNumber_unique" UNIQUE("whatsappNumber")
);
--> statement-breakpoint
ALTER TABLE "bussinessContactInformationSchema" ADD CONSTRAINT "bussinessContactInformationSchema_applicationSubmissionId_applicationSubmission_id_fk" FOREIGN KEY ("applicationSubmissionId") REFERENCES "public"."applicationSubmission"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bussinessInformation_name_idx" ON "bussinessContactInformationSchema" USING btree ("name");