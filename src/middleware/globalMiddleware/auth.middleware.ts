import reshttp from "reshttp";
import { asyncHandler } from "../../util/globalUtil/asyncHandler.util.js";
import { throwError } from "../../util/globalUtil/throwError.util.js";
import { verifyToken, type IPAYLOAD } from "../../util/globalUtil/tokenGenerator.util.js";
import logger from "../../util/globalUtil/logger.util.js";
import type { Request } from "express";
import { userRepo } from "../../repository/userRepository/user.repo.js";
import type { DatabaseClient } from "../../db/db.js";

export type _Request = Request & {
  userFromToken?: IPAYLOAD;
};
export class Authmiddleware {
  private readonly _db: DatabaseClient;
  constructor(db: DatabaseClient) {
    this._db = db;
  }
  public checkToken = asyncHandler(async (req: _Request, _, next) => {
    const accessToken = req.header("Authorization");
    if (!accessToken) {
      logger.warn("access token is not provided with this request");
      throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    const parsedToken = accessToken?.split("Bearer ")[1] || "";
    if (parsedToken === undefined) {
      logger.warn("Access Token doesn't have Bearer");
      throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    const [error, userDetails] = verifyToken<IPAYLOAD>(parsedToken);
    if (error) {
      return throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    if (!userDetails?.uid) {
      logger.warn("access token doesn't have uid");
      return throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    const user = await userRepo(this._db).getUserByuid(userDetails.uid);
    if (user.OTP_TOKEN_VERSION !== userDetails.OTP_TOKEN_VERSION) {
      logger.warn("access token is expired, It seems user's session is already expired");
      return throwError(reshttp.unauthorizedCode, reshttp.unauthorizedMessage);
    }
    if (!userDetails.isVerified) {
      logger.warn("User exists and he provide valid token but unfortunately he/she is not verified");
      return throwError(reshttp.forbiddenCode, reshttp.forbiddenMessage);
    }
    req.userFromToken = userDetails;
    return next();
  });
}
