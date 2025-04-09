ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
DROP INDEX "createdAt_idx";--> statement-breakpoint
DROP INDEX "updatedAt_idx";--> statement-breakpoint
CREATE INDEX "createdAt_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "updatedAt_idx" ON "users" USING btree ("updated_at");