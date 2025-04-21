import { eq, sql } from "drizzle-orm";
import type { Response } from "express";
import type { DatabaseClient } from "../../../db/db";
import { userSchema, type TUSER } from "../../../db/schemas";
import { passwordHasher } from "../../../util/globalUtil/passwordHasher.util";
import { userRepo } from "../../../repository/userRepository/user.repo";
import envConfig from "../../../config/env.config";
import emailResponsesConstant from "../../../constant/emailResponses.constant";
import { gloabalMailMessage } from "../../globalService/globalEmail.service";
import logger from "../../../util/globalUtil/logger.util";
import { throwError } from "../../../util/globalUtil/throwError.util";
import reshttp from "reshttp";

export const userUpdateService = (db: DatabaseClient) => {
  // ** Update user details (username,fullName,phone,companyName(optional), companyURI(optional)) using drizzle orm ** //
  const updateBasicUserInformationService = async (userInformation: TUSER) => {
    const { username, fullName, phone, companyURI, companyName } = userInformation;
    const dataWhichIsGoingToBeUpdated = { username, fullName, phone, companyURI, companyName };
    const [updatedUser] = await db
      .update(userSchema)
      .set({ ...dataWhichIsGoingToBeUpdated, updatedAt: new Date() })
      .where(eq(userSchema.username, username))
      .returning();
    return updatedUser;
  };
  // ** update user email **//
  const updateUserEmailService = async (email: string, uid: string) => {
    const [updatedUser] = await db
      .update(userSchema)
      .set({ email, updatedAt: new Date(), isVerified: false, OTP_TOKEN_VERSION: sql`${userSchema.OTP_TOKEN_VERSION} + 1` })
      .where(eq(userSchema.uid, uid))
      .returning();
    return updatedUser;
  };
  // ** Update user password ** //
  const updateUserPasswordService = async (token: string, newPassword: string, res: Response) => {
    const user = await userRepo(db).getUserByToken(token);
    if (token !== user.OTP_TOKEN) {
      logger.info("Token is not valid or expired in reset and update password controller", { token, user });
      throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    const hashedNewPassword = (await passwordHasher(newPassword, res)) as string;
    await db.update(userSchema).set({ password: hashedNewPassword, OTP_TOKEN: null }).where(eq(userSchema.uid, user.uid)).returning();
  };
  const forgotPasswordRequestFromUserService = async (email: string) => {
    const user = await userRepo(db).getUserByEmail(email);
    const verificationUrl = `${envConfig.FRONTEND_APP_URI}/resetAndUpdateNewPassword?token=${user.OTP_TOKEN}`;
    await gloabalMailMessage(email, emailResponsesConstant.SEND_OTP_FOR_RESET_PASSWORD_REQUEST(verificationUrl, "1h"), "Password Reset Request");
  };

  // ** utility functions returns here

  return { updateBasicUserInformationService, updateUserEmailService, updateUserPasswordService, forgotPasswordRequestFromUserService };
};
