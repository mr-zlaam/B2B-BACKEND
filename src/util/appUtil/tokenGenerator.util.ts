import type { Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../../config/env.config.js";

export interface IPAYLOAD {
  uid: string;
  tokenVersion: number;
  role: "ADMIN" | "VENDOR" | "BUYER";
  isVerified: Date | null;
}

export default {
  generateAccessToken: (
    payload: IPAYLOAD,
    res: Response,
  ): string | Response => {
    try {
      const token = jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: "14m",
      });
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message:
            error.message ||
            "Internal server Error while generating access token",
          status: 500,
        });
      else
        return res.status(500).json({
          success: false,
          message:
            (error as string) ||
            "Internal server Error while generating access token",
          status: 500,
        });
    }
  },
  generateRefreshToken: (
    payload: IPAYLOAD,
    res: Response,
  ): string | Response => {
    try {
      const token = jwt.sign(
        { uid: payload.uid, tokenVersion: payload.tokenVersion },
        envConfig.JWT_SECRET,
        { expiresIn: "7d" },
      );
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message:
            error.message ||
            "Internal server Error while generating access token",
          status: 500,
        });
      else
        return res.status(500).json({
          success: false,
          message:
            (error as string) ||
            "Internal server Error while generating access token",
          status: 500,
        });
    }
  },

  generateLocationToken: (
    payload: object,
    res: Response,
  ): string | Response => {
    try {
      const token = jwt.sign(payload, envConfig.JWT_SECRET);
      return token;
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message:
            error.message ||
            "Internal server Error while generating access token",
          status: 500,
        });
      else
        return res.status(500).json({
          success: false,
          message:
            (error as string) ||
            "Internal server Error while generating access token",
          status: 500,
        });
    }
  },
};
