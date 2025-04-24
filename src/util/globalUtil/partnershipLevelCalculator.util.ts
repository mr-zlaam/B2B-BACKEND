import type { TCURRENTSTAGE } from "../../type/types";

export function ReturnLevelBasedOnSerialNumber(onboardingIndex: number): TCURRENTSTAGE {
  if (onboardingIndex === 1) {
    return "SELECT_PARTNERSHIP";
  } else if (onboardingIndex === 2) {
    return "APPLICATION_SUBMISSION";
  } else if (onboardingIndex === 3) {
    return "PRODUCT_PORTFOLIO";
  } else if (onboardingIndex === 4) {
    return "DOCUMENT_SUBMISSION";
  } else if (onboardingIndex === 5) {
    return "VENDOR_AGREEMENT";
  } else if (onboardingIndex === 6) {
    return "APPLICATION_STATUS";
  } else if (onboardingIndex === 7) {
    return "PARTNERSHIP_ACTIVATION";
  } else {
    return "PORTAL_LOGIN";
  }
}
