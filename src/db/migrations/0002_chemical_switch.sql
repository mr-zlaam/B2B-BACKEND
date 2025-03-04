DROP INDEX "email_idx";--> statement-breakpoint
DROP INDEX "username_idx";--> statement-breakpoint
DROP INDEX "otp_token_idx";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isVerified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "otp_token_expiry_idx" ON "users" USING btree ("OTP_EXPIRY");--> statement-breakpoint
CREATE INDEX "isVerified_idx" ON "users" USING btree ("isVerified");