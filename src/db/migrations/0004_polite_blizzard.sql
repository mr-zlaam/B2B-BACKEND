DROP INDEX "user_nested_levels_partnershipLevel_idx";--> statement-breakpoint
CREATE INDEX "user_nested_levels_partnershipLevel_idx" ON "selectPartnership" USING btree ("partnershipLevelIndex");