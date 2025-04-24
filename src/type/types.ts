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
