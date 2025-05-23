ALTER TABLE "vendorAgreement" ADD COLUMN "agreementName" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement1Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement2Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement3Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement4Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement5Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement6Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" DROP COLUMN "isAgreement7Signed";--> statement-breakpoint
ALTER TABLE "vendorAgreement" ADD CONSTRAINT "vendorAgreement_userId_unique" UNIQUE("userId");--> statement-breakpoint
ALTER TABLE "vendorAgreement" ADD CONSTRAINT "vendorAgreement_agreementName_unique" UNIQUE("agreementName");