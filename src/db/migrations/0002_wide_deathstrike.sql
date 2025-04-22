DROP INDEX "isCompleted_idx";--> statement-breakpoint
ALTER TABLE "onboarding" DROP COLUMN "isCompleted";--> statement-breakpoint
ALTER TABLE "onboarding" DROP COLUMN "completedAt";--> statement-breakpoint
ALTER TABLE "onboarding" DROP COLUMN "metaData";