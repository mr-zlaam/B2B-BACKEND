import type { Response } from "express";
export interface IPAYLOAD {
  uid: string;
  tokenVersion: number;
  role: "ADMIN" | "VENDOR" | "BUYER";
  isVerified: Date | null;
}
declare const _default: {
  generateAccessToken: (payload: IPAYLOAD, res: Response) => string | Response;
  generateRefreshToken: (payload: IPAYLOAD, res: Response) => string | Response;
  generateLocationToken: (payload: object, res: Response) => string | Response;
};
export default _default;
