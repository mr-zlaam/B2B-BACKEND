import { pgEnum } from "drizzle-orm/pg-core";

//** Auth enum */
export const userRoleEnum = pgEnum("role", ["ADMIN", "MODERATOR", "VENDOR", "BUYER"]);

export type TCURRENTROLE = (typeof userRoleEnum.enumValues)[number];
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

export type TCURRENTSTAGE = (typeof onboardingCurrentStageEnum.enumValues)[number];
// ** applicaiton submission enums
export const bussinessLegalStructureEnum = pgEnum("bussinessLegalStructure", [
  "SOLE_PROPRIETORSHIP",
  "PARTNERSHIP",
  "LIMITED_LIABILITY_PARTNERSHIP",
  "PRIVATE_LIMITED",
  "PUBLIC_LIMITED",
  "COOPERATIVE_SOCIETY"
]);
// type
export type TBUSINESSLEGALSTRUCTURE = (typeof bussinessLegalStructureEnum.enumValues)[number];
export const bussinessTypeEnum = pgEnum("bussinessType", ["ONLINE", "STORE_FRONT", "MANUFACTURER", "WHOLE_SALER", "DISTRIBUTOR", "ARTISAN"]);
// type
export type TBUSINESSTYPE = (typeof bussinessTypeEnum.enumValues)[number];
export const productAuthenticityCertificationsEnum = pgEnum("productAuthenticityCertifications", [
  "GIFT_CERTIFICATE",
  "HANDLOOM_MARK",
  "CRAFT_MARK",
  "INDIA_HANDMADE",
  "QUALITY_COUNCIL",
  "EXPORT_COUNCIL",
  "BLOCK_CHAIN",
  "NONE"
]);
// type
export type TPRODUCTAUTHENTICITYCERTIFICATIONS = (typeof productAuthenticityCertificationsEnum.enumValues)[number];
