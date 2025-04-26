import { pgEnum } from "drizzle-orm/pg-core";

//** Auth enum */
export const userRoleEnum = pgEnum("role", ["ADMIN", "MODERATOR", "VENDOR", "BUYER"]);

export type TCURRENTROLE = typeof onboardingCurrentStageEnum.enumValues;
// ** Onboarding enum */

export const onboardingCurrentStageEnum = pgEnum("currentOnboardingStage", [
  "PORTAL_LOGIN",
  "SELECT_PARTNERSHIP",
  "APPLICATION_SUBMISSION",
  "PRODUCT_PORTFOLIO",
  "DOCUMENT_SUBMISSION",
  "VENDOR_AGREEMENT",
  "APPLICATION_STATUS",
  "PARTNERSHIP_ACTIVATION"
]);

export type TCURRENTSTAGE = typeof onboardingCurrentStageEnum.schema;
