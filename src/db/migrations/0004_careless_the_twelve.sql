ALTER TYPE "public"."userRole" ADD VALUE 'MODERATOR' BEFORE 'VENDOR';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");