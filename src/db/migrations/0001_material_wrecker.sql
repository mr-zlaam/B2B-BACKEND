CREATE TABLE "selectPartnership" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"partnershipName" varchar(100) NOT NULL,
	"applicationId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"unlockedByPayment" boolean DEFAULT false NOT NULL,
	"userRole" "role" NOT NULL,
	"unlockedAt" timestamp (3) DEFAULT now() NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"retentionPeriod" integer DEFAULT 0 NOT NULL,
	"kpiPoints" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "selectPartnership_applicationId_unique" UNIQUE("applicationId")
);
--> statement-breakpoint
ALTER TABLE "selectPartnership" ADD CONSTRAINT "selectPartnership_userId_users_uid_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_nested_levels_userId_idx" ON "selectPartnership" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "user_nested_levels_partnershipLevel_idx" ON "selectPartnership" USING btree ("partnershipName");--> statement-breakpoint
CREATE INDEX "user_nested_levels_createdAt_idx" ON "selectPartnership" USING btree ("createdAt");