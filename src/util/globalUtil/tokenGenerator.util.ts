import type { Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../../config/env.config.js";
import appConstant from "../../constant/app.constant.js";
import type { TROLE } from "../../db/schemas/user.schema.js";
export interface IPAYLOAD {
  uid: string;
  OTP_TOKEN_VERSION: number;
  role: TROLE;
  isVerified: boolean;
}

export default {
  generateAccessToken: (payload: IPAYLOAD, res: Response): string | Response => {
    try {
      const token = jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: appConstant.ACCESS_TOKEN_EXPIRY
      });
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error.message || "Internal server Error while generating access token",
          status: 500
        });
      else
        return res.status(500).json({
          success: false,
          message: (error as string) || "Internal server Error while generating access token",
          status: 500
        });
    }
  },
  generateRefreshToken: (payload: IPAYLOAD, res: Response): string | Response => {
    try {
      const token = jwt.sign({ uid: payload.uid, tokenVersion: payload.OTP_TOKEN_VERSION }, envConfig.JWT_SECRET, {
        expiresIn: appConstant.REFRESH_TOKEN_EXPIRY
      });
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error.message || "Internal server Error while generating access token",
          status: 500
        });
      else
        return res.status(500).json({
          success: false,
          message: (error as string) || "Internal server Error while generating access token",
          status: 500
        });
    }
  },

  generateLocationToken: (payload: object, res: Response): string | Response => {
    try {
      const token = jwt.sign(payload, envConfig.JWT_SECRET);
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error.message || "Internal server Error while generating access token",
          status: 500
        });
      else
        return res.status(500).json({
          success: false,
          message: (error as string) || "Internal server Error while generating access token",
          status: 500
        });
    }
  },
  generateOTPToken: (payload: { OTP?: string }, res: Response): string | Response => {
    try {
      const token = jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: appConstant.OTP_EXPIRY });
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error.message || "Internal server Error while generating access token",
          status: 500
        });
      else
        return res.status(500).json({
          success: false,
          message: (error as string) || "Internal server Error while generating access token",
          status: 500
        });
    }
  }
};
export function verifyToken<T>(token: string, secret: string = envConfig.JWT_SECRET): [Error | null, T | null] {
  try {
    const decoded = jwt.verify(token, secret) as T;
    return [null, decoded];
  } catch (error: unknown) {
    if (error instanceof Error) return [new Error(error.message || `Invalid Token::${error}`), null];
    else return [Error(`Internal server error while verifying token :: ${error as string}`), null];
  }
}
