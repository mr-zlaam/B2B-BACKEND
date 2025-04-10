import reshttp from "reshttp";
import { type TUSER } from "../../db/schemas/user.schema.js";
import { httpResponse } from "../../util/globalUtil/apiResponse.util.js";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util.js";
import type { DatabaseClient } from "../../db/db.js";
import { throwError } from "../../util/globalUtil/throwError.util.js";
import { manageUsers } from "../../service/appService/authService/userAuth.service.js";

export class AuthController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }

  public registerUser = asyncHandler(async (req, res) => {
    const { handleVerifiedUser, handleUnverifiedUser, handleNewUser, checkExistingUser } = manageUsers(this._db);

    const userBody = req.body as TUSER;
    const existingUser = await checkExistingUser(userBody);
    if (existingUser && existingUser.length > 0) {
      const user = existingUser[0];
      if (user.isVerified) {
        handleVerifiedUser();
      } else {
        handleUnverifiedUser();
      }
    }
    /* if user doesn't exist at all*/
    await handleNewUser(userBody, res);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "Please check your email account for verification" });
  });

  public verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.query as { token: string };
    if (token === null || token === undefined) return throwError(reshttp.badRequestCode, "Token is required");
    const { verifyUser } = manageUsers(this._db);
    await verifyUser(token);
    httpResponse(req, res, reshttp.okCode, reshttp.okMessage, { message: "User has been verified" });
  });
}
