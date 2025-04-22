import type { TCURRENTSTAGE } from "../../type/types";

export function ReturnLevelBasedOnSerialNumber(serialNumber: number): TCURRENTSTAGE {
  if (serialNumber === 1) {
    return "SELECT_PARTNERSHIP";
  } else if (serialNumber === 2) {
    return "APPLICATION_SUBMISSION";
  } else if (serialNumber === 3) {
    return "PRODUCT_PORTFOLIO";
  } else if (serialNumber === 4) {
    return "DOCUMENT_SUBMISSION";
  } else if (serialNumber === 5) {
    return "VENDOR_AGREEMENT";
  } else if (serialNumber === 6) {
    return "APPLICATION_STATUS";
  } else if (serialNumber === 7) {
    return "PARTNERSHIP_ACTIVATION";
  } else {
    return "PORTAL_LOGIN";
  }
}
