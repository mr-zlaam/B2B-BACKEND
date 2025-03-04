ALTER TABLE "users" ADD COLUMN "OTP_TOKEN" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "OTP_EXPIRY" timestamp;--> statement-breakpoint
CREATE INDEX "otp_token_idx" ON "users" USING btree ("fullName");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_OTP_TOKEN_unique" UNIQUE("OTP_TOKEN");