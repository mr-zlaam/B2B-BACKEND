CREATE TABLE "vendorAgreement" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"isAgreement1Signed" boolean DEFAULT false NOT NULL,
	"isAgreement2Signed" boolean DEFAULT false NOT NULL,
	"isAgreement3Signed" boolean DEFAULT false NOT NULL,
	"isAgreement4Signed" boolean DEFAULT false NOT NULL,
	"isAgreement5Signed" boolean DEFAULT false NOT NULL,
	"isAgreement6Signed" boolean DEFAULT false NOT NULL,
	"isAgreement7Signed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vendorAgreement" ADD CONSTRAINT "vendorAgreement_userId_users_uid_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;