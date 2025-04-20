import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db";
import type { TUSER } from "../../db/schemas/";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware";
import { userUpdateService } from "../../service/appService/authService/updateUser.service";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util";
import { throwError } from "../../util/globalUtil/throwError.util";
import logger from "../../util/globalUtil/logger.util";
import { httpResponse } from "../../util/globalUtil/apiResponse.util";
import { setTokensAndCookies } from "../../util/globalUtil/setCookies.util";
import type { Response } from "express";
import { gloabalMailMessage } from "../../service/globalService/globalEmail.service";
import emailResponsesConstant from "../../constant/emailResponses.constant";
import { userRepo } from "../../repository/userRepository/user.repo";
import envConfig from "../../config/env.config";
/* 
@types of iupdae user
  */
interface IUpdateUserController {
  // eslint-disable-next-line no-unused-vars
  updateBasicUserInformation: (_: TUSER) => Promise<TUSER>;
  // eslint-disable-next-line no-unused-vars
  updateUserEmail: (email: string, uid: string) => Promise<TUSER>;
  // eslint-disable-next-line no-unused-vars
  updateUserPassword: (uid: string, newPassword: string, res: Response) => Promise<void>;
}
export class UpdateUserController {
  private readonly _db: DatabaseClient;
  private readonly _userUpdateService: IUpdateUserController;

  constructor(db: DatabaseClient) {
    this._db = db;
    this._userUpdateService = userUpdateService(this._db);
  }

  // ** Update user details ** //
  public updateBasicInfo = asyncHandler(async (req: _Request, res) => {
    // ** Update user details (username,fullName,phone,companyName(optional), companyURI(optional)) ** //
    const updateUserInformation = req.body as TUSER;
    const { uid: userIdFromBody } = req.body as { uid: string };
    const userIDFromToken = req.userFromToken?.uid as string;
    if (!userIdFromBody && !userIDFromToken) {
      logger.info("No uid have been provided by user or token");
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    // ** validation is already handled by middleware ** //
    await this._userUpdateService.updateBasicUserInformation(updateUserInformation);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "User information has been updated successfully!!" });
  });
  // ** Update user email **//
  public updateUserEmail = asyncHandler(async (req: _Request, res) => {
    // ** Update user email ** //
    const { email } = req.body as { email: string };
    const { uid: userIDFromBody } = req.body as { uid: string };
    const userIDFromToken = req.userFromToken?.uid as string;
    if (!userIDFromBody && !userIDFromToken) {
      logger.info("No uid have been provided by user or token");
      throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
    }
    const uid = userIDFromBody || userIDFromToken || "no id";
    const updatedUser = await this._userUpdateService.updateUserEmail(email, uid);
    const { accessToken, refreshToken } = setTokensAndCookies(updatedUser, res, true);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "User email has been updated successfully!!", accessToken, refreshToken });
  });
  // ** Update user password
  public updateUserPassword = asyncHandler(async (req: _Request, res) => {
    const uid = req.userFromToken?.uid as string;
    const { newPassword } = req.body as { newPassword: string };
    await this._userUpdateService.updateUserPassword(uid, newPassword, res);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "User password has been updated successfully!!" });
  });
  // ** forgot password request **//
  public forgotPasswordRequestFromUser = asyncHandler(async (req: _Request, res) => {
    const { email } = req.body as { email: string };
    const user = await userRepo(this._db).getUserByEmail(email);
    const verificationUrl = `${envConfig.FRONTEND_APP_URI}/resetAndUpdateNewPassword?token=${user.OTP_TOKEN}`;
    await gloabalMailMessage(email, emailResponsesConstant.SEND_OTP_FOR_RESET_PASSWORD_REQUEST(verificationUrl, "1h"), "Password Reset Request");
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "Please check your email to reset your password!!" });
  });
  // ** Reset  and update new password **//
  public resetAndUpdateNewPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body as { newPassword: string };
    const { token } = req.query as { token: string };
    const user = await userRepo(this._db).getUserByToken(token);
    if (token !== user.OTP_TOKEN) {
      logger.info("Token is not valid or expired in reset and update password controller", { token, user });
      throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    await this._userUpdateService.updateUserPassword(user.uid, newPassword, res);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "User password has been updated successfully!!" });
  });
}
