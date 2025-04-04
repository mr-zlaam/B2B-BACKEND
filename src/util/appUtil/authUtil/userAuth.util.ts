import { and, eq, or, sql } from "drizzle-orm";
import type { Response } from "express";
import { db } from "../../../db/db.js";
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

const checkUserExistsStmt = db
  .select({ uid: userSchema.uid, isVerified: userSchema.isVerified, email: userSchema.email })
  .from(userSchema)
  .where(
    or(
      eq(userSchema.email, sql.placeholder("email")),
      eq(userSchema.username, sql.placeholder("username")),
      eq(userSchema.phone, sql.placeholder("phone"))
    )
  )
  .limit(1)
  .prepare("checkUserExistsStmt");

export const checkExistingUser = async (email: string, username: string, phone: string) => {
  const existingUser = await checkUserExistsStmt.execute({ email, username, phone });
  return existingUser.length > 0 ? existingUser : null;
};
export function generateVerificationOtp(res: Response) {
  const { otpExpiry, otp } = generateOtp(6, 30, "m");
  const { generateOTPToken } = tokenGeneratorUtil;
  const OTP_TOKEN = generateOTPToken({ OTP: otp }, res);
  return { otpExpiry, OTP_TOKEN };
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${envConfig.FRONTEND_APP_URI}/verify?token=${token}`;
  const emailContent = emailResponsesConstant.OTP_SENDER_MESSAGE(verificationUrl, "30");
  return await gloabalMailMessage(email, emailContent, "About your account verification");
};

export const handleUnverifiedUser = async (user: IUSER, res: Response) => {
  const { OTP_TOKEN, otpExpiry } = generateVerificationOtp(res);
  await db
    .update(userSchema)
    .set({ OTP_EXPIRY: otpExpiry })
    .where(and(eq(userSchema.email, user.email)))
    .then(async () => await sendVerificationEmail(user.email, OTP_TOKEN as string));
};
export const handleVerifiedUser = () => {
  logger.info("User already exists and is verified");
  throwError(reshttp.conflictCode, "Account already exists with these details");
};

export const handleNewUser = async (user: IUSER, res: Response) => {
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
    .catch(() => throwError(reshttp.internalServerErrorCode, reshttp.internalServerErrorMessage));
};
