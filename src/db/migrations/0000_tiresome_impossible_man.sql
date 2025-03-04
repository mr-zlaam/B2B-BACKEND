CREATE TABLE "rate_limiter_flexible" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text PRIMARY KEY NOT NULL,
	"points" integer NOT NULL,
	"expire" timestamp,
	CONSTRAINT "rate_limiter_flexible_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX "key_idx" ON "rate_limiter_flexible" USING btree ("key");