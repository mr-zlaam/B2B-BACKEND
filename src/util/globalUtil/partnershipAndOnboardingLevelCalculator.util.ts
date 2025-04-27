import type { TBUYERPARTNERSHIP, TCURRENTROLE, TCURRENTSTAGE, TVENDORPARTNERSHIP } from "../../type/types";

export function ReturnOnboardingLevelBasedOnSerialNumber(onboardingIndex: number): TCURRENTSTAGE {
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
export function ReturnPartnershipLevelBasedOnSerialNumber(partnershipIndex: number, role: TCURRENTROLE): TBUYERPARTNERSHIP | TVENDORPARTNERSHIP {
  if (role === "VENDOR") {
    switch (partnershipIndex) {
      case 1:
        return "DKC_E_COMMERCE";
      case 2:
        return "DKC_CONSIGNMENT";
      case 3:
        return "DKC_EXHIBITION";
      case 4:
        return "DKC_IMPORT_EXPORT";
      case 5:
        return "DKC_SUBSIDORY";
      case 6:
        return "DKC_BRICK_AND_MORTAR";
      case 7:
        return "DKC_FRANCHISE";
      default:
        return "DKC_E_COMMERCE";
    }
  } else {
    switch (partnershipIndex) {
      case 1:
        return "DKC_DROP_SHIPPING";
      case 2:
        return "DKC_CONSIGNEE";
      case 3:
        return "DKC_EXHIBITION";
      case 4:
        return "DKC_IMPORT_EXPORT";
      case 5:
        return "DKC_INVESTOR";
      case 6:
        return "DKC_BRICK_AND_MORTAR";
      case 7:
        return "DKC_FRANCHISE";
      default:
        return "DKC_DROP_SHIPPING";
    }
  }
}
