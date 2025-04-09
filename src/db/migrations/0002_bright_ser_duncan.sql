DROP INDEX "createdAt_idx";--> statement-breakpoint
DROP INDEX "updatedAt_idx";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp (3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp (3) DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "createdAt_idx" ON "users" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "updatedAt_idx" ON "users" USING btree ("updatedAt");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";