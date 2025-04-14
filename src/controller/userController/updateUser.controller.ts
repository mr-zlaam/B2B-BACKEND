import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db.js";
import type { TUSER } from "../../db/schemas/user.schema.js";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware.js";
import { userUpdateService } from "../../service/appService/authService/updateUser.service.js";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util.js";
import { throwError } from "../../util/globalUtil/throwError.util.js";
import logger from "../../util/globalUtil/logger.util.js";
import { httpResponse } from "../../util/globalUtil/apiResponse.util.js";
import { setTokensAndCookies } from "../../util/globalUtil/setCookies.util.js";
import type { Response } from "express";
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
}
