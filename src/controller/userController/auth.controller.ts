import reshttp from "reshttp";
import { type IUSER } from "../../db/schemas/user.schema.js";
import { httpResponse } from "../../util/globalUtil/apiResponse.util.js";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util.js";
import { manageUsers } from "../../util/appUtil/authUtil/userAuth.util.js";
import type { DatabaseClient } from "../../db/db.js";

export class AuthController {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public registerUser = asyncHandler(async (req, res) => {
    const { handleVerifiedUser, handleUnverifiedUser, handleNewUser, checkExistingUser } = manageUsers(this._db);

    const userBody = req.body as IUSER;
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
}
