import { eq, or } from "drizzle-orm";
import type { Response } from "express";
import { type DatabaseClient } from "../../../db/db.js";
import { type IUSER, userSchema } from "../../../db/schemas/user.schema.js";
import { generateOtp } from "../../quickUtil/slugStringGenerator.util.js";
import tokenGeneratorUtil from "../../globalUtil/tokenGenerator.util.js";
import envConfig from "../../../config/env.config.js";
import emailResponsesConstant from "../../../constant/emailResponses.constant.js";
import { gloabalMailMessage } from "../../../service/globalService/globalEmail.service.js";
import logger from "../../globalUtil/logger.util.js";
import reshttp from "reshttp";
import { isAdmin } from "./checkIfUserIsAdmin.util.js";
import { throwError } from "../../globalUtil/throwError.util.js";
import { passwordHasher } from "../../globalUtil/passwordHasher.util.js";
export const manageUsers = (db: DatabaseClient) => {
  const checkExistingUser = async ({ email, username, phone }: IUSER) => {
    const existingUser = await db
      .select({ uid: userSchema.uid, isVerified: userSchema.isVerified, email: userSchema.email })
      .from(userSchema)
      .where(or(eq(userSchema.email, email), eq(userSchema.username, username), eq(userSchema.phone, phone)))
      .limit(1);
    return existingUser.length > 0 ? existingUser : null;
  };
  function generateVerificationOtp(res: Response) {
    const { otpExpiry, otp } = generateOtp(6, 30, "m");
    const { generateOTPToken } = tokenGeneratorUtil;
    const OTP_TOKEN = generateOTPToken({ OTP: otp }, res);
    return { otpExpiry, OTP_TOKEN };
  }

  const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${envConfig.FRONTEND_APP_URI}/verify?token=${token}`;
    const emailContent = emailResponsesConstant.OTP_SENDER_MESSAGE(verificationUrl, "30");
    return await gloabalMailMessage(email, emailContent, "About your account verification");
  };

  const handleUnverifiedUser = () => {
    logger.warn("User already exists but unverified");
    throwError(reshttp.conflictCode, "An unverified Account already exists with these details");
  };
  const handleVerifiedUser = () => {
    logger.info("User already exists and is verified");
    throwError(reshttp.conflictCode, "Account already exists with these details");
  };

  const handleNewUser = async (user: IUSER, res: Response) => {
    const { OTP_TOKEN, otpExpiry } = generateVerificationOtp(res);
    const hashedPassword = (await passwordHasher(user.password, res)) as string;
    await db
      .insert(userSchema)
      .values({
        ...user,
        OTP_TOKEN: OTP_TOKEN as string,
        OTP_EXPIRY: otpExpiry,
        password: hashedPassword,
        role: isAdmin(user.email) ? "ADMIN" : user.role
      })
      .then(async () => await sendVerificationEmail(user.email, OTP_TOKEN as string))
      .catch((err: unknown) => {
        logger.error("Something went wrong while creating new user", { err });
        throwError(reshttp.internalServerErrorCode, reshttp.internalServerErrorMessage);
      });
  };
  return { checkExistingUser, handleNewUser, handleUnverifiedUser, handleVerifiedUser };
};
