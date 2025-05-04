CREATE TABLE "documentSubmission" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"bussinessRegisterationDocument" text NOT NULL,
	"businessLicenseDocument" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "documentSubmission_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
ALTER TABLE "documentSubmission" ADD CONSTRAINT "documentSubmission_userId_users_uid_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;