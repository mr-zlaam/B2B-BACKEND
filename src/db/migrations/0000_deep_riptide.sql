CREATE TYPE "public"."userRole" AS ENUM('ADMIN', 'VENDOR', 'BUYER');--> statement-breakpoint
CREATE TABLE "rate_limiter_flexible" (
	"key" text PRIMARY KEY NOT NULL,
	"points" integer NOT NULL,
	"expire" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uid" uuid PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"fullName" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" text NOT NULL,
	"role" "userRole" NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "users_uid_unique" UNIQUE("uid"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "key_idx" ON "rate_limiter_flexible" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "createdAt_idx" ON "users" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "updatedAt_idx" ON "users" USING btree ("updatedAt");--> statement-breakpoint
CREATE INDEX "fullName_idx" ON "users" USING btree ("fullName");