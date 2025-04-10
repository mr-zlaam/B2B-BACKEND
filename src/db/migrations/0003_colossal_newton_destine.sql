DROP INDEX "otp_token_expiry_idx";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "OTP_TOKEN_VERSION" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "OTP_EXPIRY";