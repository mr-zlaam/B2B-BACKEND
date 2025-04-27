export interface ICOOKIEOPTIONS {
  httpOnly: true;
  secure: boolean;
  sameSite: "none";
  expires: Date;
}
// ** Enums

export type TCURRENTROLE = "ADMIN" | "MODERATOR" | "VENDOR" | "BUYER";
export type TCURRENTSTAGE =
  | "PORTAL_LOGIN"
  | "SELECT_PARTNERSHIP"
  | "APPLICATION_SUBMISSION"
  | "PRODUCT_PORTFOLIO"
  | "DOCUMENT_SUBMISSION"
  | "VENDOR_AGREEMENT"
  | "APPLICATION_STATUS"
  | "PARTNERSHIP_ACTIVATION";
// ** Pagination types
export interface IPAGINATION {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
// ** Vendor partnership enum */
export type TVENDORPARTNERSHIP =
  | "DKC_E_COMMERCE"
  | "DKC_CONSIGNMENT"
  | "DKC_EXHIBITION"
  | "DKC_IMPORT_EXPORT"
  | "DKC_SUBSIDORY"
  | "DKC_BRICK_AND_MORTAR"
  | "DKC_FRANCHISE";
// ** Buyer partnership enum */

export type TBUYERPARTNERSHIP =
  | "DKC_DROP_SHIPPING"
  | "DKC_CONSIGNEE"
  | "DKC_EXHIBITION"
  | "DKC_IMPORT_EXPORT"
  | "DKC_INVESTOR"
  | "DKC_BRICK_AND_MORTAR"
  | "DKC_FRANCHISE";
