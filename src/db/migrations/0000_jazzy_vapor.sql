CREATE TYPE "public"."currentOnboardingStage" AS ENUM('PORTAL_LOGIN', 'SELECT_PARTNERSHIP', 'APPLICATION_SUBMISSION', 'PRODUCT_PORTFOLIO', 'DOCUMENT_SUBMISSION', 'VENDOR_AGREEMENT', 'APPLICATION_STATUS', 'PARTNERSHIP_ACTIVATION');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('ADMIN', 'MODERATOR', 'VENDOR', 'BUYER');--> statement-breakpoint
CREATE TABLE "users" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"fullName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" text NOT NULL,
	"role" "role" NOT NULL,
	"country" varchar(50) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"isVerified" boolean DEFAULT false NOT NULL,
	"companyName" varchar(50),
	"companyAddress" varchar(1000),
	"OTP_TOKEN" text,
	"OTP_TOKEN_VERSION" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "users_uid_unique" UNIQUE("uid"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_OTP_TOKEN_unique" UNIQUE("OTP_TOKEN")
);
--> statement-breakpoint
CREATE TABLE "onboarding" (
	"id" serial PRIMARY KEY NOT NULL,
	"currentOnboardingStage" "currentOnboardingStage" DEFAULT 'SELECT_PARTNERSHIP' NOT NULL,
	"currentOnboardingStageIndex" integer DEFAULT 1 NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "onboarding_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "selectPartnership" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"partnershipName" varchar(100) NOT NULL,
	"applicationId" uuid DEFAULT gen_random_uuid(),
	"partnershipLevelIndex" integer DEFAULT 1 NOT NULL,
	"unlockedByPayment" boolean DEFAULT false NOT NULL,
	"unlockedAt" timestamp (3) DEFAULT now() NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"retentionPeriod" integer DEFAULT 0 NOT NULL,
	"kpiPoints" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "selectPartnership_applicationId_unique" UNIQUE("applicationId")
);
--> statement-breakpoint
CREATE TABLE "rate_limiter_flexible" (
	"key" text PRIMARY KEY NOT NULL,
	"points" integer NOT NULL,
	"expire" timestamp,
	"previousDelay" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_userId_users_uid_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "selectPartnership" ADD CONSTRAINT "selectPartnership_userId_users_uid_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "user_createdAt_idx" ON "users" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "fullName_idx" ON "users" USING btree ("fullName");--> statement-breakpoint
CREATE INDEX "isVerified_idx" ON "users" USING btree ("isVerified");--> statement-breakpoint
CREATE INDEX "onbarding_user_id_fk" ON "onboarding" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "onboarding_createdAt_idx" ON "onboarding" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "onboarding_id_idx" ON "onboarding" USING btree ("id");--> statement-breakpoint
CREATE INDEX "current_stage_idx" ON "onboarding" USING btree ("currentOnboardingStageIndex");--> statement-breakpoint
CREATE INDEX "user_nested_levels_userId_idx" ON "selectPartnership" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "user_nested_levels_partnershipLevel_idx" ON "selectPartnership" USING btree ("partnershipName");--> statement-breakpoint
CREATE INDEX "user_nested_levels_createdAt_idx" ON "selectPartnership" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "key_idx" ON "rate_limiter_flexible" USING btree ("key");