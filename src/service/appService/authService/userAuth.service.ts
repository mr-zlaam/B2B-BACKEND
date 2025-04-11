import { eq, or } from "drizzle-orm";
import type { Response } from "express";
import { type DatabaseClient } from "../../../db/db.js";
import { type TUSER, userSchema } from "../../../db/schemas/user.schema.js";
import envConfig from "../../../config/env.config.js";
import emailResponsesConstant from "../../../constant/emailResponses.constant.js";
import { gloabalMailMessage } from "../../../service/globalService/globalEmail.service.js";
import reshttp from "reshttp";
import { generateOtp } from "../../../util/quickUtil/slugStringGenerator.util.js";
import tokenGeneratorUtil, { verifyToken } from "../../../util/globalUtil/tokenGenerator.util.js";
import logger from "../../../util/globalUtil/logger.util.js";
import { throwError } from "../../../util/globalUtil/throwError.util.js";
import { passwordHasher, verifyPassword } from "../../../util/globalUtil/passwordHasher.util.js";
import { isAdmin } from "../../../util/appUtil/authUtil/checkIfUserIsAdmin.util.js";
import { setTokensAndCookies } from "../../../util/globalUtil/setCookies.util.js";
import { userRepo } from "../../../repositories/userRepository/user.repo.js";
export const manageUsers = (db: DatabaseClient) => {
  const checkExistingUser = async ({ email, username, phone }: TUSER) => {
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
    logger.info(verificationUrl);
    const emailContent = emailResponsesConstant.OTP_SENDER_MESSAGE(verificationUrl, "30");
    return await gloabalMailMessage(email, emailContent, "About your account verification");
  };

  const handleUnverifiedUser = () => {
    throwError(reshttp.conflictCode, "An unverified Account already exists with these details");
  };
  const handleVerifiedUser = () => {
    logger.info("User already exists and is verified");
    throwError(reshttp.conflictCode, "Account already exists with these details");
  };

  const handleNewUser = async (user: TUSER, res: Response) => {
    const { OTP_TOKEN } = generateVerificationOtp(res);
    const hashedPassword = (await passwordHasher(user.password, res)) as string;
    await db
      .insert(userSchema)
      .values({
        ...user,
        OTP_TOKEN: OTP_TOKEN as string,
        password: hashedPassword,
        role: isAdmin(user.email) ? "ADMIN" : user.role
      })
      .then(async () => await sendVerificationEmail(user.email, OTP_TOKEN as string))
      .catch((err: unknown) => {
        logger.error("Something went wrong while creating new user", { err });
        throwError(reshttp.internalServerErrorCode, reshttp.internalServerErrorMessage);
      });
  };

  const verifyUser = async (OTP_TOKEN: string, res: Response) => {
    const [user] = await db.select().from(userSchema).where(eq(userSchema.OTP_TOKEN, OTP_TOKEN)).limit(1);
    if (user === null || user === undefined) {
      logger.info("User not found while verifying user because he/she sent invalid token");
      throwError(reshttp.notFoundCode, reshttp.notFoundMessage);
    }
    if (user.isVerified) {
      throwError(reshttp.conflictCode, "Account already verified");
    }
    const [err] = verifyToken<{ OTP: string }>(user?.OTP_TOKEN as string, envConfig.JWT_SECRET);
    if (err) {
      logger.info("TOKEN was expired long ago");
      await db
        .update(userSchema)
        .set({ isVerified: false, OTP_TOKEN: null, OTP_TOKEN_VERSION: user.OTP_TOKEN_VERSION + 1 })
        .where(eq(userSchema.OTP_TOKEN, OTP_TOKEN));
      throwError(reshttp.unauthorizedCode, `Invalid token ${err.message}`);
    }
    const [updatedUser] = await db
      .update(userSchema)
      .set({ isVerified: true, OTP_TOKEN: null, OTP_TOKEN_VERSION: user.OTP_TOKEN_VERSION + 1 })
      .where(eq(userSchema.OTP_TOKEN, OTP_TOKEN))
      .returning();

    const { accessToken, refreshToken } = setTokensAndCookies(updatedUser, res, true);
    return { accessToken, refreshToken };
  };
  const resendOTPToken = async (email: string, res: Response) => {
    const { OTP_TOKEN } = generateVerificationOtp(res);
    const user = await userRepo(db).getUserByEmail(email);
    if (user.isVerified) {
      logger.error("Account already verified. This route is at risk ");
      throwError(reshttp.conflictCode, "Account already verified");
    }
    await db
      .update(userSchema)
      .set({ OTP_TOKEN: OTP_TOKEN as string })
      .where(eq(userSchema.email, email))
      .then(async () => await sendVerificationEmail(email, OTP_TOKEN as string))
      .catch((err: unknown) => {
        logger.error("Something went wrong while creating new user", { err });
        throwError(reshttp.internalServerErrorCode, reshttp.internalServerErrorMessage);
      });
  };
  // ** login user

  const loginUser = async (email: string, password: string, res: Response) => {
    const user = await userRepo(db).getUserByEmail(email);
    if (user === null || user === undefined) {
      logger.info("User not found while verifying user because he/she sent invalid email which doesn't exist in database");
      throwError(reshttp.notFoundCode, "Invalid Credentials");
    }
    const isPasswordMatch = await verifyPassword(password, user.password, res);
    if (!isPasswordMatch) {
      logger.info("Incorrect password");
      throwError(reshttp.notFoundCode, "Invalid Credentials");
    }
    if (!user.isVerified) {
      logger.info("User is not verified so he/she can't login");
      throwError(reshttp.badRequestCode, reshttp.badGatewayMessage);
    }

    const { accessToken, refreshToken } = setTokensAndCookies(user, res, true, true);
    return { accessToken, refreshToken };
  };
  // Return functions from HOF

  return { checkExistingUser, handleNewUser, handleUnverifiedUser, handleVerifiedUser, verifyUser, resendOTPToken, loginUser };
};
