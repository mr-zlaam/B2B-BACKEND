import reshttp from "reshttp";
import type { DatabaseClient } from "../../db/db.js";
import type { TUSER } from "../../db/schemas/user.schema.js";
import type { _Request } from "../../middleware/globalMiddleware/auth.middleware.js";
import { userUpdateService } from "../../service/appService/authService/updateUser.service.js";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util.js";
import { throwError } from "../../util/globalUtil/throwError.util.js";
import logger from "../../util/globalUtil/logger.util.js";
import { httpResponse } from "../../util/globalUtil/apiResponse.util.js";
/* 
@types of iupdae user
  */
interface IUpdateUserController {
  // eslint-disable-next-line no-unused-vars
  updateBasicUserInformation: (_: TUSER) => Promise<TUSER>;
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
}
