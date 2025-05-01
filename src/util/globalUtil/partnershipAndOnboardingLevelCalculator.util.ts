import type { TCURRENTROLE, TCURRENTSTAGE } from "../../db/schemas/shared/enums";
import type { TBUYERPARTNERSHIP, TVENDORPARTNERSHIP } from "../../type/types";

export function ReturnOnboardingLevelBasedOnSerialNumber(onboardingIndex: number): TCURRENTSTAGE {
  switch (Math.min(onboardingIndex, 7)) {
    case 1:
      return "SELECT_PARTNERSHIP";
    case 2:
      return "APPLICATION_SUBMISSION";
    case 3:
      return "PRODUCT_PORTFOLIO";
    case 4:
      return "DOCUMENT_SUBMISSION";
    case 5:
      return "VENDOR_AGREEMENT";
    case 6:
      return "APPLICATION_STATUS";
    case 7:
      return "PARTNERSHIP_ACTIVATION";
    default:
      return "PORTAL_LOGIN";
  }
}
export function ReturnPartnershipLevelBasedOnSerialNumber(partnershipIndex: number, role: TCURRENTROLE): TBUYERPARTNERSHIP | TVENDORPARTNERSHIP {
  if (role === "VENDOR") {
    switch (Math.min(partnershipIndex, 7)) {
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
    switch (Math.min(partnershipIndex, 7)) {
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
export function ReturnKpiPointsBasedOnIndex(index: number): number {
  switch (Math.min(index, 7)) {
    case 1:
      return 7;
    case 2:
      return 7;
    case 3:
      return 8;
    case 4:
      return 8;
    case 5:
      return 8;
    case 6:
      return 8;
    case 7:
      return 8;
    default:
      return 7;
  }
}
export function ReturnRetentionPeriodBasedOnIndex(index: number): number {
  switch (Math.min(index, 7)) {
    case 1:
      return 18;
    case 2:
      return 6;
    case 3:
      return 6;
    case 4:
      return 6;
    case 5:
      return 12;
    case 6:
      return 24;
    case 7:
      return 6;
    default:
      return 7;
  }
}
